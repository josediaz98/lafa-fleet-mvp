import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import LafaLogo from '@/components/ui/LafaLogo';
import { supabase } from '@/lib/supabase/client';
import { useAppDispatch } from '@/app/providers/AppProvider';
import { useToast } from '@/app/providers/ToastProvider';
import { fetchAllData } from '@/lib/supabase/queries';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    if (!supabase) {
      navigate('/login', { replace: true });
      return;
    }

    let handled = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        handled = true;
        setReady(true);
      }
    });

    const timer = setTimeout(() => {
      if (!handled) setExpired(true);
    }, 8000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase!.auth.updateUser({
      password,
    });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    const {
      data: { user },
    } = await supabase!.auth.getUser();
    if (user) {
      const { data: profile } = await supabase!
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      if (profile && profile.status === 'activo') {
        const session = {
          userId: profile.id,
          name: profile.name,
          role: profile.role,
          centerId: profile.center_id,
        };
        localStorage.setItem('lafa_session', JSON.stringify(session));
        dispatch({ type: 'LOGIN', payload: session });
        const data = await fetchAllData();
        dispatch({
          type: 'HYDRATE',
          payload: { ...data, dataSource: 'supabase' as const },
        });
        showToast('success', 'Contraseña actualizada');
      }
    }
    setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
  }

  if (!ready && !done) {
    return (
      <div className="min-h-screen bg-lafa-bg flex items-center justify-center p-4">
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-lafa-accent" />
        <div className="w-full max-w-sm animate-fade-in text-center">
          <div className="flex justify-center mb-10">
            <LafaLogo className="h-10 w-auto" />
          </div>
          {expired ? (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-status-danger/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-status-danger" />
                </div>
              </div>
              <h1 className="text-lg font-semibold text-lafa-text-primary">
                Enlace no válido
              </h1>
              <p className="text-sm text-lafa-text-secondary">
                El enlace de recuperación ha expirado o ya fue utilizado.
                Solicita un nuevo enlace.
              </p>
              <Link
                to="/forgot-password"
                className="inline-block mt-2 px-6 py-2.5 bg-lafa-accent hover:bg-lafa-accent-hover text-white font-semibold rounded-lg text-sm transition-all duration-200"
              >
                Solicitar nuevo enlace
              </Link>
            </div>
          ) : (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-lafa-accent mx-auto mb-4" />
              <p className="text-sm text-lafa-text-secondary">
                Verificando enlace...
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lafa-bg flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-lafa-accent" />
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-10">
          <LafaLogo className="h-10 w-auto" />
        </div>

        {done ? (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-status-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-status-success" />
              </div>
            </div>
            <h1 className="text-lg font-semibold text-lafa-text-primary">
              Contraseña actualizada
            </h1>
            <p className="text-sm text-lafa-text-secondary">
              Redirigiendo al dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-lafa-text-primary">
                Nueva contraseña
              </h1>
              <p className="text-sm text-lafa-text-secondary mt-1">
                Ingresa tu nueva contraseña
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Nueva contraseña"
                  className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:ring-1 focus:ring-lafa-accent/30 focus:bg-lafa-surface transition-all duration-200"
                />
                <p className="text-xs text-lafa-text-secondary mt-1">
                  Minimo 6 caracteres
                </p>
              </div>
              <input
                type="password"
                required
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setError('');
                }}
                placeholder="Confirmar contraseña"
                className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:ring-1 focus:ring-lafa-accent/30 focus:bg-lafa-surface transition-all duration-200"
              />
              {error && <p className="text-sm text-status-danger">{error}</p>}
              <button
                type="submit"
                disabled={loading || !password || !confirm}
                className="w-full py-3 bg-lafa-accent hover:bg-lafa-accent-hover active:scale-[0.98] text-white font-semibold rounded-lg text-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  'Guardar contraseña'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
