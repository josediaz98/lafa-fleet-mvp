import { useMemo } from 'react';
import { useAppState } from '@/app/providers/AppProvider';
import { useCenterFilter } from '@/lib/use-center-filter';
import { getWeekBounds, buildShiftSummaries } from '@/lib/date-utils';
import { calculateWeeklyPay } from '@/features/payroll/lib/payroll';
import { generateWeekSummary } from '@/features/payroll/lib/payroll-flags';
import type { PayrollRecord } from '@/types';

export function usePayrollData() {
  const { drivers, trips, shifts, closedPayroll, session } = useAppState();
  const { filterByCenter } = useCenterFilter();

  const week = getWeekBounds();

  const isCurrentWeekClosed = useMemo(
    () =>
      closedPayroll.some(
        (p) => p.status === 'cerrado' && p.weekStart === week.start,
      ),
    [closedPayroll, week.start],
  );

  const previousWeekHours = useMemo(() => {
    const map = new Map<string, number>();
    const closedRecords = closedPayroll.filter(
      (p) => p.status === 'cerrado' && p.weekLabel,
    );
    if (closedRecords.length === 0) return map;
    const mostRecentWeek = closedRecords.reduce((latest, p) => {
      if (
        !latest ||
        (p.weekStart && (!latest.weekStart || p.weekStart > latest.weekStart))
      )
        return p;
      return latest;
    }).weekLabel;
    closedRecords
      .filter((p) => p.weekLabel === mostRecentWeek)
      .forEach((p) => map.set(p.driverId, p.hoursWorked));
    return map;
  }, [closedPayroll]);

  const livePayroll = useMemo(() => {
    const filteredDrivers = filterByCenter(drivers);
    const shiftSummaries = buildShiftSummaries(filteredDrivers, shifts);
    return calculateWeeklyPay({
      drivers: filteredDrivers,
      trips,
      shiftSummaries,
      weekLabel: week.label,
      weekStart: week.start,
      weekEnd: week.end,
      closedBy: session?.name ?? '',
      version: 1,
      previousWeekHours,
    });
  }, [
    drivers,
    trips,
    shifts,
    filterByCenter,
    week.label,
    week.start,
    week.end,
    session?.name,
    previousWeekHours,
  ]);

  const closedWeeks = useMemo(() => {
    const weeks = new Map<string, PayrollRecord[]>();
    closedPayroll
      .filter((p) => p.status === 'cerrado')
      .forEach((p) => {
        const key = p.weekLabel ?? 'Sin etiqueta';
        if (!weeks.has(key)) weeks.set(key, []);
        weeks.get(key)!.push(p);
      });
    return weeks;
  }, [closedPayroll]);

  return {
    drivers,
    trips,
    shifts,
    closedPayroll,
    session,
    week,
    isCurrentWeekClosed,
    previousWeekHours,
    livePayroll,
    closedWeeks,
    filterByCenter,
  };
}

export function usePayrollStats(displayData: PayrollRecord[]) {
  const weekSummary = useMemo(
    () => generateWeekSummary(displayData),
    [displayData],
  );
  const totalNomina = weekSummary.totalPayroll;
  const driversWithGoal = weekSummary.driversWithGoal;
  const goalPct =
    displayData.length > 0
      ? Math.round((driversWithGoal / displayData.length) * 100)
      : 0;
  const totalHours = displayData.reduce((sum, p) => sum + p.hoursWorked, 0);
  const totalBilled = displayData.reduce((sum, p) => sum + p.totalBilled, 0);
  const avgPerHour = totalHours > 0 ? Math.round(totalBilled / totalHours) : 0;

  return {
    weekSummary,
    totalNomina,
    driversWithGoal,
    goalPct,
    totalHours,
    totalBilled,
    avgPerHour,
  };
}
