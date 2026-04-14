import { leaves } from '@/data/mockData';
import { CalendarOff, CheckCircle2, Clock, XCircle, Check, X, Eye } from 'lucide-react';
import { useState } from 'react';
import KPICard from '@/components/dashboard/KPICard';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const chartColors = ['hsl(72, 100%, 50%)', 'hsl(187, 80%, 50%)', 'hsl(280, 70%, 60%)', 'hsl(35, 90%, 55%)', 'hsl(340, 75%, 55%)', 'hsl(160, 70%, 50%)'];

const statusColors: Record<string, string> = {
  approved: 'badge-success',
  pending: 'badge-warning',
  rejected: 'badge-danger',
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
  if (!active || !payload?.[0]) return null;
  return (
    <div className="glass-card p-3 text-xs">
      <p className="text-foreground font-medium">{payload[0].name}: {payload[0].value}</p>
    </div>
  );
};

export default function Leave() {
  const [leaveRequests, setLeaveRequests] = useState(leaves);
  const [viewDialog, setViewDialog] = useState({ open: false, leave: null as typeof leaves[0] | null });

  const handleApprove = (id: string) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'approved' } : l));
  };

  const handleReject = (id: string) => {
    setLeaveRequests(leaveRequests.map(l => l.id === id ? { ...l, status: 'rejected' } : l));
  };

  const handleView = (leave: typeof leaves[0]) => {
    setViewDialog({ open: true, leave });
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Leave Management</h1>
        <p className="page-subheader">Manage leave requests, approvals, and balances</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Requests" value={leaveRequests.length} icon={CalendarOff} />
        <KPICard title="Approved" value={leaveRequests.filter(l => l.status === 'approved').length} icon={CheckCircle2} />
        <KPICard title="Pending" value={leaveRequests.filter(l => l.status === 'pending').length} icon={Clock} />
        <KPICard title="Rejected" value={leaveRequests.filter(l => l.status === 'rejected').length} icon={XCircle} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="chart-card lg:col-span-1">
          <h3 className="text-sm font-semibold mb-4">Leave by Type</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={leaveRequests.reduce((acc, l) => {
                  const existing = acc.find(item => item.name === l.type);
                  if (existing) existing.value += 1;
                  else acc.push({ name: l.type, value: 1 });
                  return acc;
                }, [] as Array<{ name: string; value: number }>)}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {chartColors.map((color, i) => <Cell key={i} fill={color} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Calendar mockup */}
        <div className="chart-card lg:col-span-2">
          <h3 className="text-sm font-semibold mb-4">Leave Calendar — April 2025</h3>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
              <div key={d} className="text-center text-xs text-muted-foreground py-2 font-medium">{d}</div>
            ))}
            {Array.from({ length: 30 }, (_, i) => {
              const hasLeave = Math.random() > 0.7;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-all hover:border-primary/30 border border-transparent ${
                    hasLeave ? 'bg-primary/10 border-primary/20' : 'bg-secondary/20'
                  }`}
                >
                  <span className="font-medium">{i + 1}</span>
                  {hasLeave && <span className="text-[10px] text-primary mt-0.5">{Math.ceil(Math.random() * 5)}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leave Requests Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">Recent Leave Requests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Type</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Start</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">End</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Days</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Reason</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.slice(0, 20).map((l, i) => (
                <tr key={l.id} className="border-b border-border/50 table-row-hover">
                  <td className="px-4 py-3 text-sm font-medium">{l.type}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.startDate}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.endDate}</td>
                  <td className="px-4 py-3 text-sm">{l.days}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{l.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[l.status]}`}>{l.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {l.status === 'pending' ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleApprove(l.id)}
                            className="h-7 gap-1 text-green-600 hover:bg-green-50 dark:hover:bg-green-950/30 border-green-200 dark:border-green-800"
                          >
                            <Check className="w-3 h-3" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReject(l.id)}
                            className="h-7 gap-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 border-red-200 dark:border-red-800"
                          >
                            <X className="w-3 h-3" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleView(l)}
                          className="h-7 gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Leave Details Dialog */}
      <Dialog open={viewDialog.open} onOpenChange={(open) => setViewDialog({ ...viewDialog, open })}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Leave Request Details
            </DialogTitle>
            <DialogDescription>
              View full details of the leave request
            </DialogDescription>
          </DialogHeader>

          {viewDialog.leave && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Leave Type</p>
                  <p className="text-sm font-semibold">{viewDialog.leave.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Duration</p>
                  <p className="text-sm font-semibold">{viewDialog.leave.days} days</p>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Start Date</p>
                <p className="text-sm font-semibold">{viewDialog.leave.startDate}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">End Date</p>
                <p className="text-sm font-semibold">{viewDialog.leave.endDate}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Reason</p>
                <p className="text-sm">{viewDialog.leave.reason}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">Status</p>
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${statusColors[viewDialog.leave.status]}`}>
                  {viewDialog.leave.status}
                </span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
