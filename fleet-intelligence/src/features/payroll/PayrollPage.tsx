import { useState, useMemo } from 'react';
import { Upload, CheckCircle } from 'lucide-react';
import type { PayrollRecord } from '@/types';
import { useCenterFilter } from '@/lib/use-center-filter';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useActionContext } from '@/lib/action-context';
import {
  calculateWeeklyPay,
  exportPayrollCsv,
} from '@/features/payroll/lib/payroll';
import { buildShiftSummaries } from '@/lib/date-utils';
import { actionClosePayroll, actionRerunPayroll } from '@/lib/actions';
import { usePayrollData, usePayrollStats } from './lib/use-payroll-data';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import SearchableSelect from '@/components/ui/SearchableSelect';
import EmptyState from '@/components/ui/EmptyState';
import PayrollSummaryCards from './components/PayrollSummaryCards';
import PayrollDetailPanel from './components/PayrollDetailPanel';
import PayrollTable from './components/PayrollTable';
import SlidePanel from '@/components/ui/SlidePanel';

type PayrollTab = 'actual' | 'cerradas';

export default function PayrollPage() {
  const {
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
  } = usePayrollData();
  const ctx = useActionContext();
  const { isAdmin } = useCenterFilter();
  const { confirm } = useConfirmDialog();

  const [tab, setTab] = useState<PayrollTab>('actual');
  const [selectedRow, setSelectedRow] = useState<PayrollRecord | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  const [selectedWeek, setSelectedWeek] = useState<string>(() => {
    const keys = Array.from(closedWeeks.keys());
    return keys[keys.length - 1] ?? '';
  });

  const currentClosed = filterByCenter(closedWeeks.get(selectedWeek) ?? []);
  const displayData = tab === 'actual' ? livePayroll : currentClosed;

  const {
    weekSummary,
    totalNomina,
    driversWithGoal,
    goalPct,
    totalBilled,
    avgPerHour,
  } = usePayrollStats(displayData);

  const selectedRowTrips = useMemo(() => {
    if (!selectedRow) return [];
    const driver = drivers.find((d) => d.fullName === selectedRow.driverName);
    if (!driver) return [];
    return trips.filter((t) => t.didiDriverId === driver.didiDriverId);
  }, [selectedRow, drivers, trips]);

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
      const records = calculateWeeklyPay(
        activeDrivers,
        trips,
        shiftSummaries,
        week.label,
        week.start,
        week.end,
        session?.name ?? '',
        1,
        previousWeekHours,
      );
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
      const records = calculateWeeklyPay(
        activeDrivers,
        trips,
        shiftSummaries,
        selectedWeek,
        rerunWeekStart,
        rerunWeekEnd,
        session?.name ?? '',
        latestVersion + 1,
        previousWeekHours,
      );
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

  function handleExport() {
    exportPayrollCsv(displayData, tab);
    ctx.showToast('success', 'CSV exportado.');
  }

  const weekOptions = Array.from(closedWeeks.keys());

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-lafa-text-primary">
          {'Nómina'}
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <CenterFilterDropdown />
          {tab === 'actual' && isAdmin && !isCurrentWeekClosed && (
            <button
              onClick={handleCloseWeek}
              disabled={isClosing}
              className="px-4 py-2 text-sm font-medium text-status-danger border border-status-danger/30 rounded hover:bg-status-danger/10 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClosing ? 'Cerrando...' : 'Cerrar semana'}
            </button>
          )}
          {tab === 'cerradas' && isAdmin && currentClosed.length > 0 && (
            <button
              onClick={handleRerun}
              disabled={isClosing}
              className="px-4 py-2 text-sm font-medium text-status-alert border border-status-alert/30 rounded hover:bg-status-alert/10 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isClosing ? 'Re-ejecutando...' : 'Re-ejecutar cierre'}
            </button>
          )}
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-lafa-border mb-6">
        <button
          onClick={() => setTab('actual')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 relative ${
            tab === 'actual'
              ? 'text-lafa-accent'
              : 'text-lafa-text-secondary hover:text-lafa-text-primary'
          }`}
        >
          Semana actual (borrador)
          {tab === 'actual' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />
          )}
        </button>
        <button
          onClick={() => setTab('cerradas')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 relative ${
            tab === 'cerradas'
              ? 'text-lafa-accent'
              : 'text-lafa-text-secondary hover:text-lafa-text-primary'
          }`}
        >
          Cerradas
          {tab === 'cerradas' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />
          )}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {tab === 'actual' && !isCurrentWeekClosed && (
          <p className="text-sm text-lafa-text-secondary">
            {'Semana: '}
            <span className="text-lafa-text-primary font-medium">
              {week.label}
            </span>
            <span className="ml-2 text-status-alert">(borrador en vivo)</span>
          </p>
        )}
        {tab === 'cerradas' && weekOptions.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-lafa-text-secondary">Semana:</span>
            <SearchableSelect
              options={weekOptions.map((w) => ({ value: w, label: w }))}
              value={selectedWeek}
              onChange={(v) => setSelectedWeek(v)}
              searchable={false}
            />
          </div>
        )}
        {tab === 'cerradas' && weekOptions.length === 1 && (
          <p className="text-sm text-lafa-text-secondary">
            {'Semana: '}
            <span className="text-lafa-text-primary font-medium">
              {selectedWeek}
            </span>
          </p>
        )}
      </div>

      {tab === 'actual' && isCurrentWeekClosed && (
        <EmptyState
          icon={CheckCircle}
          title="Semana cerrada"
          description={`La nómina de ${week.label} ya fue cerrada. Revisa los resultados en la pestaña Cerradas.`}
        >
          <button
            onClick={() => {
              setTab('cerradas');
              setSelectedWeek(week.label);
            }}
            className="mt-3 px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors duration-150"
          >
            Ver en Cerradas
          </button>
        </EmptyState>
      )}

      {tab === 'actual' && !isCurrentWeekClosed && trips.length === 0 && (
        <EmptyState
          icon={Upload}
          title="Sin datos de viajes"
          description={
            'Importa viajes desde Carga CSV para ver el cálculo de nómina en vivo.'
          }
        />
      )}

      {(tab === 'cerradas' || (trips.length > 0 && !isCurrentWeekClosed)) && (
        <>
          {displayData.length > 0 && (
            <>
              <div className="bg-lafa-accent/10 border border-lafa-accent/20 rounded-xl p-3 mb-4 text-sm text-lafa-text-primary">
                {weekSummary.narrative}
              </div>
              <PayrollSummaryCards
                totalNomina={totalNomina}
                driversWithGoal={driversWithGoal}
                totalDrivers={displayData.length}
                goalPct={goalPct}
                totalBilled={totalBilled}
                avgPerHour={avgPerHour}
                totalBase={weekSummary.totalBase}
                totalBonus={weekSummary.totalBonus}
                totalOvertime={weekSummary.totalOvertime}
                totalSupport={weekSummary.totalSupport}
              />
            </>
          )}

          <PayrollTable
            data={displayData}
            tab={tab}
            totalNomina={totalNomina}
            previousWeekHours={previousWeekHours}
            onSelectRow={setSelectedRow}
          />
        </>
      )}

      <SlidePanel
        open={!!selectedRow}
        onClose={() => setSelectedRow(null)}
        title={selectedRow ? `Detalle — ${selectedRow.driverName}` : ''}
      >
        {selectedRow && (
          <PayrollDetailPanel record={selectedRow} trips={selectedRowTrips} />
        )}
      </SlidePanel>
    </div>
  );
}
