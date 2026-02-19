import type { PayrollRecord } from '@/types';
import { GOAL_THRESHOLD, OVERTIME_THRESHOLD_HOURS, SUPPORT_AMOUNT } from './payroll';
import { formatMXN } from '@/lib/format';
import { PALETTE } from '@/lib/status-map';

export interface PayrollFlag {
  type: 'near-threshold' | 'first-week' | 'prorated' | 'no-overtime-eligibility';
  label: string;
  color: string;
}

const NEAR_THRESHOLD_MXN = 500;

export function getPayrollFlags(record: PayrollRecord, previousWeekHours?: number): PayrollFlag[] {
  const flags: PayrollFlag[] = [];
  const isProrated = record.hoursThreshold < OVERTIME_THRESHOLD_HOURS || record.revenueThreshold < GOAL_THRESHOLD;

  // Near-threshold: missed by a small amount (independent checks for each dimension)
  if (!record.goalMet) {
    const billingGap = record.revenueThreshold - record.totalBilled;
    const hoursGap = record.hoursThreshold - record.hoursWorked;

    if (billingGap > 0 && billingGap <= NEAR_THRESHOLD_MXN) {
      flags.push({
        type: 'near-threshold',
        label: `A ${formatMXN(billingGap)} de la meta`,
        color: PALETTE.alert,
      });
    }
    if (hoursGap > 0 && hoursGap <= 2) {
      flags.push({
        type: 'near-threshold',
        label: `A ${hoursGap}h de la meta`,
        color: PALETTE.alert,
      });
    }
  }

  // Prorated (first-week driver)
  if (isProrated) {
    flags.push({
      type: 'prorated',
      label: `Prorrateado: meta ${record.hoursThreshold}h / ${formatMXN(record.revenueThreshold)}`,
      color: PALETTE.active,
    });
  }

  // No overtime eligibility (previous week < 40h)
  if (record.goalMet && record.hoursWorked > OVERTIME_THRESHOLD_HOURS && (previousWeekHours === undefined || previousWeekHours < OVERTIME_THRESHOLD_HOURS)) {
    flags.push({
      type: 'no-overtime-eligibility',
      label: 'Sin elegibilidad overtime (sem. anterior)',
      color: PALETTE.purple,
    });
  }

  return flags;
}

export interface PayrollWeekSummary {
  totalDrivers: number;
  driversWithGoal: number;
  totalPayroll: number;
  totalBase: number;
  totalBonus: number;
  totalOvertime: number;
  totalSupport: number;
  narrative: string;
}

export function generateWeekSummary(records: PayrollRecord[]): PayrollWeekSummary {
  const totalDrivers = records.length;
  const driversWithGoal = records.filter(r => r.goalMet).length;
  const totalPayroll = records.reduce((s, r) => s + r.totalPay, 0);
  const totalBase = records.reduce((s, r) => s + r.baseSalary, 0);
  const totalBonus = records.reduce((s, r) => s + r.productivityBonus, 0);
  const totalOvertime = records.reduce((s, r) => s + r.overtimePay, 0);
  const totalSupport = records.filter(r => !r.goalMet).length * SUPPORT_AMOUNT;

  const narrative = `${driversWithGoal} de ${totalDrivers} conductores alcanzaron la meta. Nómina total: ${formatMXN(totalPayroll)}. Distribución: Base ${formatMXN(totalBase)}, Bonos ${formatMXN(totalBonus)}, Overtime ${formatMXN(totalOvertime)}, Apoyo ${formatMXN(totalSupport)}.`;

  return {
    totalDrivers,
    driversWithGoal,
    totalPayroll,
    totalBase,
    totalBonus,
    totalOvertime,
    totalSupport,
    narrative,
  };
}
