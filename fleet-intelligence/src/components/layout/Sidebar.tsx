import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Upload,
  Receipt,
  Users,
  Car,
  UserCog,
  LogOut,
  X,
} from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import LafaLogo from '@/components/ui/LafaLogo';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
  { to: '/shifts', label: 'Gestión de Turnos', icon: Clock, adminOnly: false },
  { to: '/csv-upload', label: 'Carga CSV', icon: Upload, adminOnly: true },
  { to: '/payroll', label: 'Nómina', icon: Receipt, adminOnly: false },
  { to: '/drivers', label: 'Conductores', icon: Users, adminOnly: false },
  { to: '/vehicles', label: 'Vehículos', icon: Car, adminOnly: false },
  { to: '/users', label: 'Usuarios', icon: UserCog, adminOnly: true },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const { session } = useAppState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAdmin = session?.role === 'admin';
  const visibleItems = NAV_ITEMS.filter(item => !item.adminOnly || isAdmin);
  const initials = session?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '';

  function handleLogout() {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    localStorage.removeItem('lafa_session');
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  }

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-lafa-sidebar border-r border-lafa-border flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LafaLogo className="h-5 w-auto" />
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded hover:bg-lafa-border transition-colors">
            <X size={18} className="text-lafa-text-secondary" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          {visibleItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-lafa-accent/10 text-lafa-accent'
                    : 'text-lafa-text-secondary hover:text-lafa-text-primary hover:bg-lafa-border/30'
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-lafa-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-lafa-accent/20 flex items-center justify-center text-sm font-semibold text-lafa-accent">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-lafa-text-primary truncate">{session?.name}</p>
              <StatusBadge status={session?.role ?? 'admin'} />
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-lafa-text-secondary hover:text-red-400 transition-colors w-full"
          >
            <LogOut size={16} />
            <span>{'Cerrar sesión'}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
