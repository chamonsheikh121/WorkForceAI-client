import { useState } from 'react';
import { Zap, Settings, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const integrations = [
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    description: 'Process payments and manage billing',
    category: 'Payments',
    connected: true,
    lastConnected: '1 hour ago',
    features: ['Subscriptions', 'Invoices', 'Webhooks'],
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    description: 'Access GitHub repositories and manage deployments',
    category: 'Development',
    connected: false,
    features: ['Repositories', 'CI/CD', 'Webhooks'],
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    description: 'Send notifications and alerts to Slack',
    category: 'Communication',
    connected: true,
    lastConnected: '2 hours ago',
    features: ['Notifications', 'Alerts', 'Commands'],
  },
  {
    id: 'twilio',
    name: 'Twilio',
    icon: '📱',
    description: 'Send SMS and voice notifications',
    category: 'Communication',
    connected: false,
    features: ['SMS', 'Voice', 'Webhooks'],
  },
  {
    id: 'aws',
    name: 'AWS',
    icon: '☁️',
    description: 'Cloud infrastructure and storage',
    category: 'Infrastructure',
    connected: true,
    lastConnected: '30 minutes ago',
    features: ['S3', 'Lambda', 'RDS'],
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    icon: '📧',
    description: 'Email marketing and campaigns',
    category: 'Marketing',
    connected: false,
    features: ['Campaigns', 'Automation', 'Analytics'],
  },
];

export default function PlatformIntegrations() {
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [connectedIntegrations, setConnectedIntegrations] = useState(
    new Set(integrations.filter(i => i.connected).map(i => i.id))
  );

  const toggleConnection = (id: string) => {
    const newConnected = new Set(connectedIntegrations);
    if (newConnected.has(id)) {
      newConnected.delete(id);
    } else {
      newConnected.add(id);
    }
    setConnectedIntegrations(newConnected);
  };

  const categories = Array.from(new Set(integrations.map(i => i.category)));
  const connectedCount = connectedIntegrations.size;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Zap className="w-8 h-8" />
          Integrations
        </h1>
        <p className="text-muted-foreground mt-2">
          Connect external services and tools to enhance your platform
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Connected Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{connectedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">out of {integrations.length} available</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Integrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{integrations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">expand your capabilities</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-xs text-muted-foreground mt-1">organized by type</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations by Category */}
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h2 className="text-xl font-semibold">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {integrations
              .filter(i => i.category === category)
              .map(integration => (
                <Card 
                  key={integration.id} 
                  className={`border-border/50 transition-all ${connectedIntegrations.has(integration.id) ? 'border-primary/20' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{integration.icon}</div>
                        <div>
                          <CardTitle className="text-base">{integration.name}</CardTitle>
                          <CardDescription className="text-xs">{integration.category}</CardDescription>
                        </div>
                      </div>
                      {connectedIntegrations.has(integration.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{integration.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map(feature => (
                        <Badge key={feature} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    {/* Status */}
                    {connectedIntegrations.has(integration.id) && integration.lastConnected && (
                      <p className="text-xs text-muted-foreground">
                        Connected {integration.lastConnected}
                      </p>
                    )}

                    {/* Action Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant={connectedIntegrations.has(integration.id) ? 'outline' : 'default'}
                          className="w-full"
                          onClick={() => setSelectedIntegration(integration.id)}
                        >
                          {connectedIntegrations.has(integration.id) ? 'Manage' : 'Connect'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <span className="text-2xl">{integration.icon}</span>
                            {connectedIntegrations.has(integration.id) ? 'Manage' : 'Connect'} {integration.name}
                          </DialogTitle>
                          <DialogDescription>
                            {integration.description}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <h3 className="font-semibold text-sm">Features</h3>
                            <ul className="space-y-1">
                              {integration.features.map(feature => (
                                <li key={feature} className="flex items-center gap-2 text-sm">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {connectedIntegrations.has(integration.id) ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                              <p className="text-sm text-green-700">✓ Connected and active</p>
                            </div>
                          ) : (
                            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                              <p className="text-sm text-amber-700">Not connected</p>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant={connectedIntegrations.has(integration.id) ? 'destructive' : 'default'}
                            className="flex-1"
                            onClick={() => {
                              toggleConnection(integration.id);
                              setSelectedIntegration(null);
                            }}
                          >
                            {connectedIntegrations.has(integration.id) ? 'Disconnect' : 'Connect'}
                          </Button>
                          <Button variant="outline" asChild>
                            <a href="#" className="flex items-center gap-2">
                              Docs
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
