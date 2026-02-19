import { getWeekBounds } from '@/lib/date-utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TripRow {
  driverId: number; // DiDi ID
  dayOffset: number; // 0=Mon, 1=Tue, 2=Wed, 3=Thu, 4=Fri, 5=Sat, 6=Sun
  tripId: string;
  start: string; // HH:MM:SS
  end: string; // HH:MM:SS
  cost: number; // MXN (raw number, $ added in CSV output)
  tip: number; // MXN
}

export interface DemoTemplate {
  id: string;
  title: string;
  description: string;
  filename: string;
  rowCount: number;
  driverCount: number;
  badge: { label: string; color: string };
  rows: TripRow[];
}

// ---------------------------------------------------------------------------
// CSV generator — uses dynamic dates from getWeekBounds()
// ---------------------------------------------------------------------------

export function generateCsvContent(template: DemoTemplate): string {
  const { startDate } = getWeekBounds();
  const header = 'Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip';
  const csvRows = template.rows.map((r) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + r.dayOffset);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${r.driverId},${dd}/${mm}/${yyyy},${r.tripId},${r.start},${r.end},$${r.cost.toFixed(2)},${r.tip}`;
  });
  return [header, ...csvRows].join('\n');
}

// ---------------------------------------------------------------------------
// Helper — build trip rows for a single driver (Lote 1 & 2)
// ---------------------------------------------------------------------------

/**
 * Deterministically generates trips for one driver.
 *
 * @param driverId   DiDi driver ID
 * @param isDiurno   true = daytime hours (06-17), false = nighttime (19-04)
 * @param costs      explicit cost for each trip (must sum to revenue target)
 * @param tips       tip per trip (same length as costs)
 * @param days       dayOffset per trip (same length as costs)
 * @param prefix     trip ID prefix, e.g. 'lote1'
 * @param startId    starting sequential number for trip IDs
 * @returns          { rows, nextId }
 */
function driverTrips(
  driverId: number,
  isDiurno: boolean,
  costs: number[],
  tips: number[],
  days: number[],
  prefix: string,
  startId: number,
): { rows: TripRow[]; nextId: number } {
  const rows: TripRow[] = [];
  for (let i = 0; i < costs.length; i++) {
    // Deterministic but varied start times
    const baseHour = isDiurno
      ? 6 + ((i * 3 + driverId) % 11) // 06-16
      : 19 + ((i * 2 + driverId) % 9); // 19-27 → mod 24 later
    const hour = baseHour % 24;
    const startMin = (15 + i * 17 + (driverId % 7) * 5) % 60;
    const duration = 35 + ((i * 13 + driverId) % 56); // 35-90 min
    const endTotalMin = hour * 60 + startMin + duration;
    const endHour = Math.floor(endTotalMin / 60) % 24;
    const endMin = endTotalMin % 60;

    rows.push({
      driverId,
      dayOffset: days[i],
      tripId: `${prefix}-${String(startId + i).padStart(3, '0')}`,
      start: `${String(hour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}:00`,
      end: `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}:00`,
      cost: costs[i],
      tip: tips[i],
    });
  }
  return { rows, nextId: startId + costs.length };
}

// ---------------------------------------------------------------------------
// LOTE 1 — Mon-Wed (partial week, no driver reaches $6,000)
// ---------------------------------------------------------------------------

function buildLote1Rows(): TripRow[] {
  let all: TripRow[] = [];
  let id = 1;

  // Helper shorthand
  const add = (
    driverId: number,
    diurno: boolean,
    costs: number[],
    tips: number[],
    days: number[],
  ) => {
    const { rows, nextId } = driverTrips(driverId, diurno, costs, tips, days, 'lote1', id);
    all = all.concat(rows);
    id = nextId;
  };

  // --- Vallejo drivers ---
  // 114958 (diurno): ~$3,200 — 5 trips
  add(114958, true, [680, 620, 650, 610, 640], [0, 0, 20, 0, 0], [0, 0, 1, 1, 2]);
  // 114959 (diurno): ~$3,000 — 5 trips
  add(114959, true, [620, 580, 610, 600, 590], [0, 15, 0, 0, 0], [0, 0, 1, 2, 2]);
  // 114960 (nocturno): ~$2,800 — 4 trips
  add(114960, false, [730, 690, 710, 670], [0, 0, 0, 30], [0, 1, 1, 2]);
  // 114966 (diurno): ~$2,600 — 4 trips
  add(114966, true, [670, 640, 660, 630], [0, 0, 25, 0], [0, 1, 1, 2]);
  // 114970 (diurno): ~$3,400 — 5 trips
  add(114970, true, [700, 680, 690, 660, 670], [0, 0, 0, 20, 0], [0, 0, 1, 2, 2]);
  // 114971 (nocturno): ~$3,100 — 5 trips
  add(114971, false, [640, 610, 630, 620, 600], [0, 10, 0, 0, 0], [0, 0, 1, 1, 2]);
  // 114972 (diurno): ~$3,000 — 5 trips
  add(114972, true, [610, 600, 590, 620, 580], [0, 0, 0, 0, 15], [0, 1, 1, 2, 2]);
  // 114973 (nocturno): ~$2,500 — 4 trips
  add(114973, false, [640, 620, 630, 610], [0, 0, 0, 0], [0, 1, 2, 2]);
  // 114974 (diurno): ~$2,000 — 4 trips (prorated)
  add(114974, true, [520, 490, 510, 480], [0, 0, 0, 20], [0, 1, 1, 2]);

  // --- Granada drivers ---
  // 114961 (diurno): ~$3,500 — 5 trips
  add(114961, true, [720, 690, 710, 680, 700], [0, 0, 30, 0, 0], [0, 0, 1, 2, 2]);
  // 114962 (nocturno): ~$3,200 — 5 trips
  add(114962, false, [660, 630, 650, 640, 620], [0, 0, 0, 0, 25], [0, 0, 1, 1, 2]);
  // 114963 (diurno): ~$3,300 — 5 trips
  add(114963, true, [680, 650, 670, 660, 640], [15, 0, 0, 0, 0], [0, 0, 1, 2, 2]);
  // 114969 (diurno): ~$3,100 — 5 trips
  add(114969, true, [640, 610, 630, 620, 600], [0, 0, 0, 20, 0], [0, 1, 1, 2, 2]);
  // 114975 (nocturno): ~$3,800 — 5 trips
  add(114975, false, [780, 750, 770, 740, 760], [0, 0, 0, 0, 0], [0, 0, 1, 1, 2]);
  // 114976 (diurno): ~$3,000 — 5 trips
  add(114976, true, [620, 590, 610, 600, 580], [0, 0, 10, 0, 0], [0, 0, 1, 2, 2]);
  // 114977 (nocturno): ~$2,700 — 4 trips
  add(114977, false, [690, 670, 680, 660], [0, 0, 0, 0], [0, 1, 1, 2]);
  // 114978 (diurno): ~$3,200 — 5 trips
  add(114978, true, [660, 630, 650, 640, 620], [0, 15, 0, 0, 0], [0, 0, 1, 2, 2]);
  // 114979 (nocturno): ~$2,400 — 4 trips
  add(114979, false, [620, 590, 610, 580], [0, 0, 0, 0], [0, 1, 1, 2]);
  // 114980 (diurno): ~$3,000 — 5 trips
  add(114980, true, [620, 590, 610, 600, 580], [0, 0, 0, 0, 20], [0, 0, 1, 2, 2]);

  // --- Roma drivers ---
  // 114964 (diurno): ~$3,600 — 5 trips
  add(114964, true, [740, 710, 730, 700, 720], [0, 0, 0, 0, 0], [0, 0, 1, 1, 2]);
  // 114965 (nocturno): ~$3,100 — 5 trips
  add(114965, false, [640, 610, 630, 620, 600], [0, 0, 0, 25, 0], [0, 0, 1, 2, 2]);
  // 114967 (diurno): ~$3,200 — 5 trips
  add(114967, true, [660, 630, 650, 640, 620], [0, 0, 0, 0, 0], [0, 1, 1, 2, 2]);
  // 114981 (nocturno): ~$3,400 — 5 trips
  add(114981, false, [700, 670, 690, 680, 660], [0, 0, 15, 0, 0], [0, 0, 1, 1, 2]);
  // 114982 (diurno): ~$3,500 — 5 trips
  add(114982, true, [720, 690, 710, 680, 700], [0, 0, 0, 0, 0], [0, 0, 1, 2, 2]);
  // 114983 (nocturno): ~$3,100 — 5 trips
  add(114983, false, [640, 610, 630, 620, 600], [0, 0, 0, 0, 0], [0, 0, 1, 1, 2]);
  // 114984 (diurno): ~$3,300 — 5 trips
  add(114984, true, [680, 650, 670, 660, 640], [0, 0, 0, 0, 30], [0, 1, 1, 2, 2]);
  // 114985 (nocturno): ~$3,000 — 5 trips
  add(114985, false, [620, 590, 610, 600, 580], [0, 0, 20, 0, 0], [0, 0, 1, 2, 2]);
  // 114986 (diurno): ~$2,900 — 4 trips
  add(114986, true, [750, 720, 730, 700], [0, 0, 0, 0], [0, 1, 1, 2]);
  // 114987 (nocturno): ~$2,700 — 4 trips
  add(114987, false, [690, 670, 680, 660], [0, 0, 0, 25], [0, 1, 2, 2]);

  return all;
}

// ---------------------------------------------------------------------------
// LOTE 2 — Thu-Sat (completes the week, 20 of 22 cross $6,000)
// ---------------------------------------------------------------------------

function buildLote2Rows(): TripRow[] {
  let all: TripRow[] = [];
  let id = 1;

  const add = (
    driverId: number,
    diurno: boolean,
    costs: number[],
    tips: number[],
    days: number[],
  ) => {
    const { rows, nextId } = driverTrips(driverId, diurno, costs, tips, days, 'lote2', id);
    all = all.concat(rows);
    id = nextId;
  };

  // --- Drivers who cross $6,000 (20 drivers) ---

  // 114958 (diurno): +$2,900 → total $6,100
  add(114958, true, [980, 970, 950], [0, 0, 0], [3, 4, 5]);
  // 114959 (diurno): +$3,100 → total $6,100
  add(114959, true, [1050, 1030, 1020], [0, 0, 0], [3, 4, 5]);
  // 114961 (diurno): +$2,600 → total $6,100
  add(114961, true, [1310, 1290], [0, 0], [3, 5]);
  // 114962 (nocturno): +$2,900 → total $6,100
  add(114962, false, [980, 970, 950], [0, 0, 0], [3, 4, 5]);
  // 114963 (diurno): +$2,800 → total $6,100
  add(114963, true, [1410, 1390], [0, 0], [3, 5]);
  // 114964 (diurno): +$2,500 → total $6,100
  add(114964, true, [1260, 1240], [0, 0], [4, 5]);
  // 114965 (nocturno): +$3,000 → total $6,100
  add(114965, false, [1010, 1000, 990], [0, 0, 0], [3, 4, 5]);
  // 114969 (diurno): +$3,000 → total $6,100
  add(114969, true, [1010, 1000, 990], [0, 0, 15], [3, 4, 5]);
  // 114970 (diurno): +$2,700 → total $6,100
  add(114970, true, [1360, 1340], [0, 0], [3, 5]);
  // 114971 (nocturno): +$3,000 → total $6,100
  add(114971, false, [1010, 1000, 990], [0, 0, 0], [3, 4, 5]);
  // 114972 (diurno): +$3,100 → total $6,100
  add(114972, true, [1050, 1030, 1020], [0, 0, 0], [3, 4, 5]);
  // 114974 (diurno): +$1,700 → total $3,700 (prorated threshold $3,600)
  add(114974, true, [860, 840], [0, 0], [3, 5]);
  // 114975 (nocturno): +$2,300 → total $6,100
  add(114975, false, [1160, 1140], [0, 0], [4, 5]);
  // 114976 (diurno): +$3,100 → total $6,100
  add(114976, true, [1050, 1030, 1020], [0, 0, 0], [3, 4, 5]);
  // 114978 (diurno): +$2,900 → total $6,100
  add(114978, true, [980, 970, 950], [0, 0, 0], [3, 4, 5]);
  // 114980 (diurno): +$3,100 → total $6,100
  add(114980, true, [1050, 1030, 1020], [0, 0, 0], [3, 4, 5]);
  // 114981 (nocturno): +$2,700 → total $6,100
  add(114981, false, [1360, 1340], [0, 0], [3, 5]);
  // 114982 (diurno): +$2,600 → total $6,100
  add(114982, true, [1310, 1290], [0, 0], [4, 5]);
  // 114984 (diurno): +$2,800 → total $6,100
  add(114984, true, [1410, 1390], [0, 0], [3, 5]);
  // 114985 (nocturno): +$3,100 → total $6,100
  add(114985, false, [1050, 1030, 1020], [0, 0, 0], [3, 4, 5]);

  // --- Drivers who fall SHORT ---

  // 114967 (diurno): +$2,710 → total $5,910 (short $90)
  add(114967, true, [910, 900, 900], [0, 0, 0], [3, 4, 5]);
  // 114983 (nocturno): +$2,500 → total $5,600 (short $400)
  add(114983, false, [850, 830, 820], [0, 0, 0], [3, 4, 5]);

  return all;
}

// ---------------------------------------------------------------------------
// LOTE 3 — Corrections (10 hard-coded rows with intentional errors)
// ---------------------------------------------------------------------------

const lote3Rows: TripRow[] = [
  // 1: ERROR — Driver not found (114999 does not exist)
  { driverId: 114999, dayOffset: 3, tripId: 'lote3-001', start: '08:15:00', end: '09:30:00', cost: 250.0, tip: 0 },
  // 2: ERROR — Driver not found, fuzzy match "114958?"
  { driverId: 114957, dayOffset: 3, tripId: 'lote3-002', start: '10:00:00', end: '11:15:00', cost: 300.0, tip: 20 },
  // 3: ERROR — Duplicate trip ID (lote1-001 already exists in Lote 1)
  { driverId: 114958, dayOffset: 1, tripId: 'lote1-001', start: '06:32:00', end: '07:18:00', cost: 195.5, tip: 0 },
  // 4: ERROR — Cost must be > 0
  { driverId: 114959, dayOffset: 2, tripId: 'lote3-004', start: '07:00:00', end: '08:00:00', cost: 0.0, tip: 0 },
  // 5: WARNING — High rate ($3,200 in 10 min)
  { driverId: 114960, dayOffset: 0, tripId: 'lote3-005', start: '20:15:00', end: '20:25:00', cost: 3200.0, tip: 0 },
  // 6: ERROR — Start time = end time
  { driverId: 114961, dayOffset: 4, tripId: 'lote3-006', start: '14:00:00', end: '14:00:00', cost: 180.0, tip: 0 },
  // 7: VALID — d10 (114967) gets +$150, crosses $6,000
  { driverId: 114967, dayOffset: 4, tripId: 'lote3-007', start: '09:00:00', end: '10:15:00', cost: 150.0, tip: 10 },
  // 8: ERROR — Negative tip
  { driverId: 114970, dayOffset: 3, tripId: 'lote3-008', start: '11:30:00', end: '12:45:00', cost: 280.0, tip: -15 },
  // 9: WARNING — Sunday after 20:00 cutoff
  { driverId: 114964, dayOffset: 6, tripId: 'lote3-009', start: '20:30:00', end: '21:45:00', cost: 350.0, tip: 25 },
  // 10: VALID — d26 (114983) gets +$500, crosses $6,000
  { driverId: 114983, dayOffset: 3, tripId: 'lote3-010', start: '08:45:00', end: '10:00:00', cost: 500.0, tip: 30 },
];

// ---------------------------------------------------------------------------
// Template definitions
// ---------------------------------------------------------------------------

const lote1Rows = buildLote1Rows();
const lote2Rows = buildLote2Rows();

const lote1Template: DemoTemplate = {
  id: 'lote1',
  title: 'Lote 1 — Lunes a Miércoles',
  description: '29 conductores con viajes parciales. Ninguno alcanza la meta aún.',
  filename: 'lote1_lunes_miercoles.csv',
  rowCount: lote1Rows.length,
  driverCount: 29,
  badge: { label: '~50%', color: 'alert' },
  rows: lote1Rows,
};

const lote2Template: DemoTemplate = {
  id: 'lote2',
  title: 'Lote 2 — Jueves a Sábado',
  description: 'Completa la semana. 20 de 29 cruzan la meta. Bonos + overtime visibles.',
  filename: 'lote2_jueves_sabado.csv',
  rowCount: lote2Rows.length,
  driverCount: 22,
  badge: { label: 'Semana completa', color: 'success' },
  rows: lote2Rows,
};

const lote3Template: DemoTemplate = {
  id: 'lote3',
  title: 'Lote 3 — Correcciones',
  description: '10 registros con errores intencionales. 2 registros rescatan conductores.',
  filename: 'lote3_correcciones.csv',
  rowCount: 10,
  driverCount: 8,
  badge: { label: 'Demo validación', color: 'danger' },
  rows: lote3Rows,
};

// ---------------------------------------------------------------------------
// Public export
// ---------------------------------------------------------------------------

export const DEMO_TEMPLATES: DemoTemplate[] = [lote1Template, lote2Template, lote3Template];
