import { useState, useMemo } from 'react';
import { Receipt, AlertTriangle } from 'lucide-react';
import type { PayrollRecord } from '@/types';
import { formatMXN } from '@/lib/format';
import { usePagination } from '@/lib/use-pagination';
import { SUPPORT_AMOUNT } from '@/features/payroll/lib/payroll';
import { getPayrollFlags } from '@/features/payroll/lib/payroll-flags';
import PaginationControls from '@/components/ui/PaginationControls';
import EmptyState from '@/components/ui/EmptyState';

type SortKey = 'driverName' | 'hoursWorked' | 'totalBilled' | 'totalPay';

function SortHeader({
  label,
  field,
  sortKey,
  sortAsc,
  onSort,
}: {
  label: string;
  field: SortKey;
  sortKey: SortKey;
  sortAsc: boolean;
  onSort: (key: SortKey) => void;
}) {
  return (
    <th
      className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider cursor-pointer hover:text-lafa-text-primary select-none whitespace-nowrap"
      onClick={() => onSort(field)}
    >
      {label} {sortKey === field ? (sortAsc ? '↑' : '↓') : ''}
    </th>
  );
}

interface PayrollTableProps {
  data: PayrollRecord[];
  tab: 'actual' | 'cerradas';
  totalNomina: number;
  previousWeekHours: Map<string, number>;
  onSelectRow: (row: PayrollRecord) => void;
}

export default function PayrollTable({
  data,
  tab,
  totalNomina,
  previousWeekHours,
  onSelectRow,
}: PayrollTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>('driverName');
  const [sortAsc, setSortAsc] = useState(true);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }

  const sorted = useMemo(
    () =>
      [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return sortAsc
          ? (aVal as number) - (bVal as number)
          : (bVal as number) - (aVal as number);
      }),
    [data, sortKey, sortAsc],
  );

  const {
    paginatedItems: paginatedRows,
    currentPage,
    totalPages,
    setPage,
    rangeStart,
    rangeEnd,
  } = usePagination(sorted);

  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-lafa-surface">
            <tr className="border-b border-lafa-border">
              <SortHeader label="Conductor" field="driverName" sortKey={sortKey} sortAsc={sortAsc} onSort={handleSort} />
              <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Centro
              </th>
              <SortHeader label="Horas" field="hoursWorked" sortKey={sortKey} sortAsc={sortAsc} onSort={handleSort} />
              <SortHeader label={'Facturación'} field="totalBilled" sortKey={sortKey} sortAsc={sortAsc} onSort={handleSort} />
              <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Meta
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Base
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Bono
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Overtime
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Apoyo
              </th>
              <SortHeader label="Pago total" field="totalPay" sortKey={sortKey} sortAsc={sortAsc} onSort={handleSort} />
              <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Flags
              </th>
              <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td colSpan={12} className="px-4 py-8">
                  <EmptyState
                    icon={Receipt}
                    title={'Sin registros de nómina'}
                  />
                </td>
              </tr>
            )}
            {paginatedRows.map((row, i) => (
              <tr
                key={row.id}
                onClick={() => onSelectRow(row)}
                className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors duration-150 ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                }`}
              >
                <td className="px-4 py-3 text-lafa-text-primary font-medium whitespace-nowrap">
                  {row.driverName}
                </td>
                <td className="px-4 py-3 text-lafa-text-secondary">
                  {row.center}
                </td>
                <td
                  className="px-4 py-3 text-lafa-text-secondary"
                  title={`Meta: ${row.hoursThreshold}h`}
                >
                  {row.hoursWorked}h
                  <span className="text-[10px] text-lafa-text-secondary/60 ml-1">
                    /{row.hoursThreshold}h
                  </span>
                </td>
                <td
                  className="px-4 py-3 text-lafa-text-primary whitespace-nowrap"
                  title={`Meta: ${formatMXN(row.revenueThreshold)}`}
                >
                  {formatMXN(row.totalBilled)}
                  <span className="text-[10px] text-lafa-text-secondary/60 ml-1">
                    /{formatMXN(row.revenueThreshold)}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {row.goalMet ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-success/15 text-status-success">
                      {'\u00a0Sí\u00a0'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-danger/15 text-status-danger">
                      No
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">
                  {formatMXN(row.baseSalary)}
                </td>
                <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">
                  {formatMXN(row.productivityBonus)}
                </td>
                <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">
                  {formatMXN(row.overtimePay)}
                </td>
                <td className="px-4 py-3 text-right text-lafa-text-secondary whitespace-nowrap">
                  {row.goalMet ? '—' : formatMXN(SUPPORT_AMOUNT)}
                </td>
                <td className="px-4 py-3 text-right font-semibold text-lafa-text-primary whitespace-nowrap">
                  {formatMXN(row.totalPay)}
                </td>
                <td className="px-4 py-3">
                  {(() => {
                    const flags = getPayrollFlags(
                      row,
                      previousWeekHours.get(row.driverId),
                    );
                    if (flags.length === 0) return null;
                    return (
                      <div className="flex flex-col gap-0.5">
                        {flags.map((f, fi) => (
                          <span
                            key={fi}
                            className="inline-flex items-center gap-1 text-[10px] font-medium whitespace-nowrap"
                            style={{ color: f.color }}
                          >
                            <AlertTriangle size={10} />
                            {f.label}
                          </span>
                        ))}
                      </div>
                    );
                  })()}
                </td>
                <td className="px-4 py-3 text-center">
                  {tab === 'actual' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-alert/15 text-status-alert">
                      Borrador
                    </span>
                  ) : row.status === 'cerrado' ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-success/15 text-status-success">
                      Cerrado
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-status-danger/15 text-status-danger">
                      Superseded
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-4 py-2.5 border-t border-lafa-border flex items-center justify-between">
        <span className="text-xs text-lafa-text-secondary">
          {rangeStart}–{rangeEnd} de {data.length} conductor
          {data.length !== 1 ? 'es' : ''}
        </span>
        <div className="flex items-center gap-3">
          {data.length > 0 && (
            <span className="text-xs font-medium text-lafa-text-primary">
              {'Total: '}
              {formatMXN(totalNomina)}
            </span>
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
