import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppState } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import { ConfirmDialogProvider } from './components/ui/ConfirmDialog';
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

function AppRoutes() {
  return (
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
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/app">
      <AppProvider>
        <ToastProvider>
          <ConfirmDialogProvider>
            <AppRoutes />
          </ConfirmDialogProvider>
        </ToastProvider>
      </AppProvider>
    </BrowserRouter>
  );
}
