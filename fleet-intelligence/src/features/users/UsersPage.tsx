import { useState } from 'react';
import { Plus, Search, Shield } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import type { User } from '@/types';
import { CENTERS } from '@/data/constants';
import { useToast } from '@/app/providers/ToastProvider';
import { getCenterName } from '@/lib/format';
import { useConfirmDialog } from '@/components/ui/ConfirmDialog';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { actionAddUser, actionUpdateUser, actionDeactivateUser } from '@/lib/actions';
import { validateUserEdit, type UserFormData } from '@/lib/validators';
import StatusBadge from '@/components/ui/StatusBadge';
import Select from '@/components/ui/Select';
import SlidePanel from '@/components/ui/SlidePanel';
import UserTable from './components/UserTable';
import UserCreateModal from './components/UserCreateModal';

const emptyForm: UserFormData = {
  name: '',
  email: '',
  role: 'supervisor',
  centerId: '',
};

export default function UsersPage() {
  const { users, session } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<UserFormData>(emptyForm);
  const [formError, setFormError] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreateUser(user: User) {
    actionAddUser(user, dispatch, showToast, isSupabaseConfigured);
  }

  function openEdit() {
    if (!selectedUser) return;
    setForm({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      centerId: selectedUser.centerId ?? CENTERS[0]?.id ?? '',
    });
    setFormError('');
    setEditMode(true);
  }

  function handleSaveEdit() {
    if (!selectedUser) return;
    const userRecords = users.map(u => ({
      id: u.id,
      email: u.email,
      role: u.role,
      status: u.status,
      centerId: u.centerId,
    }));
    const error = validateUserEdit(form, userRecords, selectedUser.id);
    if (error) {
      setFormError(error);
      return;
    }
    const updated: User = {
      ...selectedUser,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      centerId: form.role === 'admin' ? null : form.centerId,
    };
    actionUpdateUser(updated, selectedUser, dispatch, showToast);
    setSelectedUser(updated);
    setEditMode(false);
  }

  async function handleDeactivate() {
    if (!selectedUser) return;
    if (session && selectedUser.id === session.userId) {
      showToast('error', 'No puedes desactivar tu propia cuenta.');
      return;
    }
    const activeAdmins = users.filter(u => u.role === 'admin' && u.status === 'activo');
    if (selectedUser.role === 'admin' && activeAdmins.length <= 1) {
      showToast('error', 'No se puede desactivar al último administrador.');
      return;
    }
    const ok = await confirm({
      title: 'Desactivar usuario',
      description: `Se desactivará a ${selectedUser.name}. No podrá iniciar sesión.`,
      confirmLabel: 'Desactivar',
      variant: 'danger',
    });
    if (!ok) return;
    actionDeactivateUser(selectedUser.id, selectedUser.name, dispatch, showToast);
    setSelectedUser(null);
  }

  const userRecords = users.map(u => ({
    id: u.id,
    email: u.email,
    role: u.role,
    status: u.status,
    centerId: u.centerId,
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-lafa-text-primary">Usuarios</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
        >
          <Plus size={16} /> Nuevo usuario
        </button>
      </div>

      <div>
        <div className="relative mb-4 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-lafa-text-secondary" />
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-lafa-surface border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
          />
        </div>

        <UserTable
          users={filtered}
          session={session}
          onSelect={(user) => { setSelectedUser(user); setEditMode(false); }}
        />
      </div>

      <SlidePanel
        open={!!selectedUser}
        onClose={() => { setSelectedUser(null); setEditMode(false); }}
        title={selectedUser?.name ?? ''}
      >
        {selectedUser && !editMode && (
          <div>
            {session && selectedUser.id === session.userId && (
              <div className="flex items-center gap-2 bg-lafa-accent/10 border border-lafa-accent/20 rounded-lg p-3 mb-5 text-xs text-lafa-accent">
                <Shield size={14} className="shrink-0" />
                <span>Esta es tu cuenta de usuario.</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-xs text-lafa-text-secondary">Nombre</p>
                <p className="text-sm font-medium text-lafa-text-primary">{selectedUser.name}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Email</p>
                <p className="text-sm font-medium text-lafa-text-primary">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Rol</p>
                <StatusBadge status={selectedUser.role} />
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Centro</p>
                <p className="text-sm font-medium text-lafa-text-primary">{getCenterName(selectedUser.centerId)}</p>
              </div>
              <div>
                <p className="text-xs text-lafa-text-secondary">Status</p>
                <StatusBadge status={selectedUser.status} />
              </div>
            </div>
            {selectedUser.status === 'activo' && (
              <div className="flex gap-3">
                <button
                  onClick={openEdit}
                  className="px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors duration-150"
                >
                  Editar
                </button>
                {!(session && selectedUser.id === session.userId) && (
                  <button
                    onClick={handleDeactivate}
                    className="px-4 py-2 text-sm font-medium text-status-danger border border-status-danger/30 rounded hover:bg-status-danger/10 transition-colors duration-150"
                  >
                    Desactivar
                  </button>
                )}
              </div>
            )}
          </div>
        )}
        {selectedUser && editMode && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Nombre</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Rol</label>
              <Select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              >
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
              </Select>
            </div>
            {form.role === 'supervisor' && (
              <div>
                <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Centro</label>
                <Select
                  value={form.centerId}
                  onChange={e => setForm({ ...form, centerId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                >
                  {CENTERS.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </Select>
              </div>
            )}
            {formError && <p className="text-sm text-status-danger">{formError}</p>}
            <div className="flex gap-3">
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </SlidePanel>

      <UserCreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        users={userRecords}
        onCreate={handleCreateUser}
      />
    </div>
  );
}
