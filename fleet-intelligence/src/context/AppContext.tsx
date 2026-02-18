import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react';
import {
  MOCK_DRIVERS,
  MOCK_VEHICLES,
  MOCK_SHIFTS,
  MOCK_USERS,
  MOCK_TRIPS,
  MOCK_PAYROLL,
  type MockDriver,
  type MockVehicle,
  type MockShift,
  type MockUser,
} from '../data/mockData';
import { isSupabaseConfigured } from '../lib/supabase';
import { fetchAllData } from '../lib/supabaseQueries';

// ---- Types ----

export type Driver = MockDriver;
export type Vehicle = MockVehicle;
export type Shift = MockShift;
export type User = MockUser;

export interface Trip {
  id: string;
  driverId: number;
  fecha: string;
  tripId: string;
  horaInicio: string;
  horaFin: string;
  costo: number;
  propina: number;
}

export interface PayrollRecord {
  id: string;
  driverName: string;
  driverId: string;
  centerId: string;
  center: string;
  hoursWorked: number;
  totalBilled: number;
  hoursThreshold: number;
  revenueThreshold: number;
  goalMet: boolean;
  baseSalary: number;
  productivityBonus: number;
  overtimePay: number;
  totalPay: number;
  status: string;
  weekLabel?: string;
  weekStart?: string;
  weekEnd?: string;
  closedBy?: string;
  closedAt?: string;
  version?: number;
  aiExplanation?: string;
}

export interface Session {
  userId: string;
  name: string;
  role: string;
  centerId: string | null;
}

export interface AppState {
  drivers: Driver[];
  vehicles: Vehicle[];
  shifts: Shift[];
  users: User[];
  trips: Trip[];
  closedPayroll: PayrollRecord[];
  session: Session | null;
  hydrated: boolean;
  dataSource: 'supabase' | 'mock';
}

// ---- Actions ----

export type Action =
  | { type: 'HYDRATE'; payload: Omit<AppState, 'session' | 'hydrated'> }
  | { type: 'ADD_SHIFT'; payload: Shift }
  | { type: 'CLOSE_SHIFT'; payload: { shiftId: string; checkOut: string; hoursWorked: number } }
  | { type: 'UPDATE_VEHICLE_STATUS'; payload: { vehicleId: string; status: string } }
  | { type: 'IMPORT_TRIPS'; payload: Trip[] }
  | { type: 'ADD_DRIVER'; payload: Driver }
  | { type: 'UPDATE_DRIVER'; payload: Driver }
  | { type: 'DEACTIVATE_DRIVER'; payload: string }
  | { type: 'ADD_VEHICLE'; payload: Vehicle }
  | { type: 'UPDATE_VEHICLE'; payload: Vehicle }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'DEACTIVATE_USER'; payload: string }
  | { type: 'CLOSE_PAYROLL_WEEK'; payload: PayrollRecord[] }
  | { type: 'RERUN_PAYROLL_CLOSE'; payload: { weekLabel: string; newRecords: PayrollRecord[] } }
  | { type: 'LOGIN'; payload: Session }
  | { type: 'LOGOUT' };

// ---- Reducer ----

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, hydrated: true };

    case 'ADD_SHIFT':
      return { ...state, shifts: [...state.shifts, action.payload] };

    case 'CLOSE_SHIFT':
      return {
        ...state,
        shifts: state.shifts.map(s =>
          s.id === action.payload.shiftId
            ? { ...s, status: 'completado', checkOut: action.payload.checkOut, hoursWorked: action.payload.hoursWorked }
            : s
        ),
      };

    case 'UPDATE_VEHICLE_STATUS':
      return {
        ...state,
        vehicles: state.vehicles.map(v =>
          v.id === action.payload.vehicleId ? { ...v, status: action.payload.status } : v
        ),
      };

    case 'IMPORT_TRIPS':
      return { ...state, trips: [...state.trips, ...action.payload] };

    case 'ADD_DRIVER':
      return { ...state, drivers: [...state.drivers, action.payload] };

    case 'UPDATE_DRIVER':
      return {
        ...state,
        drivers: state.drivers.map(d => (d.id === action.payload.id ? action.payload : d)),
      };

    case 'DEACTIVATE_DRIVER':
      return {
        ...state,
        drivers: state.drivers.map(d =>
          d.id === action.payload ? { ...d, status: 'inactivo' } : d
        ),
      };

    case 'ADD_VEHICLE':
      return { ...state, vehicles: [...state.vehicles, action.payload] };

    case 'UPDATE_VEHICLE':
      return {
        ...state,
        vehicles: state.vehicles.map(v => (v.id === action.payload.id ? action.payload : v)),
      };

    case 'ADD_USER':
      return { ...state, users: [...state.users, action.payload] };

    case 'UPDATE_USER':
      return {
        ...state,
        users: state.users.map(u => (u.id === action.payload.id ? action.payload : u)),
      };

    case 'DEACTIVATE_USER':
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.payload ? { ...u, status: 'inactivo' } : u
        ),
      };

    case 'CLOSE_PAYROLL_WEEK':
      return { ...state, closedPayroll: [...state.closedPayroll, ...action.payload] };

    case 'RERUN_PAYROLL_CLOSE': {
      const superseded = state.closedPayroll.map(p =>
        p.weekLabel === action.payload.weekLabel && p.status === 'cerrado'
          ? { ...p, status: 'superseded' }
          : p
      );
      return { ...state, closedPayroll: [...superseded, ...action.payload.newRecords] };
    }

    case 'LOGIN':
      return { ...state, session: action.payload };

    case 'LOGOUT':
      return { ...state, session: null };

    default:
      return state;
  }
}

// ---- Initial state ----

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem('lafa_session');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const initialState: AppState = {
  drivers: MOCK_DRIVERS as Driver[],
  vehicles: MOCK_VEHICLES as Vehicle[],
  shifts: MOCK_SHIFTS as Shift[],
  users: MOCK_USERS as User[],
  trips: MOCK_TRIPS as Trip[],
  closedPayroll: MOCK_PAYROLL as PayrollRecord[],
  session: loadSession(),
  hydrated: !isSupabaseConfigured,
  dataSource: 'mock',
};

// ---- Context ----

const StateContext = createContext<AppState>(initialState);
const DispatchContext = createContext<Dispatch<Action>>(() => {});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    fetchAllData()
      .then(data => dispatch({ type: 'HYDRATE', payload: { ...data, dataSource: 'supabase' as const } }))
      .catch(err => {
        console.error('Failed to load from Supabase, using mock data:', err);
        dispatch({ type: 'HYDRATE', payload: {
          drivers: MOCK_DRIVERS as Driver[],
          vehicles: MOCK_VEHICLES as Vehicle[],
          shifts: MOCK_SHIFTS as Shift[],
          users: MOCK_USERS as User[],
          trips: MOCK_TRIPS as Trip[],
          closedPayroll: MOCK_PAYROLL as PayrollRecord[],
          dataSource: 'mock' as const,
        }});
      });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useAppState() {
  return useContext(StateContext);
}

export function useAppDispatch() {
  return useContext(DispatchContext);
}
