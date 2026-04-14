import { projects, tasks } from '@/data/mockData';
import { FolderKanban, CheckCircle2, AlertTriangle, Clock, Plus } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const statusColors: Record<string, string> = {
  active: 'badge-info',
  completed: 'badge-success',
  'on-hold': 'badge-warning',
  'at-risk': 'badge-danger',
};

const tasksByStatus = {
  todo: tasks.filter(t => t.status === 'todo'),
  'in-progress': tasks.filter(t => t.status === 'in-progress'),
  review: tasks.filter(t => t.status === 'review'),
  done: tasks.filter(t => t.status === 'done'),
};

const priorityColors: Record<string, string> = {
  low: 'border-l-sky-400',
  medium: 'border-l-amber-400',
  high: 'border-l-orange-500',
  critical: 'border-l-red-500',
};

const projectProgress = projects.slice(0, 8).map(p => ({
  name: p.name.length > 15 ? p.name.slice(0, 15) + '...' : p.name,
  progress: p.progress,
  budget: p.budget / 1000,
}));

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

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Projects & Tasks</h1>
          <p className="page-subheader">{projects.length} projects, {tasks.length} tasks</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Active Projects" value={projects.filter(p => p.status === 'active').length} icon={FolderKanban} />
        <KPICard title="Completed" value={projects.filter(p => p.status === 'completed').length} icon={CheckCircle2} />
        <KPICard title="At Risk" value={projects.filter(p => p.status === 'at-risk').length} icon={AlertTriangle} />
        <KPICard title="On Hold" value={projects.filter(p => p.status === 'on-hold').length} icon={Clock} />
      </div>

      {/* Project Progress Chart */}
      <div className="chart-card">
        <h3 className="text-sm font-semibold mb-4">Project Progress Overview</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={projectProgress} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis type="number" domain={[0, 100]} stroke="hsl(220, 10%, 45%)" fontSize={12} unit="%" />
            <YAxis type="category" dataKey="name" stroke="hsl(220, 10%, 45%)" fontSize={11} width={120} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="progress" fill="hsl(72, 100%, 50%)" radius={[0, 4, 4, 0]} name="Progress" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Kanban Board */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Task Board</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(['todo', 'in-progress', 'review', 'done'] as const).map(status => (
            <div key={status} className="glass-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium capitalize">{status.replace('-', ' ')}</h4>
                <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">
                  {tasksByStatus[status].length}
                </span>
              </div>
              <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-thin">
                {tasksByStatus[status].slice(0, 8).map((task, i) => (
                  <div
                    key={task.id}
                    className={`p-3 bg-secondary/30 rounded-lg border-l-2 ${priorityColors[task.priority]} hover:bg-secondary/50 transition-colors cursor-pointer animate-fade-in`}
                    style={{ animationDelay: `${i * 40}ms` }}
                  >
                    <p className="text-sm font-medium mb-1">{task.title}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{task.assignee.split(' ')[0]}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded border ${
                        task.priority === 'critical' ? 'badge-danger' : task.priority === 'high' ? 'badge-warning' : 'badge-info'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">All Projects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Project</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Department</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Progress</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Budget</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Team</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, i) => (
                <tr key={p.id} className="border-b border-border/50 table-row-hover">
                  <td className="px-4 py-3 text-sm font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.department}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">${(p.budget / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.members} members</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
