import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import type { PayrollRecord } from '@/types';
import { formatMXN } from '@/lib/format';
import EmptyState from '@/components/ui/EmptyState';

interface DriverPayrollTabProps {
  payrollHistory: PayrollRecord[];
}

export default function DriverPayrollTab({
  payrollHistory,
}: DriverPayrollTabProps) {
  const navigate = useNavigate();

  if (payrollHistory.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Sin historial de nómina"
        description="Aún no hay registros de nómina cerrados para este conductor."
      />
    );
  }

  return (
    <>
      <div className="bg-lafa-bg rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-lafa-border">
              <th className="text-left px-3 py-2 text-xs font-medium text-lafa-text-secondary">
                Semana
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">
                Horas
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">
                Facturación
              </th>
              <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">
                Pago
              </th>
              <th className="text-center px-3 py-2 text-xs font-medium text-lafa-text-secondary">
                Meta
              </th>
            </tr>
          </thead>
          <tbody>
            {payrollHistory.map((row) => (
              <tr key={row.id} className="border-b border-lafa-border/50">
                <td className="px-3 py-2 text-lafa-text-primary text-xs">
                  {row.weekLabel ?? '—'}
                </td>
                <td className="px-3 py-2 text-right text-lafa-text-secondary">
                  {row.hoursWorked}h
                </td>
                <td className="px-3 py-2 text-right text-lafa-text-secondary">
                  {formatMXN(row.totalBilled)}
                </td>
                <td className="px-3 py-2 text-right font-medium text-lafa-text-primary">
                  {formatMXN(row.totalPay)}
                </td>
                <td className="px-3 py-2 text-center">
                  {row.goalMet ? (
                    <span className="text-status-success text-xs">Sí</span>
                  ) : (
                    <span className="text-status-danger text-xs">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => navigate('/payroll')}
        className="mt-3 text-sm font-medium text-lafa-accent hover:text-lafa-accent-hover transition-colors duration-150"
      >
        Ver nómina completa →
      </button>
    </>
  );
}
