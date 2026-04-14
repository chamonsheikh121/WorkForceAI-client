import { useState } from 'react';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const mrrArrData = [
  { month: 'Jan', mrr: 12000, arr: 144000 },
  { month: 'Feb', mrr: 18000, arr: 216000 },
  { month: 'Mar', mrr: 24000, arr: 288000 },
  { month: 'Apr', mrr: 32000, arr: 384000 },
  { month: 'May', mrr: 38000, arr: 456000 },
  { month: 'Jun', mrr: 45000, arr: 540000 },
];

const cohortData = [
  { cohort: 'Jan 2026', m0: 100, m1: 95, m2: 88, m3: 82, m4: 78, m5: 75 },
  { cohort: 'Feb 2026', m0: 120, m1: 108, m2: 98, m3: 92, m4: 87 },
  { cohort: 'Mar 2026', m0: 150, m1: 132, m2: 122, m3: 115 },
  { cohort: 'Apr 2026', m0: 180, m1: 156, m2: 145 },
  { cohort: 'May 2026', m0: 200, m1: 172 },
  { cohort: 'Jun 2026', m0: 250 },
];

const revenueBreakdown = [
  { plan: 'Starter', revenue: 28000, percentage: 62 },
  { plan: 'Professional', revenue: 12000, percentage: 27 },
  { plan: 'Enterprise', revenue: 5000, percentage: 11 },
];

export default function PlatformAnalytics() {
  const [timeRange, setTimeRange] = useState('6m');

  const metrics = [
    {
      label: 'MRR (Monthly Recurring Revenue)',
      value: '$45,000',
      change: '+18.4%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50/50',
    },
    {
      label: 'ARR (Annual Recurring Revenue)',
      value: '$540,000',
      change: '+18.4%',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50/50',
    },
    {
      label: 'CAC (Customer Acquisition Cost)',
      value: '$450',
      change: '-12.5%',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50/50',
    },
    {
      label: 'LTV (Lifetime Value)',
      value: '$8,400',
      change: '+24.3%',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50/50',
    },
  ];

  const advancedMetrics = [
    { label: 'Churn Rate', value: '3.2%', target: '< 5%', status: 'good' },
    { label: 'Retention Rate', value: '96.8%', target: '> 90%', status: 'good' },
    { label: 'LTV:CAC Ratio', value: '18.7x', target: '> 3x', status: 'excellent' },
    { label: 'Growth Rate (MoM)', value: '18.4%', target: '> 10%', status: 'excellent' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
       
            Analytics & Metrics
          </h1>
          <p className="text-muted-foreground mt-2">Advanced SaaS analytics and business intelligence</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32 border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">Last Month</SelectItem>
            <SelectItem value="3m">Last 3 Months</SelectItem>
            <SelectItem value="6m">Last 6 Months</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="border-border/50">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <Icon className={`w-4 h-4 ${metric.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs mt-2 ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* MRR/ARR Trend */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>MRR vs ARR over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mrrArrData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                  name="MRR"
                />
                <Line
                  type="monotone"
                  dataKey="arr"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  dot={{ fill: '#8b5cf6' }}
                  name="ARR"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue Breakdown by Plan */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Revenue Breakdown</CardTitle>
            <CardDescription>Current month by subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="plan" stroke="var(--muted-foreground)" />
                <YAxis stroke="var(--muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--background)',
                    border: '1px solid var(--border)',
                  }}
                />
                <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cohort Analysis */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Cohort Analysis</CardTitle>
          <CardDescription>User retention by signup cohort (% of original cohort)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left py-2 px-3 font-semibold">Cohort</th>
                  <th className="text-center py-2 px-3 font-semibold">M0</th>
                  <th className="text-center py-2 px-3 font-semibold">M1</th>
                  <th className="text-center py-2 px-3 font-semibold">M2</th>
                  <th className="text-center py-2 px-3 font-semibold">M3</th>
                  <th className="text-center py-2 px-3 font-semibold">M4</th>
                  <th className="text-center py-2 px-3 font-semibold">M5</th>
                </tr>
              </thead>
              <tbody>
                {cohortData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-muted/50 transition-colors">
                    <td className="py-2 px-3 font-medium text-muted-foreground">{row.cohort}</td>
                    <td className="text-center py-2 px-3">
                      <span className="inline-block bg-blue-600/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-xs">
                        {row.m0}
                      </span>
                    </td>
                    <td className="text-center py-2 px-3">
                      <span className="inline-block bg-blue-600/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-xs">
                        {row.m1}
                      </span>
                    </td>
                    <td className="text-center py-2 px-3">
                      {row.m2 && (
                        <span className="inline-block bg-blue-600/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-xs">
                          {row.m2}
                        </span>
                      )}
                    </td>
                    <td className="text-center py-2 px-3">
                      {row.m3 && (
                        <span className="inline-block bg-blue-600/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-xs">
                          {row.m3}
                        </span>
                      )}
                    </td>
                    <td className="text-center py-2 px-3">
                      {row.m4 && (
                        <span className="inline-block bg-blue-600/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-xs">
                          {row.m4}
                        </span>
                      )}
                    </td>
                    <td className="text-center py-2 px-3">
                      {row.m5 && (
                        <span className="inline-block bg-blue-600/20 text-blue-700 dark:text-blue-400 px-2 py-1 rounded font-mono text-xs">
                          {row.m5}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {advancedMetrics.map((metric, idx) => (
          <Card key={idx} className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium text-muted-foreground">
                {metric.label}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Target: {metric.target}</span>
                <span
                  className={`px-2 py-1 rounded font-medium ${
                    metric.status === 'excellent'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}
                >
                  {metric.status}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
