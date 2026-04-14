import { useState } from 'react';
import { AlertCircle, CheckCircle, Activity, Filter, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'debug' | 'info' | 'warning' | 'error';
  message: string;
  service: string;
  userId?: string;
  details?: string;
}

interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  changes: string;
  ipAddress: string;
}

const apiLogs: LogEntry[] = [
  {
    id: 'api_001',
    timestamp: '2026-04-14 14:32:15',
    level: 'info',
    message: 'User login successful',
    service: 'auth-service',
    userId: 'user_123',
    details: 'POST /api/auth/login - 200 OK',
  },
  {
    id: 'api_002',
    timestamp: '2026-04-14 14:28:42',
    level: 'info',
    message: 'Invoice generated',
    service: 'billing-service',
    details: 'POST /api/invoices - 201 Created',
  },
  {
    id: 'api_003',
    timestamp: '2026-04-14 14:15:08',
    level: 'info',
    message: 'Data export started',
    service: 'export-service',
    userId: 'user_456',
    details: 'POST /api/exports - 202 Accepted',
  },
  {
    id: 'api_004',
    timestamp: '2026-04-14 13:58:23',
    level: 'warning',
    message: 'Quota exceeded',
    service: 'rate-limiter',
    userId: 'user_789',
    details: 'Rate limit: 1000/hour exceeded',
  },
];

const errorLogs: LogEntry[] = [
  {
    id: 'err_001',
    timestamp: '2026-04-14 13:45:12',
    level: 'error',
    message: 'Database connection timeout',
    service: 'database-pool',
    details: 'Connection timeout after 30s - Retry in progress',
  },
  {
    id: 'err_002',
    timestamp: '2026-04-14 12:23:05',
    level: 'error',
    message: 'Payment processing failed',
    service: 'payment-gateway',
    details: 'Stripe API error: invalid_request_error',
  },
  {
    id: 'err_003',
    timestamp: '2026-04-14 11:52:18',
    level: 'warning',
    message: 'Slow query detected',
    service: 'query-monitor',
    details: 'Query execution time: 8.2s (expected <2s)',
  },
];

const auditLogs: AuditLog[] = [
  {
    id: 'audit_001',
    timestamp: '2026-04-14 14:35:22',
    user: 'admin@workflowai.com',
    action: 'Updated',
    resource: 'Company Plan (Premium→Enterprise)',
    changes: 'Plan upgraded for Acme Corp',
    ipAddress: '192.168.1.100',
  },
  {
    id: 'audit_002',
    timestamp: '2026-04-14 14:12:08',
    user: 'support@workflowai.com',
    action: 'Reset',
    resource: 'User Password',
    changes: 'Password reset sent to user_xyz@company.com',
    ipAddress: '10.0.0.50',
  },
  {
    id: 'audit_003',
    timestamp: '2026-04-14 13:58:40',
    user: 'ops@workflowai.com',
    action: 'Disabled',
    resource: 'User Account',
    changes: 'Account suspended due to policy violation',
    ipAddress: '192.168.1.200',
  },
  {
    id: 'audit_004',
    timestamp: '2026-04-14 13:25:15',
    user: 'admin@workflowai.com',
    action: 'Created',
    resource: 'API Key',
    changes: 'New API key generated for integration',
    ipAddress: '192.168.1.100',
  },
];

export default function PlatformLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');

  const getLogBadge = (level: string) => {
    const styles: Record<string, string> = {
      debug: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
      info: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      warning: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return <Badge className={styles[level]}>{level.toUpperCase()}</Badge>;
  };

  const getActionBadge = (action: string) => {
    const styles: Record<string, string> = {
      Created: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      Updated: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      Deleted: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
      Disabled: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      Reset: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    };
    return <Badge className={styles[action] || styles.Created}>{action}</Badge>;
  };

  const filteredApiLogs = apiLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || log.level === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const filteredErrorLogs = errorLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
        
          Logs & Monitoring
        </h1>
        <p className="text-muted-foreground mt-2">System logs, errors, and audit trails</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">API Calls (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">12,456</div>
            <p className="text-xs text-muted-foreground mt-1">+24% from yesterday</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Errors (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground mt-1">-87% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">99.98%</div>
            <p className="text-xs text-muted-foreground mt-1">Excellent reliability</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-sm">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              className="pl-8 border-border/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-40 border-border/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Logs Tabs */}
      <Tabs defaultValue="api" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="api">API Logs</TabsTrigger>
          <TabsTrigger value="errors">Error Logs</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        {/* API Logs Tab */}
        <TabsContent value="api" className="space-y-4 mt-6">
          <Card className="border-border/50">
            <CardContent className="p-0">
              <div className="space-y-2">
                {filteredApiLogs.map(log => (
                  <div key={log.id} className="p-4 border-b border-border/30 hover:bg-muted/50 transition-colors last:border-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getLogBadge(log.level)}
                          <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                        </div>
                        <p className="font-medium text-foreground">{log.message}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                          <span>Service: {log.service}</span>
                          {log.userId && <span>User: {log.userId}</span>}
                        </div>
                        {log.details && (
                          <p className="text-xs text-muted-foreground mt-2 font-mono bg-muted/50 p-2 rounded">
                            {log.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Error Logs Tab */}
        <TabsContent value="errors" className="space-y-4 mt-6">
          <Card className="border-border/50">
            <CardContent className="p-0">
              <div className="space-y-2">
                {filteredErrorLogs.map(log => (
                  <div
                    key={log.id}
                    className="p-4 border-b border-border/30 hover:bg-red-50/30 dark:hover:bg-red-950/20 transition-colors last:border-0"
                  >
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          {getLogBadge(log.level)}
                          <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                        </div>
                        <p className="font-medium text-red-700 dark:text-red-400">{log.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">Service: {log.service}</p>
                        {log.details && (
                          <p className="text-xs text-muted-foreground mt-2 font-mono bg-red-50/50 dark:bg-red-950/30 p-2 rounded">
                            {log.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Audit Logs Tab */}
        <TabsContent value="audit" className="space-y-4 mt-6">
          <Card className="border-border/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-semibold">Timestamp</th>
                      <th className="text-left py-3 px-4 font-semibold">User</th>
                      <th className="text-left py-3 px-4 font-semibold">Action</th>
                      <th className="text-left py-3 px-4 font-semibold">Resource</th>
                      <th className="text-left py-3 px-4 font-semibold">Changes</th>
                      <th className="text-left py-3 px-4 font-semibold">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuditLogs.map(log => (
                      <tr key={log.id} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4 text-xs text-muted-foreground font-mono">{log.timestamp}</td>
                        <td className="py-3 px-4 text-sm">{log.user}</td>
                        <td className="py-3 px-4">{getActionBadge(log.action)}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{log.resource}</td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">{log.changes}</td>
                        <td className="py-3 px-4 text-xs font-mono text-muted-foreground">{log.ipAddress}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
