import { useState } from 'react';
import { CheckCircle, History } from 'lucide-react';
import type { Trip } from '@/types';
import { useActionContext } from '@/lib/action-context';
import { actionImportTrips } from '@/lib/actions';
import { useFileParser } from './lib/use-file-parser';
import UploadStep from './components/UploadStep';
import PreviewStep from './components/PreviewStep';
import ConfirmStep from './components/ConfirmStep';
import UploadHistoryTable from './components/UploadHistoryTable';

const STEPS = [
  { num: 1, label: 'Subir archivo' },
  { num: 2, label: 'Previsualizar' },
  { num: 3, label: 'Confirmar' },
];

export default function CsvUploadPage() {
  const parser = useFileParser();
  const ctx = useActionContext();

  const [activeStep, setActiveStep] = useState(1);
  const [historyKey, setHistoryKey] = useState(0);
  const [isImporting, setIsImporting] = useState(false);

  const validCount = parser.rows.filter((r) => r.estado === 'valido').length;
  const warningCount = parser.rows.filter(
    (r) => r.estado === 'warning',
  ).length;
  const errorCount = parser.rows.filter((r) => r.estado === 'error').length;
  const importableCount = validCount + warningCount;

  function handleFileSelect(file: File) {
    if (parser.processFile(file)) {
      setActiveStep(2);
    }
  }

  function handleBack() {
    setActiveStep(1);
    parser.reset();
  }

  function handleReset() {
    setActiveStep(1);
    parser.reset();
  }

  async function handleImport() {
    setIsImporting(true);
    const validRows = parser.rows.filter((r) => r.estado !== 'error');
    const newTrips: Trip[] = validRows.map((r) => ({
      id: crypto.randomUUID(),
      didiDriverId: r.driverId,
      fecha: r.fecha,
      tripId: r.tripId,
      horaInicio: r.horaInicio,
      horaFin: r.horaFin,
      costo: r.costo,
      propina: r.propina,
    }));

    const didiToDriverId = new Map<number, string>();
    for (const d of parser.drivers) {
      didiToDriverId.set(d.didiDriverId, d.id);
    }
    try {
      // H5: Pass warning/error counts to persist for accurate upload history
      await actionImportTrips(
        newTrips,
        didiToDriverId,
        parser.fileName,
        ctx,
        warningCount,
        errorCount,
      );
      setActiveStep(3);
    } catch {
      ctx.showToast('error', 'Error al importar viajes. Intenta de nuevo.');
    } finally {
      setIsImporting(false);
    }
    setHistoryKey((k) => k + 1);
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold text-lafa-text-primary mb-6">
        Carga CSV
      </h1>

      <div className="flex items-center justify-center gap-4 mb-8">
        {STEPS.map((step, i) => (
          <div key={step.num} className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step.num < activeStep
                    ? 'bg-status-success text-white'
                    : step.num === activeStep
                      ? 'bg-lafa-accent text-white'
                      : 'bg-lafa-border text-lafa-text-secondary'
                }`}
              >
                {step.num < activeStep ? <CheckCircle size={16} /> : step.num}
              </div>
              <span
                className={`text-sm font-medium ${
                  step.num === activeStep
                    ? 'text-lafa-text-primary'
                    : 'text-lafa-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-16 h-0.5 ${
                  step.num < activeStep ? 'bg-status-success' : 'bg-lafa-border'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {activeStep === 1 && (
        <UploadStep
          fileRef={parser.fileRef}
          onFileSelect={handleFileSelect}
        />
      )}

      {activeStep === 2 && (
        <PreviewStep
          rows={parser.rows}
          showOnlyErrors={parser.showOnlyErrors}
          setShowOnlyErrors={parser.setShowOnlyErrors}
          fileName={parser.fileName}
          importableCount={importableCount}
          isImporting={isImporting}
          onBack={handleBack}
          onImport={handleImport}
        />
      )}

      {activeStep === 3 && (
        <ConfirmStep rows={parser.rows} onReset={handleReset} />
      )}

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-lafa-text-primary mb-4 flex items-center gap-2">
          <History size={20} className="text-lafa-text-secondary" />
          Historial de cargas
        </h2>
        <UploadHistoryTable refreshKey={historyKey} />
      </div>
    </div>
  );
}
