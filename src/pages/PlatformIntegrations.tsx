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
import { useState } from 'react';
import { Copy, Check, Trash2, Plus, Link as LinkIcon, Unlink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Integration {
  id: string;
  name: string;
  icon: string;
  description: string;
  connected: boolean;
  apiKey?: string;
  lastConnected?: string;
  webhooks: number;
}

interface WebhookLog {
  id: string;
  integration: string;
  endpoint: string;
  status: 'success' | 'failed';
  timestamp: string;
  responseTime: number;
}

const integrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    icon: '💬',
    description: 'Send notifications and alerts to Slack',
    connected: true,
    apiKey: 'xoxb-xxxxxxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxx',
    lastConnected: '2 hours ago',
    webhooks: 3,
  },
  {
    id: 'google',
    name: 'Google Workspace',
    icon: '🔍',
    description: 'Sync users and manage accounts via Google',
    connected: true,
    apiKey: 'gcp_xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    lastConnected: '30 minutes ago',
    webhooks: 2,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    icon: '💳',
    description: 'Process payments and manage billing',
    connected: true,
    lastConnected: '1 hour ago',
    webhooks: 5,
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    description: 'Access GitHub repositories and manage deployments',
    connected: false,
    webhooks: 0,
  },
];

const webhookLogs: WebhookLog[] = [
  {
    id: 'log_001',
    integration: 'Stripe',
    endpoint: '/webhooks/stripe',
    status: 'success',
    timestamp: '2 min ago',
    responseTime: 245,
  },
  {
    id: 'log_002',
    integration: 'Slack',
    endpoint: '/webhooks/slack',
    status: 'success',
    timestamp: '5 min ago',
    responseTime: 156,
  },
  {
    id: 'log_003',
    integration: 'Google Workspace',
    endpoint: '/webhooks/google',
    status: 'success',
    timestamp: '12 min ago',
    responseTime: 342,
  },
  {
    id: 'log_004',
    integration: 'Stripe',
    endpoint: '/webhooks/stripe',
    status: 'failed',
    timestamp: '28 min ago',
    responseTime: 523,
  },
];

export default function PlatformIntegrations() {
  const [allIntegrations, setAllIntegrations] = useState<Integration[]>(integrations);
  const [logs] = useState<WebhookLog[]>(webhookLogs);
  const [copied, setCopied] = useState<string | null>(null);
  const [connectDialog, setConnectDialog] = useState({ open: false, integration: null as Integration | null });

  const handleCopyApiKey = (apiKey: string, id: string) => {
    navigator.clipboard.writeText(apiKey);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleConnect = (integration: Integration) => {
    if (integration.connected) {
      setAllIntegrations(allIntegrations.map(i =>
        i.id === integration.id ? { ...i, connected: false, apiKey: undefined } : i
      ));
    } else {
      setConnectDialog({ open: true, integration });
    }
  };

  const handleConfirmConnect = () => {
    if (connectDialog.integration) {
      setAllIntegrations(allIntegrations.map(i =>
        i.id === connectDialog.integration!.id
          ? { ...i, connected: true, lastConnected: 'just now', webhooks: 1 }
          : i
      ));
      setConnectDialog({ open: false, integration: null });
    }
  };

  const successRate = logs.length > 0
    ? (logs.filter(l => l.status === 'success').length / logs.length * 100).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          Integrations
        </h1>
        <p className="text-muted-foreground mt-2">Connect and manage third-party services</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Connected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {allIntegrations.filter(i => i.connected).length}/{allIntegrations.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active integrations</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Webhooks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {allIntegrations.reduce((sum, i) => sum + i.webhooks, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active webhooks</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Webhook Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{successRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations Tabs */}
      <Tabs defaultValue="integrations" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="logs">Webhook Logs</TabsTrigger>
        </TabsList>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allIntegrations.map(integration => (
              <Card
                key={integration.id}
                className={`border-border/50 transition-all ${
                  integration.connected ? 'border-green-200/50 bg-green-50/5' : 'border-border/50'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{integration.icon}</span>
                      <div>
                        <CardTitle>{integration.name}</CardTitle>
                        <CardDescription className="text-xs mt-1">
                          {integration.description}
                        </CardDescription>
                      </div>
                    </div>
                    {integration.connected && (
                      <Badge className="bg-green-600/20 text-green-700 dark:text-green-400">
                        Connected
                      </Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {integration.connected && (
                    <>
                      {/* API Key Display */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground">API Key</label>
                        <div className="flex gap-2">
                          <div className="flex-1 p-2 bg-muted rounded font-mono text-xs text-muted-foreground truncate">
                            {integration.apiKey}
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCopyApiKey(integration.apiKey!, integration.id)}
                            className="gap-1"
                          >
                            {copied === integration.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                Copy
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Connection Info */}
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="p-2 bg-muted/50 rounded">
                          <p className="text-muted-foreground mb-1">Last Connected</p>
                          <p className="font-medium">{integration.lastConnected}</p>
                        </div>
                        <div className="p-2 bg-muted/50 rounded">
                          <p className="text-muted-foreground mb-1">Webhooks</p>
                          <p className="font-medium">{integration.webhooks} active</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Action Button */}
                  <Button
                    onClick={() => handleConnect(integration)}
                    className="w-full gap-2"
                    variant={integration.connected ? 'destructive' : 'default'}
                  >
                    {integration.connected ? (
                      <>
                        <Unlink className="w-4 h-4" />
                        Disconnect
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        Connect
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Webhook Logs Tab */}
        <TabsContent value="logs" className="space-y-4 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Webhook Activity</CardTitle>
              <CardDescription>Recent webhook calls and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          log.status === 'success' ? 'bg-green-600' : 'bg-red-600'
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">{log.integration}</p>
                        <p className="text-xs text-muted-foreground truncate">{log.endpoint}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-right">
                      <Badge
                        variant="outline"
                        className={
                          log.status === 'success'
                            ? 'bg-green-50/50 text-green-700 dark:bg-green-950/30 dark:text-green-400'
                            : 'bg-red-50/50 text-red-700 dark:bg-red-950/30 dark:text-red-400'
                        }
                      >
                        {log.status === 'success' ? '200' : '500'}
                      </Badge>
                      <div className="text-right min-w-20">
                        <p className="text-xs font-mono text-muted-foreground">{log.responseTime}ms</p>
                        <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Connect Dialog */}
      <Dialog open={connectDialog.open} onOpenChange={(open) => setConnectDialog({ open, integration: connectDialog.integration })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Connect {connectDialog.integration?.name}</DialogTitle>
            <DialogDescription>
              Enter your {connectDialog.integration?.name} API credentials
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                placeholder="Paste your API key here"
                type="password"
                className="border-border/50"
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setConnectDialog({ open: false, integration: null })}>
              Cancel
            </Button>
            <Button onClick={handleConfirmConnect} className="gap-2">
              <Check className="w-4 h-4" />
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
