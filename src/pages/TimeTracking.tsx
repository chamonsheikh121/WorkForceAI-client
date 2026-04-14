import { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, Square, BarChart3 } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const weeklyData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(d => ({
  day: d,
  hours: (6 + Math.random() * 3).toFixed(1),
  productivity: Math.floor(65 + Math.random() * 30),
}));

const employeeLogs = Array.from({ length: 15 }, (_, i) => ({
  name: ['Alice Johnson', 'Bob Smith', 'Carol Williams', 'David Brown', 'Eva Martinez', 'Frank Davis', 'Grace Wilson', 'Henry Taylor', 'Ivy Anderson', 'Jack Thomas', 'Kate Lee', 'Liam White', 'Mia Harris', 'Noah Clark', 'Olivia Lewis'][i],
  project: ['Platform Redesign', 'API Gateway v2', 'Mobile App', 'Data Pipeline', 'Cloud Migration'][i % 5],
  hours: (5 + Math.random() * 4).toFixed(1),
  productivity: Math.floor(60 + Math.random() * 40),
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-xs space-y-1">
      <p className="text-foreground font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

export default function TimeTracking() {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Time Tracking</h1>
        <p className="page-subheader">Track work hours and measure productivity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Hours Today" value="6.5h" change={3.2} icon={Clock} />
        <KPICard title="This Week" value="32.4h" change={1.8} icon={BarChart3} />
        <KPICard title="Avg Productivity" value="78%" change={5.1} icon={BarChart3} />
        <KPICard title="Overtime Hours" value="4.2h" change={-12.3} icon={Clock} />
      </div>

      {/* Timer */}
      <div className="glass-card p-8 flex flex-col items-center gap-6 neon-glow">
        <p className="text-sm text-muted-foreground">Current Session</p>
        <div className="text-6xl font-mono font-bold tracking-wider neon-text">{formatTime(seconds)}</div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRunning(!running)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
              running ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30' : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {running ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={() => { setRunning(false); setSeconds(0); }}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-secondary/60 hover:bg-secondary transition-colors"
          >
            <Square className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Weekly Hours</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="hours" fill="hsl(72, 100%, 50%)" radius={[4, 4, 0, 0]} name="Hours" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Productivity Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="day" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} unit="%" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="productivity" stroke="hsl(187, 80%, 50%)" strokeWidth={2} dot={{ fill: 'hsl(187, 80%, 50%)' }} name="Productivity" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Time Logs */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">Employee Time Logs</h3>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Employee</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Project</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Hours</th>
              <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Productivity</th>
            </tr>
          </thead>
          <tbody>
            {employeeLogs.map((log, i) => (
              <tr key={i} className="border-b border-border/50 table-row-hover">
                <td className="px-4 py-3 text-sm font-medium">{log.name}</td>
                <td className="px-4 py-3 text-sm text-muted-foreground">{log.project}</td>
                <td className="px-4 py-3 text-sm">{log.hours}h</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${log.productivity}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{log.productivity}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
