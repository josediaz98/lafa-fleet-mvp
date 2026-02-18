/** Hours between check-in and check-out (or now), rounded to 1 decimal. */
export function shiftHours(checkIn: string, checkOut?: string): number {
  const end = checkOut ? new Date(checkOut).getTime() : Date.now();
  return Math.round(((end - new Date(checkIn).getTime()) / 3600000) * 10) / 10;
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
  const fmt = (d: Date) => d.toLocaleDateString('es-MX', { month: 'short', day: 'numeric' });
  return {
    label: `${fmt(weekStart)} \u2013 ${fmt(weekEnd)}, ${weekStart.getFullYear()}`,
    start: weekStart.toISOString().slice(0, 10),
    end: weekEnd.toISOString().slice(0, 10),
    startDate: weekStart,
    endDate: new Date(weekStart.getTime() + 7 * 86400000),
  };
}
