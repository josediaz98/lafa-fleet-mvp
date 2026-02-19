import { useState } from 'react';
import { useAppState } from '@/app/providers/AppProvider';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useActionContext } from '@/lib/action-context';
import { shiftHours } from '@/lib/date-utils';
import { actionCheckOut } from '@/lib/actions';

export function useShiftCheckOut() {
  const { shifts } = useAppState();
  const ctx = useActionContext();
  const { confirm } = useConfirmDialog();
  const [closingShiftId, setClosingShiftId] = useState<string | null>(null);

  async function handleCheckOut(shiftId: string) {
    const shift = shifts.find(s => s.id === shiftId);
    if (!shift) return;

    const hours = shiftHours(shift.checkIn);

    if (hours < 1) {
      const ok = await confirm({
        title: 'Turno muy corto',
        description: `Este turno tiene menos de 1 hora (${hours}h). ¿Seguro que deseas cerrarlo?`,
        confirmLabel: 'Cerrar turno',
        variant: 'danger',
      });
      if (!ok) return;
    }

    setClosingShiftId(shiftId);
    try {
      const checkOutTime = new Date().toISOString();
      await actionCheckOut(
        { shiftId, checkOut: checkOutTime, hoursWorked: hours, vehicleId: shift.vehicleId || undefined, driverName: shift.driverName },
        ctx,
      );
    } finally {
      setClosingShiftId(null);
    }
  }

  return { handleCheckOut, closingShiftId };
}
