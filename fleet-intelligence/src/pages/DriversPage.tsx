import { useState, useMemo } from 'react';
import { Search, Plus, Users, Clock } from 'lucide-react';
import { useAppState, useAppDispatch, type Driver } from '../context/AppContext';
import { useCenterFilter } from '../hooks/useCenterFilter';
import { MOCK_CENTERS, formatMXN, formatTime } from '../data/mockData';
import { getCenterName } from '../lib/dataUtils';
import { useToast } from '../context/ToastContext';
import { useConfirmDialog } from '../components/ui/ConfirmDialog';
import CenterFilterDropdown from '../components/ui/CenterFilterDropdown';
import StatusBadge from '../components/ui/StatusBadge';
import SlidePanel from '../components/ui/SlidePanel';
import EmptyState from '../components/ui/EmptyState';
import DriverCreateModal from '../components/drivers/DriverCreateModal';

type DriverPanelTab = 'datos' | 'nomina' | 'turnos';
type StatusFilter = 'todos' | 'activo' | 'inactivo';
type ShiftFilter = 'todos' | 'diurno' | 'nocturno';

interface DriverFormState {
  fullName: string;
  didiDriverId: string;
  centerId: string;
  defaultShift: string;
  startDate: string;
}

export default function DriversPage() {
  const { drivers, shifts, closedPayroll } = useAppState();
  const dispatch = useAppDispatch();
  const { isAdmin, effectiveCenterId, filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [shiftFilter, setShiftFilter] = useState<ShiftFilter>('todos');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [panelTab, setPanelTab] = useState<DriverPanelTab>('datos');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<DriverFormState>({ fullName: '', didiDriverId: '', centerId: '', defaultShift: 'diurno', startDate: new Date().toISOString().slice(0, 10) });
  const [formError, setFormError] = useState('');

  const centeredDrivers = filterByCenter(drivers);
  const filtered = useMemo(() => {
    let result = centeredDrivers;
    if (statusFilter !== 'todos') {
      result = result.filter(d => d.status === statusFilter);
    }
    if (shiftFilter !== 'todos') {
      result = result.filter(d => d.defaultShift === shiftFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(d =>
        d.fullName.toLowerCase().includes(q) ||
        d.didiDriverId.toString().includes(q)
      );
    }
    return result;
  }, [centeredDrivers, statusFilter, shiftFilter, search]);

  const driverPayrollHistory = useMemo(() => {
    if (!selectedDriver) return [];
    return closedPayroll
      .filter(p => p.driverName === selectedDriver.fullName && p.status === 'cerrado')
      .sort((a, b) => {
        if (a.weekStart && b.weekStart) return b.weekStart.localeCompare(a.weekStart);
        return 0;
      });
  }, [selectedDriver, closedPayroll]);

  const driverShiftHistory = useMemo(() => {
    if (!selectedDriver) return [];
    return shifts
      .filter(s => s.driverId === selectedDriver.id && s.status === 'completado')
      .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
      .slice(0, 20);
  }, [selectedDriver, shifts]);

  function handleCreateDriver(createForm: DriverFormState) {
    const newDriver: Driver = {
      id: `d-${Date.now()}`,
      fullName: createForm.fullName.trim(),
      didiDriverId: parseInt(createForm.didiDriverId, 10),
      centerId: createForm.centerId,
      defaultShift: createForm.defaultShift,
      startDate: createForm.startDate,
      status: 'activo',
    };
    dispatch({ type: 'ADD_DRIVER', payload: newDriver });
    showToast('success', `Conductor ${newDriver.fullName} creado.`);
    setShowCreateModal(false);
  }

  function openEdit() {
    if (!selectedDriver) return;
    setForm({
      fullName: selectedDriver.fullName,
      didiDriverId: String(selectedDriver.didiDriverId),
      centerId: selectedDriver.centerId,
      defaultShift: selectedDriver.defaultShift,
      startDate: selectedDriver.startDate,
    });
    setFormError('');
    setEditMode(true);
  }

  function handleSaveEdit() {
    if (!selectedDriver) return;
    setFormError('');
    if (!form.fullName.trim()) {
      setFormError('Nombre es obligatorio.');
      return;
    }
    const newDidiId = parseInt(form.didiDriverId, 10);
    if (newDidiId !== selectedDriver.didiDriverId && drivers.some(d => d.didiDriverId === newDidiId)) {
      setFormError('Ya existe un conductor con ese DiDi ID.');
      return;
    }
    const updated: Driver = {
      ...selectedDriver,
      fullName: form.fullName.trim(),
      didiDriverId: parseInt(form.didiDriverId, 10),
      centerId: form.centerId,
      defaultShift: form.defaultShift,
      startDate: form.startDate,
    };
    dispatch({ type: 'UPDATE_DRIVER', payload: updated });
    setSelectedDriver(updated);
    showToast('success', `Conductor ${updated.fullName} actualizado.`);
    setEditMode(false);
  }

  async function handleDeactivate() {
    if (!selectedDriver) return;
    const hasActiveShift = shifts.some(
      s => s.driverId === selectedDriver.id && s.status === 'en_turno'
    );
    if (hasActiveShift) {
      showToast('error', 'No se puede desactivar un conductor con turno activo.');
      return;
    }
    const ok = await confirm({
      title: 'Desactivar conductor',
      description: `Se desactivar\u00e1 a ${selectedDriver.fullName}. No podr\u00e1 ser asignado a nuevos turnos.`,
      confirmLabel: 'Desactivar',
      variant: 'danger',
    });
    if (!ok) return;
    dispatch({ type: 'DEACTIVATE_DRIVER', payload: selectedDriver.id });
    showToast('success', `${selectedDriver.fullName} desactivado.`);
    setSelectedDriver(null);
  }

  const statusFilters: { key: StatusFilter; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'activo', label: 'Activos' },
    { key: 'inactivo', label: 'Inactivos' },
  ];

  const shiftFilters: { key: ShiftFilter; label: string }[] = [
    { key: 'todos', label: 'Todos' },
    { key: 'diurno', label: 'Diurno' },
    { key: 'nocturno', label: 'Nocturno' },
  ];

  const panelTabs: { key: DriverPanelTab; label: string }[] = [
    { key: 'datos', label: 'Datos' },
    { key: 'nomina', label: 'N\u00f3mina' },
    { key: 'turnos', label: 'Turnos' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-lafa-text-primary">Conductores</h1>
        <div className="flex items-center gap-3">
          <CenterFilterDropdown />
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
            >
              <Plus size={16} /> Nuevo conductor
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lafa-text-secondary" />
          <input
            type="text"
            placeholder="Buscar por nombre o DiDi ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-lafa-surface border border-lafa-border rounded p-0.5">
            {statusFilters.map(f => (
              <button
                key={f.key}
                onClick={() => setStatusFilter(f.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  statusFilter === f.key
                    ? 'bg-lafa-accent text-white'
                    : 'text-lafa-text-secondary hover:text-lafa-text-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 bg-lafa-surface border border-lafa-border rounded p-0.5">
            {shiftFilters.map(f => (
              <button
                key={f.key}
                onClick={() => setShiftFilter(f.key)}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
                  shiftFilter === f.key
                    ? 'bg-lafa-accent text-white'
                    : 'text-lafa-text-secondary hover:text-lafa-text-primary'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lafa-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Nombre completo</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">DiDi ID</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Centro</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Turno default</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Fecha ingreso</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((driver, i) => (
                <tr
                  key={driver.id}
                  onClick={() => { setSelectedDriver(driver); setPanelTab('datos'); setEditMode(false); }}
                  className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                  }`}
                >
                  <td className="px-4 py-3 text-lafa-text-primary font-medium">{driver.fullName}</td>
                  <td className="px-4 py-3 text-lafa-text-secondary font-mono">{driver.didiDriverId}</td>
                  <td className="px-4 py-3 text-lafa-text-secondary">{getCenterName(driver.centerId)}</td>
                  <td className="px-4 py-3"><StatusBadge status={driver.defaultShift} /></td>
                  <td className="px-4 py-3 text-lafa-text-secondary">{driver.startDate}</td>
                  <td className="px-4 py-3"><StatusBadge status={driver.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
          <span className="text-xs text-lafa-text-secondary">
            {filtered.length} de {centeredDrivers.length} conductores
          </span>
          {(statusFilter !== 'todos' || shiftFilter !== 'todos' || search) && (
            <button
              onClick={() => { setSearch(''); setStatusFilter('todos'); setShiftFilter('todos'); }}
              className="text-xs text-lafa-accent hover:underline"
            >
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <SlidePanel
        open={!!selectedDriver}
        onClose={() => { setSelectedDriver(null); setEditMode(false); }}
        title={selectedDriver?.fullName ?? ''}
      >
        {selectedDriver && (
          <div>
            <div className="flex gap-1 border-b border-lafa-border mb-5">
              {panelTabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => { setPanelTab(t.key); setEditMode(false); }}
                  className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                    panelTab === t.key ? 'text-lafa-accent' : 'text-lafa-text-secondary hover:text-lafa-text-primary'
                  }`}
                >
                  {t.label}
                  {panelTab === t.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />}
                </button>
              ))}
            </div>

            {panelTab === 'datos' && !editMode && (
              <>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-lafa-text-secondary">Nombre completo</p>
                    <p className="text-sm font-medium text-lafa-text-primary">{selectedDriver.fullName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-lafa-text-secondary">DiDi ID</p>
                    <p className="text-sm font-medium text-lafa-text-primary font-mono">{selectedDriver.didiDriverId}</p>
                  </div>
                  <div>
                    <p className="text-xs text-lafa-text-secondary">Centro</p>
                    <p className="text-sm font-medium text-lafa-text-primary">{getCenterName(selectedDriver.centerId)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-lafa-text-secondary">Turno default</p>
                    <StatusBadge status={selectedDriver.defaultShift} />
                  </div>
                  <div>
                    <p className="text-xs text-lafa-text-secondary">Fecha ingreso</p>
                    <p className="text-sm font-medium text-lafa-text-primary">{selectedDriver.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-lafa-text-secondary">Status</p>
                    <StatusBadge status={selectedDriver.status} />
                  </div>
                </div>
                {isAdmin && selectedDriver.status === 'activo' && (
                  <div className="flex gap-3">
                    <button
                      onClick={openEdit}
                      className="px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={handleDeactivate}
                      className="px-4 py-2 text-sm font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                    >
                      Desactivar
                    </button>
                  </div>
                )}
                {!isAdmin && (
                  <p className="text-xs text-lafa-text-secondary italic">Solo lectura. Contacta a un administrador para hacer cambios.</p>
                )}
              </>
            )}

            {panelTab === 'datos' && editMode && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Nombre completo</label>
                  <input
                    value={form.fullName}
                    onChange={e => setForm({ ...form, fullName: e.target.value })}
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Centro</label>
                  <select
                    value={form.centerId}
                    onChange={e => setForm({ ...form, centerId: e.target.value })}
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  >
                    {MOCK_CENTERS.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Turno default</label>
                  <select
                    value={form.defaultShift}
                    onChange={e => setForm({ ...form, defaultShift: e.target.value })}
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  >
                    <option value="diurno">Diurno</option>
                    <option value="nocturno">Nocturno</option>
                  </select>
                </div>
                {formError && <p className="text-sm text-[#EF4444]">{formError}</p>}
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {panelTab === 'nomina' && (
              <>
                {driverPayrollHistory.length === 0 ? (
                  <EmptyState icon={Users} title="Sin historial de n\u00f3mina" description="A\u00fan no hay registros de n\u00f3mina cerrados para este conductor." />
                ) : (
                  <div className="bg-lafa-bg rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-lafa-border">
                          <th className="text-left px-3 py-2 text-xs font-medium text-lafa-text-secondary">Semana</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">Horas</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">Facturaci\u00f3n</th>
                          <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">Pago</th>
                          <th className="text-center px-3 py-2 text-xs font-medium text-lafa-text-secondary">Meta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {driverPayrollHistory.map(row => (
                          <tr key={row.id} className="border-b border-lafa-border/50">
                            <td className="px-3 py-2 text-lafa-text-primary text-xs">{row.weekLabel ?? '—'}</td>
                            <td className="px-3 py-2 text-right text-lafa-text-secondary">{row.hoursWorked}h</td>
                            <td className="px-3 py-2 text-right text-lafa-text-secondary">{formatMXN(row.totalBilled)}</td>
                            <td className="px-3 py-2 text-right font-medium text-lafa-text-primary">{formatMXN(row.totalPay)}</td>
                            <td className="px-3 py-2 text-center">
                              {row.goalMet ? (
                                <span className="text-[#22C55E] text-xs">{'S\u00ed'}</span>
                              ) : (
                                <span className="text-[#EF4444] text-xs">No</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {panelTab === 'turnos' && (
              <>
                {driverShiftHistory.length === 0 ? (
                  <EmptyState icon={Clock} title="Sin historial de turnos" description="A\u00fan no hay turnos completados para este conductor." />
                ) : (
                  <div className="space-y-2">
                    {driverShiftHistory.map(shift => (
                      <div key={shift.id} className="bg-lafa-bg rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-lafa-text-primary">
                            {new Date(shift.checkIn).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                          </span>
                          {shift.hoursWorked !== undefined && (
                            <span className="text-xs font-medium text-[#22C55E]">{shift.hoursWorked}h</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
                          <span>{shift.plate} {'\u00b7'} {shift.model}</span>
                          <span>
                            {formatTime(shift.checkIn)}
                            {shift.checkOut ? ` \u2192 ${formatTime(shift.checkOut)}` : ''}
                          </span>
                        </div>
                      </div>
                    ))}
                    <p className="text-xs text-lafa-text-secondary text-center pt-2">
                      {'Mostrando los \u00faltimos '}{driverShiftHistory.length}{' turnos'}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </SlidePanel>

      {showCreateModal && (
        <DriverCreateModal
          defaultCenterId={effectiveCenterId ?? MOCK_CENTERS[0]?.id ?? ''}
          drivers={drivers}
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateDriver}
        />
      )}
    </div>
  );
}
