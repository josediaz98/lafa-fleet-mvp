import { useState, useEffect, useMemo } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { useCenterFilter } from '@/components/hooks/useCenterFilter';
import { shiftHours } from '@/lib/dateUtils';
import { MOCK_CENTERS } from '@/data/mock-data';
import { REFRESH_INTERVAL, SHIFT_WINDOW_MS } from '@/lib/constants';
import { useToast } from '@/app/providers/ToastProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { actionCheckIn, actionCheckOut } from '@/lib/actions';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import EmptyState from '@/components/ui/EmptyState';
import ShiftCard from './ShiftCard';
import ShiftCheckInForm from './ShiftCheckInForm';

type ShiftTab = 'activos' | 'completados' | 'pendientes';

export default function ShiftsPage() {
  const { shifts, drivers, vehicles, session } = useAppState();
  const dispatch = useAppDispatch();
  const { filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();
  const [tab, setTab] = useState<ShiftTab>('activos');
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const filteredShifts = filterByCenter(shifts);

  const activeShifts = useMemo(() => {
    const active = filteredShifts.filter(s => s.status === 'en_turno');
    return [...active].sort((a, b) => {
      const aOver = (Date.now() - new Date(a.checkIn).getTime()) > SHIFT_WINDOW_MS;
      const bOver = (Date.now() - new Date(b.checkIn).getTime()) > SHIFT_WINDOW_MS;
      if (aOver && !bOver) return -1;
      if (!aOver && bOver) return 1;
      return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
    });
  }, [filteredShifts]);
  const completedShifts = filteredShifts.filter(s => s.status === 'completado');
  const pendingShifts = filteredShifts.filter(s =>
    (s.status === 'en_turno' || s.status === 'pendiente_revision') &&
    (Date.now() - new Date(s.checkIn).getTime()) > SHIFT_WINDOW_MS
  );

  const driversInShift = useMemo(() => new Set(
    shifts.filter(s => s.status === 'en_turno').map(s => s.driverId)
  ), [shifts]);
  const vehiclesInShift = useMemo(() => new Set(
    shifts.filter(s => s.status === 'en_turno').map(s => s.vehicleId)
  ), [shifts]);

  const availableDrivers = filterByCenter(drivers).filter(
    d => d.status === 'activo' && !driversInShift.has(d.id)
  );
  const availableVehicles = filterByCenter(vehicles).filter(
    v => v.status === 'disponible' && !vehiclesInShift.has(v.id)
  );

  const tabs: { key: ShiftTab; label: string; count: number }[] = [
    { key: 'activos', label: 'Activos', count: activeShifts.length },
    { key: 'completados', label: 'Completados hoy', count: completedShifts.length },
    { key: 'pendientes', label: 'Pendientes revisi\u00f3n', count: pendingShifts.length },
  ];

  const completedTotalHours = completedShifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0);

  function handleCheckIn(driverId: string, vehicleId: string) {
    const driver = drivers.find(d => d.id === driverId);
    const vehicle = vehicles.find(v => v.id === vehicleId);
    if (!driver || !vehicle) return;

    const center = MOCK_CENTERS.find(c => c.id === driver.centerId);
    const newShift = {
      id: `s-${Date.now()}`,
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

    actionCheckIn(newShift, vehicle.id, session?.userId ?? '', dispatch, showToast);
  }

  async function handleCheckOut(shiftId: string) {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;
    const hours = shiftHours(shift.checkIn);

    if (hours < 1) {
      const ok = await confirm({
        title: 'Turno muy corto',
        description: `Este turno tiene menos de 1 hora (${hours}h). \u00bfSeguro que deseas cerrarlo?`,
        confirmLabel: 'Cerrar turno',
        variant: 'danger',
      });
      if (!ok) return;
    }

    const checkOutTime = new Date().toISOString();
    await actionCheckOut(
      { shiftId, checkOut: checkOutTime, hoursWorked: hours, vehicleId: shift.vehicleId || undefined, driverName: shift.driverName },
      dispatch,
      showToast,
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-lafa-text-primary">Gesti{'o\u0301'}n de Turnos</h1>
        <CenterFilterDropdown />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 lg:max-w-[60%]">
          <div className="flex gap-1 border-b border-lafa-border mb-4">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  tab === t.key
                    ? 'text-lafa-accent'
                    : 'text-lafa-text-secondary hover:text-lafa-text-primary'
                }`}
              >
                {t.label} ({t.count})
                {tab === t.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {tab === 'activos' && activeShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} variant="active" onClose={handleCheckOut} />
            ))}

            {tab === 'completados' && completedShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} variant="completed" />
            ))}

            {tab === 'completados' && completedShifts.length > 0 && (
              <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4 flex items-center justify-between">
                <span className="text-xs font-medium text-lafa-text-secondary">Total horas completadas hoy</span>
                <span className="text-sm font-semibold text-[#22C55E]">{completedTotalHours.toFixed(1)}h</span>
              </div>
            )}

            {tab === 'pendientes' && pendingShifts.map(shift => (
              <ShiftCard key={shift.id} shift={shift} variant="alert" onClose={handleCheckOut} />
            ))}

            {tab === 'activos' && activeShifts.length === 0 && (
              <EmptyState icon={Clock} title="Sin turnos activos" description="Registra un check-in para iniciar un turno." />
            )}
            {tab === 'completados' && completedShifts.length === 0 && (
              <EmptyState icon={Clock} title="Sin turnos completados hoy" />
            )}
            {tab === 'pendientes' && pendingShifts.length === 0 && (
              <EmptyState icon={AlertTriangle} title="Sin turnos pendientes de revisi\u00f3n" description="Todos los turnos est\u00e1n al d\u00eda." />
            )}
          </div>
        </div>

        <div className="lg:w-[38%] shrink-0">
          <ShiftCheckInForm
            drivers={availableDrivers}
            vehicles={availableVehicles}
            shifts={shifts}
            onCheckIn={handleCheckIn}
          />
        </div>
      </div>
    </div>
  );
}
