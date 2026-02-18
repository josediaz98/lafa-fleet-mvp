import { useState, useRef } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Upload, Download, Filter } from 'lucide-react';
import { useAppState, useAppDispatch, type Trip } from '../context/AppContext';
import { MOCK_DRIVERS } from '../data/mockData';
import { formatMXN } from '../lib/format';
import { useToast } from '../context/ToastContext';
import { actionImportTrips } from '../lib/actions';
import ValidationIcon from '../components/ui/ValidationIcon';

const STEPS = [
  { num: 1, label: 'Subir archivo' },
  { num: 2, label: 'Previsualizar' },
  { num: 3, label: 'Confirmar' },
];

const CSV_TEMPLATE = 'Driver ID,Date,Trip ID,Initial time,Final time,Cost,Tip,Initial coordinates,Final coordinates\n114958,16/02/2026,abc123,6:32:00,7:18:00,$195.50,0,"19.4890,-99.1480","19.4170,-99.1620"\n114959,16/02/2026,def456,7:40:00,8:35:00,$228.60,30,"19.4400,-99.1870","19.4890,-99.1480"';

const CDMX_LAT_MIN = 19.1;
const CDMX_LAT_MAX = 19.6;
const CDMX_LNG_MIN = -99.4;
const CDMX_LNG_MAX = -98.9;

interface ParsedRow {
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
}

function validateRow(row: ParsedRow, allTripIds: Set<string>, existingTripIds: Set<string>, activeDrivers: { didiDriverId: number }[]): ParsedRow {
  const driverExists = activeDrivers.some(d => d.didiDriverId === row.driverId);
  if (!driverExists) {
    return { ...row, estado: 'error', errorMsg: 'Driver ID no encontrado' };
  }

  if (existingTripIds.has(row.tripId) || allTripIds.has(row.tripId)) {
    return { ...row, estado: 'error', errorMsg: 'Trip ID duplicado' };
  }

  const parts = row.fecha.split('/');
  if (parts.length !== 3) {
    return { ...row, estado: 'error', errorMsg: 'Fecha inv\u00e1lida' };
  }

  if (row.costo <= 0) {
    return { ...row, estado: 'error', errorMsg: 'Costo debe ser > 0' };
  }

  // Allow midnight-crossing trips (e.g. 23:50 → 00:35 for nocturno shifts)
  const parseMinutes = (t: string) => {
    const [h, m] = t.split(':').map(Number);
    return h * 60 + (m || 0);
  };
  const startMin = parseMinutes(row.horaInicio);
  const endMin = parseMinutes(row.horaFin);
  if (startMin === endMin) {
    return { ...row, estado: 'error', errorMsg: 'Hora inicio = hora fin' };
  }

  if (row.pickupLat !== undefined && row.pickupLng !== undefined) {
    if (row.pickupLat < CDMX_LAT_MIN || row.pickupLat > CDMX_LAT_MAX ||
        row.pickupLng < CDMX_LNG_MIN || row.pickupLng > CDMX_LNG_MAX) {
      return { ...row, estado: 'warning', errorMsg: 'Coordenadas fuera de CDMX' };
    }
  }

  if (row.costo > 500) {
    return { ...row, estado: 'warning', errorMsg: 'Tarifa inusualmente alta' };
  }

  return { ...row, estado: 'valido' };
}

/** Strip currency prefix ($) and whitespace from a numeric string. */
function stripCurrency(val: string): string {
  return val.replace(/^\s*\$\s*/, '').trim();
}

/**
 * Split a CSV line respecting quoted fields.
 * Handles quoted coordinate pairs like "19.39,-99.16" as single fields.
 */
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

function parseCsvText(text: string): ParsedRow[] {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = splitCsvLine(lines[0]).map(h => h.trim().toLowerCase());

  // Support both English (brief) and Spanish header variants
  const driverIdx = headers.findIndex(h => h.includes('driver'));
  const fechaIdx = headers.findIndex(h => h.includes('fecha') || h.includes('date'));
  const tripIdx = headers.findIndex(h => h.includes('trip'));
  const inicioIdx = headers.findIndex(h => h.includes('inicio') || h === 'initial time');
  const finIdx = headers.findIndex(h => h.includes('fin') || h === 'final time');
  const costoIdx = headers.findIndex(h => h.includes('costo') || h === 'cost');
  const propinaIdx = headers.findIndex(h => h.includes('propina') || h === 'tip');
  // Coordinate columns: either separate lat/lng cols or quoted pairs
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

    // Parse coordinates from separate lat/lng columns
    if (latIdx !== -1 && lngIdx !== -1) {
      const lat = parseFloat(cols[latIdx] || '');
      const lng = parseFloat(cols[lngIdx] || '');
      if (!isNaN(lat) && !isNaN(lng)) {
        row.pickupLat = lat;
        row.pickupLng = lng;
      }
    }
    // Parse coordinates from quoted "lat, lng" pair (brief format)
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

export default function CsvUploadPage() {
  const { trips, drivers: stateDrivers, session } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [activeStep, setActiveStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);

  const existingTripIds = new Set(trips.map(t => t.tripId));

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      showToast('error', 'Archivo muy grande (máx 20MB)');
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const parsed = parseCsvText(text);

      const seenIds = new Set<string>();
      const driversForValidation = stateDrivers.length > 0 ? stateDrivers : MOCK_DRIVERS;
      const validated = parsed.map(row => {
        const result = validateRow(row, seenIds, existingTripIds, driversForValidation);
        seenIds.add(row.tripId);
        return result;
      });

      setRows(validated);
      setShowOnlyErrors(false);
      setActiveStep(2);
    };
    reader.readAsText(file);
  }

  function handleDownloadTemplate() {
    const blob = new Blob([CSV_TEMPLATE], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_viajes_didi.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport() {
    const validRows = rows.filter(r => r.estado !== 'error');
    const newTrips: Trip[] = validRows.map(r => ({
      id: `t-${r.tripId}`,
      driverId: r.driverId,
      fecha: r.fecha,
      tripId: r.tripId,
      horaInicio: r.horaInicio,
      horaFin: r.horaFin,
      costo: r.costo,
      propina: r.propina,
    }));

    // Build didiDriverId → UUID map
    const didiToDriverId = new Map<number, string>();
    const driversForMap = stateDrivers.length > 0 ? stateDrivers : MOCK_DRIVERS;
    for (const d of driversForMap) {
      didiToDriverId.set(d.didiDriverId, d.id);
    }
    actionImportTrips(newTrips, didiToDriverId, session?.userId ?? '', fileName, dispatch, showToast);
    setActiveStep(3);
  }

  const validCount = rows.filter(r => r.estado === 'valido').length;
  const warningCount = rows.filter(r => r.estado === 'warning').length;
  const errorCount = rows.filter(r => r.estado === 'error').length;
  const importableCount = validCount + warningCount;
  const totalBilling = rows.filter(r => r.estado !== 'error').reduce((sum, r) => sum + r.costo, 0);
  const uniqueDrivers = new Set(rows.filter(r => r.estado !== 'error').map(r => r.driverId)).size;

  const displayRows = showOnlyErrors ? rows.filter(r => r.estado === 'error') : rows;

  return (
    <div>
      <h1 className="text-2xl font-bold text-lafa-text-primary mb-6">Carga CSV</h1>

      <div className="flex items-center justify-center gap-4 mb-8">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.num < activeStep
                    ? 'bg-[#22C55E] text-white'
                    : step.num === activeStep
                    ? 'bg-lafa-accent text-white'
                    : 'bg-lafa-border text-lafa-text-secondary'
                }`}
              >
                {step.num < activeStep ? <CheckCircle size={16} /> : step.num}
              </div>
              <span
                className={`text-sm font-medium ${
                  step.num === activeStep ? 'text-lafa-text-primary' : 'text-lafa-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-0.5 ${
                  step.num < activeStep ? 'bg-[#22C55E]' : 'bg-lafa-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {activeStep === 1 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-full max-w-md border-2 border-dashed border-lafa-border rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-lafa-accent/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-lafa-accent/10 flex items-center justify-center">
              <Upload size={24} className="text-lafa-accent" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-lafa-text-primary mb-1">
                Haz click para seleccionar archivo CSV
              </p>
              <p className="text-xs text-lafa-text-secondary">
                Formato DiDi: Driver ID, Date, Trip ID, Initial time, Final time, Cost, Tip
              </p>
            </div>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleFileSelect}
          />
          <button
            onClick={handleDownloadTemplate}
            className="mt-4 flex items-center gap-2 text-xs font-medium text-lafa-accent hover:text-lafa-accent-hover transition-colors"
          >
            <Download size={14} /> Descargar plantilla CSV
          </button>
        </div>
      )}

      {activeStep === 2 && (
        <>
          <div className="flex items-center gap-4 mb-4 text-sm flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-[#22C55E]">
              <CheckCircle size={14} /> {validCount} {'v\u00e1lidos'}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#EAB308]">
              <AlertTriangle size={14} /> {warningCount} warning
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#EF4444]">
              <XCircle size={14} /> {errorCount} error
            </span>
            <span className="text-lafa-text-secondary text-xs">
              Mostrando {displayRows.length} de {rows.length} filas
            </span>
            {errorCount > 0 && (
              <button
                onClick={() => setShowOnlyErrors(!showOnlyErrors)}
                className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  showOnlyErrors
                    ? 'bg-[rgba(239,68,68,0.15)] text-[#EF4444]'
                    : 'bg-lafa-surface border border-lafa-border text-lafa-text-secondary hover:text-lafa-text-primary'
                }`}
              >
                <Filter size={12} /> {showOnlyErrors ? 'Mostrando errores' : 'Solo errores'}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 mb-4 text-xs text-lafa-text-secondary">
            Archivo: <span className="text-lafa-text-primary font-medium">{fileName}</span>
          </div>

          <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden mb-6">
            <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-lafa-surface z-10">
                  <tr className="border-b border-lafa-border">
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Driver ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Fecha</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Trip ID</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Hora inicio</th>
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Hora fin</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Costo</th>
                    <th className="text-right px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Propina</th>
                    <th className="text-center px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRows.map((row, i) => (
                    <tr
                      key={`${row.tripId}-${i}`}
                      className={`border-b border-lafa-border/50 ${
                        row.estado === 'error'
                          ? 'bg-[rgba(239,68,68,0.05)]'
                          : row.estado === 'warning'
                          ? 'bg-[rgba(234,179,8,0.05)]'
                          : i % 2 === 0
                          ? 'bg-transparent'
                          : 'bg-lafa-bg/30'
                      }`}
                    >
                      <td className="px-4 py-3 text-lafa-text-primary font-mono">{row.driverId}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary">{row.fecha}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary font-mono text-xs">{row.tripId}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary">{row.horaInicio}</td>
                      <td className="px-4 py-3 text-lafa-text-secondary">{row.horaFin}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-primary">${row.costo.toFixed(2)}</td>
                      <td className="px-4 py-3 text-right text-lafa-text-secondary">${row.propina.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center"><ValidationIcon estado={row.estado} msg={row.errorMsg} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={() => { setActiveStep(1); setRows([]); setFileName(''); }}
              className="px-5 py-2.5 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
            >
              {'← Atr\u00e1s'}
            </button>
            <button
              onClick={handleImport}
              disabled={importableCount === 0}
              className="px-5 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Importar {importableCount} viajes &rarr;
            </button>
          </div>
        </>
      )}

      {activeStep === 3 && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-[rgba(34,197,94,0.15)] flex items-center justify-center mb-4">
            <CheckCircle size={32} className="text-[#22C55E]" />
          </div>
          <h2 className="text-lg font-semibold text-lafa-text-primary mb-2">{'Importaci\u00f3n completada'}</h2>
          <p className="text-sm text-lafa-text-secondary mb-4">
            Se importaron {importableCount} viajes desde <span className="font-medium text-lafa-text-primary">{fileName}</span>
          </p>
          <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4 mb-6 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-lafa-text-secondary">Viajes</p>
              <p className="text-lg font-bold text-lafa-text-primary">{importableCount}</p>
            </div>
            <div>
              <p className="text-xs text-lafa-text-secondary">{'Facturaci\u00f3n'}</p>
              <p className="text-lg font-bold text-lafa-text-primary">{formatMXN(totalBilling)}</p>
            </div>
            <div>
              <p className="text-xs text-lafa-text-secondary">Conductores</p>
              <p className="text-lg font-bold text-lafa-text-primary">{uniqueDrivers}</p>
            </div>
          </div>
          <button
            onClick={() => { setActiveStep(1); setRows([]); setFileName(''); }}
            className="px-5 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
          >
            Cargar otro archivo
          </button>
        </div>
      )}
    </div>
  );
}
