import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  type ReactNode,
} from 'react';
import { useFocusTrap } from '@/lib/use-focus-trap';

interface ConfirmOptions {
  title: string;
  description?: string;
  confirmLabel?: string;
  variant?: 'danger' | 'default';
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({ title: '' });
  const resolveRef = useRef<((val: boolean) => void) | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setOpen(true);
    return new Promise((resolve) => {
      resolveRef.current = resolve;
    });
  }, []);

  function handleResolve(val: boolean) {
    setOpen(false);
    resolveRef.current?.(val);
    resolveRef.current = null;
  }

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') handleResolve(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useFocusTrap(open ? dialogRef : { current: null });

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {open && (
        <>
          <div
            className="fixed inset-0 z-[90] bg-black/50"
            onClick={() => handleResolve(false)}
          />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <div
              ref={dialogRef}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descId}
              className="bg-lafa-surface border border-lafa-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <h3
                id={titleId}
                className="text-lg font-semibold text-lafa-text-primary mb-2"
              >
                {options.title}
              </h3>
              <p id={descId} className="text-sm text-lafa-text-secondary mb-6">
                {options.description ?? 'Esta accion no se puede deshacer.'}
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => handleResolve(false)}
                  className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleResolve(true)}
                  className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
                    options.variant === 'danger'
                      ? 'bg-status-danger hover:bg-status-danger/80'
                      : 'bg-lafa-accent hover:bg-lafa-accent-hover'
                  }`}
                >
                  {options.confirmLabel ?? 'Confirmar'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirmDialog() {
  const ctx = useContext(ConfirmContext);
  if (!ctx)
    throw new Error(
      'useConfirmDialog must be used within ConfirmDialogProvider',
    );
  return ctx;
}
