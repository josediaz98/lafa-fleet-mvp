import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  AppProvider,
  useAppState,
  useAppDispatch,
} from '@/app/providers/AppProvider';
import { ToastProvider } from '@/app/providers/ToastProvider';
import { ConfirmDialogProvider } from '@/components/ui/ConfirmDialog';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';
import AppLayout from '@/components/layout/AppLayout';
import LoginPage from '@/features/auth/LoginPage';
import ForgotPasswordPage from '@/features/auth/ForgotPasswordPage';
import ResetPasswordPage from '@/features/auth/ResetPasswordPage';
import AcceptInvitePage from '@/features/auth/AcceptInvitePage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import ShiftsPage from '@/features/shift/ShiftsPage';
import CsvUploadPage from '@/features/csv-upload/CsvUploadPage';
import PayrollPage from '@/features/payroll/PayrollPage';
import DriversPage from '@/features/driver/DriversPage';
import VehiclesPage from '@/features/vehicle/VehiclesPage';
import UsersPage from '@/features/user/UsersPage';

function RequireAuth({ children }: { children: React.ReactNode }) {
  const { session, authChecked } = useAppState();
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-lafa-bg flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-lafa-accent" />
      </div>
    );
  }
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

    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        supabase!
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single()
          .then(
            ({ data: profile }) => {
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
              dispatch({ type: 'AUTH_CHECKED' });
            },
            () => {
              dispatch({ type: 'AUTH_CHECKED' });
            },
          );
      } else {
        dispatch({ type: 'AUTH_CHECKED' });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/accept-invite" element={<AcceptInvitePage />} />
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/shifts" element={<ShiftsPage />} />
          <Route
            path="/csv-upload"
            element={
              <RequireAdmin>
                <CsvUploadPage />
              </RequireAdmin>
            }
          />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/drivers" element={<DriversPage />} />
          <Route path="/vehicles" element={<VehiclesPage />} />
          <Route
            path="/users"
            element={
              <RequireAdmin>
                <UsersPage />
              </RequireAdmin>
            }
          />
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
