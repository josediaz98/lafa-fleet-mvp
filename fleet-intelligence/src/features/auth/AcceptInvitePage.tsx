import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import LafaLogo from '@/components/ui/LafaLogo';
import { supabase } from '@/lib/supabase/client';
import { useAppDispatch } from '@/app/providers/AppProvider';
import { useToast } from '@/app/providers/ToastProvider';
import { fetchAllData } from '@/lib/supabase/queries';
import type { UserRole } from '@/types';

export default function AcceptInvitePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showToast } = useToast();
  const [ready, setReady] = useState(false);
  const [userName, setUserName] = useState('');
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

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && session?.user) {
        handled = true;
        try {
          const { data: profile } = await supabase!.from('profiles')
            .select('name, status')
            .eq('id', session.user.id)
            .single();

          if (profile?.status === 'invitado') {
            setUserName(profile.name);
            setReady(true);
          } else {
            navigate('/dashboard', { replace: true });
          }
        } catch {
          setExpired(true);
        }
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

    // Set password
    const { error: updateError } = await supabase!.auth.updateUser({ password });
    if (updateError) {
      setLoading(false);
      setError(updateError.message);
      return;
    }

    // Activate profile (uses RLS self-activate policy)
    const { data: { user } } = await supabase!.auth.getUser();
    if (user) {
      const { error: activateError } = await supabase!.from('profiles')
        .update({ status: 'activo' })
        .eq('id', user.id);

      if (activateError) {
        setLoading(false);
        setError('No se pudo activar la cuenta. Contacta a un administrador.');
        return;
      }
    }

    setLoading(false);
    setDone(true);

    const { data: profile } = await supabase!.from('profiles')
      .select('*').eq('id', user!.id).single();
    if (profile) {
      const session = {
        userId: profile.id, name: profile.name,
        role: profile.role as UserRole, centerId: profile.center_id,
      };
      localStorage.setItem('lafa_session', JSON.stringify(session));
      dispatch({ type: 'LOGIN', payload: session });
      const data = await fetchAllData();
      dispatch({ type: 'HYDRATE', payload: { ...data, dataSource: 'supabase' as const } });
      showToast('success', `Bienvenido, ${profile.name}`);
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
                El enlace de invitación ha expirado o ya fue utilizado.
                Solicita una nueva invitación a tu administrador.
              </p>
              <Link
                to="/login"
                className="inline-block mt-2 px-6 py-2.5 bg-lafa-accent hover:bg-lafa-accent-hover text-white font-semibold rounded-lg text-sm transition-all duration-200"
              >
                Ir al inicio de sesión
              </Link>
            </div>
          ) : (
            <>
              <Loader2 className="w-6 h-6 animate-spin text-lafa-accent mx-auto mb-4" />
              <p className="text-sm text-lafa-text-secondary">Verificando invitación...</p>
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
              Cuenta activada
            </h1>
            <p className="text-sm text-lafa-text-secondary">
              Redirigiendo al dashboard...
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-lafa-text-primary">
                Bienvenido, {userName}
              </h1>
              <p className="text-sm text-lafa-text-secondary mt-1">
                Configura tu contraseña para acceder al portal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  placeholder="Contraseña"
                  className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:ring-1 focus:ring-lafa-accent/30 focus:bg-lafa-surface transition-all duration-200"
                />
                <p className="text-xs text-lafa-text-secondary mt-1">Minimo 6 caracteres</p>
              </div>
              <input
                type="password"
                required
                value={confirm}
                onChange={e => { setConfirm(e.target.value); setError(''); }}
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
                    Activando cuenta...
                  </>
                ) : (
                  'Activar cuenta'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
