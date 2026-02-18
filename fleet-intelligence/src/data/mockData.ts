/**
 * Mock data for the Fleet Intelligence MVP demo.
 *
 * SCALE CONTEXT:
 *   This file contains a demo subset for edge-case testing:
 *   - 30 drivers, 12 vehicles, 3 centers, 68 trip records, 30 payroll records
 *
 *   Production scale:
 *   - 150 vehicles today (~300 drivers, ~10,800 trips/week, ~1,800 shifts/week)
 *   - 2,000 vehicles target (~4,000 drivers, ~144,000 trips/week, ~24,000 shifts/week)
 *
 *   What changes at production scale (see prd.md §7.7):
 *   - Pagination on trips, shifts, and payroll tables
 *   - Server-side payroll computation (Edge Function or pg function)
 *   - Chunked/streaming CSV upload (15–20 MB at 2K vehicles)
 *   - Lazy data loading per page (replaces fetchAllData)
 */
import { generateExplanation } from '../lib/explanation';

// ---- Centers ----

export interface Center {
  id: string;
  name: string;
}

export const MOCK_CENTERS: Center[] = [
  { id: 'c1', name: 'Vallejo' },
  { id: 'c2', name: 'Granada' },
  { id: 'c3', name: 'Roma' },
];

// ---- Drivers (30: 10 per center) ----

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
  // Vallejo (c1)
  { id: 'd1', fullName: 'Carlos Mendoza', didiDriverId: 114958, centerId: 'c1', defaultShift: 'diurno', startDate: '2025-10-15', status: 'activo' },
  { id: 'd2', fullName: 'Luis Hernández', didiDriverId: 114959, centerId: 'c1', defaultShift: 'diurno', startDate: '2025-10-20', status: 'activo' },
  { id: 'd3', fullName: 'Miguel Torres', didiDriverId: 114960, centerId: 'c1', defaultShift: 'nocturno', startDate: '2025-11-01', status: 'activo' },
  { id: 'd9', fullName: 'Andrés Morales', didiDriverId: 114966, centerId: 'c1', defaultShift: 'diurno', startDate: '2026-01-05', status: 'activo' },
  { id: 'd11', fullName: 'Jorge Castillo', didiDriverId: 114968, centerId: 'c1', defaultShift: 'nocturno', startDate: '2025-10-25', status: 'inactivo' },
  { id: 'd13', fullName: 'Héctor Juárez', didiDriverId: 114970, centerId: 'c1', defaultShift: 'diurno', startDate: '2025-11-05', status: 'activo' },
  { id: 'd14', fullName: 'Óscar Navarro', didiDriverId: 114971, centerId: 'c1', defaultShift: 'nocturno', startDate: '2025-11-20', status: 'activo' },
  { id: 'd15', fullName: 'Eduardo Ríos', didiDriverId: 114972, centerId: 'c1', defaultShift: 'diurno', startDate: '2025-12-15', status: 'activo' },
  { id: 'd16', fullName: 'Daniel Ortiz', didiDriverId: 114973, centerId: 'c1', defaultShift: 'nocturno', startDate: '2026-01-15', status: 'activo' },
  { id: 'd17', fullName: 'Sergio Guzmán', didiDriverId: 114974, centerId: 'c1', defaultShift: 'diurno', startDate: '2026-02-10', status: 'activo' },
  // Granada (c2)
  { id: 'd4', fullName: 'Roberto Díaz', didiDriverId: 114961, centerId: 'c2', defaultShift: 'diurno', startDate: '2025-11-10', status: 'activo' },
  { id: 'd5', fullName: 'Fernando López', didiDriverId: 114962, centerId: 'c2', defaultShift: 'nocturno', startDate: '2025-11-15', status: 'activo' },
  { id: 'd6', fullName: 'Alejandro Ramírez', didiDriverId: 114963, centerId: 'c2', defaultShift: 'diurno', startDate: '2025-12-01', status: 'activo' },
  { id: 'd12', fullName: 'Raúl Vargas', didiDriverId: 114969, centerId: 'c2', defaultShift: 'diurno', startDate: '2026-01-20', status: 'activo' },
  { id: 'd18', fullName: 'Manuel Peña', didiDriverId: 114975, centerId: 'c2', defaultShift: 'nocturno', startDate: '2025-10-18', status: 'activo' },
  { id: 'd19', fullName: 'Arturo Delgado', didiDriverId: 114976, centerId: 'c2', defaultShift: 'diurno', startDate: '2025-11-25', status: 'activo' },
  { id: 'd20', fullName: 'Iván Contreras', didiDriverId: 114977, centerId: 'c2', defaultShift: 'nocturno', startDate: '2025-12-08', status: 'activo' },
  { id: 'd21', fullName: 'Pablo Herrera', didiDriverId: 114978, centerId: 'c2', defaultShift: 'diurno', startDate: '2026-01-12', status: 'activo' },
  { id: 'd22', fullName: 'Gustavo Salazar', didiDriverId: 114979, centerId: 'c2', defaultShift: 'nocturno', startDate: '2026-01-28', status: 'activo' },
  { id: 'd23', fullName: 'Enrique Medina', didiDriverId: 114980, centerId: 'c2', defaultShift: 'diurno', startDate: '2026-02-14', status: 'activo' },
  // Roma (c3)
  { id: 'd7', fullName: 'Juan García', didiDriverId: 114964, centerId: 'c3', defaultShift: 'diurno', startDate: '2025-12-05', status: 'activo' },
  { id: 'd8', fullName: 'Pedro Sánchez', didiDriverId: 114965, centerId: 'c3', defaultShift: 'nocturno', startDate: '2025-12-10', status: 'activo' },
  { id: 'd10', fullName: 'Ricardo Flores', didiDriverId: 114967, centerId: 'c3', defaultShift: 'diurno', startDate: '2026-01-10', status: 'activo' },
  { id: 'd24', fullName: 'Francisco Mora', didiDriverId: 114981, centerId: 'c3', defaultShift: 'nocturno', startDate: '2025-10-22', status: 'activo' },
  { id: 'd25', fullName: 'Alberto Cruz', didiDriverId: 114982, centerId: 'c3', defaultShift: 'diurno', startDate: '2025-11-12', status: 'activo' },
  { id: 'd26', fullName: 'Javier Reyes', didiDriverId: 114983, centerId: 'c3', defaultShift: 'nocturno', startDate: '2025-12-03', status: 'activo' },
  { id: 'd27', fullName: 'Diego Luna', didiDriverId: 114984, centerId: 'c3', defaultShift: 'diurno', startDate: '2025-12-20', status: 'activo' },
  { id: 'd28', fullName: 'Ramón Aguilar', didiDriverId: 114985, centerId: 'c3', defaultShift: 'nocturno', startDate: '2026-01-08', status: 'activo' },
  { id: 'd29', fullName: 'Tomás Vega', didiDriverId: 114986, centerId: 'c3', defaultShift: 'diurno', startDate: '2026-02-01', status: 'activo' },
  { id: 'd30', fullName: 'Gabriel Estrada', didiDriverId: 114987, centerId: 'c3', defaultShift: 'nocturno', startDate: '2026-02-12', status: 'activo' },
];

// ---- Vehicles (12) ----

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
  { id: 'v3', plate: 'GHI-9012', model: 'E10X', oem: 'JAC', centerId: 'c1', status: 'en_turno' },
  { id: 'v4', plate: 'JKL-3456', model: 'Aion S', oem: 'GAC', centerId: 'c2', status: 'en_turno' },
  { id: 'v5', plate: 'MNO-7890', model: 'Geometry C', oem: 'Geely', centerId: 'c2', status: 'en_turno' },
  { id: 'v6', plate: 'PQR-1235', model: 'E10X', oem: 'JAC', centerId: 'c2', status: 'cargando' },
  { id: 'v7', plate: 'STU-4567', model: 'Aion S', oem: 'GAC', centerId: 'c3', status: 'en_turno' },
  { id: 'v8', plate: 'VWX-8901', model: 'Geometry C', oem: 'Geely', centerId: 'c3', status: 'disponible' },
  { id: 'v9', plate: 'YZA-2345', model: 'E10X', oem: 'JAC', centerId: 'c1', status: 'mantenimiento' },
  { id: 'v10', plate: 'BCD-6789', model: 'Aion S', oem: 'GAC', centerId: 'c3', status: 'en_turno' },
  { id: 'v11', plate: 'EFG-0123', model: 'Geometry C', oem: 'Geely', centerId: 'c1', status: 'en_turno' },
  { id: 'v12', plate: 'HIJ-4560', model: 'E10X', oem: 'JAC', centerId: 'c2', status: 'en_turno' },
];

// ---- Shifts (16: 6 active, 2 alert >12h, 6 completed, 2 pending) ----

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
  // Active shifts (en_turno)
  { id: 's1', driverId: 'd1', driverName: 'Carlos Mendoza', vehicleId: 'v2', plate: 'DEF-5678', model: 'Geometry C', center: 'Vallejo', centerId: 'c1', checkIn: hoursAgo(4), status: 'en_turno' },
  { id: 's2', driverId: 'd4', driverName: 'Roberto Díaz', vehicleId: 'v5', plate: 'MNO-7890', model: 'Geometry C', center: 'Granada', centerId: 'c2', checkIn: hoursAgo(6), status: 'en_turno' },
  { id: 's3', driverId: 'd7', driverName: 'Juan García', vehicleId: 'v10', plate: 'BCD-6789', model: 'Aion S', center: 'Roma', centerId: 'c3', checkIn: hoursAgo(3), status: 'en_turno' },
  { id: 's6', driverId: 'd13', driverName: 'Héctor Juárez', vehicleId: 'v11', plate: 'EFG-0123', model: 'Geometry C', center: 'Vallejo', centerId: 'c1', checkIn: hoursAgo(2), status: 'en_turno' },
  { id: 's7', driverId: 'd18', driverName: 'Manuel Peña', vehicleId: 'v12', plate: 'HIJ-4560', model: 'E10X', center: 'Granada', centerId: 'c2', checkIn: hoursAgo(5), status: 'en_turno' },
  { id: 's8', driverId: 'd24', driverName: 'Francisco Mora', vehicleId: 'v7', plate: 'STU-4567', model: 'Aion S', center: 'Roma', centerId: 'c3', checkIn: hoursAgo(1), status: 'en_turno' },
  // Alert shifts (>12h open — triggers pendiente_revision)
  { id: 's9', driverId: 'd3', driverName: 'Miguel Torres', vehicleId: 'v3', plate: 'GHI-9012', model: 'E10X', center: 'Vallejo', centerId: 'c1', checkIn: hoursAgo(14), status: 'en_turno' },
  { id: 's10', driverId: 'd20', driverName: 'Iván Contreras', vehicleId: 'v4', plate: 'JKL-3456', model: 'Aion S', center: 'Granada', centerId: 'c2', checkIn: hoursAgo(16), status: 'en_turno' },
  // Completed shifts (today)
  { id: 's4', driverId: 'd2', driverName: 'Luis Hernández', vehicleId: 'v1', plate: 'ABC-1234', model: 'Geometry C', center: 'Vallejo', centerId: 'c1', checkIn: hoursAgo(22), checkOut: hoursAgo(14), hoursWorked: 8, status: 'completado' },
  { id: 's5', driverId: 'd5', driverName: 'Fernando López', vehicleId: 'v6', plate: 'PQR-1235', model: 'E10X', center: 'Granada', centerId: 'c2', checkIn: hoursAgo(20), checkOut: hoursAgo(12), hoursWorked: 8, status: 'completado' },
  { id: 's11', driverId: 'd8', driverName: 'Pedro Sánchez', vehicleId: 'v8', plate: 'VWX-8901', model: 'Geometry C', center: 'Roma', centerId: 'c3', checkIn: hoursAgo(19), checkOut: hoursAgo(11), hoursWorked: 8, status: 'completado' },
  { id: 's12', driverId: 'd9', driverName: 'Andrés Morales', vehicleId: 'v1', plate: 'ABC-1234', model: 'Geometry C', center: 'Vallejo', centerId: 'c1', checkIn: hoursAgo(11), checkOut: hoursAgo(3), hoursWorked: 8, status: 'completado' },
  { id: 's13', driverId: 'd6', driverName: 'Alejandro Ramírez', vehicleId: 'v6', plate: 'PQR-1235', model: 'E10X', center: 'Granada', centerId: 'c2', checkIn: hoursAgo(10), checkOut: hoursAgo(2), hoursWorked: 8, status: 'completado' },
  { id: 's14', driverId: 'd25', driverName: 'Alberto Cruz', vehicleId: 'v8', plate: 'VWX-8901', model: 'Geometry C', center: 'Roma', centerId: 'c3', checkIn: hoursAgo(11), checkOut: hoursAgo(3), hoursWorked: 8, status: 'completado' },
  // Additional completed from earlier
  { id: 's15', driverId: 'd19', driverName: 'Arturo Delgado', vehicleId: 'v12', plate: 'HIJ-4560', model: 'E10X', center: 'Granada', centerId: 'c2', checkIn: hoursAgo(26), checkOut: hoursAgo(17), hoursWorked: 9, status: 'completado' },
  { id: 's16', driverId: 'd27', driverName: 'Diego Luna', vehicleId: 'v7', plate: 'STU-4567', model: 'Aion S', center: 'Roma', centerId: 'c3', checkIn: hoursAgo(25), checkOut: hoursAgo(16), hoursWorked: 9, status: 'completado' },
];

// ---- Users (4: 1 admin + 3 supervisors) ----

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
  { id: 'u3', name: 'Carlos Supervisor', email: 'carlos@lafa.mx', role: 'supervisor', centerId: 'c2', status: 'activo', password: 'super123' },
  { id: 'u4', name: 'Ana Supervisor', email: 'ana@lafa.mx', role: 'supervisor', centerId: 'c3', status: 'activo', password: 'super123' },
];

// ---- Trips (current week: 16/02/2026 – 22/02/2026) ----
// Mixed format: d1 (Feb 16) uses individual ride-level records matching the brief's CSV format.
// Remaining entries use daily billing aggregates for MVP simplicity.
// The CSV parser and payroll engine handle both formats identically (they sum `costo` per driver per week).

export const MOCK_TRIPS: { id: string; driverId: number; fecha: string; tripId: string; horaInicio: string; horaFin: string; costo: number; propina: number }[] = [
  // d1 — Carlos Mendoza (114958, Vallejo) — High earner → ~$9,500
  // Feb 16: INDIVIDUAL TRIPS (9 trips, total $1,520, tips $80) — matches brief CSV format
  { id: 't01a', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n1', horaInicio: '5:32:00', horaFin: '6:18:00', costo: 185.50, propina: 0 },
  { id: 't01b', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n2', horaInicio: '6:30:00', horaFin: '7:15:00', costo: 195.00, propina: 30 },
  { id: 't01c', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n3', horaInicio: '7:35:00', horaFin: '8:10:00', costo: 142.80, propina: 0 },
  { id: 't01d', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n4', horaInicio: '8:25:00', horaFin: '9:15:00', costo: 188.20, propina: 0 },
  { id: 't01e', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n5', horaInicio: '9:30:00', horaFin: '10:20:00', costo: 210.50, propina: 50 },
  { id: 't01f', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n6', horaInicio: '10:40:00', horaFin: '11:15:00', costo: 125.36, propina: 0 },
  { id: 't01g', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n7', horaInicio: '12:00:00', horaFin: '12:45:00', costo: 178.64, propina: 0 },
  { id: 't01h', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n8', horaInicio: '13:05:00', horaFin: '13:50:00', costo: 155.00, propina: 0 },
  { id: 't01i', driverId: 114958, fecha: '16/02/2026', tripId: 'k3m8n9', horaInicio: '14:10:00', horaFin: '15:00:00', costo: 139.00, propina: 0 },
  // Feb 17–21: DAILY AGGREGATES (remaining days)
  { id: 't02', driverId: 114958, fecha: '17/02/2026', tripId: 'p4q9r1', horaInicio: '05:15', horaFin: '17:00', costo: 1680, propina: 120 },
  { id: 't03', driverId: 114958, fecha: '18/02/2026', tripId: 'v2w7x5', horaInicio: '05:45', horaFin: '17:15', costo: 1450, propina: 0 },
  { id: 't04', driverId: 114958, fecha: '19/02/2026', tripId: 'b6c1d8', horaInicio: '05:30', horaFin: '17:30', costo: 1590, propina: 60 },
  { id: 't05', driverId: 114958, fecha: '20/02/2026', tripId: 'h9j3k7', horaInicio: '05:00', horaFin: '17:45', costo: 1720, propina: 90 },
  { id: 't06', driverId: 114958, fecha: '21/02/2026', tripId: 'n5p0q4', horaInicio: '06:00', horaFin: '17:00', costo: 1540, propina: 0 },
  // d4 — Roberto Díaz (114961, Granada) — High earner → ~$8,540
  { id: 't07', driverId: 114961, fecha: '16/02/2026', tripId: 't8u2v6', horaInicio: '05:30', horaFin: '17:30', costo: 1680, propina: 0 },
  { id: 't08', driverId: 114961, fecha: '17/02/2026', tripId: 'z3a7b1', horaInicio: '05:15', horaFin: '17:15', costo: 1750, propina: 100 },
  { id: 't09', driverId: 114961, fecha: '18/02/2026', tripId: 'f5g9h3', horaInicio: '05:45', horaFin: '17:00', costo: 1590, propina: 0 },
  { id: 't10', driverId: 114961, fecha: '19/02/2026', tripId: 'l7m1n5', horaInicio: '05:30', horaFin: '17:30', costo: 1820, propina: 80 },
  { id: 't11', driverId: 114961, fecha: '20/02/2026', tripId: 'r9s3t7', horaInicio: '05:00', horaFin: '17:00', costo: 1700, propina: 0 },
  // d7 — Juan García (114964, Roma) — High earner → ~$8,040
  { id: 't12', driverId: 114964, fecha: '16/02/2026', tripId: 'x1y5z9', horaInicio: '05:30', horaFin: '17:00', costo: 1550, propina: 0 },
  { id: 't13', driverId: 114964, fecha: '17/02/2026', tripId: 'd3e7f1', horaInicio: '05:15', horaFin: '17:30', costo: 1680, propina: 90 },
  { id: 't14', driverId: 114964, fecha: '18/02/2026', tripId: 'j5k9l3', horaInicio: '05:45', horaFin: '17:15', costo: 1720, propina: 0 },
  { id: 't15', driverId: 114964, fecha: '19/02/2026', tripId: 'p7q1r5', horaInicio: '05:30', horaFin: '17:00', costo: 1490, propina: 0 },
  { id: 't16', driverId: 114964, fecha: '20/02/2026', tripId: 'v9w3x7', horaInicio: '05:00', horaFin: '17:45', costo: 1600, propina: 60 },
  // d18 — Manuel Peña (114975, Granada) — Top earner → ~$10,750
  { id: 't17', driverId: 114975, fecha: '16/02/2026', tripId: 'b1c5d9', horaInicio: '19:00', horaFin: '07:00', costo: 1920, propina: 150 },
  { id: 't18', driverId: 114975, fecha: '17/02/2026', tripId: 'h3j7k1', horaInicio: '19:00', horaFin: '07:00', costo: 1850, propina: 0 },
  { id: 't19', driverId: 114975, fecha: '18/02/2026', tripId: 'n5p9q3', horaInicio: '19:00', horaFin: '07:00', costo: 1780, propina: 80 },
  { id: 't20', driverId: 114975, fecha: '19/02/2026', tripId: 't7u1v5', horaInicio: '19:00', horaFin: '07:00', costo: 1690, propina: 0 },
  { id: 't21', driverId: 114975, fecha: '20/02/2026', tripId: 'z9a3b7', horaInicio: '19:00', horaFin: '07:00', costo: 1930, propina: 100 },
  { id: 't22', driverId: 114975, fecha: '21/02/2026', tripId: 'f1g5h9', horaInicio: '19:00', horaFin: '07:00', costo: 1580, propina: 0 },
  // d2 — Luis Hernández (114959, Vallejo) — Medium → ~$6,500
  { id: 't23', driverId: 114959, fecha: '16/02/2026', tripId: 'l3m7n1', horaInicio: '05:30', horaFin: '17:30', costo: 1650, propina: 0 },
  { id: 't24', driverId: 114959, fecha: '17/02/2026', tripId: 'r5s9t3', horaInicio: '05:15', horaFin: '17:00', costo: 1580, propina: 40 },
  { id: 't25', driverId: 114959, fecha: '18/02/2026', tripId: 'x7y1z5', horaInicio: '05:45', horaFin: '17:15', costo: 1720, propina: 0 },
  { id: 't26', driverId: 114959, fecha: '19/02/2026', tripId: 'd9e3f7', horaInicio: '05:30', horaFin: '17:30', costo: 1550, propina: 0 },
  // d5 — Fernando López (114962, Granada) — Medium → ~$6,250
  { id: 't27', driverId: 114962, fecha: '16/02/2026', tripId: 'j1k5l9', horaInicio: '19:00', horaFin: '07:00', costo: 1620, propina: 0 },
  { id: 't28', driverId: 114962, fecha: '17/02/2026', tripId: 'p3q7r1', horaInicio: '19:00', horaFin: '07:00', costo: 1540, propina: 60 },
  { id: 't29', driverId: 114962, fecha: '18/02/2026', tripId: 'v5w9x3', horaInicio: '19:00', horaFin: '07:00', costo: 1580, propina: 0 },
  { id: 't30', driverId: 114962, fecha: '19/02/2026', tripId: 'b7c1d5', horaInicio: '19:00', horaFin: '07:00', costo: 1510, propina: 0 },
  // d6 — Alejandro Ramírez (114963, Granada) — Medium → ~$6,900
  { id: 't31', driverId: 114963, fecha: '16/02/2026', tripId: 'h9j3k7', horaInicio: '05:30', horaFin: '17:30', costo: 1750, propina: 0 },
  { id: 't32', driverId: 114963, fecha: '17/02/2026', tripId: 'n1p5q9', horaInicio: '05:15', horaFin: '17:00', costo: 1680, propina: 80 },
  { id: 't33', driverId: 114963, fecha: '18/02/2026', tripId: 't3u7v1', horaInicio: '05:45', horaFin: '17:15', costo: 1620, propina: 0 },
  { id: 't34', driverId: 114963, fecha: '19/02/2026', tripId: 'z5a9b3', horaInicio: '05:30', horaFin: '17:30', costo: 1850, propina: 0 },
  // d8 — Pedro Sánchez (114965, Roma) — Medium → ~$6,220
  { id: 't35', driverId: 114965, fecha: '16/02/2026', tripId: 'f7g1h5', horaInicio: '19:00', horaFin: '07:00', costo: 1580, propina: 0 },
  { id: 't36', driverId: 114965, fecha: '17/02/2026', tripId: 'l9m3n7', horaInicio: '19:00', horaFin: '07:00', costo: 1520, propina: 0 },
  { id: 't37', driverId: 114965, fecha: '18/02/2026', tripId: 'r1s5t9', horaInicio: '19:00', horaFin: '07:00', costo: 1640, propina: 0 },
  { id: 't38', driverId: 114965, fecha: '19/02/2026', tripId: 'x3y7z1', horaInicio: '19:00', horaFin: '07:00', costo: 1480, propina: 0 },
  // d13 — Héctor Juárez (114970, Vallejo) — Medium-high → ~$7,200
  { id: 't39', driverId: 114970, fecha: '16/02/2026', tripId: 'd5e9f3', horaInicio: '05:30', horaFin: '17:30', costo: 1850, propina: 0 },
  { id: 't40', driverId: 114970, fecha: '17/02/2026', tripId: 'j7k1l5', horaInicio: '05:15', horaFin: '17:00', costo: 1920, propina: 100 },
  { id: 't41', driverId: 114970, fecha: '18/02/2026', tripId: 'p9q3r7', horaInicio: '05:45', horaFin: '17:15', costo: 1780, propina: 0 },
  { id: 't42', driverId: 114970, fecha: '19/02/2026', tripId: 'v1w5x9', horaInicio: '05:30', horaFin: '17:30', costo: 1650, propina: 0 },
  // d25 — Alberto Cruz (114982, Roma) — Medium → ~$6,250
  { id: 't43', driverId: 114982, fecha: '16/02/2026', tripId: 'b3c7d1', horaInicio: '05:30', horaFin: '17:00', costo: 1620, propina: 0 },
  { id: 't44', driverId: 114982, fecha: '17/02/2026', tripId: 'h5j9k3', horaInicio: '05:15', horaFin: '17:30', costo: 1580, propina: 0 },
  { id: 't45', driverId: 114982, fecha: '18/02/2026', tripId: 'n7p1q5', horaInicio: '05:45', horaFin: '17:15', costo: 1540, propina: 0 },
  { id: 't46', driverId: 114982, fecha: '19/02/2026', tripId: 't9u3v7', horaInicio: '05:30', horaFin: '17:00', costo: 1510, propina: 0 },
  // d3 — Miguel Torres (114960, Vallejo) — Low → ~$4,450
  { id: 't47', driverId: 114960, fecha: '16/02/2026', tripId: 'z1a5b9', horaInicio: '19:00', horaFin: '07:00', costo: 1520, propina: 0 },
  { id: 't48', driverId: 114960, fecha: '17/02/2026', tripId: 'f3g7h1', horaInicio: '19:00', horaFin: '07:00', costo: 1480, propina: 0 },
  { id: 't49', driverId: 114960, fecha: '18/02/2026', tripId: 'l5m9n3', horaInicio: '19:00', horaFin: '07:00', costo: 1450, propina: 0 },
  // d9 — Andrés Morales (114966, Vallejo) — Low → ~$3,800
  { id: 't50', driverId: 114966, fecha: '16/02/2026', tripId: 'r7s1t5', horaInicio: '05:30', horaFin: '17:30', costo: 1950, propina: 0 },
  { id: 't51', driverId: 114966, fecha: '17/02/2026', tripId: 'x9y3z7', horaInicio: '05:15', horaFin: '17:00', costo: 1850, propina: 0 },
  // d10 — Ricardo Flores (114967, Roma) — Low, just missed → ~$5,950
  { id: 't52', driverId: 114967, fecha: '16/02/2026', tripId: 'd1e5f9', horaInicio: '05:30', horaFin: '17:00', costo: 1520, propina: 0 },
  { id: 't53', driverId: 114967, fecha: '17/02/2026', tripId: 'j3k7l1', horaInicio: '05:15', horaFin: '17:30', costo: 1480, propina: 0 },
  { id: 't54', driverId: 114967, fecha: '18/02/2026', tripId: 'p5q9r3', horaInicio: '05:45', horaFin: '17:15', costo: 1510, propina: 0 },
  { id: 't55', driverId: 114967, fecha: '19/02/2026', tripId: 'v7w1x5', horaInicio: '05:30', horaFin: '17:00', costo: 1440, propina: 0 },
  // d14 — Óscar Navarro (114971, Vallejo) — Low → ~$3,200
  { id: 't56', driverId: 114971, fecha: '16/02/2026', tripId: 'b9c3d7', horaInicio: '19:00', horaFin: '07:00', costo: 1680, propina: 0 },
  { id: 't57', driverId: 114971, fecha: '17/02/2026', tripId: 'h1j5k9', horaInicio: '19:00', horaFin: '07:00', costo: 1520, propina: 0 },
  // d24 — Francisco Mora (114981, Roma) — Low → ~$4,950
  { id: 't58', driverId: 114981, fecha: '16/02/2026', tripId: 'n3p7q1', horaInicio: '19:00', horaFin: '07:00', costo: 1720, propina: 0 },
  { id: 't59', driverId: 114981, fecha: '17/02/2026', tripId: 't5u9v3', horaInicio: '19:00', horaFin: '07:00', costo: 1680, propina: 0 },
  { id: 't60', driverId: 114981, fecha: '18/02/2026', tripId: 'z7a1b5', horaInicio: '19:00', horaFin: '07:00', costo: 1550, propina: 0 },
];

// ---- Closed Payroll (previous week: 10 feb – 16 feb, 2026) ----
// 30 records: 18 goal met + 12 goal not met

const CLOSED_WEEK_LABEL = '10 feb – 16 feb, 2026';
const CLOSED_WEEK_START = '2026-02-10';
const CLOSED_WEEK_END = '2026-02-16';
const CLOSED_AT = '2026-02-16T20:00:00.000Z';

const _closedPayrollBase = [
  // Goal met (18 drivers)
  { id: 'pr-d1-prev', driverName: 'Carlos Mendoza', driverId: 'd1', centerId: 'c1', center: 'Vallejo', hoursWorked: 45, totalBilled: 9200, goalMet: true, baseSalary: 2500, productivityBonus: 600, overtimePay: 250, totalPay: 3350 },
  { id: 'pr-d2-prev', driverName: 'Luis Hernández', driverId: 'd2', centerId: 'c1', center: 'Vallejo', hoursWorked: 42, totalBilled: 6800, goalMet: true, baseSalary: 2500, productivityBonus: 100, overtimePay: 100, totalPay: 2700 },
  { id: 'pr-d4-prev', driverName: 'Roberto Díaz', driverId: 'd4', centerId: 'c2', center: 'Granada', hoursWorked: 44, totalBilled: 8500, goalMet: true, baseSalary: 2500, productivityBonus: 500, overtimePay: 200, totalPay: 3200 },
  { id: 'pr-d5-prev', driverName: 'Fernando López', driverId: 'd5', centerId: 'c2', center: 'Granada', hoursWorked: 41, totalBilled: 6100, goalMet: true, baseSalary: 2500, productivityBonus: 0, overtimePay: 50, totalPay: 2550 },
  { id: 'pr-d6-prev', driverName: 'Alejandro Ramírez', driverId: 'd6', centerId: 'c2', center: 'Granada', hoursWorked: 43, totalBilled: 7800, goalMet: true, baseSalary: 2500, productivityBonus: 300, overtimePay: 150, totalPay: 2950 },
  { id: 'pr-d7-prev', driverName: 'Juan García', driverId: 'd7', centerId: 'c3', center: 'Roma', hoursWorked: 46, totalBilled: 9500, goalMet: true, baseSalary: 2500, productivityBonus: 700, overtimePay: 300, totalPay: 3500 },
  { id: 'pr-d8-prev', driverName: 'Pedro Sánchez', driverId: 'd8', centerId: 'c3', center: 'Roma', hoursWorked: 40, totalBilled: 6000, goalMet: true, baseSalary: 2500, productivityBonus: 0, overtimePay: 0, totalPay: 2500 },
  { id: 'pr-d12-prev', driverName: 'Raúl Vargas', driverId: 'd12', centerId: 'c2', center: 'Granada', hoursWorked: 41, totalBilled: 6300, goalMet: true, baseSalary: 2500, productivityBonus: 0, overtimePay: 50, totalPay: 2550 },
  { id: 'pr-d13-prev', driverName: 'Héctor Juárez', driverId: 'd13', centerId: 'c1', center: 'Vallejo', hoursWorked: 44, totalBilled: 8400, goalMet: true, baseSalary: 2500, productivityBonus: 400, overtimePay: 200, totalPay: 3100 },
  { id: 'pr-d14-prev', driverName: 'Óscar Navarro', driverId: 'd14', centerId: 'c1', center: 'Vallejo', hoursWorked: 41, totalBilled: 6500, goalMet: true, baseSalary: 2500, productivityBonus: 100, overtimePay: 50, totalPay: 2650 },
  { id: 'pr-d18-prev', driverName: 'Manuel Peña', driverId: 'd18', centerId: 'c2', center: 'Granada', hoursWorked: 48, totalBilled: 10200, goalMet: true, baseSalary: 2500, productivityBonus: 800, overtimePay: 400, totalPay: 3700 },
  { id: 'pr-d19-prev', driverName: 'Arturo Delgado', driverId: 'd19', centerId: 'c2', center: 'Granada', hoursWorked: 41, totalBilled: 6200, goalMet: true, baseSalary: 2500, productivityBonus: 0, overtimePay: 50, totalPay: 2550 },
  { id: 'pr-d21-prev', driverName: 'Pablo Herrera', driverId: 'd21', centerId: 'c2', center: 'Granada', hoursWorked: 43, totalBilled: 7100, goalMet: true, baseSalary: 2500, productivityBonus: 200, overtimePay: 150, totalPay: 2850 },
  { id: 'pr-d24-prev', driverName: 'Francisco Mora', driverId: 'd24', centerId: 'c3', center: 'Roma', hoursWorked: 42, totalBilled: 7400, goalMet: true, baseSalary: 2500, productivityBonus: 200, overtimePay: 100, totalPay: 2800 },
  { id: 'pr-d25-prev', driverName: 'Alberto Cruz', driverId: 'd25', centerId: 'c3', center: 'Roma', hoursWorked: 45, totalBilled: 8800, goalMet: true, baseSalary: 2500, productivityBonus: 500, overtimePay: 250, totalPay: 3250 },
  { id: 'pr-d26-prev', driverName: 'Javier Reyes', driverId: 'd26', centerId: 'c3', center: 'Roma', hoursWorked: 40, totalBilled: 6050, goalMet: true, baseSalary: 2500, productivityBonus: 0, overtimePay: 0, totalPay: 2500 },
  { id: 'pr-d27-prev', driverName: 'Diego Luna', driverId: 'd27', centerId: 'c3', center: 'Roma', hoursWorked: 43, totalBilled: 6900, goalMet: true, baseSalary: 2500, productivityBonus: 100, overtimePay: 150, totalPay: 2750 },
  { id: 'pr-d28-prev', driverName: 'Ramón Aguilar', driverId: 'd28', centerId: 'c3', center: 'Roma', hoursWorked: 41, totalBilled: 6400, goalMet: true, baseSalary: 2500, productivityBonus: 0, overtimePay: 50, totalPay: 2550 },
  // Goal not met (12 drivers)
  { id: 'pr-d3-prev', driverName: 'Miguel Torres', driverId: 'd3', centerId: 'c1', center: 'Vallejo', hoursWorked: 38, totalBilled: 7200, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d9-prev', driverName: 'Andrés Morales', driverId: 'd9', centerId: 'c1', center: 'Vallejo', hoursWorked: 42, totalBilled: 5800, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d10-prev', driverName: 'Ricardo Flores', driverId: 'd10', centerId: 'c3', center: 'Roma', hoursWorked: 40, totalBilled: 5999, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d11-prev', driverName: 'Jorge Castillo', driverId: 'd11', centerId: 'c1', center: 'Vallejo', hoursWorked: 30, totalBilled: 3500, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d15-prev', driverName: 'Eduardo Ríos', driverId: 'd15', centerId: 'c1', center: 'Vallejo', hoursWorked: 36, totalBilled: 5500, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d16-prev', driverName: 'Daniel Ortiz', driverId: 'd16', centerId: 'c1', center: 'Vallejo', hoursWorked: 32, totalBilled: 3200, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d17-prev', driverName: 'Sergio Guzmán', driverId: 'd17', centerId: 'c1', center: 'Vallejo', hoursWorked: 20, totalBilled: 2800, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d20-prev', driverName: 'Iván Contreras', driverId: 'd20', centerId: 'c2', center: 'Granada', hoursWorked: 39, totalBilled: 6800, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d22-prev', driverName: 'Gustavo Salazar', driverId: 'd22', centerId: 'c2', center: 'Granada', hoursWorked: 40, totalBilled: 5200, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d23-prev', driverName: 'Enrique Medina', driverId: 'd23', centerId: 'c2', center: 'Granada', hoursWorked: 10, totalBilled: 1500, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d29-prev', driverName: 'Tomás Vega', driverId: 'd29', centerId: 'c3', center: 'Roma', hoursWorked: 35, totalBilled: 4800, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
  { id: 'pr-d30-prev', driverName: 'Gabriel Estrada', driverId: 'd30', centerId: 'c3', center: 'Roma', hoursWorked: 18, totalBilled: 2200, goalMet: false, baseSalary: 0, productivityBonus: 0, overtimePay: 0, totalPay: 1000 },
];

export const MOCK_PAYROLL = _closedPayrollBase.map(r => {
  const hoursThreshold = 40;
  const revenueThreshold = 6000;
  const withThresholds = { ...r, hoursThreshold, revenueThreshold };
  return {
    ...withThresholds,
    status: 'cerrado' as const,
    weekLabel: CLOSED_WEEK_LABEL,
    weekStart: CLOSED_WEEK_START,
    weekEnd: CLOSED_WEEK_END,
    closedBy: 'Admin LAFA',
    closedAt: CLOSED_AT,
    version: 1,
    aiExplanation: generateExplanation(withThresholds),
  };
});

// ---- Utility functions ----

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

