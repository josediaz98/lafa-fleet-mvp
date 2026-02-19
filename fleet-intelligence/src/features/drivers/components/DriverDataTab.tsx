import { useState } from 'react';
import type { Driver } from '@/types';
import { CENTERS } from '@/data/constants';
import { getCenterName } from '@/lib/format';
import { validateDriverEdit } from '@/lib/validators';
import StatusBadge from '@/components/ui/StatusBadge';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface DriverFormState {
  fullName: string;
  didiDriverId: string;
  centerId: string;
  defaultShift: string;
  startDate: string;
}

interface DriverDataTabProps {
  driver: Driver;
  isAdmin: boolean;
  onEdit: (updated: Driver) => void;
  onDeactivate: () => void;
}

export default function DriverDataTab({ driver, isAdmin, onEdit, onDeactivate }: DriverDataTabProps) {
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<DriverFormState>({
    fullName: '',
    didiDriverId: '',
    centerId: '',
    defaultShift: 'diurno',
    startDate: new Date().toISOString().slice(0, 10),
  });
  const [formError, setFormError] = useState('');

  function openEdit() {
    setForm({
      fullName: driver.fullName,
      didiDriverId: String(driver.didiDriverId),
      centerId: driver.centerId,
      defaultShift: driver.defaultShift,
      startDate: driver.startDate,
    });
    setFormError('');
    setEditMode(true);
  }

  function handleSaveEdit() {
    const error = validateDriverEdit(form);
    if (error) {
      setFormError(error);
      return;
    }
    const updated: Driver = {
      ...driver,
      fullName: form.fullName.trim(),
      didiDriverId: parseInt(form.didiDriverId, 10),
      centerId: form.centerId,
      defaultShift: form.defaultShift,
      startDate: form.startDate,
    };
    onEdit(updated);
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Nombre completo</label>
          <input
            value={form.fullName}
            onChange={e => setForm({ ...form, fullName: e.target.value })}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <SearchableSelect
          label="Centro"
          options={CENTERS.map(c => ({ value: c.id, label: c.name }))}
          value={form.centerId}
          onChange={v => setForm({ ...form, centerId: v })}
          searchable={false}
        />
        <SearchableSelect
          label="Turno default"
          options={[
            { value: 'diurno', label: 'Diurno' },
            { value: 'nocturno', label: 'Nocturno' },
          ]}
          value={form.defaultShift}
          onChange={v => setForm({ ...form, defaultShift: v })}
          searchable={false}
        />
        {formError && <p className="text-sm text-status-danger">{formError}</p>}
        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
          >
            Guardar
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-lafa-text-secondary">Nombre completo</p>
          <p className="text-sm font-medium text-lafa-text-primary">{driver.fullName}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">DiDi ID</p>
          <p className="text-sm font-medium text-lafa-text-primary font-mono">{driver.didiDriverId}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Centro</p>
          <p className="text-sm font-medium text-lafa-text-primary">{getCenterName(driver.centerId)}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Turno default</p>
          <StatusBadge status={driver.defaultShift} />
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Fecha ingreso</p>
          <p className="text-sm font-medium text-lafa-text-primary">{driver.startDate}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Status</p>
          <StatusBadge status={driver.status} />
        </div>
      </div>
      {isAdmin && driver.status === 'activo' && (
        <div className="flex items-center gap-3">
          <button
            onClick={openEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
          >
            Editar
          </button>
          <div className="flex-1" />
          <button
            onClick={onDeactivate}
            className="px-4 py-2 text-sm font-medium text-status-danger border border-status-danger/30 rounded hover:bg-status-danger/10 transition-colors duration-150"
          >
            Desactivar
          </button>
        </div>
      )}
      {!isAdmin && (
        <p className="text-xs text-lafa-text-secondary italic">Solo lectura. Contacta a un administrador para hacer cambios.</p>
      )}
    </>
  );
}
