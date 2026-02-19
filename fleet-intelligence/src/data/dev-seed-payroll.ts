import type { PayrollRecord } from '@/types';

// ---------------------------------------------------------------------------
// Compact builder — derives all payroll fields from a minimal spec
// ---------------------------------------------------------------------------

interface PayrollSpec {
  driverId: string;
  driverName: string;
  centerId: string;
  center: string;
  hours: number;
  revenue: number;
  tips: number;
  hoursThreshold?: number; // default 40
  revenueThreshold?: number; // default 6000
  prevWeekHours?: number; // for overtime calc, default 0
}

const VALLEJO = '00000000-0000-0000-0000-00000000c001';
const GRANADA = '00000000-0000-0000-0000-00000000c002';
const ROMA = '00000000-0000-0000-0000-00000000c003';

function buildPayrollRecords(
  specs: PayrollSpec[],
  weekLabel: string,
  weekStart: string,
  weekEnd: string,
  closedAt: string,
  version: number,
): PayrollRecord[] {
  // Use weekStart in id to guarantee uniqueness across weeks
  const weekTag = weekStart.replace(/-/g, '');

  return specs.map((s) => {
    const ht = s.hoursThreshold ?? 40;
    const rt = s.revenueThreshold ?? 6000;
    const goalMet = s.hours >= ht && s.revenue >= rt;
    const baseSalary = goalMet ? 2500 : 0;

    let productivityBonus = 0;
    if (goalMet) {
      const excess = s.revenue - rt;
      if (excess > 0) productivityBonus = Math.floor(excess / 500) * 100;
    }

    let overtimePay = 0;
    const prevH = s.prevWeekHours ?? 0;
    if (goalMet && s.hours > 40 && prevH >= 40) {
      overtimePay = Math.round(Math.min(s.hours - 40, 8) * 50);
    }

    const totalPay = goalMet
      ? baseSalary + productivityBonus + overtimePay
      : 1000;

    return {
      id: `payroll-${weekTag}-v${version}-${s.driverId}`,
      driverName: s.driverName,
      driverId: s.driverId,
      centerId: s.centerId,
      center: s.center,
      hoursWorked: s.hours,
      totalBilled: s.revenue,
      tipsTotal: s.tips,
      hoursThreshold: ht,
      revenueThreshold: rt,
      goalMet,
      baseSalary,
      productivityBonus,
      overtimePay,
      totalPay,
      status: 'cerrado' as const,
      weekLabel,
      weekStart,
      weekEnd,
      closedBy: 'Admin LAFA',
      closedAt,
      version,
    };
  });
}

// ---------------------------------------------------------------------------
// Week 1 — Feb 2-8, 2026   (26 drivers, no overtime — no previous week)
// ---------------------------------------------------------------------------

const WEEK1_SPECS: PayrollSpec[] = [
  // Vallejo
  { driverId: 'd1', driverName: 'Carlos Mendoza', centerId: VALLEJO, center: 'Vallejo', hours: 44, revenue: 7200, tips: 320 },
  { driverId: 'd2', driverName: 'Luis Hernández', centerId: VALLEJO, center: 'Vallejo', hours: 41, revenue: 6500, tips: 280 },
  { driverId: 'd3', driverName: 'Miguel Torres', centerId: VALLEJO, center: 'Vallejo', hours: 38, revenue: 5200, tips: 150 },
  { driverId: 'd9', driverName: 'Andrés Morales', centerId: VALLEJO, center: 'Vallejo', hours: 35, revenue: 4800, tips: 120 },
  { driverId: 'd13', driverName: 'Héctor Juárez', centerId: VALLEJO, center: 'Vallejo', hours: 43, revenue: 6800, tips: 290 },
  { driverId: 'd14', driverName: 'Óscar Navarro', centerId: VALLEJO, center: 'Vallejo', hours: 42, revenue: 6300, tips: 250 },
  { driverId: 'd15', driverName: 'Eduardo Ríos', centerId: VALLEJO, center: 'Vallejo', hours: 40, revenue: 6100, tips: 210 },
  { driverId: 'd16', driverName: 'Daniel Ortiz', centerId: VALLEJO, center: 'Vallejo', hours: 34, revenue: 4500, tips: 100 },
  // Granada
  { driverId: 'd4', driverName: 'Roberto Díaz', centerId: GRANADA, center: 'Granada', hours: 45, revenue: 7500, tips: 340 },
  { driverId: 'd5', driverName: 'Fernando López', centerId: GRANADA, center: 'Granada', hours: 41, revenue: 6400, tips: 260 },
  { driverId: 'd6', driverName: 'Alejandro Ramírez', centerId: GRANADA, center: 'Granada', hours: 42, revenue: 6600, tips: 300 },
  { driverId: 'd12', driverName: 'Raúl Vargas', centerId: GRANADA, center: 'Granada', hours: 40, revenue: 6200, tips: 230 },
  { driverId: 'd18', driverName: 'Manuel Peña', centerId: GRANADA, center: 'Granada', hours: 46, revenue: 7800, tips: 360 },
  { driverId: 'd19', driverName: 'Arturo Delgado', centerId: GRANADA, center: 'Granada', hours: 41, revenue: 6100, tips: 200 },
  { driverId: 'd20', driverName: 'Iván Contreras', centerId: GRANADA, center: 'Granada', hours: 38, revenue: 5100, tips: 140 },
  { driverId: 'd21', driverName: 'Pablo Herrera', centerId: GRANADA, center: 'Granada', hours: 43, revenue: 6900, tips: 310 },
  { driverId: 'd22', driverName: 'Gustavo Salazar', centerId: GRANADA, center: 'Granada', hours: 33, revenue: 4200, tips: 90 },
  // Roma
  { driverId: 'd7', driverName: 'Juan García', centerId: ROMA, center: 'Roma', hours: 44, revenue: 7100, tips: 300 },
  { driverId: 'd8', driverName: 'Pedro Sánchez', centerId: ROMA, center: 'Roma', hours: 41, revenue: 6300, tips: 240 },
  { driverId: 'd10', driverName: 'Ricardo Flores', centerId: ROMA, center: 'Roma', hours: 42, revenue: 6500, tips: 270 },
  { driverId: 'd24', driverName: 'Francisco Mora', centerId: ROMA, center: 'Roma', hours: 43, revenue: 6700, tips: 280 },
  { driverId: 'd25', driverName: 'Alberto Cruz', centerId: ROMA, center: 'Roma', hours: 44, revenue: 7000, tips: 320 },
  { driverId: 'd26', driverName: 'Javier Reyes', centerId: ROMA, center: 'Roma', hours: 38, revenue: 5800, tips: 180 },
  { driverId: 'd27', driverName: 'Diego Luna', centerId: ROMA, center: 'Roma', hours: 41, revenue: 6400, tips: 250 },
  { driverId: 'd28', driverName: 'Ramón Aguilar', centerId: ROMA, center: 'Roma', hours: 40, revenue: 5900, tips: 170 },
  { driverId: 'd29', driverName: 'Tomás Vega', centerId: ROMA, center: 'Roma', hours: 36, revenue: 5000, tips: 130 },
];

const week1Records = buildPayrollRecords(
  WEEK1_SPECS,
  '2 feb \u2013 8 feb, 2026',
  '2026-02-02',
  '2026-02-08',
  '2026-02-09T10:00:00.000Z',
  1,
);

// ---------------------------------------------------------------------------
// Week 2 — Feb 9-15, 2026   (28 drivers, overtime from week 1 hours)
// ---------------------------------------------------------------------------

const WEEK2_SPECS: PayrollSpec[] = [
  // Vallejo
  { driverId: 'd1', driverName: 'Carlos Mendoza', centerId: VALLEJO, center: 'Vallejo', hours: 44, revenue: 7200, tips: 350, prevWeekHours: 44 },
  { driverId: 'd2', driverName: 'Luis Hernández', centerId: VALLEJO, center: 'Vallejo', hours: 41, revenue: 6500, tips: 290, prevWeekHours: 41 },
  { driverId: 'd3', driverName: 'Miguel Torres', centerId: VALLEJO, center: 'Vallejo', hours: 38, revenue: 5200, tips: 160, prevWeekHours: 38 },
  { driverId: 'd9', driverName: 'Andrés Morales', centerId: VALLEJO, center: 'Vallejo', hours: 35, revenue: 4800, tips: 130, prevWeekHours: 35 },
  { driverId: 'd13', driverName: 'Héctor Juárez', centerId: VALLEJO, center: 'Vallejo', hours: 43, revenue: 6800, tips: 310, prevWeekHours: 43 },
  { driverId: 'd14', driverName: 'Óscar Navarro', centerId: VALLEJO, center: 'Vallejo', hours: 42, revenue: 6300, tips: 260, prevWeekHours: 42 },
  { driverId: 'd15', driverName: 'Eduardo Ríos', centerId: VALLEJO, center: 'Vallejo', hours: 40, revenue: 6100, tips: 220, prevWeekHours: 40 },
  { driverId: 'd16', driverName: 'Daniel Ortiz', centerId: VALLEJO, center: 'Vallejo', hours: 34, revenue: 4500, tips: 110, prevWeekHours: 34 },
  // Granada
  { driverId: 'd4', driverName: 'Roberto Díaz', centerId: GRANADA, center: 'Granada', hours: 45, revenue: 7500, tips: 350, prevWeekHours: 45 },
  { driverId: 'd5', driverName: 'Fernando López', centerId: GRANADA, center: 'Granada', hours: 41, revenue: 6400, tips: 270, prevWeekHours: 41 },
  { driverId: 'd6', driverName: 'Alejandro Ramírez', centerId: GRANADA, center: 'Granada', hours: 42, revenue: 6600, tips: 310, prevWeekHours: 42 },
  { driverId: 'd12', driverName: 'Raúl Vargas', centerId: GRANADA, center: 'Granada', hours: 40, revenue: 6200, tips: 240, prevWeekHours: 40 },
  { driverId: 'd18', driverName: 'Manuel Peña', centerId: GRANADA, center: 'Granada', hours: 46, revenue: 7800, tips: 380, prevWeekHours: 46 },
  { driverId: 'd19', driverName: 'Arturo Delgado', centerId: GRANADA, center: 'Granada', hours: 41, revenue: 6100, tips: 210, prevWeekHours: 41 },
  { driverId: 'd20', driverName: 'Iván Contreras', centerId: GRANADA, center: 'Granada', hours: 38, revenue: 5100, tips: 150, prevWeekHours: 38 },
  { driverId: 'd21', driverName: 'Pablo Herrera', centerId: GRANADA, center: 'Granada', hours: 43, revenue: 6900, tips: 320, prevWeekHours: 43 },
  { driverId: 'd22', driverName: 'Gustavo Salazar', centerId: GRANADA, center: 'Granada', hours: 33, revenue: 4200, tips: 100, prevWeekHours: 33 },
  { driverId: 'd23', driverName: 'Enrique Medina', centerId: GRANADA, center: 'Granada', hours: 18, revenue: 2800, tips: 80, hoursThreshold: 16, revenueThreshold: 2400, prevWeekHours: 0 },
  // Roma
  { driverId: 'd7', driverName: 'Juan García', centerId: ROMA, center: 'Roma', hours: 44, revenue: 7100, tips: 310, prevWeekHours: 44 },
  { driverId: 'd8', driverName: 'Pedro Sánchez', centerId: ROMA, center: 'Roma', hours: 41, revenue: 6300, tips: 250, prevWeekHours: 41 },
  { driverId: 'd10', driverName: 'Ricardo Flores', centerId: ROMA, center: 'Roma', hours: 42, revenue: 6500, tips: 280, prevWeekHours: 42 },
  { driverId: 'd24', driverName: 'Francisco Mora', centerId: ROMA, center: 'Roma', hours: 43, revenue: 6700, tips: 290, prevWeekHours: 43 },
  { driverId: 'd25', driverName: 'Alberto Cruz', centerId: ROMA, center: 'Roma', hours: 44, revenue: 7000, tips: 330, prevWeekHours: 44 },
  { driverId: 'd26', driverName: 'Javier Reyes', centerId: ROMA, center: 'Roma', hours: 40, revenue: 6100, tips: 190, prevWeekHours: 38 },
  { driverId: 'd27', driverName: 'Diego Luna', centerId: ROMA, center: 'Roma', hours: 41, revenue: 6400, tips: 260, prevWeekHours: 41 },
  { driverId: 'd28', driverName: 'Ramón Aguilar', centerId: ROMA, center: 'Roma', hours: 42, revenue: 6600, tips: 250, prevWeekHours: 40 },
  { driverId: 'd29', driverName: 'Tomás Vega', centerId: ROMA, center: 'Roma', hours: 36, revenue: 5000, tips: 140, prevWeekHours: 36 },
  { driverId: 'd30', driverName: 'Gabriel Estrada', centerId: ROMA, center: 'Roma', hours: 16, revenue: 2500, tips: 60, hoursThreshold: 16, revenueThreshold: 2400, prevWeekHours: 0 },
];

const week2Records = buildPayrollRecords(
  WEEK2_SPECS,
  '9 feb \u2013 15 feb, 2026',
  '2026-02-09',
  '2026-02-15',
  '2026-02-16T10:00:00.000Z',
  1,
);

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const DEV_CLOSED_PAYROLL: PayrollRecord[] = [
  ...week1Records,
  ...week2Records,
];
