import { useEffect, useRef, useId, type ReactNode } from 'react';
import { useFocusTrap } from '@/lib/use-focus-trap';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  useFocusTrap(open ? dialogRef : { current: null });

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-[81] flex items-center justify-center p-4" onClick={onClose}>
        <div
          onClick={e => e.stopPropagation()}
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="bg-lafa-surface border border-lafa-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
        >
          <h3 id={titleId} className="text-lg font-semibold text-lafa-text-primary mb-5">{title}</h3>
          {children}
        </div>
      </div>
    </>
  );
}
