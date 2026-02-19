import type { PayrollRecord } from '@/types';
import { SUPPORT_AMOUNT } from './payroll';

// L3: Add Tips column to CSV export
export function exportPayrollCsv(
  records: PayrollRecord[],
  tab?: 'actual' | 'cerradas',
): void {
  const headers = [
    'Conductor',
    'Centro',
    'Horas',
    'Meta horas',
    'Facturación',
    'Meta facturación',
    'Propinas',
    'Meta cumplida',
    'Salario Base',
    'Bono',
    'Horas extra',
    'Apoyo',
    'Pago Total',
    'Status',
  ];
  const csvRows = [headers.join(',')];

  for (const r of records) {
    const apoyo = r.goalMet ? 0 : SUPPORT_AMOUNT;
    const status =
      tab === 'actual'
        ? 'Borrador'
        : r.status === 'cerrado'
          ? 'Cerrado'
          : 'Superseded';
    csvRows.push(
      [
        `"${r.driverName}"`,
        `"${r.center}"`,
        r.hoursWorked,
        r.hoursThreshold,
        r.totalBilled,
        r.revenueThreshold,
        r.tipsTotal,
        r.goalMet ? 'Sí' : 'No',
        r.baseSalary,
        r.productivityBonus,
        r.overtimePay,
        apoyo,
        r.totalPay,
        status,
      ].join(','),
    );
  }

  const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nomina_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
