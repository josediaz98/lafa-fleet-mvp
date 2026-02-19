import { useState, useEffect, useMemo, useRef } from 'react';
import { Clock, AlertTriangle, Search, Plus } from 'lucide-react';
import { useAppState } from '@/app/providers/AppProvider';
import { useCenterFilter } from '@/lib/use-center-filter';
import { CENTERS } from '@/data/constants';
import { REFRESH_INTERVAL, SHIFT_WINDOW_MS } from '@/lib/config';
import { useActionContext } from '@/lib/action-context';
import { useShiftCheckOut } from '@/lib/use-shift-checkout';
import type { Shift } from '@/types';
import { actionCheckIn } from '@/lib/actions';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import EmptyState from '@/components/ui/EmptyState';
import ShiftCheckInModal from './components/ShiftCheckInModal';
import ShiftRow from './components/ShiftRow';
import ShiftTable from './components/ShiftTable';

type ShiftTab = 'activos' | 'completados' | 'pendientes';

export default function ShiftsPage() {
  const { shifts, drivers, vehicles } = useAppState();
  const ctx = useActionContext();
  const { filterByCenter } = useCenterFilter();
  const { handleCheckOut, closingShiftId } = useShiftCheckOut();
  const [tab, setTab] = useState<ShiftTab>('activos');
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [, setTick] = useState(0);
  const nowRef = useRef(Date.now()); // eslint-disable-line react-hooks/purity -- intentional impure initial value

  useEffect(() => {
    const id = setInterval(() => {
      nowRef.current = Date.now();
      setTick((t) => t + 1);
    }, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const filteredShifts = filterByCenter(shifts);

  const searchFiltered = useMemo(() => {
    if (!search) return filteredShifts;
    const q = search.toLowerCase();
    return filteredShifts.filter(
      (s) =>
        s.driverName.toLowerCase().includes(q) ||
        s.plate.toLowerCase().includes(q),
    );
  }, [filteredShifts, search]);

  const activeShifts = useMemo(() => {
    const active = searchFiltered.filter((s) => s.status === 'en_turno');
    return [...active].sort((a, b) => {
      const aOver =
        nowRef.current - new Date(a.checkIn).getTime() > SHIFT_WINDOW_MS;
      const bOver =
        nowRef.current - new Date(b.checkIn).getTime() > SHIFT_WINDOW_MS;
      if (aOver && !bOver) return -1;
      if (!aOver && bOver) return 1;
      return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
    });
  }, [searchFiltered]);

  const completedShifts = useMemo(() => {
    const today = new Date().toDateString();
    return searchFiltered.filter(
      (s) =>
        s.status === 'completado' &&
        new Date(s.checkIn).toDateString() === today,
    );
  }, [searchFiltered]);

  const pendingShifts = searchFiltered.filter(
    (s) =>
      (s.status === 'en_turno' || s.status === 'pendiente_revision') &&
      nowRef.current - new Date(s.checkIn).getTime() > SHIFT_WINDOW_MS,
  );

  const driversInShift = useMemo(
    () =>
      new Set(
        shifts.filter((s) => s.status === 'en_turno').map((s) => s.driverId),
      ),
    [shifts],
  );
  const vehiclesInShift = useMemo(
    () =>
      new Set(
        shifts.filter((s) => s.status === 'en_turno').map((s) => s.vehicleId),
      ),
    [shifts],
  );

  const availableDrivers = filterByCenter(drivers).filter(
    (d) => d.status === 'activo' && !driversInShift.has(d.id),
  );
  const availableVehicles = filterByCenter(vehicles).filter(
    (v) => v.status === 'disponible' && !vehiclesInShift.has(v.id),
  );

  const tabs: { key: ShiftTab; label: string; count: number }[] = [
    { key: 'activos', label: 'Activos', count: activeShifts.length },
    {
      key: 'completados',
      label: 'Completados hoy',
      count: completedShifts.length,
    },
    {
      key: 'pendientes',
      label: 'Pendientes de revisión',
      count: pendingShifts.length,
    },
  ];

  async function handleCheckIn(driverId: string, vehicleId: string) {
    const driver = drivers.find((d) => d.id === driverId);
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (!driver || !vehicle) return;

    const center = CENTERS.find((c) => c.id === driver.centerId);
    const newShift: Shift = {
      id: crypto.randomUUID(),
      driverId: driver.id,
      driverName: driver.fullName,
      vehicleId: vehicle.id,
      plate: vehicle.plate,
      model: vehicle.model,
      center: center?.name ?? '',
      centerId: driver.centerId,
      checkIn: new Date().toISOString(),
      status: 'en_turno',
    };

    await actionCheckIn(newShift, vehicle.id, ctx);
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-lafa-text-primary">
            Gestión de Turnos
          </h1>
          <p className="text-sm text-lafa-text-secondary mt-0.5">
            Registro y control de turnos activos
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CenterFilterDropdown />
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
          >
            <Plus size={16} /> Nuevo check-in
          </button>
        </div>
      </div>

      {/* Search + Tab Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative max-w-sm flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-lafa-text-secondary"
          />
          <input
            placeholder="Buscar por conductor o placa..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div className="flex items-center gap-1 bg-lafa-surface border border-lafa-border rounded p-0.5 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors duration-150 ${
                tab === t.key
                  ? 'bg-lafa-accent text-white'
                  : 'text-lafa-text-secondary hover:text-lafa-text-primary'
              }`}
            >
              {t.label} ({t.count})
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === 'activos' &&
        (activeShifts.length > 0 ? (
          <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 flex items-center gap-x-4 border-b border-lafa-border">
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider min-w-[120px] flex-[2]">
                Conductor
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider flex-1 hidden sm:block">
                Centro
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider flex-[1.5] hidden md:block">
                Vehículo
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider shrink-0 hidden sm:block">
                Check-in
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider shrink-0">
                Tiempo
              </span>
              <span className="w-[70px] shrink-0"></span>
            </div>
            <div className="divide-y divide-lafa-border/50">
              {activeShifts.map((shift) => (
                <ShiftRow
                  key={shift.id}
                  shift={shift}
                  variant="active"
                  now={nowRef.current}
                  onClose={handleCheckOut}
                  disabled={closingShiftId === shift.id}
                />
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
              <span className="text-xs text-lafa-text-secondary">
                {activeShifts.length} turno
                {activeShifts.length !== 1 ? 's' : ''} activo
                {activeShifts.length !== 1 ? 's' : ''}
              </span>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-xs text-lafa-accent hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={Clock}
            title="Sin turnos activos"
            description="Registra un check-in para iniciar un turno."
          />
        ))}

      {tab === 'completados' &&
        (completedShifts.length > 0 ? (
          <ShiftTable
            shifts={completedShifts}
            hasActiveFilters={!!search}
            onClearFilters={() => setSearch('')}
          />
        ) : (
          <EmptyState icon={Clock} title="Sin turnos completados hoy" />
        ))}

      {tab === 'pendientes' &&
        (pendingShifts.length > 0 ? (
          <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
            <div className="px-4 py-2.5 flex items-center gap-x-4 border-b border-lafa-border">
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider min-w-[120px] flex-[2]">
                Conductor
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider flex-1 hidden sm:block">
                Centro
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider flex-[1.5] hidden md:block">
                Vehículo
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider shrink-0 hidden sm:block">
                Check-in
              </span>
              <span className="text-xs font-medium text-lafa-text-secondary uppercase tracking-wider shrink-0">
                Tiempo
              </span>
              <span className="w-[70px] shrink-0"></span>
            </div>
            <div className="divide-y divide-lafa-border/50">
              {pendingShifts.map((shift) => (
                <ShiftRow
                  key={shift.id}
                  shift={shift}
                  variant="alert"
                  now={nowRef.current}
                  onClose={handleCheckOut}
                  disabled={closingShiftId === shift.id}
                />
              ))}
            </div>
            <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
              <span className="text-xs text-lafa-text-secondary">
                {pendingShifts.length} turno
                {pendingShifts.length !== 1 ? 's' : ''} pendiente
                {pendingShifts.length !== 1 ? 's' : ''}
              </span>
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="text-xs text-lafa-accent hover:underline"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        ) : (
          <EmptyState
            icon={AlertTriangle}
            title="Sin turnos pendientes de revisión"
            description="Todos los turnos están al día."
          />
        ))}

      {/* Check-in modal */}
      <ShiftCheckInModal
        open={showModal}
        onClose={() => setShowModal(false)}
        drivers={availableDrivers}
        vehicles={availableVehicles}
        shifts={shifts}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
}
