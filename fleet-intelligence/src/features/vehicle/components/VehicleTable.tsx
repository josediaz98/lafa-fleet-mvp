import type { Vehicle } from '@/types';
import { getCenterName } from '@/lib/format';
import { usePagination } from '@/lib/use-pagination';
import StatusBadge from '@/components/ui/StatusBadge';
import PaginationControls from '@/components/ui/PaginationControls';

interface VehicleTableProps {
  vehicles: Vehicle[];
  totalCount: number;
  onSelect: (vehicle: Vehicle) => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export default function VehicleTable({
  vehicles,
  totalCount,
  onSelect,
  hasActiveFilters,
  onClearFilters,
}: VehicleTableProps) {
  const {
    paginatedItems,
    currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = usePagination(vehicles);

  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
      {/* Mobile card list */}
      <div className="sm:hidden space-y-2 p-2">
        {paginatedItems.map(vehicle => (
          <div key={vehicle.id} onClick={() => onSelect(vehicle)}
               className="bg-lafa-surface border border-lafa-border rounded-lg p-3 cursor-pointer active:bg-lafa-accent/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium font-mono text-lafa-text-primary">{vehicle.plate}</span>
              <StatusBadge status={vehicle.status} />
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-lafa-text-secondary">
              <span>{vehicle.model}</span>
              <span>·</span>
              <span>{vehicle.oem}</span>
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
                Placa
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Modelo
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider hidden sm:table-cell">
                OEM
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider hidden sm:table-cell">
                Centro
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((vehicle, i) => (
              <tr
                key={vehicle.id}
                className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors duration-150 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                }`}
                onClick={() => onSelect(vehicle)}
              >
                <td className="px-4 py-3 text-lafa-text-primary font-medium font-mono">
                  {vehicle.plate}
                </td>
                <td className="px-4 py-3 text-lafa-text-primary">
                  {vehicle.model}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary hidden sm:table-cell">
                  {vehicle.oem}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary hidden sm:table-cell">
                  {getCenterName(vehicle.centerId)}
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={vehicle.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-lafa-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-xs text-lafa-text-secondary">
          {rangeStart}–{rangeEnd} de {vehicles.length}
          {vehicles.length !== totalCount ? ` (${totalCount} total)` : ''}{' '}
          vehículos
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
