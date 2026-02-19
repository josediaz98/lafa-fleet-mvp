import { useState } from 'react';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useActionContext } from '@/lib/action-context';
import { calculateWeeklyPay } from '@/features/payroll/lib/payroll';
import { exportPayrollCsv } from '@/features/payroll/lib/payroll-export';
import { buildShiftSummaries } from '@/lib/date-utils';
import { actionClosePayroll, actionRerunPayroll } from '@/lib/actions';
import type { Driver, Trip, Shift, PayrollRecord } from '@/types';

interface UsePayrollActionsInput {
  drivers: Driver[];
  trips: Trip[];
  shifts: Shift[];
  closedPayroll: PayrollRecord[];
  session: { name: string } | null;
  week: { label: string; start: string; end: string };
  isCurrentWeekClosed: boolean;
  previousWeekHours: Map<string, number>;
  filterByCenter: <T extends { centerId: string }>(items: T[]) => T[];
  selectedWeek: string;
  setTab: (tab: 'actual' | 'cerradas') => void;
  setSelectedWeek: (week: string) => void;
}

export function usePayrollActions(input: UsePayrollActionsInput) {
  const {
    drivers, trips, shifts, closedPayroll, session,
    week, isCurrentWeekClosed, previousWeekHours,
    filterByCenter, selectedWeek, setTab, setSelectedWeek,
  } = input;

  const [isClosing, setIsClosing] = useState(false);
  const { confirm } = useConfirmDialog();
  const ctx = useActionContext();

  async function handleCloseWeek() {
    if (isCurrentWeekClosed) return;
    const ok = await confirm({
      title: 'Cerrar semana',
      description: `Se cerrará la nómina de la semana ${week.label}. Esta acción no se puede deshacer fácilmente.`,
      confirmLabel: 'Cerrar semana',
      variant: 'danger',
    });
    if (!ok) return;

    setIsClosing(true);
    try {
      const activeDrivers = filterByCenter(drivers).filter(
        (d) => d.status === 'activo',
      );
      const shiftSummaries = buildShiftSummaries(activeDrivers, shifts);
      const records = calculateWeeklyPay({
        drivers: activeDrivers,
        trips,
        shiftSummaries,
        weekLabel: week.label,
        weekStart: week.start,
        weekEnd: week.end,
        closedBy: session?.name ?? '',
        version: 1,
        previousWeekHours,
      });
      await actionClosePayroll(records, week.label, ctx);
      setTab('cerradas');
      setSelectedWeek(week.label);
    } finally {
      setIsClosing(false);
    }
  }

  async function handleRerun() {
    const ok = await confirm({
      title: 'Re-ejecutar cierre',
      description:
        'Se recalculará la nómina de la semana cerrada. La versión anterior se marcará como superseded.',
      confirmLabel: 'Re-ejecutar',
      variant: 'danger',
    });
    if (!ok) return;

    setIsClosing(true);
    try {
      const closedForWeek = closedPayroll.filter(
        (p) => p.weekLabel === selectedWeek && p.status === 'cerrado',
      );
      const latestVersion = Math.max(
        ...closedForWeek.map((p) => p.version ?? 1),
        0,
      );
      const rerunWeekStart = closedForWeek[0]?.weekStart ?? week.start;
      const rerunWeekEnd = closedForWeek[0]?.weekEnd ?? week.end;
      const activeDrivers = drivers.filter((d) => d.status === 'activo');
      const shiftSummaries = buildShiftSummaries(activeDrivers, shifts);
      const records = calculateWeeklyPay({
        drivers: activeDrivers,
        trips,
        shiftSummaries,
        weekLabel: selectedWeek,
        weekStart: rerunWeekStart,
        weekEnd: rerunWeekEnd,
        closedBy: session?.name ?? '',
        version: latestVersion + 1,
        previousWeekHours,
      });
      await actionRerunPayroll(
        rerunWeekStart,
        selectedWeek,
        records,
        latestVersion + 1,
        ctx,
      );
    } finally {
      setIsClosing(false);
    }
  }

  function handleExport(displayData: PayrollRecord[], tab: 'actual' | 'cerradas') {
    exportPayrollCsv(displayData, tab);
    ctx.showToast('success', 'CSV exportado.');
  }

  return { isClosing, handleCloseWeek, handleRerun, handleExport };
}
