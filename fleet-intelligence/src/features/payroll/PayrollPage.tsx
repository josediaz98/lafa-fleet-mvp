import { useCenterFilter } from '@/lib/use-center-filter';
import { usePayrollData, usePayrollStats } from './lib/use-payroll-data';
import { usePayrollWeek } from './lib/use-payroll-week';
import { usePayrollActions } from './lib/use-payroll-actions';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import PayrollDetailPanel from './components/PayrollDetailPanel';
import PayrollDraftView from './components/PayrollDraftView';
import PayrollClosedView from './components/PayrollClosedView';
import SlidePanel from '@/components/ui/SlidePanel';

export default function PayrollPage() {
  const {
    drivers, trips, shifts, closedPayroll, session,
    week, isCurrentWeekClosed, previousWeekHours,
    livePayroll, closedWeeks, filterByCenter,
  } = usePayrollData();
  const { isAdmin } = useCenterFilter();

  const {
    tab, setTab, selectedRow, setSelectedRow,
    selectedWeek, setSelectedWeek, currentClosed,
    displayData, weekOptions, selectedRowTrips,
  } = usePayrollWeek(closedWeeks, livePayroll, filterByCenter, drivers, trips);

  const { isClosing, handleCloseWeek, handleRerun, handleExport } = usePayrollActions({
    drivers, trips, shifts, closedPayroll, session,
    week, isCurrentWeekClosed, previousWeekHours,
    filterByCenter, selectedWeek, setTab, setSelectedWeek,
  });

  const {
    weekSummary, totalNomina, driversWithGoal,
    goalPct, totalBilled, avgPerHour,
  } = usePayrollStats(displayData);

  return (
    <div>
      {/* Header */}
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
            onClick={() => handleExport(displayData, tab)}
            className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-lafa-border mb-6">
        {(['actual', 'cerradas'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 relative ${
              tab === t
                ? 'text-lafa-accent'
                : 'text-lafa-text-secondary hover:text-lafa-text-primary'
            }`}
          >
            {t === 'actual' ? 'Semana actual (borrador)' : 'Cerradas'}
            {tab === t && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'actual' ? (
        <PayrollDraftView
          week={week}
          isAdmin={isAdmin}
          isCurrentWeekClosed={isCurrentWeekClosed}
          hasTrips={trips.length > 0}
          displayData={displayData}
          weekSummary={weekSummary}
          totalNomina={totalNomina}
          driversWithGoal={driversWithGoal}
          goalPct={goalPct}
          totalBilled={totalBilled}
          avgPerHour={avgPerHour}
          previousWeekHours={previousWeekHours}
          onGoToClosed={() => {
            setTab('cerradas');
            setSelectedWeek(week.label);
          }}
          onSelectRow={setSelectedRow}
        />
      ) : (
        <PayrollClosedView
          weekOptions={weekOptions}
          selectedWeek={selectedWeek}
          setSelectedWeek={setSelectedWeek}
          displayData={displayData}
          weekSummary={weekSummary}
          totalNomina={totalNomina}
          driversWithGoal={driversWithGoal}
          goalPct={goalPct}
          totalBilled={totalBilled}
          avgPerHour={avgPerHour}
          previousWeekHours={previousWeekHours}
          onSelectRow={setSelectedRow}
        />
      )}

      {/* Detail panel */}
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
