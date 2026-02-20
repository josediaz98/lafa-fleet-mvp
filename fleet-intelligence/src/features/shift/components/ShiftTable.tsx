import { formatTime } from '@/lib/date-utils';
import { usePagination } from '@/lib/use-pagination';
import PaginationControls from '@/components/ui/PaginationControls';

interface CompletedShift {
  id: string;
  driverName: string;
  plate: string;
  model: string;
  center?: string;
  checkIn: string;
  checkOut?: string;
  hoursWorked?: number;
}

interface ShiftTableProps {
  shifts: CompletedShift[];
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export default function ShiftTable({
  shifts,
  hasActiveFilters,
  onClearFilters,
}: ShiftTableProps) {
  const totalHours = shifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0);
  const {
    paginatedItems,
    currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = usePagination(shifts);

  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
      {/* Mobile card list */}
      <div className="sm:hidden space-y-2 p-2">
        {paginatedItems.map(shift => (
          <div key={shift.id}
               className="bg-lafa-surface border border-lafa-border rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-lafa-text-primary">{shift.driverName}</span>
              <span className="text-xs font-mono text-lafa-text-secondary">{shift.plate}</span>
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-lafa-text-secondary">
              <span>{formatTime(shift.checkIn)} → {shift.checkOut ? formatTime(shift.checkOut) : '—'}</span>
              <span className="font-medium text-status-success">
                {shift.hoursWorked !== undefined ? `${shift.hoursWorked}h` : '—'}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lafa-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Conductor
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Placa
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider hidden md:table-cell">
                Modelo
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider hidden sm:table-cell">
                Centro
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Check-in
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Check-out
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Horas
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((shift, i) => (
              <tr
                key={shift.id}
                className={`border-b border-lafa-border/50 ${i % 2 !== 0 ? 'bg-lafa-bg/30' : ''}`}
              >
                <td className="px-4 py-3 text-lafa-text-primary font-medium">
                  {shift.driverName}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary font-mono text-xs">
                  {shift.plate}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary hidden md:table-cell">
                  {shift.model}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary hidden sm:table-cell">
                  {shift.center}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary">
                  {formatTime(shift.checkIn)}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary">
                  {shift.checkOut ? formatTime(shift.checkOut) : '—'}
                </td>
                <td className="px-4 py-3 text-right font-medium text-status-success">
                  {shift.hoursWorked !== undefined
                    ? `${shift.hoursWorked}h`
                    : '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-lafa-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs text-lafa-text-secondary">
          {rangeStart}–{rangeEnd} de {shifts.length} turno
          {shifts.length !== 1 ? 's' : ''}
        </span>
        <div className="flex items-center gap-3">
          {hasActiveFilters && onClearFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-lafa-accent hover:underline"
            >
              Limpiar filtros
            </button>
          )}
          <span className="text-xs font-semibold text-status-success">
            {totalHours.toFixed(1)}h total
          </span>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
