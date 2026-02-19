import { useState, useMemo } from 'react';
import { Search, Plus, Car, Zap, Wrench, AlertTriangle } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import type { Vehicle } from '@/types';
import { useCenterFilter } from '@/components/hooks/useCenterFilter';
import { MOCK_CENTERS } from '@/data/mock-data';
import { useToast } from '@/app/providers/ToastProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { actionVehicleStatus, actionAddVehicle, actionUpdateVehicle } from '@/lib/actions';
import { validateVehicleForm, type VehicleFormData } from '@/lib/validators';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import StatusBadge from '@/components/ui/StatusBadge';
import SlidePanel from '@/components/ui/SlidePanel';
import { getCenterName } from '@/lib/format';
import { STATUS_LABELS } from '@/lib/statusMap';
import VehicleTable from './components/VehicleTable';
import VehicleCreateModal from './components/VehicleCreateModal';

const ALL_STATUSES = ['disponible', 'en_turno', 'cargando', 'mantenimiento', 'fuera_de_servicio'];
const SUPERVISOR_STATUSES = ['disponible', 'cargando', 'mantenimiento'];

const emptyEditForm: VehicleFormData = { plate: '', model: '', oem: '', centerId: '' };

export default function VehiclesPage() {
  const { vehicles, shifts } = useAppState();
  const dispatch = useAppDispatch();
  const { isAdmin, effectiveCenterId, filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<VehicleFormData>(emptyEditForm);
  const [editError, setEditError] = useState('');

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
    const statuses = (isAdmin ? ALL_STATUSES : SUPERVISOR_STATUSES).filter(s => s !== 'en_turno');
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
        description: `¿Seguro que deseas marcar ${vehicle.plate} como "${label}"? No estará disponible para turnos.`,
        confirmLabel: 'Confirmar',
        variant: 'danger',
      });
      if (!ok) return;
    }
    await actionVehicleStatus(vehicle.id, newStatus, vehicle.plate, STATUS_LABELS[newStatus] ?? newStatus, dispatch, showToast);
  }

  function handleCreateVehicle(vehicle: Vehicle) {
    actionAddVehicle(vehicle, dispatch, showToast);
  }

  function openVehicleEdit() {
    if (!selectedVehicle) return;
    setEditForm({ plate: selectedVehicle.plate, model: selectedVehicle.model, oem: selectedVehicle.oem, centerId: selectedVehicle.centerId });
    setEditError('');
    setEditMode(true);
  }

  function handleSaveVehicleEdit() {
    if (!selectedVehicle) return;
    const existingPlates = vehicles.map(v => v.plate);
    const error = validateVehicleForm(editForm, existingPlates, selectedVehicle.plate);
    if (error) {
      setEditError(error);
      return;
    }
    const updated: Vehicle = {
      ...selectedVehicle,
      plate: editForm.plate.trim().toUpperCase(),
      model: editForm.model.trim(),
      oem: editForm.oem.trim(),
      centerId: editForm.centerId,
    };
    actionUpdateVehicle(updated, dispatch, showToast);
    setSelectedVehicle(updated);
    setEditMode(false);
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
        <h1 className="text-2xl font-bold text-lafa-text-primary">{'Vehículos'}</h1>
        <div className="flex items-center gap-3">
          <CenterFilterDropdown />
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
            >
              <Plus size={16} /> {'Nuevo vehículo'}
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

      <VehicleTable
        vehicles={filtered}
        totalCount={centeredVehicles.length}
        onSelect={setSelectedVehicle}
      />

      <SlidePanel
        open={!!selectedVehicle}
        onClose={() => { setSelectedVehicle(null); setEditMode(false); }}
        title={selectedVehicle ? `${selectedVehicle.plate} — ${selectedVehicle.model}` : ''}
      >
        {selectedVehicle && !editMode && (
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

            {isAdmin && (
              <div className="mb-6">
                <button
                  onClick={openVehicleEdit}
                  className="px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors"
                >
                  Editar datos
                </button>
              </div>
            )}

            <div>
              <h4 className="text-sm font-medium text-lafa-text-primary mb-3">Turnos recientes</h4>
              {vehicleShifts.length === 0 ? (
                <p className="text-xs text-lafa-text-secondary">{'Sin turnos registrados para este vehículo.'}</p>
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
        {selectedVehicle && editMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Placa</label>
              <input
                value={editForm.plate}
                onChange={e => setEditForm({ ...editForm, plate: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Modelo</label>
              <input
                value={editForm.model}
                onChange={e => setEditForm({ ...editForm, model: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">OEM</label>
              <input
                value={editForm.oem}
                onChange={e => setEditForm({ ...editForm, oem: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Centro</label>
              <select
                value={editForm.centerId}
                onChange={e => setEditForm({ ...editForm, centerId: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              >
                {MOCK_CENTERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            {editError && <p className="text-sm text-[#EF4444]">{editError}</p>}
            <div className="flex gap-3">
              <button
                onClick={handleSaveVehicleEdit}
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
      </SlidePanel>

      <VehicleCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        existingPlates={vehicles.map(v => v.plate)}
        defaultCenterId={effectiveCenterId ?? MOCK_CENTERS[0]?.id ?? ''}
        onCreate={handleCreateVehicle}
      />
    </div>
  );
}
