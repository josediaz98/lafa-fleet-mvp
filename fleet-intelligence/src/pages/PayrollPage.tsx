import { useState, useMemo } from 'react';
import { Upload, Receipt } from 'lucide-react';
import { useAppState, useAppDispatch, type PayrollRecord } from '../context/AppContext';
import { useCenterFilter } from '../hooks/useCenterFilter';
import { formatMXN } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useConfirmDialog } from '../components/ui/ConfirmDialog';
import { calculateWeeklyPay, exportPayrollCsv } from '../lib/payroll';
import { getWeekBounds } from '../lib/dateUtils';
import CenterFilterDropdown from '../components/ui/CenterFilterDropdown';
import SlidePanel from '../components/ui/SlidePanel';
import EmptyState from '../components/ui/EmptyState';

type PayrollTab = 'actual' | 'cerradas';
type SortKey = 'driverName' | 'hoursWorked' | 'totalBilled' | 'totalPay';

export default function PayrollPage() {
  const { drivers, trips, shifts, closedPayroll, session } = useAppState();
  const dispatch = useAppDispatch();
  const { isAdmin, filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [tab, setTab] = useState<PayrollTab>('cerradas');
  const [sortKey, setSortKey] = useState<SortKey>('driverName');
  const [sortAsc, setSortAsc] = useState(true);
  const [selectedRow, setSelectedRow] = useState<PayrollRecord | null>(null);

  const week = getWeekBounds();

  const previousWeekHours = useMemo(() => {
    const map = new Map<string, number>();
    closedPayroll
      .filter(p => p.status === 'cerrado')
      .forEach(p => {
        const existing = map.get(p.driverId) ?? 0;
        if (p.hoursWorked > existing) map.set(p.driverId, p.hoursWorked);
      });
    return map;
  }, [closedPayroll]);

  const livePayroll = useMemo(() => {
    const filteredDrivers = filterByCenter(drivers);
    const shiftSummaries = filteredDrivers.map(driver => {
      const driverShifts = shifts.filter(
        s => s.driverId === driver.id && s.status === 'completado' && s.hoursWorked
      );
      return {
        driverId: driver.id,
        totalHours: driverShifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0),
      };
    });
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

  const totalNomina = displayData.reduce((sum, p) => sum + p.totalPay, 0);
  const driversWithGoal = displayData.filter(p => p.goalMet).length;
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
      description: `Se cerrar\u00e1 la n\u00f3mina de la semana ${week.label}. Esta acci\u00f3n no se puede deshacer f\u00e1cilmente.`,
      confirmLabel: 'Cerrar semana',
      variant: 'danger',
    });
    if (!ok) return;

    const shiftSummaries = drivers.filter(d => d.status === 'activo').map(driver => {
      const driverShifts = shifts.filter(s => s.driverId === driver.id && s.status === 'completado' && s.hoursWorked);
      return { driverId: driver.id, totalHours: driverShifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0) };
    });
    const records = calculateWeeklyPay(drivers.filter(d => d.status === 'activo'), trips, shiftSummaries, week.label, week.start, week.end, session?.name ?? '', 1, previousWeekHours);
    dispatch({ type: 'CLOSE_PAYROLL_WEEK', payload: records });
    showToast('success', `Semana ${week.label} cerrada exitosamente.`);
    setTab('cerradas');
    setSelectedWeek(week.label);
  }

  async function handleRerun() {
    const ok = await confirm({
      title: 'Re-ejecutar cierre',
      description: 'Se recalcular\u00e1 la n\u00f3mina de la semana cerrada. La versi\u00f3n anterior se marcar\u00e1 como superseded.',
      confirmLabel: 'Re-ejecutar',
      variant: 'danger',
    });
    if (!ok) return;

    const latestVersion = Math.max(...closedPayroll.filter(p => p.weekLabel === selectedWeek).map(p => p.version ?? 1), 0);
    const shiftSummaries = drivers.filter(d => d.status === 'activo').map(driver => {
      const driverShifts = shifts.filter(s => s.driverId === driver.id && s.status === 'completado' && s.hoursWorked);
      return { driverId: driver.id, totalHours: driverShifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0) };
    });
    const records = calculateWeeklyPay(drivers.filter(d => d.status === 'activo'), trips, shiftSummaries, selectedWeek, week.start, week.end, session?.name ?? '', latestVersion + 1, previousWeekHours);
    dispatch({ type: 'RERUN_PAYROLL_CLOSE', payload: { weekLabel: selectedWeek, newRecords: records } });
    showToast('success', `N\u00f3mina re-ejecutada (v${latestVersion + 1}).`);
  }

  function handleExport() {
    exportPayrollCsv(displayData);
    showToast('success', 'CSV exportado.');
  }

  function SortHeader({ label, field }: { label: string; field: SortKey }) {
    return (
      <th
        className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider cursor-pointer hover:text-lafa-text-primary select-none whitespace-nowrap"
        onClick={() => handleSort(field)}
      >
        {label} {sortKey === field ? (sortAsc ? '\u2191' : '\u2193') : ''}
      </th>
    );
  }

  const weekOptions = Array.from(closedWeeks.keys());

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-lafa-text-primary">{'N\u00f3mina'}</h1>
        <div className="flex items-center gap-3 flex-wrap">
          <CenterFilterDropdown />
          {tab === 'actual' && isAdmin && (
            <button
              onClick={handleCloseWeek}
              className="px-4 py-2 text-sm font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
            >
              Cerrar semana
            </button>
          )}
          {tab === 'cerradas' && isAdmin && currentClosed.length > 0 && (
            <button
              onClick={handleRerun}
              className="px-4 py-2 text-sm font-medium text-[#EAB308] border border-[#EAB308]/30 rounded hover:bg-[rgba(234,179,8,0.1)] transition-colors"
            >
              Re-ejecutar cierre
            </button>
          )}
          <button
            onClick={handleExport}
            className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
          >
            Exportar CSV
          </button>
        </div>
      </div>

      <div className="flex gap-1 border-b border-lafa-border mb-6">
        <button
          onClick={() => setTab('actual')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
            tab === 'actual' ? 'text-lafa-accent' : 'text-lafa-text-secondary hover:text-lafa-text-primary'
          }`}
        >
          Semana actual (borrador)
          {tab === 'actual' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />}
        </button>
        <button
          onClick={() => setTab('cerradas')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
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
            <span className="ml-2 text-[#EAB308]">(borrador en vivo)</span>
          </p>
        )}
        {tab === 'cerradas' && weekOptions.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-lafa-text-secondary">Semana:</span>
            <select
              value={selectedWeek}
              onChange={e => setSelectedWeek(e.target.value)}
              className="px-3 py-1.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
            >
              {weekOptions.map(w => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
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
          description={'Importa viajes desde Carga CSV para ver el c\u00e1lculo de n\u00f3mina en vivo.'}
        />
      )}

      {(tab === 'cerradas' || trips.length > 0) && (
        <>
          {displayData.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
                <p className="text-xs text-lafa-text-secondary mb-1">{'Total n\u00f3mina'}</p>
                <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(totalNomina)}</p>
              </div>
              <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
                <p className="text-xs text-lafa-text-secondary mb-1">Conductores con meta</p>
                <p className="text-lg font-bold text-lafa-text-primary">
                  {driversWithGoal}/{displayData.length}
                  <span className="text-sm font-normal text-lafa-text-secondary ml-1">({goalPct}%)</span>
                </p>
              </div>
              <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
                <p className="text-xs text-lafa-text-secondary mb-1">{'Facturaci\u00f3n total'}</p>
                <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(totalBilled)}</p>
              </div>
              <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
                <p className="text-xs text-lafa-text-secondary mb-1">{'Prom. facturaci\u00f3n/hora'}</p>
                <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(avgPerHour)}</p>
              </div>
            </div>
          )}

          <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-lafa-surface">
                  <tr className="border-b border-lafa-border">
                    <SortHeader label="Conductor" field="driverName" />
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Centro</th>
                    <SortHeader label="Horas" field="hoursWorked" />
                    <SortHeader label={'Facturaci\u00f3n'} field="totalBilled" />
                    <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Meta</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Base</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Bono</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">Overtime</th>
                    <SortHeader label="Pago total" field="totalPay" />
                  </tr>
                </thead>
                <tbody>
                  {sorted.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-8">
                        <EmptyState icon={Receipt} title={'Sin registros de n\u00f3mina'} />
                      </td>
                    </tr>
                  )}
                  {sorted.map((row, i) => (
                    <tr
                      key={row.id}
                      onClick={() => setSelectedRow(row)}
                      className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors ${
                        i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                      }`}
                    >
                      <td className="px-4 py-3 text-lafa-text-primary font-medium whitespace-nowrap">{row.driverName}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary">{row.center}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary">{row.hoursWorked}h</td>
                      <td className="px-4 py-3 text-lafa-text-primary whitespace-nowrap">{formatMXN(row.totalBilled)}</td>
                      <td className="px-4 py-3 text-center">
                        {row.goalMet ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[rgba(34,197,94,0.15)] text-[#22C55E]">{'\u00a0S\u00ed\u00a0'}</span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[rgba(239,68,68,0.15)] text-[#EF4444]">No</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{formatMXN(row.baseSalary)}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{formatMXN(row.productivityBonus)}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">{formatMXN(row.overtimePay)}</td>
                      <td className="px-4 py-3 text-right font-semibold text-lafa-text-primary whitespace-nowrap">{formatMXN(row.totalPay)}</td>
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
        title={selectedRow ? `Detalle \u2014 ${selectedRow.driverName}` : ''}
      >
        {selectedRow && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-lafa-text-secondary">Centro</p>
                <p className="text-sm font-medium text-lafa-text-primary">{selectedRow.center}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Horas trabajadas</p>
                <p className="text-sm font-medium text-lafa-text-primary">{selectedRow.hoursWorked}h</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">{'Facturaci\u00f3n'}</p>
                <p className="text-sm font-medium text-lafa-text-primary">{formatMXN(selectedRow.totalBilled)}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Meta alcanzada</p>
                <p className={`text-sm font-medium ${selectedRow.goalMet ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                  {selectedRow.goalMet ? 'S\u00ed' : 'No'}
                </p>
              </div>
              {selectedRow.version && selectedRow.version > 1 && (
                <div>
                  <p className="text-xs text-lafa-text-secondary">{'Versi\u00f3n'}</p>
                  <p className="text-sm font-medium text-[#EAB308]">v{selectedRow.version} (recalculado)</p>
                </div>
              )}
            </div>

            <div className="border-t border-lafa-border pt-4">
              <h4 className="text-sm font-semibold text-lafa-text-primary mb-3">Desglose de pago</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-lafa-text-secondary">Salario base</span>
                  <span className="text-lafa-text-primary">{formatMXN(selectedRow.baseSalary)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-lafa-text-secondary">Bono productividad</span>
                  <span className="text-lafa-text-primary">{formatMXN(selectedRow.productivityBonus)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-lafa-text-secondary">Overtime</span>
                  <span className="text-lafa-text-primary">{formatMXN(selectedRow.overtimePay)}</span>
                </div>
                {!selectedRow.goalMet && (
                  <div className="flex justify-between text-sm">
                    <span className="text-lafa-text-secondary">{'Apoyo econ\u00f3mico'}</span>
                    <span className="text-[#EF4444]">{formatMXN(1000)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold border-t border-lafa-border pt-2">
                  <span className="text-lafa-text-primary">Total</span>
                  <span className="text-lafa-accent">{formatMXN(selectedRow.totalPay)}</span>
                </div>
              </div>
            </div>

            {selectedRowTrips.length > 0 && (
              <div className="border-t border-lafa-border pt-4">
                <h4 className="text-sm font-semibold text-lafa-text-primary mb-3">Viajes ({selectedRowTrips.length})</h4>
                <div className="bg-lafa-bg rounded-lg overflow-hidden max-h-48 overflow-y-auto">
                  <table className="w-full text-xs">
                    <thead className="sticky top-0 bg-lafa-bg">
                      <tr className="border-b border-lafa-border">
                        <th className="text-left px-3 py-2 text-lafa-text-secondary">Fecha</th>
                        <th className="text-left px-3 py-2 text-lafa-text-secondary">Horario</th>
                        <th className="text-right px-3 py-2 text-lafa-text-secondary">Costo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedRowTrips.map(t => (
                        <tr key={t.id} className="border-b border-lafa-border/50">
                          <td className="px-3 py-2 text-lafa-text-secondary">{t.fecha}</td>
                          <td className="px-3 py-2 text-lafa-text-secondary">{t.horaInicio} {'\u2192'} {t.horaFin}</td>
                          <td className="px-3 py-2 text-right text-lafa-text-primary">{formatMXN(t.costo)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="border-t border-lafa-border pt-4">
              <h4 className="text-sm font-semibold text-lafa-text-primary mb-3">Resumen AI</h4>
              <div className="bg-lafa-bg rounded-lg p-4 text-sm text-lafa-text-secondary leading-relaxed">
                {selectedRow.aiExplanation || 'Sin resumen disponible.'}
              </div>
            </div>
          </div>
        )}
      </SlidePanel>
    </div>
  );
}
