import type { Trip, PayrollRecord, Driver } from '@/types';
import { CENTERS } from '@/data/constants';
import { generateExplanation } from './explanation';
import { parseFechaToISO } from '@/lib/date-utils';

const BASE_SALARY = 2500;
export const GOAL_THRESHOLD = 6000;
export const SUPPORT_AMOUNT = 1000;
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

/** Count weekdays (Mon-Fri) between two dates, inclusive. Uses UTC to avoid timezone shift. */
function countWeekdays(start: Date, end: Date): number {
  let count = 0;
  const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const endNorm = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  while (d <= endNorm) {
    if (d.getUTCDay() !== 0 && d.getUTCDay() !== 6) count++;
    d.setUTCDate(d.getUTCDate() + 1);
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
        if (t.didiDriverId !== driver.didiDriverId) return false;
        return isTripInWeek(t, weekStart, weekEnd);
      });
      const totalBilled = Math.round(driverTrips.reduce((sum, t) => sum + t.costo, 0) * 100) / 100;
      // H1: Compute tips total from driver trips
      const tipsTotal = Math.round(driverTrips.reduce((sum, t) => sum + t.propina, 0) * 100) / 100;
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
      const center = (centers ?? CENTERS).find(c => c.id === driver.centerId);

      // H2: Use crypto.randomUUID() for proper UUID that matches DB format
      const record = {
        id: crypto.randomUUID(),
        driverName: driver.fullName,
        driverId: driver.id,
        centerId: driver.centerId,
        center: center?.name ?? '',
        hoursWorked,
        totalBilled,
        tipsTotal,
        hoursThreshold,
        revenueThreshold,
        goalMet,
        baseSalary,
        productivityBonus,
        overtimePay,
        totalPay,
        status: 'cerrado' as const,
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

// L3: Add Tips column to CSV export
export function exportPayrollCsv(records: PayrollRecord[], tab?: 'actual' | 'cerradas'): void {
  const headers = [
    'Conductor', 'Centro', 'Horas', 'Meta horas', 'Facturación', 'Meta facturación',
    'Propinas', 'Meta cumplida', 'Salario Base', 'Bono', 'Horas extra', 'Apoyo', 'Pago Total', 'Status',
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
      r.tipsTotal,
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
