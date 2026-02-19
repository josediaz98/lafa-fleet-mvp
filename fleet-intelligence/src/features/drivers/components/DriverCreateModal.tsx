import { useState } from 'react';
import { MOCK_CENTERS } from '@/data/mock-data';
import { validateDriverCreate, type DriverFormData } from '@/lib/validators';

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

export default function DriverCreateModal({ defaultCenterId, drivers, onClose, onCreate }: DriverCreateModalProps) {
  const [form, setForm] = useState<DriverFormState>({
    fullName: '',
    didiDriverId: '',
    centerId: defaultCenterId || MOCK_CENTERS[0]?.id || '',
    defaultShift: 'diurno',
    startDate: new Date().toISOString().slice(0, 10),
  });
  const [formError, setFormError] = useState('');

  function handleCreate() {
    const existingDidiIds = drivers.map(d => d.didiDriverId);
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
          <h3 className="text-lg font-semibold text-lafa-text-primary mb-5">Nuevo conductor</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Nombre completo</label>
              <input
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">DiDi Driver ID</label>
              <input
                type="number"
                value={form.didiDriverId}
                onChange={e => setForm({ ...form, didiDriverId: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Centro</label>
              <select
                value={form.centerId}
                onChange={e => setForm({ ...form, centerId: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              >
                {MOCK_CENTERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Turno default</label>
              <select
                value={form.defaultShift}
                onChange={e => setForm({ ...form, defaultShift: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              >
                <option value="diurno">Diurno</option>
                <option value="nocturno">Nocturno</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Fecha ingreso</label>
              <input
                type="date"
                value={form.startDate}
                onChange={e => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            {formError && <p className="text-sm text-status-danger">{formError}</p>}
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
