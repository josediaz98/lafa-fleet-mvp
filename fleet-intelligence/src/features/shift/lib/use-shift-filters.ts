import { useState, useEffect, useMemo, useRef } from 'react';
import type { Shift, Driver, Vehicle } from '@/types';
import { REFRESH_INTERVAL, SHIFT_WINDOW_MS } from '@/lib/config';

export type ShiftTab = 'activos' | 'completados' | 'pendientes';

export function useShiftFilters(
  shifts: Shift[],
  centeredShifts: Shift[],
  centeredDrivers: Driver[],
  centeredVehicles: Vehicle[],
) {
  const [tab, setTab] = useState<ShiftTab>('activos');
  const [search, setSearch] = useState('');
  const [, setTick] = useState(0);
  const nowRef = useRef(Date.now()); // eslint-disable-line react-hooks/purity -- intentional impure initial value

  useEffect(() => {
    const id = setInterval(() => {
      nowRef.current = Date.now();
      setTick((t) => t + 1);
    }, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const searchFiltered = useMemo(() => {
    if (!search) return centeredShifts;
    const q = search.toLowerCase();
    return centeredShifts.filter(
      (s) =>
        s.driverName.toLowerCase().includes(q) ||
        s.plate.toLowerCase().includes(q),
    );
  }, [centeredShifts, search]);

  const activeShifts = useMemo(() => {
    const active = searchFiltered.filter((s) => s.status === 'en_turno');
    return [...active].sort((a, b) => {
      const aOver =
        nowRef.current - new Date(a.checkIn).getTime() > SHIFT_WINDOW_MS;
      const bOver =
        nowRef.current - new Date(b.checkIn).getTime() > SHIFT_WINDOW_MS;
      if (aOver && !bOver) return -1;
      if (!aOver && bOver) return 1;
      return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
    });
  }, [searchFiltered]);

  const completedShifts = useMemo(() => {
    const today = new Date().toDateString();
    return searchFiltered.filter(
      (s) =>
        s.status === 'completado' &&
        new Date(s.checkIn).toDateString() === today,
    );
  }, [searchFiltered]);

  const pendingShifts = searchFiltered.filter(
    (s) =>
      (s.status === 'en_turno' || s.status === 'pendiente_revision') &&
      nowRef.current - new Date(s.checkIn).getTime() > SHIFT_WINDOW_MS,
  );

  const driversInShift = useMemo(
    () =>
      new Set(
        shifts.filter((s) => s.status === 'en_turno').map((s) => s.driverId),
      ),
    [shifts],
  );
  const vehiclesInShift = useMemo(
    () =>
      new Set(
        shifts.filter((s) => s.status === 'en_turno').map((s) => s.vehicleId),
      ),
    [shifts],
  );

  const availableDrivers = centeredDrivers.filter(
    (d) => d.status === 'activo' && !driversInShift.has(d.id),
  );
  const availableVehicles = centeredVehicles.filter(
    (v) => v.status === 'disponible' && !vehiclesInShift.has(v.id),
  );

  const tabs: { key: ShiftTab; label: string; count: number }[] = [
    { key: 'activos', label: 'Activos', count: activeShifts.length },
    {
      key: 'completados',
      label: 'Completados hoy',
      count: completedShifts.length,
    },
    {
      key: 'pendientes',
      label: 'Pendientes de revisión',
      count: pendingShifts.length,
    },
  ];

  return {
    tab,
    setTab,
    search,
    setSearch,
    now: nowRef.current,
    activeShifts,
    completedShifts,
    pendingShifts,
    availableDrivers,
    availableVehicles,
    tabs,
  };
}
