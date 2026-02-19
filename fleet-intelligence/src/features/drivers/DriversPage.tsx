import { useState, useMemo } from 'react';
import { Search, Plus } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import type { Driver } from '@/types';
import { useCenterFilter } from '@/lib/use-center-filter';
import { MOCK_CENTERS } from '@/data/mock-data';
import { getCenterName } from '@/lib/format';
import { useToast } from '@/app/providers/ToastProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { actionAddDriver, actionUpdateDriver, actionDeactivateDriver } from '@/lib/actions';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import StatusBadge from '@/components/ui/StatusBadge';
import SlidePanel from '@/components/ui/SlidePanel';
import DriverCreateModal from './components/DriverCreateModal';
import DriverDetailPanel from './components/DriverDetailPanel';

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
  const [showCreateModal, setShowCreateModal] = useState(false);

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

  const driverActiveShift = useMemo(() => {
    if (!selectedDriver) return null;
    return shifts.find(s => s.driverId === selectedDriver.id && s.status === 'en_turno') ?? null;
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
    actionAddDriver(newDriver, dispatch, showToast);
    setShowCreateModal(false);
  }

  function handleEdit(updated: Driver) {
    actionUpdateDriver(updated, dispatch, showToast);
    setSelectedDriver(updated);
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
      description: `Se desactivará a ${selectedDriver.fullName}. No podrá ser asignado a nuevos turnos.`,
      confirmLabel: 'Desactivar',
      variant: 'danger',
    });
    if (!ok) return;
    actionDeactivateDriver(selectedDriver.id, selectedDriver.fullName, dispatch, showToast);
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-lafa-text-primary">Conductores</h1>
          <p className="text-sm text-lafa-text-secondary mt-0.5">Gestión y asignación de conductores</p>
        </div>
        <div className="flex items-center gap-3">
          <CenterFilterDropdown />
          {isAdmin && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
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
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
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
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
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
                  onClick={() => setSelectedDriver(driver)}
                  className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors duration-150 ${
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
        onClose={() => setSelectedDriver(null)}
        title={selectedDriver?.fullName ?? ''}
      >
        {selectedDriver && (
          <DriverDetailPanel
            driver={selectedDriver}
            payrollHistory={driverPayrollHistory}
            shiftHistory={driverShiftHistory}
            activeShift={driverActiveShift}
            isAdmin={isAdmin}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
          />
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
