// shared/payroll-rules.js
// Single source of truth for payroll business rules.
//
// Consumed by:
//   - fleet-intelligence/src/features/payroll/lib/payroll.ts (frontend)
//   - fleet-intelligence/src/features/payroll/lib/explanation.ts (frontend)
//   - server/payroll-close.js (backend auto-close cron)
//
// All functions are pure (no I/O, no framework deps). Parameters use primitives
// so both TypeScript (frontend) and plain JS (backend) can call them directly.

// --- Constants ---

const BASE_SALARY = 2500;
const GOAL_THRESHOLD = 6000;
const SUPPORT_AMOUNT = 1000;
const PRODUCTIVITY_UNIT = 500;
const PRODUCTIVITY_BONUS_PER_UNIT = 100;
const OVERTIME_THRESHOLD_HOURS = 40;
const OVERTIME_RATE_PER_HOUR = 50;
const OVERTIME_CAP_HOURS = 8;
const WORKING_DAYS_PER_WEEK = 5;

// --- Formatting ---

function formatMXN(amount) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// --- Pure calculation functions ---

/** Count weekdays (Mon-Fri) between two dates, inclusive. Uses UTC. */
function countWeekdays(start, end) {
  let count = 0;
  const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
  const endNorm = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate()));
  while (d <= endNorm) {
    if (d.getUTCDay() !== 0 && d.getUTCDay() !== 6) count++;
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return count;
}

/**
 * Prorate thresholds for drivers who started mid-week.
 * @param {string} driverStartDate - ISO date string (YYYY-MM-DD)
 * @param {Date} weekStartDate
 * @param {Date} weekEndDate
 */
function prorateThresholds(driverStartDate, weekStartDate, weekEndDate) {
  let hoursThreshold = OVERTIME_THRESHOLD_HOURS;
  let revenueThreshold = GOAL_THRESHOLD;
  const start = new Date(driverStartDate);

  if (start > weekStartDate && start <= weekEndDate) {
    const daysWorked = Math.max(1, countWeekdays(start, weekEndDate));
    const prorateFactor = Math.min(daysWorked / WORKING_DAYS_PER_WEEK, 1);
    hoursThreshold = Math.round(OVERTIME_THRESHOLD_HOURS * prorateFactor * 10) / 10;
    revenueThreshold = Math.round(GOAL_THRESHOLD * prorateFactor);
  }

  return { hoursThreshold, revenueThreshold };
}

function computeProductivityBonus(totalBilled, revenueThreshold, goalMet) {
  if (!goalMet) return 0;
  const excess = totalBilled - revenueThreshold;
  if (excess <= 0) return 0;
  const units = Math.floor(excess / PRODUCTIVITY_UNIT);
  return units * PRODUCTIVITY_BONUS_PER_UNIT;
}

function computeOvertimePay(hoursWorked, goalMet, previousWeekHours) {
  if (
    !goalMet ||
    hoursWorked <= OVERTIME_THRESHOLD_HOURS ||
    previousWeekHours < OVERTIME_THRESHOLD_HOURS
  ) {
    return 0;
  }
  const otHours = Math.min(hoursWorked - OVERTIME_THRESHOLD_HOURS, OVERTIME_CAP_HOURS);
  return Math.round(otHours * OVERTIME_RATE_PER_HOUR);
}

/**
 * Check if a trip falls within the payroll week (primitive params).
 * Sunday 20:00 cutoff: trips starting at/after 20:00 on weekEnd are excluded.
 * @param {string} tripDate - YYYY-MM-DD
 * @param {string} tripStartTime - HH:MM
 * @param {string} weekStart - YYYY-MM-DD
 * @param {string} weekEnd - YYYY-MM-DD
 */
function isTripInWeek(tripDate, tripStartTime, weekStart, weekEnd) {
  if (tripDate < weekStart || tripDate > weekEnd) return false;
  if (tripDate === weekEnd && tripStartTime) {
    const [h, m] = tripStartTime.split(':').map(Number);
    const startMinutes = h * 60 + (m || 0);
    if (startMinutes >= 1200) return false;
  }
  return true;
}

/**
 * Generate AI explanation for a payroll record (Spanish).
 * @param {object} record - Must include: driverName, hoursWorked, totalBilled,
 *   hoursThreshold, revenueThreshold, goalMet, productivityBonus, overtimePay, totalPay
 */
function generateExplanation(record) {
  const {
    driverName, hoursWorked, totalBilled,
    hoursThreshold, revenueThreshold,
    goalMet, productivityBonus, overtimePay, totalPay,
  } = record;
  const avgPerHour = hoursWorked > 0 ? Math.round(totalBilled / hoursWorked) : 0;
  const isProrated =
    hoursThreshold < OVERTIME_THRESHOLD_HOURS || revenueThreshold < GOAL_THRESHOLD;

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

  let reason;
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

module.exports = {
  // Constants
  BASE_SALARY,
  GOAL_THRESHOLD,
  SUPPORT_AMOUNT,
  PRODUCTIVITY_UNIT,
  PRODUCTIVITY_BONUS_PER_UNIT,
  OVERTIME_THRESHOLD_HOURS,
  OVERTIME_RATE_PER_HOUR,
  OVERTIME_CAP_HOURS,
  WORKING_DAYS_PER_WEEK,
  // Functions
  formatMXN,
  countWeekdays,
  prorateThresholds,
  computeProductivityBonus,
  computeOvertimePay,
  isTripInWeek,
  generateExplanation,
};
