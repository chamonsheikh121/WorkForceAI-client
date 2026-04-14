import { useState } from 'react';
import { TrendingUp, TrendingDown, Activity, AlertCircle, CheckCircle, Zap, Wifi, Eye } from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data for dashboard
const mrrData = [
  { date: '1 day', value: 48000 },
  { date: '2 day', value: 50200 },
  { date: '3 day', value: 49800 },
  { date: '4 day', value: 52100 },
  { date: '5 day', value: 51900 },
  { date: '6 day', value: 54300 },
  { date: '7 day', value: 55600 },
];

const mrrData30d = [
  { date: 'Week 1', value: 45000 },
  { date: 'Week 2', value: 48000 },
  { date: 'Week 3', value: 50000 },
  { date: 'Week 4', value: 55600 },
];

const mrrData12m = [
  { date: 'Jan', value: 28000 },
  { date: 'Feb', value: 32000 },
  { date: 'Mar', value: 38000 },
  { date: 'Apr', value: 42000 },
  { date: 'May', value: 48000 },
  { date: 'Jun', value: 55600 },
];

const companyGrowthData = [
  { period: 'Week 1', new: 5, churned: 1 },
  { period: 'Week 2', new: 8, churned: 2 },
  { period: 'Week 3', new: 6, churned: 1 },
  { period: 'Week 4', new: 12, churned: 3 },
];

const activities = [
  { id: 1, type: 'company_registered', title: 'New Company Registered', detail: 'Vertex Analytics Inc - Enterprise Plan', time: '2m ago', icon: '🏢' },
  { id: 2, type: 'subscription_upgraded', title: 'Subscription Upgraded', detail: 'Acme Corp: Professional → Enterprise', time: '15m ago', icon: '⬆️' },
  { id: 3, type: 'payment_failed', title: 'Payment Failed', detail: 'Global Solutions - Invoice #1025', time: '1h ago', icon: '❌' },
  { id: 4, type: 'user_banned', title: 'User Banned', detail: 'Suspicious activity detected - User ID 4521', time: '2h ago', icon: '🚫' },
  { id: 5, type: 'company_registered', title: 'New Company Registered', detail: 'Innovation Hub - Starter Plan', time: '4h ago', icon: '🏢' },
  { id: 6, type: 'subscription_upgraded', title: 'Trial Converted', detail: 'StartUp Labs: Trial → Professional', time: '6h ago', icon: '✨' },
];

const systemHealth = [
  { metric: 'Server Uptime', value: '99.98%', status: 'excellent', change: 0.02 },
  { metric: 'API Response Time', value: '124ms', status: 'good', change: -12 },
  { metric: 'Error Rate', value: '0.02%', status: 'excellent', change: -0.01 },
];

// KPI Card Component with Sparkline
function KPICardWithSparkline({ 
  title, 
  value, 
  change, 
  sparklineData, 
  unit = '',
  isPositive = true 
}: any) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-card/80 to-card/40 p-6 hover:border-primary/50 transition-all duration-300">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300" />

      <div className="relative space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold mt-1">{value}{unit}</p>
          </div>
          <div className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
            isPositive 
              ? 'bg-green-500/10 text-green-600' 
              : 'bg-red-500/10 text-red-600'
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {Math.abs(change)}%
          </div>
        </div>

        {/* Mini Sparkline */}
        <ResponsiveContainer width="100%" height={40}>
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={isPositive ? '#10b981' : '#ef4444'} 
              fill={`url(#grad-${title})`}
              strokeWidth={2}
              isAnimationActive={true}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function PlatformOwnerDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  const getMRRData = () => {
    switch (timeRange) {
      case '30d': return mrrData30d;
      case '12m': return mrrData12m;
      default: return mrrData;
    }
  };

  const sparklineKpis = [
    { title: 'Total Companies', value: '248', change: 12.5, isPositive: true, sparklineData: [
      { value: 180 }, { value: 200 }, { value: 195 }, { value: 220 }, { value: 235 }, { value: 248 }
    ]},
    { title: 'Active Subscriptions', value: '1,845', change: 8.3, isPositive: true, sparklineData: [
      { value: 1500 }, { value: 1600 }, { value: 1700 }, { value: 1750 }, { value: 1820 }, { value: 1845 }
    ]},
    { title: 'Monthly Revenue', value: '$55.6k', change: 15.2, isPositive: true, sparklineData: [
      { value: 35000 }, { value: 40000 }, { value: 45000 }, { value: 50000 }, { value: 52000 }, { value: 55600 }
    ]},
    { title: 'Active Users', value: '12,450', change: 6.8, isPositive: true, sparklineData: [
      { value: 10000 }, { value: 10500 }, { value: 11200 }, { value: 11800 }, { value: 12200 }, { value: 12450 }
    ]},
    { title: 'Churn Rate', value: '2.4%', change: 0.3, isPositive: false, sparklineData: [
      { value: 3.5 }, { value: 3.2 }, { value: 2.8 }, { value: 2.6 }, { value: 2.5 }, { value: 2.4 }
    ]},
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Platform Control Tower</h1>
        <p className="text-muted-foreground mt-1">Real-time overview of your SaaS platform health and metrics</p>
      </div>

      {/* KPI Cards with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {sparklineKpis.map((kpi, idx) => (
          <KPICardWithSparkline
            key={idx}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            sparklineData={kpi.sparklineData}
            isPositive={kpi.isPositive}
          />
        ))}
      </div>

      {/* Revenue Analytics + Company Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* MRR Growth Chart */}
        <Card className="lg:col-span-2 border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Monthly Recurring Revenue</CardTitle>
                <CardDescription>MRR growth trend</CardDescription>
              </div>
              <div className="flex gap-2">
                {['7d', '30d', '12m'].map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                    className="text-xs"
                  >
                    {range}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={getMRRData()}>
                <defs>
                  <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 25%)" />
                <XAxis dataKey="date" stroke="hsl(220, 10%, 45%)" />
                <YAxis stroke="hsl(220, 10%, 45%)" tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 13%, 15%)',
                    border: '1px solid hsl(220, 14%, 25%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: any) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="url(#mrrGrad)"
                  strokeWidth={2}
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company Growth */}
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardHeader>
            <CardTitle>Company Growth</CardTitle>
            <CardDescription>New vs Churned</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={companyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 25%)" />
                <XAxis dataKey="period" stroke="hsl(220, 10%, 45%)" fontSize={12} />
                <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 13%, 15%)',
                    border: '1px solid hsl(220, 14%, 25%)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="new" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="churned" fill="#ef4444" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities + System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Activities */}
        <Card className="lg:col-span-2 border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Recent Activities
            </CardTitle>
            <CardDescription>Live stream of platform events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {activities.map((activity, idx) => (
                <div
                  key={activity.id}
                  className="group relative overflow-hidden rounded-lg border border-border/30 bg-background/40 p-4 hover:border-primary/50 transition-all duration-300 animate-in fade-in slide-in-from-top-2"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-start gap-3">
                    <div className="text-2xl mt-1">{activity.icon}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{activity.detail}</p>
                    </div>
                    <div className="text-xs text-muted-foreground flex-shrink-0">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              System Health
            </CardTitle>
            <CardDescription>Platform status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-lg border border-border/30 bg-background/40 p-3 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {item.status === 'excellent' ? (
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                      )}
                      <div>
                        <p className="text-xs font-medium">{item.metric}</p>
                        <p className="text-lg font-bold mt-1">{item.value}</p>
                      </div>
                    </div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded ${
                      item.status === 'excellent'
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-yellow-500/10 text-yellow-600'
                    }`}>
                      {item.status === 'excellent' ? '↑' : '→'} {Math.abs(item.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
