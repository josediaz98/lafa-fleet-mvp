import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useAppState } from '@/app/providers/AppProvider';

interface CenterFilterContextValue {
  centerOverride: string | null;
  setCenterOverride: (centerId: string | null) => void;
}

const CenterFilterContext = createContext<CenterFilterContextValue>({
  centerOverride: null,
  setCenterOverride: () => {},
});

export function CenterFilterProvider({ children }: { children: ReactNode }) {
  const [centerOverride, setCenterOverride] = useState<string | null>(null);
  return (
    <CenterFilterContext.Provider value={{ centerOverride, setCenterOverride }}>
      {children}
    </CenterFilterContext.Provider>
  );
}

export function useCenterFilter() {
  const { session } = useAppState();
  const isAdmin = session?.role === 'admin';
  const { centerOverride, setCenterOverride } = useContext(CenterFilterContext);

  const effectiveCenterId = isAdmin
    ? centerOverride
    : (session?.centerId ?? null);

  const setCenterFilter = useCallback(
    (centerId: string | null) => {
      setCenterOverride(centerId);
    },
    [setCenterOverride],
  );

  const filterByCenter = useCallback(
    <T extends { centerId: string }>(items: T[]): T[] => {
      if (!effectiveCenterId) return items;
      return items.filter((item) => item.centerId === effectiveCenterId);
    },
    [effectiveCenterId],
  );

  return { isAdmin, effectiveCenterId, setCenterFilter, filterByCenter };
}
