import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Filter,
} from 'lucide-react';
import { usePagination } from '@/lib/use-pagination';
import ValidationIcon from '@/components/ui/ValidationIcon';
import PaginationControls from '@/components/ui/PaginationControls';
import type { ParsedRow } from '../lib/csv-parser';

interface PreviewStepProps {
  rows: ParsedRow[];
  showOnlyErrors: boolean;
  setShowOnlyErrors: (v: boolean) => void;
  fileName: string;
  importableCount: number;
  isImporting: boolean;
  onBack: () => void;
  onImport: () => void;
}

export default function PreviewStep({
  rows,
  showOnlyErrors,
  setShowOnlyErrors,
  fileName,
  importableCount,
  isImporting,
  onBack,
  onImport,
}: PreviewStepProps) {
  const validCount = rows.filter((r) => r.estado === 'valido').length;
  const warningCount = rows.filter((r) => r.estado === 'warning').length;
  const errorCount = rows.filter((r) => r.estado === 'error').length;

  const displayRows = showOnlyErrors
    ? rows.filter((r) => r.estado === 'error')
    : rows;

  const {
    paginatedItems: paginatedRows,
    currentPage: csvPage,
    totalPages: csvTotalPages,
    setPage: setCsvPage,
    rangeStart: csvRangeStart,
    rangeEnd: csvRangeEnd,
  } = usePagination(displayRows, { pageSize: 50 });

  return (
    <>
      <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
        <span className="inline-flex items-center gap-1.5 text-status-success">
          <CheckCircle size={14} /> {validCount} {'validos'}
        </span>
        <span className="inline-flex items-center gap-1.5 text-status-alert">
          <AlertTriangle size={14} /> {warningCount} warning
        </span>
        <span className="inline-flex items-center gap-1.5 text-status-danger">
          <XCircle size={14} /> {errorCount} error
        </span>
        <span className="text-lafa-text-secondary text-xs">
          Mostrando {displayRows.length} de {rows.length} filas
        </span>
        {errorCount > 0 && (
          <button
            onClick={() => setShowOnlyErrors(!showOnlyErrors)}
            className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
              showOnlyErrors
                ? 'bg-status-danger/15 text-status-danger'
                : 'bg-lafa-surface border border-lafa-border text-lafa-text-secondary hover:text-lafa-text-primary'
            }`}
          >
            <Filter size={12} />{' '}
            {showOnlyErrors ? 'Mostrando errores' : 'Solo errores'}
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs text-lafa-text-secondary">
        Archivo:{' '}
        <span className="text-lafa-text-primary font-medium">{fileName}</span>
      </div>

      <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-lafa-surface z-10">
              <tr className="border-b border-lafa-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Driver ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Conductor
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Fecha
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Trip ID
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Hora inicio
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Hora fin
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Costo
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Propina
                </th>
                <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.map((row, i) => (
                <tr
                  key={`${row.tripId}-${i}`}
                  className={`border-b border-lafa-border/50 ${
                    row.estado === 'error'
                      ? 'bg-status-danger/5'
                      : row.estado === 'warning'
                        ? 'bg-status-alert/5'
                        : i % 2 === 0
                          ? 'bg-transparent'
                          : 'bg-lafa-bg/30'
                  }`}
                >
                  <td className="px-4 py-3 text-lafa-text-primary font-mono">
                    {row.driverId}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${row.matchType === 'fuzzy' ? 'text-status-alert' : 'text-lafa-text-secondary'}`}
                  >
                    {row.matchedDriverName ?? '\u2014'}
                    {row.matchType === 'fuzzy' && (
                      <span className="text-[10px] ml-1">(fuzzy)</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-lafa-text-secondary">
                    {row.fecha}
                  </td>
                  <td className="px-4 py-3 text-lafa-text-secondary font-mono text-xs">
                    {row.tripId}
                  </td>
                  <td className="px-4 py-3 text-lafa-text-secondary">
                    {row.horaInicio}
                  </td>
                  <td className="px-4 py-3 text-lafa-text-secondary">
                    {row.horaFin}
                  </td>
                  <td className="px-4 py-3 text-right text-lafa-text-primary">
                    ${row.costo.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-right text-lafa-text-secondary">
                    ${row.propina.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <ValidationIcon
                      estado={row.estado}
                      msg={row.errorMsg}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
          <span className="text-xs text-lafa-text-secondary">
            {csvRangeStart}&ndash;{csvRangeEnd} de {displayRows.length} filas
          </span>
          <PaginationControls
            currentPage={csvPage}
            totalPages={csvTotalPages}
            onPageChange={setCsvPage}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onBack}
          className="px-5 py-2.5 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
        >
          {'\u2190 Atras'}
        </button>
        <button
          onClick={onImport}
          disabled={importableCount === 0 || isImporting}
          className="px-5 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isImporting ? (
            'Importando...'
          ) : (
            <>Importar {importableCount} viajes &rarr;</>
          )}
        </button>
      </div>
    </>
  );
}
