import { useState } from 'react';
import { Search, Bell, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import TenantSwitcher from './TenantSwitcher';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const mockNotifications = [
  {
    id: 1,
    title: 'New Company Signup',
    message: 'Tech Innovations Inc has signed up',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: 2,
    title: 'Payment Received',
    message: 'Payment of $1,500 received from Acme Corp',
    time: '1 hour ago',
    read: false,
  },
  {
    id: 3,
    title: 'System Update',
    message: 'Platform maintenance completed successfully',
    time: '3 hours ago',
    read: true,
  },
  {
    id: 4,
    title: 'Trial Expiring',
    message: 'StartUp Labs trial will expire in 5 days',
    time: '1 day ago',
    read: true,
  },
];

export default function TopNav() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const { theme, toggleTheme } = useTheme();
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full h-10 pl-10 pr-4 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-secondary/60 transition-colors"
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-muted-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-muted-foreground" />
          )}
        </button>

        {/* Notifications Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-secondary/60 transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-96">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-primary hover:underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border transition-colors ${
                        notification.read
                          ? 'bg-background border-border/50'
                          : 'bg-primary/5 border-primary/30'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{notification.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">{notification.message}</div>
                          <div className="text-xs text-muted-foreground mt-2">{notification.time}</div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Tenant Switcher */}
        <TenantSwitcher />
      </div>
    </header>
  );
}
