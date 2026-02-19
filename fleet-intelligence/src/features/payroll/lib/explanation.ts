import { formatMXN } from '@/lib/format';
import { OVERTIME_THRESHOLD_HOURS, OVERTIME_RATE_PER_HOUR, GOAL_THRESHOLD } from './payroll';

interface PayrollSummary {
  driverName: string;
  hoursWorked: number;
  totalBilled: number;
  hoursThreshold: number;
  revenueThreshold: number;
  goalMet: boolean;
  baseSalary: number;
  productivityBonus: number;
  overtimePay: number;
  totalPay: number;
}

export function generateExplanation(record: PayrollSummary): string {
  const { driverName, hoursWorked, totalBilled, hoursThreshold, revenueThreshold, goalMet, productivityBonus, overtimePay, totalPay } = record;
  const avgPerHour = hoursWorked > 0 ? Math.round(totalBilled / hoursWorked) : 0;
  const isProrated = hoursThreshold < OVERTIME_THRESHOLD_HOURS || revenueThreshold < GOAL_THRESHOLD;

  if (goalMet) {
    let text = `${driverName} alcanzó la meta semanal con ${formatMXN(totalBilled)} facturados en ${hoursWorked}h de trabajo (${formatMXN(avgPerHour)}/hora).`;

    if (isProrated) {
      text += ` Meta prorrateada: ${hoursThreshold}h y ${formatMXN(revenueThreshold)}.`;
    }

    if (productivityBonus > 0) {
      text += ` Ganó un bono de productividad de ${formatMXN(productivityBonus)} por superar la meta de ${formatMXN(revenueThreshold)}.`;
    }

    if (overtimePay > 0) {
      const otHours = overtimePay / OVERTIME_RATE_PER_HOUR;
      text += ` Incluye pago de horas extra: ${otHours}h adicionales por ${formatMXN(overtimePay)}.`;
    }

    text += ` Pago total: ${formatMXN(totalPay)}.`;
    return text;
  }

  const hoursFailed = hoursWorked < hoursThreshold;
  const billingFailed = totalBilled < revenueThreshold;
  const metaHoras = `${hoursThreshold}h`;
  const metaFacturacion = formatMXN(revenueThreshold);

  let reason: string;
  if (hoursFailed && billingFailed) {
    reason = `registró ${hoursWorked}h trabajadas (meta: ${metaHoras}) y ${formatMXN(totalBilled)} en facturación (meta: ${metaFacturacion})`;
  } else if (hoursFailed) {
    reason = `registró solo ${hoursWorked}h trabajadas (meta: ${metaHoras}), aunque su facturación de ${formatMXN(totalBilled)} superó el mínimo`;
  } else {
    reason = `facturó ${formatMXN(totalBilled)} (meta: ${metaFacturacion}), aunque cumplió las ${hoursWorked}h requeridas`;
  }

  let text = `${driverName} no alcanzó la meta semanal: ${reason}. Recibe apoyo económico de $1,000 MXN.`;
  if (isProrated) {
    text += ` (Meta prorrateada por ingreso a mitad de semana.)`;
  } else {
    text += ` Se recomienda revisar factores que afectaron su rendimiento.`;
  }
  return text;
}
