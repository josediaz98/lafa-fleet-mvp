import type { Shift } from '@/types';

// ---------------------------------------------------------------------------
// Compact spec for one driver's weekly shifts
// ---------------------------------------------------------------------------

interface ShiftSpec {
  driverId: string;
  driverName: string;
  vehicleId: string;
  plate: string;
  model: string;
  center: string;
  centerId: string;
  shift: 'diurno' | 'nocturno';
  hours: number[];
  /** Day offset from Monday (0 = Mon, 1 = Tue, ...). Defaults to 0. */
  startDay?: number;
}

// ---------------------------------------------------------------------------
// Center ID constants
// ---------------------------------------------------------------------------

const C1 = '00000000-0000-0000-0000-00000000c001'; // Vallejo
const C2 = '00000000-0000-0000-0000-00000000c002'; // Granada
const C3 = '00000000-0000-0000-0000-00000000c003'; // Roma

// ---------------------------------------------------------------------------
// 29 driver specs (all active drivers — excludes d11 Jorge Castillo)
// ---------------------------------------------------------------------------

const SHIFT_SPECS: ShiftSpec[] = [
  // --- Vallejo (9 drivers) ---
  { driverId: 'd1',  driverName: 'Carlos Mendoza',     vehicleId: 'v2',  plate: 'DEF-5678', model: 'Geometry C', center: 'Vallejo', centerId: C1, shift: 'diurno',   hours: [12.0, 11.5, 11.5, 11.0] },
  { driverId: 'd2',  driverName: 'Luis Hernández',     vehicleId: 'v3',  plate: 'GHI-9012', model: 'E10X',       center: 'Vallejo', centerId: C1, shift: 'diurno',   hours: [11.0, 10.5, 10.5, 10.0] },
  { driverId: 'd3',  driverName: 'Miguel Torres',      vehicleId: 'v11', plate: 'EFG-0123', model: 'Geometry C', center: 'Vallejo', centerId: C1, shift: 'nocturno', hours: [9.5, 9.0, 9.0, 8.5] },
  { driverId: 'd9',  driverName: 'Andrés Morales',     vehicleId: 'v1',  plate: 'ABC-1234', model: 'Geometry C', center: 'Vallejo', centerId: C1, shift: 'diurno',   hours: [9.5, 9.0, 9.0, 8.5] },
  { driverId: 'd13', driverName: 'Héctor Juárez',      vehicleId: 'v13', plate: 'KLM-5670', model: 'Aion S',     center: 'Vallejo', centerId: C1, shift: 'diurno',   hours: [11.5, 11.0, 11.0, 10.5] },
  { driverId: 'd14', driverName: 'Óscar Navarro',      vehicleId: 'v14', plate: 'NOP-8901', model: 'E10X',       center: 'Vallejo', centerId: C1, shift: 'nocturno', hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd15', driverName: 'Eduardo Ríos',       vehicleId: 'v2',  plate: 'DEF-5678', model: 'Geometry C', center: 'Vallejo', centerId: C1, shift: 'diurno',   hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd16', driverName: 'Daniel Ortiz',       vehicleId: 'v3',  plate: 'GHI-9012', model: 'E10X',       center: 'Vallejo', centerId: C1, shift: 'nocturno', hours: [8.5, 8.5, 8.0, 7.5] },
  { driverId: 'd17', driverName: 'Sergio Guzmán',      vehicleId: 'v11', plate: 'EFG-0123', model: 'Geometry C', center: 'Vallejo', centerId: C1, shift: 'diurno',   hours: [9.0, 8.5, 8.0], startDay: 2 },

  // --- Granada (10 drivers) ---
  { driverId: 'd4',  driverName: 'Roberto Díaz',       vehicleId: 'v4',  plate: 'JKL-3456', model: 'Aion S',     center: 'Granada', centerId: C2, shift: 'diurno',   hours: [12.0, 11.0, 11.0, 11.0] },
  { driverId: 'd5',  driverName: 'Fernando López',     vehicleId: 'v5',  plate: 'MNO-7890', model: 'Geometry C', center: 'Granada', centerId: C2, shift: 'nocturno', hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd6',  driverName: 'Alejandro Ramírez',  vehicleId: 'v6',  plate: 'PQR-1235', model: 'E10X',       center: 'Granada', centerId: C2, shift: 'diurno',   hours: [11.0, 11.0, 10.5, 10.5] },
  { driverId: 'd12', driverName: 'Raúl Vargas',        vehicleId: 'v12', plate: 'HIJ-4560', model: 'E10X',       center: 'Granada', centerId: C2, shift: 'diurno',   hours: [11.0, 10.5, 10.5, 10.0] },
  { driverId: 'd18', driverName: 'Manuel Peña',        vehicleId: 'v15', plate: 'QRS-2340', model: 'Geometry C', center: 'Granada', centerId: C2, shift: 'nocturno', hours: [12.5, 12.0, 12.0, 11.5] },
  { driverId: 'd19', driverName: 'Arturo Delgado',     vehicleId: 'v16', plate: 'TUV-5671', model: 'Aion S',     center: 'Granada', centerId: C2, shift: 'diurno',   hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd20', driverName: 'Iván Contreras',     vehicleId: 'v4',  plate: 'JKL-3456', model: 'Aion S',     center: 'Granada', centerId: C2, shift: 'nocturno', hours: [10.0, 10.0, 9.5, 9.5] },
  { driverId: 'd21', driverName: 'Pablo Herrera',      vehicleId: 'v5',  plate: 'MNO-7890', model: 'Geometry C', center: 'Granada', centerId: C2, shift: 'diurno',   hours: [11.0, 10.5, 10.5, 10.0] },
  { driverId: 'd22', driverName: 'Gustavo Salazar',    vehicleId: 'v6',  plate: 'PQR-1235', model: 'E10X',       center: 'Granada', centerId: C2, shift: 'nocturno', hours: [8.5, 8.5, 8.0, 7.5] },
  { driverId: 'd23', driverName: 'Enrique Medina',     vehicleId: 'v12', plate: 'HIJ-4560', model: 'E10X',       center: 'Granada', centerId: C2, shift: 'diurno',   hours: [10.5, 10.5, 10.0, 10.0] },

  // --- Roma (10 drivers) ---
  { driverId: 'd7',  driverName: 'Juan García',        vehicleId: 'v7',  plate: 'STU-4567', model: 'Aion S',     center: 'Roma',    centerId: C3, shift: 'diurno',   hours: [12.0, 11.0, 11.0, 11.0] },
  { driverId: 'd8',  driverName: 'Pedro Sánchez',      vehicleId: 'v8',  plate: 'VWX-8901', model: 'Geometry C', center: 'Roma',    centerId: C3, shift: 'nocturno', hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd10', driverName: 'Ricardo Flores',     vehicleId: 'v10', plate: 'BCD-6789', model: 'Aion S',     center: 'Roma',    centerId: C3, shift: 'diurno',   hours: [10.5, 10.0, 10.0, 9.5] },
  { driverId: 'd24', driverName: 'Francisco Mora',     vehicleId: 'v17', plate: 'WXY-8902', model: 'E10X',       center: 'Roma',    centerId: C3, shift: 'nocturno', hours: [11.0, 11.0, 10.5, 10.5] },
  { driverId: 'd25', driverName: 'Alberto Cruz',       vehicleId: 'v18', plate: 'ZAB-1230', model: 'Geometry C', center: 'Roma',    centerId: C3, shift: 'diurno',   hours: [12.0, 11.0, 11.0, 11.0] },
  { driverId: 'd26', driverName: 'Javier Reyes',       vehicleId: 'v7',  plate: 'STU-4567', model: 'Aion S',     center: 'Roma',    centerId: C3, shift: 'nocturno', hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd27', driverName: 'Diego Luna',         vehicleId: 'v8',  plate: 'VWX-8901', model: 'Geometry C', center: 'Roma',    centerId: C3, shift: 'diurno',   hours: [11.0, 10.5, 10.5, 10.0] },
  { driverId: 'd28', driverName: 'Ramón Aguilar',      vehicleId: 'v10', plate: 'BCD-6789', model: 'Aion S',     center: 'Roma',    centerId: C3, shift: 'nocturno', hours: [10.5, 10.5, 10.0, 10.0] },
  { driverId: 'd29', driverName: 'Tomás Vega',         vehicleId: 'v17', plate: 'WXY-8902', model: 'E10X',       center: 'Roma',    centerId: C3, shift: 'diurno',   hours: [10.0, 9.5, 9.0, 8.5] },
  { driverId: 'd30', driverName: 'Gabriel Estrada',    vehicleId: 'v18', plate: 'ZAB-1230', model: 'Geometry C', center: 'Roma',    centerId: C3, shift: 'nocturno', hours: [9.5, 9.5, 9.0, 8.5] },
];

// ---------------------------------------------------------------------------
// Build shifts from specs at module load time
// ---------------------------------------------------------------------------

function buildShifts(specs: ShiftSpec[]): Shift[] {
  // Get current week's Monday (same logic as getWeekBounds in date-utils.ts)
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + mondayOffset);
  monday.setHours(0, 0, 0, 0);

  const shifts: Shift[] = [];

  for (const spec of specs) {
    const startDay = spec.startDay ?? 0;
    const isDiurno = spec.shift === 'diurno';

    for (let i = 0; i < spec.hours.length; i++) {
      const dayIndex = startDay + i;
      const hrs = spec.hours[i];

      const date = new Date(monday);
      date.setDate(monday.getDate() + dayIndex);

      const checkIn = new Date(date);
      checkIn.setHours(isDiurno ? 5 : 19, 30, 0, 0);

      const checkOut = new Date(checkIn.getTime() + hrs * 3600000);

      shifts.push({
        id: `shift-${spec.driverId}-d${dayIndex}`,
        driverId: spec.driverId,
        driverName: spec.driverName,
        vehicleId: spec.vehicleId,
        plate: spec.plate,
        model: spec.model,
        center: spec.center,
        centerId: spec.centerId,
        checkIn: checkIn.toISOString(),
        checkOut: checkOut.toISOString(),
        hoursWorked: hrs,
        status: 'completado',
      });
    }
  }

  return shifts;
}

// ---------------------------------------------------------------------------
// Active shifts — same 3 drivers as seed-demo.sql
// ---------------------------------------------------------------------------

function buildActiveShifts(): Shift[] {
  const today = new Date();
  today.setHours(6, 0, 0, 0);

  const specs = [
    { driverId: 'd1', driverName: 'Carlos Mendoza', vehicleId: 'v2', plate: 'DEF-5678', model: 'Geometry C', center: 'Vallejo', centerId: C1, shift: 'diurno' as const },
    { driverId: 'd4', driverName: 'Roberto Díaz', vehicleId: 'v4', plate: 'JKL-3456', model: 'Aion S', center: 'Granada', centerId: C2, shift: 'diurno' as const },
    { driverId: 'd7', driverName: 'Juan García', vehicleId: 'v7', plate: 'STU-4567', model: 'Aion S', center: 'Roma', centerId: C3, shift: 'diurno' as const },
  ];

  return specs.map((s) => ({
    id: `shift-${s.driverId}-active`,
    driverId: s.driverId,
    driverName: s.driverName,
    vehicleId: s.vehicleId,
    plate: s.plate,
    model: s.model,
    center: s.center,
    centerId: s.centerId,
    checkIn: today.toISOString(),
    checkOut: undefined,
    hoursWorked: 0,
    status: 'en_turno' as const,
  }));
}

// ---------------------------------------------------------------------------
// Export: 115 completed shifts + 3 active shifts
// ---------------------------------------------------------------------------

export const DEV_SHIFTS: Shift[] = [
  ...buildShifts(SHIFT_SPECS),
  ...buildActiveShifts(),
];
