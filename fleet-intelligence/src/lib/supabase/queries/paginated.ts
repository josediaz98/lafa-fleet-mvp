import { supabase } from '../client';
import type { DbShift, DbTrip, DbWeeklyPayroll } from '../types';
import { mapShift, mapTrip, mapPayroll } from '@/lib/mappers';
import type { Shift, Trip, PayrollRecord } from '@/types';
import { PAGE_SIZE, deduplicatePayroll } from './hydrate';

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
  limit: number = PAGE_SIZE,
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
    oldestDate:
      trimmed.length > 0 ? trimmed[trimmed.length - 1].check_in : null,
  };
}

export async function fetchTripsPage(
  beforeDate: string,
  limit: number = PAGE_SIZE,
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
  limit: number = PAGE_SIZE,
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
    oldestDate:
      trimmed.length > 0 ? trimmed[trimmed.length - 1].week_start : null,
  };
}
