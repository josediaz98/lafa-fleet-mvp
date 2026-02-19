import type { ActionContext } from '@/lib/action-context';

export interface OptimisticOp {
  optimistic: () => void;
  persist: () => Promise<{ error: Error | null }>;
  rollback: () => void;
  successMsg: string;
  errorMsg: string;
}

export async function withOptimistic(ctx: ActionContext, op: OptimisticOp): Promise<void> {
  op.optimistic();
  const { error } = await op.persist();
  if (error) {
    console.error(`[withOptimistic] ${op.errorMsg}:`, error.message);
    op.rollback();
    ctx.showToast('error', `${op.errorMsg}: ${error.message}`);
    return;
  }
  ctx.showToast('success', op.successMsg);
}
