import type { ActionContext } from '@/lib/action-context';
import type { Vehicle, VehicleStatus } from '@/types';
import {
  persistVehicleStatus,
  persistNewVehicle,
  persistUpdateVehicle,
} from '@/lib/supabase/mutations';
import {
  addToVehiclesMap,
  removeFromVehiclesMap,
  updateVehicleStatusInMap,
} from '@/lib/mappers';
import { withOptimistic } from '@/lib/with-optimistic';

export async function actionVehicleStatus(
  vehicleId: string,
  status: VehicleStatus,
  oldStatus: VehicleStatus,
  plate: string,
  statusLabel: string,
  ctx: ActionContext,
) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({
        type: 'UPDATE_VEHICLE_STATUS',
        payload: { vehicleId, status },
      });
      updateVehicleStatusInMap(vehicleId, status);
    },
    persist: () => persistVehicleStatus(vehicleId, status),
    rollback: () => {
      ctx.dispatch({
        type: 'UPDATE_VEHICLE_STATUS',
        payload: { vehicleId, status: oldStatus },
      });
      updateVehicleStatusInMap(vehicleId, oldStatus);
    },
    successMsg: `${plate} → ${statusLabel}`,
    errorMsg: 'Error al cambiar status',
  });
}

export async function actionAddVehicle(vehicle: Vehicle, ctx: ActionContext) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({ type: 'ADD_VEHICLE', payload: vehicle });
      addToVehiclesMap(vehicle);
    },
    persist: () => persistNewVehicle(vehicle),
    rollback: () => {
      ctx.dispatch({ type: 'REMOVE_VEHICLE', payload: vehicle.id });
      removeFromVehiclesMap(vehicle.id);
    },
    successMsg: `Vehículo ${vehicle.plate} creado.`,
    errorMsg: 'Error al crear vehículo',
  });
}

export async function actionUpdateVehicle(
  vehicle: Vehicle,
  oldVehicle: Vehicle,
  ctx: ActionContext,
) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({ type: 'UPDATE_VEHICLE', payload: vehicle });
      addToVehiclesMap(vehicle);
    },
    persist: () => persistUpdateVehicle(vehicle),
    rollback: () => {
      ctx.dispatch({ type: 'UPDATE_VEHICLE', payload: oldVehicle });
      addToVehiclesMap(oldVehicle);
    },
    successMsg: `Vehículo ${vehicle.plate} actualizado.`,
    errorMsg: 'Error al actualizar vehículo',
  });
}
