import { describe, it, expect } from 'vitest';
import {
  calculateWeeklyPay,
  isTripInWeek,
} from '@/features/payroll/lib/payroll';
import type { Driver, Trip } from '@/types';

// ---- Helpers ----

function makeDriver(overrides: Partial<Driver> = {}): Driver {
  return {
    id: 'd1',
    fullName: 'Test Driver',
    didiDriverId: 114958,
    centerId: 'c1',
    defaultShift: 'diurno',
    startDate: '2025-10-15',
    status: 'activo',
    ...overrides,
  };
}

function makeTrips(
  didiDriverId: number,
  total: number,
  weekStart: string,
): Trip[] {
  // Distribute total across 5 daily aggregates within the week
  const perDay = total / 5;
  const trips: Trip[] = [];
  const [yStr, mStr, dStr] = weekStart.split('-');
  const y = parseInt(yStr, 10);
  const m = parseInt(mStr, 10) - 1;
  const d = parseInt(dStr, 10);
  for (let i = 0; i < 5; i++) {
    const date = new Date(y, m, d + i);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    trips.push({
      id: `t-${i}`,
      didiDriverId: didiDriverId,
      fecha: `${dd}/${mm}/${yyyy}`,
      tripId: `trip-${i}`,
      horaInicio: '06:00',
      horaFin: '17:00',
      costo: perDay,
      propina: 0,
    });
  }
  return trips;
}

function makeShiftSummary(driverId: string, totalHours: number) {
  return { driverId, totalHours };
}

const WEEK_START = '2026-02-16';
const WEEK_END = '2026-02-22';
const WEEK_LABEL = '16 feb – 22 feb, 2026';
const CENTERS = [{ id: 'c1', name: 'Vallejo' }];

function runPayroll(opts: {
  driver?: Partial<Driver>;
  revenue: number;
  hours: number;
  previousWeekHours?: number;
}) {
  const driver = makeDriver(opts.driver);
  const trips = makeTrips(driver.didiDriverId, opts.revenue, WEEK_START);
  const shiftSummaries = [makeShiftSummary(driver.id, opts.hours)];
  const prevMap =
    opts.previousWeekHours !== undefined
      ? new Map([[driver.id, opts.previousWeekHours]])
      : new Map<string, number>();

  const results = calculateWeeklyPay({
    drivers: [driver],
    trips,
    shiftSummaries,
    weekLabel: WEEK_LABEL,
    weekStart: WEEK_START,
    weekEnd: WEEK_END,
    closedBy: 'Admin',
    version: 1,
    previousWeekHours: prevMap,
    centers: CENTERS,
  });
  expect(results).toHaveLength(1);
  return results[0];
}

// ---- Tests ----

describe('calculateWeeklyPay', () => {
  describe('Goal evaluation — conjunctive (AND)', () => {
    it('Edge Case 1: hours fail, revenue passes → $1,000 support', () => {
      const r = runPayroll({ hours: 39.5, revenue: 8000 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });

    it('Edge Case 2: revenue fails, hours pass → $1,000 support', () => {
      const r = runPayroll({ hours: 45, revenue: 5999 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });

    it('both fail → $1,000 support', () => {
      const r = runPayroll({ hours: 30, revenue: 3000 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });

    it('both pass exactly at threshold → goal met, base salary only', () => {
      const r = runPayroll({ hours: 40, revenue: 6000 });
      expect(r.goalMet).toBe(true);
      expect(r.baseSalary).toBe(2500);
      expect(r.productivityBonus).toBe(0);
      expect(r.overtimePay).toBe(0);
      expect(r.totalPay).toBe(2500);
    });
  });

  describe('Edge Case 3: exact boundary (>= not >)', () => {
    it('revenue exactly $6,000 with 40h → goal met', () => {
      const r = runPayroll({ hours: 40, revenue: 6000 });
      expect(r.goalMet).toBe(true);
      expect(r.totalPay).toBe(2500);
    });

    it('revenue $5,999 with 40h → goal not met', () => {
      const r = runPayroll({ hours: 40, revenue: 5999 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });
  });

  describe('Productivity bonus (floor division by $500)', () => {
    it('$499 above threshold → no bonus', () => {
      const r = runPayroll({ hours: 40, revenue: 6499 });
      expect(r.goalMet).toBe(true);
      expect(r.productivityBonus).toBe(0);
      expect(r.totalPay).toBe(2500);
    });

    it('$500 above threshold → $100 bonus', () => {
      const r = runPayroll({ hours: 40, revenue: 6500 });
      expect(r.goalMet).toBe(true);
      expect(r.productivityBonus).toBe(100);
      expect(r.totalPay).toBe(2600);
    });

    it('$999 above threshold → $100 bonus (floor)', () => {
      const r = runPayroll({ hours: 40, revenue: 6999 });
      expect(r.goalMet).toBe(true);
      expect(r.productivityBonus).toBe(100);
      expect(r.totalPay).toBe(2600);
    });

    it('$1,000 above threshold → $200 bonus', () => {
      const r = runPayroll({ hours: 40, revenue: 7000 });
      expect(r.goalMet).toBe(true);
      expect(r.productivityBonus).toBe(200);
      expect(r.totalPay).toBe(2700);
    });

    it('$3,500 above threshold → $700 bonus', () => {
      const r = runPayroll({ hours: 40, revenue: 9500 });
      expect(r.goalMet).toBe(true);
      expect(r.productivityBonus).toBe(700);
      expect(r.totalPay).toBe(3200);
    });
  });

  describe('Edge Case 4: first week — no overtime eligibility', () => {
    it('no previous week data → no overtime even with 48h', () => {
      const r = runPayroll({ hours: 48, revenue: 8000 });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(0);
      expect(r.productivityBonus).toBe(400);
      expect(r.totalPay).toBe(2500 + 400);
    });
  });

  describe('Edge Case 5: new driver mid-week (proration)', () => {
    it('driver starts Wednesday → 3 working days → prorated thresholds', () => {
      // Week: Mon 2/16 – Sun 2/22. Driver starts Wed 2/18 → 3 weekdays (Wed, Thu, Fri)
      // prorateFactor = 3/5 = 0.6
      // hoursThreshold = round(40 * 0.6 * 10) / 10 = 24
      // revenueThreshold = round(6000 * 0.6) = 3600
      const r = runPayroll({
        driver: { startDate: '2026-02-18' },
        hours: 24,
        revenue: 3600,
      });
      expect(r.hoursThreshold).toBe(24);
      expect(r.revenueThreshold).toBe(3600);
      expect(r.goalMet).toBe(true);
      expect(r.baseSalary).toBe(2500);
      expect(r.totalPay).toBe(2500);
    });

    it('prorated driver misses prorated threshold → $1,000', () => {
      const r = runPayroll({
        driver: { startDate: '2026-02-20' }, // Starts Friday → 1 day → threshold = 8h / 1200
        hours: 5,
        revenue: 1000,
      });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });

    it('prorated driver with bonus uses prorated revenue threshold', () => {
      // Threshold = 3600, revenue = 4600 → excess = 1000 → 2 units → $200 bonus
      const r = runPayroll({
        driver: { startDate: '2026-02-18' },
        hours: 24,
        revenue: 4600,
      });
      expect(r.goalMet).toBe(true);
      expect(r.productivityBonus).toBe(200);
      expect(r.totalPay).toBe(2700);
    });
  });

  describe('Edge Case 6: overtime with cap', () => {
    it('50h worked, prev ≥ 40h → 8h overtime (capped) = $400', () => {
      const r = runPayroll({ hours: 50, revenue: 7000, previousWeekHours: 42 });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(400); // min(50-40, 8) = 8h × $50
    });

    it('44h worked, prev ≥ 40h → 4h overtime = $200', () => {
      const r = runPayroll({ hours: 44, revenue: 7000, previousWeekHours: 40 });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(200); // min(44-40, 8) = 4h × $50
    });

    it('41h worked, prev ≥ 40h → 1h overtime = $50', () => {
      const r = runPayroll({ hours: 41, revenue: 6500, previousWeekHours: 45 });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(50);
    });
  });

  describe('Edge Case 7: previous week < 40h → no overtime', () => {
    it('48h worked but prev = 39.5h → no overtime', () => {
      const r = runPayroll({
        hours: 48,
        revenue: 7000,
        previousWeekHours: 39.5,
      });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(0);
      expect(r.productivityBonus).toBe(200);
      expect(r.totalPay).toBe(2700);
    });

    it('45h worked but prev = 0h → no overtime', () => {
      const r = runPayroll({ hours: 45, revenue: 8000, previousWeekHours: 0 });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(0);
    });
  });

  describe('Full pay calculation (base + bonus + overtime)', () => {
    it('high earner: 45h, $9,200, prev=45h → base + bonus + OT', () => {
      // Bonus: (9200 - 6000) / 500 = 6.4 → floor(6) → $600
      // OT: min(45-40, 8) = 5h × $50 = $250
      const r = runPayroll({ hours: 45, revenue: 9200, previousWeekHours: 45 });
      expect(r.goalMet).toBe(true);
      expect(r.baseSalary).toBe(2500);
      expect(r.productivityBonus).toBe(600);
      expect(r.overtimePay).toBe(250);
      expect(r.totalPay).toBe(3350);
    });

    it('top earner: 48h, $10,750, prev=48h → base + bonus + OT (capped)', () => {
      // Bonus: (10750 - 6000) / 500 = 9.5 → floor(9) → $900
      // OT: min(48-40, 8) = 8h × $50 = $400
      const r = runPayroll({
        hours: 48,
        revenue: 10750,
        previousWeekHours: 48,
      });
      expect(r.goalMet).toBe(true);
      expect(r.baseSalary).toBe(2500);
      expect(r.productivityBonus).toBe(900);
      expect(r.overtimePay).toBe(400);
      expect(r.totalPay).toBe(3800);
    });
  });

  describe('Non-goal drivers always receive $1,000', () => {
    it('0 hours, 0 revenue → $1,000', () => {
      const r = runPayroll({ hours: 0, revenue: 0 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
      expect(r.baseSalary).toBe(0);
      expect(r.productivityBonus).toBe(0);
      expect(r.overtimePay).toBe(0);
    });
  });

  describe('Inactive drivers excluded', () => {
    it('inactive driver produces no payroll record', () => {
      const driver = makeDriver({ status: 'inactivo' });
      const trips = makeTrips(driver.didiDriverId, 8000, WEEK_START);
      const shiftSummaries = [makeShiftSummary(driver.id, 45)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results).toHaveLength(0);
    });
  });

  describe('AI explanation is generated', () => {
    it('goal-met record includes explanation text', () => {
      const r = runPayroll({ hours: 42, revenue: 7000 });
      expect(r.aiExplanation).toBeDefined();
      expect(r.aiExplanation).toContain('Test Driver');
    });

    it('non-goal record mentions apoyo económico', () => {
      const r = runPayroll({ hours: 30, revenue: 3000 });
      expect(r.aiExplanation).toBeDefined();
      expect(r.aiExplanation).toContain('apoyo econ');
    });
  });

  describe('Edge Case 17: tip exclusion from billing', () => {
    it('trip with $400 cost + $100 tip → only $400 counts toward billing', () => {
      const driver = makeDriver();
      const trips: Trip[] = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(2026, 1, 16 + i);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        trips.push({
          id: `t-${i}`,
          didiDriverId: driver.didiDriverId,
          fecha: `${dd}/${mm}/${date.getFullYear()}`,
          tripId: `trip-${i}`,
          horaInicio: '06:00',
          horaFin: '17:00',
          costo: 1200,
          propina: 100,
        });
      }
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(6000); // tips NOT included
      expect(results[0].goalMet).toBe(true);
    });
  });

  describe('B1: floating-point rounding before goal check', () => {
    it('revenue that sums to 5999.995 rounds to 6000 → goal met', () => {
      const driver = makeDriver();
      const trips: Trip[] = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(2026, 1, 16 + i);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        trips.push({
          id: `t-${i}`,
          didiDriverId: driver.didiDriverId,
          fecha: `${dd}/${mm}/${date.getFullYear()}`,
          tripId: `trip-fp-${i}`,
          horaInicio: '06:00',
          horaFin: '17:00',
          costo: i < 4 ? 1200 : 1199.999,
          propina: 0,
        });
      }
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(6000);
      expect(results[0].goalMet).toBe(true);
      expect(results[0].baseSalary).toBe(2500);
    });

    it('revenue that sums to 5999.994 rounds to 5999.99 → goal NOT met', () => {
      const driver = makeDriver();
      const trips: Trip[] = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(2026, 1, 16 + i);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        trips.push({
          id: `t-${i}`,
          didiDriverId: driver.didiDriverId,
          fecha: `${dd}/${mm}/${date.getFullYear()}`,
          tripId: `trip-fp2-${i}`,
          horaInicio: '06:00',
          horaFin: '17:00',
          costo: i < 4 ? 1200 : 1199.994,
          propina: 0,
        });
      }
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(5999.99);
      expect(results[0].goalMet).toBe(false);
      expect(results[0].totalPay).toBe(1000);
    });
  });

  describe('Edge Case 2b: $5,999.99 precision', () => {
    it('revenue $5,999.99 → goal NOT met', () => {
      const driver = makeDriver();
      const trips: Trip[] = [];
      for (let i = 0; i < 5; i++) {
        const date = new Date(2026, 1, 16 + i);
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        trips.push({
          id: `t-${i}`,
          didiDriverId: driver.didiDriverId,
          fecha: `${dd}/${mm}/${date.getFullYear()}`,
          tripId: `trip-${i}`,
          horaInicio: '06:00',
          horaFin: '17:00',
          costo: i < 4 ? 1200 : 1199.99,
          propina: 0,
        });
      }
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBeCloseTo(5999.99, 2);
      expect(results[0].goalMet).toBe(false);
      expect(results[0].totalPay).toBe(1000);
    });
  });

  describe('Edge Case 15: Sunday 20:00 cutoff', () => {
    it('trip starting Sunday at 19:50 → counts this week', () => {
      const driver = makeDriver();
      const trips: Trip[] = [
        {
          id: 't-sun-1950',
          didiDriverId: driver.didiDriverId,
          fecha: '22/02/2026',
          tripId: 'trip-sun-1950',
          horaInicio: '19:50',
          horaFin: '20:30',
          costo: 6000,
          propina: 0,
        },
      ];
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(6000);
      expect(results[0].goalMet).toBe(true);
    });

    it('trip starting Sunday at 20:10 → does NOT count this week', () => {
      const driver = makeDriver();
      const trips: Trip[] = [
        {
          id: 't-sun-2010',
          didiDriverId: driver.didiDriverId,
          fecha: '22/02/2026',
          tripId: 'trip-sun-2010',
          horaInicio: '20:10',
          horaFin: '21:00',
          costo: 6000,
          propina: 0,
        },
      ];
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(0);
      expect(results[0].goalMet).toBe(false);
      expect(results[0].totalPay).toBe(1000);
    });

    it('trip starting Sunday at exactly 20:00 → does NOT count', () => {
      const driver = makeDriver();
      const trips: Trip[] = [
        {
          id: 't-sun-2000',
          didiDriverId: driver.didiDriverId,
          fecha: '22/02/2026',
          tripId: 'trip-sun-2000',
          horaInicio: '20:00',
          horaFin: '20:45',
          costo: 6000,
          propina: 0,
        },
      ];
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(0);
      expect(results[0].goalMet).toBe(false);
    });
  });

  describe('Edge Case 14: overnight trip assignment', () => {
    it('trip 23:50→00:35 assigned based on start date (fecha)', () => {
      const driver = makeDriver();
      const trips: Trip[] = [
        {
          id: 't-overnight',
          didiDriverId: driver.didiDriverId,
          fecha: '21/02/2026', // Saturday (within week)
          tripId: 'trip-overnight',
          horaInicio: '23:50',
          horaFin: '00:35',
          costo: 6000,
          propina: 0,
        },
      ];
      const shiftSummaries = [makeShiftSummary(driver.id, 40)];
      const results = calculateWeeklyPay({
        drivers: [driver],
        trips,
        shiftSummaries,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results[0].totalBilled).toBe(6000);
      expect(results[0].goalMet).toBe(true);
    });
  });

  describe('Fractional overtime: 40.5h + prev >= 40h', () => {
    it('40.5h worked, prev=40h → 0.5h OT = $25', () => {
      const r = runPayroll({
        hours: 40.5,
        revenue: 7000,
        previousWeekHours: 40,
      });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(25); // 0.5 × $50
    });
  });

  describe('Prorated first-week driver — no OT eligibility', () => {
    it('prorated driver with 45h worked → no OT (no previous week)', () => {
      const r = runPayroll({
        driver: { startDate: '2026-02-18' },
        hours: 45,
        revenue: 8000,
      });
      expect(r.goalMet).toBe(true);
      expect(r.overtimePay).toBe(0);
    });
  });

  describe('Shifts without trips / Trips without shifts', () => {
    it('40h + $0 revenue → $1,000 support', () => {
      const r = runPayroll({ hours: 40, revenue: 0 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });

    it('0h + $8,000 revenue → $1,000 support', () => {
      const r = runPayroll({ hours: 0, revenue: 8000 });
      expect(r.goalMet).toBe(false);
      expect(r.totalPay).toBe(1000);
    });
  });

  describe('Two drivers in one run — no cross-contamination', () => {
    it('each driver gets independent calculation', () => {
      const d1 = makeDriver({
        id: 'd1',
        fullName: 'Driver A',
        didiDriverId: 1001,
      });
      const d2 = makeDriver({
        id: 'd2',
        fullName: 'Driver B',
        didiDriverId: 1002,
      });
      const trips = [
        ...makeTrips(1001, 9000, WEEK_START),
        ...makeTrips(1002, 4000, WEEK_START),
      ];
      const shifts = [makeShiftSummary('d1', 42), makeShiftSummary('d2', 42)];
      const results = calculateWeeklyPay({
        drivers: [d1, d2],
        trips,
        shiftSummaries: shifts,
        weekLabel: WEEK_LABEL,
        weekStart: WEEK_START,
        weekEnd: WEEK_END,
        closedBy: 'Admin',
        version: 1,
        previousWeekHours: new Map(),
        centers: CENTERS,
      });
      expect(results).toHaveLength(2);
      const r1 = results.find((r) => r.driverId === 'd1')!;
      const r2 = results.find((r) => r.driverId === 'd2')!;
      // D1: goal met, base + bonus
      expect(r1.goalMet).toBe(true);
      expect(r1.totalBilled).toBe(9000);
      expect(r1.productivityBonus).toBe(600); // (9000-6000)/500 = 6 units
      // D2: goal not met (revenue < 6000)
      expect(r2.goalMet).toBe(false);
      expect(r2.totalBilled).toBe(4000);
      expect(r2.totalPay).toBe(1000);
    });
  });

  describe('isTripInWeek helper', () => {
    it('weekday trip within bounds → true', () => {
      const trip: Trip = {
        id: 't1',
        didiDriverId: 1,
        fecha: '18/02/2026',
        tripId: 'x',
        horaInicio: '10:00',
        horaFin: '11:00',
        costo: 100,
        propina: 0,
      };
      expect(isTripInWeek(trip, WEEK_START, WEEK_END)).toBe(true);
    });

    it('trip before week start → false', () => {
      const trip: Trip = {
        id: 't1',
        didiDriverId: 1,
        fecha: '15/02/2026',
        tripId: 'x',
        horaInicio: '10:00',
        horaFin: '11:00',
        costo: 100,
        propina: 0,
      };
      expect(isTripInWeek(trip, WEEK_START, WEEK_END)).toBe(false);
    });

    it('Sunday trip before 20:00 → true', () => {
      const trip: Trip = {
        id: 't1',
        didiDriverId: 1,
        fecha: '22/02/2026',
        tripId: 'x',
        horaInicio: '19:59',
        horaFin: '20:30',
        costo: 100,
        propina: 0,
      };
      expect(isTripInWeek(trip, WEEK_START, WEEK_END)).toBe(true);
    });

    it('Sunday trip at 20:00 → false', () => {
      const trip: Trip = {
        id: 't1',
        didiDriverId: 1,
        fecha: '22/02/2026',
        tripId: 'x',
        horaInicio: '20:00',
        horaFin: '20:30',
        costo: 100,
        propina: 0,
      };
      expect(isTripInWeek(trip, WEEK_START, WEEK_END)).toBe(false);
    });
  });
});
