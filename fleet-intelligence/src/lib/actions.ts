/**
 * Service layer: bundles optimistic dispatch + persist + toast for each mutation.
 * Pages call action*() instead of the 3-step pattern directly.
 */
import type { Dispatch } from 'react';
import type { Action, Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';
import {
  persistCheckIn,
  persistCheckOut,
  persistVehicleStatus,
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
  if (error) { showToast('error', `Error al registrar check-in: ${error.message}`); return; }
  const { error: vErr } = await persistVehicleStatus(vehicleId, 'en_turno');
  if (vErr) { showToast('error', `Error al actualizar vehículo: ${vErr.message}`); return; }
  showToast('success', `Check-in registrado: ${shift.driverName} en ${shift.plate}`);
}

export async function actionCheckOut(
  params: { shiftId: string; checkOut: string; hoursWorked: number; vehicleId?: string; driverName: string },
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'CLOSE_SHIFT', payload: { shiftId: params.shiftId, checkOut: params.checkOut, hoursWorked: params.hoursWorked } });
  const { error } = await persistCheckOut(params.shiftId, params.checkOut, params.hoursWorked);
  if (error) { showToast('error', `Error al cerrar turno: ${error.message}`); return; }
  if (params.vehicleId) {
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: params.vehicleId, status: 'disponible' } });
    const { error: vErr } = await persistVehicleStatus(params.vehicleId, 'disponible');
    if (vErr) { showToast('error', `Error al actualizar vehículo: ${vErr.message}`); return; }
  }
  showToast('success', `Turno cerrado: ${params.driverName} \u2014 ${params.hoursWorked}h`);
}

// ---- Vehicles ----

export async function actionVehicleStatus(
  vehicleId: string,
  status: string,
  plate: string,
  statusLabel: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId, status } });
  const { error } = await persistVehicleStatus(vehicleId, status);
  if (error) { showToast('error', `Error al cambiar status: ${error.message}`); return; }
  showToast('success', `${plate} \u2192 ${statusLabel}`);
}

export async function actionAddVehicle(
  vehicle: Vehicle,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'ADD_VEHICLE', payload: vehicle });
  const { error } = await persistNewVehicle(vehicle);
  if (error) { showToast('error', `Error al crear vehículo: ${error.message}`); return; }
  showToast('success', `Veh\u00edculo ${vehicle.plate} creado.`);
}

export async function actionUpdateVehicle(
  vehicle: Vehicle,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_VEHICLE', payload: vehicle });
  const { error } = await persistUpdateVehicle(vehicle);
  if (error) { showToast('error', `Error al actualizar vehículo: ${error.message}`); return; }
  showToast('success', `Vehículo ${vehicle.plate} actualizado.`);
}

// ---- Drivers ----

export async function actionAddDriver(
  driver: Driver,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'ADD_DRIVER', payload: driver });
  const { error } = await persistNewDriver(driver);
  if (error) { showToast('error', `Error al crear conductor: ${error.message}`); return; }
  showToast('success', `Conductor ${driver.fullName} creado.`);
}

export async function actionUpdateDriver(
  driver: Driver,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_DRIVER', payload: driver });
  const { error } = await persistUpdateDriver(driver);
  if (error) { showToast('error', `Error al actualizar conductor: ${error.message}`); return; }
  showToast('success', `Conductor ${driver.fullName} actualizado.`);
}

export async function actionDeactivateDriver(
  driverId: string,
  driverName: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'DEACTIVATE_DRIVER', payload: driverId });
  const { error } = await persistDeactivateDriver(driverId);
  if (error) { showToast('error', `Error al desactivar conductor: ${error.message}`); return; }
  showToast('success', `${driverName} desactivado.`);
}

// ---- Trips ----

export async function actionImportTrips(
  trips: Trip[],
  didiToDriverId: Map<number, string>,
  uploadedBy: string,
  fileName: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'IMPORT_TRIPS', payload: trips });
  const { error } = await persistTrips(trips, didiToDriverId, uploadedBy, fileName);
  if (error) { showToast('error', `Error al persistir viajes: ${error.message}`); return; }
  showToast('success', `${trips.length} viajes importados exitosamente.`);
}

// ---- Payroll ----

export async function actionClosePayroll(
  records: PayrollRecord[],
  closedById: string,
  weekLabel: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'CLOSE_PAYROLL_WEEK', payload: records });
  const { error } = await persistClosePayroll(records, closedById);
  if (error) { showToast('error', `Error al cerrar semana: ${error.message}`); return; }
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
) {
  dispatch({ type: 'RERUN_PAYROLL_CLOSE', payload: { weekLabel, newRecords } });
  const { error } = await persistRerunPayroll(weekStart, newRecords, closedById);
  if (error) { showToast('error', `Error al re-ejecutar nómina: ${error.message}`); return; }
  showToast('success', `N\u00f3mina re-ejecutada (v${version}).`);
}

// ---- Users ----

export async function actionAddUser(
  user: User,
  password: string,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'ADD_USER', payload: user });
  const { error } = await persistNewUser(user, password);
  if (error) { showToast('error', `Error al crear usuario: ${error.message}`); return; }
  showToast('success', `Usuario ${user.name} creado.`);
}

export async function actionUpdateUser(
  user: User,
  dispatch: AppDispatch,
  showToast: ShowToast,
) {
  dispatch({ type: 'UPDATE_USER', payload: user });
  const { error } = await persistUpdateUser(user);
  if (error) { showToast('error', `Error al actualizar usuario: ${error.message}`); return; }
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
  if (error) { showToast('error', `Error al desactivar usuario: ${error.message}`); return; }
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
