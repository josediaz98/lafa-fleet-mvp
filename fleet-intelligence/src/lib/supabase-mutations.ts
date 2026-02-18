import { supabase } from './supabase';
import type { Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '../context/AppContext';

// ---- Shifts ----

export async function persistCheckIn(shift: Shift, createdBy: string) {
  if (!supabase) return;
  await supabase.from('shifts').insert({
    id: shift.id,
    driver_id: shift.driverId,
    vehicle_id: shift.vehicleId,
    check_in: shift.checkIn,
    status: 'en_turno',
    created_by: createdBy,
  });
}

export async function persistCheckOut(shiftId: string, checkOut: string, hoursWorked: number) {
  if (!supabase) return;
  await supabase.from('shifts').update({
    check_out: checkOut,
    hours_worked: hoursWorked,
    status: 'completado',
  }).eq('id', shiftId);
}

export async function persistVehicleStatus(vehicleId: string, status: string) {
  if (!supabase) return;
  await supabase.from('vehicles').update({ status }).eq('id', vehicleId);
}

// ---- Drivers ----

export async function persistNewDriver(driver: Driver) {
  if (!supabase) return;
  await supabase.from('drivers').insert({
    id: driver.id,
    full_name: driver.fullName,
    didi_driver_id: driver.didiDriverId,
    center_id: driver.centerId,
    default_shift: driver.defaultShift,
    start_date: driver.startDate,
    status: driver.status,
  });
}

export async function persistUpdateDriver(driver: Driver) {
  if (!supabase) return;
  await supabase.from('drivers').update({
    full_name: driver.fullName,
    didi_driver_id: driver.didiDriverId,
    center_id: driver.centerId,
    default_shift: driver.defaultShift,
    start_date: driver.startDate,
  }).eq('id', driver.id);
}

export async function persistDeactivateDriver(driverId: string) {
  if (!supabase) return;
  await supabase.from('drivers').update({ status: 'inactivo' }).eq('id', driverId);
}

// ---- Vehicles ----

export async function persistNewVehicle(vehicle: Vehicle) {
  if (!supabase) return;
  await supabase.from('vehicles').insert({
    id: vehicle.id,
    plate: vehicle.plate,
    model: vehicle.model,
    oem: vehicle.oem,
    center_id: vehicle.centerId,
    status: vehicle.status,
  });
}

export async function persistUpdateVehicle(vehicle: Vehicle) {
  if (!supabase) return;
  await supabase.from('vehicles').update({
    plate: vehicle.plate,
    model: vehicle.model,
    oem: vehicle.oem,
    center_id: vehicle.centerId,
  }).eq('id', vehicle.id);
}

// ---- CSV Trips ----

/** Convert DD/MM/YYYY to YYYY-MM-DD. */
function fechaToISO(fecha: string): string {
  const [d, m, y] = fecha.split('/');
  return `${y}-${m}-${d}`;
}

export async function persistTrips(
  trips: Trip[],
  didiToDriverId: Map<number, string>,
  uploadedBy: string,
  fileName: string,
) {
  if (!supabase) return;

  // Create csv_uploads record
  const validCount = trips.length;
  const { data: upload } = await supabase.from('csv_uploads').insert({
    filename: fileName,
    uploaded_by: uploadedBy,
    record_count: validCount,
    valid_count: validCount,
    warning_count: 0,
    error_count: 0,
    status: 'procesado',
  }).select('id').single();

  const uploadId = upload?.id;

  // Batch insert trips
  const rows = trips.map(t => ({
    driver_id: didiToDriverId.get(t.driverId) ?? '',
    didi_trip_id: t.tripId,
    date: fechaToISO(t.fecha),
    initial_time: t.horaInicio,
    final_time: t.horaFin,
    cost: t.costo,
    tip: t.propina,
    upload_id: uploadId,
  })).filter(r => r.driver_id !== '');

  if (rows.length > 0) {
    await supabase.from('trips').insert(rows);
  }
}

// ---- Payroll ----

export async function persistClosePayroll(records: PayrollRecord[], closedById: string) {
  if (!supabase) return;
  const rows = records.map(r => ({
    driver_id: r.driverId,
    week_start: r.weekStart,
    week_end: r.weekEnd,
    hours_worked: r.hoursWorked,
    total_billed: r.totalBilled,
    tips_total: 0,
    hours_threshold: r.hoursThreshold,
    revenue_threshold: r.revenueThreshold,
    goal_met: r.goalMet,
    base_salary: r.baseSalary,
    productivity_bonus: r.productivityBonus,
    overtime_pay: r.overtimePay,
    total_pay: r.totalPay,
    status: 'cerrado',
    version: r.version ?? 1,
    ai_explanation: r.aiExplanation ?? null,
    closed_by: closedById,
    closed_at: r.closedAt,
  }));
  await supabase.from('weekly_payroll').insert(rows);
}

export async function persistRerunPayroll(
  weekStart: string,
  newRecords: PayrollRecord[],
  closedById: string,
) {
  if (!supabase) return;
  // Mark previous version as superseded
  await supabase.from('weekly_payroll')
    .update({ status: 'superseded' })
    .eq('week_start', weekStart)
    .eq('status', 'cerrado');

  // Insert new version
  await persistClosePayroll(newRecords, closedById);
}

// ---- Users ----

export async function persistNewUser(user: User, _password: string) {
  if (!supabase) return;
  // Create Supabase auth user via admin API is not available client-side
  // For MVP: create profile directly (auth user must be created in Dashboard)
  await supabase.from('profiles').insert({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    center_id: user.centerId,
    status: user.status,
  });
}

export async function persistUpdateUser(user: User) {
  if (!supabase) return;
  await supabase.from('profiles').update({
    name: user.name,
    email: user.email,
    role: user.role,
    center_id: user.centerId,
  }).eq('id', user.id);
}

export async function persistDeactivateUser(userId: string) {
  if (!supabase) return;
  await supabase.from('profiles').update({ status: 'inactivo' }).eq('id', userId);
}
