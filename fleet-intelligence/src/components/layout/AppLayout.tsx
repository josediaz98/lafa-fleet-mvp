import { useState, useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Menu, AlertTriangle, X } from 'lucide-react';
import { Skeleton, SkeletonKPICards, SkeletonTableRows } from '@/components/ui/Skeleton';
import Sidebar from './Sidebar';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { CenterFilterProvider } from '@/lib/use-center-filter';
import { useIdleLogout } from '@/lib/use-idle-logout';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dataSource, hydrated } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useIdleLogout(useCallback(() => {
    if (isSupabaseConfigured && supabase) supabase.auth.signOut();
    localStorage.removeItem('lafa_session');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }, [dispatch, navigate]));
  const [demoDismissed, setDemoDismissed] = useState(
    () => localStorage.getItem('lafa-demo-banner-dismissed') === 'true'
  );

  // Show skeleton layout while fetching data from Supabase
  if (!hydrated) {
    return (
      <div className="min-h-screen bg-lafa-bg">
        <Sidebar mobileOpen={false} onClose={() => {}} />
        <main className="lg:ml-64 p-4 pt-16 lg:p-8 lg:pt-8 min-h-screen">
          <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <SkeletonKPICards />
            <div className="bg-lafa-surface border border-lafa-border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-lafa-border">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <th key={i} className="py-3 px-4 text-left">
                        <Skeleton className="h-3 w-20" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <SkeletonTableRows />
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lafa-bg">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-lafa-surface border-b border-lafa-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} aria-label="Abrir menu" className="p-1.5 rounded hover:bg-lafa-border transition-colors duration-150">
          <Menu size={20} className="text-lafa-text-primary" />
        </button>
        <img src={`${import.meta.env.BASE_URL}lafa-logo.svg`} alt="LAFA" className="h-4 w-auto" />
      </div>
      <main className="lg:ml-64 p-4 pt-16 lg:p-8 lg:pt-8 min-h-screen">
        {dataSource === 'mock' && !demoDismissed && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-status-alert/30 bg-status-alert/[0.08] px-4 py-2.5 text-sm text-status-alert">
            <AlertTriangle size={16} className="shrink-0" />
            <span>Usando datos de demo. Los cambios no se guardan en base de datos.</span>
            <button
              onClick={() => { setDemoDismissed(true); localStorage.setItem('lafa-demo-banner-dismissed', 'true'); }}
              className="ml-auto shrink-0 p-0.5 rounded hover:bg-status-alert/15 transition-colors duration-150"
            >
              <X size={14} />
            </button>
          </div>
        )}
        <CenterFilterProvider>
          <Outlet />
        </CenterFilterProvider>
      </main>
    </div>
  );
}
