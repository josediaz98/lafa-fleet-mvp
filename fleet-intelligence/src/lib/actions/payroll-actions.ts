import type { ActionContext } from '@/lib/action-context';
import type { PayrollRecord } from '@/types';
import {
  persistClosePayroll,
  persistRerunPayroll,
} from '@/lib/supabase/mutations';
import { withOptimistic } from './with-optimistic';

export async function actionClosePayroll(
  records: PayrollRecord[],
  weekLabel: string,
  ctx: ActionContext,
) {
  if (ctx.role && ctx.role !== 'admin') {
    ctx.showToast('error', 'Solo administradores pueden cerrar la semana.');
    return;
  }
  await withOptimistic(ctx, {
    optimistic: () =>
      ctx.dispatch({ type: 'CLOSE_PAYROLL_WEEK', payload: records }),
    persist: () => persistClosePayroll(records, ctx.userId),
    rollback: () =>
      ctx.dispatch({
        type: 'REMOVE_PAYROLL_WEEK',
        payload: records.map((r) => r.id),
      }),
    successMsg: `Semana ${weekLabel} cerrada exitosamente.`,
    errorMsg: 'Error al cerrar semana',
  });
}

export async function actionRerunPayroll(
  weekStart: string,
  weekLabel: string,
  newRecords: PayrollRecord[],
  version: number,
  ctx: ActionContext,
) {
  if (ctx.role && ctx.role !== 'admin') {
    ctx.showToast(
      'error',
      'Solo administradores pueden re-ejecutar la nómina.',
    );
    return;
  }
  ctx.dispatch({
    type: 'RERUN_PAYROLL_CLOSE',
    payload: { weekStart, newRecords },
  });
  const { error } = await persistRerunPayroll(
    weekStart,
    newRecords,
    ctx.userId,
  );
  if (error) {
    console.error('[actionRerunPayroll] persist failed:', error.message, {
      weekStart,
      version,
    });
    ctx.dispatch({
      type: 'REVERT_RERUN_PAYROLL',
      payload: { weekStart, removedIds: newRecords.map((r) => r.id) },
    });
    ctx.showToast('error', `Error al re-ejecutar nómina: ${error.message}`);
    return;
  }
  ctx.showToast('success', `Nómina ${weekLabel} re-ejecutada (v${version}).`);
}
