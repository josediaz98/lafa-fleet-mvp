export interface Center {
  id: string;
  name: string;
}

export const MOCK_CENTERS: Center[] = [
  { id: 'c1', name: 'Centro Norte' },
  { id: 'c2', name: 'Centro Sur' },
  { id: 'c3', name: 'Centro Poniente' },
];

export interface MockDriver {
  id: string;
  fullName: string;
  didiDriverId: number;
  centerId: string;
  defaultShift: string;
  startDate: string;
  status: string;
}

export const MOCK_DRIVERS: MockDriver[] = [
  { id: 'd1', fullName: 'Carlos Mendoza', didiDriverId: 114958, centerId: 'c1', defaultShift: 'diurno', startDate: '2025-10-15', status: 'activo' },
  { id: 'd2', fullName: 'Luis Hernández', didiDriverId: 114959, centerId: 'c1', defaultShift: 'diurno', startDate: '2025-10-20', status: 'activo' },
  { id: 'd3', fullName: 'Miguel Torres', didiDriverId: 114960, centerId: 'c1', defaultShift: 'nocturno', startDate: '2025-11-01', status: 'activo' },
  { id: 'd4', fullName: 'Roberto Díaz', didiDriverId: 114961, centerId: 'c2', defaultShift: 'diurno', startDate: '2025-11-10', status: 'activo' },
  { id: 'd5', fullName: 'Fernando López', didiDriverId: 114962, centerId: 'c2', defaultShift: 'nocturno', startDate: '2025-11-15', status: 'activo' },
  { id: 'd6', fullName: 'Alejandro Ramírez', didiDriverId: 114963, centerId: 'c2', defaultShift: 'diurno', startDate: '2025-12-01', status: 'activo' },
  { id: 'd7', fullName: 'Juan García', didiDriverId: 114964, centerId: 'c3', defaultShift: 'diurno', startDate: '2025-12-05', status: 'activo' },
  { id: 'd8', fullName: 'Pedro Sánchez', didiDriverId: 114965, centerId: 'c3', defaultShift: 'nocturno', startDate: '2025-12-10', status: 'activo' },
  { id: 'd9', fullName: 'Andrés Morales', didiDriverId: 114966, centerId: 'c1', defaultShift: 'diurno', startDate: '2026-01-05', status: 'activo' },
  { id: 'd10', fullName: 'Ricardo Flores', didiDriverId: 114967, centerId: 'c3', defaultShift: 'diurno', startDate: '2026-01-10', status: 'activo' },
  { id: 'd11', fullName: 'Jorge Castillo', didiDriverId: 114968, centerId: 'c1', defaultShift: 'nocturno', startDate: '2025-10-25', status: 'inactivo' },
  { id: 'd12', fullName: 'Raúl Vargas', didiDriverId: 114969, centerId: 'c2', defaultShift: 'diurno', startDate: '2026-01-20', status: 'activo' },
];

export interface MockVehicle {
  id: string;
  plate: string;
  model: string;
  oem: string;
  centerId: string;
  status: string;
}

export const MOCK_VEHICLES: MockVehicle[] = [
  { id: 'v1', plate: 'ABC-1234', model: 'Geometry C', oem: 'Geely', centerId: 'c1', status: 'disponible' },
  { id: 'v2', plate: 'DEF-5678', model: 'Geometry C', oem: 'Geely', centerId: 'c1', status: 'en_turno' },
  { id: 'v3', plate: 'GHI-9012', model: 'E10X', oem: 'JAC', centerId: 'c1', status: 'disponible' },
  { id: 'v4', plate: 'JKL-3456', model: 'Aion S', oem: 'GAC', centerId: 'c2', status: 'disponible' },
  { id: 'v5', plate: 'MNO-7890', model: 'Geometry C', oem: 'Geely', centerId: 'c2', status: 'en_turno' },
  { id: 'v6', plate: 'PQR-1235', model: 'E10X', oem: 'JAC', centerId: 'c2', status: 'cargando' },
  { id: 'v7', plate: 'STU-4567', model: 'Aion S', oem: 'GAC', centerId: 'c3', status: 'disponible' },
  { id: 'v8', plate: 'VWX-8901', model: 'Geometry C', oem: 'Geely', centerId: 'c3', status: 'disponible' },
  { id: 'v9', plate: 'YZA-2345', model: 'E10X', oem: 'JAC', centerId: 'c1', status: 'mantenimiento' },
  { id: 'v10', plate: 'BCD-6789', model: 'Aion S', oem: 'GAC', centerId: 'c3', status: 'en_turno' },
  { id: 'v11', plate: 'EFG-0123', model: 'Geometry C', oem: 'Geely', centerId: 'c1', status: 'disponible' },
  { id: 'v12', plate: 'HIJ-4560', model: 'E10X', oem: 'JAC', centerId: 'c2', status: 'disponible' },
];

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * 3600000).toISOString();
}

export interface MockShift {
  id: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  plate: string;
  model: string;
  center: string;
  centerId: string;
  checkIn: string;
  checkOut?: string;
  hoursWorked?: number;
  status: string;
}

export const MOCK_SHIFTS: MockShift[] = [
  { id: 's1', driverId: 'd1', driverName: 'Carlos Mendoza', vehicleId: 'v2', plate: 'DEF-5678', model: 'Geometry C', center: 'Centro Norte', centerId: 'c1', checkIn: hoursAgo(4), status: 'en_turno' },
  { id: 's2', driverId: 'd4', driverName: 'Roberto Díaz', vehicleId: 'v5', plate: 'MNO-7890', model: 'Geometry C', center: 'Centro Sur', centerId: 'c2', checkIn: hoursAgo(6), status: 'en_turno' },
  { id: 's3', driverId: 'd7', driverName: 'Juan García', vehicleId: 'v10', plate: 'BCD-6789', model: 'Aion S', center: 'Centro Poniente', centerId: 'c3', checkIn: hoursAgo(14), status: 'en_turno' },
  { id: 's4', driverId: 'd2', driverName: 'Luis Hernández', vehicleId: 'v1', plate: 'ABC-1234', model: 'Geometry C', center: 'Centro Norte', centerId: 'c1', checkIn: hoursAgo(20), checkOut: hoursAgo(12), hoursWorked: 8, status: 'completado' },
  { id: 's5', driverId: 'd5', driverName: 'Fernando López', vehicleId: 'v4', plate: 'JKL-3456', model: 'Aion S', center: 'Centro Sur', centerId: 'c2', checkIn: hoursAgo(18), checkOut: hoursAgo(10), hoursWorked: 8, status: 'completado' },
];

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  centerId: string | null;
  status: string;
  password: string;
}

export const MOCK_USERS: MockUser[] = [
  { id: 'u1', name: 'Admin LAFA', email: 'admin@lafa.mx', role: 'admin', centerId: null, status: 'activo', password: 'admin123' },
  { id: 'u2', name: 'María Supervisor', email: 'maria@lafa.mx', role: 'supervisor', centerId: 'c1', status: 'activo', password: 'super123' },
];

export const MOCK_TRIPS: { id: string; driverId: number; fecha: string; tripId: string; horaInicio: string; horaFin: string; costo: number; propina: number }[] = [];

export const MOCK_PAYROLL: never[] = [];

// Utility functions

export function formatTime(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

export function getElapsedTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
