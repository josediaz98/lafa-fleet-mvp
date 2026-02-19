import { useState } from 'react';
import type { Driver, PayrollRecord, Shift } from '@/types';
import DriverDataTab from './components/DriverDataTab';
import DriverPayrollTab from './components/DriverPayrollTab';
import DriverShiftTab from './components/DriverShiftTab';

type DriverPanelTab = 'datos' | 'nomina' | 'turnos';

interface DriverDetailPanelProps {
  driver: Driver;
  payrollHistory: PayrollRecord[];
  shiftHistory: Shift[];
  isAdmin: boolean;
  onEdit: (updated: Driver) => void;
  onDeactivate: () => void;
}

const PANEL_TABS: { key: DriverPanelTab; label: string }[] = [
  { key: 'datos', label: 'Datos' },
  { key: 'nomina', label: 'Nómina' },
  { key: 'turnos', label: 'Turnos' },
];

export default function DriverDetailPanel({
  driver,
  payrollHistory,
  shiftHistory,
  isAdmin,
  onEdit,
  onDeactivate,
}: DriverDetailPanelProps) {
  const [panelTab, setPanelTab] = useState<DriverPanelTab>('datos');

  return (
    <div>
      <div className="flex gap-1 border-b border-lafa-border mb-5">
        {PANEL_TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setPanelTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              panelTab === t.key ? 'text-lafa-accent' : 'text-lafa-text-secondary hover:text-lafa-text-primary'
            }`}
          >
            {t.label}
            {panelTab === t.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />}
          </button>
        ))}
      </div>

      {panelTab === 'datos' && (
        <DriverDataTab
          driver={driver}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDeactivate={onDeactivate}
        />
      )}

      {panelTab === 'nomina' && (
        <DriverPayrollTab payrollHistory={payrollHistory} />
      )}

      {panelTab === 'turnos' && (
        <DriverShiftTab shiftHistory={shiftHistory} />
      )}
    </div>
  );
}
