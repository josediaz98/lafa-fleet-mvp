import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Car, AlertTriangle, DollarSign, Users, ArrowRight } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useCenterFilter } from '../hooks/useCenterFilter';
import { formatTime, formatMXN } from '../data/mockData';
import { getWeekBounds } from '../lib/dateUtils';
import { REFRESH_INTERVAL, SHIFT_WINDOW_MS } from '../constants';
import { useToast } from '../context/ToastContext';
import { useConfirmDialog } from '../components/ui/ConfirmDialog';
import CenterFilterDropdown from '../components/ui/CenterFilterDropdown';
import ShiftCard from '../components/shifts/ShiftCard';
import EmptyState from '../components/ui/EmptyState';

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

  const { startDate: weekStart, endDate: weekEnd } = getWeekBounds();

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
    const parts = t.fecha.split('/');
    if (parts.length !== 3) return false;
    const tripDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return tripDate >= weekStart && tripDate < weekEnd;
  }), [trips, weekStart, weekEnd]);
  const weekBilling = weekTrips.reduce((sum, t) => sum + t.costo, 0);

  const kpiCards = [
    { label: 'Turnos activos', value: String(enTurno.length), icon: Clock, color: 'text-[#3B82F6]', bg: 'bg-[rgba(59,130,246,0.15)]' },
    { label: 'Conductores en turno', value: `${driversInShift} / ${activeDriversCount}`, icon: Users, color: 'text-[#8B5CF6]', bg: 'bg-[rgba(139,92,246,0.15)]' },
    { label: 'Veh\u00edculos disponibles', value: `${availableVehicles} / ${totalVehicles}`, icon: Car, color: 'text-[#22C55E]', bg: 'bg-[rgba(34,197,94,0.15)]' },
    { label: 'Alertas', value: String(alertShifts.length), icon: AlertTriangle, color: 'text-[#EF4444]', bg: 'bg-[rgba(239,68,68,0.15)]' },
    { label: 'Facturaci\u00f3n semana', value: weekBilling > 0 ? formatMXN(weekBilling) : '$54,330 MXN', icon: DollarSign, color: 'text-[#EAB308]', bg: 'bg-[rgba(234,179,8,0.15)]' },
  ];

  async function handleCloseShift(shiftId: string) {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;

    const hours = Math.round(((Date.now() - new Date(shift.checkIn).getTime()) / 3600000) * 10) / 10;

    if (hours < 1) {
      const ok = await confirm({
        title: 'Turno muy corto',
        description: `Este turno tiene menos de 1 hora (${hours}h). \u00bfSeguro que deseas cerrarlo?`,
        confirmLabel: 'Cerrar turno',
        variant: 'danger',
      });
      if (!ok) return;
    }

    dispatch({
      type: 'CLOSE_SHIFT',
      payload: { shiftId, checkOut: new Date().toISOString(), hoursWorked: hours },
    });
    if (shift.vehicleId) {
      dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: shift.vehicleId, status: 'disponible' } });
    }
    showToast('success', `Turno cerrado: ${shift.driverName} \u2014 ${hours}h`);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-lafa-text-primary">Dashboard</h1>
          <p className="text-sm text-lafa-text-secondary mt-1">Resumen operativo en tiempo real</p>
        </div>
        <CenterFilterDropdown variant="pills" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpiCards.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-lafa-surface border border-lafa-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-lafa-text-secondary">{label}</span>
              <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-xl font-bold text-lafa-text-primary">{value}</p>
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
                className="flex items-center gap-1.5 text-xs font-medium text-lafa-accent hover:text-lafa-accent-hover transition-colors"
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
              <div key={shift.id} className="bg-[rgba(239,68,68,0.08)] border border-[rgba(239,68,68,0.2)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-[#EF4444]" />
                  <span className="text-sm font-semibold text-[#EF4444]">Turno abierto +{Math.floor((Date.now() - new Date(shift.checkIn).getTime()) / 3600000)}h</span>
                </div>
                <p className="text-xs text-lafa-text-secondary mb-3">
                  {shift.driverName} - {shift.plate} {'\u00b7'} Check-in: {formatTime(shift.checkIn)}.
                  <br />Sin check-out registrado.
                </p>
                <button
                  onClick={() => handleCloseShift(shift.id)}
                  className="px-3 py-1.5 text-xs font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                >
                  Cerrar turno
                </button>
              </div>
            ))}
            {alertShifts.length === 0 && (
              <EmptyState icon={AlertTriangle} title="Sin alertas activas" description="Todos los turnos est\u00e1n dentro del rango normal." />
            )}

            {driversNear6K.length > 0 && (
              <div className="mt-4 bg-[rgba(234,179,8,0.08)] border border-[rgba(234,179,8,0.2)] rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <DollarSign size={16} className="text-[#EAB308]" />
                  <span className="text-sm font-semibold text-[#EAB308]">Cerca del umbral $6K</span>
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
