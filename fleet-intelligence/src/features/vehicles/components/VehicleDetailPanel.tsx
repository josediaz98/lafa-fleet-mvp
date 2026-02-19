import { useState, useMemo } from 'react';
import type { Vehicle, Shift } from '@/types';
import { MOCK_CENTERS } from '@/data/mock-data';
import { getCenterName } from '@/lib/format';
import { STATUS_LABELS } from '@/lib/status-map';
import { validateVehicleForm, type VehicleFormData } from '@/lib/validators';
import StatusBadge from '@/components/ui/StatusBadge';

const ALL_STATUSES = ['disponible', 'en_turno', 'cargando', 'mantenimiento', 'fuera_de_servicio'];
const SUPERVISOR_STATUSES = ['disponible', 'cargando', 'mantenimiento'];

interface VehicleDetailPanelProps {
  vehicle: Vehicle;
  shifts: Shift[];
  isAdmin: boolean;
  existingPlates: string[];
  onStatusChange: (vehicle: Vehicle, newStatus: string) => void;
  onEdit: (updated: Vehicle) => void;
}

const emptyEditForm: VehicleFormData = { plate: '', model: '', oem: '', centerId: '' };

export default function VehicleDetailPanel({
  vehicle,
  shifts,
  isAdmin,
  existingPlates,
  onStatusChange,
  onEdit,
}: VehicleDetailPanelProps) {
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState<VehicleFormData>(emptyEditForm);
  const [editError, setEditError] = useState('');

  const vehicleShifts = useMemo(() => {
    return shifts
      .filter(s => s.vehicleId === vehicle.id)
      .sort((a, b) => new Date(b.checkIn).getTime() - new Date(a.checkIn).getTime())
      .slice(0, 10);
  }, [vehicle.id, shifts]);

  function getAvailableStatuses() {
    const statuses = (isAdmin ? ALL_STATUSES : SUPERVISOR_STATUSES).filter(s => s !== 'en_turno');
    const hasActiveShift = shifts.some(
      s => s.vehicleId === vehicle.id && s.status === 'en_turno'
    );
    if (hasActiveShift) {
      return statuses.filter(s => s !== 'disponible');
    }
    return statuses;
  }

  function openEdit() {
    setEditForm({ plate: vehicle.plate, model: vehicle.model, oem: vehicle.oem, centerId: vehicle.centerId });
    setEditError('');
    setEditMode(true);
  }

  function handleSaveEdit() {
    const error = validateVehicleForm(editForm, existingPlates, vehicle.plate);
    if (error) {
      setEditError(error);
      return;
    }
    const updated: Vehicle = {
      ...vehicle,
      plate: editForm.plate.trim().toUpperCase(),
      model: editForm.model.trim(),
      oem: editForm.oem.trim(),
      centerId: editForm.centerId,
    };
    onEdit(updated);
    setEditMode(false);
  }

  if (editMode) {
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Placa</label>
          <input
            value={editForm.plate}
            onChange={e => setEditForm({ ...editForm, plate: e.target.value })}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Modelo</label>
          <input
            value={editForm.model}
            onChange={e => setEditForm({ ...editForm, model: e.target.value })}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">OEM</label>
          <input
            value={editForm.oem}
            onChange={e => setEditForm({ ...editForm, oem: e.target.value })}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Centro</label>
          <select
            value={editForm.centerId}
            onChange={e => setEditForm({ ...editForm, centerId: e.target.value })}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          >
            {MOCK_CENTERS.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        {editError && <p className="text-sm text-[#EF4444]">{editError}</p>}
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
    <div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-xs text-lafa-text-secondary">Placa</p>
          <p className="text-sm font-medium text-lafa-text-primary font-mono">{vehicle.plate}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Modelo</p>
          <p className="text-sm font-medium text-lafa-text-primary">{vehicle.model}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">OEM</p>
          <p className="text-sm font-medium text-lafa-text-primary">{vehicle.oem}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Centro</p>
          <p className="text-sm font-medium text-lafa-text-primary">{getCenterName(vehicle.centerId)}</p>
        </div>
        <div>
          <p className="text-xs text-lafa-text-secondary">Status actual</p>
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-lafa-text-secondary mb-2">Cambiar status</label>
        <div className="flex flex-wrap gap-2">
          {getAvailableStatuses().map(s => (
            <button
              key={s}
              onClick={() => {
                if (s !== vehicle.status) {
                  onStatusChange(vehicle, s);
                }
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors ${
                s === vehicle.status
                  ? 'border-lafa-accent bg-lafa-accent/10 text-lafa-accent'
                  : 'border-lafa-border text-lafa-text-secondary hover:border-lafa-text-secondary'
              }`}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}
        </div>
      </div>

      {isAdmin && (
        <div className="mb-6">
          <button
            onClick={openEdit}
            className="px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors"
          >
            Editar datos
          </button>
        </div>
      )}

      <div>
        <h4 className="text-sm font-medium text-lafa-text-primary mb-3">Turnos recientes</h4>
        {vehicleShifts.length === 0 ? (
          <p className="text-xs text-lafa-text-secondary">Sin turnos registrados para este vehículo.</p>
        ) : (
          <div className="space-y-2">
            {vehicleShifts.map(shift => (
              <div key={shift.id} className="bg-lafa-bg rounded-lg p-3 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-lafa-text-primary">{shift.driverName}</span>
                  <p className="text-xs text-lafa-text-secondary">
                    {new Date(shift.checkIn).toLocaleDateString('es-MX', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={shift.status} />
                  {shift.hoursWorked !== undefined && (
                    <p className="text-xs text-lafa-text-secondary mt-0.5">{shift.hoursWorked}h</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
