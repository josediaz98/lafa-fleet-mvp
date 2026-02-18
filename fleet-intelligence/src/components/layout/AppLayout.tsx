import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-lafa-bg">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-lafa-surface border-b border-lafa-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded hover:bg-lafa-border transition-colors">
          <Menu size={20} className="text-lafa-text-primary" />
        </button>
        <img src="/lafa-logo.svg" alt="LAFA" className="h-4 w-auto" />
      </div>
      <main className="lg:ml-64 p-4 pt-16 lg:p-8 lg:pt-8 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
