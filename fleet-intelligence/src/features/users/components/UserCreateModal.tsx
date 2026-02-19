import { useState, useEffect } from 'react';
import { Mail, AlertTriangle } from 'lucide-react';
import type { User } from '@/types';
import { CENTERS } from '@/data/constants';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { validateUserCreate, type UserFormData } from '@/lib/validators';
import Modal from '@/components/ui/Modal';
import Select from '@/components/ui/Select';

interface UserCreateModalProps {
  open: boolean;
  onClose: () => void;
  users: Array<{ id: string; email: string; role: string; status: string; centerId: string | null }>;
  onCreate: (user: User) => void;
}

const emptyForm: UserFormData = {
  name: '',
  email: '',
  role: 'supervisor',
  centerId: '',
};

export default function UserCreateModal({ open, onClose, users, onCreate }: UserCreateModalProps) {
  const [form, setForm] = useState<UserFormData>({ ...emptyForm, centerId: CENTERS[0]?.id ?? '' });
  const [formError, setFormError] = useState('');
  const supabaseMode = isSupabaseConfigured;

  useEffect(() => {
    if (open) {
      setForm({ ...emptyForm, centerId: CENTERS[0]?.id ?? '' });
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
      id: crypto.randomUUID(),
      name: form.name.trim(),
      email: form.email.trim(),
      role: form.role,
      centerId: form.role === 'admin' ? null : form.centerId,
      status: 'invitado',
    };
    onCreate(newUser);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={supabaseMode ? 'Invitar usuario' : 'Nuevo usuario'}>
      <div className="space-y-4">
        {supabaseMode ? (
          <div className="flex items-start gap-2.5 p-3 bg-lafa-accent/5 border border-lafa-accent/20 rounded-lg">
            <Mail className="w-4 h-4 text-lafa-accent mt-0.5 shrink-0" />
            <p className="text-xs text-lafa-text-secondary leading-relaxed">
              Se enviará un correo de invitación para que el usuario configure su contraseña.
            </p>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 p-3 bg-status-danger/5 border border-status-danger/20 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-status-danger mt-0.5 shrink-0" />
            <p className="text-xs text-status-danger leading-relaxed">
              La conexión con Supabase no está configurada. No se pueden crear usuarios en modo demo.
            </p>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Nombre</label>
          <input
            value={form.name}
            onChange={e => { setForm({ ...form, name: e.target.value }); setFormError(''); }}
            className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => { setForm({ ...form, email: e.target.value }); setFormError(''); }}
            className={`w-full px-3 py-2.5 bg-lafa-bg border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent ${
              formError.toLowerCase().includes('email') ? 'border-status-danger' : 'border-lafa-border'
            }`}
          />
          <p className="text-xs text-lafa-text-secondary mt-1">Email corporativo del usuario</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Rol</label>
          <Select
            value={form.role}
            onChange={e => { setForm({ ...form, role: e.target.value as 'admin' | 'supervisor' }); setFormError(''); }}
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
              onChange={e => { setForm({ ...form, centerId: e.target.value }); setFormError(''); }}
              className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary focus:outline-none focus:border-lafa-accent"
            >
              {CENTERS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Select>
          </div>
        )}
        {formError && <p className="text-sm text-status-danger">{formError}</p>}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-lafa-text-secondary border border-lafa-border rounded hover:bg-lafa-border/30 transition-colors duration-150"
          >
            Cancelar
          </button>
          <button
            onClick={handleCreate}
            disabled={!supabaseMode}
            className="px-4 py-2 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {supabaseMode ? 'Enviar invitación' : 'Crear usuario'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
