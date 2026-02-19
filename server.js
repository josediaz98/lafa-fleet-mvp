const express = require('express');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const cron = require('node-cron');
const rateLimit = require('express-rate-limit');
const { closePayrollWeek } = require('./server/payroll-close');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Trust Railway's reverse proxy for correct client IP in rate limiting
app.set('trust proxy', 1);

// --- Rate limiting (C5) ---
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiadas solicitudes. Intenta de nuevo en un minuto.' },
});

// --- Supabase admin client (server-side only) ---
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAdmin =
  supabaseUrl && supabaseServiceKey && /^https?:\/\//.test(supabaseUrl)
    ? createClient(supabaseUrl, supabaseServiceKey, { auth: { autoRefreshToken: false, persistSession: false } })
    : null;

if (!supabaseAdmin) {
  console.warn('Supabase admin client not initialized — check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
}

// --- Auth helpers ---
async function requireAdmin(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    throw new Error('Missing authorization header');
  }
  const token = authHeader.slice(7);
  if (!supabaseAdmin) throw new Error('Supabase not configured on server');
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) throw new Error('Invalid or expired token');
  const { data: profile } = await supabaseAdmin.from('profiles').select('role').eq('id', user.id).single();
  if (!profile || profile.role !== 'admin') throw new Error('Admin access required');
  return user;
}

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// --- Invite user (C2: input validation, C5: rate limit, W8: generic errors) ---
app.post('/api/invite-user', authLimiter, async (req, res) => {
  try {
    await requireAdmin(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }

  const { email, name, role, centerId } = req.body;

  if (!email || !name || !role) {
    return res.status(400).json({ error: 'email, name, and role are required' });
  }

  // C2: Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Formato de correo inválido.' });
  }

  // C2: Name sanitization — strip HTML tags, enforce max length
  const sanitizedName = name.replace(/<[^>]*>/g, '').trim().slice(0, 100);
  if (!sanitizedName) {
    return res.status(400).json({ error: 'Nombre inválido.' });
  }

  if (!['admin', 'supervisor'].includes(role)) {
    return res.status(400).json({ error: 'role must be admin or supervisor' });
  }

  try {
    const origin = req.headers.origin || 'https://lafa-production.up.railway.app';
    const redirectTo = `${origin}/fleet-intelligence/accept-invite`;

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo,
      data: { name: sanitizedName, role },
    });

    if (authError) {
      // W8: Log details server-side, return generic message to client
      console.error('[invite-user] Auth error:', authError.message);
      return res.status(400).json({ error: 'No se pudo enviar la invitación. Verifica el correo e intenta de nuevo.' });
    }

    const { error: profileError } = await supabaseAdmin.from('profiles').insert({
      id: authData.user.id,
      name: sanitizedName,
      email,
      role,
      center_id: role === 'admin' ? null : centerId || null,
      status: 'invitado',
    });

    if (profileError) {
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      // W8: Log details server-side, return generic message to client
      console.error('[invite-user] Profile creation error:', profileError.message);
      return res.status(500).json({ error: 'Error interno al crear el perfil. Intenta de nuevo.' });
    }

    return res.json({ userId: authData.user.id });
  } catch (err) {
    console.error('[invite-user] Unexpected error:', err.message);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

// --- Payroll auto-close ---

let lastCronRun = null;
let lastCronResult = null;

// POST /api/payroll/auto-close — protected by CRON_SECRET or admin Bearer token
app.post('/api/payroll/auto-close', apiLimiter, async (req, res) => {
  const cronSecret = process.env.CRON_SECRET;
  const headerSecret = req.headers['x-cron-secret'];

  // Auth: accept CRON_SECRET header or admin Bearer token
  if (cronSecret && headerSecret === cronSecret) {
    // OK — authenticated via cron secret
  } else {
    try {
      await requireAdmin(req);
    } catch (err) {
      return res.status(401).json({ error: err.message });
    }
  }

  try {
    const result = await closePayrollWeek(supabaseAdmin);
    lastCronRun = new Date().toISOString();
    lastCronResult = result;
    const httpStatus = result.status === 'error' ? 500 : 200;
    return res.status(httpStatus).json(result);
  } catch (err) {
    const errResult = { status: 'error', reason: err.message };
    lastCronRun = new Date().toISOString();
    lastCronResult = errResult;
    return res.status(500).json(errResult);
  }
});

// C6: GET /api/payroll/cron-status — now requires admin auth
app.get('/api/payroll/cron-status', async (req, res) => {
  try {
    await requireAdmin(req);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
  res.json({
    enabled: !!supabaseAdmin,
    schedule: 'Sunday 20:00 CDMX',
    cron: '0 20 * * 0',
    timezone: 'America/Mexico_City',
    lastRun: lastCronRun,
    lastResult: lastCronResult,
  });
});

// --- Redirects ---

// /app/* → /fleet-intelligence/*
app.get('/app/*', (req, res) => {
  const rest = req.params[0];
  res.redirect(301, `/fleet-intelligence/${rest}`);
});

// /site/{proto}/ and /site/{proto} → /demos/{proto}/
const protos = ['dashboard', 'battery', 'collections', 'fleetmap', 'onboarding', 'roadmap'];
protos.forEach((proto) => {
  app.get(`/site/${proto}`, (_req, res) => res.redirect(301, `/demos/${proto}/`));
  app.get(`/site/${proto}/`, (_req, res) => res.redirect(301, `/demos/${proto}/`));
});

// /site/{proto}/rest* → /demos/{proto}/rest*
protos.forEach((proto) => {
  app.get(`/site/${proto}/*`, (req, res) => {
    const rest = req.params[0];
    res.redirect(301, `/demos/${proto}/${rest}`);
  });
});

// --- Rewrites ---

// Landing page
app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'site', 'index.html'));
});

// /demos/{proto}/ → site/{proto}/index.html
protos.forEach((proto) => {
  app.get(`/demos/${proto}/`, (_req, res) => {
    res.sendFile(path.join(__dirname, 'site', proto, 'index.html'));
  });
  app.get(`/demos/${proto}`, (_req, res) => {
    res.redirect(301, `/demos/${proto}/`);
  });
});

// /demos/* → static from site/
app.use('/demos', express.static(path.join(__dirname, 'site')));

// /site/* → static from site/ (landing page absolute refs like /site/images/*)
app.use('/site', express.static(path.join(__dirname, 'site')));

// Fleet Intelligence SPA

// Hashed Vite assets — long cache
app.use(
  '/fleet-intelligence/assets',
  express.static(path.join(__dirname, 'fleet-intelligence', 'dist', 'assets'), {
    maxAge: '1y',
    immutable: true,
  })
);

// Specific static files from dist
['favicon.svg', 'lafa-logo.svg', 'demo-trips.csv'].forEach((file) => {
  app.get(`/fleet-intelligence/${file}`, (_req, res) => {
    res.sendFile(path.join(__dirname, 'fleet-intelligence', 'dist', file));
  });
});

// SPA catch-all — any /fleet-intelligence/* that didn't match above
app.get('/fleet-intelligence', (_req, res) => {
  res.sendFile(path.join(__dirname, 'fleet-intelligence', 'dist', 'index.html'));
});
app.get('/fleet-intelligence/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'fleet-intelligence', 'dist', 'index.html'));
});

// --- Start server ---
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`LAFA server listening on port ${PORT}`);

  // Schedule payroll auto-close: Sunday 20:00 CDMX
  if (supabaseAdmin) {
    // W7: Retry logic with exponential backoff
    cron.schedule('0 20 * * 0', async () => {
      console.log('[cron] Payroll auto-close triggered');
      const MAX_RETRIES = 3;
      for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
          const result = await closePayrollWeek(supabaseAdmin);
          lastCronRun = new Date().toISOString();
          lastCronResult = result;
          console.log(`[cron] Payroll auto-close ${result.status}:`, JSON.stringify(result));
          return;
        } catch (err) {
          console.error(`[cron] Attempt ${attempt}/${MAX_RETRIES} failed:`, err.message);
          if (attempt === MAX_RETRIES) {
            lastCronRun = new Date().toISOString();
            lastCronResult = { status: 'error', reason: err.message };
            console.error('[cron] All retry attempts exhausted');
          } else {
            const delay = attempt * 5000;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      }
    }, { timezone: 'America/Mexico_City' });
    console.log('Payroll cron scheduled: Sunday 20:00 CDMX');
  } else {
    console.warn('Payroll cron NOT scheduled — Supabase not configured');
  }
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 5000);
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
