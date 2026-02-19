import { formatMXN } from '@/lib/format';

interface PayrollSummaryCardsProps {
  totalNomina: number;
  driversWithGoal: number;
  totalDrivers: number;
  goalPct: number;
  totalBilled: number;
  avgPerHour: number;
  totalBase?: number;
  totalBonus?: number;
  totalOvertime?: number;
  totalSupport?: number;
}

export default function PayrollSummaryCards({
  totalNomina,
  driversWithGoal,
  totalDrivers,
  goalPct,
  totalBilled,
  avgPerHour,
  totalBase,
  totalBonus,
  totalOvertime,
  totalSupport,
}: PayrollSummaryCardsProps) {
  const showDistribution = totalBase !== undefined;

  return (
    <div className="space-y-3 mb-5">
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
          <p className="text-xs text-lafa-text-secondary mb-1">{'Total nómina'}</p>
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
          <p className="text-xs text-lafa-text-secondary mb-1">{'Facturación total'}</p>
          <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(totalBilled)}</p>
        </div>
        <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
          <p className="text-xs text-lafa-text-secondary mb-1">{'Prom. facturación/hora'}</p>
          <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(avgPerHour)}</p>
        </div>
        {totalSupport !== undefined && totalSupport > 0 && (
          <div className="bg-lafa-surface border border-[#EF4444]/20 rounded-xl p-4">
            <p className="text-xs text-lafa-text-secondary mb-1">{'Apoyo económico'}</p>
            <p className="text-lg font-bold text-[#EF4444]">{formatMXN(totalSupport)}</p>
            <p className="text-[10px] text-lafa-text-secondary">{totalDrivers - driversWithGoal} conductor{(totalDrivers - driversWithGoal) !== 1 ? 'es' : ''}</p>
          </div>
        )}
      </div>

      {showDistribution && totalNomina > 0 && (
        <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
          <p className="text-xs text-lafa-text-secondary mb-2">{'Distribución por componente'}</p>
          <div className="flex rounded-full overflow-hidden h-2.5 bg-lafa-bg mb-2">
            {[
              { value: totalBase!, color: '#3B82F6' },
              { value: totalBonus!, color: '#22C55E' },
              { value: totalOvertime!, color: '#EAB308' },
              { value: totalSupport!, color: '#EF4444' },
            ].filter(i => i.value > 0).map((i, idx) => (
              <div key={idx} style={{ width: `${(i.value / totalNomina) * 100}%`, backgroundColor: i.color }} />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {[
              { label: 'Base', value: totalBase!, color: '#3B82F6' },
              { label: 'Bonos', value: totalBonus!, color: '#22C55E' },
              { label: 'Overtime', value: totalOvertime!, color: '#EAB308' },
              { label: 'Apoyo', value: totalSupport!, color: '#EF4444' },
            ].map(i => (
              <span key={i.label} className="flex items-center gap-1.5 text-xs text-lafa-text-secondary">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: i.color }} />
                {i.label}: {formatMXN(i.value)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
