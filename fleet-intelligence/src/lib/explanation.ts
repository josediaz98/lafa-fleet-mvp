interface PayrollSummary {
  driverName: string;
  hoursWorked: number;
  totalBilled: number;
  goalMet: boolean;
  baseSalary: number;
  productivityBonus: number;
  overtimePay: number;
  totalPay: number;
}

function fmtMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateExplanation(record: PayrollSummary): string {
  const { driverName, hoursWorked, totalBilled, goalMet, productivityBonus, overtimePay, totalPay } = record;
  const avgPerHour = hoursWorked > 0 ? Math.round(totalBilled / hoursWorked) : 0;

  if (goalMet) {
    let text = `${driverName} alcanzó la meta semanal con ${fmtMXN(totalBilled)} facturados en ${hoursWorked}h de trabajo (${fmtMXN(avgPerHour)}/hora).`;

    if (productivityBonus > 0) {
      text += ` Ganó un bono de productividad de ${fmtMXN(productivityBonus)} por superar la meta de $6,000 MXN.`;
    }

    if (overtimePay > 0) {
      const otHours = overtimePay / 50;
      text += ` Incluye pago de horas extra: ${otHours}h adicionales por ${fmtMXN(overtimePay)}.`;
    }

    text += ` Pago total: ${fmtMXN(totalPay)}.`;
    return text;
  }

  const hoursFailed = hoursWorked < 40;
  const billingFailed = totalBilled < 6000;

  let reason: string;
  if (hoursFailed && billingFailed) {
    reason = `registró ${hoursWorked}h trabajadas (meta: 40h) y ${fmtMXN(totalBilled)} en facturación (meta: $6,000 MXN)`;
  } else if (hoursFailed) {
    reason = `registró solo ${hoursWorked}h trabajadas (meta: 40h), aunque su facturación de ${fmtMXN(totalBilled)} superó el mínimo`;
  } else {
    reason = `facturó ${fmtMXN(totalBilled)} (meta: $6,000 MXN), aunque cumplió las ${hoursWorked}h requeridas`;
  }

  return `${driverName} no alcanzó la meta semanal: ${reason}. Recibe apoyo económico de $1,000 MXN. Se recomienda revisar factores que afectaron su rendimiento.`;
}
