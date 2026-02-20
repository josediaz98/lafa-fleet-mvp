import type { ActionContext } from '@/lib/action-context';
import type { Action } from '@/types';
import type { PaginatedResult } from '@/lib/supabase/queries';
import {
  fetchShiftsPage,
  fetchTripsPage,
  fetchPayrollPage,
} from '@/lib/supabase/queries';

async function actionLoadMore<T>(
  fetchFn: (before: string) => Promise<PaginatedResult<T>>,
  dispatchType: string,
  payloadKey: string,
  errorMsg: string,
  beforeDate: string,
  ctx: ActionContext,
): Promise<boolean> {
  try {
    const result = await fetchFn(beforeDate);
    if (result.data.length > 0) {
      ctx.dispatch({
        type: dispatchType,
        payload: {
          [payloadKey]: result.data,
          oldestDate: result.oldestDate ?? beforeDate,
          hasMore: result.hasMore,
        },
      } as Action);
    }
    return result.hasMore;
  } catch {
    ctx.showToast('error', errorMsg);
    return false;
  }
}

export const actionLoadMoreShifts = (before: string, ctx: ActionContext) =>
  actionLoadMore(
    fetchShiftsPage,
    'APPEND_SHIFTS',
    'shifts',
    'Error al cargar más turnos.',
    before,
    ctx,
  );

export const actionLoadMoreTrips = (before: string, ctx: ActionContext) =>
  actionLoadMore(
    fetchTripsPage,
    'APPEND_TRIPS',
    'trips',
    'Error al cargar más viajes.',
    before,
    ctx,
  );

export const actionLoadMorePayroll = (before: string, ctx: ActionContext) =>
  actionLoadMore(
    fetchPayrollPage,
    'APPEND_PAYROLL',
    'payroll',
    'Error al cargar más registros de nómina.',
    before,
    ctx,
  );
