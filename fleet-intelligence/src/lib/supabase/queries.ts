import { supabase } from './client';
import type {
  DbCenter, DbProfile, DbDriver, DbVehicle, DbShift, DbTrip, DbWeeklyPayroll, DbCsvUpload,
} from './types';
import {
  setLookupMaps,
  mapCenter, mapDriver, mapVehicle, mapShift, mapTrip, mapProfile, mapPayroll,
} from '@/lib/mappers';
import type { Center, Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';

// ─────────────────────────────────────────────────────────────
// Date range utilities
// ─────────────────────────────────────────────────────────────

const WEEKS_TO_FETCH = 4;
const PAGE_SIZE = 500;

function getDateRange(weeksBack: number = WEEKS_TO_FETCH): { start: string; end: string } {
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
function deduplicatePayroll(rows: DbWeeklyPayroll[]): DbWeeklyPayroll[] {
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

  const [centersRes, driversRes, vehiclesRes, profilesRes, shiftsRes, tripsRes, payrollRes] =
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
    ]);

  // C4: Check individual query errors — critical tables throw, non-critical degrade gracefully
  const criticalErrors: string[] = [];
  if (centersRes.error) criticalErrors.push(`centers: ${centersRes.error.message}`);
  if (driversRes.error) criticalErrors.push(`drivers: ${driversRes.error.message}`);
  if (vehiclesRes.error) criticalErrors.push(`vehicles: ${vehiclesRes.error.message}`);
  if (shiftsRes.error) criticalErrors.push(`shifts: ${shiftsRes.error.message}`);
  if (tripsRes.error) criticalErrors.push(`trips: ${tripsRes.error.message}`);
  if (payrollRes.error) criticalErrors.push(`weekly_payroll: ${payrollRes.error.message}`);
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
  const activeShiftVehicleIds = new Set(
    shifts.filter(s => s.status === 'en_turno').map(s => s.vehicle_id),
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
// Paginated queries for loading more historical data
// ─────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T[];
  hasMore: boolean;
  oldestDate: string | null;
}

export async function fetchShiftsPage(
  beforeDate: string,
  limit: number = PAGE_SIZE
): Promise<PaginatedResult<Shift>> {
  if (!supabase) throw new Error('Supabase not configured');

  const res = await supabase
    .from('shifts')
    .select('*')
    .lt('check_in', beforeDate)
    .order('check_in', { ascending: false })
    .limit(limit + 1); // Fetch one extra to check if there's more

  if (res.error) throw new Error(res.error.message);

  const shifts = (res.data ?? []) as DbShift[];
  const hasMore = shifts.length > limit;
  const trimmed = hasMore ? shifts.slice(0, limit) : shifts;

  return {
    data: trimmed.map(mapShift),
    hasMore,
    oldestDate: trimmed.length > 0 ? trimmed[trimmed.length - 1].check_in : null,
  };
}

export async function fetchTripsPage(
  beforeDate: string,
  limit: number = PAGE_SIZE
): Promise<PaginatedResult<Trip>> {
  if (!supabase) throw new Error('Supabase not configured');

  const res = await supabase
    .from('trips')
    .select('*')
    .lt('date', beforeDate)
    .order('date', { ascending: false })
    .limit(limit + 1);

  if (res.error) throw new Error(res.error.message);

  const trips = (res.data ?? []) as DbTrip[];
  const hasMore = trips.length > limit;
  const trimmed = hasMore ? trips.slice(0, limit) : trips;

  return {
    data: trimmed.map(mapTrip),
    hasMore,
    oldestDate: trimmed.length > 0 ? trimmed[trimmed.length - 1].date : null,
  };
}

export async function fetchPayrollPage(
  beforeDate: string,
  limit: number = PAGE_SIZE
): Promise<PaginatedResult<PayrollRecord>> {
  if (!supabase) throw new Error('Supabase not configured');

  const res = await supabase
    .from('weekly_payroll')
    .select('*')
    .lt('week_start', beforeDate)
    .order('week_start', { ascending: false })
    .limit(limit + 1);

  if (res.error) throw new Error(res.error.message);

  const payroll = (res.data ?? []) as DbWeeklyPayroll[];
  const hasMore = payroll.length > limit;
  const trimmed = hasMore ? payroll.slice(0, limit) : payroll;
  // BUG-2 fix: Deduplicate paginated payroll too
  const deduped = deduplicatePayroll(trimmed);

  return {
    data: deduped.map(mapPayroll),
    hasMore,
    oldestDate: trimmed.length > 0 ? trimmed[trimmed.length - 1].week_start : null,
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

// ─────────────────────────────────────────────────────────────
// CSV upload history
// ─────────────────────────────────────────────────────────────

export interface CsvUploadRecord {
  id: string;
  filename: string;
  uploadedBy: string;
  uploadedAt: string;
  recordCount: number;
  validCount: number;
  warningCount: number;
  errorCount: number;
  status: 'procesado' | 'error';
}

export async function fetchUploadHistory(limit = 20): Promise<CsvUploadRecord[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('csv_uploads')
    .select('*, profiles!uploaded_by ( name )')
    .order('uploaded_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  return (data ?? []).map((row: DbCsvUpload & { profiles: { name: string } | null }) => ({
    id: row.id,
    filename: row.filename,
    uploadedBy: row.profiles?.name ?? 'Desconocido',
    uploadedAt: row.uploaded_at,
    recordCount: row.record_count,
    validCount: row.valid_count,
    warningCount: row.warning_count,
    errorCount: row.error_count,
    status: row.status,
  }));
}
