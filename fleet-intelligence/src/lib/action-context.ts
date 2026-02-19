import type { Dispatch } from 'react';
import type { Action } from '@/types';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { useToast } from '@/app/providers/ToastProvider';

export interface ActionContext {
  dispatch: Dispatch<Action>;
  showToast: (type: 'success' | 'error' | 'warning', msg: string) => void;
  userId: string;
  role?: string;
}

export function useActionContext(): ActionContext {
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { session } = useAppState();
  return {
    dispatch,
    showToast,
    userId: session?.userId ?? '',
    role: session?.role,
  };
}
