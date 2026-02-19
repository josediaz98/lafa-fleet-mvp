import { useState, useRef } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Upload, Download, Filter } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import type { Trip } from '@/types';
import { MOCK_DRIVERS } from '@/data/mock-data';
import { formatMXN } from '@/lib/format';
import { useToast } from '@/app/providers/ToastProvider';
import { actionImportTrips } from '@/lib/actions';
import { getWeekBounds } from '@/lib/date-utils';
import ValidationIcon from '@/components/ui/ValidationIcon';
import { parseCsvText, validateRow, CSV_TEMPLATE, type ParsedRow } from './lib/csv-parser';

const STEPS = [
  { num: 1, label: 'Subir archivo' },
  { num: 2, label: 'Previsualizar' },
  { num: 3, label: 'Confirmar' },
];

export default function CsvUploadPage() {
  const { trips, drivers: stateDrivers, session } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const fileRef = useRef<HTMLInputElement>(null);

  const [activeStep, setActiveStep] = useState(1);
  const [fileName, setFileName] = useState('');
  const [rows, setRows] = useState<ParsedRow[]>([]);
  const [showOnlyErrors, setShowOnlyErrors] = useState(false);
  const [dragging, setDragging] = useState(false);

  const existingTripIds = new Set(trips.map(t => t.tripId));

  function processFile(file: File) {
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
      const week = getWeekBounds();
      const validated = parsed.map(row => {
        const result = validateRow(row, seenIds, existingTripIds, driversForValidation, week.start, week.end);
        seenIds.add(row.tripId);
        return result;
      });

      setRows(validated);
      setShowOnlyErrors(false);
      setActiveStep(2);
    };
    reader.readAsText(file);
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.csv')) {
      processFile(file);
    } else {
      showToast('error', 'Solo se aceptan archivos .csv');
    }
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
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`w-full max-w-md border-2 border-dashed rounded-xl p-12 flex flex-col items-center gap-4 cursor-pointer transition-colors ${
              dragging
                ? 'border-lafa-accent bg-lafa-accent/5'
                : 'border-lafa-border hover:border-lafa-accent/50'
            }`}
          >
            <div className="w-14 h-14 rounded-full bg-lafa-accent/10 flex items-center justify-center">
              <Upload size={24} className="text-lafa-accent" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-lafa-text-primary mb-1">
                Arrastra tu archivo CSV aqu{'í'}, o haz click para seleccionar
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
              <CheckCircle size={14} /> {validCount} {'válidos'}
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
                    <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Conductor</th>
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
                      <td className={`px-4 py-3 text-sm ${row.matchType === 'fuzzy' ? 'text-[#EAB308]' : 'text-lafa-text-secondary'}`}>
                        {row.matchedDriverName ?? '—'}
                        {row.matchType === 'fuzzy' && <span className="text-[10px] ml-1">(fuzzy)</span>}
                      </td>
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
              {'← Atrás'}
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
          <h2 className="text-lg font-semibold text-lafa-text-primary mb-2">{'Importación completada'}</h2>
          <div className="bg-lafa-accent/10 border border-lafa-accent/20 rounded-xl p-3 mb-4 text-sm text-lafa-text-primary text-center max-w-lg">
            {importableCount} viajes importados, mapeados a {uniqueDrivers} conductores. {formatMXN(totalBilling)} facturados.
            {warningCount > 0 ? ` ${warningCount} advertencia${warningCount !== 1 ? 's' : ''}.` : ''}
            {errorCount > 0 ? ` ${errorCount} registro${errorCount !== 1 ? 's' : ''} con error descartado${errorCount !== 1 ? 's' : ''}.` : ''}
          </div>
          <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4 mb-6 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs text-lafa-text-secondary">Viajes</p>
              <p className="text-lg font-bold text-lafa-text-primary">{importableCount}</p>
            </div>
            <div>
              <p className="text-xs text-lafa-text-secondary">{'Facturación'}</p>
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
