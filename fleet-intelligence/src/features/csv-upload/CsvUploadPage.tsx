import { useState } from 'react';
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
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-lafa-text-primary mb-1">
          Carga CSV
        </h1>
        <p className="text-sm text-lafa-text-secondary">
          Importa viajes de DiDi para calcular la nómina semanal.
        </p>
      </div>

      <div className="flex gap-1 mb-6">
        {STEPS.map((step) => (
          <div key={step.num} className="flex-1">
            <div
              className={`h-1 rounded-full ${
                step.num < activeStep
                  ? 'bg-status-success'
                  : step.num === activeStep
                    ? 'bg-lafa-accent'
                    : 'bg-lafa-border'
              }`}
            />
            <p
              className={`text-xs mt-1.5 text-center ${
                step.num === activeStep
                  ? 'text-lafa-text-primary font-medium'
                  : 'text-lafa-text-secondary'
              }`}
            >
              {step.label}
            </p>
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

      <div className="mt-8">
        <UploadHistoryTable refreshKey={historyKey} />
      </div>
    </div>
  );
}
