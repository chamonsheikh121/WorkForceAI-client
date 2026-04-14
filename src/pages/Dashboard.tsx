/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuth } from '@/context/AuthContext';
import EmployeeDashboard from './EmployeeDashboard';
import PlatformOwnerDashboard from './PlatformOwnerDashboard';
import KPICard from '@/components/dashboard/KPICard';
import { platformStats, companyStats, getRevenueData, getDepartmentData, getAttendanceTrend, getPerformanceDistribution } from '@/data/mockData';
import { Building2, Users, DollarSign, TrendingUp, Activity, Target, Clock, UserCheck } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const revenueData = getRevenueData();
const deptData = getDepartmentData();
const attendanceTrend = getAttendanceTrend();
const perfDist = getPerformanceDistribution();

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

const recentActivity = [
  { action: 'New employee onboarded', detail: 'Sarah Chen - Engineering', time: '2m ago', type: 'success' },
  { action: 'Leave request approved', detail: 'James Wilson - 5 days', time: '15m ago', type: 'info' },
  { action: 'Project milestone reached', detail: 'Platform Redesign - 75%', time: '1h ago', type: 'success' },
  { action: 'Payroll processed', detail: 'March 2025 - $1.2M', time: '3h ago', type: 'info' },
  { action: 'Performance alert', detail: '3 employees below threshold', time: '5h ago', type: 'warning' },
  { action: 'New company signed up', detail: 'Vertex Analytics - Enterprise', time: '8h ago', type: 'success' },
  { action: 'Support ticket escalated', detail: 'Ticket #4521 - High priority', time: '12h ago', type: 'danger' },
];

// Admin Dashboard (Platform Owner & Company)
function AdminDashboard() {
  const { user } = useAuth();
  const isPlatformOwner = user?.role === 'platform_owner';
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Dashboard</h1>
        <p className="page-subheader">
          Welcome back, {user?.name}. {isPlatformOwner ? "Here's your platform overview." : "Here's your company overview."}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isPlatformOwner ? (
          <>
            <KPICard title="Total Employees" value={companyStats.totalEmployees.toLocaleString()} change={8.2} icon={Users} />
            <KPICard title="Monthly Revenue" value={`$${(platformStats.totalRevenue / 1000).toFixed(0)}K`} change={15.3} icon={DollarSign} />
            <KPICard title="Active Projects" value={companyStats.activeProjects} change={-2.1} icon={Target} />
            <KPICard title="ARR" value={`$${(platformStats.arr / 1000000).toFixed(1)}M`} change={22.4} icon={TrendingUp} />
          </>
        ) : (
          <>
            <KPICard title="Total Employees" value={companyStats.totalEmployees} change={8.2} icon={Users} />
            <KPICard title="Active Projects" value={companyStats.activeProjects} change={-2.1} icon={Target} />
            <KPICard title="Attendance Rate" value={`${companyStats.attendanceRate}%`} change={1.4} icon={UserCheck} />
            <KPICard title="Pending Leaves" value={companyStats.pendingLeaves} change={-5.6} icon={Clock} />
          </>
        )}
      </div>

      {/* Second row KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Attendance Rate" value={`${companyStats.attendanceRate}%`} change={1.4} icon={UserCheck} />
        <KPICard title="Avg Performance" value={`${companyStats.avgPerformance}/100`} change={3.1} icon={Activity} />
        <KPICard title="Pending Leaves" value={companyStats.pendingLeaves} change={-5.6} icon={Clock} />
        <KPICard title="Monthly Spend" value={`$${(platformStats.totalRevenue / 1000 / 2).toFixed(0)}K`} change={-5.2} icon={DollarSign} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="chart-card lg:col-span-2">
          <h3 className="text-sm font-semibold mb-4">Revenue & Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(72, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(72, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(187, 80%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(187, 80%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={(v) => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(72, 100%, 50%)" fill="url(#revGrad)" strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="hsl(187, 80%, 50%)" fill="url(#expGrad)" strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Performance Distribution</h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={perfDist} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={4} dataKey="count" nameKey="range">
                {perfDist.map((_, i) => (
                  <Cell key={i} fill={chartColors[i]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {perfDist.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: chartColors[i] }} />
                {p.range}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Department Performance */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={deptData}>
              <PolarGrid stroke="hsl(220, 14%, 18%)" />
              <PolarAngleAxis dataKey="name" tick={{ fill: 'hsl(220, 10%, 55%)', fontSize: 11 }} />
              <PolarRadiusAxis tick={{ fill: 'hsl(220, 10%, 45%)', fontSize: 10 }} />
              <Radar name="Performance" dataKey="avgPerformance" stroke="hsl(72, 100%, 50%)" fill="hsl(72, 100%, 50%)" fillOpacity={0.15} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance Trend */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Weekly Attendance</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="onTime" fill="hsl(72, 100%, 50%)" radius={[4, 4, 0, 0]} name="On Time" />
              <Bar dataKey="late" fill="hsl(35, 90%, 55%)" radius={[4, 4, 0, 0]} name="Late" />
              <Bar dataKey="absent" fill="hsl(340, 75%, 55%)" radius={[4, 4, 0, 0]} name="Absent" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3 max-h-[280px] overflow-y-auto scrollbar-thin">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-2 rounded-lg hover:bg-secondary/30 transition-colors animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.type === 'success' ? 'bg-emerald-400' : item.type === 'warning' ? 'bg-amber-400' : item.type === 'danger' ? 'bg-red-400' : 'bg-sky-400'
                }`} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate">{item.action}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.detail}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();

  // Show platform owner dashboard for platform_owner role
  if (user?.role === 'platform_owner') {
    return <PlatformOwnerDashboard />;
  }

  // Show employee dashboard for employee role
  if (user?.role === 'employee') {
    return <EmployeeDashboard />;
  }

  // Show admin dashboard for company roles
  return <AdminDashboard />;
}
