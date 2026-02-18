import { useState } from 'react';
import { Plus, Search, Shield } from 'lucide-react';
import { useAppState, useAppDispatch, type User } from '../context/AppContext';
import { MOCK_CENTERS } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import { useConfirmDialog } from '../components/ui/ConfirmDialog';
import StatusBadge from '../components/ui/StatusBadge';
import SlidePanel from '../components/ui/SlidePanel';

interface UserFormState {
  name: string;
  email: string;
  role: string;
  centerId: string;
  password: string;
}

const emptyForm: UserFormState = {
  name: '',
  email: '',
  role: 'supervisor',
  centerId: '',
  password: '',
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function UsersPage() {
  const { users, session } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const { confirm } = useConfirmDialog();

  const [search, setSearch] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState<UserFormState>(emptyForm);
  const [formError, setFormError] = useState('');

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function getCenterName(centerId: string | null) {
    if (!centerId) return 'Todos';
    return MOCK_CENTERS.find(c => c.id === centerId)?.name ?? '';
  }

  function openCreate() {
    setForm({ ...emptyForm, centerId: MOCK_CENTERS[0]?.id ?? '' });
    setFormError('');
    setShowCreateModal(true);
  }

  function handleCreate() {
    setFormError('');
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setFormError('Nombre, email y contrase\u00f1a son obligatorios.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setFormError('Formato de email inv\u00e1lido.');
      return;
    }
    if (form.password.length < 6) {
      setFormError('La contrase\u00f1a debe tener al menos 6 caracteres.');
      return;
    }
    const emailExists = users.some(u => u.email.toLowerCase() === form.email.trim().toLowerCase());
    if (emailExists) {
      setFormError('Ya existe un usuario con ese email.');
      return;
    }
    const newUser: User = {
      id: `u-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      centerId: form.role === 'admin' ? null : form.centerId,
      status: 'activo',
      password: form.password,
    };
    dispatch({ type: 'ADD_USER', payload: newUser });
    showToast('success', `Usuario ${newUser.name} creado.`);
    setShowCreateModal(false);
  }

  function openEdit() {
    if (!selectedUser) return;
    setForm({
      name: selectedUser.name,
      email: selectedUser.email,
      role: selectedUser.role,
      centerId: selectedUser.centerId ?? MOCK_CENTERS[0]?.id ?? '',
      password: '',
    });
    setFormError('');
    setEditMode(true);
  }

  function handleSaveEdit() {
    if (!selectedUser) return;
    setFormError('');
    if (!form.name.trim() || !form.email.trim()) {
      setFormError('Nombre y email son obligatorios.');
      return;
    }
    if (!isValidEmail(form.email)) {
      setFormError('Formato de email inv\u00e1lido.');
      return;
    }
    const emailExists = users.some(u => u.email.toLowerCase() === form.email.trim().toLowerCase() && u.id !== selectedUser.id);
    if (emailExists) {
      setFormError('Ya existe otro usuario con ese email.');
      return;
    }
    const updated: User = {
      ...selectedUser,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      centerId: form.role === 'admin' ? null : form.centerId,
    };
    dispatch({ type: 'UPDATE_USER', payload: updated });
    setSelectedUser(updated);
    showToast('success', `Usuario ${updated.name} actualizado.`);
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
      showToast('error', 'No se puede desactivar al \u00faltimo administrador.');
      return;
    }
    const ok = await confirm({
      title: 'Desactivar usuario',
      description: `Se desactivar\u00e1 a ${selectedUser.name}. No podr\u00e1 iniciar sesi\u00f3n.`,
      confirmLabel: 'Desactivar',
      variant: 'danger',
    });
    if (!ok) return;
    dispatch({ type: 'DEACTIVATE_USER', payload: selectedUser.id });
    showToast('success', `${selectedUser.name} desactivado.`);
    setSelectedUser(null);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-lafa-text-primary">Usuarios</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
        >
          <Plus size={16} /> Nuevo usuario
        </button>
      </div>

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

      <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-lafa-border">
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Nombre</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Email</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Rol</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Centro asignado</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-lafa-text-secondary uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const isCurrentUser = session && user.id === session.userId;
                return (
                  <tr
                    key={user.id}
                    onClick={() => { setSelectedUser(user); setEditMode(false); }}
                    className={`border-b border-lafa-border/50 cursor-pointer hover:bg-lafa-accent/5 transition-colors ${
                      isCurrentUser
                        ? 'bg-lafa-accent/5 border-l-2 border-l-lafa-accent'
                        : i % 2 === 0 ? 'bg-transparent' : 'bg-lafa-bg/30'
                    }`}
                  >
                    <td className="px-4 py-3 text-lafa-text-primary font-medium">
                      <span className="flex items-center gap-2">
                        {user.name}
                        {isCurrentUser && (
                          <span className="text-[10px] font-medium text-lafa-accent bg-lafa-accent/10 px-1.5 py-0.5 rounded">{'T\u00fa'}</span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-lafa-text-secondary">{user.email}</td>
                    <td className="px-4 py-3"><StatusBadge status={user.role} /></td>
                    <td className="px-4 py-3 text-lafa-text-secondary">{getCenterName(user.centerId)}</td>
                    <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-2.5 border-t border-lafa-border">
          <span className="text-xs text-lafa-text-secondary">
            {filtered.length} usuario{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
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
                  className="px-4 py-2 text-sm font-medium text-lafa-accent border border-lafa-accent/30 rounded hover:bg-lafa-accent/10 transition-colors"
                >
                  Editar
                </button>
                {!(session && selectedUser.id === session.userId) && (
                  <button
                    onClick={handleDeactivate}
                    className="px-4 py-2 text-sm font-medium text-[#EF4444] border border-[#EF4444]/30 rounded hover:bg-[rgba(239,68,68,0.1)] transition-colors"
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
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
              >
                <option value="admin">Admin</option>
                <option value="supervisor">Supervisor</option>
              </select>
            </div>
            {form.role === 'supervisor' && (
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
            )}
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
      </SlidePanel>

      {showCreateModal && (
        <>
          <div className="fixed inset-0 z-[80] bg-black/50" onClick={() => setShowCreateModal(false)} />
          <div className="fixed inset-0 z-[81] flex items-center justify-center p-4">
            <div className="bg-lafa-surface border border-lafa-border rounded-xl p-6 max-w-md w-full shadow-2xl">
              <h3 className="text-lg font-semibold text-lafa-text-primary mb-5">Nuevo usuario</h3>
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
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">{'Contrase\u00f1a'}</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  />
                  <p className="text-xs text-lafa-text-secondary mt-1">{'M\u00ednimo 6 caracteres'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Rol</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
                  >
                    <option value="admin">Admin</option>
                    <option value="supervisor">Supervisor</option>
                  </select>
                </div>
                {form.role === 'supervisor' && (
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
                )}
                {formError && <p className="text-sm text-[#EF4444]">{formError}</p>}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleCreate}
                    className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors"
                  >
                    Crear usuario
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
