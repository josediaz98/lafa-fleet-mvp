import { useState, useMemo, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { Driver, Vehicle } from '@/types';
import { MOCK_CENTERS } from '@/data/mock-data';
import SearchableSelect from '@/components/ui/SearchableSelect';
import StatusBadge from '@/components/ui/StatusBadge';

interface ShiftCheckInFormProps {
  drivers: Driver[];
  vehicles: Vehicle[];
  shifts: { driverId: string; status: string; checkIn: string }[];
  onCheckIn: (driverId: string, vehicleId: string) => void;
}

export default function ShiftCheckInForm({ drivers, vehicles, shifts, onCheckIn }: ShiftCheckInFormProps) {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [formError, setFormError] = useState('');

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);
  const centerMismatch = selectedDriver && selectedVehicle && selectedDriver.centerId !== selectedVehicle.centerId;

  useEffect(() => {
    if (formError) setFormError('');
  }, [selectedDriverId, selectedVehicleId]);

  const driverOptions = useMemo(() => drivers.map(d => {
    const center = MOCK_CENTERS.find(c => c.id === d.centerId)?.name ?? '';
    return {
      value: d.id,
      label: d.fullName,
      sublabel: `${center} · ${d.defaultShift === 'diurno' ? 'Diurno' : 'Nocturno'}`,
    };
  }), [drivers]);

  const vehicleOptions = useMemo(() => vehicles.map(v => {
    const center = MOCK_CENTERS.find(c => c.id === v.centerId)?.name ?? '';
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

  function handleCheckIn() {
    setFormError('');
    if (!selectedDriverId || !selectedVehicleId) {
      setFormError('Selecciona conductor y vehículo.');
      return;
    }
    onCheckIn(selectedDriverId, selectedVehicleId);
    setSelectedDriverId('');
    setSelectedVehicleId('');
  }

  return (
    <div className="bg-lafa-surface border border-lafa-border rounded-xl p-5 sticky top-8">
      <h3 className="text-base font-semibold text-lafa-text-primary mb-5">Nuevo check-in</h3>

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
              <span className="text-lafa-text-primary font-medium">{MOCK_CENTERS.find(c => c.id === selectedDriver.centerId)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lafa-text-secondary">Turno default</span>
              <StatusBadge status={selectedDriver.defaultShift} />
            </div>
            {driverHadShiftToday && (
              <div className="flex items-center gap-1.5 text-[#EAB308] pt-1">
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
              <span className="text-lafa-text-primary font-medium">{MOCK_CENTERS.find(c => c.id === selectedVehicle.centerId)?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-lafa-text-secondary">OEM</span>
              <span className="text-lafa-text-primary">{selectedVehicle.oem}</span>
            </div>
          </div>
        )}

        {centerMismatch && (
          <div className="flex items-center gap-2 bg-[rgba(234,179,8,0.1)] border border-[rgba(234,179,8,0.2)] rounded-lg p-3 text-xs text-[#EAB308]">
            <AlertTriangle size={14} className="shrink-0" />
            <span>El conductor y el vehículo pertenecen a centros diferentes.</span>
          </div>
        )}

        {formError && (
          <p className="text-sm text-[#EF4444]">{formError}</p>
        )}

        <button
          onClick={handleCheckIn}
          className="w-full py-2.5 bg-lafa-accent hover:bg-lafa-accent-hover text-white font-medium rounded text-sm transition-colors"
        >
          Registrar check-in
        </button>
      </div>
    </div>
  );
}
