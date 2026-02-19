import type { ActionContext } from '@/lib/action-context';
import type { Shift } from '@/types';
import {
  persistCheckIn,
  persistCheckOut,
  persistVehicleStatus,
  persistDeleteShift,
} from '@/lib/supabase/mutations';
import { updateVehicleStatusInMap } from '@/lib/mappers';
import { withOptimistic } from '@/lib/actions/with-optimistic';

export async function actionCheckIn(
  shift: Shift,
  vehicleId: string,
  ctx: ActionContext,
) {
  ctx.dispatch({ type: 'ADD_SHIFT', payload: shift });
  ctx.dispatch({
    type: 'UPDATE_VEHICLE_STATUS',
    payload: { vehicleId, status: 'en_turno' },
  });
  const { error } = await persistCheckIn(shift, ctx.userId);
  if (error) {
    console.error('[actionCheckIn] persist failed:', error.message, {
      shiftId: shift.id,
      vehicleId,
    });
    ctx.dispatch({ type: 'REMOVE_SHIFT', payload: shift.id });
    ctx.dispatch({
      type: 'UPDATE_VEHICLE_STATUS',
      payload: { vehicleId, status: 'disponible' },
    });
    ctx.showToast('error', `Error al registrar check-in: ${error.message}`);
    return;
  }
  const { error: vErr } = await persistVehicleStatus(vehicleId, 'en_turno');
  if (vErr) {
    console.error(
      '[actionCheckIn] vehicle status failed, compensating:',
      vErr.message,
      { shiftId: shift.id, vehicleId },
    );
    await persistDeleteShift(shift.id);
    ctx.dispatch({ type: 'REMOVE_SHIFT', payload: shift.id });
    ctx.dispatch({
      type: 'UPDATE_VEHICLE_STATUS',
      payload: { vehicleId, status: 'disponible' },
    });
    ctx.showToast('error', `Error al actualizar vehículo: ${vErr.message}`);
    return;
  }
  ctx.showToast(
    'success',
    `Check-in registrado: ${shift.driverName} en ${shift.plate}`,
  );
}

export async function actionCheckOut(
  params: {
    shiftId: string;
    checkOut: string;
    hoursWorked: number;
    vehicleId?: string;
    driverName: string;
  },
  ctx: ActionContext,
) {
  // Track whether the main persist succeeded so we can do post-success vehicle update
  let persistSucceeded = false;

  await withOptimistic(ctx, {
    optimistic: () =>
      ctx.dispatch({
        type: 'CLOSE_SHIFT',
        payload: {
          shiftId: params.shiftId,
          checkOut: params.checkOut,
          hoursWorked: params.hoursWorked,
        },
      }),
    persist: async () => {
      const result = await persistCheckOut(
        params.shiftId,
        params.checkOut,
        params.hoursWorked,
      );
      if (!result.error) persistSucceeded = true;
      return result;
    },
    rollback: () =>
      ctx.dispatch({ type: 'REVERT_CLOSE_SHIFT', payload: params.shiftId }),
    successMsg: `Turno cerrado: ${params.driverName} — ${params.hoursWorked}h`,
    errorMsg: 'Error al cerrar turno',
  });

  // Post-success: update vehicle status (independent of the core checkout)
  if (persistSucceeded && params.vehicleId) {
    ctx.dispatch({
      type: 'UPDATE_VEHICLE_STATUS',
      payload: { vehicleId: params.vehicleId, status: 'disponible' },
    });
    updateVehicleStatusInMap(params.vehicleId, 'disponible');
    const { error: vErr } = await persistVehicleStatus(
      params.vehicleId,
      'disponible',
    );
    if (vErr) {
      console.warn(
        '[actionCheckOut] vehicle status persist failed, retrying:',
        vErr.message,
        { vehicleId: params.vehicleId },
      );
      await new Promise((r) => setTimeout(r, 500));
      const { error: retryErr } = await persistVehicleStatus(
        params.vehicleId,
        'disponible',
      );
      if (retryErr) {
        console.error(
          '[actionCheckOut] vehicle status retry failed:',
          retryErr.message,
          { vehicleId: params.vehicleId },
        );
        ctx.showToast(
          'warning',
          'Turno cerrado, pero el status del vehículo no se pudo sincronizar. Se corregirá automáticamente.',
        );
      }
    }
  }
}
