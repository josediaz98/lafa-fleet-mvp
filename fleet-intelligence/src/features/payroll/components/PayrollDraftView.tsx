import { Upload, CheckCircle } from 'lucide-react';
import EmptyState from '@/components/ui/EmptyState';
import PayrollSummaryCards from './PayrollSummaryCards';
import PayrollTable from './PayrollTable';
import type { PayrollRecord } from '@/types';

interface WeekSummary {
  narrative: string;
  totalBase: number;
  totalBonus: number;
  totalOvertime: number;
  totalSupport: number;
}

interface PayrollDraftViewProps {
  week: { label: string };
  isCurrentWeekClosed: boolean;
  hasTrips: boolean;
  displayData: PayrollRecord[];
  weekSummary: WeekSummary;
  totalNomina: number;
  driversWithGoal: number;
  goalPct: number;
  totalBilled: number;
  avgPerHour: number;
  previousWeekHours: Map<string, number>;
  onGoToClosed: () => void;
  onSelectRow: (row: PayrollRecord | null) => void;
}

export default function PayrollDraftView({
  week,
  isCurrentWeekClosed,
  hasTrips,
  displayData,
  weekSummary,
  totalNomina,
  driversWithGoal,
  goalPct,
  totalBilled,
  avgPerHour,
  previousWeekHours,
  onGoToClosed,
  onSelectRow,
}: PayrollDraftViewProps) {
  if (isCurrentWeekClosed) {
    return (
      <EmptyState
        icon={CheckCircle}
        title="Semana cerrada"
        description={`La nómina de ${week.label} ya fue cerrada. Revisa los resultados en la pestaña Cerradas.`}
      >
        <button
          onClick={onGoToClosed}
          className="mt-3 px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors duration-150"
        >
          Ver en Cerradas
        </button>
      </EmptyState>
    );
  }

  if (!hasTrips) {
    return (
      <EmptyState
        icon={Upload}
        title="Sin datos de viajes"
        description="Importa viajes desde Carga CSV para ver el cálculo de nómina en vivo."
      />
    );
  }

  return (
    <>
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        <p className="text-sm text-lafa-text-secondary">
          {'Semana: '}
          <span className="text-lafa-text-primary font-medium">
            {week.label}
          </span>
          <span className="ml-2 text-status-alert">(borrador en vivo)</span>
          <span className="ml-2 text-xs text-lafa-text-secondary">
            Cierre auto: dom 20:00 CDMX
          </span>
        </p>
      </div>

      {displayData.length > 0 && (
        <>
          <div className="bg-lafa-accent/10 border border-lafa-accent/20 rounded-xl p-3 mb-4 text-sm text-lafa-text-primary">
            {weekSummary.narrative}
          </div>
          <PayrollSummaryCards
            totalNomina={totalNomina}
            driversWithGoal={driversWithGoal}
            totalDrivers={displayData.length}
            goalPct={goalPct}
            totalBilled={totalBilled}
            avgPerHour={avgPerHour}
            totalBase={weekSummary.totalBase}
            totalBonus={weekSummary.totalBonus}
            totalOvertime={weekSummary.totalOvertime}
            totalSupport={weekSummary.totalSupport}
          />
        </>
      )}

      <PayrollTable
        data={displayData}
        tab="actual"
        totalNomina={totalNomina}
        previousWeekHours={previousWeekHours}
        onSelectRow={onSelectRow}
      />
    </>
  );
}
