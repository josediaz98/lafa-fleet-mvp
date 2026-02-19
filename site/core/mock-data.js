// ============================================================
// LAFA Mock Data
// Seeded random, 200 mock drivers, fleet stats, weekly revenue
// ============================================================

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
    week: typeof t === 'function' ? t('shared.weekAbbr', { n: w + 1 }) : `Sem ${w + 1}`,
    date: new Date(2026, 0, 6 + w * 7).toISOString().split('T')[0],
    dae: daeRev,
    lto: ltoRev,
    total: daeRev + ltoRev,
  });
}

// Payment status by week (12 weeks)
const PAYMENT_STATUS_WEEKS = [];
for (let w = 0; w < 12; w++) {
  PAYMENT_STATUS_WEEKS.push({
    week: typeof t === 'function' ? t('shared.weekAbbr', { n: w + 1 }) : `Sem ${w + 1}`,
    onTime: DRIVERS.filter(d => d.payments[w].status === 'on-time').length,
    late: DRIVERS.filter(d => d.payments[w].status === 'late').length,
    default: DRIVERS.filter(d => d.payments[w].status === 'default').length,
  });
}
