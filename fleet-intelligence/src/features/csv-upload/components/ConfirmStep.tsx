import { CheckCircle } from 'lucide-react';
import { formatMXN } from '@/lib/format';
import type { ParsedRow } from '../lib/csv-parser';

interface ConfirmStepProps {
  rows: ParsedRow[];
  onReset: () => void;
}

export default function ConfirmStep({ rows, onReset }: ConfirmStepProps) {
  const validCount = rows.filter((r) => r.estado === 'valido').length;
  const warningCount = rows.filter((r) => r.estado === 'warning').length;
  const errorCount = rows.filter((r) => r.estado === 'error').length;
  const importableCount = validCount + warningCount;
  const totalBilling = rows
    .filter((r) => r.estado !== 'error')
    .reduce((sum, r) => sum + r.costo, 0);
  const uniqueDrivers = new Set(
    rows.filter((r) => r.estado !== 'error').map((r) => r.driverId),
  ).size;

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 rounded-full bg-status-success/15 flex items-center justify-center mb-4">
        <CheckCircle size={32} className="text-status-success" />
      </div>
      <h2 className="text-lg font-semibold text-lafa-text-primary mb-2">
        {'Importacion completada'}
      </h2>
      <div className="bg-lafa-accent/10 border border-lafa-accent/20 rounded-xl p-3 mb-4 text-sm text-lafa-text-primary text-center max-w-lg">
        {importableCount} viajes importados, mapeados a {uniqueDrivers}{' '}
        conductores. {formatMXN(totalBilling)} facturados.
        {warningCount > 0
          ? ` ${warningCount} advertencia${warningCount !== 1 ? 's' : ''}.`
          : ''}
        {errorCount > 0
          ? ` ${errorCount} registro${errorCount !== 1 ? 's' : ''} con error descartado${errorCount !== 1 ? 's' : ''}.`
          : ''}
      </div>
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4 mb-6 grid grid-cols-3 gap-6 text-center">
        <div>
          <p className="text-xs text-lafa-text-secondary">Viajes</p>
          <p className="text-lg font-bold text-lafa-text-primary">
            {importableCount}
          </p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">
            {'Facturacion'}
          </p>
          <p className="text-lg font-bold text-lafa-text-primary">
            {formatMXN(totalBilling)}
          </p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Conductores</p>
          <p className="text-lg font-bold text-lafa-text-primary">
            {uniqueDrivers}
          </p>
        </div>
      </div>
      <button
        onClick={onReset}
        className="px-5 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
      >
        Cargar otro archivo
      </button>
    </div>
  );
}
