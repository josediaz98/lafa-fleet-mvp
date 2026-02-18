import { MOCK_CENTERS } from '../data/mockData';

export function getCenterName(centerId: string | null): string {
  if (!centerId) return 'Todos';
  return MOCK_CENTERS.find(c => c.id === centerId)?.name ?? '';
}
