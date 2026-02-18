import { formatMXN } from '../../lib/format';

interface PayrollSummaryCardsProps {
  totalNomina: number;
  driversWithGoal: number;
  totalDrivers: number;
  goalPct: number;
  totalBilled: number;
  avgPerHour: number;
}

export default function PayrollSummaryCards({
  totalNomina,
  driversWithGoal,
  totalDrivers,
  goalPct,
  totalBilled,
  avgPerHour,
}: PayrollSummaryCardsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
        <p className="text-xs text-lafa-text-secondary mb-1">{'Total n\u00f3mina'}</p>
        <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(totalNomina)}</p>
      </div>
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
        <p className="text-xs text-lafa-text-secondary mb-1">Conductores con meta</p>
        <p className="text-lg font-bold text-lafa-text-primary">
          {driversWithGoal}/{totalDrivers}
          <span className="text-sm font-normal text-lafa-text-secondary ml-1">({goalPct}%)</span>
        </p>
      </div>
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
        <p className="text-xs text-lafa-text-secondary mb-1">{'Facturaci\u00f3n total'}</p>
        <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(totalBilled)}</p>
      </div>
      <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
        <p className="text-xs text-lafa-text-secondary mb-1">{'Prom. facturaci\u00f3n/hora'}</p>
        <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(avgPerHour)}</p>
      </div>
    </div>
  );
}
