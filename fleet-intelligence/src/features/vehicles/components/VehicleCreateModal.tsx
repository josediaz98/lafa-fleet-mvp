import { useState, useEffect } from 'react';
import type { Vehicle } from '@/types';
import { CENTERS } from '@/data/constants';
import { validateVehicleForm, type VehicleFormData } from '@/lib/validators';
import Modal from '@/components/ui/Modal';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface VehicleCreateModalProps {
  open: boolean;
  onClose: () => void;
  existingPlates: string[];
  defaultCenterId: string;
  onCreate: (vehicle: Vehicle) => void;
}

const emptyForm: VehicleFormData = {
  plate: '',
  model: '',
  oem: '',
  centerId: '',
};

export default function VehicleCreateModal({
  open,
  onClose,
  existingPlates,
  defaultCenterId,
  onCreate,
}: VehicleCreateModalProps) {
  const [form, setForm] = useState<VehicleFormData>({
    ...emptyForm,
    centerId: defaultCenterId,
  });
  const [formError, setFormError] = useState('');

  /* eslint-disable react-hooks/set-state-in-effect -- reset form on modal open */
  useEffect(() => {
    if (open) {
      setForm({ ...emptyForm, centerId: defaultCenterId });
      setFormError('');
    }
  }, [open, defaultCenterId]);
  /* eslint-enable react-hooks/set-state-in-effect */

  function handleCreate() {
    const error = validateVehicleForm(form, existingPlates);
    if (error) {
      setFormError(error);
      return;
    }
    const newVehicle: Vehicle = {
      id: crypto.randomUUID(),
      plate: form.plate.trim().toUpperCase(),
      model: form.model.trim(),
      oem: form.oem.trim(),
      centerId: form.centerId,
      status: 'disponible',
    };
    onCreate(newVehicle);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={'Nuevo vehículo'}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
            Placa
          </label>
          <input
            value={form.plate}
            onChange={(e) => setForm({ ...form, plate: e.target.value })}
            placeholder="ABC-123"
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
            Modelo
          </label>
          <input
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            placeholder="Geometry C"
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">
            OEM
          </label>
          <input
            value={form.oem}
            onChange={(e) => setForm({ ...form, oem: e.target.value })}
            placeholder="Geely"
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
            {'Crear vehículo'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
