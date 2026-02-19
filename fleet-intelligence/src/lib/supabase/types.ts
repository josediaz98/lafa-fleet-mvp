// Database row types matching supabase-schema.sql

export interface DbCenter {
  id: string;
  name: string;
  address: string | null;
  lat: number | null;
  lng: number | null;
  created_at: string;
}

export interface DbProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'supervisor';
  center_id: string | null;
  status: 'activo' | 'inactivo';
  created_at: string;
}

export interface DbDriver {
  id: string;
  full_name: string;
  didi_driver_id: number;
  center_id: string;
  default_shift: 'diurno' | 'nocturno';
  start_date: string;
  status: 'activo' | 'inactivo';
  created_at: string;
}

export interface DbVehicle {
  id: string;
  plate: string;
  model: string;
  oem: 'Geely' | 'JAC' | 'GAC';
  center_id: string;
  status: string;
  created_at: string;
}

export interface DbShift {
  id: string;
  driver_id: string;
  vehicle_id: string;
  check_in: string;
  check_out: string | null;
  hours_worked: number | null;
  status: string;
  created_by: string | null;
  created_at: string;
}

export interface DbTrip {
  id: string;
  driver_id: string;
  didi_trip_id: string;
  date: string;
  initial_time: string;
  final_time: string;
  cost: number;
  tip: number;
  initial_lat: number | null;
  initial_lng: number | null;
  final_lat: number | null;
  final_lng: number | null;
  upload_id: string | null;
  created_at: string;
}

export interface DbWeeklyPayroll {
  id: string;
  driver_id: string;
  week_start: string;
  week_end: string;
  hours_worked: number;
  total_billed: number;
  tips_total: number;
  hours_threshold: number;
  revenue_threshold: number;
  goal_met: boolean;
  base_salary: number;
  productivity_bonus: number;
  overtime_pay: number;
  total_pay: number;
  status: string;
  version: number;
  ai_explanation: string | null;
  closed_by: string | null;
  closed_at: string | null;
  created_at: string;
}
