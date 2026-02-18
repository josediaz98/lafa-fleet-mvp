import { useState, useEffect, useMemo } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useCenterFilter } from '../hooks/useCenterFilter';
import { formatTime, getElapsedTime, MOCK_CENTERS } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useConfirmDialog } from '../components/ui/ConfirmDialog';
import CenterFilterDropdown from '../components/ui/CenterFilterDropdown';
import SearchableSelect from '../components/ui/SearchableSelect';
import StatusBadge from '../components/ui/StatusBadge';
import EmptyState from '../components/ui/EmptyState';

type ShiftTab = 'activos' | 'completados' | 'pendientes';

export default function ShiftsPage() {
  const { shifts, drivers, vehicles } = useAppState();
  const dispatch = useAppDispatch();
  const { filterByCenter } = useCenterFilter();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();
  const [tab, setTab] = useState<ShiftTab>('activos');
  const [, setTick] = useState(0);

  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 60000);
    return () => clearInterval(id);
  }, []);

  const filteredShifts = filterByCenter(shifts);

  const activeShifts = filteredShifts.filter(s => s.status === 'en_turno');
  const completedShifts = filteredShifts.filter(s => s.status === 'completado');
  const pendingShifts = filteredShifts.filter(s =>
    (s.status === 'en_turno' || s.status === 'pendiente_revision') &&
    (Date.now() - new Date(s.checkIn).getTime()) > 12 * 3600000
  );

  const driversInShift = new Set(
    shifts.filter(s => s.status === 'en_turno').map(s => s.driverId)
  );
  const vehiclesInShift = new Set(
    shifts.filter(s => s.status === 'en_turno').map(s => s.vehicleId)
  );

  const centeredDrivers = filterByCenter(drivers).filter(
    d => d.status === 'activo' && !driversInShift.has(d.id)
  );
  const centeredVehicles = filterByCenter(vehicles).filter(
    v => v.status === 'disponible' && !vehiclesInShift.has(v.id)
  );

  const driverOptions = useMemo(() => centeredDrivers.map(d => {
    const center = MOCK_CENTERS.find(c => c.id === d.centerId)?.name ?? '';
    return {
      value: d.id,
      label: d.fullName,
      sublabel: `${center} \u00b7 ${d.defaultShift === 'diurno' ? 'Diurno' : 'Nocturno'}`,
    };
  }), [centeredDrivers]);

  const vehicleOptions = useMemo(() => centeredVehicles.map(v => {
    const center = MOCK_CENTERS.find(c => c.id === v.centerId)?.name ?? '';
    return {
      value: v.id,
      label: `${v.plate} \u00b7 ${v.model}`,
      sublabel: `${center} \u00b7 ${v.oem}`,
    };
  }), [centeredVehicles]);

  const selectedDriver = drivers.find(d => d.id === selectedDriverId);
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  const centerMismatch = selectedDriver && selectedVehicle && selectedDriver.centerId !== selectedVehicle.centerId;

  const driverHadShiftToday = useMemo(() => {
    if (!selectedDriver) return false;
    const today = new Date().toISOString().slice(0, 10);
    return shifts.some(s => s.driverId === selectedDriver.id && s.checkIn.startsWith(today) && s.status === 'completado');
  }, [selectedDriver, shifts]);

  const tabs: { key: ShiftTab; label: string; count: number }[] = [
    { key: 'activos', label: 'Activos', count: activeShifts.length },
    { key: 'completados', label: 'Completados hoy', count: completedShifts.length },
    { key: 'pendientes', label: 'Pendientes revisi\u00f3n', count: pendingShifts.length },
  ];

  const completedTotalHours = completedShifts.reduce((sum, s) => sum + (s.hoursWorked ?? 0), 0);

  function handleCheckIn() {
    setFormError('');
    if (!selectedDriverId || !selectedVehicleId) {
      setFormError('Selecciona conductor y veh\u00edculo.');
      return;
    }
    const driver = drivers.find(d => d.id === selectedDriverId);
    const vehicle = vehicles.find(v => v.id === selectedVehicleId);
    if (!driver || !vehicle) return;

    const center = MOCK_CENTERS.find(c => c.id === driver.centerId);
    const newShift = {
      id: `s-${Date.now()}`,
      driverId: driver.id,
      driverName: driver.fullName,
      vehicleId: vehicle.id,
      plate: vehicle.plate,
      model: vehicle.model,
      center: center?.name ?? '',
      centerId: driver.centerId,
      checkIn: new Date().toISOString(),
      status: 'en_turno',
    };

    dispatch({ type: 'ADD_SHIFT', payload: newShift });
    dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: vehicle.id, status: 'en_turno' } });
    showToast('success', `Check-in registrado: ${driver.fullName} en ${vehicle.plate}`);
    setSelectedDriverId('');
    setSelectedVehicleId('');
  }

  async function handleCheckOut(shiftId: string) {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;
    const now = new Date();
    const hours = Math.round(((now.getTime() - new Date(shift.checkIn).getTime()) / 3600000) * 10) / 10;

    if (hours < 1) {
      const ok = await confirm({
        title: 'Turno muy corto',
        description: `Este turno tiene menos de 1 hora (${hours}h). \u00bfSeguro que deseas cerrarlo?`,
        confirmLabel: 'Cerrar turno',
        variant: 'danger',
      });
      if (!ok) return;
    }

    dispatch({
      type: 'CLOSE_SHIFT',
      payload: { shiftId, checkOut: now.toISOString(), hoursWorked: hours },
    });
    if (shift.vehicleId) {
      dispatch({ type: 'UPDATE_VEHICLE_STATUS', payload: { vehicleId: shift.vehicleId, status: 'disponible' } });
    }
    showToast('success', `Turno cerrado: ${shift.driverName} \u2014 ${hours}h`);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-lafa-text-primary">Gesti\u00f3n de Turnos</h1>
        <CenterFilterDropdown />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0 lg:max-w-[60%]">
          <div className="flex gap-1 border-b border-lafa-border mb-4">
            {tabs.map(t => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
                  tab === t.key
                    ? 'text-lafa-accent'
                    : 'text-lafa-text-secondary hover:text-lafa-text-primary'
                }`}
              >
                {t.label} ({t.count})
                {tab === t.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {tab === 'activos' && activeShifts.map(shift => (
              <div key={shift.id} className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-semibold text-lafa-text-primary">{shift.driverName}</span>
                    <span className="text-xs text-lafa-text-secondary ml-2">{shift.center}</span>
                  </div>
                  <StatusBadge status="en_turno" />
                </div>
                <p className="text-xs text-lafa-text-secondary mb-3">
                  {shift.plate} {'\u00b7'} {shift.model} {'\u00b7'} Check-in: {formatTime(shift.checkIn)}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#3B82F6]">{getElapsedTime(shift.checkIn)}</span>
                  <button
                    onClick={() => handleCheckOut(shift.id)}
                    className="px-3 py-1.5 text-xs font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                  >
                    Cerrar turno
                  </button>
                </div>
              </div>
            ))}

            {tab === 'completados' && completedShifts.map(shift => (
              <div key={shift.id} className="bg-lafa-surface border border-lafa-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-lafa-text-primary">{shift.driverName}</span>
                  <StatusBadge status="completado" />
                </div>
                <p className="text-xs text-lafa-text-secondary mb-1">
                  {shift.plate} {'\u00b7'} {shift.model} {'\u00b7'} {shift.center}
                </p>
                <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
                  <span>{formatTime(shift.checkIn)} {shift.checkOut ? `\u2192 ${formatTime(shift.checkOut)}` : ''}</span>
                  {shift.hoursWorked !== undefined && (
                    <span className="font-medium text-[#22C55E]">{shift.hoursWorked}h</span>
                  )}
                </div>
              </div>
            ))}

            {tab === 'completados' && completedShifts.length > 0 && (
              <div className="bg-lafa-surface border border-lafa-border rounded-xl p-4 flex items-center justify-between">
                <span className="text-xs font-medium text-lafa-text-secondary">Total horas completadas hoy</span>
                <span className="text-sm font-semibold text-[#22C55E]">{completedTotalHours.toFixed(1)}h</span>
              </div>
            )}

            {tab === 'pendientes' && pendingShifts.map(shift => (
              <div key={shift.id} className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-lafa-text-primary">{shift.driverName}</span>
                  <StatusBadge status="alerta" label={`Abierto ${getElapsedTime(shift.checkIn)}`} />
                </div>
                <p className="text-xs text-lafa-text-secondary mb-3">
                  {shift.plate} {'\u00b7'} {shift.model} {'\u00b7'} {shift.center}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-lafa-text-secondary">
                    Check-in: {formatTime(shift.checkIn)} \u2014 Sin check-out
                  </p>
                  <button
                    onClick={() => handleCheckOut(shift.id)}
                    className="px-3 py-1.5 text-xs font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
                  >
                    Cerrar turno
                  </button>
                </div>
              </div>
            ))}

            {tab === 'activos' && activeShifts.length === 0 && (
              <EmptyState icon={Clock} title="Sin turnos activos" description="Registra un check-in para iniciar un turno." />
            )}
            {tab === 'completados' && completedShifts.length === 0 && (
              <EmptyState icon={Clock} title="Sin turnos completados hoy" />
            )}
            {tab === 'pendientes' && pendingShifts.length === 0 && (
              <EmptyState icon={AlertTriangle} title="Sin turnos pendientes de revisi\u00f3n" description="Todos los turnos est\u00e1n al d\u00eda." />
            )}
          </div>
        </div>

        <div className="lg:w-[38%] shrink-0">
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
                label="Veh\u00edculo"
                options={vehicleOptions}
                value={selectedVehicleId}
                onChange={setSelectedVehicleId}
                placeholder="Seleccionar veh\u00edculo..."
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
                  <span>El conductor y el veh\u00edculo pertenecen a centros diferentes.</span>
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
        </div>
      </div>
    </div>
  );
}
