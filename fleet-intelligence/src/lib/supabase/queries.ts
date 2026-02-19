import { supabase } from './client';
import type {
  DbCenter, DbProfile, DbDriver, DbVehicle, DbShift, DbTrip, DbWeeklyPayroll,
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

  const [centersRes, driversRes, vehiclesRes, shiftsRes, tripsRes, profilesRes, payrollRes] =
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

  const centers = (centersRes.data ?? []) as DbCenter[];
  const drivers = (driversRes.data ?? []) as DbDriver[];
  const vehicles = (vehiclesRes.data ?? []) as DbVehicle[];
  const shifts = (shiftsRes.data ?? []) as DbShift[];
  const trips = (tripsRes.data ?? []) as DbTrip[];
  const profiles = (profilesRes.data ?? []) as DbProfile[];
  const payroll = (payrollRes.data ?? []) as DbWeeklyPayroll[];

  // Build lookup maps for denormalization
  setLookupMaps(centers, drivers, vehicles, profiles);

  return {
    centers: centers.map(mapCenter),
    drivers: drivers.map(mapDriver),
    vehicles: vehicles.map(mapVehicle),
    shifts: shifts.map(mapShift),
    trips: trips.map(mapTrip),
    users: profiles.map(mapProfile),
    closedPayroll: payroll.map(mapPayroll),
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

  const payroll = (res.data ?? []) as DbWeeklyPayroll[];
  const hasMore = payroll.length > limit;
  const trimmed = hasMore ? payroll.slice(0, limit) : payroll;

  return {
    data: trimmed.map(mapPayroll),
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
