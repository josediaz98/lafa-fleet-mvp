import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Car,
  AlertTriangle,
  DollarSign,
  Users,
  ArrowRight,
} from 'lucide-react';
import { useAppState } from '@/app/providers/AppProvider';
import { useCenterFilter } from '@/lib/use-center-filter';
import { formatMXN } from '@/lib/format';
import { getWeekBounds } from '@/lib/date-utils';
import { REFRESH_INTERVAL, SHIFT_WINDOW_MS } from '@/lib/config';
import { useShiftCheckOut } from '@/lib/use-shift-checkout';
import CenterFilterDropdown from '@/components/ui/CenterFilterDropdown';
import { ShiftCard } from '@/features/shifts';
import EmptyState from '@/components/ui/EmptyState';

export default function DashboardPage() {
  const { shifts, vehicles, trips, drivers, hydrated } = useAppState();
  const { filterByCenter } = useCenterFilter();
  const { handleCheckOut: handleCloseShift } = useShiftCheckOut();
  const navigate = useNavigate();
  const [, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const filteredShifts = filterByCenter(shifts);
  const filteredVehicles = filterByCenter(vehicles);
  const filteredDrivers = filterByCenter(drivers);

  const enTurno = filteredShifts.filter((s) => s.status === 'en_turno');
  const availableVehicles = filteredVehicles.filter(
    (v) => v.status === 'disponible',
  ).length;
  const totalVehicles = filteredVehicles.length;
  const activeDriversCount = filteredDrivers.filter(
    (d) => d.status === 'activo',
  ).length;
  const driversInShift = enTurno.length;

  const alertShifts = filteredShifts.filter(
    (s) =>
      (s.status === 'en_turno' || s.status === 'pendiente_revision') &&
      Date.now() - new Date(s.checkIn).getTime() > SHIFT_WINDOW_MS,
  );

  const {
    startDate: weekStart,
    endDate: weekEnd,
    label: weekLabel,
  } = getWeekBounds();

  // D-01: Build set of didiDriverIds from center-filtered drivers to filter trips by center
  const filteredDriverIds = useMemo(
    () => new Set(filteredDrivers.map((d) => d.didiDriverId)),
    [filteredDrivers],
  );

  const weekTrips = useMemo(
    () =>
      trips.filter((t) => {
        if (!filteredDriverIds.has(t.didiDriverId)) return false;
        const parts = t.fecha.split('/');
        if (parts.length !== 3) return false;
        const tripDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
        return tripDate >= weekStart && tripDate < weekEnd;
      }),
    [trips, filteredDriverIds, weekStart, weekEnd],
  );
  const weekBilling = weekTrips.reduce((sum, t) => sum + t.costo, 0);

  const kpiCards = [
    {
      label: 'Turnos activos',
      value: String(enTurno.length),
      icon: Clock,
      color: 'text-status-active',
      bg: 'bg-status-active/15',
    },
    {
      label: 'Conductores en turno',
      value: `${driversInShift} / ${activeDriversCount}`,
      icon: Users,
      color: 'text-status-info',
      bg: 'bg-status-info/15',
    },
    {
      label: 'Vehículos disponibles',
      value: `${availableVehicles} / ${totalVehicles}`,
      icon: Car,
      color: 'text-status-success',
      bg: 'bg-status-success/15',
    },
    {
      label: 'Alertas',
      value: String(alertShifts.length),
      icon: AlertTriangle,
      color: 'text-status-danger',
      bg: 'bg-status-danger/15',
    },
    {
      label: 'Facturación semana',
      subtitle: weekLabel,
      value: formatMXN(weekBilling),
      icon: DollarSign,
      color: 'text-status-alert',
      bg: 'bg-status-alert/15',
    },
  ];

  if (!hydrated) {
    return (
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="h-8 w-40 bg-lafa-surface rounded-lg animate-pulse" />
          <div className="h-9 w-48 bg-lafa-surface rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-lafa-surface border border-lafa-border rounded-xl p-5 animate-pulse"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="h-3 w-20 bg-lafa-border/50 rounded" />
                <div className="w-9 h-9 bg-lafa-border/50 rounded-lg" />
              </div>
              <div className="h-8 w-16 bg-lafa-border/50 rounded mt-1" />
            </div>
          ))}
        </div>
        <div>
          <div className="h-3 w-28 bg-lafa-surface rounded mb-4 animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="bg-lafa-surface border border-lafa-border rounded-xl p-4 animate-pulse"
              >
                <div className="h-4 w-32 bg-lafa-border/50 rounded mb-2" />
                <div className="h-3 w-48 bg-lafa-border/50 rounded mb-3" />
                <div className="h-3 w-20 bg-lafa-border/50 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-lafa-text-primary">
          Dashboard
        </h1>
        <CenterFilterDropdown variant="pills" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {kpiCards.map(({ label, subtitle, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-lafa-surface border border-lafa-border rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-lafa-text-secondary">{label}</span>
              <div
                className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}
              >
                <Icon size={18} className={color} />
              </div>
            </div>
            <p className="text-3xl font-bold text-lafa-text-primary">{value}</p>
            {subtitle && (
              <p className="text-[10px] text-lafa-text-secondary/70 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        ))}
      </div>

      <div
        className={`grid grid-cols-1 ${alertShifts.length > 0 ? 'lg:grid-cols-3' : ''} gap-6`}
      >
        <div className={alertShifts.length > 0 ? 'lg:col-span-2' : ''}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-lafa-text-secondary">
              Turnos activos
            </h2>
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
            <EmptyState
              icon={Clock}
              title="Sin turnos activos"
              description="No hay conductores en turno en este momento."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {enTurno.slice(0, 6).map((shift) => (
                <ShiftCard key={shift.id} shift={shift} variant="active" />
              ))}
            </div>
          )}
        </div>

        {alertShifts.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-lafa-text-secondary mb-4">
              Alertas
            </h2>
            <div className="space-y-3">
              {alertShifts.map((shift) => (
                <ShiftCard
                  key={shift.id}
                  shift={shift}
                  variant="alert"
                  onClose={handleCloseShift}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
