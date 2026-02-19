import { supabase } from '../client';
import type {
  DbCenter, DbProfile, DbDriver, DbVehicle, DbShift, DbTrip, DbWeeklyPayroll,
} from '../types';
import {
  setLookupMaps,
  mapCenter, mapDriver, mapVehicle, mapShift, mapTrip, mapProfile, mapPayroll,
} from '@/lib/mappers';
import type { Center, Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';

// ─────────────────────────────────────────────────────────────
// Constants shared with paginated queries
// ─────────────────────────────────────────────────────────────

export const WEEKS_TO_FETCH = 4;
export const PAGE_SIZE = 500;

// ─────────────────────────────────────────────────────────────
// Date range utilities
// ─────────────────────────────────────────────────────────────

export function getDateRange(weeksBack: number = WEEKS_TO_FETCH): { start: string; end: string } {
  const now = new Date();
  const end = new Date(now);
  end.setDate(end.getDate() + 7); // Include future week for edge cases

  const start = new Date(now);
  start.setDate(start.getDate() - (weeksBack * 7));

  return {
    start: start.toISOString().slice(0, 10),
    end: end.toISOString().slice(0, 10),
  };
}

// ─────────────────────────────────────────────────────────────
// Payroll deduplication (BUG-2 defense)
// ─────────────────────────────────────────────────────────────

/** Keep only the highest-version record per (week_start, driver_id). Self-healing read-side defense. */
export function deduplicatePayroll(rows: DbWeeklyPayroll[]): DbWeeklyPayroll[] {
  const best = new Map<string, DbWeeklyPayroll>();
  for (const row of rows) {
    // Skip superseded records — only keep cerrado (or borrador)
    if (row.status === 'superseded') continue;
    const key = `${row.week_start}|${row.driver_id}`;
    const existing = best.get(key);
    if (!existing || row.version > existing.version) {
      best.set(key, row);
    }
  }
  return Array.from(best.values());
}

// ─────────────────────────────────────────────────────────────
// Main hydration query (fetches recent data only)
// ─────────────────────────────────────────────────────────────

export interface HydrateData {
  centers: Center[];
  drivers: Driver[];
  vehicles: Vehicle[];
  shifts: Shift[];
  trips: Trip[];
  users: User[];
  closedPayroll: PayrollRecord[];
  dataRange?: {
    shiftsFrom: string;
    tripsFrom: string;
    payrollFrom: string;
  };
}

export async function fetchAllData(): Promise<HydrateData> {
  if (!supabase) throw new Error('Supabase not configured');

  const range = getDateRange(WEEKS_TO_FETCH);

  const [centersRes, driversRes, vehiclesRes, profilesRes, shiftsRes, tripsRes, payrollRes, activeShiftsRes] =
    await Promise.all([
      // Static data - fetch all
      supabase.from('centers').select('*'),
      supabase.from('drivers').select('*'),
      supabase.from('vehicles').select('*'),
      supabase.from('profiles').select('*'),

      // Time-series data - fetch with date filter
      supabase
        .from('shifts')
        .select('*')
        .gte('check_in', range.start)
        .order('check_in', { ascending: false })
        .limit(PAGE_SIZE * 4),

      supabase
        .from('trips')
        .select('*')
        .gte('date', range.start)
        .order('date', { ascending: false })
        .limit(PAGE_SIZE * 10),

      supabase
        .from('weekly_payroll')
        .select('*')
        .gte('week_start', range.start)
        .order('week_start', { ascending: false })
        .limit(PAGE_SIZE),

      // ISSUE-2 fix: Dedicated query for active shifts (no date filter) — prevents false reconciliation
      supabase
        .from('shifts')
        .select('vehicle_id')
        .eq('status', 'en_turno'),
    ]);

  // C4: Check individual query errors — critical tables throw, non-critical degrade gracefully
  const criticalErrors: string[] = [];
  if (centersRes.error) criticalErrors.push(`centers: ${centersRes.error.message}`);
  if (driversRes.error) criticalErrors.push(`drivers: ${driversRes.error.message}`);
  if (vehiclesRes.error) criticalErrors.push(`vehicles: ${vehiclesRes.error.message}`);
  if (shiftsRes.error) criticalErrors.push(`shifts: ${shiftsRes.error.message}`);
  if (tripsRes.error) criticalErrors.push(`trips: ${tripsRes.error.message}`);
  if (payrollRes.error) criticalErrors.push(`weekly_payroll: ${payrollRes.error.message}`);
  if (activeShiftsRes.error) criticalErrors.push(`active_shifts: ${activeShiftsRes.error.message}`);
  if (criticalErrors.length > 0) {
    throw new Error(`Failed to fetch data: ${criticalErrors.join('; ')}`);
  }
  // profiles may be incomplete for supervisors (RLS) — not critical
  if (profilesRes.error) {
    console.warn('Profiles query returned error (may be RLS-scoped):', profilesRes.error.message);
  }

  const centers = (centersRes.data ?? []) as DbCenter[];
  const drivers = (driversRes.data ?? []) as DbDriver[];
  const vehicles = (vehiclesRes.data ?? []) as DbVehicle[];
  const shifts = (shiftsRes.data ?? []) as DbShift[];
  const trips = (tripsRes.data ?? []) as DbTrip[];
  const profiles = (profilesRes.data ?? []) as DbProfile[];
  const payroll = (payrollRes.data ?? []) as DbWeeklyPayroll[];

  // Build lookup maps for denormalization
  setLookupMaps(centers, drivers, vehicles, profiles);

  // BUG-1 fix: Reconcile vehicle status — if a vehicle is 'en_turno' but has no active shift, reset to 'disponible'
  // ISSUE-2 fix: Use dedicated active shifts query (no date filter) instead of windowed shifts
  const activeShiftVehicleIds = new Set(
    ((activeShiftsRes.data ?? []) as { vehicle_id: string }[]).map(s => s.vehicle_id),
  );
  for (const v of vehicles) {
    if (v.status === 'en_turno' && !activeShiftVehicleIds.has(v.id)) {
      console.warn(`[fetchAllData] Reconciling vehicle ${v.id} (${v.plate}): en_turno with no active shift → disponible`);
      v.status = 'disponible';
      // Fire-and-forget DB correction
      supabase.from('vehicles').update({ status: 'disponible' }).eq('id', v.id).then(({ error }) => {
        if (error) console.error(`[fetchAllData] Failed to reconcile vehicle ${v.id} in DB:`, error.message);
      });
    }
  }

  // BUG-2 fix: Deduplicate payroll — keep highest version per (week_start, driver_id)
  const deduped = deduplicatePayroll(payroll);

  return {
    centers: centers.map(mapCenter),
    drivers: drivers.map(mapDriver),
    vehicles: vehicles.map(mapVehicle),
    shifts: shifts.map(mapShift),
    trips: trips.map(mapTrip),
    users: profiles.map(mapProfile),
    closedPayroll: deduped.map(mapPayroll),
    dataRange: {
      shiftsFrom: range.start,
      tripsFrom: range.start,
      payrollFrom: range.start,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// Date-range queries for specific week payroll calculation
// ─────────────────────────────────────────────────────────────

export async function fetchShiftsByDateRange(
  startDate: string,
  endDate: string
): Promise<Shift[]> {
  if (!supabase) throw new Error('Supabase not configured');

  const res = await supabase
    .from('shifts')
    .select('*')
    .gte('check_in', startDate)
    .lt('check_in', endDate)
    .order('check_in', { ascending: false });

  const shifts = (res.data ?? []) as DbShift[];
  return shifts.map(mapShift);
}

export async function fetchTripsByDateRange(
  startDate: string,
  endDate: string
): Promise<Trip[]> {
  if (!supabase) throw new Error('Supabase not configured');

  const res = await supabase
    .from('trips')
    .select('*')
    .gte('date', startDate)
    .lt('date', endDate)
    .order('date', { ascending: false });

  const trips = (res.data ?? []) as DbTrip[];
  return trips.map(mapTrip);
}
