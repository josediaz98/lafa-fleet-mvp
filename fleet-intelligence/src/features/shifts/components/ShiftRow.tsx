import { formatTime, getElapsedTime } from '@/lib/date-utils';
import { SHIFT_WINDOW_MS } from '@/lib/constants';

interface ShiftRowProps {
  shift: {
    id: string;
    driverName: string;
    plate: string;
    model: string;
    center?: string;
    checkIn: string;
    status: string;
  };
  variant: 'active' | 'alert';
  onClose?: (shiftId: string) => void;
  disabled?: boolean;
}

export default function ShiftRow({ shift, variant, onClose, disabled }: ShiftRowProps) {
  const isOvertime = Date.now() - new Date(shift.checkIn).getTime() > SHIFT_WINDOW_MS;
  const showWarning = variant === 'alert' || isOvertime;

  return (
    <div
      className={`px-4 py-3 flex flex-wrap sm:flex-nowrap items-center gap-x-4 gap-y-1 transition-colors duration-150 ${
        showWarning
          ? 'border-l-2 border-l-status-danger bg-status-danger/[0.04] hover:bg-status-danger/[0.08]'
          : 'hover:bg-lafa-accent/5'
      }`}
    >
      {/* Driver name */}
      <span className="text-sm font-medium text-lafa-text-primary truncate min-w-[120px] flex-[2]">
        {shift.driverName}
      </span>

      {/* Center */}
      <span className="text-xs text-lafa-text-secondary truncate flex-1 hidden sm:block">
        {shift.center}
      </span>

      {/* Plate + Model */}
      <span className="text-xs text-lafa-text-secondary truncate flex-[1.5] hidden md:block">
        {shift.plate} · {shift.model}
      </span>

      {/* Check-in time */}
      <span className="text-xs text-lafa-text-secondary whitespace-nowrap shrink-0 hidden sm:block">
        {formatTime(shift.checkIn)}
      </span>

      {/* Elapsed time */}
      <span className={`text-xs font-semibold whitespace-nowrap shrink-0 ${
        isOvertime ? 'text-status-danger' : 'text-status-active'
      }`}>
        {getElapsedTime(shift.checkIn)}
      </span>

      {/* Close button */}
      {onClose && (
        <button
          onClick={() => onClose(shift.id)}
          disabled={disabled}
          className="px-3 py-1.5 text-xs font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {disabled ? 'Cerrando...' : 'Cerrar'}
        </button>
      )}

      {/* Mobile: secondary info (wraps to second line) */}
      <div className="sm:hidden flex items-center gap-2 text-xs text-lafa-text-secondary basis-full pl-0">
        {shift.center} · {shift.plate} · {formatTime(shift.checkIn)}
      </div>
    </div>
  );
}
