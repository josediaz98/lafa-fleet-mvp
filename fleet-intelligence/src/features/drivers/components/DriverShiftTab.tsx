import { Clock } from 'lucide-react';
import type { Shift } from '@/types';
import { formatTime } from '@/lib/date-utils';
import EmptyState from '@/components/ui/EmptyState';

interface DriverShiftTabProps {
  shiftHistory: Shift[];
}

export default function DriverShiftTab({ shiftHistory }: DriverShiftTabProps) {
  if (shiftHistory.length === 0) {
    return (
      <EmptyState
        icon={Clock}
        title="Sin historial de turnos"
        description="Aún no hay turnos completados para este conductor."
      />
    );
  }

  return (
    <div className="space-y-2">
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
      <p className="text-xs text-lafa-text-secondary text-center pt-2">
        Mostrando los últimos {shiftHistory.length} turnos
      </p>
    </div>
  );
}
