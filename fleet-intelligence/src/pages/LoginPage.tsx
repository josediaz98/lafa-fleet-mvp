import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import LafaLogo from '../components/ui/LafaLogo';

/** Demo-only hash — NOT cryptographic. Prevents plain-text storage for new users. */
function simpleHash(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return '#' + Math.abs(h).toString(36);
}

export default function LoginPage() {
  const { users } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@lafa.mx');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const hashed = simpleHash(password);
    const user = users.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() &&
        (u.password === password || u.password === hashed)
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
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-lafa-accent" />
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-10">
          <LafaLogo className="h-10 w-auto" />
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:bg-lafa-surface transition-colors"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:bg-lafa-surface transition-colors"
          />
          {error && <p className="text-sm text-status-danger">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 mt-2 bg-lafa-accent hover:bg-lafa-accent-hover text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
