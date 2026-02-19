import { useState, useEffect, useCallback } from 'react';
import { FileSpreadsheet, RefreshCw } from 'lucide-react';
import {
  fetchUploadHistory,
  type CsvUploadRecord,
} from '@/lib/supabase/queries';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { timeAgo } from '@/lib/format';
import { usePagination } from '@/lib/use-pagination';
import { SkeletonTableRows } from '@/components/ui/Skeleton';
import StatusBadge from '@/components/ui/StatusBadge';
import PaginationControls from '@/components/ui/PaginationControls';
import EmptyState from '@/components/ui/EmptyState';

interface UploadHistoryTableProps {
  refreshKey: number;
}

type State =
  | { kind: 'loading' }
  | { kind: 'error'; message: string }
  | { kind: 'loaded'; records: CsvUploadRecord[] };

const COLS = 7;

export default function UploadHistoryTable({
  refreshKey,
}: UploadHistoryTableProps) {
  const [state, setState] = useState<State>({ kind: 'loading' });

  const load = useCallback(async () => {
    setState({ kind: 'loading' });
    try {
      const records = await fetchUploadHistory();
      setState({ kind: 'loaded', records });
    } catch (err) {
      setState({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Error desconocido',
      });
    }
  }, []);

  useEffect(() => {
    load(); // eslint-disable-line react-hooks/set-state-in-effect -- async data fetch
  }, [load, refreshKey]);

  const records = state.kind === 'loaded' ? state.records : [];
  const {
    paginatedItems,
    currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = usePagination(records, { pageSize: 10 });

  // Mock mode — Supabase not configured
  if (!isSupabaseConfigured) {
    return (
      <EmptyState
        icon={FileSpreadsheet}
        title="Sin historial"
        description="El historial de cargas se muestra al usar Supabase."
      />
    );
  }

  if (state.kind === 'loading') {
    return (
      <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lafa-border">
              {[
                'Archivo',
                'Subido por',
                'Fecha',
                'Registros',
                'Validos',
                'Errores',
                'Estado',
              ].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <SkeletonTableRows rows={3} cols={COLS} />
          </tbody>
        </table>
      </div>
    );
  }

  if (state.kind === 'error') {
    return (
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-6 text-center">
        <p className="text-sm text-status-danger mb-2">
          Error al cargar historial
        </p>
        <p className="text-xs text-lafa-text-secondary mb-3">{state.message}</p>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-lafa-accent hover:text-lafa-accent-hover transition-colors duration-150"
        >
          <RefreshCw size={12} /> Reintentar
        </button>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <EmptyState
        icon={FileSpreadsheet}
        title="Sin cargas previas"
        description="Importa tu primer archivo CSV arriba."
      />
    );
  }

  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-lafa-surface z-10">
            <tr className="border-b border-lafa-border">
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Archivo
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Subido por
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Fecha
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Registros
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Validos
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Errores
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((r, i) => (
              <tr
                key={r.id}
                className={`border-b border-lafa-border/50 hover:bg-lafa-accent/5 transition-colors duration-100 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                }`}
              >
                <td
                  className="px-4 py-3 text-lafa-text-primary truncate max-w-[200px]"
                  title={r.filename}
                >
                  {r.filename}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary">
                  {r.uploadedBy}
                </td>
                <td
                  className="px-4 py-3 text-lafa-text-secondary"
                  title={new Date(r.uploadedAt).toLocaleString('es-MX')}
                >
                  {timeAgo(r.uploadedAt)}
                </td>
                <td className="px-4 py-3 text-right text-lafa-text-primary">
                  {r.recordCount}
                </td>
                <td
                  className={`px-4 py-3 text-right ${r.validCount > 0 ? 'text-status-success' : 'text-lafa-text-secondary'}`}
                >
                  {r.validCount}
                </td>
                <td
                  className={`px-4 py-3 text-right ${r.errorCount > 0 ? 'text-status-danger' : 'text-lafa-text-secondary'}`}
                >
                  {r.errorCount}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={r.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
        <span className="text-xs text-lafa-text-secondary">
          {rangeStart}–{rangeEnd} de {records.length} cargas
        </span>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
