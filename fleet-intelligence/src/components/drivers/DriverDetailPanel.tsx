import { useState } from 'react';
import { Users, Clock } from 'lucide-react';
import type { Driver, PayrollRecord, Shift } from '../../context/AppContext';
import { MOCK_CENTERS } from '../../data/mockData';
import { formatMXN, getCenterName } from '../../lib/format';
import { formatTime } from '../../lib/dateUtils';
import StatusBadge from '../ui/StatusBadge';
import EmptyState from '../ui/EmptyState';

type DriverPanelTab = 'datos' | 'nomina' | 'turnos';

interface DriverFormState {
  fullName: string;
  didiDriverId: string;
  centerId: string;
  defaultShift: string;
  startDate: string;
}

interface DriverDetailPanelProps {
  driver: Driver;
  payrollHistory: PayrollRecord[];
  shiftHistory: Shift[];
  isAdmin: boolean;
  onEdit: (updated: Driver) => void;
  onDeactivate: () => void;
}

export default function DriverDetailPanel({
  driver,
  payrollHistory,
  shiftHistory,
  isAdmin,
  onEdit,
  onDeactivate,
}: DriverDetailPanelProps) {
  const [panelTab, setPanelTab] = useState<DriverPanelTab>('datos');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<DriverFormState>({ fullName: '', didiDriverId: '', centerId: '', defaultShift: 'diurno', startDate: new Date().toISOString().slice(0, 10) });
  const [formError, setFormError] = useState('');

  const panelTabs: { key: DriverPanelTab; label: string }[] = [
    { key: 'datos', label: 'Datos' },
    { key: 'nomina', label: 'N\u00f3mina' },
    { key: 'turnos', label: 'Turnos' },
  ];

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

  return (
    <div>
      <div className="flex gap-1 border-b border-lafa-border mb-5">
        {panelTabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setPanelTab(t.key); setEditMode(false); }}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              panelTab === t.key ? 'text-lafa-accent' : 'text-lafa-text-secondary hover:text-lafa-text-primary'
            }`}
          >
            {t.label}
            {panelTab === t.key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-lafa-accent" />}
          </button>
        ))}
      </div>

      {panelTab === 'datos' && !editMode && (
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
      )}

      {panelTab === 'datos' && editMode && (
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
      )}

      {panelTab === 'nomina' && (
        <>
          {payrollHistory.length === 0 ? (
            <EmptyState icon={Users} title="Sin historial de n\u00f3mina" description="A\u00fan no hay registros de n\u00f3mina cerrados para este conductor." />
          ) : (
            <div className="bg-lafa-bg rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-lafa-border">
                    <th className="text-left px-3 py-2 text-xs font-medium text-lafa-text-secondary">Semana</th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">Horas</th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">Facturaci\u00f3n</th>
                    <th className="text-right px-3 py-2 text-xs font-medium text-lafa-text-secondary">Pago</th>
                    <th className="text-center px-3 py-2 text-xs font-medium text-lafa-text-secondary">Meta</th>
                  </tr>
                </thead>
                <tbody>
                  {payrollHistory.map(row => (
                    <tr key={row.id} className="border-b border-lafa-border/50">
                      <td className="px-3 py-2 text-lafa-text-primary text-xs">{row.weekLabel ?? '\u2014'}</td>
                      <td className="px-3 py-2 text-right text-lafa-text-secondary">{row.hoursWorked}h</td>
                      <td className="px-3 py-2 text-right text-lafa-text-secondary">{formatMXN(row.totalBilled)}</td>
                      <td className="px-3 py-2 text-right font-medium text-lafa-text-primary">{formatMXN(row.totalPay)}</td>
                      <td className="px-3 py-2 text-center">
                        {row.goalMet ? (
                          <span className="text-[#22C55E] text-xs">{'S\u00ed'}</span>
                        ) : (
                          <span className="text-[#EF4444] text-xs">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {panelTab === 'turnos' && (
        <>
          {shiftHistory.length === 0 ? (
            <EmptyState icon={Clock} title="Sin historial de turnos" description="A\u00fan no hay turnos completados para este conductor." />
          ) : (
            <div className="space-y-2">
              {shiftHistory.map(shift => (
                <div key={shift.id} className="bg-lafa-bg rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-lafa-text-primary">
                      {new Date(shift.checkIn).toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </span>
                    {shift.hoursWorked !== undefined && (
                      <span className="text-xs font-medium text-[#22C55E]">{shift.hoursWorked}h</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-lafa-text-secondary">
                    <span>{shift.plate} {'\u00b7'} {shift.model}</span>
                    <span>
                      {formatTime(shift.checkIn)}
                      {shift.checkOut ? ` \u2192 ${formatTime(shift.checkOut)}` : ''}
                    </span>
                  </div>
                </div>
              ))}
              <p className="text-xs text-lafa-text-secondary text-center pt-2">
                {'Mostrando los \u00faltimos '}{shiftHistory.length}{' turnos'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
