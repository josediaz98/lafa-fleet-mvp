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

import LafaLogo from '@/components/ui/LafaLogo';
import { useAppState, useAppDispatch } from '@/app/providers/AppProvider';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { MOCK_CENTERS } from '@/data/mock-data';
import { getCenterName } from '@/lib/mappers';

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  adminOnly: boolean;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Operaciones',
    items: [
      { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
      { to: '/shifts', label: 'Gestión de Turnos', icon: Clock, adminOnly: false },
    ],
  },
  {
    label: 'Flota',
    items: [
      { to: '/drivers', label: 'Conductores', icon: Users, adminOnly: false },
      { to: '/vehicles', label: 'Vehículos', icon: Car, adminOnly: false },
    ],
  },
  {
    label: 'Nómina',
    items: [
      { to: '/payroll', label: 'Nómina', icon: Receipt, adminOnly: false },
      { to: '/csv-upload', label: 'Carga CSV', icon: Upload, adminOnly: true },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { to: '/users', label: 'Usuarios', icon: UserCog, adminOnly: true },
    ],
  },
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
  const visibleGroups = NAV_GROUPS
    .map(group => ({
      ...group,
      items: group.items.filter(item => !item.adminOnly || isAdmin),
    }))
    .filter(group => group.items.length > 0);
  const initials = session?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '';
  const centerName = session?.centerId
    ? getCenterName(session.centerId)
      ?? MOCK_CENTERS.find(c => c.id === session.centerId)?.name
      ?? '—'
    : null;

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
          <button onClick={onClose} aria-label="Cerrar menu" className="lg:hidden p-1 rounded hover:bg-lafa-border transition-colors duration-150">
            <X size={18} className="text-lafa-text-secondary" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2" role="navigation" aria-label="Navegacion principal">
          {visibleGroups.map((group, idx) => (
            <div key={group.label} className={idx > 0 ? 'mt-5' : ''}>
              <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-lafa-text-secondary/60">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2.5 rounded text-sm font-medium transition-colors duration-150 ${
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
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-lafa-border">
          <div className="group flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-lafa-border/30 transition-colors duration-150 cursor-default">
            {/* Avatar — small & muted */}
            <div className="w-6 h-6 rounded-full bg-lafa-accent/10 flex items-center justify-center text-[10px] font-semibold text-lafa-accent shrink-0">
              {initials}
            </div>

            {/* Name + role */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-lafa-text-primary truncate">
                {session?.name}
              </p>
              <p className="text-xs text-lafa-text-secondary truncate mt-0.5">
                {session?.role === 'admin' ? 'Admin' : 'Supervisor'}
                {centerName && <> · {centerName}</>}
              </p>
            </div>

            {/* Logout — hidden until group hover */}
            <button
              onClick={handleLogout}
              aria-label="Cerrar sesion"
              className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/10 text-lafa-text-secondary hover:text-red-400 transition-all duration-150 shrink-0"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
