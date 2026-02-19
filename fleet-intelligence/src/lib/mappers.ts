import type { Center, Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';
import type {
  DbCenter, DbProfile, DbDriver, DbVehicle, DbShift, DbTrip, DbWeeklyPayroll,
} from '@/lib/supabase/types';

// Lookup maps built once per HYDRATE
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

  return {
    id: row.id,
    driverId: row.driver_id,
    driverName: driver?.full_name ?? '',
    vehicleId: row.vehicle_id,
    plate: vehicle?.plate ?? '',
    model: vehicle?.model ?? '',
    center: center?.name ?? '',
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
    password: '', // Not stored client-side with Supabase auth
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
  const weekLabel = `${fmt(ws)} \u2013 ${fmt(we)}, ${ws.getFullYear()}`;

  return {
    id: row.id,
    driverName: driver?.full_name ?? '',
    driverId: row.driver_id,
    centerId: driver?.center_id ?? '',
    center: center?.name ?? '',
    hoursWorked: Number(row.hours_worked),
    totalBilled: Number(row.total_billed),
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
    closedBy: closedByProfile?.name ?? row.closed_by ?? '',
    closedAt: row.closed_at ?? undefined,
    version: row.version,
    aiExplanation: row.ai_explanation ?? undefined,
  };
}
