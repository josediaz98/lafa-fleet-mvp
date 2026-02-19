import { formatTime, getElapsedTime } from '@/lib/date-utils';
import { SHIFT_WINDOW_MS } from '@/lib/config';
import StatusBadge from '@/components/ui/StatusBadge';

interface ShiftCardProps {
  shift: {
    id: string;
    driverName: string;
    plate: string;
    model: string;
    center?: string;
    checkIn: string;
    checkOut?: string;
    status: string;
    hoursWorked?: number;
  };
  variant?: 'active' | 'completed' | 'alert';
  now?: number;
  onClose?: (shiftId: string) => void;
}

export default function ShiftCard({
  shift,
  variant = 'active',
  now = 0,
  onClose,
}: ShiftCardProps) {
  if (variant === 'completed') {
    return (
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-lafa-text-primary">
            {shift.driverName}
          </span>
          <StatusBadge status="completado" />
        </div>
        <p className="text-xs text-lafa-text-secondary mb-1">
          {shift.plate} {'·'} {shift.model} {'·'} {shift.center}
        </p>
        <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
          <span>
            {formatTime(shift.checkIn)}{' '}
            {shift.checkOut ? `→ ${formatTime(shift.checkOut)}` : ''}
          </span>
          {shift.hoursWorked !== undefined && (
            <span className="font-medium text-status-success">
              {shift.hoursWorked}h
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'alert') {
    return (
      <div className="bg-status-danger/5 border border-status-danger/20 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-lafa-text-primary">
            {shift.driverName}
          </span>
          <StatusBadge
            status="alerta"
            label={`Abierto ${getElapsedTime(shift.checkIn)}`}
          />
        </div>
        <p className="text-xs text-lafa-text-secondary mb-3">
          {shift.plate} {'·'} {shift.model} {'·'} {shift.center}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-lafa-text-secondary">
            Sin check-out registrado desde {formatTime(shift.checkIn)}
          </p>
          {onClose && (
            <button
              onClick={() => onClose(shift.id)}
              className="px-3 py-1.5 text-xs font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
            >
              Cerrar turno
            </button>
          )}
        </div>
      </div>
    );
  }

  // Active variant — T-01: red styling for shifts >12h
  const isOvertime =
    now - new Date(shift.checkIn).getTime() > SHIFT_WINDOW_MS;

  return (
    <div
      className={`bg-lafa-surface border ${isOvertime ? 'border-status-danger/40' : 'border-lafa-border'} rounded-xl p-4 hover:border-lafa-accent/30 transition-colors duration-150`}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-semibold text-lafa-text-primary">
            {shift.driverName}
          </span>
          {shift.center && (
            <span className="text-xs text-lafa-text-secondary ml-2">
              {shift.center}
            </span>
          )}
        </div>
        {isOvertime ? (
          <StatusBadge
            status="alerta"
            label={`+${Math.floor((now - new Date(shift.checkIn).getTime()) / 3600000)}h`}
          />
        ) : (
          <StatusBadge status="en_turno" />
        )}
      </div>
      <p className="text-xs text-lafa-text-secondary mb-3">
        {shift.plate} {'·'} {shift.model} {'·'} Check-in:{' '}
        {formatTime(shift.checkIn)}
      </p>
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-medium ${isOvertime ? 'text-status-danger' : 'text-status-active'}`}
        >
          {getElapsedTime(shift.checkIn)}
        </span>
        {onClose && (
          <button
            onClick={() => onClose(shift.id)}
            className="px-3 py-1.5 text-xs font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
          >
            Cerrar turno
          </button>
        )}
      </div>
    </div>
  );
}
