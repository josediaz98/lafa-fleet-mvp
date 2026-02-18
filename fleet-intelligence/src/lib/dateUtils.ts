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
