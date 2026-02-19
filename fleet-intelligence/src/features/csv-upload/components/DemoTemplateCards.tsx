import { Download, FileDown } from 'lucide-react';
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
    <div className="mt-5 w-full max-w-3xl">
      <div className="flex items-center gap-2 mb-3">
        <FileDown size={14} className="text-lafa-text-secondary" />
        <span className="text-xs font-medium text-lafa-text-primary">Plantillas demo</span>
        <span className="text-xs text-lafa-text-secondary">· datos de la semana actual</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {DEMO_TEMPLATES.map((t) => (
          <div
            key={t.id}
            onClick={() => downloadCsv(t)}
            className="bg-lafa-surface border border-lafa-border rounded-xl p-3 flex flex-col cursor-pointer transition-colors duration-150 hover:border-lafa-accent/40 hover:bg-lafa-accent/5"
          >
            <h3 className="text-sm font-semibold text-lafa-text-primary mb-1">
              {t.title}
            </h3>
            <div className="flex items-center gap-1.5 mb-2">
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${BADGE_COLORS[t.badge.color] ?? ''}`}
              >
                {t.badge.label}
              </span>
              <span className="text-[10px] text-lafa-text-secondary whitespace-nowrap">
                {t.rowCount} filas · {t.driverCount} cond.
              </span>
            </div>
            <p className="text-xs text-lafa-text-secondary flex-1">
              {t.description}
            </p>
            <div className="flex items-center gap-1.5 pt-2 mt-2 border-t border-lafa-border text-lafa-accent">
              <Download size={13} />
              <span className="text-xs font-medium">Descargar CSV</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
