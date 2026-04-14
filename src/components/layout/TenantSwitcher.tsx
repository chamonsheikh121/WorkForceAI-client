import { useState } from 'react';
import { useAuth, User } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Building2, Users, Shield, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Demo tenant data
const allTenants = [
  {
    id: 'platform',
    name: 'WorkForceAI Platform',
    type: 'Platform',
    icon: Shield,
    users: ['Platform Admin'],
  },
  {
    id: 'company',
    name: 'Tech Solutions Inc',
    type: 'Company',
    icon: Building2,
    users: ['Admin User', 'John Employee'],
  },
];

export default function TenantSwitcher() {
  const { user, logout, switchTenant } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const currentTenant = allTenants.find((t) => t.id === user.tenantId);
  const tenantOptions = currentTenant?.id === 'platform'
    ? allTenants.filter((t) => t.id !== 'platform')
    : allTenants.filter((t) => t.id !== user.tenantId);

  const handleSwitchTenant = (tenantId: string) => {
    switchTenant(tenantId);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-3 px-3 py-1.5 rounded-lg hover:bg-secondary/60 transition-colors max-w-xs">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-xs font-semibold text-primary-foreground flex-shrink-0">
            {user.avatar}
          </div>
          <div className="text-left hidden md:block min-w-0">
            <div className="text-sm font-medium text-foreground truncate">{user.name}</div>
            <div className="text-xs text-muted-foreground truncate">{currentTenant?.name}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-sm font-bold text-primary-foreground">
              {user.avatar}
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Current Tenant */}
        <div className="px-2 py-2">
          <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
            CURRENT {user.role === 'platform_owner' ? 'PLATFORM' : 'ORGANIZATION'}
          </div>
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {currentTenant?.icon && <currentTenant.icon className="w-4 h-4 text-primary" />}
              </div>
              <div>
                <div className="font-medium text-sm">{currentTenant?.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Role: <span className="font-medium capitalize">{user.role.replace('_', ' ')}</span>
                </div>
                {currentTenant?.users && (
                  <div className="text-xs text-muted-foreground mt-2">
                    Members: {currentTenant.users.length}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Switch Organization */}
        {tenantOptions.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-2">
              <div className="text-xs font-semibold text-muted-foreground mb-2 px-2">
                SWITCH ORGANIZATION
              </div>
              <div className="space-y-1">
                {tenantOptions.map((tenant) => (
                  <button
                    key={tenant.id}
                    onClick={() => handleSwitchTenant(tenant.id)}
                    className="w-full p-2 rounded-lg hover:bg-secondary/60 transition-colors text-left text-sm"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-1">
                        <tenant.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium truncate">{tenant.name}</div>
                        <div className="text-xs text-muted-foreground">{tenant.type}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="text-red-500 cursor-pointer">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
