import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Sparkles,
  Users,
  Database,
  Menu,
  X,
  Globe,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  to: string;
  icon: React.ReactNode;
  label: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { to: '/', icon: <LayoutDashboard size={18} />, label: 'Overview' },
  { to: '/explorer', icon: <Building2 size={18} />, label: 'GCC Explorer' },
  { to: '/compare', icon: <MapPin size={18} />, label: 'City Comparison' },
  { to: '/assistant', icon: <Sparkles size={18} />, label: 'Setup Assistant' },
  { to: '/providers', icon: <Users size={18} />, label: 'Service Providers' },
  { to: '/methodology', icon: <Database size={18} />, label: 'Data Sources' },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-navy-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <Globe size={18} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-base leading-tight tracking-tight">GCC Atlas</div>
            <div className="text-navy-300 text-xs leading-tight">India Intelligence Platform</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="text-navy-400 text-[10px] font-semibold uppercase tracking-widest px-2 pb-2">Navigation</div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all group relative
              ${isActive
                ? 'bg-navy-700 text-white'
                : 'text-navy-200 hover:bg-navy-800 hover:text-white'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-teal-400 rounded-r" />
                )}
                <span className={isActive ? 'text-teal-400' : 'text-navy-400 group-hover:text-navy-200'}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded px-1.5 py-0.5">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-navy-800">
        <div className="text-navy-500 text-xs space-y-1">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
            <span>Data current as of Jan 2024</span>
          </div>
          <div>25 GCCs · 5 Cities · 18 Providers</div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-56 flex-shrink-0 bg-navy-900 fixed inset-y-0 left-0 z-30 border-r border-navy-800">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-navy-900 border-r border-navy-800 transform transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="absolute right-3 top-4">
          <button
            onClick={onClose}
            className="p-1.5 rounded text-navy-400 hover:text-white hover:bg-navy-800 transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        <SidebarContent onClose={onClose} />
      </aside>
    </>
  );
}

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const location = useLocation();
  const current = navItems.find(n => n.to === location.pathname) ??
    navItems.find(n => location.pathname.startsWith(n.to) && n.to !== '/');

  return (
    <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-slate-200 flex items-center gap-3 px-4 py-3">
      <button
        onClick={onMenuClick}
        className="p-1.5 rounded-md text-slate-600 hover:bg-slate-100 transition-colors"
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-1.5 text-slate-600 text-sm">
        <Globe size={14} className="text-teal-500" />
        <span className="font-semibold text-navy-900">GCC Atlas</span>
        {current && (
          <>
            <ChevronRight size={14} />
            <span>{current.label}</span>
          </>
        )}
      </div>
    </header>
  );
}
