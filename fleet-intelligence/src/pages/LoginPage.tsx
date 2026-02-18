import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState, useAppDispatch } from '../context/AppContext';
import { useToast } from '../context/ToastContext';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import LafaLogo from '../components/ui/LafaLogo';

export default function LoginPage() {
  const { users } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@lafa.mx');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        // Supabase auth flow
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (authError || !authData.user) {
          setError(authError?.message ?? 'Credenciales incorrectas.');
          setLoading(false);
          return;
        }

        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authData.user.id)
          .single();

        if (!profile) {
          setError('Perfil no encontrado. Contacta a un administrador.');
          setLoading(false);
          return;
        }

        if (profile.status !== 'activo') {
          setError('Tu cuenta est\u00e1 desactivada. Contacta a un administrador.');
          await supabase.auth.signOut();
          setLoading(false);
          return;
        }

        const session = {
          userId: profile.id,
          name: profile.name,
          role: profile.role,
          centerId: profile.center_id,
        };

        localStorage.setItem('lafa_session', JSON.stringify(session));
        dispatch({ type: 'LOGIN', payload: session });
        showToast('success', `Bienvenido, ${profile.name}`);
        navigate('/dashboard');
      } else {
        // Mock auth fallback (no Supabase configured)
        const user = users.find(
          u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
        );

        if (!user) {
          setError('Credenciales incorrectas.');
          setLoading(false);
          return;
        }

        if (user.status !== 'activo') {
          setError('Tu cuenta est\u00e1 desactivada. Contacta a un administrador.');
          setLoading(false);
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
    } catch (err) {
      setError('Error de conexi\u00f3n. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
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
            placeholder="Contrase\u00f1a"
            className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:bg-lafa-surface transition-colors"
          />
          {error && <p className="text-sm text-status-danger">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-lafa-accent hover:bg-lafa-accent-hover text-white font-semibold rounded-lg text-sm transition-colors disabled:opacity-50"
          >
            {loading ? 'Iniciando...' : 'Iniciar sesi\u00f3n'}
          </button>
        </form>
      </div>
    </div>
  );
}
