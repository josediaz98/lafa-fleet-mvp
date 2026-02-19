import { Download } from 'lucide-react';
import {
  DEMO_TEMPLATES,
  generateCsvContent,
  type DemoTemplate,
} from '@/data/demo-csv-templates';

const BADGE_COLORS: Record<string, string> = {
  alert: 'bg-status-alert/15 text-status-alert',
  success: 'bg-status-success/15 text-status-success',
  danger: 'bg-status-danger/15 text-status-danger',
};

function downloadCsv(template: DemoTemplate) {
  const csv = generateCsvContent(template);
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = template.filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function DemoTemplateCards() {
  return (
    <div className="mt-6 w-full max-w-3xl">
      <p className="text-xs text-lafa-text-secondary mb-3 text-center">
        Plantillas demo con datos de la semana actual
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DEMO_TEMPLATES.map((t) => (
          <div
            key={t.id}
            className="bg-lafa-surface border border-lafa-border rounded-xl p-4 flex flex-col"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-sm font-semibold text-lafa-text-primary">
                {t.title}
              </h3>
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${BADGE_COLORS[t.badge.color] ?? ''}`}
              >
                {t.badge.label}
              </span>
            </div>
            <p className="text-xs text-lafa-text-secondary mb-3 flex-1">
              {t.description}
            </p>
            <div className="text-[10px] text-lafa-text-secondary mb-3">
              {t.rowCount} filas &middot; {t.driverCount} conductores
            </div>
            <button
              onClick={() => downloadCsv(t)}
              className="flex items-center justify-center gap-1.5 w-full px-3 py-2 text-xs font-medium text-lafa-accent border border-lafa-accent/30 rounded-lg hover:bg-lafa-accent/5 transition-colors duration-150"
            >
              <Download size={12} /> Descargar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
