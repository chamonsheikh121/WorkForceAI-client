import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Zap, LogOut
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRoleBasedNavigation } from '@/hooks/useRoleBasedNavigation';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const navItems = useRoleBasedNavigation(user?.role);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-[240px]'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 h-16 border-b border-sidebar-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center neon-glow">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
        {!collapsed && <span className="font-bold text-lg tracking-tight text-foreground">WorkForce<span className="text-primary">AI</span></span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto scrollbar-thin">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={active ? 'sidebar-item-active w-full' : 'sidebar-item w-full'}
              title={collapsed ? item.label : item.description}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-2 space-y-1">
        <button
          onClick={handleLogout}
          className="sidebar-item w-full text-red-500 hover:text-red-600 hover:bg-red-500/10"
          title={collapsed ? 'Logout' : 'Logout'}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="sidebar-item w-full justify-center"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
