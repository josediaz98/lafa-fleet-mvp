import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ExternalLink } from 'lucide-react';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { useToast } from '@/app/providers/ToastProvider';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { fetchAllData } from '@/lib/supabase/queries';
import LafaLogo from '@/components/ui/LafaLogo';

export default function LoginPage() {
  const { users } = useAppState();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState(
    import.meta.env.DEV ? 'admin@lafa-mx.com' : '',
  );
  const [password, setPassword] = useState(
    import.meta.env.DEV ? 'admin123' : '',
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSupabaseConfigured && supabase) {
        const { data: authData, error: authError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });

        if (authError || !authData.user) {
          const msg =
            authError?.message === 'Invalid login credentials'
              ? 'Correo o contraseña incorrectos.'
              : 'Credenciales incorrectas.';
          setError(msg);
          setLoading(false);
          return;
        }

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
          setError('Tu cuenta está desactivada. Contacta a un administrador.');
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

        try {
          const data = await fetchAllData();
          dispatch({
            type: 'HYDRATE',
            payload: { ...data, dataSource: 'supabase' as const },
          });
        } catch (err) {
          console.error('Failed to hydrate after login:', err);
        }

        showToast('success', `Bienvenido, ${profile.name}`);
        navigate('/dashboard');
      } else {
        const user = users.find(
          (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password,
        );

        if (!user) {
          setError('Credenciales incorrectas.');
          setLoading(false);
          return;
        }

        if (user.status !== 'activo') {
          setError('Tu cuenta está desactivada. Contacta a un administrador.');
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
      setError('Error de conexión. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-lafa-bg flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-lafa-accent" />
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-8">
          <LafaLogo className="h-10 w-auto" />
        </div>

        <div className="text-center mb-5">
          <h1 className="text-lg font-semibold text-lafa-text-primary">
            Bienvenido
          </h1>
          <p className="text-sm text-lafa-text-secondary mt-1">
            Accede al portal de gestión de flotas y nóminas
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:ring-1 focus:ring-lafa-accent/30 focus:bg-lafa-surface transition-all duration-200"
          />
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 pr-11 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:ring-1 focus:ring-lafa-accent/30 focus:bg-lafa-surface transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-lafa-text-secondary/50 hover:text-lafa-text-secondary transition-colors duration-150"
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-xs text-lafa-text-secondary hover:text-lafa-accent transition-colors duration-150"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && (
            <p className="text-sm text-status-danger animate-fade-in">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-lafa-accent hover:bg-lafa-accent-hover active:scale-[0.98] text-white font-semibold rounded-lg text-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Iniciando...
              </>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-lafa-text-secondary/70">
          ¿No tienes cuenta?{' '}
          <span className="text-lafa-text-secondary">
            Contacta a tu administrador.
          </span>
        </p>

        <div className="mt-5 text-center">
          <a
            href="https://lafa-production.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-lafa-text-secondary/50 hover:text-lafa-text-secondary transition-colors duration-150"
          >
            Conoce LAFA
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
