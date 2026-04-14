import { Building2, Shield, Link2, Bell, Globe, Key } from 'lucide-react';
import { useState } from 'react';

const settingsSections = [
  {
    icon: Building2,
    title: 'Company Profile',
    desc: 'Manage company name, logo, and basic information',
    items: [
      { label: 'Company Name', value: 'TechNova Inc.' },
      { label: 'Industry', value: 'Technology' },
      { label: 'Size', value: '500+ employees' },
      { label: 'Founded', value: '2019' },
    ],
  },
  {
    icon: Shield,
    title: 'Security',
    desc: 'Password policies, 2FA, and session management',
    items: [
      { label: 'Two-Factor Authentication', value: 'Enabled', toggle: true },
      { label: 'Password Policy', value: 'Strong (12+ chars)' },
      { label: 'Session Timeout', value: '30 minutes' },
      { label: 'IP Whitelisting', value: 'Disabled', toggle: true },
    ],
  },
  {
    icon: Link2,
    title: 'Integrations',
    desc: 'Connect with third-party services',
    integrations: [
      { name: 'Slack', status: 'Connected', icon: '💬' },
      { name: 'Google Workspace', status: 'Connected', icon: '📧' },
      { name: 'Zoom', status: 'Not connected', icon: '📹' },
      { name: 'Jira', status: 'Connected', icon: '📋' },
      { name: 'GitHub', status: 'Not connected', icon: '🐙' },
    ],
  },
];

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    digest: true,
    anomalyAlerts: false,
    employeeAlerts: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Settings</h1>
        <p className="page-subheader">Manage your platform configuration and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Company Profile */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center text-primary"><Building2 className="w-5 h-5" /></div>
            <div>
              <h3 className="text-sm font-semibold">Company Profile</h3>
              <p className="text-xs text-muted-foreground">Manage company information</p>
            </div>
          </div>
          <div className="space-y-3">
            {settingsSections[0].items!.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                <span className="text-sm font-medium">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center text-primary"><Shield className="w-5 h-5" /></div>
            <div>
              <h3 className="text-sm font-semibold">Security</h3>
              <p className="text-xs text-muted-foreground">Password policies and authentication</p>
            </div>
          </div>
          <div className="space-y-3">
            {settingsSections[1].items!.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-sm text-muted-foreground">{item.label}</span>
                {item.toggle !== undefined ? (
                  <button className={`w-10 h-5 rounded-full transition-colors ${item.value === 'Enabled' ? 'bg-primary' : 'bg-secondary'}`}>
                    <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${item.value === 'Enabled' ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                ) : (
                  <span className="text-sm font-medium">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center text-primary"><Link2 className="w-5 h-5" /></div>
            <div>
              <h3 className="text-sm font-semibold">Integrations</h3>
              <p className="text-xs text-muted-foreground">Third-party connections</p>
            </div>
          </div>
          <div className="space-y-3">
            {settingsSections[2].integrations!.map((int, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{int.icon}</span>
                  <span className="text-sm font-medium">{int.name}</span>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${int.status === 'Connected' ? 'badge-success' : 'badge-warning'}`}>
                  {int.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="glass-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center text-primary"><Bell className="w-5 h-5" /></div>
            <div>
              <h3 className="text-sm font-semibold">Notifications</h3>
              <p className="text-xs text-muted-foreground">Email and push notification preferences</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Email notifications</span>
              <button
                onClick={() => toggleNotification('email')}
                className={`w-10 h-5 rounded-full transition-colors ${notifications.email ? 'bg-primary' : 'bg-secondary'}`}
              >
                <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${notifications.email ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Push notifications</span>
              <button
                onClick={() => toggleNotification('push')}
                className={`w-10 h-5 rounded-full transition-colors ${notifications.push ? 'bg-primary' : 'bg-secondary'}`}
              >
                <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${notifications.push ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Weekly digest</span>
              <button
                onClick={() => toggleNotification('digest')}
                className={`w-10 h-5 rounded-full transition-colors ${notifications.digest ? 'bg-primary' : 'bg-secondary'}`}
              >
                <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${notifications.digest ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-border/50">
              <span className="text-sm text-muted-foreground">Alert on anomalies</span>
              <button
                onClick={() => toggleNotification('anomalyAlerts')}
                className={`w-10 h-5 rounded-full transition-colors ${notifications.anomalyAlerts ? 'bg-primary' : 'bg-secondary'}`}
              >
                <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${notifications.anomalyAlerts ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between py-2 last:border-0">
              <span className="text-sm text-muted-foreground">New employee alerts</span>
              <button
                onClick={() => toggleNotification('employeeAlerts')}
                className={`w-10 h-5 rounded-full transition-colors ${notifications.employeeAlerts ? 'bg-primary' : 'bg-secondary'}`}
              >
                <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${notifications.employeeAlerts ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
