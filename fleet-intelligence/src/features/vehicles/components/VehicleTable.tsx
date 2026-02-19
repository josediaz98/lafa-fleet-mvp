import type { Vehicle } from '@/types';
import { getCenterName } from '@/lib/format';
import StatusBadge from '@/components/ui/StatusBadge';

interface VehicleTableProps {
  vehicles: Vehicle[];
  totalCount: number;
  onSelect: (vehicle: Vehicle) => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
}

export default function VehicleTable({ vehicles, totalCount, onSelect, hasActiveFilters, onClearFilters }: VehicleTableProps) {
  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lafa-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Placa</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Modelo</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">OEM</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Centro</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, i) => (
              <tr
                key={vehicle.id}
                className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                }`}
                onClick={() => onSelect(vehicle)}
              >
                <td className="px-4 py-3 text-lafa-text-primary font-medium font-mono">{vehicle.plate}</td>
                <td className="px-4 py-3 text-lafa-text-primary">{vehicle.model}</td>
                <td className="px-4 py-3 text-lafa-text-secondary">{vehicle.oem}</td>
                <td className="px-4 py-3 text-lafa-text-secondary">{getCenterName(vehicle.centerId)}</td>
                <td className="px-4 py-3">
                  <StatusBadge status={vehicle.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
        <span className="text-xs text-lafa-text-secondary">
          {vehicles.length} de {totalCount} vehículos
        </span>
        {hasActiveFilters && onClearFilters && (
          <button onClick={onClearFilters} className="text-xs text-lafa-accent hover:underline">
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
