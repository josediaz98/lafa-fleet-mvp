import { useState, useMemo } from 'react';
import type { Driver } from '@/types';

type StatusFilter = 'todos' | 'activo' | 'inactivo';
type ShiftFilter = 'todos' | 'diurno' | 'nocturno';

export const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'activo', label: 'Activos' },
  { key: 'inactivo', label: 'Inactivos' },
];

export const SHIFT_FILTERS: { key: ShiftFilter; label: string }[] = [
  { key: 'todos', label: 'Todos' },
  { key: 'diurno', label: 'Diurno' },
  { key: 'nocturno', label: 'Nocturno' },
];

export function useDriverFilters(centeredDrivers: Driver[]) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [shiftFilter, setShiftFilter] = useState<ShiftFilter>('todos');

  const filtered = useMemo(() => {
    let result = centeredDrivers;
    if (statusFilter !== 'todos') {
      result = result.filter((d) => d.status === statusFilter);
    }
    if (shiftFilter !== 'todos') {
      result = result.filter((d) => d.defaultShift === shiftFilter);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.fullName.toLowerCase().includes(q) ||
          d.didiDriverId.toString().includes(q),
      );
    }
    return result;
  }, [centeredDrivers, statusFilter, shiftFilter, search]);

  const hasActiveFilters =
    statusFilter !== 'todos' || shiftFilter !== 'todos' || !!search;

  function clearFilters() {
    setSearch('');
    setStatusFilter('todos');
    setShiftFilter('todos');
  }

  return {
    filtered,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    shiftFilter,
    setShiftFilter,
    hasActiveFilters,
    clearFilters,
  };
}
