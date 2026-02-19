import { supabase } from './client';
import type {
  DbCenter, DbProfile, DbDriver, DbVehicle, DbShift, DbTrip, DbWeeklyPayroll,
} from './types';
import {
  setLookupMaps,
  mapCenter, mapDriver, mapVehicle, mapShift, mapTrip, mapProfile, mapPayroll,
} from '@/lib/mappers';
import type { Driver, Vehicle, Shift, Trip, PayrollRecord, User } from '@/types';
import type { Center } from '@/data/mock-data';

export interface HydrateData {
  centers: Center[];
  drivers: Driver[];
  vehicles: Vehicle[];
  shifts: Shift[];
  trips: Trip[];
  users: User[];
  closedPayroll: PayrollRecord[];
}

export async function fetchAllData(): Promise<HydrateData> {
  if (!supabase) throw new Error('Supabase not configured');

  const [centersRes, driversRes, vehiclesRes, shiftsRes, tripsRes, profilesRes, payrollRes] =
    await Promise.all([
      supabase.from('centers').select('*'),
      supabase.from('drivers').select('*'),
      supabase.from('vehicles').select('*'),
      supabase.from('shifts').select('*').order('check_in', { ascending: false }).limit(10000),
      supabase.from('trips').select('*').order('date', { ascending: true }).limit(10000),
      supabase.from('profiles').select('*'),
      supabase.from('weekly_payroll').select('*').order('week_start', { ascending: true }).limit(10000),
    ]);

  const centers = (centersRes.data ?? []) as DbCenter[];
  const drivers = (driversRes.data ?? []) as DbDriver[];
  const vehicles = (vehiclesRes.data ?? []) as DbVehicle[];
  const shifts = (shiftsRes.data ?? []) as DbShift[];
  const trips = (tripsRes.data ?? []) as DbTrip[];
  const profiles = (profilesRes.data ?? []) as DbProfile[];
  const payroll = (payrollRes.data ?? []) as DbWeeklyPayroll[];

  // Build lookup maps for denormalization
  setLookupMaps(centers, drivers, vehicles, profiles);

  return {
    centers: centers.map(mapCenter),
    drivers: drivers.map(mapDriver),
    vehicles: vehicles.map(mapVehicle),
    shifts: shifts.map(mapShift),
    trips: trips.map(mapTrip),
    users: profiles.map(mapProfile),
    closedPayroll: payroll.map(mapPayroll),
  };
}
