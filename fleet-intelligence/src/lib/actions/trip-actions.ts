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
  // W4: Pre-compute unmapped count for accurate success message
  const mappableCount = trips.filter((t) =>
    didiToDriverId.has(t.didiDriverId),
  ).length;
  const droppedCount = trips.length - mappableCount;
  const successMsg =
    droppedCount > 0
      ? `${mappableCount} viajes importados. ${droppedCount} omitidos (conductor no encontrado).`
      : `${trips.length} viajes importados exitosamente.`;

  await withOptimistic(ctx, {
    optimistic: () => ctx.dispatch({ type: 'IMPORT_TRIPS', payload: trips }),
    persist: () =>
      persistTrips(
        trips,
        didiToDriverId,
        ctx.userId,
        fileName,
        warningCount,
        errorCount,
      ),
    rollback: () =>
      ctx.dispatch({ type: 'REMOVE_TRIPS', payload: trips.map((t) => t.id) }),
    successMsg,
    errorMsg: 'Error al persistir viajes',
  });
}
