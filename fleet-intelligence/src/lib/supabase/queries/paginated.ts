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

// ── Generic paginated fetch ──────────────────────────────────

async function fetchPage<TDb, TApp>(config: {
  table: string;
  dateColumn: keyof TDb & string;
  beforeDate: string;
  limit: number;
  mapper: (row: TDb) => TApp;
  postProcess?: (rows: TDb[]) => TDb[];
}): Promise<PaginatedResult<TApp>> {
  if (!supabase) throw new Error('Supabase not configured');

  const res = await supabase
    .from(config.table)
    .select('*')
    .lt(config.dateColumn, config.beforeDate)
    .order(config.dateColumn, { ascending: false })
    .limit(config.limit + 1);

  if (res.error) throw new Error(res.error.message);

  const rows = (res.data ?? []) as TDb[];
  const hasMore = rows.length > config.limit;
  const trimmed = hasMore ? rows.slice(0, config.limit) : rows;
  const processed = config.postProcess ? config.postProcess(trimmed) : trimmed;

  return {
    data: processed.map(config.mapper),
    hasMore,
    oldestDate:
      trimmed.length > 0
        ? String(trimmed[trimmed.length - 1][config.dateColumn])
        : null,
  };
}

// ── Exported per-domain functions ────────────────────────────

export function fetchShiftsPage(
  beforeDate: string,
  limit: number = PAGE_SIZE,
): Promise<PaginatedResult<Shift>> {
  return fetchPage<DbShift, Shift>({
    table: 'shifts',
    dateColumn: 'check_in',
    beforeDate,
    limit,
    mapper: mapShift,
  });
}

export function fetchTripsPage(
  beforeDate: string,
  limit: number = PAGE_SIZE,
): Promise<PaginatedResult<Trip>> {
  return fetchPage<DbTrip, Trip>({
    table: 'trips',
    dateColumn: 'date',
    beforeDate,
    limit,
    mapper: mapTrip,
  });
}

export function fetchPayrollPage(
  beforeDate: string,
  limit: number = PAGE_SIZE,
): Promise<PaginatedResult<PayrollRecord>> {
  return fetchPage<DbWeeklyPayroll, PayrollRecord>({
    table: 'weekly_payroll',
    dateColumn: 'week_start',
    beforeDate,
    limit,
    mapper: mapPayroll,
    // BUG-2 fix: Deduplicate paginated payroll too
    postProcess: deduplicatePayroll,
  });
}
