import { supabase } from './client';
import { parseFechaToISO } from '@/lib/date-utils';
import type {
  Driver,
  Vehicle,
  Shift,
  Trip,
  PayrollRecord,
  User,
  VehicleStatus,
} from '@/types';

type MutationResult = { error: Error | null };

// ---- Shifts ----

export async function persistCheckIn(
  shift: Shift,
  createdBy: string,
): Promise<MutationResult> {
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

export async function persistCheckOut(
  shiftId: string,
  checkOut: string,
  hoursWorked: number,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase
    .from('shifts')
    .update({
      check_out: checkOut,
      hours_worked: hoursWorked,
      status: 'completado',
    })
    .eq('id', shiftId);
  return { error: error ? new Error(error.message) : null };
}

export async function persistVehicleStatus(
  vehicleId: string,
  status: VehicleStatus,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase
    .from('vehicles')
    .update({ status })
    .eq('id', vehicleId);
  return { error: error ? new Error(error.message) : null };
}

// C3: Compensating delete for failed check-in atomicity
export async function persistDeleteShift(
  shiftId: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase.from('shifts').delete().eq('id', shiftId);
  return { error: error ? new Error(error.message) : null };
}

// ---- Drivers ----

export async function persistNewDriver(
  driver: Driver,
): Promise<MutationResult> {
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

export async function persistUpdateDriver(
  driver: Driver,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase
    .from('drivers')
    .update({
      full_name: driver.fullName,
      didi_driver_id: driver.didiDriverId,
      center_id: driver.centerId,
      default_shift: driver.defaultShift,
      start_date: driver.startDate,
    })
    .eq('id', driver.id);
  return { error: error ? new Error(error.message) : null };
}

export async function persistDeactivateDriver(
  driverId: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase
    .from('drivers')
    .update({ status: 'inactivo' })
    .eq('id', driverId);
  return { error: error ? new Error(error.message) : null };
}

// ---- Vehicles ----

export async function persistNewVehicle(
  vehicle: Vehicle,
): Promise<MutationResult> {
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

export async function persistUpdateVehicle(
  vehicle: Vehicle,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase
    .from('vehicles')
    .update({
      plate: vehicle.plate,
      model: vehicle.model,
      oem: vehicle.oem,
      center_id: vehicle.centerId,
    })
    .eq('id', vehicle.id);
  return { error: error ? new Error(error.message) : null };
}

// ---- CSV Trips ----

// H5: Accept warning/error counts from CSV parser
export async function persistTrips(
  trips: Trip[],
  didiToDriverId: Map<number, string>,
  uploadedBy: string,
  fileName: string,
  warningCount = 0,
  errorCount = 0,
): Promise<MutationResult> {
  if (!supabase) return { error: null };

  const validCount = trips.length;
  const totalRecords = validCount + errorCount;
  const { data: upload, error: uploadError } = await supabase
    .from('csv_uploads')
    .insert({
      filename: fileName,
      uploaded_by: uploadedBy,
      record_count: totalRecords,
      valid_count: validCount,
      warning_count: warningCount,
      error_count: errorCount,
      status: 'procesado',
    })
    .select('id')
    .single();

  if (uploadError) return { error: new Error(uploadError.message) };

  const uploadId = upload?.id;

  // Batch insert trips
  const rows = trips
    .map((t) => ({
      driver_id: didiToDriverId.get(t.didiDriverId) ?? '',
      didi_trip_id: t.tripId,
      date: parseFechaToISO(t.fecha),
      initial_time: t.horaInicio,
      final_time: t.horaFin,
      cost: t.costo,
      tip: t.propina,
      upload_id: uploadId,
    }))
    .filter((r) => r.driver_id !== '');

  if (rows.length === 0 && trips.length > 0) {
    // ISSUE-3 fix: Mark orphaned upload as 'error' before returning
    if (uploadId) {
      await supabase
        .from('csv_uploads')
        .update({ status: 'error', valid_count: 0 })
        .eq('id', uploadId);
    }
    return {
      error: new Error(
        `0 de ${trips.length} viajes pudieron mapearse a conductores`,
      ),
    };
  }

  if (rows.length > 0) {
    const { error } = await supabase.from('trips').insert(rows);
    if (error) {
      // BUG-3 fix: Mark orphaned upload record as 'error' so it doesn't show as successful
      if (uploadId) {
        await supabase
          .from('csv_uploads')
          .update({ status: 'error', valid_count: 0 })
          .eq('id', uploadId);
      }
      return { error: new Error(error.message) };
    }
  }
  return { error: null };
}

// ---- Payroll ----

// H1: Use tipsTotal from record instead of hardcoded 0
// H2: Include frontend-generated ID in DB insert
export async function persistClosePayroll(
  records: PayrollRecord[],
  closedById: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const rows = records.map((r) => ({
    id: r.id,
    driver_id: r.driverId,
    week_start: r.weekStart,
    week_end: r.weekEnd,
    hours_worked: r.hoursWorked,
    total_billed: r.totalBilled,
    tips_total: r.tipsTotal,
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

// H3: Reverse order — INSERT new first, then UPDATE old on success
export async function persistRerunPayroll(
  weekStart: string,
  newRecords: PayrollRecord[],
  closedById: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };

  // Insert new version first (safe: if this fails, old records untouched)
  const insertResult = await persistClosePayroll(newRecords, closedById);
  if (insertResult.error) return insertResult;

  // Mark previous version as superseded (only after insert succeeds)
  const { error: updateError } = await supabase
    .from('weekly_payroll')
    .update({ status: 'superseded' })
    .eq('week_start', weekStart)
    .eq('status', 'cerrado')
    .not('id', 'in', `(${newRecords.map((r) => r.id).join(',')})`);

  if (updateError) return { error: new Error(updateError.message) };
  return { error: null };
}

// ---- Users ----

type InviteResult = { userId?: string; error: Error | null };

export async function persistNewUser(user: User): Promise<InviteResult> {
  if (!supabase) return { error: null };

  // Supabase mode: call Express invite endpoint (creates auth user + profile)
  const {
    data: { session },
  } = await supabase.auth.getSession();
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
  const { error } = await supabase
    .from('profiles')
    .update({
      name: user.name,
      email: user.email,
      role: user.role,
      center_id: user.centerId,
    })
    .eq('id', user.id);
  return { error: error ? new Error(error.message) : null };
}

export async function persistDeactivateUser(
  userId: string,
): Promise<MutationResult> {
  if (!supabase) return { error: null };
  const { error } = await supabase
    .from('profiles')
    .update({ status: 'inactivo' })
    .eq('id', userId);
  return { error: error ? new Error(error.message) : null };
}
