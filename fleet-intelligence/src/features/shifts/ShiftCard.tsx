import { formatTime, getElapsedTime } from '@/lib/date-utils';
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
  onClose?: (shiftId: string) => void;
}

export default function ShiftCard({ shift, variant = 'active', onClose }: ShiftCardProps) {
  if (variant === 'completed') {
    return (
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-lafa-text-primary">{shift.driverName}</span>
          <StatusBadge status="completado" />
        </div>
        <p className="text-xs text-lafa-text-secondary mb-1">
          {shift.plate} {'\u00b7'} {shift.model} {'\u00b7'} {shift.center}
        </p>
        <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
          <span>{formatTime(shift.checkIn)} {shift.checkOut ? `\u2192 ${formatTime(shift.checkOut)}` : ''}</span>
          {shift.hoursWorked !== undefined && (
            <span className="font-medium text-[#22C55E]">{shift.hoursWorked}h</span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'alert') {
    return (
      <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-lafa-text-primary">{shift.driverName}</span>
          <StatusBadge status="alerta" label={`Abierto ${getElapsedTime(shift.checkIn)}`} />
        </div>
        <p className="text-xs text-lafa-text-secondary mb-3">
          {shift.plate} {'\u00b7'} {shift.model} {'\u00b7'} {shift.center}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-xs text-lafa-text-secondary">
            Check-in: {formatTime(shift.checkIn)} {'\u2014'} Sin check-out
          </p>
          {onClose && (
            <button
              onClick={() => onClose(shift.id)}
              className="px-3 py-1.5 text-xs font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
            >
              Cerrar turno
            </button>
          )}
        </div>
      </div>
    );
  }

  // Active variant
  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4 hover:border-lafa-accent/30 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-sm font-semibold text-lafa-text-primary">{shift.driverName}</span>
          {shift.center && <span className="text-xs text-lafa-text-secondary ml-2">{shift.center}</span>}
        </div>
        <StatusBadge status="en_turno" />
      </div>
      <p className="text-xs text-lafa-text-secondary mb-3">
        {shift.plate} {'\u00b7'} {shift.model} {'\u00b7'} Check-in: {formatTime(shift.checkIn)}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[#3B82F6]">{getElapsedTime(shift.checkIn)}</span>
        {onClose && (
          <button
            onClick={() => onClose(shift.id)}
            className="px-3 py-1.5 text-xs font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
          >
            Cerrar turno
          </button>
        )}
      </div>
    </div>
  );
}
