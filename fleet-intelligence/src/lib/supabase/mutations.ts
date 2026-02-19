import { supabase } from './client';
import { parseFechaToISO } from '@/lib/date-utils';
import type { Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';

type MutationResult = { error: Error | null };

// ---- Shifts ----

export async function persistCheckIn(shift: Shift, createdBy: string): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('shifts').insert({
    id: shift.id,
    driver_id: shift.driverId,
    vehicle_id: shift.vehicleId,
    check_in: shift.checkIn,
    status: 'en_turno',
    created_by: createdBy,
  });
  return { error: error ? new Error(error.message) : null };
}

export async function persistCheckOut(shiftId: string, checkOut: string, hoursWorked: number): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('shifts').update({
    check_out: checkOut,
    hours_worked: hoursWorked,
    status: 'completado',
  }).eq('id', shiftId);
  return { error: error ? new Error(error.message) : null };
}

export async function persistVehicleStatus(vehicleId: string, status: string): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('vehicles').update({ status }).eq('id', vehicleId);
  return { error: error ? new Error(error.message) : null };
}

// ---- Drivers ----

export async function persistNewDriver(driver: Driver): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('drivers').insert({
    id: driver.id,
    full_name: driver.fullName,
    didi_driver_id: driver.didiDriverId,
    center_id: driver.centerId,
    default_shift: driver.defaultShift,
    start_date: driver.startDate,
    status: driver.status,
  });
  return { error: error ? new Error(error.message) : null };
}

export async function persistUpdateDriver(driver: Driver): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('drivers').update({
    full_name: driver.fullName,
    didi_driver_id: driver.didiDriverId,
    center_id: driver.centerId,
    default_shift: driver.defaultShift,
    start_date: driver.startDate,
  }).eq('id', driver.id);
  return { error: error ? new Error(error.message) : null };
}

export async function persistDeactivateDriver(driverId: string): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('drivers').update({ status: 'inactivo' }).eq('id', driverId);
  return { error: error ? new Error(error.message) : null };
}

// ---- Vehicles ----

export async function persistNewVehicle(vehicle: Vehicle): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('vehicles').insert({
    id: vehicle.id,
    plate: vehicle.plate,
    model: vehicle.model,
    oem: vehicle.oem,
    center_id: vehicle.centerId,
    status: vehicle.status,
  });
  return { error: error ? new Error(error.message) : null };
}

export async function persistUpdateVehicle(vehicle: Vehicle): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('vehicles').update({
    plate: vehicle.plate,
    model: vehicle.model,
    oem: vehicle.oem,
    center_id: vehicle.centerId,
  }).eq('id', vehicle.id);
  return { error: error ? new Error(error.message) : null };
}

// ---- CSV Trips ----

export async function persistTrips(
  trips: Trip[],
  didiToDriverId: Map<number, string>,
  uploadedBy: string,
  fileName: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };

  // Create csv_uploads record
  const validCount = trips.length;
  const { data: upload, error: uploadError } = await supabase.from('csv_uploads').insert({
    filename: fileName,
    uploaded_by: uploadedBy,
    record_count: validCount,
    valid_count: validCount,
    warning_count: 0,
    error_count: 0,
    status: 'procesado',
  }).select('id').single();

  if (uploadError) return { error: new Error(uploadError.message) };

  const uploadId = upload?.id;

  // Batch insert trips
  const rows = trips.map(t => ({
    driver_id: didiToDriverId.get(t.driverId) ?? '',
    didi_trip_id: t.tripId,
    date: parseFechaToISO(t.fecha),
    initial_time: t.horaInicio,
    final_time: t.horaFin,
    cost: t.costo,
    tip: t.propina,
    upload_id: uploadId,
  })).filter(r => r.driver_id !== '');

  if (rows.length === 0 && trips.length > 0) {
    return { error: new Error(`0 de ${trips.length} viajes pudieron mapearse a conductores`) };
  }

  if (rows.length > 0) {
    const { error } = await supabase.from('trips').insert(rows);
    if (error) return { error: new Error(error.message) };
  }
  return { error: null };
}

// ---- Payroll ----

export async function persistClosePayroll(records: PayrollRecord[], closedById: string): Promise<MutationResult> {
  if (!supabase) return { error: null };
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
  const { error } = await supabase.from('weekly_payroll').insert(rows);
  return { error: error ? new Error(error.message) : null };
}

export async function persistRerunPayroll(
  weekStart: string,
  newRecords: PayrollRecord[],
  closedById: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  // Mark previous version as superseded
  const { error: updateError } = await supabase.from('weekly_payroll')
    .update({ status: 'superseded' })
    .eq('week_start', weekStart)
    .eq('status', 'cerrado');

  if (updateError) return { error: new Error(updateError.message) };

  // Insert new version
  return persistClosePayroll(newRecords, closedById);
}

// ---- Users ----

type InviteResult = { userId?: string; error: Error | null };

export async function persistNewUser(user: User, _password: string): Promise<InviteResult> {
  if (!supabase) return { error: null };

  // Supabase mode: call Express invite endpoint (creates auth user + profile)
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;
  if (!token) return { error: new Error('No session token available') };

  const res = await fetch('/api/invite-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      email: user.email,
      name: user.name,
      role: user.role,
      centerId: user.centerId,
    }),
  });

  const data = await res.json();
  if (!res.ok) return { error: new Error(data.error || 'Invite failed') };
  return { userId: data.userId, error: null };
}

export async function persistUpdateUser(user: User): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('profiles').update({
    name: user.name,
    email: user.email,
    role: user.role,
    center_id: user.centerId,
  }).eq('id', user.id);
  return { error: error ? new Error(error.message) : null };
}

export async function persistDeactivateUser(userId: string): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('profiles').update({ status: 'inactivo' }).eq('id', userId);
  return { error: error ? new Error(error.message) : null };
}
