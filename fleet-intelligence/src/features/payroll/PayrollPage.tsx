import { useState, useMemo } from 'react';
import { Upload, Receipt, AlertTriangle } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import type { PayrollRecord } from '@/types';
import { useCenterFilter } from '@/lib/use-center-filter';
import { formatMXN } from '@/lib/format';
import { useToast } from '@/app/providers/ToastProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { calculateWeeklyPay, exportPayrollCsv } from '@/features/payroll/lib/payroll';
import { getWeekBounds, buildShiftSummaries } from '@/lib/date-utils';
import { actionClosePayroll, actionRerunPayroll } from '@/lib/actions';
import { getPayrollFlags, generateWeekSummary } from '@/features/payroll/lib/payroll-flags';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import Select from '@/components/ui/Select';
import SlidePanel from '@/components/ui/SlidePanel';
import EmptyState from '@/components/ui/EmptyState';
import PayrollSummaryCards from './components/PayrollSummaryCards';
import PayrollDetailPanel from './components/PayrollDetailPanel';

type PayrollTab = 'actual' | 'cerradas';
type SortKey = 'driverName' | 'hoursWorked' | 'totalBilled' | 'totalPay';

export default function PayrollPage() {
  const { drivers, trips, shifts, closedPayroll, session } = useAppState();
  const dispatch = useAppDispatch();
  const { isAdmin, filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [tab, setTab] = useState<PayrollTab>('actual');
  const [sortKey, setSortKey] = useState<SortKey>('driverName');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedRow, setSelectedRow] = useState<PayrollRecord | null>(null);

  const week = getWeekBounds();

  const previousWeekHours = useMemo(() => {
    const map = new Map<string, number>();
    const closedRecords = closedPayroll.filter(p => p.status === 'cerrado' && p.weekLabel);
    if (closedRecords.length === 0) return map;
    const mostRecentWeek = closedRecords.reduce((latest, p) => {
      if (!latest || (p.weekStart && (!latest.weekStart || p.weekStart > latest.weekStart))) return p;
      return latest;
    }).weekLabel;
    closedRecords
      .filter(p => p.weekLabel === mostRecentWeek)
      .forEach(p => map.set(p.driverId, p.hoursWorked));
    return map;
  }, [closedPayroll]);

  const livePayroll = useMemo(() => {
    const filteredDrivers = filterByCenter(drivers);
    const shiftSummaries = buildShiftSummaries(filteredDrivers, shifts);
    return calculateWeeklyPay(filteredDrivers, trips, shiftSummaries, week.label, week.start, week.end, session?.name ?? '', 1, previousWeekHours);
  }, [drivers, trips, shifts, filterByCenter, week.label, week.start, week.end, session?.name, previousWeekHours]);

  const closedWeeks = useMemo(() => {
    const weeks = new Map<string, PayrollRecord[]>();
    closedPayroll.filter(p => p.status === 'cerrado').forEach(p => {
      const key = p.weekLabel ?? 'Sin etiqueta';
      if (!weeks.has(key)) weeks.set(key, []);
      weeks.get(key)!.push(p);
    });
    return weeks;
  }, [closedPayroll]);

  const [selectedWeek, setSelectedWeek] = useState<string>(() => {
    const keys = Array.from(closedWeeks.keys());
    return keys[keys.length - 1] ?? '';
  });

  const currentClosed = filterByCenter(
    closedWeeks.get(selectedWeek) ?? []
  );

  const displayData = tab === 'actual' ? livePayroll : currentClosed;

  const sorted = [...displayData].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const weekSummary = useMemo(() => generateWeekSummary(displayData), [displayData]);
  const totalNomina = weekSummary.totalPayroll;
  const driversWithGoal = weekSummary.driversWithGoal;
  const goalPct = displayData.length > 0 ? Math.round((driversWithGoal / displayData.length) * 100) : 0;
  const totalHours = displayData.reduce((sum, p) => sum + p.hoursWorked, 0);
  const totalBilled = displayData.reduce((sum, p) => sum + p.totalBilled, 0);
  const avgPerHour = totalHours > 0 ? Math.round(totalBilled / totalHours) : 0;

  const selectedRowTrips = useMemo(() => {
    if (!selectedRow) return [];
    const driver = drivers.find(d => d.fullName === selectedRow.driverName);
    if (!driver) return [];
    return trips.filter(t => t.driverId === driver.didiDriverId);
  }, [selectedRow, drivers, trips]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  }

  async function handleCloseWeek() {
    const ok = await confirm({
      title: 'Cerrar semana',
      description: `Se cerrará la nómina de la semana ${week.label}. Esta acción no se puede deshacer fácilmente.`,
      confirmLabel: 'Cerrar semana',
      variant: 'danger',
    });
    if (!ok) return;

    const activeDrivers = filterByCenter(drivers).filter(d => d.status === 'activo');
    const shiftSummaries = buildShiftSummaries(activeDrivers, shifts);
    const records = calculateWeeklyPay(activeDrivers, trips, shiftSummaries, week.label, week.start, week.end, session?.name ?? '', 1, previousWeekHours);
    await actionClosePayroll(records, session?.userId ?? '', week.label, dispatch, showToast, session?.role);
    setTab('cerradas');
    setSelectedWeek(week.label);
  }

  async function handleRerun() {
    const ok = await confirm({
      title: 'Re-ejecutar cierre',
      description: 'Se recalculará la nómina de la semana cerrada. La versión anterior se marcará como superseded.',
      confirmLabel: 'Re-ejecutar',
      variant: 'danger',
    });
    if (!ok) return;

    const closedForWeek = closedPayroll.filter(p => p.weekLabel === selectedWeek && p.status === 'cerrado');
    const latestVersion = Math.max(...closedForWeek.map(p => p.version ?? 1), 0);
    const rerunWeekStart = closedForWeek[0]?.weekStart ?? week.start;
    const rerunWeekEnd = closedForWeek[0]?.weekEnd ?? week.end;
    const activeDrivers = drivers.filter(d => d.status === 'activo');
    const shiftSummaries = buildShiftSummaries(activeDrivers, shifts);
    const records = calculateWeeklyPay(activeDrivers, trips, shiftSummaries, selectedWeek, rerunWeekStart, rerunWeekEnd, session?.name ?? '', latestVersion + 1, previousWeekHours);
    await actionRerunPayroll(rerunWeekStart, selectedWeek, records, session?.userId ?? '', latestVersion + 1, dispatch, showToast, session?.role);
  }

  function handleExport() {
    exportPayrollCsv(displayData, tab);
    showToast('success', 'CSV exportado.');
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    return (
      <th
        className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider cursor-pointer hover:text-lafa-text-primary select-none whitespace-nowrap"
        onClick={() => handleSort(field)}
      >
        {label} {sortKey === field ? (sortAsc ? '↑' : '↓') : ''}
      </th>
    );
  }

  const weekOptions = Array.from(closedWeeks.keys());

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-semibold text-lafa-text-primary">{'Nómina'}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <CenterFilterDropdown />
          {tab === 'actual' && isAdmin && (
            <button
              onClick={handleCloseWeek}
              className="px-4 py-2 text-sm font-medium text-status-danger border border-status-danger/30 rounded hover:bg-status-danger/10 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cerrar semana
            </button>
          )}
          {tab === 'cerradas' && isAdmin && currentClosed.length > 0 && (
            <button
              onClick={handleRerun}
              className="px-4 py-2 text-sm font-medium text-status-alert border border-status-alert/30 rounded hover:bg-status-alert/10 transition-colors duration-150"
            >
              Re-ejecutar cierre
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
            tab === 'actual' ? 'text-lafa-accent' : 'text-lafa-text-secondary hover:text-lafa-text-primary'
          }`}
        >
          Semana actual (borrador)
          {tab === 'actual' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />}
        </button>
        <button
          onClick={() => setTab('cerradas')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors duration-150 relative ${
            tab === 'cerradas' ? 'text-lafa-accent' : 'text-lafa-text-secondary hover:text-lafa-text-primary'
          }`}
        >
          Cerradas
          {tab === 'cerradas' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />}
        </button>
      </div>

      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {tab === 'actual' && (
          <p className="text-sm text-lafa-text-secondary">
            {'Semana: '}
            <span className="text-lafa-text-primary font-medium">{week.label}</span>
            <span className="ml-2 text-status-alert">(borrador en vivo)</span>
          </p>
        )}
        {tab === 'cerradas' && weekOptions.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-lafa-text-secondary">Semana:</span>
            <Select
              value={selectedWeek}
              onChange={e => setSelectedWeek(e.target.value)}
              className="px-3 py-1.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
            >
              {weekOptions.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </Select>
          </div>
        )}
        {tab === 'cerradas' && weekOptions.length === 1 && (
          <p className="text-sm text-lafa-text-secondary">
            {'Semana: '}
            <span className="text-lafa-text-primary font-medium">{selectedWeek}</span>
          </p>
        )}
      </div>

      {tab === 'actual' && trips.length === 0 && (
        <EmptyState
          icon={Upload}
          title="Sin datos de viajes"
          description={'Importa viajes desde Carga CSV para ver el cálculo de nómina en vivo.'}
        />
      )}

      {(tab === 'cerradas' || trips.length > 0) && (
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

          <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-lafa-surface">
                  <tr className="border-b border-lafa-border">
                    <SortHeader label="Conductor" field="driverName" />
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Centro</th>
                    <SortHeader label="Horas" field="hoursWorked" />
                    <SortHeader label={'Facturación'} field="totalBilled" />
                    <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Meta</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Base</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Bono</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Overtime</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Apoyo</th>
                    <SortHeader label="Pago total" field="totalPay" />
                    <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Flags</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.length === 0 && (
                    <tr>
                      <td colSpan={12} className="px-4 py-8">
                        <EmptyState icon={Receipt} title={'Sin registros de nómina'} />
                      </td>
                    </tr>
                  )}
                  {sorted.map((row, i) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedRow(row)}
                      className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors duration-150 ${
                        i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                      }`}
                    >
                      <td className="px-4 py-3 text-lafa-text-primary font-medium whitespace-nowrap">{row.driverName}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary">{row.center}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary" title={`Meta: ${row.hoursThreshold}h`}>
                        {row.hoursWorked}h
                        <span className="text-[10px] text-lafa-text-secondary/60 ml-1">/{row.hoursThreshold}h</span>
                      </td>
                      <td className="px-4 py-3 text-lafa-text-primary whitespace-nowrap" title={`Meta: ${formatMXN(row.revenueThreshold)}`}>
                        {formatMXN(row.totalBilled)}
                        <span className="text-[10px] text-lafa-text-secondary/60 ml-1">/{formatMXN(row.revenueThreshold)}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {row.goalMet ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-success/15 text-status-success">{'\u00a0Sí\u00a0'}</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-danger/15 text-status-danger">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{formatMXN(row.baseSalary)}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{formatMXN(row.productivityBonus)}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{formatMXN(row.overtimePay)}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{row.goalMet ? '—' : formatMXN(1000)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-lafa-text-primary whitespace-nowrap">{formatMXN(row.totalPay)}</td>
                      <td className="px-4 py-3">
                        {(() => {
                          const flags = getPayrollFlags(row, previousWeekHours.get(row.driverId));
                          if (flags.length === 0) return null;
                          return (
                            <div className="flex flex-col gap-0.5">
                              {flags.map((f, fi) => (
                                <span key={fi} className="inline-flex items-center gap-1 text-[10px] font-medium whitespace-nowrap" style={{ color: f.color }}>
                                  <AlertTriangle size={10} />
                                  {f.label}
                                </span>
                              ))}
                            </div>
                          );
                        })()}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {tab === 'actual' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-alert/15 text-status-alert">Borrador</span>
                        ) : row.status === 'cerrado' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-success/15 text-status-success">Cerrado</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-danger/15 text-status-danger">Superseded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
              <span className="text-xs text-lafa-text-secondary">
                {displayData.length} conductor{displayData.length !== 1 ? 'es' : ''}
              </span>
              {displayData.length > 0 && (
                <span className="text-xs font-medium text-lafa-text-primary">
                  {'Total: '}{formatMXN(totalNomina)}
                </span>
              )}
            </div>
          </div>
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
