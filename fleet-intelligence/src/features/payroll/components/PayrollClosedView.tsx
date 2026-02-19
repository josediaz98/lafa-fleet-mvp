import SearchableSelect from '@/components/ui/SearchableSelect';
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

interface PayrollClosedViewProps {
  weekOptions: string[];
  selectedWeek: string;
  setSelectedWeek: (week: string) => void;
  displayData: PayrollRecord[];
  weekSummary: WeekSummary;
  totalNomina: number;
  driversWithGoal: number;
  goalPct: number;
  totalBilled: number;
  avgPerHour: number;
  previousWeekHours: Map<string, number>;
  onSelectRow: (row: PayrollRecord | null) => void;
}

export default function PayrollClosedView({
  weekOptions,
  selectedWeek,
  setSelectedWeek,
  displayData,
  weekSummary,
  totalNomina,
  driversWithGoal,
  goalPct,
  totalBilled,
  avgPerHour,
  previousWeekHours,
  onSelectRow,
}: PayrollClosedViewProps) {
  return (
    <>
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {weekOptions.length > 1 ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-lafa-text-secondary">Semana:</span>
            <SearchableSelect
              options={weekOptions.map((w) => ({ value: w, label: w }))}
              value={selectedWeek}
              onChange={(v) => setSelectedWeek(v)}
              searchable={false}
            />
          </div>
        ) : (
          <p className="text-sm text-lafa-text-secondary">
            {'Semana: '}
            <span className="text-lafa-text-primary font-medium">
              {selectedWeek}
            </span>
          </p>
        )}
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
        tab="cerradas"
        totalNomina={totalNomina}
        previousWeekHours={previousWeekHours}
        onSelectRow={onSelectRow}
      />
    </>
  );
}
