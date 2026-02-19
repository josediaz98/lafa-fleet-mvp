import type { ActionContext } from '@/lib/action-context';
import type { User } from '@/types';
import {
  persistNewUser,
  persistUpdateUser,
  persistDeactivateUser,
} from '@/lib/supabase/mutations';
import { addToProfilesMap } from '@/lib/mappers';
import { withOptimistic } from './with-optimistic';

export async function actionAddUser(
  user: User,
  ctx: ActionContext,
  supabaseMode = false,
) {
  if (supabaseMode) {
    const { userId, error } = await persistNewUser(user);
    if (error) {
      console.error('[actionAddUser] invite failed:', error.message, {
        email: user.email,
      });
      ctx.showToast('error', `Error al enviar invitación: ${error.message}`);
      return;
    }
    const newUser = {
      ...user,
      id: userId ?? user.id,
      status: 'invitado' as const,
    };
    ctx.dispatch({ type: 'ADD_USER', payload: newUser });
    addToProfilesMap(newUser);
    ctx.showToast('success', `Invitación enviada a ${user.email}`);
  } else {
    ctx.showToast(
      'error',
      'No se puede invitar usuarios: la conexión con Supabase no está configurada.',
    );
  }
}

export async function actionUpdateUser(
  user: User,
  oldUser: User,
  ctx: ActionContext,
) {
  await withOptimistic(ctx, {
    optimistic: () => {
      ctx.dispatch({ type: 'UPDATE_USER', payload: user });
      addToProfilesMap(user);
    },
    persist: () => persistUpdateUser(user),
    rollback: () => {
      ctx.dispatch({ type: 'UPDATE_USER', payload: oldUser });
      addToProfilesMap(oldUser);
    },
    successMsg: `Usuario ${user.name} actualizado.`,
    errorMsg: 'Error al actualizar usuario',
  });
}

export async function actionDeactivateUser(
  userId: string,
  userName: string,
  ctx: ActionContext,
) {
  await withOptimistic(ctx, {
    optimistic: () =>
      ctx.dispatch({ type: 'DEACTIVATE_USER', payload: userId }),
    persist: () => persistDeactivateUser(userId),
    rollback: () => ctx.dispatch({ type: 'REACTIVATE_USER', payload: userId }),
    successMsg: `${userName} desactivado.`,
    errorMsg: 'Error al desactivar usuario',
  });
}
