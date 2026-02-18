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

function fmtMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateExplanation(record: PayrollSummary): string {
  const { driverName, hoursWorked, totalBilled, hoursThreshold, revenueThreshold, goalMet, productivityBonus, overtimePay, totalPay } = record;
  const avgPerHour = hoursWorked > 0 ? Math.round(totalBilled / hoursWorked) : 0;
  const isProrated = hoursThreshold < 40 || revenueThreshold < 6000;

  if (goalMet) {
    let text = `${driverName} alcanzó la meta semanal con ${fmtMXN(totalBilled)} facturados en ${hoursWorked}h de trabajo (${fmtMXN(avgPerHour)}/hora).`;

    if (isProrated) {
      text += ` Meta prorrateada: ${hoursThreshold}h y ${fmtMXN(revenueThreshold)}.`;
    }

    if (productivityBonus > 0) {
      text += ` Ganó un bono de productividad de ${fmtMXN(productivityBonus)} por superar la meta de ${fmtMXN(revenueThreshold)}.`;
    }

    if (overtimePay > 0) {
      const otHours = overtimePay / 50;
      text += ` Incluye pago de horas extra: ${otHours}h adicionales por ${fmtMXN(overtimePay)}.`;
    }

    text += ` Pago total: ${fmtMXN(totalPay)}.`;
    return text;
  }

  const hoursFailed = hoursWorked < hoursThreshold;
  const billingFailed = totalBilled < revenueThreshold;
  const metaHoras = `${hoursThreshold}h`;
  const metaFacturacion = fmtMXN(revenueThreshold);

  let reason: string;
  if (hoursFailed && billingFailed) {
    reason = `registró ${hoursWorked}h trabajadas (meta: ${metaHoras}) y ${fmtMXN(totalBilled)} en facturación (meta: ${metaFacturacion})`;
  } else if (hoursFailed) {
    reason = `registró solo ${hoursWorked}h trabajadas (meta: ${metaHoras}), aunque su facturación de ${fmtMXN(totalBilled)} superó el mínimo`;
  } else {
    reason = `facturó ${fmtMXN(totalBilled)} (meta: ${metaFacturacion}), aunque cumplió las ${hoursWorked}h requeridas`;
  }

  let text = `${driverName} no alcanzó la meta semanal: ${reason}. Recibe apoyo económico de $1,000 MXN.`;
  if (isProrated) {
    text += ` (Meta prorrateada por ingreso a mitad de semana.)`;
  } else {
    text += ` Se recomienda revisar factores que afectaron su rendimiento.`;
  }
  return text;
}
