import { type ReactNode } from 'react';
import { X } from 'lucide-react';

interface SlidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function SlidePanel({ open, onClose, title, children }: SlidePanelProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/50" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 z-[71] w-full max-w-md bg-lafa-surface border-l border-lafa-border shadow-2xl overflow-y-auto transition-transform">
        <div className="sticky top-0 z-10 bg-lafa-surface border-b border-lafa-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-lafa-text-primary truncate">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-lafa-border transition-colors"
          >
            <X size={18} className="text-lafa-text-secondary" />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </>
  );
}
