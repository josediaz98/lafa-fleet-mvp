import type { Driver, Vehicle, User } from '@/types';

export const DEV_DRIVERS: Driver[] = [
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
  { id: 'd17', fullName: 'Sergio Guzmán', didiDriverId: 114974, centerId: 'c1', defaultShift: 'diurno', startDate: '2026-02-18', status: 'activo' },
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
  { id: 'd23', fullName: 'Enrique Medina', didiDriverId: 114980, centerId: 'c2', defaultShift: 'diurno', startDate: '2026-02-12', status: 'activo' },
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

export const DEV_VEHICLES: Vehicle[] = [
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
  { id: 'v13', plate: 'KLM-5670', model: 'Aion S', oem: 'GAC', centerId: 'c1', status: 'en_turno' },
  { id: 'v14', plate: 'NOP-8901', model: 'E10X', oem: 'JAC', centerId: 'c1', status: 'en_turno' },
  { id: 'v15', plate: 'QRS-2340', model: 'Geometry C', oem: 'Geely', centerId: 'c2', status: 'en_turno' },
  { id: 'v16', plate: 'TUV-5671', model: 'Aion S', oem: 'GAC', centerId: 'c2', status: 'en_turno' },
  { id: 'v17', plate: 'WXY-8902', model: 'E10X', oem: 'JAC', centerId: 'c3', status: 'en_turno' },
  { id: 'v18', plate: 'ZAB-1230', model: 'Geometry C', oem: 'Geely', centerId: 'c3', status: 'en_turno' },
];

export const DEV_ADMIN: User = {
  id: 'u1',
  name: 'Admin LAFA',
  email: 'admin@lafa-mx.com',
  role: 'admin',
  centerId: null,
  status: 'activo',
  password: 'admin123',
};
