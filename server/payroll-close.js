// Server-side payroll close logic
// Business rules imported from shared/payroll-rules.js (single source of truth).

const { randomUUID } = require('crypto');
const {
  BASE_SALARY,
  GOAL_THRESHOLD,
  SUPPORT_AMOUNT,
  OVERTIME_THRESHOLD_HOURS,
  prorateThresholds,
  computeProductivityBonus,
  computeOvertimePay,
  isTripInWeek,
  generateExplanation,
} = require('../shared/payroll-rules');

// --- Week bounds ---

/** Compute current Mon-Sun week bounds in CDMX timezone. */
function getWeekBounds() {
  const now = new Date();
  // W3: Use Intl.DateTimeFormat for reliable cross-platform timezone conversion
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const parts = formatter.formatToParts(now);
  const year = Number(parts.find((p) => p.type === 'year').value);
  const month = Number(parts.find((p) => p.type === 'month').value) - 1;
  const dayOfMonth = Number(parts.find((p) => p.type === 'day').value);
  const cdmx = new Date(year, month, dayOfMonth);
  const day = cdmx.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(cdmx);
  weekStart.setDate(cdmx.getDate() + mondayOffset);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const fmt = (d) =>
    d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  return {
    label: `${fmt(weekStart)} – ${fmt(weekEnd)}, ${weekStart.getFullYear()}`,
    start: weekStart.toISOString().slice(0, 10),
    end: weekEnd.toISOString().slice(0, 10),
  };
}

// --- Decomposed steps ---

/**
 * Fetch all data needed for payroll calculation from Supabase.
 * @returns {{ drivers, trips, shifts, previousWeekHours: Map }}
 */
async function fetchPayrollInputs(supabase, start, end) {
  // Active drivers
  const { data: drivers, error: driversErr } = await supabase
    .from('drivers')
    .select('id, full_name, didi_driver_id, center_id, default_shift, start_date, status')
    .eq('status', 'activo');
  if (driversErr) throw new Error(`Failed to fetch drivers: ${driversErr.message}`);

  // Trips in date range
  const { data: trips, error: tripsErr } = await supabase
    .from('trips')
    .select('id, driver_id, didi_trip_id, date, initial_time, final_time, cost, tip')
    .gte('date', start)
    .lte('date', end)
    .limit(50000);
  if (tripsErr) throw new Error(`Failed to fetch trips: ${tripsErr.message}`);

  // Completed shifts in date range
  const { data: shifts, error: shiftsErr } = await supabase
    .from('shifts')
    .select('id, driver_id, hours_worked, status')
    .eq('status', 'completado')
    .gte('check_in', `${start}T00:00:00`)
    .lte('check_in', `${end}T23:59:59`)
    .limit(50000);
  if (shiftsErr) throw new Error(`Failed to fetch shifts: ${shiftsErr.message}`);

  // Previous week payroll for overtime eligibility
  const prevStart = new Date(start);
  prevStart.setDate(prevStart.getDate() - 7);
  const prevStartStr = prevStart.toISOString().slice(0, 10);
  const { data: prevPayroll } = await supabase
    .from('weekly_payroll')
    .select('driver_id, hours_worked')
    .eq('week_start', prevStartStr)
    .eq('status', 'cerrado');

  const previousWeekHours = new Map();
  if (prevPayroll) {
    for (const p of prevPayroll) {
      previousWeekHours.set(p.driver_id, Number(p.hours_worked));
    }
  }

  return {
    drivers: drivers || [],
    trips: trips || [],
    shifts: shifts || [],
    previousWeekHours,
  };
}

/**
 * Build payroll records from raw inputs (pure — no I/O).
 * @returns {object[]} Array of DB-ready payroll row objects.
 */
function buildPayrollRecords(drivers, trips, shifts, previousWeekHours, week) {
  const { start, end, label } = week;

  // Aggregate shift hours per driver
  const hoursByDriver = new Map();
  for (const s of shifts) {
    if (s.hours_worked) {
      hoursByDriver.set(s.driver_id, (hoursByDriver.get(s.driver_id) ?? 0) + s.hours_worked);
    }
  }

  const weekStartDate = new Date(start);
  const weekEndDate = new Date(end);
  const records = [];

  for (const driver of drivers) {
    const driverTrips = trips.filter((t) => {
      if (t.driver_id !== driver.id) return false;
      return isTripInWeek(t.date, t.initial_time, start, end);
    });

    const totalBilled = Math.round(driverTrips.reduce((sum, t) => sum + Number(t.cost), 0) * 100) / 100;
    const tipsTotal = Math.round(driverTrips.reduce((sum, t) => sum + Number(t.tip), 0) * 100) / 100;
    const hoursWorked = hoursByDriver.get(driver.id) ?? 0;

    const { hoursThreshold, revenueThreshold } = prorateThresholds(
      driver.start_date, weekStartDate, weekEndDate,
    );

    const goalMet = hoursWorked >= hoursThreshold && totalBilled >= revenueThreshold;
    const baseSalary = goalMet ? BASE_SALARY : 0;
    const productivityBonus = computeProductivityBonus(totalBilled, revenueThreshold, goalMet);
    const prevWeekHours = previousWeekHours.get(driver.id) ?? 0;
    const overtimePay = computeOvertimePay(hoursWorked, goalMet, prevWeekHours);
    const totalPay = goalMet ? baseSalary + productivityBonus + overtimePay : SUPPORT_AMOUNT;

    const aiExplanation = generateExplanation({
      driverName: driver.full_name,
      hoursWorked, totalBilled, hoursThreshold, revenueThreshold,
      goalMet, baseSalary, productivityBonus, overtimePay, totalPay,
    });

    records.push({
      id: randomUUID(),
      driver_id: driver.id,
      week_start: start,
      week_end: end,
      hours_worked: hoursWorked,
      total_billed: totalBilled,
      tips_total: tipsTotal,
      hours_threshold: hoursThreshold,
      revenue_threshold: revenueThreshold,
      goal_met: goalMet,
      base_salary: baseSalary,
      productivity_bonus: productivityBonus,
      overtime_pay: overtimePay,
      total_pay: totalPay,
      status: 'cerrado',
      version: 1,
      ai_explanation: aiExplanation,
      closed_by: null, // system auto-close
      closed_at: new Date().toISOString(),
    });
  }

  return records;
}

// --- Main orchestrator ---

/**
 * Close the current payroll week. Idempotent — skips if already closed.
 * @param {import('@supabase/supabase-js').SupabaseClient} supabase - Admin client
 * @returns {Promise<{ status: 'closed', count: number, weekLabel: string }
 *   | { status: 'skipped', reason: string, weekLabel: string }
 *   | { status: 'error', reason: string }>}
 */
async function closePayrollWeek(supabase) {
  if (!supabase) {
    return { status: 'error', reason: 'Supabase not configured' };
  }

  const week = getWeekBounds();

  // 1. Idempotency check
  const { data: existing } = await supabase
    .from('weekly_payroll')
    .select('id')
    .eq('week_start', week.start)
    .eq('status', 'cerrado')
    .limit(1);

  if (existing && existing.length > 0) {
    return { status: 'skipped', reason: `Week ${week.label} already closed`, weekLabel: week.label };
  }

  // 2. Fetch all inputs
  const { drivers, trips, shifts, previousWeekHours } = await fetchPayrollInputs(
    supabase, week.start, week.end,
  );

  if (drivers.length === 0) {
    return { status: 'skipped', reason: 'No active drivers found', weekLabel: week.label };
  }

  // 3. Calculate payroll records
  const records = buildPayrollRecords(drivers, trips, shifts, previousWeekHours, week);

  // 4. Insert into DB
  if (records.length > 0) {
    const { error: insertErr } = await supabase
      .from('weekly_payroll')
      .insert(records);
    if (insertErr) throw new Error(`Failed to insert payroll records: ${insertErr.message}`);
  }

  return { status: 'closed', count: records.length, weekLabel: week.label };
}

module.exports = { closePayrollWeek };
