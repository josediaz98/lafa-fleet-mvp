import type { Center, Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';
import type {
  DbCenter, DbProfile, DbDriver, DbVehicle, DbShift, DbTrip, DbWeeklyPayroll,
} from '@/lib/supabase/types';

// Lookup maps built once per HYDRATE, updated on entity mutations (C1)
let centersMap: Map<string, DbCenter> = new Map();
let driversMap: Map<string, DbDriver> = new Map();
let vehiclesMap: Map<string, DbVehicle> = new Map();
let profilesMap: Map<string, DbProfile> = new Map();

export function setLookupMaps(
  centers: DbCenter[],
  drivers: DbDriver[],
  vehicles: DbVehicle[],
  profiles: DbProfile[],
) {
  centersMap = new Map(centers.map(c => [c.id, c]));
  driversMap = new Map(drivers.map(d => [d.id, d]));
  vehiclesMap = new Map(vehicles.map(v => [v.id, v]));
  profilesMap = new Map(profiles.map(p => [p.id, p]));
}

// C1: Incremental map updates after entity mutations
export function addToDriversMap(driver: Driver) {
  driversMap.set(driver.id, {
    id: driver.id,
    full_name: driver.fullName,
    didi_driver_id: driver.didiDriverId,
    center_id: driver.centerId,
    default_shift: driver.defaultShift as 'diurno' | 'nocturno',
    start_date: driver.startDate,
    status: driver.status,
    created_at: new Date().toISOString(),
  });
}

export function addToVehiclesMap(vehicle: Vehicle) {
  vehiclesMap.set(vehicle.id, {
    id: vehicle.id,
    plate: vehicle.plate,
    model: vehicle.model,
    oem: vehicle.oem as 'Geely' | 'JAC' | 'GAC',
    center_id: vehicle.centerId,
    status: vehicle.status,
    created_at: new Date().toISOString(),
  });
}

export function removeFromDriversMap(driverId: string) {
  driversMap.delete(driverId);
}

export function updateDriverStatusInMap(driverId: string, status: Driver['status']) {
  const existing = driversMap.get(driverId);
  if (existing) driversMap.set(driverId, { ...existing, status });
}

export function removeFromVehiclesMap(vehicleId: string) {
  vehiclesMap.delete(vehicleId);
}

export function updateVehicleStatusInMap(vehicleId: string, status: Vehicle['status']) {
  const existing = vehiclesMap.get(vehicleId);
  if (existing) vehiclesMap.set(vehicleId, { ...existing, status });
}

export function addToProfilesMap(user: User) {
  profilesMap.set(user.id, {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    center_id: user.centerId,
    status: user.status,
    created_at: new Date().toISOString(),
  });
}

export function getCenterName(centerId: string): string | undefined {
  return centersMap.get(centerId)?.name;
}

export function mapCenter(row: DbCenter): Center {
  return { id: row.id, name: row.name };
}

export function mapDriver(row: DbDriver): Driver {
  return {
    id: row.id,
    fullName: row.full_name,
    didiDriverId: row.didi_driver_id,
    centerId: row.center_id,
    defaultShift: row.default_shift,
    startDate: row.start_date,
    status: row.status,
  };
}

export function mapVehicle(row: DbVehicle): Vehicle {
  return {
    id: row.id,
    plate: row.plate,
    model: row.model,
    oem: row.oem,
    centerId: row.center_id,
    status: row.status,
  };
}

export function mapShift(row: DbShift): Shift {
  const driver = driversMap.get(row.driver_id);
  const vehicle = vehiclesMap.get(row.vehicle_id);
  const center = driver ? centersMap.get(driver.center_id) : undefined;

  if (!driver) console.warn(`mapShift: driver ${row.driver_id} not found in lookup map`);
  if (!vehicle) console.warn(`mapShift: vehicle ${row.vehicle_id} not found in lookup map`);

  return {
    id: row.id,
    driverId: row.driver_id,
    driverName: driver?.full_name ?? 'Desconocido',
    vehicleId: row.vehicle_id,
    plate: vehicle?.plate ?? 'Desconocido',
    model: vehicle?.model ?? 'Desconocido',
    center: center?.name ?? 'Desconocido',
    centerId: driver?.center_id ?? '',
    checkIn: row.check_in,
    checkOut: row.check_out ?? undefined,
    hoursWorked: row.hours_worked ?? undefined,
    status: row.status,
  };
}

/** Convert DB date YYYY-MM-DD to DD/MM/YYYY for UI Trip format. */
function formatDateForUI(isoDate: string): string {
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

export function mapTrip(row: DbTrip): Trip {
  const driver = driversMap.get(row.driver_id);
  if (!driver) console.warn(`mapTrip: driver ${row.driver_id} not found in lookup map — trip ${row.didi_trip_id} will be orphaned`);
  return {
    id: row.id,
    driverId: driver?.didi_driver_id ?? 0,
    fecha: formatDateForUI(row.date),
    tripId: row.didi_trip_id,
    horaInicio: row.initial_time,
    horaFin: row.final_time,
    costo: Number(row.cost),
    propina: Number(row.tip),
  };
}

export function mapProfile(row: DbProfile): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    centerId: row.center_id,
    status: row.status,
  };
}

export function mapPayroll(row: DbWeeklyPayroll): PayrollRecord {
  const driver = driversMap.get(row.driver_id);
  const center = driver ? centersMap.get(driver.center_id) : undefined;
  const closedByProfile = row.closed_by ? profilesMap.get(row.closed_by) : undefined;
  // Build week label from dates
  const ws = new Date(row.week_start + 'T00:00:00');
  const we = new Date(row.week_end + 'T00:00:00');
  const fmt = (d: Date) => d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  const weekLabel = `${fmt(ws)} – ${fmt(we)}, ${ws.getFullYear()}`;

  return {
    id: row.id,
    driverName: driver?.full_name ?? 'Desconocido',
    driverId: row.driver_id,
    centerId: driver?.center_id ?? '',
    center: center?.name ?? 'Desconocido',
    hoursWorked: Number(row.hours_worked),
    totalBilled: Number(row.total_billed),
    tipsTotal: Number(row.tips_total),
    hoursThreshold: Number(row.hours_threshold),
    revenueThreshold: Number(row.revenue_threshold),
    goalMet: row.goal_met,
    baseSalary: Number(row.base_salary),
    productivityBonus: Number(row.productivity_bonus),
    overtimePay: Number(row.overtime_pay),
    totalPay: Number(row.total_pay),
    status: row.status,
    weekLabel,
    weekStart: row.week_start,
    weekEnd: row.week_end,
    // M4: Fallback to closed_by UUID when profile not in map (supervisor RLS)
    closedBy: closedByProfile?.name ?? (row.closed_by ? `Usuario ${row.closed_by.slice(0, 8)}` : ''),
    closedAt: row.closed_at ?? undefined,
    version: row.version,
    aiExplanation: row.ai_explanation ?? undefined,
  };
}
