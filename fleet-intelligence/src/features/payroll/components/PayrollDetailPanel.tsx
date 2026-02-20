import type { PayrollRecord, Trip } from '@/types';
import { formatMXN } from '@/lib/format';
import { PALETTE } from '@/lib/status-map';
import { SUPPORT_AMOUNT } from '@/features/payroll/lib/payroll';

interface PayrollDetailPanelProps {
  record: PayrollRecord;
  trips: Trip[];
}

export default function PayrollDetailPanel({
  record,
  trips,
}: PayrollDetailPanelProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-lafa-text-secondary">Centro</p>
          <p className="text-sm font-medium text-lafa-text-primary">
            {record.center}
          </p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Horas trabajadas</p>
          <p className="text-sm font-medium text-lafa-text-primary">
            {record.hoursWorked}h
          </p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">{'Facturación'}</p>
          <p className="text-sm font-medium text-lafa-text-primary">
            {formatMXN(record.totalBilled)}
          </p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Meta alcanzada</p>
          <p
            className={`text-sm font-medium ${record.goalMet ? 'text-status-success' : 'text-status-danger'}`}
          >
            {record.goalMet ? 'Sí' : 'No'}
          </p>
        </div>
        {record.version && record.version > 1 && (
          <div>
            <p className="text-xs text-lafa-text-secondary">{'Versión'}</p>
            <p className="text-sm font-medium text-status-alert">
              v{record.version} (recalculado)
            </p>
          </div>
        )}
        {record.closedAt && (
          <div>
            <p className="text-xs text-lafa-text-secondary">Cerrado por</p>
            <p className="text-sm font-medium text-lafa-text-primary">
              {record.closedBy || 'Sistema (auto)'}
            </p>
            <p className="text-xs text-lafa-text-secondary mt-0.5">
              {new Date(record.closedAt).toLocaleString('es-MX')}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-lafa-border pt-4">
        <h4 className="text-sm font-semibold text-lafa-text-primary mb-3">
          Desglose de pago
        </h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-lafa-text-secondary">Salario base</span>
            <span className="text-lafa-text-primary">
              {formatMXN(record.baseSalary)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-lafa-text-secondary">Bono productividad</span>
            <span className="text-lafa-text-primary">
              {formatMXN(record.productivityBonus)}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-lafa-text-secondary">Overtime</span>
            <span className="text-lafa-text-primary">
              {formatMXN(record.overtimePay)}
            </span>
          </div>
          {!record.goalMet && (
            <div className="flex justify-between text-sm">
              <span className="text-lafa-text-secondary">
                {'Apoyo económico'}
              </span>
              <span className="text-status-danger">
                {formatMXN(SUPPORT_AMOUNT)}
              </span>
            </div>
          )}
          <div className="flex justify-between text-sm font-semibold border-t border-lafa-border pt-2">
            <span className="text-lafa-text-primary">Total</span>
            <span className="text-lafa-accent">
              {formatMXN(record.totalPay)}
            </span>
          </div>
        </div>
        {record.totalPay > 0 &&
          (() => {
            const total = record.totalPay;
            const basePct = Math.round((record.baseSalary / total) * 100);
            const bonoPct = Math.round(
              (record.productivityBonus / total) * 100,
            );
            const otPct = Math.round((record.overtimePay / total) * 100);
            const supportAmt = record.goalMet ? 0 : SUPPORT_AMOUNT;
            const supportPct = Math.round((supportAmt / total) * 100);
            const items = [
              { label: 'Base', pct: basePct, color: PALETTE.active },
              { label: 'Bono', pct: bonoPct, color: PALETTE.success },
              { label: 'Overtime', pct: otPct, color: PALETTE.alert },
              ...(!record.goalMet
                ? [{ label: 'Apoyo', pct: supportPct, color: PALETTE.danger }]
                : []),
            ].filter((i) => i.pct > 0);
            return (
              <div className="mt-3">
                <div className="flex rounded-full overflow-hidden h-2 bg-lafa-bg">
                  {items.map((i) => (
                    <div
                      key={i.label}
                      style={{ width: `${i.pct}%`, backgroundColor: i.color }}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  {items.map((i) => (
                    <span
                      key={i.label}
                      className="flex items-center gap-1.5 text-xs text-lafa-text-secondary"
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: i.color }}
                      />
                      {i.label} {i.pct}%
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
      </div>

      {trips.length > 0 && (
        <div className="border-t border-lafa-border pt-4">
          <h4 className="text-sm font-semibold text-lafa-text-primary mb-3">
            Viajes ({trips.length})
          </h4>
          <div className="bg-lafa-bg rounded-lg overflow-hidden max-h-48 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-lafa-bg">
                <tr className="border-b border-lafa-border">
                  <th className="text-left px-3 py-2 text-lafa-text-secondary">
                    Fecha
                  </th>
                  <th className="text-left px-3 py-2 text-lafa-text-secondary">
                    Horario
                  </th>
                  <th className="text-right px-3 py-2 text-lafa-text-secondary">
                    Costo
                  </th>
                </tr>
              </thead>
              <tbody>
                {trips.map((t) => (
                  <tr key={t.id} className="border-b border-lafa-border/50">
                    <td className="px-3 py-2 text-lafa-text-secondary">
                      {t.fecha}
                    </td>
                    <td className="px-3 py-2 text-lafa-text-secondary">
                      {t.horaInicio} → {t.horaFin}
                    </td>
                    <td className="px-3 py-2 text-right text-lafa-text-primary">
                      {formatMXN(t.costo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="border-t border-lafa-border pt-4">
        <h4 className="text-sm font-semibold text-lafa-text-primary mb-3">
          Resumen AI
        </h4>
        <div className="bg-lafa-bg rounded-lg p-4 text-sm text-lafa-text-secondary leading-relaxed">
          {record.aiExplanation || 'Sin resumen disponible.'}
        </div>
      </div>
    </div>
  );
}
