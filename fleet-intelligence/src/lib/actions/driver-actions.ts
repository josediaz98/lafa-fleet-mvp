import type { ActionContext } from '@/lib/action-context';
import type { Driver } from '@/types';
import {
  persistNewDriver,
  persistUpdateDriver,
  persistDeactivateDriver,
} from '@/lib/supabase/mutations';
import {
  addToDriversMap,
  removeFromDriversMap,
  updateDriverStatusInMap,
} from '@/lib/mappers';
import { withOptimistic } from './with-optimistic';

export async function actionAddDriver(driver: Driver, ctx: ActionContext) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({ type: 'ADD_DRIVER', payload: driver });
      addToDriversMap(driver);
    },
    persist: () => persistNewDriver(driver),
    rollback: () => {
      ctx.dispatch({ type: 'REMOVE_DRIVER', payload: driver.id });
      removeFromDriversMap(driver.id);
    },
    successMsg: `Conductor ${driver.fullName} creado.`,
    errorMsg: 'Error al crear conductor',
  });
}

export async function actionUpdateDriver(
  driver: Driver,
  oldDriver: Driver,
  ctx: ActionContext,
) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({ type: 'UPDATE_DRIVER', payload: driver });
      addToDriversMap(driver);
    },
    persist: () => persistUpdateDriver(driver),
    rollback: () => {
      ctx.dispatch({ type: 'UPDATE_DRIVER', payload: oldDriver });
      addToDriversMap(oldDriver);
    },
    successMsg: `Conductor ${driver.fullName} actualizado.`,
    errorMsg: 'Error al actualizar conductor',
  });
}

export async function actionDeactivateDriver(
  driverId: string,
  driverName: string,
  ctx: ActionContext,
) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({ type: 'DEACTIVATE_DRIVER', payload: driverId });
      updateDriverStatusInMap(driverId, 'inactivo');
    },
    persist: () => persistDeactivateDriver(driverId),
    rollback: () => {
      ctx.dispatch({ type: 'REACTIVATE_DRIVER', payload: driverId });
      updateDriverStatusInMap(driverId, 'activo');
    },
    successMsg: `${driverName} desactivado.`,
    errorMsg: 'Error al desactivar conductor',
  });
}
