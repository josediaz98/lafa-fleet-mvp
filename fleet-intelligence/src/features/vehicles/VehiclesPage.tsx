import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import type { Vehicle, VehicleStatus } from '@/types';
import { useCenterFilter } from '@/lib/use-center-filter';
import { CENTERS } from '@/data/constants';
import { useToast } from '@/app/providers/ToastProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { actionVehicleStatus, actionAddVehicle, actionUpdateVehicle } from '@/lib/actions';
import { STATUS_LABELS } from '@/lib/status-map';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import SlidePanel from '@/components/ui/SlidePanel';
import VehicleTable from './components/VehicleTable';
import VehicleCreateModal from './components/VehicleCreateModal';
import VehicleDetailPanel from './components/VehicleDetailPanel';

type StatusFilter = 'todos' | 'disponible' | 'en_turno' | 'cargando' | 'mantenimiento' | 'fuera_de_servicio';

const ALL_STATUSES = ['disponible', 'en_turno', 'cargando', 'mantenimiento', 'fuera_de_servicio'];

const statusFilters: { key: StatusFilter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'disponible', label: 'Disponible' },
  { key: 'en_turno', label: 'En turno' },
  { key: 'cargando', label: 'Cargando' },
  { key: 'mantenimiento', label: 'Mant.' },
  { key: 'fuera_de_servicio', label: 'Fuera' },
];

export default function VehiclesPage() {
  const { vehicles, shifts } = useAppState();
  const dispatch = useAppDispatch();
  const { isAdmin, effectiveCenterId, filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const centeredVehicles = filterByCenter(vehicles);

  const statusSummary = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of ALL_STATUSES) counts[s] = 0;
    for (const v of centeredVehicles) {
      if (counts[v.status] !== undefined) counts[v.status]++;
    }
    return counts;
  }, [centeredVehicles]);

  const filtered = useMemo(() => {
    let result = centeredVehicles;
    if (statusFilter !== 'todos') {
      result = result.filter(v => v.status === statusFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(v =>
        v.plate.toLowerCase().includes(q) ||
        v.model.toLowerCase().includes(q) ||
        v.oem.toLowerCase().includes(q)
      );
    }
    return result;
  }, [centeredVehicles, statusFilter, search]);

  const hasActiveFilters = statusFilter !== 'todos' || search !== '';

  function clearFilters() {
    setSearch('');
    setStatusFilter('todos');
  }

  async function handleStatusChange(vehicle: Vehicle, newStatus: VehicleStatus) {
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
    await actionVehicleStatus(vehicle.id, newStatus, vehicle.status, vehicle.plate, STATUS_LABELS[newStatus] ?? newStatus, dispatch, showToast);
    setSelectedVehicle({ ...vehicle, status: newStatus as VehicleStatus });
  }

  function handleCreateVehicle(vehicle: Vehicle) {
    actionAddVehicle(vehicle, dispatch, showToast);
  }

  function handleEditVehicle(updated: Vehicle) {
    if (!selectedVehicle) return;
    actionUpdateVehicle(updated, selectedVehicle, dispatch, showToast);
    setSelectedVehicle(updated);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-lafa-text-primary">Vehículos</h1>
          <p className="text-sm text-lafa-text-secondary mt-0.5">Gestión y estado de la flota</p>
        </div>
        <div className="flex items-center gap-3">
          <CenterFilterDropdown />
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
            >
              <Plus size={16} /> Nuevo vehículo
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lafa-text-secondary" />
          <input
            type="text"
            placeholder="Buscar por placa, modelo u OEM..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div className="flex items-center gap-1 bg-lafa-surface border border-lafa-border rounded p-0.5 flex-wrap">
          {statusFilters.map(f => (
            <button
              key={f.key}
              onClick={() => setStatusFilter(f.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
                statusFilter === f.key
                  ? 'bg-lafa-accent text-white'
                  : 'text-lafa-text-secondary hover:text-lafa-text-primary'
              }`}
            >
              {f.label}{f.key !== 'todos' && statusSummary[f.key] > 0 ? ` (${statusSummary[f.key]})` : ''}
            </button>
          ))}
        </div>
      </div>

      <VehicleTable
        vehicles={filtered}
        totalCount={centeredVehicles.length}
        onSelect={setSelectedVehicle}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <SlidePanel
        open={!!selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        title={selectedVehicle ? `${selectedVehicle.plate} — ${selectedVehicle.model}` : ''}
      >
        {selectedVehicle && (
          <VehicleDetailPanel
            vehicle={selectedVehicle}
            shifts={shifts}
            isAdmin={isAdmin}
            existingPlates={vehicles.map(v => v.plate)}
            onStatusChange={handleStatusChange}
            onEdit={handleEditVehicle}
          />
        )}
      </SlidePanel>

      <VehicleCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        existingPlates={vehicles.map(v => v.plate)}
        defaultCenterId={effectiveCenterId ?? CENTERS[0]?.id ?? ''}
        onCreate={handleCreateVehicle}
      />
    </div>
  );
}
