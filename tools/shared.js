// ============================================================
// LAFA Internal Tools — Shared Foundation
// Sidebar nav, mock data (200 vehicles), utilities, chart defaults
// ============================================================

// ---------- Design Tokens ----------
const COLORS = {
  // Brand Core
  dark: '#1B1A23', card: '#252B37', cardHover: '#2D3444',
  orange: '#FF5A00', orangeLogo: '#FF6200',
  // Semantic Status
  green: '#22C55E', yellow: '#EAB308', red: '#EF4444', blue: '#3B82F6',
  // Track Colors
  teal: '#14B8A6',      // DaE track
  amber: '#F59E0B',     // LTO track
  // SOH Heatmap
  sohExcellent: '#16A34A', sohGood: '#22C55E', sohFair: '#4ADE80',
  sohWatch: '#EAB308', sohCritical: '#EF4444',
  // Neutrals
  gray100: '#F3F4F6', gray300: '#D1D5DB', gray400: '#9CA3AF',
  gray500: '#6B7280', gray600: '#4B5563', gray700: '#374151', gray800: '#1F2937',
  border: 'rgba(255,255,255,0.06)',
};

// ---------- Seeded Random ----------
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const rand = seededRandom(42);
function randInt(min, max) { return Math.floor(rand() * (max - min + 1)) + min; }
function randFloat(min, max) { return +(rand() * (max - min) + min).toFixed(2); }
function pick(arr) { return arr[randInt(0, arr.length - 1)]; }
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------- Mexican Names ----------
const FIRST_NAMES_M = ['Carlos', 'Miguel', 'José', 'Luis', 'Juan', 'Roberto', 'Fernando', 'Alejandro', 'Ricardo', 'Eduardo', 'Francisco', 'Daniel', 'Marco', 'Antonio', 'Sergio', 'Jorge', 'Pedro', 'Rafael', 'Manuel', 'Óscar', 'Arturo', 'Raúl', 'Javier', 'Héctor', 'Enrique', 'Adrián', 'Hugo', 'Armando', 'Víctor', 'Diego'];
const FIRST_NAMES_F = ['María', 'Ana', 'Laura', 'Sofía', 'Fernanda', 'Gabriela', 'Carmen', 'Patricia', 'Rosa', 'Elena', 'Lucia', 'Isabel', 'Sandra', 'Verónica', 'Claudia', 'Silvia', 'Andrea', 'Diana', 'Guadalupe', 'Teresa'];
const LAST_NAMES = ['García', 'Hernández', 'López', 'Martínez', 'González', 'Rodríguez', 'Pérez', 'Sánchez', 'Ramírez', 'Torres', 'Flores', 'Rivera', 'Gómez', 'Díaz', 'Cruz', 'Morales', 'Reyes', 'Gutiérrez', 'Ortiz', 'Ramos', 'Mendoza', 'Castillo', 'Vargas', 'Ruiz', 'Jiménez', 'Aguilar', 'Herrera', 'Medina', 'Castro', 'Vega'];

const CDMX_COLONIAS = ['Condesa', 'Roma Norte', 'Roma Sur', 'Polanco', 'Del Valle', 'Narvarte', 'Coyoacán', 'Santa Fe', 'Juárez', 'Centro', 'Tlalpan', 'Iztapalapa', 'Xochimilco', 'Azcapotzalco', 'Reforma'];

// ---------- Vehicle Models ----------
const VEHICLE_MODELS = {
  Geely: ['Geometry E', 'Geometry C', 'Emgrand EV'],
  JAC: ['E10X', 'iEV7S', 'iEVS4'],
  GAC: ['Aion S', 'Aion Y', 'AION V'],
};

// ---------- Generate Mock Data ----------
const OEM_DIST = [];
for (let i = 0; i < 80; i++) OEM_DIST.push('Geely');
for (let i = 0; i < 73; i++) OEM_DIST.push('JAC');
for (let i = 0; i < 47; i++) OEM_DIST.push('GAC');

const PRODUCT_DIST = [];
for (let i = 0; i < 133; i++) PRODUCT_DIST.push('DaE');
for (let i = 0; i < 67; i++) PRODUCT_DIST.push('LTO');

const STATUSES = ['active', 'active', 'active', 'active', 'active', 'active', 'active', 'active', 'active', 'active', 'maintenance', 'charging', 'idle'];

const PLATFORMS = ['DiDi', 'DiDi', 'DiDi', 'Uber', 'Uber', 'DiDi+Uber'];

function generateDrivers(count) {
  const drivers = [];
  const shuffledOEMs = shuffle(OEM_DIST).slice(0, count);
  const shuffledProducts = shuffle(PRODUCT_DIST).slice(0, count);

  for (let i = 0; i < count; i++) {
    const isMale = rand() > 0.3;
    const firstName = isMale ? pick(FIRST_NAMES_M) : pick(FIRST_NAMES_F);
    const lastName1 = pick(LAST_NAMES);
    const lastName2 = pick(LAST_NAMES);
    const oem = shuffledOEMs[i];
    const product = shuffledProducts[i];
    const model = pick(VEHICLE_MODELS[oem]);
    const vehicleId = `LAF-${String(i + 1).padStart(3, '0')}`;
    const status = pick(STATUSES);
    const platform = pick(PLATFORMS);

    // SOH: mostly 92-98%, 5 anomalies below 88%
    let soh;
    if (i < 5) {
      soh = randFloat(78, 87);
    } else {
      soh = randFloat(91, 99);
    }

    const cycles = randInt(200, 1200);
    const avgTemp = randFloat(20, 28);
    const rating = randFloat(4.2, 4.95);

    // Revenue: DaE = 6000-9000/week, LTO = up to 10000/week
    const weeklyRevenue = product === 'DaE' ? randInt(6000, 9000) : randInt(5000, 10000);

    // Payment history (12 weeks)
    const paymentOnTimeRate = product === 'DaE' ? 0.85 : 0.70;
    const payments = [];
    for (let w = 0; w < 12; w++) {
      const r = rand();
      let payStatus;
      if (r < paymentOnTimeRate) payStatus = 'on-time';
      else if (r < paymentOnTimeRate + 0.10) payStatus = 'late';
      else payStatus = 'default';
      payments.push({
        week: w + 1,
        amount: product === 'DaE' ? randInt(2500, 3500) : randInt(3000, 5000),
        status: payStatus,
        date: new Date(2026, 0, 6 + w * 7).toISOString().split('T')[0],
      });
    }

    // Days overdue for collections (0 = current, positive = overdue)
    const daysOverdue = payments[11].status === 'default' ? randInt(1, 21) : (payments[11].status === 'late' ? randInt(1, 5) : 0);

    drivers.push({
      id: i + 1,
      vehicleId,
      firstName,
      lastName: `${lastName1} ${lastName2}`,
      fullName: `${firstName} ${lastName1} ${lastName2}`,
      shortName: `${firstName} ${lastName1}`,
      oem,
      model,
      product,
      status,
      platform,
      soh,
      cycles,
      avgTemp,
      rating: +rating.toFixed(1),
      weeklyRevenue,
      payments,
      daysOverdue,
      colonia: pick(CDMX_COLONIAS),
      phone: `55${randInt(1000, 9999)}${randInt(1000, 9999)}`,
      joinDate: new Date(2025, randInt(0, 11), randInt(1, 28)).toISOString().split('T')[0],
      totalTrips: randInt(500, 8000),
    });
  }
  return drivers;
}

const DRIVERS = generateDrivers(200);

// Computed fleet stats
const FLEET_STATS = {
  totalVehicles: 200,
  activeVehicles: DRIVERS.filter(d => d.status === 'active').length,
  maintenanceVehicles: DRIVERS.filter(d => d.status === 'maintenance').length,
  chargingVehicles: DRIVERS.filter(d => d.status === 'charging').length,
  idleVehicles: DRIVERS.filter(d => d.status === 'idle').length,
  avgSOH: +(DRIVERS.reduce((s, d) => s + d.soh, 0) / 200).toFixed(1),
  anomalies: DRIVERS.filter(d => d.soh < 88).length,
  avgTemp: +(DRIVERS.reduce((s, d) => s + d.avgTemp, 0) / 200).toFixed(1),
  avgCycles: Math.round(DRIVERS.reduce((s, d) => s + d.cycles, 0) / 200),
  weeklyRevenue: DRIVERS.reduce((s, d) => s + d.weeklyRevenue, 0),
  fleetUtilization: +((DRIVERS.filter(d => d.status === 'active').length / 200) * 100).toFixed(1),
  paymentsOnTime: +((DRIVERS.filter(d => d.payments[11].status === 'on-time').length / 200) * 100).toFixed(1),
  daeCount: DRIVERS.filter(d => d.product === 'DaE').length,
  ltoCount: DRIVERS.filter(d => d.product === 'LTO').length,
  geelyCount: DRIVERS.filter(d => d.oem === 'Geely').length,
  jacCount: DRIVERS.filter(d => d.oem === 'JAC').length,
  gacCount: DRIVERS.filter(d => d.oem === 'GAC').length,
};

// Weekly revenue series (12 weeks)
const WEEKLY_REVENUE = [];
for (let w = 0; w < 12; w++) {
  const daeRev = DRIVERS.filter(d => d.product === 'DaE').reduce((s, d) => s + d.payments[w].amount * (d.payments[w].status !== 'default' ? 1 : 0), 0);
  const ltoRev = DRIVERS.filter(d => d.product === 'LTO').reduce((s, d) => s + d.payments[w].amount * (d.payments[w].status !== 'default' ? 1 : 0), 0);
  WEEKLY_REVENUE.push({
    week: `Sem ${w + 1}`,
    date: new Date(2026, 0, 6 + w * 7).toISOString().split('T')[0],
    dae: daeRev,
    lto: ltoRev,
    total: daeRev + ltoRev,
  });
}

// Payment status by week (last 4 weeks)
const PAYMENT_STATUS_WEEKS = [];
for (let w = 8; w < 12; w++) {
  PAYMENT_STATUS_WEEKS.push({
    week: `Sem ${w + 1}`,
    onTime: DRIVERS.filter(d => d.payments[w].status === 'on-time').length,
    late: DRIVERS.filter(d => d.payments[w].status === 'late').length,
    default: DRIVERS.filter(d => d.payments[w].status === 'default').length,
  });
}

// ---------- Utilities ----------
function formatMXN(amount) {
  return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
}

function formatNumber(n) {
  return new Intl.NumberFormat('es-MX').format(n);
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} sem`;
  return `Hace ${Math.floor(days / 30)} mes${Math.floor(days / 30) > 1 ? 'es' : ''}`;
}

function statusBadge(status) {
  const map = {
    'active': { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400', label: 'Activo' },
    'maintenance': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-400', label: 'Mantenimiento' },
    'charging': { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-400', label: 'Cargando' },
    'idle': { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-400', label: 'Inactivo' },
    'on-time': { bg: 'bg-green-500/10', text: 'text-green-400', dot: 'bg-green-400', label: 'A tiempo' },
    'late': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', dot: 'bg-yellow-400', label: 'Tarde' },
    'default': { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-400', label: 'Impago' },
  };
  const s = map[status] || map['idle'];
  return `<span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${s.bg} ${s.text}"><span class="w-1.5 h-1.5 rounded-full ${s.dot}"></span>${s.label}</span>`;
}

function productBadge(product) {
  if (product === 'DaE') return '<span class="px-2.5 py-1 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400">DaE</span>';
  return '<span class="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">LTO</span>';
}

function oemBadge(oem) {
  const colors = {
    Geely: 'bg-teal-500/10 text-teal-400',
    JAC: 'bg-orange-500/10 text-orange-400',
    GAC: 'bg-amber-500/10 text-amber-400',
  };
  return `<span class="px-2.5 py-1 rounded-full text-xs font-medium ${colors[oem] || ''}">${oem}</span>`;
}

function sohColor(soh) {
  if (soh >= 95) return COLORS.green;
  if (soh >= 90) return COLORS.sohFair;
  if (soh >= 85) return COLORS.yellow;
  return COLORS.red;
}

function sohBgClass(soh) {
  if (soh >= 95) return 'bg-green-500';
  if (soh >= 90) return 'bg-green-400';
  if (soh >= 85) return 'bg-yellow-500';
  return 'bg-red-500';
}

function animateCounter(el, target, duration = 800, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();
  const isFloat = String(target).includes('.');

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = start + (target - start) * eased;
    el.textContent = prefix + (isFloat ? current.toFixed(1) : Math.round(current).toLocaleString('es-MX')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ---------- ApexCharts Defaults ----------
const APEX_DEFAULTS = {
  chart: {
    background: 'transparent',
    foreColor: COLORS.gray400,
    fontFamily: 'Inter Tight, system-ui, sans-serif',
    toolbar: { show: false },
    animations: { enabled: true, easing: 'easeinout', speed: 800 },
  },
  grid: {
    borderColor: 'rgba(255,255,255,0.06)',
    strokeDashArray: 3,
  },
  tooltip: {
    theme: 'dark',
    style: { fontSize: '12px' },
  },
  colors: [COLORS.orange, COLORS.teal, COLORS.amber, COLORS.green, COLORS.yellow, COLORS.red],
  stroke: { curve: 'smooth' },
};

function mergeApexDefaults(opts) {
  return {
    ...opts,
    chart: { ...APEX_DEFAULTS.chart, ...opts.chart },
    grid: { ...APEX_DEFAULTS.grid, ...opts.grid },
    tooltip: { ...APEX_DEFAULTS.tooltip, ...opts.tooltip },
    colors: opts.colors || APEX_DEFAULTS.colors,
    stroke: { ...APEX_DEFAULTS.stroke, ...opts.stroke },
  };
}

// ---------- Sidebar Navigation ----------
const SIDEBAR_PAGES = [
  { id: 'roadmap', label: 'Roadmap', href: 'roadmap.html', icon: 'trending-up' },
  { id: 'dashboard', label: 'Dashboard', href: 'dashboard.html', icon: 'layout-dashboard' },
  { id: 'collections', label: 'Cobranza', href: 'collections.html', icon: 'message-square' },
  { id: 'battery', label: 'Baterías', href: 'battery.html', icon: 'battery-charging' },
  { id: 'onboarding', label: 'Onboarding', href: 'onboarding.html', icon: 'user-plus' },
];

const LUCIDE_ICONS = {
  'layout-dashboard': '<path d="M3 3h7v9H3z"/><path d="M14 3h7v5h-7z"/><path d="M14 12h7v9h-7z"/><path d="M3 16h7v5H3z"/>',
  'message-square': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  'battery-charging': '<path d="M15 7h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-1"/><path d="M6 7H2v10h4"/><path d="M22 11v2"/><line x1="10" x2="10" y1="7" y2="17"/><line x1="6" x2="14" y1="12" y2="12"/>',
  'user-plus': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>',
  'chevron-left': '<path d="m15 18-6-6 6-6"/>',
  'chevron-right': '<path d="m9 18 6-6-6-6"/>',
  'arrow-left': '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  'bell': '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  'filter': '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  'x': '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  'menu': '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
  'trending-up': '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  'alert-triangle': '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  'clock': '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  'zap': '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'eye': '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  'file-text': '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>',
  'shield-check': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>',
  'camera': '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
  'activity': '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
  'grip-vertical': '<circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/>',
  'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'home': '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  'smartphone': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  'car': '<path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-2.7-3.4A2 2 0 0 0 13.7 6H10.3a2 2 0 0 0-1.6.6L6 10l-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>',
  'image': '<rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>',
  'send': '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
};

function lucideIcon(name, cls = 'w-5 h-5') {
  const paths = LUCIDE_ICONS[name] || '';
  return `<svg xmlns="http://www.w3.org/2000/svg" class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

// ---------- Responsive Chart Height Helper ----------
function responsiveChartHeight(desktop, tablet, mobile) {
  const w = window.innerWidth;
  if (w < 480) return mobile || 180;
  if (w < 768) return tablet || 220;
  return desktop || 256;
}

function initSidebar(currentPage) {
  const sidebar = document.getElementById('app-sidebar');
  if (!sidebar) return;

  const logoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 124 22" class="h-5 w-auto"><g clip-path="url(#sb-clip)"><path d="M122.258 18.187C121.802 18.187 121.346 18.1759 120.89 18.187C120.669 18.2093 120.46 18.0923 120.376 17.8947C120.155 17.4632 119.92 17.0372 119.725 16.5973C119.659 16.3969 119.45 16.2716 119.232 16.2994H114.963C113.674 16.2994 112.387 16.3161 111.098 16.3106C110.863 16.2827 110.636 16.4136 110.558 16.6279C110.372 17.0205 110.157 17.3936 109.968 17.7833C109.881 18.006 109.658 18.1508 109.408 18.1397C108.432 18.1397 107.456 18.1703 106.484 18.1786C106.24 18.1786 106.205 18.1174 106.306 17.9225C106.995 16.6112 107.68 15.3027 108.371 13.9915C109.164 12.502 109.968 11.0181 110.761 9.52307C111.722 7.7218 112.681 5.91774 113.63 4.11369C113.706 3.91881 113.912 3.79631 114.127 3.8158C114.914 3.82415 115.701 3.82415 116.488 3.8158C116.688 3.79909 116.88 3.91045 116.952 4.09142C117.608 5.37764 118.276 6.6583 118.93 7.94731C119.818 9.70682 120.692 11.4719 121.584 13.2314C122.351 14.7515 123.138 16.2688 123.91 17.7805C124.078 18.1063 124.032 18.1703 123.657 18.1731C123.19 18.1954 122.722 18.1926 122.258 18.1926V18.187ZM115.282 7.61322C115.195 7.74407 115.143 7.81089 115.108 7.88606C114.185 9.67341 113.261 11.4608 112.341 13.2481C112.207 13.5042 112.236 13.5488 112.527 13.5488H117.835C118.122 13.5488 118.154 13.4903 118.035 13.2453C117.179 11.4747 116.319 9.70404 115.46 7.93339C115.416 7.85544 115.364 7.76635 115.28 7.61601L115.282 7.61322Z" fill="white"/><path d="M89.2924 18.187H87.8956C87.6924 18.2037 87.5036 18.0923 87.4281 17.9114C87.2103 17.4799 86.9664 17.0595 86.7718 16.6168C86.705 16.3969 86.4785 16.2604 86.2433 16.2938C85.7003 16.3078 85.1514 16.2938 84.6055 16.2938C82.4479 16.2938 80.2932 16.3133 78.1356 16.3106C77.883 16.2799 77.6448 16.4247 77.5635 16.6586C77.3777 17.0817 77.1221 17.4798 76.8985 17.8891C76.8172 18.0673 76.6285 18.1786 76.4281 18.1675H73.5561C73.2803 18.1675 73.2425 18.0979 73.3703 17.8473C74.0266 16.5806 74.6828 15.3139 75.3391 14.0443C76.007 12.7553 76.6749 11.4691 77.3457 10.1801C77.6623 9.57318 77.9991 8.98018 78.3156 8.37326C78.9284 7.20118 79.5324 6.02353 80.1422 4.85145C80.2787 4.58975 80.4326 4.33641 80.5604 4.07471C80.6417 3.9021 80.8275 3.7963 81.025 3.81857H83.3075C83.4904 3.80465 83.6617 3.90766 83.7285 4.07192C84.1583 4.87373 84.5997 5.66718 85.0237 6.46898C85.9268 8.18395 86.8212 9.9017 87.7185 11.6194C88.6013 13.2954 89.4783 14.9714 90.3465 16.6502C90.5556 17.0483 90.7763 17.4409 90.9767 17.8418C91.119 18.123 91.0696 18.187 90.7357 18.1898H89.2866H89.2953L89.2924 18.187ZM79.1752 13.5098C79.2594 13.5293 79.3465 13.5432 79.4336 13.5516H84.8233C85.0934 13.5516 85.1195 13.5042 85.0092 13.2815C84.1118 11.4942 83.2145 9.71238 82.3143 7.93617C82.2766 7.86378 82.233 7.79696 82.1865 7.73015L82.0965 7.71901L79.1752 13.507V13.5098Z" fill="white"/><path d="M95.019 10.9875V4.24454C95.019 3.84364 95.0364 3.82693 95.4604 3.82693H105.313C105.668 3.82693 105.711 3.88262 105.624 4.20278C105.447 4.84032 105.273 5.47787 105.093 6.11541C104.947 6.63325 104.936 6.6416 104.381 6.6416H98.7447C98.0797 6.6416 98.0739 6.6416 98.071 7.27914C98.071 8.17282 98.071 9.08042 98.0826 9.98244C98.0826 10.3082 98.1116 10.3304 98.4543 10.3304H103.153C103.615 10.3304 103.632 10.3472 103.525 10.7815C103.362 11.4329 103.185 12.0788 103.031 12.7303C103.005 12.953 102.796 13.1145 102.56 13.0894H102.54C101.198 13.0811 99.8569 13.0894 98.5124 13.0894C98.0855 13.0894 98.0797 13.0894 98.0797 13.5098V17.6775C98.0797 18.1536 98.0681 18.1647 97.5657 18.1647H95.5271C95.0393 18.1647 95.0277 18.1508 95.0277 17.6914V10.9736L95.019 10.9875Z" fill="white"/><path d="M59.9745 10.9791V4.34198C59.9745 4.00604 60.1459 3.83714 60.4885 3.83528H62.5822C62.9859 3.83528 63.012 3.85755 63.012 4.24454V15.0494C63.012 15.4948 63.012 15.5004 63.4679 15.5004H68.8344C69.2728 15.5004 69.2932 15.5199 69.2961 15.9319V17.8362C69.2961 18.0923 69.1886 18.1842 68.9244 18.1842H60.3607C60.021 18.1842 59.9716 18.1285 59.9716 17.7777V10.9819L59.9745 10.9791Z" fill="white"/></g><defs><clipPath id="sb-clip"><rect width="124" height="21" fill="white" transform="translate(0 0.5)"/></clipPath></defs></svg>`;

  sidebar.innerHTML = `
    <div class="flex flex-col h-full bg-[#16151E] border-r border-white/5 transition-all duration-300 sidebar-collapsed" id="sidebar-inner">
      <div class="flex items-center h-16 px-4 border-b border-white/5">
        <a href="../index.html" class="sidebar-logo hidden">${logoSVG}</a>
        <button id="sidebar-toggle" class="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors ml-auto" aria-label="Toggle sidebar">
          ${lucideIcon('menu', 'w-5 h-5')}
        </button>
      </div>
      <nav class="flex-1 px-3 py-4 space-y-1">
        ${SIDEBAR_PAGES.map(p => `
          <a href="${p.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${p.id === currentPage ? 'bg-lafa-orange/10 text-[#FF5A00]' : 'text-gray-400 hover:text-white hover:bg-white/5'}">
            ${lucideIcon(p.icon, 'w-5 h-5 flex-shrink-0')}
            <span class="sidebar-label hidden whitespace-nowrap">${p.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="px-3 pb-4">
        <div class="border-t border-white/5 pt-4">
          <a href="../index.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
            ${lucideIcon('arrow-left', 'w-5 h-5 flex-shrink-0')}
            <span class="sidebar-label hidden whitespace-nowrap">Volver a LAFA</span>
          </a>
        </div>
      </div>
    </div>
  `;

  const inner = document.getElementById('sidebar-inner');
  const toggle = document.getElementById('sidebar-toggle');
  let expanded = true;
  const isMobile = () => window.innerWidth < 768;
  let backdrop = null;

  function closeMobileDrawer() {
    inner.style.width = '64px';
    inner.style.position = '';
    inner.style.zIndex = '';
    inner.style.height = '';
    inner.querySelectorAll('.sidebar-label, .sidebar-logo').forEach(el => el.classList.add('hidden'));
    if (backdrop) { backdrop.remove(); backdrop = null; }
    expanded = false;
  }

  function openMobileDrawer() {
    inner.style.width = '240px';
    inner.style.position = 'fixed';
    inner.style.zIndex = '50';
    inner.style.height = '100vh';
    inner.querySelectorAll('.sidebar-label, .sidebar-logo').forEach(el => el.classList.remove('hidden'));
    // Create backdrop
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', closeMobileDrawer);
    expanded = true;
  }

  // Initial state based on screen size
  if (isMobile()) {
    inner.style.width = '64px';
    inner.querySelectorAll('.sidebar-label, .sidebar-logo').forEach(el => el.classList.add('hidden'));
    expanded = false;
  } else {
    inner.style.width = '240px';
    inner.querySelectorAll('.sidebar-label, .sidebar-logo').forEach(el => el.classList.remove('hidden'));
  }

  toggle.addEventListener('click', () => {
    if (isMobile()) {
      if (expanded) closeMobileDrawer();
      else openMobileDrawer();
    } else {
      expanded = !expanded;
      inner.style.width = expanded ? '240px' : '64px';
      inner.querySelectorAll('.sidebar-label, .sidebar-logo').forEach(el => {
        el.classList.toggle('hidden', !expanded);
      });
    }
  });

  // Close drawer on nav link click (mobile)
  inner.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (isMobile() && expanded) closeMobileDrawer();
    });
  });

  // Responsive listener: auto-collapse on resize to mobile
  const mql = window.matchMedia('(max-width: 768px)');
  mql.addEventListener('change', (e) => {
    if (e.matches) {
      closeMobileDrawer();
    } else {
      inner.style.position = '';
      inner.style.zIndex = '';
      inner.style.height = '';
      if (backdrop) { backdrop.remove(); backdrop = null; }
      inner.style.width = '240px';
      inner.querySelectorAll('.sidebar-label, .sidebar-logo').forEach(el => el.classList.remove('hidden'));
      expanded = true;
    }
  });
}

// ---------- Page Header ----------
function createPageHeader(title, subtitle) {
  return `
    <header class="glass-nav sticky top-0 z-40 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      <div class="flex items-center gap-3 min-w-0">
        <button class="md:hidden p-2.5 -ml-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors flex-shrink-0" id="mobile-sidebar-toggle" aria-label="Abrir menú">
          ${lucideIcon('menu', 'w-5 h-5')}
        </button>
        <div class="min-w-0">
          <h1 class="text-xl sm:text-2xl font-semibold text-white truncate">${title}</h1>
          ${subtitle ? `<p class="text-sm text-gray-400 mt-0.5 hidden sm:block">${subtitle}</p>` : ''}
        </div>
      </div>
      <div class="flex items-center gap-3 flex-shrink-0">
        <button class="relative p-2.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" id="notification-bell" aria-label="Notificaciones">
          ${lucideIcon('bell', 'w-5 h-5')}
          <span id="notif-badge" class="notif-badge">${NOTIFICATIONS.length}</span>
        </button>
        <div class="w-8 h-8 rounded-full bg-lafa-orange/20 flex items-center justify-center text-xs font-bold text-lafa-orange">JD</div>
      </div>
    </header>
  `;
}

// ---------- Notification Panel ----------
const _worstBattery = [...DRIVERS].sort((a, b) => a.soh - b.soh)[0];
const NOTIFICATIONS = [
  {
    id: 'fleet',
    type: 'fleet',
    title: `Utilización cayó a ${FLEET_STATS.fleetUtilization}%`,
    desc: `${FLEET_STATS.idleVehicles} vehículos inactivos de ${FLEET_STATS.totalVehicles}.`,
    time: 'Hace 3h',
    link: 'dashboard.html',
  },
  {
    id: 'payment',
    type: 'payment',
    title: 'Cobranza renegociada',
    desc: 'Carlos Mendoza aceptó plan parcial — $2,100 MXN recibidos, $2,150 pendiente lunes.',
    time: 'Hace 5h',
    link: 'collections.html',
  },
  {
    id: 'alert',
    type: 'alert',
    title: `${FLEET_STATS.anomalies} anomalías de batería`,
    desc: `${_worstBattery.vehicleId} peor caso — SOH ${_worstBattery.soh.toFixed(1)}%. Ver tabla de diagnóstico.`,
    time: 'Hace 2h',
    link: 'battery.html',
  },
  {
    id: 'onboarding',
    type: 'onboarding',
    title: 'Nuevo conductor pendiente',
    desc: `${DRIVERS[DRIVERS.length - 1].shortName} — documentos por verificar.`,
    time: 'Hace 6h',
    link: 'onboarding.html',
  },
];

const NOTIF_ICON_MAP = {
  alert:       { icon: 'alert-triangle', color: 'text-red-400' },
  payment:     { icon: 'clock',          color: 'text-yellow-400' },
  maintenance: { icon: 'zap',            color: 'text-blue-400' },
  fleet:       { icon: 'activity',       color: 'text-orange-400' },
  onboarding:  { icon: 'user-plus',      color: 'text-green-400' },
};

function initNotifications() {
  const bell = document.getElementById('notification-bell');
  if (!bell) return;

  const STORAGE_KEY = 'lafa-notif-read';

  // Restore read state from localStorage
  let readSet;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    readSet = stored ? new Set(JSON.parse(stored)) : new Set();
  } catch (_) {
    readSet = new Set();
  }

  function saveReadState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...readSet]));
  }

  function getUnreadCount() {
    return NOTIFICATIONS.filter(n => !readSet.has(n.id)).length;
  }

  function updateBadge() {
    const badge = document.getElementById('notif-badge');
    if (!badge) return;
    const count = getUnreadCount();
    badge.textContent = count;
    badge.classList.toggle('is-hidden', count === 0);
  }

  function updateMarkAllBtn() {
    const btn = panel.querySelector('.notif-mark-all');
    if (btn) btn.classList.toggle('is-hidden', getUnreadCount() === 0);
  }

  function renderItem(n) {
    const ic = NOTIF_ICON_MAP[n.type] || NOTIF_ICON_MAP.alert;
    const isRead = readSet.has(n.id);
    const stateClass = isRead ? 'is-read' : 'is-unread';
    return `
      <div class="notif-item ${stateClass} notif-type-${n.type}" data-notif-id="${n.id}" data-notif-link="${n.link}">
        <div class="flex items-start gap-3 pr-4">
          <span class="notif-icon mt-0.5">${lucideIcon(ic.icon, 'w-4 h-4 ' + ic.color)}</span>
          <div class="flex-1 min-w-0">
            <p class="notif-title text-sm font-medium">${n.title}</p>
            <p class="notif-desc text-xs mt-0.5">${n.desc}</p>
            <p class="notif-time text-xs text-gray-600 mt-1">${n.time}</p>
          </div>
        </div>
        <span class="notif-dot"></span>
      </div>`;
  }

  function renderPanel() {
    const listEl = panel.querySelector('.notif-list');
    if (listEl) listEl.innerHTML = NOTIFICATIONS.map(renderItem).join('');
    updateMarkAllBtn();
  }

  function markAsRead(id) {
    if (readSet.has(id)) return;
    readSet.add(id);
    saveReadState();
    // Update just this item visually
    const item = panel.querySelector(`[data-notif-id="${id}"]`);
    if (item) {
      item.classList.remove('is-unread');
      item.classList.add('is-read');
    }
    updateBadge();
    updateMarkAllBtn();
  }

  function markAllAsRead() {
    NOTIFICATIONS.forEach(n => readSet.add(n.id));
    saveReadState();
    panel.querySelectorAll('.notif-item').forEach(el => {
      el.classList.remove('is-unread');
      el.classList.add('is-read');
    });
    updateBadge();
    updateMarkAllBtn();
  }

  // Create panel element
  const panel = document.createElement('div');
  panel.id = 'notification-panel';
  panel.className = 'fixed top-16 right-4 w-80 max-w-[calc(100vw-32px)] max-h-[70vh] overflow-y-auto bg-[#1E1D28] border border-white/10 rounded-xl shadow-2xl z-50 hidden';
  panel.innerHTML = `
    <div class="notif-header">
      <h3 class="text-sm font-semibold text-white">Notificaciones</h3>
      <button class="notif-mark-all">Marcar todo como leído</button>
    </div>
    <div class="notif-list"></div>
  `;
  document.body.appendChild(panel);

  // Initial render
  renderPanel();
  updateBadge();

  // Bell toggle
  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.toggle('hidden');
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && !bell.contains(e.target)) {
      panel.classList.add('hidden');
    }
  });

  // Click on notification item
  panel.addEventListener('click', (e) => {
    const item = e.target.closest('.notif-item');
    if (!item) return;
    e.preventDefault();
    e.stopPropagation();
    const id = item.dataset.notifId;
    const link = item.dataset.notifLink;
    markAsRead(id);
    setTimeout(() => { window.location.href = link; }, 150);
  });

  // Mark all as read button
  panel.querySelector('.notif-mark-all').addEventListener('click', (e) => {
    e.stopPropagation();
    markAllAsRead();
  });

  // Expose functions globally
  window.LAFA.markNotifRead = markAsRead;
  window.LAFA.markAllNotifsRead = markAllAsRead;
}

// ---------- HTML Template Helpers ----------
function pageShell(currentPage, title, subtitle) {
  return { currentPage, title, subtitle };
}

// ---------- Page Init Utility ----------
function initPage(pageId, title, subtitle, icons = {}) {
  initSidebar(pageId);
  document.getElementById('page-header').innerHTML = createPageHeader(title, subtitle);
  initNotifications();
  // Wire mobile hamburger to sidebar toggle
  const mobileToggle = document.getElementById('mobile-sidebar-toggle');
  const sidebarToggle = document.getElementById('sidebar-toggle');
  if (mobileToggle && sidebarToggle) {
    mobileToggle.addEventListener('click', () => sidebarToggle.click());
  }
  Object.entries(icons).forEach(([elId, iconName]) => {
    const el = document.getElementById(elId);
    if (el) el.innerHTML = lucideIcon(iconName, 'w-4 h-4');
  });
}

// ---------- Chart Lifecycle Utility ----------
function createChart(containerId, options, existingChart) {
  if (existingChart) existingChart.destroy();
  const chart = new ApexCharts(
    document.getElementById(containerId),
    mergeApexDefaults(options)
  );
  chart.render();
  return chart;
}

// ---------- CSV Export Utility ----------
function exportCSV(headers, rows, filename) {
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

// ---------- Normalize (accent-insensitive search) ----------
function normalize(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

// ---------- Filter Binding Utility ----------
function bindFilters(filterIds, callback) {
  filterIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener(el.tagName === 'INPUT' ? 'input' : 'change', callback);
  });
}

// ---------- Modal Controller ----------
// Two modes:
//   "simple"    — toggles .hidden on the container (dashboard, roadmap)
//   "animated"  — uses .hidden/.open/.closing classes with CSS transitions (onboarding)
//
// Usage:
//   const modal = L.createModal('detail-modal', { overlay: 'detail-overlay' });
//   modal.open();  modal.close();
//
//   const modal = L.createModal('onboard-modal', { animated: true });
//   modal.open();  modal.close();
//
function createModal(containerId, opts = {}) {
  const el = document.getElementById(containerId);
  if (!el) return { open() {}, close() {}, isOpen() { return false; } };

  const animated = opts.animated || false;
  const overlayId = opts.overlay || null;
  const closeDuration = opts.closeDuration || 250;
  let onClose = opts.onClose || null;

  function isOpen() {
    return !el.classList.contains('hidden');
  }

  function open() {
    if (animated) {
      el.classList.remove('hidden', 'closing');
      requestAnimationFrame(() => el.classList.add('open'));
    } else {
      el.classList.remove('hidden');
    }
  }

  function close() {
    if (!isOpen()) return;
    if (onClose) onClose();
    if (animated) {
      el.classList.remove('open');
      el.classList.add('closing');
      setTimeout(() => {
        el.classList.add('hidden');
        el.classList.remove('closing');
      }, closeDuration);
    } else {
      el.classList.add('hidden');
    }
  }

  // Overlay / backdrop click
  if (overlayId) {
    const overlay = document.getElementById(overlayId);
    if (overlay) overlay.addEventListener('click', close);
  } else if (animated) {
    // For animated modals, clicking the backdrop itself closes
    el.addEventListener('click', (e) => {
      if (e.target === el) close();
    });
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });

  return { open, close, isOpen, set onClose(fn) { onClose = fn; } };
}

// Export for use in page scripts
window.LAFA = {
  COLORS, DRIVERS, FLEET_STATS, WEEKLY_REVENUE, PAYMENT_STATUS_WEEKS,
  formatMXN, formatNumber, timeAgo, statusBadge, productBadge, oemBadge,
  sohColor, sohBgClass, animateCounter, lucideIcon,
  mergeApexDefaults, APEX_DEFAULTS,
  initSidebar, createPageHeader, initNotifications, NOTIFICATIONS, NOTIF_ICON_MAP,
  initPage, createChart, exportCSV, bindFilters, normalize, createModal,
  rand, randInt, randFloat, pick, shuffle, seededRandom,
};
