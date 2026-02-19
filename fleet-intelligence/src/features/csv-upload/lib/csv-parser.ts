import { formatMXN } from '@/lib/format';

const CDMX_LAT_MIN = 19.1;
const CDMX_LAT_MAX = 19.6;
const CDMX_LNG_MIN = -99.4;
const CDMX_LNG_MAX = -98.9;

export interface ParsedRow {
  driverId: number;
  fecha: string;
  tripId: string;
  horaInicio: string;
  horaFin: string;
  costo: number;
  propina: number;
  pickupLat?: number;
  pickupLng?: number;
  estado: 'valido' | 'warning' | 'error';
  errorMsg?: string;
  matchedDriverName?: string;
  matchType?: 'exact' | 'fuzzy';
}

export function findClosestDriverId(input: number, activeDrivers: { didiDriverId: number }[]): number | null {
  const inputStr = String(input);
  let bestMatch: number | null = null;
  let bestDist = Infinity;

  for (const d of activeDrivers) {
    const candidateStr = String(d.didiDriverId);
    const dist = levenshtein(inputStr, candidateStr);
    if (dist < bestDist && dist <= 2) {
      bestDist = dist;
      bestMatch = d.didiDriverId;
    }
  }
  return bestMatch;
}

export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

export function validateRow(
  row: ParsedRow,
  allTripIds: Set<string>,
  existingTripIds: Set<string>,
  activeDrivers: { didiDriverId: number; fullName?: string }[],
  currentWeekStart?: string,
  currentWeekEnd?: string,
): ParsedRow {
  // Driver matching with match type tracking
  const exactMatch = activeDrivers.find(d => d.didiDriverId === row.driverId);
  if (!exactMatch) {
    const suggestion = findClosestDriverId(row.driverId, activeDrivers);
    const hint = suggestion ? ` ¿Quisiste decir ${suggestion}?` : '';
    return { ...row, estado: 'error', errorMsg: `Driver ID no encontrado${hint}` };
  }
  row.matchedDriverName = exactMatch.fullName ?? `Driver ${exactMatch.didiDriverId}`;
  row.matchType = 'exact';

  if (existingTripIds.has(row.tripId) || allTripIds.has(row.tripId)) {
    return { ...row, estado: 'error', errorMsg: 'Trip ID duplicado' };
  }

  const parts = row.fecha.split('/');
  if (parts.length !== 3) {
    return { ...row, estado: 'error', errorMsg: 'Fecha inválida' };
  }

  if (row.costo <= 0) {
    return { ...row, estado: 'error', errorMsg: 'Costo debe ser > 0' };
  }

  const parseMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + (m || 0);
  };
  const startMin = parseMinutes(row.horaInicio);
  const endMin = parseMinutes(row.horaFin);
  if (startMin === endMin) {
    return { ...row, estado: 'error', errorMsg: 'Hora inicio = hora fin' };
  }

  const tripMinutes = endMin > startMin ? endMin - startMin : (1440 - startMin + endMin);
  if (row.costo > 500 && tripMinutes < 15) {
    return { ...row, estado: 'warning', errorMsg: `Tarifa alta (${formatMXN(row.costo)}) para viaje de ${tripMinutes}min` };
  }

  if (row.pickupLat !== undefined && row.pickupLng !== undefined) {
    if (row.pickupLat < CDMX_LAT_MIN || row.pickupLat > CDMX_LAT_MAX ||
        row.pickupLng < CDMX_LNG_MIN || row.pickupLng > CDMX_LNG_MAX) {
      return { ...row, estado: 'warning', errorMsg: 'Coordenadas fuera de CDMX' };
    }
  }

  // Date range validation: warn if trip is outside current week
  if (currentWeekStart && currentWeekEnd && parts.length === 3) {
    const isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    if (isoDate < currentWeekStart || isoDate > currentWeekEnd) {
      return { ...row, estado: 'warning', errorMsg: `Fecha fuera de la semana actual (${currentWeekStart} a ${currentWeekEnd})` };
    }
  }

  if (row.costo > 500) {
    return { ...row, estado: 'warning', errorMsg: 'Tarifa inusualmente alta' };
  }

  return { ...row, estado: 'valido' };
}

function stripCurrency(val: string): string {
  return val.replace(/^\s*\$\s*/, '').trim();
}

function splitCsvLine(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += ch;
    }
  }
  fields.push(current.trim());
  return fields;
}

export function parseCsvText(text: string): ParsedRow[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map(h => h.trim().toLowerCase());

  const driverIdx = headers.findIndex(h => h.includes('driver'));
  const fechaIdx = headers.findIndex(h => h.includes('fecha') || h.includes('date'));
  const tripIdx = headers.findIndex(h => h.includes('trip'));
  const inicioIdx = headers.findIndex(h => h.includes('inicio') || h === 'initial time');
  const finIdx = headers.findIndex(h => h.includes('fin') || h === 'final time');
  const costoIdx = headers.findIndex(h => h.includes('costo') || h === 'cost');
  const propinaIdx = headers.findIndex(h => h.includes('propina') || h === 'tip');
  const latIdx = headers.findIndex(h => h.includes('lat'));
  const lngIdx = headers.findIndex(h => h.includes('lng') || h.includes('lon'));
  const initialCoordsIdx = headers.findIndex(h => h === 'initial coordinates');

  return lines.slice(1).filter(l => l.trim()).map(line => {
    const cols = splitCsvLine(line);
    const row: ParsedRow = {
      driverId: parseInt(cols[driverIdx] || '0', 10),
      fecha: cols[fechaIdx] || '',
      tripId: cols[tripIdx] || '',
      horaInicio: cols[inicioIdx] || '',
      horaFin: cols[finIdx] || '',
      costo: parseFloat(stripCurrency(cols[costoIdx] || '0')),
      propina: parseFloat(stripCurrency(cols[propinaIdx] || '0')),
      estado: 'valido' as const,
    };

    if (latIdx !== -1 && lngIdx !== -1) {
      const lat = parseFloat(cols[latIdx] || '');
      const lng = parseFloat(cols[lngIdx] || '');
      if (!isNaN(lat) && !isNaN(lng)) {
        row.pickupLat = lat;
        row.pickupLng = lng;
      }
    }
    else if (initialCoordsIdx !== -1) {
      const coordStr = cols[initialCoordsIdx] || '';
      const parts = coordStr.split(',').map(s => s.trim());
      if (parts.length === 2) {
        const lat = parseFloat(parts[0]);
        const lng = parseFloat(parts[1]);
        if (!isNaN(lat) && !isNaN(lng)) {
          row.pickupLat = lat;
          row.pickupLng = lng;
        }
      }
    }

    return row;
  });
}

export const CSV_TEMPLATE = 'Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip,Initial coordinates,Final coordinates\n114958,16/02/2026,abc123,6:32:00,7:18:00,$195.50,0,"19.4890,-99.1480","19.4170,-99.1620"\n114959,16/02/2026,def456,7:40:00,8:35:00,$228.60,30,"19.4400,-99.1870","19.4890,-99.1480"';
