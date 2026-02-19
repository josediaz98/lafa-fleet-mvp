import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-lafa-bg flex items-center justify-center p-6">
          <div className="bg-lafa-surface border border-lafa-border rounded-xl p-8 max-w-md w-full text-center">
            <div className="w-14 h-14 rounded-full bg-status-danger/15 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={28} className="text-status-danger" />
            </div>
            <h2 className="text-lg font-semibold text-lafa-text-primary mb-2">
              Algo sali&oacute; mal
            </h2>
            <p className="text-sm text-lafa-text-secondary mb-6">
              {this.state.error?.message || 'Ocurrió un error inesperado.'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 text-sm font-medium text-white bg-lafa-accent hover:bg-lafa-accent-hover rounded transition-colors duration-150"
            >
              Recargar
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
