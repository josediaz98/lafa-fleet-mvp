import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';

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

  const confirm = useCallback((opts: ConfirmOptions): Promise<boolean> => {
    setOptions(opts);
    setOpen(true);
    return new Promise(resolve => {
      resolveRef.current = resolve;
    });
  }, []);

  function handleResolve(val: boolean) {
    setOpen(false);
    resolveRef.current?.(val);
    resolveRef.current = null;
  }

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {open && (
        <>
          <div className="fixed inset-0 z-[90] bg-black/50" onClick={() => handleResolve(false)} />
          <div className="fixed inset-0 z-[91] flex items-center justify-center p-4">
            <div className="bg-lafa-surface border border-lafa-border rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-semibold text-lafa-text-primary mb-2">{options.title}</h3>
              <p className="text-sm text-lafa-text-secondary mb-6">
                {options.description ?? 'Esta acci\u00f3n no se puede deshacer.'}
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => handleResolve(false)}
                  className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleResolve(true)}
                  className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors ${
                    options.variant === 'danger'
                      ? 'bg-[#EF4444] hover:bg-[#DC2626]'
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
  if (!ctx) throw new Error('useConfirmDialog must be used within ConfirmDialogProvider');
  return ctx;
}
