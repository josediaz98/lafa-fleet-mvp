import { useState, useCallback } from 'react';
import { useAppState } from '../context/AppContext';

export function useCenterFilter() {
  const { session } = useAppState();
  const isAdmin = session?.role === 'admin';

  const [centerOverride, setCenterOverride] = useState<string | null>(null);

  const effectiveCenterId = isAdmin
    ? centerOverride
    : session?.centerId ?? null;

  const setCenterFilter = useCallback((centerId: string | null) => {
    setCenterOverride(centerId);
  }, []);

  const filterByCenter = useCallback(
    <T extends { centerId: string }>(items: T[]): T[] => {
      if (!effectiveCenterId) return items;
      return items.filter(item => item.centerId === effectiveCenterId);
    },
    [effectiveCenterId]
  );

  return { isAdmin, effectiveCenterId, setCenterFilter, filterByCenter };
}
