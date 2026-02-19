import type { ActionContext } from '@/lib/action-context';
import type { Trip } from '@/types';
import { persistTrips } from '@/lib/supabase/mutations';
import { withOptimistic } from './with-optimistic';

export async function actionImportTrips(
  trips: Trip[],
  didiToDriverId: Map<number, string>,
  fileName: string,
  ctx: ActionContext,
  warningCount = 0,
  errorCount = 0,
) {
  await withOptimistic(ctx, {
    optimistic: () => ctx.dispatch({ type: 'IMPORT_TRIPS', payload: trips }),
    persist: () => persistTrips(trips, didiToDriverId, ctx.userId, fileName, warningCount, errorCount),
    rollback: () => ctx.dispatch({ type: 'REMOVE_TRIPS', payload: trips.map(t => t.id) }),
    successMsg: `${trips.length} viajes importados exitosamente.`,
    errorMsg: 'Error al persistir viajes',
  });
}
