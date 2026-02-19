import type { Trip, PayrollRecord, Driver } from '@/types';
import { MOCK_CENTERS } from '@/data/mock-data';
import { generateExplanation } from './explanation';
import { parseFechaToISO } from '@/lib/date-utils';

const BASE_SALARY = 2500;
export const GOAL_THRESHOLD = 6000;
const SUPPORT_AMOUNT = 1000;
const PRODUCTIVITY_UNIT = 500;
const PRODUCTIVITY_BONUS_PER_UNIT = 100;
export const OVERTIME_THRESHOLD_HOURS = 40;
export const OVERTIME_RATE_PER_HOUR = 50;
const OVERTIME_CAP_HOURS = 8;
const WORKING_DAYS_PER_WEEK = 5;

interface ShiftSummary {
  driverId: string;
  totalHours: number;
}

/** Count weekdays (Mon-Fri) between two dates, inclusive. */
function countWeekdays(start: Date, end: Date): number {
  let count = 0;
  const d = new Date(start);
  d.setHours(0, 0, 0, 0);
  const endNorm = new Date(end);
  endNorm.setHours(0, 0, 0, 0);
  while (d <= endNorm) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) count++;
    d.setDate(d.getDate() + 1);
  }
  return count;
}

/**
 * Check if a trip falls within the payroll week.
 * Week boundary: Monday 00:00 – Sunday 20:00 CDMX.
 * Trips are assigned to the week based on their start time (horaInicio).
 * A Sunday trip starting at or after 20:00 falls outside the week.
 */
export function isTripInWeek(t: Trip, weekStart: string, weekEnd: string): boolean {
  const tripDate = parseFechaToISO(t.fecha);
  if (tripDate < weekStart || tripDate > weekEnd) return false;

  // On the last day of the week (Sunday = weekEnd), enforce 20:00 cutoff
  if (tripDate === weekEnd && t.horaInicio) {
    const [h, m] = t.horaInicio.split(':').map(Number);
    const startMinutes = h * 60 + (m || 0);
    // 20:00 = 1200 minutes from midnight
    if (startMinutes >= 1200) return false;
  }

  return true;
}

export function calculateWeeklyPay(
  drivers: Driver[],
  trips: Trip[],
  shiftSummaries: ShiftSummary[],
  weekLabel: string,
  weekStart: string,
  weekEnd: string,
  closedBy: string,
  version: number,
  previousWeekHours?: Map<string, number>,
  centers?: { id: string; name: string }[]
): PayrollRecord[] {
  const weekStartDate = new Date(weekStart);
  const weekEndDate = new Date(weekEnd);

  return drivers
    .filter(d => d.status === 'activo')
    .map(driver => {
      // Filter trips by week bounds with Sunday 20:00 cutoff
      const driverTrips = trips.filter(t => {
        if (t.driverId !== driver.didiDriverId) return false;
        return isTripInWeek(t, weekStart, weekEnd);
      });
      const totalBilled = driverTrips.reduce((sum, t) => sum + t.costo, 0);
      const shiftData = shiftSummaries.find(s => s.driverId === driver.id);
      const hoursWorked = shiftData?.totalHours ?? 0;

      // Prorate thresholds for first-week drivers
      let hoursThreshold = OVERTIME_THRESHOLD_HOURS;
      let revenueThreshold = GOAL_THRESHOLD;
      const driverStartDate = new Date(driver.startDate);

      // Bug D fix: Use working days (Mon-Fri = 5) instead of calendar days (7)
      if (driverStartDate > weekStartDate && driverStartDate <= weekEndDate) {
        const daysWorked = Math.max(1, countWeekdays(driverStartDate, weekEndDate));
        const prorateFactor = Math.min(daysWorked / WORKING_DAYS_PER_WEEK, 1);
        hoursThreshold = Math.round(OVERTIME_THRESHOLD_HOURS * prorateFactor * 10) / 10;
        revenueThreshold = Math.round(GOAL_THRESHOLD * prorateFactor);
      }

      // Conjunctive goal check: BOTH hours AND billing must be met
      const goalMet = (hoursWorked >= hoursThreshold) && (totalBilled >= revenueThreshold);
      const baseSalary = goalMet ? BASE_SALARY : 0;

      // Bug E fix: Use prorated revenueThreshold instead of full GOAL_THRESHOLD
      let productivityBonus = 0;
      if (goalMet) {
        const excess = totalBilled - revenueThreshold;
        if (excess > 0) {
          const units = Math.floor(excess / PRODUCTIVITY_UNIT);
          productivityBonus = units * PRODUCTIVITY_BONUS_PER_UNIT;
        }
      }

      // Overtime requires previous week >= 40h
      let overtimePay = 0;
      const prevWeekHours = previousWeekHours?.get(driver.id) ?? 0;
      if (goalMet && hoursWorked > OVERTIME_THRESHOLD_HOURS && prevWeekHours >= OVERTIME_THRESHOLD_HOURS) {
        const otHours = Math.min(hoursWorked - OVERTIME_THRESHOLD_HOURS, OVERTIME_CAP_HOURS);
        overtimePay = Math.round(otHours * OVERTIME_RATE_PER_HOUR);
      }

      const totalPay = goalMet ? baseSalary + productivityBonus + overtimePay : SUPPORT_AMOUNT;
      const center = (centers ?? MOCK_CENTERS).find(c => c.id === driver.centerId);

      const record = {
        id: `pr-${driver.id}-${Date.now()}`,
        driverName: driver.fullName,
        driverId: driver.id,
        centerId: driver.centerId,
        center: center?.name ?? '',
        hoursWorked,
        totalBilled,
        hoursThreshold,
        revenueThreshold,
        goalMet,
        baseSalary,
        productivityBonus,
        overtimePay,
        totalPay,
        status: 'cerrado',
        weekLabel,
        weekStart,
        weekEnd,
        closedBy,
        closedAt: new Date().toISOString(),
        version,
      };

      return {
        ...record,
        aiExplanation: generateExplanation(record),
      };
    });
}

export function exportPayrollCsv(records: PayrollRecord[], tab?: 'actual' | 'cerradas'): void {
  const headers = [
    'Conductor', 'Centro', 'Horas', 'Meta horas', 'Facturación', 'Meta facturación',
    'Meta cumplida', 'Salario Base', 'Bono', 'Horas extra', 'Apoyo', 'Pago Total', 'Status',
  ];
  const csvRows = [headers.join(',')];

  for (const r of records) {
    const apoyo = r.goalMet ? 0 : SUPPORT_AMOUNT;
    const status = tab === 'actual' ? 'Borrador' : (r.status === 'cerrado' ? 'Cerrado' : 'Superseded');
    csvRows.push([
      `"${r.driverName}"`,
      `"${r.center}"`,
      r.hoursWorked,
      r.hoursThreshold,
      r.totalBilled,
      r.revenueThreshold,
      r.goalMet ? 'Sí' : 'No',
      r.baseSalary,
      r.productivityBonus,
      r.overtimePay,
      apoyo,
      r.totalPay,
      status,
    ].join(','));
  }

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nomina_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
