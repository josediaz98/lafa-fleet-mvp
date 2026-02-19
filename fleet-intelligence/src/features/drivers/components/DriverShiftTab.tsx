import { Clock } from 'lucide-react';
import type { Shift } from '@/types';
import { formatTime, getElapsedTime } from '@/lib/dateUtils';
import StatusBadge from '@/components/ui/StatusBadge';
import EmptyState from '@/components/ui/EmptyState';

interface DriverShiftTabProps {
  shiftHistory: Shift[];
  activeShift: Shift | null;
}

export default function DriverShiftTab({ shiftHistory, activeShift }: DriverShiftTabProps) {
  if (shiftHistory.length === 0 && !activeShift) {
    return (
      <EmptyState
        icon={Clock}
        title="Sin historial de turnos"
        description="Aún no hay turnos registrados para este conductor."
      />
    );
  }

  return (
    <div className="space-y-2">
      {activeShift && (
        <div className="bg-[rgba(59,130,246,0.05)] border border-[rgba(59,130,246,0.2)] rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-lafa-text-primary">Turno activo</span>
            <StatusBadge status="en_turno" />
          </div>
          <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
            <span>{activeShift.plate} · {activeShift.model}</span>
            <span>Check-in: {formatTime(activeShift.checkIn)} · {getElapsedTime(activeShift.checkIn)}</span>
          </div>
        </div>
      )}

      {shiftHistory.length === 0 && activeShift && (
        <p className="text-xs text-lafa-text-secondary text-center pt-2">
          Sin turnos completados — 1 turno activo en curso
        </p>
      )}

      {shiftHistory.map(shift => (
        <div key={shift.id} className="bg-lafa-bg rounded-lg p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-lafa-text-primary">
              {new Date(shift.checkIn).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
            {shift.hoursWorked !== undefined && (
              <span className="text-xs font-medium text-[#22C55E]">{shift.hoursWorked}h</span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
            <span>{shift.plate} · {shift.model}</span>
            <span>
              {formatTime(shift.checkIn)}
              {shift.checkOut ? ` → ${formatTime(shift.checkOut)}` : ''}
            </span>
          </div>
        </div>
      ))}
      {shiftHistory.length > 0 && (
        <p className="text-xs text-lafa-text-secondary text-center pt-2">
          Mostrando los últimos {shiftHistory.length} turnos
        </p>
      )}
    </div>
  );
}
