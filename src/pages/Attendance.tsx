import { getAttendanceTrend } from '@/data/mockData';
import { CalendarCheck, Clock, AlertTriangle, UserX } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const trend = getAttendanceTrend();

// Generate heatmap data for the month
const heatmapData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  rate: 75 + Math.floor(Math.random() * 25),
}));

const recentLogs = Array.from({ length: 20 }, (_, i) => ({
  name: ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Martinez', 'Frank Davis', 'Grace Wilson', 'Henry Taylor', 'Ivy Anderson', 'Jack Thomas'][i % 10],
  checkIn: `0${8 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  checkOut: `${17 + Math.floor(Math.random() * 2)}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  status: ['present', 'present', 'present', 'late', 'absent'][Math.floor(Math.random() * 5)] as string,
  hours: (7 + Math.random() * 3).toFixed(1),
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-xs space-y-1">
      <p className="text-foreground font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}%</p>
      ))}
    </div>
  );
};

export default function Attendance() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Attendance</h1>
        <p className="page-subheader">Track daily attendance, punctuality, and patterns</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Present Today" value="438" change={2.1} icon={CalendarCheck} />
        <KPICard title="Average Check-in" value="8:47 AM" icon={Clock} />
        <KPICard title="Late Today" value="23" change={-4.3} icon={AlertTriangle} />
        <KPICard title="Absent Today" value="12" change={-1.8} icon={UserX} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Weekly Trend */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Weekly Attendance Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="onTime" stackId="a" fill="hsl(72, 100%, 50%)" name="On Time" radius={[0, 0, 0, 0]} />
              <Bar dataKey="late" stackId="a" fill="hsl(35, 90%, 55%)" name="Late" />
              <Bar dataKey="absent" stackId="a" fill="hsl(340, 75%, 55%)" name="Absent" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap */}
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Monthly Attendance Heatmap</h3>
          <div className="grid grid-cols-7 gap-1.5">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
              <div key={i} className="text-center text-xs text-muted-foreground py-1">{d}</div>
            ))}
            {heatmapData.map((d, i) => (
              <div
                key={i}
                className="aspect-square rounded-md flex items-center justify-center text-xs font-medium transition-all hover:scale-110 cursor-pointer"
                style={{
                  backgroundColor: `hsl(72, 100%, 50%, ${(d.rate - 70) / 30 * 0.6 + 0.1})`,
                  color: d.rate > 90 ? 'hsl(220, 20%, 7%)' : 'hsl(0, 0%, 85%)',
                }}
                title={`Day ${d.day}: ${d.rate}%`}
              >
                {d.day}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 justify-center text-xs text-muted-foreground">
            <span>Low</span>
            <div className="flex gap-0.5">
              {[0.1, 0.25, 0.4, 0.55, 0.7].map((o, i) => (
                <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: `hsl(72, 100%, 50%, ${o})` }} />
              ))}
            </div>
            <span>High</span>
          </div>
        </div>
      </div>

      {/* Daily Logs */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">Today's Attendance Log</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Employee</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Check In</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Check Out</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Hours</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentLogs.map((log, i) => (
                <tr key={i} className="border-b border-border/50 table-row-hover">
                  <td className="px-4 py-3 text-sm font-medium">{log.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{log.checkIn}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{log.checkOut}</td>
                  <td className="px-4 py-3 text-sm">{log.hours}h</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
                      log.status === 'present' ? 'badge-success' : log.status === 'late' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
