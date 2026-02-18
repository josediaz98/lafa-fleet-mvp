import type { Trip, PayrollRecord, Driver } from '../context/AppContext';
import { MOCK_CENTERS } from '../data/mockData';

const BASE_SALARY = 2500;
const GOAL_THRESHOLD = 6000;
const SUPPORT_AMOUNT = 1000;
const PRODUCTIVITY_UNIT = 500;
const PRODUCTIVITY_BONUS_PER_UNIT = 100;
const OVERTIME_THRESHOLD_HOURS = 40;
const OVERTIME_RATE_PER_HOUR = 50;
const OVERTIME_CAP_HOURS = 8;

interface ShiftSummary {
  driverId: string;
  totalHours: number;
}

export function calculateWeeklyPay(
  drivers: Driver[],
  trips: Trip[],
  shiftSummaries: ShiftSummary[],
  weekLabel: string,
  weekStart: string,
  weekEnd: string,
  closedBy: string,
  version: number
): PayrollRecord[] {
  return drivers
    .filter(d => d.status === 'activo')
    .map(driver => {
      const driverTrips = trips.filter(t => t.driverId === driver.didiDriverId);
      const totalBilled = driverTrips.reduce((sum, t) => sum + t.costo, 0);
      const shiftData = shiftSummaries.find(s => s.driverId === driver.id);
      const hoursWorked = shiftData?.totalHours ?? 0;

      const goalMet = totalBilled >= GOAL_THRESHOLD;
      const baseSalary = goalMet ? BASE_SALARY : 0;

      let productivityBonus = 0;
      if (goalMet) {
        const excess = totalBilled - GOAL_THRESHOLD;
        const units = Math.floor(excess / PRODUCTIVITY_UNIT);
        productivityBonus = units * PRODUCTIVITY_BONUS_PER_UNIT;
      }

      let overtimePay = 0;
      if (goalMet && hoursWorked > OVERTIME_THRESHOLD_HOURS) {
        const otHours = Math.min(hoursWorked - OVERTIME_THRESHOLD_HOURS, OVERTIME_CAP_HOURS);
        overtimePay = Math.round(otHours * OVERTIME_RATE_PER_HOUR);
      }

      const totalPay = goalMet ? baseSalary + productivityBonus + overtimePay : SUPPORT_AMOUNT;
      const center = MOCK_CENTERS.find(c => c.id === driver.centerId);

      return {
        id: `pr-${driver.id}-${Date.now()}`,
        driverName: driver.fullName,
        driverId: driver.id,
        centerId: driver.centerId,
        center: center?.name ?? '',
        hoursWorked,
        totalBilled,
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
    });
}

export function exportPayrollCsv(records: PayrollRecord[]): void {
  const headers = ['Conductor', 'Centro', 'Horas', 'Facturaci\u00f3n', 'Meta', 'Salario Base', 'Bono', 'Horas extra', 'Pago Total'];
  const csvRows = [headers.join(',')];

  for (const r of records) {
    csvRows.push([
      r.driverName,
      r.center,
      r.hoursWorked,
      r.totalBilled,
      r.goalMet ? 'S\u00ed' : 'No',
      r.baseSalary,
      r.productivityBonus,
      r.overtimePay,
      r.totalPay,
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
