import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const { users } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (!user) {
      setError('Credenciales incorrectas.');
      return;
    }

    if (user.status !== 'activo') {
      setError('Tu cuenta está desactivada. Contacta a un administrador.');
      return;
    }

    const session = {
      userId: user.id,
      name: user.name,
      role: user.role,
      centerId: user.centerId,
    };

    localStorage.setItem('lafa_session', JSON.stringify(session));
    dispatch({ type: 'LOGIN', payload: session });
    showToast('success', `Bienvenido, ${user.name}`);
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-lafa-bg flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-lafa-accent flex items-center justify-center mb-4">
            <Zap size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-lafa-accent tracking-tight">LAFA</h1>
          <p className="text-sm text-lafa-text-secondary mt-1">Fleet Intelligence</p>
        </div>

        <form onSubmit={handleLogin} className="bg-lafa-surface border border-lafa-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@lafa.mx"
              className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-lafa-text-secondary mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••"
              className="w-full px-3 py-2.5 bg-lafa-bg border border-lafa-border rounded text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent"
            />
          </div>
          {error && <p className="text-sm text-[#EF4444]">{error}</p>}
          <button
            type="submit"
            className="w-full py-2.5 bg-lafa-accent hover:bg-lafa-accent-hover text-white font-medium rounded text-sm transition-colors"
          >
            Iniciar sesión
          </button>
          <div className="text-center">
            <p className="text-xs text-lafa-text-secondary">
              Demo: admin@lafa.mx / admin123
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
