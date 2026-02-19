import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import LafaLogo from '@/components/ui/LafaLogo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  }

  return (
    <div className="min-h-screen bg-lafa-bg flex items-center justify-center p-4">
      <div className="fixed top-0 left-0 right-0 h-0.5 bg-lafa-accent" />
      <div className="w-full max-w-sm animate-fade-in">
        <div className="flex justify-center mb-10">
          <LafaLogo className="h-10 w-auto" />
        </div>

        {sent ? (
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              <div className="w-12 h-12 rounded-full bg-lafa-accent/10 flex items-center justify-center">
                <Mail className="w-6 h-6 text-lafa-accent" />
              </div>
            </div>
            <h1 className="text-lg font-semibold text-lafa-text-primary">
              Revisa tu correo
            </h1>
            <p className="text-sm text-lafa-text-secondary leading-relaxed">
              Si tu cuenta existe, recibirás un enlace para restablecer tu contraseña.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-sm text-lafa-accent hover:text-lafa-accent-hover transition-colors mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver a iniciar sesión
            </Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <h1 className="text-lg font-semibold text-lafa-text-primary">
                Restablecer contraseña
              </h1>
              <p className="text-sm text-lafa-text-secondary mt-1">
                Ingresa tu correo para recibir un enlace
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full px-4 py-3 bg-lafa-surface/50 border border-lafa-border/50 rounded-lg text-sm text-lafa-text-primary placeholder-lafa-text-secondary/50 focus:outline-none focus:border-lafa-accent/70 focus:ring-1 focus:ring-lafa-accent/30 focus:bg-lafa-surface transition-all duration-200"
              />
              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 bg-lafa-accent hover:bg-lafa-accent-hover active:scale-[0.98] text-white font-semibold rounded-lg text-sm transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar enlace'
                )}
              </button>
            </form>

            <div className="mt-4 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-sm text-lafa-text-secondary hover:text-lafa-text-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Volver a iniciar sesión
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
