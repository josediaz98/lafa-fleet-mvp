import type { AppState, Action, Session } from '@/types';
import { isSupabaseConfigured } from '@/lib/supabase/client';

// ---- Reducer ----

export function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE': {
      const { dataRange, ...rest } = action.payload;
      return {
        ...state,
        ...rest,
        hydrated: true,
        hydrateError: undefined,
        dataRange: dataRange
          ? {
              ...dataRange,
              shiftsHasMore: true,
              tripsHasMore: true,
              payrollHasMore: true,
            }
          : undefined,
      };
    }

    case 'HYDRATE_ERROR':
      return { ...state, hydrated: true, hydrateError: action.payload };

    case 'ADD_SHIFT':
      return { ...state, shifts: [...state.shifts, action.payload] };

    case 'CLOSE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map((s) =>
          s.id === action.payload.shiftId
            ? {
                ...s,
                status: 'completado' as const,
                checkOut: action.payload.checkOut,
                hoursWorked: action.payload.hoursWorked,
              }
            : s,
        ),
      };

    case 'UPDATE_VEHICLE_STATUS':
      return {
        ...state,
        vehicles: state.vehicles.map((v) =>
          v.id === action.payload.vehicleId
            ? { ...v, status: action.payload.status }
            : v,
        ),
      };

    case 'IMPORT_TRIPS':
      return { ...state, trips: [...state.trips, ...action.payload] };

    case 'ADD_DRIVER':
      return { ...state, drivers: [...state.drivers, action.payload] };

    case 'UPDATE_DRIVER':
      return {
        ...state,
        drivers: state.drivers.map((d) =>
          d.id === action.payload.id ? action.payload : d,
        ),
      };

    case 'DEACTIVATE_DRIVER':
      return {
        ...state,
        drivers: state.drivers.map((d) =>
          d.id === action.payload ? { ...d, status: 'inactivo' as const } : d,
        ),
      };

    case 'ADD_VEHICLE':
      return { ...state, vehicles: [...state.vehicles, action.payload] };

    case 'UPDATE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.map((v) =>
          v.id === action.payload.id ? action.payload : v,
        ),
      };

    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u,
        ),
      };

    case 'DEACTIVATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload ? { ...u, status: 'inactivo' as const } : u,
        ),
      };

    case 'CLOSE_PAYROLL_WEEK':
      return {
        ...state,
        closedPayroll: [...state.closedPayroll, ...action.payload],
      };

    // H4: Match by weekStart (ISO date) instead of weekLabel (locale-dependent string)
    case 'RERUN_PAYROLL_CLOSE': {
      const superseded = state.closedPayroll.map((p) =>
        p.weekStart === action.payload.weekStart && p.status === 'cerrado'
          ? { ...p, status: 'superseded' as const }
          : p,
      );
      return {
        ...state,
        closedPayroll: [...superseded, ...action.payload.newRecords],
      };
    }

    case 'LOGIN':
      return { ...state, session: action.payload };

    case 'LOGOUT':
      return { ...state, session: null };

    case 'AUTH_CHECKED':
      return { ...state, authChecked: true };

    case 'APPEND_SHIFTS':
      return {
        ...state,
        shifts: [...state.shifts, ...action.payload.shifts],
        dataRange: state.dataRange
          ? {
              ...state.dataRange,
              shiftsFrom: action.payload.oldestDate,
              shiftsHasMore: action.payload.hasMore,
            }
          : undefined,
      };

    case 'APPEND_TRIPS':
      return {
        ...state,
        trips: [...state.trips, ...action.payload.trips],
        dataRange: state.dataRange
          ? {
              ...state.dataRange,
              tripsFrom: action.payload.oldestDate,
              tripsHasMore: action.payload.hasMore,
            }
          : undefined,
      };

    case 'APPEND_PAYROLL':
      return {
        ...state,
        closedPayroll: [...state.closedPayroll, ...action.payload.payroll],
        dataRange: state.dataRange
          ? {
              ...state.dataRange,
              payrollFrom: action.payload.oldestDate,
              payrollHasMore: action.payload.hasMore,
            }
          : undefined,
      };

    // C2: Rollback actions for failed persists
    case 'REMOVE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.filter((s) => s.id !== action.payload),
      };

    case 'REMOVE_DRIVER':
      return {
        ...state,
        drivers: state.drivers.filter((d) => d.id !== action.payload),
      };

    case 'REMOVE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.filter((v) => v.id !== action.payload),
      };

    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload),
      };

    case 'REMOVE_PAYROLL_WEEK':
      return {
        ...state,
        closedPayroll: state.closedPayroll.filter(
          (p) => !action.payload.includes(p.id),
        ),
      };

    case 'REMOVE_TRIPS':
      return {
        ...state,
        trips: state.trips.filter((t) => !action.payload.includes(t.id)),
      };

    case 'REVERT_CLOSE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map((s) =>
          s.id === action.payload
            ? {
                ...s,
                status: 'en_turno' as const,
                checkOut: undefined,
                hoursWorked: undefined,
              }
            : s,
        ),
      };

    case 'REACTIVATE_DRIVER':
      return {
        ...state,
        drivers: state.drivers.map((d) =>
          d.id === action.payload ? { ...d, status: 'activo' as const } : d,
        ),
      };

    case 'REACTIVATE_USER':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload ? { ...u, status: 'activo' as const } : u,
        ),
      };

    case 'REVERT_RERUN_PAYROLL':
      return {
        ...state,
        closedPayroll: state.closedPayroll
          .filter((p) => !action.payload.removedIds.includes(p.id))
          .map((p) =>
            p.weekStart === action.payload.weekStart &&
            p.status === 'superseded'
              ? { ...p, status: 'cerrado' as const }
              : p,
          ),
      };

    default:
      return state;
  }
}

// ---- Session persistence ----

export function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem('lafa_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---- Initial state ----

export const initialState: AppState = {
  drivers: [],
  vehicles: [],
  shifts: [],
  users: [],
  trips: [],
  closedPayroll: [],
  session: loadSession(),
  hydrated: false,
  authChecked: false,
  dataSource: isSupabaseConfigured ? 'supabase' : 'mock',
};
