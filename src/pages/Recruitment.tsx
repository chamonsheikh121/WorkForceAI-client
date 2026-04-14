import { candidates, getMonthlyHiring } from '@/data/mockData';
import { UserPlus, Users, CheckCircle2, XCircle } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const hiringData = getMonthlyHiring();
const stages = ['applied', 'screening', 'interview', 'offer', 'hired', 'rejected'] as const;

const stageCounts = stages.reduce((acc, s) => {
  acc[s] = candidates.filter(c => c.stage === s).length;
  return acc;
}, {} as Record<string, number>);

const stageColors: Record<string, string> = {
  applied: 'border-l-sky-400',
  screening: 'border-l-amber-400',
  interview: 'border-l-violet-400',
  offer: 'border-l-primary',
  hired: 'border-l-emerald-400',
  rejected: 'border-l-red-400',
};

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

export default function Recruitment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Recruitment</h1>
        <p className="page-subheader">Manage hiring pipeline, candidates, and job postings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Candidates" value={candidates.length} change={18.3} icon={Users} />
        <KPICard title="In Pipeline" value={candidates.filter(c => !['hired', 'rejected'].includes(c.stage)).length} icon={UserPlus} />
        <KPICard title="Hired" value={stageCounts.hired} change={12.5} icon={CheckCircle2} />
        <KPICard title="Rejected" value={stageCounts.rejected} icon={XCircle} />
      </div>

      {/* Hiring Funnel Chart */}
      <div className="chart-card">
        <h3 className="text-sm font-semibold mb-4">Monthly Hiring Pipeline</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={hiringData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
            <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" fontSize={12} />
            <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="applications" fill="hsl(187, 80%, 50%)" radius={[4, 4, 0, 0]} name="Applications" />
            <Bar dataKey="interviews" fill="hsl(280, 70%, 60%)" radius={[4, 4, 0, 0]} name="Interviews" />
            <Bar dataKey="hired" fill="hsl(72, 100%, 50%)" radius={[4, 4, 0, 0]} name="Hired" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Candidate Pipeline Kanban */}
      <div>
        <h3 className="text-sm font-semibold mb-4">Candidate Pipeline</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {stages.map(stage => (
            <div key={stage} className="glass-card p-3">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-medium capitalize">{stage}</h4>
                <span className="text-xs text-muted-foreground bg-secondary/60 px-1.5 py-0.5 rounded-full">{stageCounts[stage]}</span>
              </div>
              <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-thin">
                {candidates.filter(c => c.stage === stage).slice(0, 5).map((c, i) => (
                  <div key={c.id} className={`p-2 bg-secondary/30 rounded-lg border-l-2 ${stageColors[stage]} text-xs hover:bg-secondary/50 transition-colors cursor-pointer`}>
                    <p className="font-medium truncate">{c.name}</p>
                    <p className="text-muted-foreground truncate">{c.position}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-muted-foreground">{c.source}</span>
                      <span className={`font-semibold ${c.score >= 70 ? 'text-emerald-400' : c.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{c.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidates Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">All Candidates</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Name</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Position</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Stage</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Score</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Source</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Applied</th>
              </tr>
            </thead>
            <tbody>
              {candidates.slice(0, 20).map(c => (
                <tr key={c.id} className="border-b border-border/50 table-row-hover">
                  <td className="px-4 py-3 text-sm font-medium">{c.name}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.position}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
                      c.stage === 'hired' ? 'badge-success' : c.stage === 'rejected' ? 'badge-danger' : c.stage === 'offer' ? 'badge-warning' : 'badge-info'
                    }`}>{c.stage}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${c.score >= 70 ? 'text-emerald-400' : c.score >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{c.score}%</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.source}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{c.appliedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
