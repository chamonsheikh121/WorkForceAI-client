import { getRevenueData, getDepartmentData, getPerformanceDistribution, getSalaryDistribution, getMonthlyHiring, getAttendanceTrend } from '@/data/mockData';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const revenue = getRevenueData();
const dept = getDepartmentData();
const perf = getPerformanceDistribution();
const salary = getSalaryDistribution();
const hiring = getMonthlyHiring();
const attendance = getAttendanceTrend();

const chartColors = ['hsl(72, 100%, 50%)', 'hsl(187, 80%, 50%)', 'hsl(280, 70%, 60%)', 'hsl(35, 90%, 55%)', 'hsl(340, 75%, 55%)'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-xs space-y-1">
      <p className="text-foreground font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</p>
      ))}
    </div>
  );
};

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Reports & Analytics</h1>
        <p className="page-subheader">Comprehensive data visualizations across all departments</p>
      </div>

      {/* AI Summary */}
      <div className="glass-card p-5 border-primary/20 neon-glow">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-xs text-primary font-bold">AI</span>
          </div>
          <h3 className="text-sm font-semibold">AI-Generated Summary</h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Revenue is trending upward with a <span className="text-primary font-medium">15.3% MoM growth</span>. Engineering department shows the highest performance score at 91/100.
          Employee attrition is at a healthy 6.2%, down from 8.4% last quarter. Three projects are flagged as at-risk due to scope creep.
          Recommended actions: <span className="text-foreground">review staffing for the Cloud Migration project</span> and
          <span className="text-foreground"> address the declining attendance trend on Fridays</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Trend */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Revenue & Profit Trend</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenue}>
              <defs>
                <linearGradient id="rg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(72, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(72, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(72, 100%, 50%)" fill="url(#rg)" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="hsl(187, 80%, 50%)" strokeWidth={2} dot={false} name="Profit" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Department Radar */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Department Performance Radar</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={dept}>
              <PolarGrid stroke="hsl(220, 14%, 18%)" />
              <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} />
              <Radar name="Performance" dataKey="avgPerformance" stroke="hsl(72, 100%, 50%)" fill="hsl(72, 100%, 50%)" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Headcount" dataKey="headcount" stroke="hsl(187, 80%, 50%)" fill="hsl(187, 80%, 50%)" fillOpacity={0.1} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Employee Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={perf}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="range" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Employees">
                {perf.map((_, i) => <Cell key={i} fill={chartColors[i]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Salary Distribution */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Salary Range by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salary}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="department" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="min" fill="hsl(187, 80%, 50%)" radius={[4, 4, 0, 0]} name="Min" />
              <Bar dataKey="avg" fill="hsl(72, 100%, 50%)" radius={[4, 4, 0, 0]} name="Avg" />
              <Bar dataKey="max" fill="hsl(280, 70%, 60%)" radius={[4, 4, 0, 0]} name="Max" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hiring Pipeline */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Hiring Pipeline</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={hiring}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="applications" stroke="hsl(187, 80%, 50%)" strokeWidth={2} name="Applications" />
              <Line type="monotone" dataKey="interviews" stroke="hsl(280, 70%, 60%)" strokeWidth={2} name="Interviews" />
              <Line type="monotone" dataKey="hired" stroke="hsl(72, 100%, 50%)" strokeWidth={2} name="Hired" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Breakdown */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Weekly Attendance Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendance}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="onTime" stackId="a" fill="hsl(72, 100%, 50%)" name="On Time" />
              <Bar dataKey="late" stackId="a" fill="hsl(35, 90%, 55%)" name="Late" />
              <Bar dataKey="absent" stackId="a" fill="hsl(340, 75%, 55%)" name="Absent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
