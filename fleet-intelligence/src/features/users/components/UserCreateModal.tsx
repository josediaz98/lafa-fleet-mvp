import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { MOCK_CENTERS } from '@/data/mock-data';
import { validateUserCreate, type UserFormData } from '@/lib/validators';
import Modal from '@/components/ui/Modal';

interface UserCreateModalProps {
  open: boolean;
  onClose: () => void;
  users: Array<{ id: string; email: string; role: string; status: string; centerId: string | null }>;
  onCreate: (user: User, password: string) => void;
}

const emptyForm: UserFormData = {
  name: '',
  email: '',
  role: 'supervisor',
  centerId: '',
  password: '',
};

export default function UserCreateModal({ open, onClose, users, onCreate }: UserCreateModalProps) {
  const [form, setForm] = useState<UserFormData>({ ...emptyForm, centerId: MOCK_CENTERS[0]?.id ?? '' });
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (open) {
      setForm({ ...emptyForm, centerId: MOCK_CENTERS[0]?.id ?? '' });
      setFormError('');
    }
  }, [open]);

  function handleCreate() {
    const error = validateUserCreate(form, users);
    if (error) {
      setFormError(error);
      return;
    }
    const newUser: User = {
      id: `u-${Date.now()}`,
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      centerId: form.role === 'admin' ? null : form.centerId,
      status: 'activo',
      password: form.password!,
    };
    onCreate(newUser, form.password!);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Nuevo usuario">
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
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">{'Contraseña'}</label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
          <p className="text-xs text-lafa-text-secondary mt-1">{'Mínimo 6 caracteres'}</p>
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
            onClick={onClose}
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
    </Modal>
  );
}
