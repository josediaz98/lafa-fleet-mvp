import { MOCK_CENTERS } from '../data/mockData';

export function getCenterName(centerId: string | null): string {
  if (!centerId) return 'Todos';
  return MOCK_CENTERS.find(c => c.id === centerId)?.name ?? '';
}

export function formatMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
