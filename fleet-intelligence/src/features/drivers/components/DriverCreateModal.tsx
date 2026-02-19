import { useState } from 'react';
import { CENTERS } from '@/data/constants';
import { validateDriverCreate, type DriverFormData } from '@/lib/validators';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface DriverFormState extends DriverFormData {
  defaultShift: string;
  startDate: string;
}

interface DriverCreateModalProps {
  defaultCenterId: string;
  drivers: Array<{ didiDriverId: number }>;
  onClose: () => void;
  onCreate: (form: DriverFormState) => void;
}

export default function DriverCreateModal({
  defaultCenterId,
  drivers,
  onClose,
  onCreate,
}: DriverCreateModalProps) {
  const [form, setForm] = useState<DriverFormState>({
    fullName: '',
    didiDriverId: '',
    centerId: defaultCenterId || CENTERS[0]?.id || '',
    defaultShift: 'diurno',
    startDate: new Date().toISOString().slice(0, 10),
  });
  const [formError, setFormError] = useState('');

  function handleCreate() {
    const existingDidiIds = drivers.map((d) => d.didiDriverId);
    const error = validateDriverCreate(form, existingDidiIds);
    if (error) {
      setFormError(error);
      return;
    }
    onCreate(form);
  }

  return (
    <>
      <div className="fixed inset-0 z-[80] bg-black/50" onClick={onClose} />
      <div className="fixed inset-0 z-[81] flex items-center justify-center p-4">
        <div className="bg-lafa-surface border border-lafa-border rounded-xl p-6 max-w-md w-full shadow-2xl">
          <h3 className="text-lg font-semibold text-lafa-text-primary mb-5">
            Nuevo conductor
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
                Nombre completo
              </label>
              <input
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
                DiDi Driver ID
              </label>
              <input
                type="number"
                value={form.didiDriverId}
                onChange={(e) =>
                  setForm({ ...form, didiDriverId: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <SearchableSelect
              label="Centro"
              options={CENTERS.map((c) => ({ value: c.id, label: c.name }))}
              value={form.centerId}
              onChange={(v) => setForm({ ...form, centerId: v })}
              searchable={false}
            />
            <SearchableSelect
              label="Turno default"
              options={[
                { value: 'diurno', label: 'Diurno' },
                { value: 'nocturno', label: 'Nocturno' },
              ]}
              value={form.defaultShift}
              onChange={(v) => setForm({ ...form, defaultShift: v })}
              searchable={false}
            />
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
                Fecha ingreso
              </label>
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            {formError && (
              <p className="text-sm text-status-danger">{formError}</p>
            )}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Crear conductor
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
