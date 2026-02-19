import { useState, useMemo, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Driver, Vehicle } from '@/types';
import { CENTERS } from '@/data/constants';
import SearchableSelect from '@/components/ui/SearchableSelect';
import StatusBadge from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';

interface ShiftCheckInModalProps {
  open: boolean;
  onClose: () => void;
  drivers: Driver[];
  vehicles: Vehicle[];
  shifts: { driverId: string; status: string; checkIn: string }[];
  onCheckIn: (driverId: string, vehicleId: string) => void;
}

export default function ShiftCheckInModal({ open, onClose, drivers, vehicles, shifts, onCheckIn }: ShiftCheckInModalProps) {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (open) {
      setSelectedDriverId('');
      setSelectedVehicleId('');
      setFormError('');
    }
  }, [open]);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  const centerMismatch = selectedDriver && selectedVehicle && selectedDriver.centerId !== selectedVehicle.centerId;

  useEffect(() => {
    if (formError) setFormError('');
  }, [selectedDriverId, selectedVehicleId]);

  const driverOptions = useMemo(() => drivers.map(d => {
    const center = CENTERS.find(c => c.id === d.centerId)?.name ?? '';
    return {
      value: d.id,
      label: d.fullName,
      sublabel: `${center} · ${d.defaultShift === 'diurno' ? 'Diurno' : 'Nocturno'}`,
    };
  }), [drivers]);

  const vehicleOptions = useMemo(() => vehicles.map(v => {
    const center = CENTERS.find(c => c.id === v.centerId)?.name ?? '';
    return {
      value: v.id,
      label: `${v.plate} · ${v.model}`,
      sublabel: `${center} · ${v.oem}`,
    };
  }), [vehicles]);

  const driverHadShiftToday = useMemo(() => {
    if (!selectedDriver) return false;
    const today = new Date().toISOString().slice(0, 10);
    return shifts.some(s => s.driverId === selectedDriver.id && s.checkIn.startsWith(today) && s.status === 'completado');
  }, [selectedDriver, shifts]);

  function handleSubmit() {
    setFormError('');
    if (!selectedDriverId || !selectedVehicleId) {
      setFormError('Selecciona conductor y vehículo.');
      return;
    }
    onCheckIn(selectedDriverId, selectedVehicleId);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Nuevo check-in">
      <div className="space-y-4">
        <SearchableSelect
          label="Conductor"
          options={driverOptions}
          value={selectedDriverId}
          onChange={setSelectedDriverId}
          placeholder="Seleccionar conductor..."
        />

        {selectedDriver && (
          <div className="bg-lafa-bg rounded-lg p-3 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-lafa-text-secondary">Centro</span>
              <span className="text-lafa-text-primary font-medium">{CENTERS.find(c => c.id === selectedDriver.centerId)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lafa-text-secondary">Turno default</span>
              <StatusBadge status={selectedDriver.defaultShift} />
            </div>
            {driverHadShiftToday && (
              <div className="flex items-center gap-1.5 text-status-alert pt-1">
                <AlertTriangle size={12} />
                <span>Ya tuvo un turno hoy</span>
              </div>
            )}
          </div>
        )}

        <SearchableSelect
          label="Vehículo"
          options={vehicleOptions}
          value={selectedVehicleId}
          onChange={setSelectedVehicleId}
          placeholder="Seleccionar vehículo..."
        />

        {selectedVehicle && (
          <div className="bg-lafa-bg rounded-lg p-3 text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-lafa-text-secondary">Centro</span>
              <span className="text-lafa-text-primary font-medium">{CENTERS.find(c => c.id === selectedVehicle.centerId)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lafa-text-secondary">OEM</span>
              <span className="text-lafa-text-primary">{selectedVehicle.oem}</span>
            </div>
          </div>
        )}

        {centerMismatch && (
          <div className="flex items-center gap-2 bg-status-alert/10 border border-status-alert/20 rounded-lg p-3 text-xs text-status-alert">
            <AlertTriangle size={14} className="shrink-0" />
            <span>El conductor y el vehículo pertenecen a centros diferentes.</span>
          </div>
        )}

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
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Registrar check-in
          </button>
        </div>
      </div>
    </Modal>
  );
}
