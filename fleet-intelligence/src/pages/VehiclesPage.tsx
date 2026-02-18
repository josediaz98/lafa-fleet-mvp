import { useState, useMemo } from 'react';
import { Search, Plus, Car, Zap, Wrench, AlertTriangle } from 'lucide-react';
import { useAppState, useAppDispatch, type Vehicle } from '../context/AppContext';
import { useCenterFilter } from '../hooks/useCenterFilter';
import { MOCK_CENTERS } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useConfirmDialog } from '../components/ui/ConfirmDialog';
import CenterFilterDropdown from '../components/ui/CenterFilterDropdown';
import StatusBadge from '../components/ui/StatusBadge';
import SlidePanel from '../components/ui/SlidePanel';
import { getCenterName } from '../lib/dataUtils';
import { STATUS_LABELS } from '../lib/statusMap';

const ALL_STATUSES = ['disponible', 'en_turno', 'cargando', 'mantenimiento', 'fuera_de_servicio'];
const SUPERVISOR_STATUSES = ['disponible', 'cargando', 'mantenimiento'];

interface VehicleFormState {
  plate: string;
  model: string;
  oem: string;
  centerId: string;
}

const emptyForm: VehicleFormState = { plate: '', model: '', oem: '', centerId: '' };

export default function VehiclesPage() {
  const { vehicles, shifts } = useAppState();
  const dispatch = useAppDispatch();
  const { isAdmin, effectiveCenterId, filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [form, setForm] = useState<VehicleFormState>(emptyForm);
  const [formError, setFormError] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const centeredVehicles = filterByCenter(vehicles);
  const filtered = centeredVehicles.filter(v =>
    v.plate.toLowerCase().includes(search.toLowerCase()) ||
    v.model.toLowerCase().includes(search.toLowerCase()) ||
    v.oem.toLowerCase().includes(search.toLowerCase())
  );

  const statusSummary = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of ALL_STATUSES) counts[s] = 0;
    for (const v of centeredVehicles) {
      if (counts[v.status] !== undefined) counts[v.status]++;
    }
    return counts;
  }, [centeredVehicles]);

  const vehicleShifts = useMemo(() => {
    if (!selectedVehicle) return [];
    return shifts
      .filter(s => s.vehicleId === selectedVehicle.id)
      .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
      .slice(0, 10);
  }, [selectedVehicle, shifts]);

  function getAvailableStatuses(vehicle: Vehicle) {
    const statuses = isAdmin ? ALL_STATUSES : SUPERVISOR_STATUSES;
    const hasActiveShift = shifts.some(
      s => s.vehicleId === vehicle.id && s.status === 'en_turno'
    );
    if (hasActiveShift) {
      return statuses.filter(s => s !== 'disponible');
    }
    return statuses;
  }

  async function handleStatusChange(vehicle: Vehicle, newStatus: string) {
    if (newStatus === 'mantenimiento' || newStatus === 'fuera_de_servicio') {
      const label = STATUS_LABELS[newStatus];
      const ok = await confirm({
        title: `Cambiar a ${label}`,
        description: `\u00bfSeguro que deseas marcar ${vehicle.plate} como "${label}"? No estar\u00e1 disponible para turnos.`,
        confirmLabel: 'Confirmar',
        variant: 'danger',
      });
      if (!ok) return;
    }
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: vehicle.id, status: newStatus } });
    showToast('success', `${vehicle.plate} \u2192 ${STATUS_LABELS[newStatus] ?? newStatus}`);
  }

  function openCreate() {
    setForm({ ...emptyForm, centerId: effectiveCenterId ?? MOCK_CENTERS[0]?.id ?? '' });
    setFormError('');
    setShowCreateModal(true);
  }

  function handleCreate() {
    setFormError('');
    if (!form.plate.trim() || !form.model.trim() || !form.oem.trim() || !form.centerId) {
      setFormError('Todos los campos son obligatorios.');
      return;
    }
    const newVehicle: Vehicle = {
      id: `v-${Date.now()}`,
      plate: form.plate.trim().toUpperCase(),
      model: form.model.trim(),
      oem: form.oem.trim(),
      centerId: form.centerId,
      status: 'disponible',
    };
    dispatch({ type: 'ADD_VEHICLE', payload: newVehicle });
    showToast('success', `Veh\u00edculo ${newVehicle.plate} creado.`);
    setShowCreateModal(false);
  }

  const summaryItems = [
    { key: 'disponible', label: 'Disponibles', color: 'text-[#22C55E]', icon: Car },
    { key: 'en_turno', label: 'En turno', color: 'text-[#3B82F6]', icon: Car },
    { key: 'cargando', label: 'Cargando', color: 'text-[#EAB308]', icon: Zap },
    { key: 'mantenimiento', label: 'Mantenimiento', color: 'text-[#F97316]', icon: Wrench },
    { key: 'fuera_de_servicio', label: 'Fuera de servicio', color: 'text-[#EF4444]', icon: AlertTriangle },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-lafa-text-primary">{'Veh\u00edculos'}</h1>
        <div className="flex items-center gap-3">
          <CenterFilterDropdown />
          {isAdmin && (
            <button
              onClick={openCreate}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
            >
              <Plus size={16} /> {'Nuevo veh\u00edculo'}
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
        {summaryItems.map(item => {
          const Icon = item.icon;
          return (
            <div key={item.key} className="bg-lafa-surface border border-lafa-border rounded-xl p-3 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-lafa-bg ${item.color}`}>
                <Icon size={16} />
              </div>
              <div>
                <p className="text-lg font-bold text-lafa-text-primary">{statusSummary[item.key]}</p>
                <p className="text-xs text-lafa-text-secondary">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lafa-text-secondary" />
        <input
          type="text"
          placeholder="Buscar por placa, modelo u OEM..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
        />
      </div>

      <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lafa-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Placa</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Modelo</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">OEM</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Centro</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((vehicle, i) => (
                <tr
                  key={vehicle.id}
                  className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <td className="px-4 py-3 text-lafa-text-primary font-medium font-mono">{vehicle.plate}</td>
                  <td className="px-4 py-3 text-lafa-text-primary">{vehicle.model}</td>
                  <td className="px-4 py-3 text-lafa-text-secondary">{vehicle.oem}</td>
                  <td className="px-4 py-3 text-lafa-text-secondary">{getCenterName(vehicle.centerId)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={vehicle.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-lafa-border">
          <span className="text-xs text-lafa-text-secondary">
            {filtered.length} de {centeredVehicles.length} {'veh\u00edculos'}
          </span>
        </div>
      </div>

      <SlidePanel
        open={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        title={selectedVehicle ? `${selectedVehicle.plate} \u2014 ${selectedVehicle.model}` : ''}
      >
        {selectedVehicle && (
          <div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-lafa-text-secondary">Placa</p>
                <p className="text-sm font-medium text-lafa-text-primary font-mono">{selectedVehicle.plate}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Modelo</p>
                <p className="text-sm font-medium text-lafa-text-primary">{selectedVehicle.model}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">OEM</p>
                <p className="text-sm font-medium text-lafa-text-primary">{selectedVehicle.oem}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Centro</p>
                <p className="text-sm font-medium text-lafa-text-primary">{getCenterName(selectedVehicle.centerId)}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Status actual</p>
                <StatusBadge status={selectedVehicle.status} />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-lafa-text-secondary mb-2">Cambiar status</label>
              <div className="flex flex-wrap gap-2">
                {getAvailableStatuses(selectedVehicle).map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      if (s !== selectedVehicle.status) {
                        handleStatusChange(selectedVehicle, s);
                        setSelectedVehicle({ ...selectedVehicle, status: s });
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                      s === selectedVehicle.status
                        ? 'border-lafa-accent bg-lafa-accent/10 text-lafa-accent'
                        : 'border-lafa-border text-lafa-text-secondary hover:border-lafa-text-secondary'
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-lafa-text-primary mb-3">Turnos recientes</h4>
              {vehicleShifts.length === 0 ? (
                <p className="text-xs text-lafa-text-secondary">{'Sin turnos registrados para este veh\u00edculo.'}</p>
              ) : (
                <div className="space-y-2">
                  {vehicleShifts.map(shift => (
                    <div key={shift.id} className="bg-lafa-bg rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-medium text-lafa-text-primary">{shift.driverName}</span>
                        <p className="text-xs text-lafa-text-secondary">
                          {new Date(shift.checkIn).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={shift.status} />
                        {shift.hoursWorked !== undefined && (
                          <p className="text-xs text-lafa-text-secondary mt-0.5">{shift.hoursWorked}h</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </SlidePanel>

      {showCreateModal && (
        <>
          <div className="fixed inset-0 z-[80] bg-black/50" onClick={() => setShowCreateModal(false)} />
          <div className="fixed inset-0 z-[81] flex items-center justify-center p-4">
            <div className="bg-lafa-surface border border-lafa-border rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-semibold text-lafa-text-primary mb-5">{'Nuevo veh\u00edculo'}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Placa</label>
                  <input
                    value={form.plate}
                    onChange={e => setForm({ ...form, plate: e.target.value })}
                    placeholder="ABC-123"
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Modelo</label>
                  <input
                    value={form.model}
                    onChange={e => setForm({ ...form, model: e.target.value })}
                    placeholder="Geometry C"
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">OEM</label>
                  <input
                    value={form.oem}
                    onChange={e => setForm({ ...form, oem: e.target.value })}
                    placeholder="Geely"
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
                {formError && <p className="text-sm text-[#EF4444]">{formError}</p>}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
                  >
                    {'Crear veh\u00edculo'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
