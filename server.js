const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Health check ---
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
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
