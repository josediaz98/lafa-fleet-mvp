import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Car, AlertTriangle, DollarSign, Users, ArrowRight } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { useCenterFilter } from '@/lib/use-center-filter';
import { formatTime } from '@/lib/date-utils';
import { formatMXN } from '@/lib/format';
import { getWeekBounds, shiftHours } from '@/lib/date-utils';
import { REFRESH_INTERVAL, SHIFT_WINDOW_MS } from '@/lib/constants';
import { useToast } from '@/app/providers/ToastProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { actionCheckOut } from '@/lib/actions';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import ShiftCard from '@/features/shifts/components/ShiftCard';
import EmptyState from '@/components/ui/EmptyState';

export default function DashboardPage() {
  const { shifts, vehicles, trips, drivers } = useAppState();
  const dispatch = useAppDispatch();
  const { filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const filteredShifts = filterByCenter(shifts);
  const filteredVehicles = filterByCenter(vehicles);
  const filteredDrivers = filterByCenter(drivers);

  const enTurno = filteredShifts.filter(s => s.status === 'en_turno');
  const availableVehicles = filteredVehicles.filter(v => v.status === 'disponible').length;
  const totalVehicles = filteredVehicles.length;
  const activeDriversCount = filteredDrivers.filter(d => d.status === 'activo').length;
  const driversInShift = enTurno.length;

  const alertShifts = filteredShifts.filter(s =>
    (s.status === 'en_turno' || s.status === 'pendiente_revision') &&
    (Date.now() - new Date(s.checkIn).getTime()) > SHIFT_WINDOW_MS
  );

  const { startDate: weekStart, endDate: weekEnd, label: weekLabel } = getWeekBounds();

  // D-01: Build set of didiDriverIds from center-filtered drivers to filter trips by center
  const filteredDriverIds = useMemo(
    () => new Set(filteredDrivers.map(d => d.didiDriverId)),
    [filteredDrivers]
  );

  const driversNear6K = useMemo(() => {
    return filteredDrivers
      .filter(d => d.status === 'activo')
      .map(driver => {
        const billing = trips
          .filter(t => {
            if (t.driverId !== driver.didiDriverId) return false;
            const parts = t.fecha.split('/');
            if (parts.length !== 3) return false;
            const tripDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
            return tripDate >= weekStart && tripDate < weekEnd;
          })
          .reduce((sum, t) => sum + t.costo, 0);
        return { name: driver.fullName, billing };
      })
      .filter(d => d.billing >= 4500 && d.billing < 6000);
  }, [filteredDrivers, trips, weekStart, weekEnd]);

  const weekTrips = useMemo(() => trips.filter(t => {
    if (!filteredDriverIds.has(t.driverId)) return false;
    const parts = t.fecha.split('/');
    if (parts.length !== 3) return false;
    const tripDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return tripDate >= weekStart && tripDate < weekEnd;
  }), [trips, filteredDriverIds, weekStart, weekEnd]);
  const weekBilling = weekTrips.reduce((sum, t) => sum + t.costo, 0);

  const kpiCards = [
    { label: 'Turnos activos', value: String(enTurno.length), icon: Clock, color: 'text-status-active', bg: 'bg-status-active/15' },
    { label: 'Conductores en turno', value: `${driversInShift} / ${activeDriversCount}`, icon: Users, color: 'text-status-info', bg: 'bg-status-info/15' },
    { label: 'Vehículos disponibles', value: `${availableVehicles} / ${totalVehicles}`, icon: Car, color: 'text-status-success', bg: 'bg-status-success/15' },
    { label: 'Alertas', value: String(alertShifts.length), icon: AlertTriangle, color: 'text-status-danger', bg: 'bg-status-danger/15' },
    { label: 'Facturación semana', subtitle: weekLabel, value: formatMXN(weekBilling), icon: DollarSign, color: 'text-status-alert', bg: 'bg-status-alert/15' },
  ];

  async function handleCloseShift(shiftId: string) {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;

    const hours = shiftHours(shift.checkIn);

    if (hours < 1) {
      const ok = await confirm({
        title: 'Turno muy corto',
        description: `Este turno tiene menos de 1 hora (${hours}h). ¿Seguro que deseas cerrarlo?`,
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-lafa-text-primary">Dashboard</h1>
          <p className="text-sm text-lafa-text-secondary mt-1">Resumen operativo en tiempo real</p>
        </div>
        <CenterFilterDropdown variant="pills" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpiCards.map(({ label, subtitle, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-lafa-surface border border-lafa-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-lafa-text-secondary">{label}</span>
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-lafa-text-primary">{value}</p>
            {subtitle && <p className="text-[10px] text-lafa-text-secondary/70 mt-0.5">{subtitle}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-lafa-text-primary">Turnos activos</h2>
            {enTurno.length > 6 && (
              <button
                onClick={() => navigate('/shifts')}
                className="flex items-center gap-1.5 text-xs font-medium text-lafa-accent hover:text-lafa-accent-hover transition-colors duration-150"
              >
                Ver todos ({enTurno.length}) <ArrowRight size={14} />
              </button>
            )}
          </div>
          {enTurno.length === 0 ? (
            <EmptyState icon={Clock} title="Sin turnos activos" description="No hay conductores en turno en este momento." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enTurno.slice(0, 6).map(shift => (
                <ShiftCard key={shift.id} shift={shift} variant="active" />
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-lafa-text-primary mb-4">Alertas</h2>
          <div className="space-y-3">
            {alertShifts.map(shift => (
              <div key={shift.id} className="bg-status-danger/[0.08] border border-status-danger/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-status-danger" />
                  <span className="text-sm font-semibold text-status-danger">Turno abierto +{Math.floor(shiftHours(shift.checkIn))}h</span>
                </div>
                <p className="text-xs text-lafa-text-secondary mb-3">
                  {shift.driverName} - {shift.plate} {'·'} Check-in: {formatTime(shift.checkIn)}.
                  <br />Sin check-out registrado.
                </p>
                <button
                  onClick={() => handleCloseShift(shift.id)}
                  className="px-3 py-1.5 text-xs font-medium text-status-danger border border-status-danger/30 rounded hover:bg-status-danger/10 transition-colors duration-150"
                >
                  Cerrar turno
                </button>
              </div>
            ))}
            {alertShifts.length === 0 && (
              <EmptyState icon={AlertTriangle} title="Sin alertas activas" description="Todos los turnos están dentro del rango normal." />
            )}

            {driversNear6K.length > 0 && (
              <div className="mt-4 bg-status-alert/[0.08] border border-status-alert/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={16} className="text-status-alert" />
                  <span className="text-sm font-semibold text-status-alert">Cerca del umbral $6K</span>
                </div>
                <div className="space-y-2">
                  {driversNear6K.map(d => (
                    <div key={d.name} className="flex items-center justify-between text-xs">
                      <span className="text-lafa-text-primary font-medium">{d.name}</span>
                      <span className="text-lafa-text-secondary">
                        {formatMXN(d.billing)} — faltan {formatMXN(6000 - d.billing)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
