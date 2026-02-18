import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppState, useAppDispatch } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { ConfirmDialogProvider } from './components/ui/ConfirmDialog';
import ErrorBoundary from './components/ui/ErrorBoundary';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ShiftsPage from './pages/ShiftsPage';
import CsvUploadPage from './pages/CsvUploadPage';
import PayrollPage from './pages/PayrollPage';
import DriversPage from './pages/DriversPage';
import VehiclesPage from './pages/VehiclesPage';
import UsersPage from './pages/UsersPage';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session } = useAppState();
  if (!session) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { session } = useAppState();
  if (!session) return <Navigate to="/login" replace />;
  if (session.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AuthRestorer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Restore session from Supabase on mount
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        supabase!.from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()
          .then(({ data: profile }) => {
            if (profile && profile.status === 'activo') {
              const session = {
                userId: profile.id,
                name: profile.name,
                role: profile.role,
                centerId: profile.center_id,
              };
              localStorage.setItem('lafa_session', JSON.stringify(session));
              dispatch({ type: 'LOGIN', payload: session });
            }
          });
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        localStorage.removeItem('lafa_session');
        dispatch({ type: 'LOGOUT' });
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <AuthRestorer />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/shifts" element={<ShiftsPage />} />
          <Route path="/csv-upload" element={<RequireAdmin><CsvUploadPage /></RequireAdmin>} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route path="/users" element={<RequireAdmin><UsersPage /></RequireAdmin>} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <AppProvider>
        <ToastProvider>
          <ConfirmDialogProvider>
            <ErrorBoundary>
              <AppRoutes />
            </ErrorBoundary>
          </ConfirmDialogProvider>
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
