/**
 * Service layer: bundles optimistic dispatch + persist + toast for each mutation.
 * Pages call action*() instead of the 3-step pattern directly.
 *
 * C2: On persist failure, dispatches rollback action to revert optimistic state.
 */
import type { Dispatch } from 'react';
import type { Action, Driver, Vehicle, Shift, Trip, PayrollRecord, User, VehicleStatus } from '@/types';
import {
  persistCheckIn,
  persistCheckOut,
  persistVehicleStatus,
  persistDeleteShift,
  persistNewDriver,
  persistUpdateDriver,
  persistDeactivateDriver,
  persistNewVehicle,
  persistUpdateVehicle,
  persistTrips,
  persistClosePayroll,
  persistRerunPayroll,
  persistNewUser,
  persistUpdateUser,
  persistDeactivateUser,
} from '@/lib/supabase/mutations';
import {
  addToDriversMap,
  addToVehiclesMap,
  removeFromDriversMap,
  removeFromVehiclesMap,
  updateDriverStatusInMap,
  updateVehicleStatusInMap,
  addToProfilesMap,
} from '@/lib/mappers';
import {
  fetchShiftsPage,
  fetchTripsPage,
  fetchPayrollPage,
} from '@/lib/supabase/queries';

type AppDispatch = Dispatch<Action>;
type ShowToast = (type: 'success' | 'error' | 'warning', message: string) => void;

// ---- Shifts ----

export async function actionCheckIn(
  shift: Shift,
  vehicleId: string,
  createdBy: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'ADD_SHIFT', payload: shift });
  dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId, status: 'en_turno' } });
  const { error } = await persistCheckIn(shift, createdBy);
  if (error) {
    // C2: Rollback both shift and vehicle status
    console.error('[actionCheckIn] persist failed:', error.message, { shiftId: shift.id, vehicleId });
    dispatch({ type: 'REMOVE_SHIFT', payload: shift.id });
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId, status: 'disponible' } });
    showToast('error', `Error al registrar check-in: ${error.message}`);
    return;
  }
  const { error: vErr } = await persistVehicleStatus(vehicleId, 'en_turno');
  if (vErr) {
    // C3: Shift persisted but vehicle update failed — compensate by deleting the shift
    console.error('[actionCheckIn] vehicle status failed, compensating:', vErr.message, { shiftId: shift.id, vehicleId });
    await persistDeleteShift(shift.id);
    dispatch({ type: 'REMOVE_SHIFT', payload: shift.id });
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId, status: 'disponible' } });
    showToast('error', `Error al actualizar vehículo: ${vErr.message}`);
    return;
  }
  showToast('success', `Check-in registrado: ${shift.driverName} en ${shift.plate}`);
}

export async function actionCheckOut(
  params: { shiftId: string; checkOut: string; hoursWorked: number; vehicleId?: string; driverName: string },
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'CLOSE_SHIFT', payload: { shiftId: params.shiftId, checkOut: params.checkOut, hoursWorked: params.hoursWorked } });
  const { error } = await persistCheckOut(params.shiftId, params.checkOut, params.hoursWorked);
  if (error) {
    // C2: Rollback shift close
    console.error('[actionCheckOut] persist failed:', error.message, { shiftId: params.shiftId });
    dispatch({ type: 'REVERT_CLOSE_SHIFT', payload: params.shiftId });
    showToast('error', `Error al cerrar turno: ${error.message}`);
    return;
  }
  if (params.vehicleId) {
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: params.vehicleId, status: 'disponible' } });
    updateVehicleStatusInMap(params.vehicleId, 'disponible');
    const { error: vErr } = await persistVehicleStatus(params.vehicleId, 'disponible');
    if (vErr) {
      // Rollback vehicle status in state and map
      console.error('[actionCheckOut] vehicle status failed:', vErr.message, { vehicleId: params.vehicleId });
      dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: params.vehicleId, status: 'en_turno' } });
      updateVehicleStatusInMap(params.vehicleId, 'en_turno');
      showToast('error', `Error al actualizar vehículo: ${vErr.message}`);
      return;
    }
  }
  showToast('success', `Turno cerrado: ${params.driverName} — ${params.hoursWorked}h`);
}

// ---- Vehicles ----

export async function actionVehicleStatus(
  vehicleId: string,
  status: VehicleStatus,
  oldStatus: VehicleStatus,
  plate: string,
  statusLabel: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId, status } });
  updateVehicleStatusInMap(vehicleId, status);
  const { error } = await persistVehicleStatus(vehicleId, status);
  if (error) {
    // C2: Rollback to previous status in state and map
    console.error('[actionVehicleStatus] persist failed:', error.message, { vehicleId, status });
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId, status: oldStatus } });
    updateVehicleStatusInMap(vehicleId, oldStatus);
    showToast('error', `Error al cambiar status: ${error.message}`);
    return;
  }
  showToast('success', `${plate} → ${statusLabel}`);
}

export async function actionAddVehicle(
  vehicle: Vehicle,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'ADD_VEHICLE', payload: vehicle });
  addToVehiclesMap(vehicle); // C1: Update lookup map
  const { error } = await persistNewVehicle(vehicle);
  if (error) {
    // C2: Rollback
    console.error('[actionAddVehicle] persist failed:', error.message, { vehicleId: vehicle.id });
    dispatch({ type: 'REMOVE_VEHICLE', payload: vehicle.id });
    removeFromVehiclesMap(vehicle.id);
    showToast('error', `Error al crear vehículo: ${error.message}`);
    return;
  }
  showToast('success', `Vehículo ${vehicle.plate} creado.`);
}

export async function actionUpdateVehicle(
  vehicle: Vehicle,
  oldVehicle: Vehicle,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_VEHICLE', payload: vehicle });
  addToVehiclesMap(vehicle); // C1: Update lookup map
  const { error } = await persistUpdateVehicle(vehicle);
  if (error) {
    // C2: Rollback to old data in state and map
    console.error('[actionUpdateVehicle] persist failed:', error.message, { vehicleId: vehicle.id });
    dispatch({ type: 'UPDATE_VEHICLE', payload: oldVehicle });
    addToVehiclesMap(oldVehicle);
    showToast('error', `Error al actualizar vehículo: ${error.message}`);
    return;
  }
  showToast('success', `Vehículo ${vehicle.plate} actualizado.`);
}

// ---- Drivers ----

export async function actionAddDriver(
  driver: Driver,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'ADD_DRIVER', payload: driver });
  addToDriversMap(driver); // C1: Update lookup map
  const { error } = await persistNewDriver(driver);
  if (error) {
    // C2: Rollback
    console.error('[actionAddDriver] persist failed:', error.message, { driverId: driver.id });
    dispatch({ type: 'REMOVE_DRIVER', payload: driver.id });
    removeFromDriversMap(driver.id);
    showToast('error', `Error al crear conductor: ${error.message}`);
    return;
  }
  showToast('success', `Conductor ${driver.fullName} creado.`);
}

export async function actionUpdateDriver(
  driver: Driver,
  oldDriver: Driver,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_DRIVER', payload: driver });
  addToDriversMap(driver); // C1: Update lookup map
  const { error } = await persistUpdateDriver(driver);
  if (error) {
    // C2: Rollback to old data in state and map
    console.error('[actionUpdateDriver] persist failed:', error.message, { driverId: driver.id });
    dispatch({ type: 'UPDATE_DRIVER', payload: oldDriver });
    addToDriversMap(oldDriver);
    showToast('error', `Error al actualizar conductor: ${error.message}`);
    return;
  }
  showToast('success', `Conductor ${driver.fullName} actualizado.`);
}

export async function actionDeactivateDriver(
  driverId: string,
  driverName: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'DEACTIVATE_DRIVER', payload: driverId });
  updateDriverStatusInMap(driverId, 'inactivo');
  const { error } = await persistDeactivateDriver(driverId);
  if (error) {
    // C2: Rollback — restore status to activo in state and map
    console.error('[actionDeactivateDriver] persist failed:', error.message, { driverId });
    dispatch({ type: 'REACTIVATE_DRIVER', payload: driverId });
    updateDriverStatusInMap(driverId, 'activo');
    showToast('error', `Error al desactivar conductor: ${error.message}`);
    return;
  }
  showToast('success', `${driverName} desactivado.`);
}

// ---- Trips ----

// H5: Accept warning/error counts to pass through to persist
export async function actionImportTrips(
  trips: Trip[],
  didiToDriverId: Map<number, string>,
  uploadedBy: string,
  fileName: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
  warningCount = 0,
  errorCount = 0,
) {
  dispatch({ type: 'IMPORT_TRIPS', payload: trips });
  const { error } = await persistTrips(trips, didiToDriverId, uploadedBy, fileName, warningCount, errorCount);
  if (error) {
    // C2: Rollback imported trips
    console.error('[actionImportTrips] persist failed:', error.message, { tripCount: trips.length, fileName });
    dispatch({ type: 'REMOVE_TRIPS', payload: trips.map(t => t.id) });
    showToast('error', `Error al persistir viajes: ${error.message}`);
    return;
  }
  showToast('success', `${trips.length} viajes importados exitosamente.`);
}

// ---- Payroll ----

export async function actionClosePayroll(
  records: PayrollRecord[],
  closedById: string,
  weekLabel: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
  role?: string,
) {
  if (role && role !== 'admin') {
    showToast('error', 'Solo administradores pueden cerrar la semana.');
    return;
  }
  dispatch({ type: 'CLOSE_PAYROLL_WEEK', payload: records });
  const { error } = await persistClosePayroll(records, closedById);
  if (error) {
    // C2: Rollback payroll close
    console.error('[actionClosePayroll] persist failed:', error.message, { weekLabel, recordCount: records.length });
    dispatch({ type: 'REMOVE_PAYROLL_WEEK', payload: records.map(r => r.id) });
    showToast('error', `Error al cerrar semana: ${error.message}`);
    return;
  }
  showToast('success', `Semana ${weekLabel} cerrada exitosamente.`);
}

export async function actionRerunPayroll(
  weekStart: string,
  weekLabel: string,
  newRecords: PayrollRecord[],
  closedById: string,
  version: number,
  dispatch: AppDispatch,
  showToast: ShowToast,
  role?: string,
) {
  if (role && role !== 'admin') {
    showToast('error', 'Solo administradores pueden re-ejecutar la nómina.');
    return;
  }
  // H4: Pass weekStart instead of weekLabel to reducer for reliable matching
  dispatch({ type: 'RERUN_PAYROLL_CLOSE', payload: { weekStart, newRecords } });
  const { error } = await persistRerunPayroll(weekStart, newRecords, closedById);
  if (error) {
    // C2: Rollback — restore old records to 'cerrado' and remove new ones
    console.error('[actionRerunPayroll] persist failed:', error.message, { weekStart, version });
    dispatch({ type: 'REVERT_RERUN_PAYROLL', payload: { weekStart, removedIds: newRecords.map(r => r.id) } });
    showToast('error', `Error al re-ejecutar nómina: ${error.message}`);
    return;
  }
  showToast('success', `Nómina ${weekLabel} re-ejecutada (v${version}).`);
}

// ---- Users ----

export async function actionAddUser(
  user: User,
  dispatch: AppDispatch,
  showToast: ShowToast,
  supabaseMode = false,
) {
  if (supabaseMode) {
    // Supabase: call API first, get real UUID, then dispatch
    const { userId, error } = await persistNewUser(user);
    if (error) { console.error('[actionAddUser] invite failed:', error.message, { email: user.email }); showToast('error', `Error al enviar invitación: ${error.message}`); return; }
    const newUser = { ...user, id: userId ?? user.id, status: 'invitado' as const };
    dispatch({ type: 'ADD_USER', payload: newUser });
    addToProfilesMap(newUser);
    showToast('success', `Invitación enviada a ${user.email}`);
  } else {
    showToast('error', 'No se puede invitar usuarios: la conexión con Supabase no está configurada.');
  }
}

export async function actionUpdateUser(
  user: User,
  oldUser: User,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_USER', payload: user });
  addToProfilesMap(user);
  const { error } = await persistUpdateUser(user);
  if (error) {
    // C2: Rollback to old data in state and map
    console.error('[actionUpdateUser] persist failed:', error.message, { userId: user.id });
    dispatch({ type: 'UPDATE_USER', payload: oldUser });
    addToProfilesMap(oldUser);
    showToast('error', `Error al actualizar usuario: ${error.message}`);
    return;
  }
  showToast('success', `Usuario ${user.name} actualizado.`);
}

export async function actionDeactivateUser(
  userId: string,
  userName: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'DEACTIVATE_USER', payload: userId });
  const { error } = await persistDeactivateUser(userId);
  if (error) {
    // C2: Rollback — restore status to activo
    console.error('[actionDeactivateUser] persist failed:', error.message, { userId });
    dispatch({ type: 'REACTIVATE_USER', payload: userId });
    showToast('error', `Error al desactivar usuario: ${error.message}`);
    return;
  }
  showToast('success', `${userName} desactivado.`);
}

// ---- Pagination: Load more historical data ----

export async function actionLoadMoreShifts(
  beforeDate: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
): Promise<boolean> {
  try {
    const result = await fetchShiftsPage(beforeDate);
    if (result.data.length > 0) {
      dispatch({
        type: 'APPEND_SHIFTS',
        payload: {
          shifts: result.data,
          oldestDate: result.oldestDate ?? beforeDate,
          hasMore: result.hasMore,
        },
      });
    }
    return result.hasMore;
  } catch (err) {
    showToast('error', 'Error al cargar más turnos.');
    return false;
  }
}

export async function actionLoadMoreTrips(
  beforeDate: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
): Promise<boolean> {
  try {
    const result = await fetchTripsPage(beforeDate);
    if (result.data.length > 0) {
      dispatch({
        type: 'APPEND_TRIPS',
        payload: {
          trips: result.data,
          oldestDate: result.oldestDate ?? beforeDate,
          hasMore: result.hasMore,
        },
      });
    }
    return result.hasMore;
  } catch (err) {
    showToast('error', 'Error al cargar más viajes.');
    return false;
  }
}

export async function actionLoadMorePayroll(
  beforeDate: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
): Promise<boolean> {
  try {
    const result = await fetchPayrollPage(beforeDate);
    if (result.data.length > 0) {
      dispatch({
        type: 'APPEND_PAYROLL',
        payload: {
          payroll: result.data,
          oldestDate: result.oldestDate ?? beforeDate,
          hasMore: result.hasMore,
        },
      });
    }
    return result.hasMore;
  } catch (err) {
    showToast('error', 'Error al cargar más registros de nómina.');
    return false;
  }
}
