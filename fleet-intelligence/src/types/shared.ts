// ---- Domain Types ----

export interface Center {
  id: string;
  name: string;
}

export interface Driver {
  id: string;
  fullName: string;
  didiDriverId: number;
  centerId: string;
  defaultShift: string;
  startDate: string;
  status: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  oem: string;
  centerId: string;
  status: string;
}

export interface Shift {
  id: string;
  driverId: string;
  driverName: string;
  vehicleId: string;
  plate: string;
  model: string;
  center: string;
  centerId: string;
  checkIn: string;
  checkOut?: string;
  hoursWorked?: number;
  status: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  centerId: string | null;
  status: string;
  password?: string;
}

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

export interface DataRange {
  shiftsFrom: string;
  tripsFrom: string;
  payrollFrom: string;
  shiftsHasMore?: boolean;
  tripsHasMore?: boolean;
  payrollHasMore?: boolean;
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
  authChecked: boolean;
  dataSource: 'supabase' | 'mock';
  dataRange?: DataRange;
}

// ---- Actions ----

export type Action =
  | { type: 'HYDRATE'; payload: Omit<AppState, 'session' | 'hydrated' | 'authChecked'> }
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
  | { type: 'LOGOUT' }
  | { type: 'APPEND_SHIFTS'; payload: { shifts: Shift[]; oldestDate: string; hasMore: boolean } }
  | { type: 'APPEND_TRIPS'; payload: { trips: Trip[]; oldestDate: string; hasMore: boolean } }
  | { type: 'APPEND_PAYROLL'; payload: { payroll: PayrollRecord[]; oldestDate: string; hasMore: boolean } }
  | { type: 'AUTH_CHECKED' };
