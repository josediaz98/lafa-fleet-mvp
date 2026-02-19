import type { Driver, Shift } from '@/types';

/** Hours between check-in and check-out (or now), rounded to 1 decimal. */
export function shiftHours(checkIn: string, checkOut?: string): number {
  const end = checkOut ? new Date(checkOut).getTime() : Date.now();
  return Math.round(((end - new Date(checkIn).getTime()) / 3600000) * 10) / 10;
}

/** Convert DD/MM/YYYY to YYYY-MM-DD. Returns input unchanged if not in DD/MM/YYYY format. */
export function parseFechaToISO(fecha: string): string {
  const parts = fecha.split('/');
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
  return fecha;
}

/** Aggregate completed shift hours per driver. */
export function buildShiftSummaries(
  drivers: Driver[],
  shifts: Shift[],
): { driverId: string; totalHours: number }[] {
  return drivers.map((driver) => {
    const driverShifts = shifts.filter(
      (s) =>
        s.driverId === driver.id && s.status === 'completado' && s.hoursWorked,
    );
    return {
      driverId: driver.id,
      totalHours: driverShifts.reduce(
        (sum, s) => sum + (s.hoursWorked ?? 0),
        0,
      ),
    };
  });
}

export function formatTime(isoString: string): string {
  const d = new Date(isoString);
  return d.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
}

export function getElapsedTime(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

export function getWeekBounds() {
  const now = new Date();
  const day = now.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() + mondayOffset);
  weekStart.setHours(0, 0, 0, 0);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  return {
    label: `${fmt(weekStart)} – ${fmt(weekEnd)}, ${weekStart.getFullYear()}`,
    start: weekStart.toISOString().slice(0, 10),
    end: weekEnd.toISOString().slice(0, 10),
    startDate: weekStart,
    endDate: new Date(weekStart.getTime() + 7 * 86400000),
  };
}
