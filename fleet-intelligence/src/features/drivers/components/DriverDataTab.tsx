import { useState } from 'react';
import type { Driver } from '@/types';
import { MOCK_CENTERS } from '@/data/mock-data';
import { getCenterName } from '@/lib/format';
import StatusBadge from '@/components/ui/StatusBadge';

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
    setFormError('');
    if (!form.fullName.trim()) {
      setFormError('Nombre es obligatorio.');
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
        {formError && <p className="text-sm text-[#EF4444]">{formError}</p>}
        <div className="flex gap-3">
          <button
            onClick={handleSaveEdit}
            className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
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
        <div className="flex gap-3">
          <button
            onClick={openEdit}
            className="px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={onDeactivate}
            className="px-4 py-2 text-sm font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
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
