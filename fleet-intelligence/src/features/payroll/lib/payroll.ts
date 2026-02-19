import type { Trip, PayrollRecord, Driver } from '@/types';
import { CENTERS } from '@/data/constants';
import { generateExplanation } from './explanation';
import { parseFechaToISO } from '@/lib/date-utils';
import {
  BASE_SALARY,
  SUPPORT_AMOUNT,
  prorateThresholds,
  computeProductivityBonus,
  computeOvertimePay,
  isTripInWeek as sharedIsTripInWeek,
} from '@shared/payroll-rules';

export {
  GOAL_THRESHOLD,
  SUPPORT_AMOUNT,
  OVERTIME_THRESHOLD_HOURS,
  OVERTIME_RATE_PER_HOUR,
} from '@shared/payroll-rules';

interface ShiftSummary {
  driverId: string;
  totalHours: number;
}

export interface PayrollInput {
  drivers: Driver[];
  trips: Trip[];
  shiftSummaries: ShiftSummary[];
  weekLabel: string;
  weekStart: string;
  weekEnd: string;
  closedBy: string;
  version: number;
  previousWeekHours?: Map<string, number>;
  centers?: { id: string; name: string }[];
}

/**
 * Check if a trip falls within the payroll week.
 * Wraps the shared primitive version with Trip object handling.
 */
export function isTripInWeek(
  t: Trip,
  weekStart: string,
  weekEnd: string,
): boolean {
  const tripDate = parseFechaToISO(t.fecha);
  return sharedIsTripInWeek(tripDate, t.horaInicio, weekStart, weekEnd);
}

export function calculateWeeklyPay(input: PayrollInput): PayrollRecord[] {
  const {
    drivers,
    trips,
    shiftSummaries,
    weekLabel,
    weekStart,
    weekEnd,
    closedBy,
    version,
    previousWeekHours,
    centers,
  } = input;

  const weekStartDate = new Date(weekStart);
  const weekEndDate = new Date(weekEnd);

  return drivers
    .filter((d) => d.status === 'activo')
    .map((driver) => {
      // Filter trips by week bounds with Sunday 20:00 cutoff
      const driverTrips = trips.filter((t) => {
        if (t.didiDriverId !== driver.didiDriverId) return false;
        return isTripInWeek(t, weekStart, weekEnd);
      });
      const totalBilled =
        Math.round(driverTrips.reduce((sum, t) => sum + t.costo, 0) * 100) /
        100;
      const tipsTotal =
        Math.round(driverTrips.reduce((sum, t) => sum + t.propina, 0) * 100) /
        100;
      const shiftData = shiftSummaries.find((s) => s.driverId === driver.id);
      const hoursWorked = shiftData?.totalHours ?? 0;

      const { hoursThreshold, revenueThreshold } = prorateThresholds(
        driver.startDate,
        weekStartDate,
        weekEndDate,
      );

      // Conjunctive goal check: BOTH hours AND billing must be met
      const goalMet =
        hoursWorked >= hoursThreshold && totalBilled >= revenueThreshold;
      const baseSalary = goalMet ? BASE_SALARY : 0;

      const productivityBonus = computeProductivityBonus(
        totalBilled,
        revenueThreshold,
        goalMet,
      );

      const prevWeekHours = previousWeekHours?.get(driver.id) ?? 0;
      const overtimePay = computeOvertimePay(
        hoursWorked,
        goalMet,
        prevWeekHours,
      );

      const totalPay = goalMet
        ? baseSalary + productivityBonus + overtimePay
        : SUPPORT_AMOUNT;
      const center = (centers ?? CENTERS).find((c) => c.id === driver.centerId);

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
