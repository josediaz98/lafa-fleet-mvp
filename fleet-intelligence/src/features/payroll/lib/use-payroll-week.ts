import { useState, useMemo } from 'react';
import type { PayrollRecord, Trip, Driver } from '@/types';

type PayrollTab = 'actual' | 'cerradas';

export function usePayrollWeek(
  closedWeeks: Map<string, PayrollRecord[]>,
  livePayroll: PayrollRecord[],
  filterByCenter: <T extends { centerId: string }>(items: T[]) => T[],
  drivers: Driver[],
  trips: Trip[],
) {
  const [tab, setTab] = useState<PayrollTab>('actual');
  const [selectedRow, setSelectedRow] = useState<PayrollRecord | null>(null);

  const [selectedWeek, setSelectedWeek] = useState<string>(() => {
    const keys = Array.from(closedWeeks.keys());
    return keys[keys.length - 1] ?? '';
  });

  const currentClosed = filterByCenter(closedWeeks.get(selectedWeek) ?? []);
  const displayData = tab === 'actual' ? livePayroll : currentClosed;

  const weekOptions = Array.from(closedWeeks.keys());

  const selectedRowTrips = useMemo(() => {
    if (!selectedRow) return [];
    const driver = drivers.find((d) => d.fullName === selectedRow.driverName);
    if (!driver) return [];
    return trips.filter((t) => t.didiDriverId === driver.didiDriverId);
  }, [selectedRow, drivers, trips]);

  return {
    tab,
    setTab,
    selectedRow,
    setSelectedRow,
    selectedWeek,
    setSelectedWeek,
    currentClosed,
    displayData,
    weekOptions,
    selectedRowTrips,
  };
}
