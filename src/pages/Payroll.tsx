import { payroll, employees, getSalaryDistribution } from '@/data/mockData';
import { Wallet, DollarSign, TrendingUp, CreditCard } from 'lucide-react';
import KPICard from '@/components/dashboard/KPICard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const salaryDist = getSalaryDistribution();

const monthlyPayroll = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map(m => {
  const monthRecords = payroll.filter(p => p.month.endsWith(m.toLowerCase().slice(0, 2)) || true).slice(0, 50);
  return {
    month: m,
    total: 850000 + Math.floor(Math.random() * 200000),
    bonuses: 50000 + Math.floor(Math.random() * 80000),
    deductions: 30000 + Math.floor(Math.random() * 40000),
  };
});

const totalPayroll = employees.reduce((s, e) => s + e.salary, 0);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="glass-card p-3 text-xs space-y-1">
      <p className="text-foreground font-medium">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }}>{p.name}: ${(p.value / 1000).toFixed(0)}K</p>
      ))}
    </div>
  );
};

export default function Payroll() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-header">Payroll</h1>
        <p className="page-subheader">Salary management, payslips, and financial overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Monthly Payroll" value={`$${(totalPayroll / 12 / 1000).toFixed(0)}K`} change={3.4} icon={Wallet} />
        <KPICard title="Avg Salary" value={`$${Math.floor(totalPayroll / employees.length / 1000)}K`} change={5.2} icon={DollarSign} />
        <KPICard title="Total Bonuses" value="$128K" change={15.8} icon={TrendingUp} />
        <KPICard title="Tax Deducted" value="$312K" icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Monthly Payroll Expenses</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyPayroll}>
              <defs>
                <linearGradient id="payGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(72, 100%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(72, 100%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 18%)" />
              <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" fontSize={12} />
              <YAxis stroke="hsl(220, 10%, 45%)" fontSize={12} tickFormatter={v => `$${v / 1000}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="total" stroke="hsl(72, 100%, 50%)" fill="url(#payGrad)" strokeWidth={2} name="Total" />
              <Area type="monotone" dataKey="bonuses" stroke="hsl(187, 80%, 50%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" name="Bonuses" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3 className="text-sm font-semibold mb-4">Salary by Department</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={salaryDist}>
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
      </div>

      {/* Payroll Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <h3 className="text-sm font-semibold">Recent Payslips</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Employee</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Month</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">Base</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">Bonus</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">Deductions</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">Tax</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase px-4 py-3">Net Pay</th>
              </tr>
            </thead>
            <tbody>
              {payroll.slice(0, 20).map((p, i) => {
                const emp = employees.find(e => e.id === p.employeeId);
                return (
                  <tr key={p.id} className="border-b border-border/50 table-row-hover">
                    <td className="px-4 py-3 text-sm font-medium">{emp?.name || 'Unknown'}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{p.month}</td>
                    <td className="px-4 py-3 text-sm text-right">${p.baseSalary.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-emerald-400">{p.bonus > 0 ? `+$${p.bonus.toLocaleString()}` : '—'}</td>
                    <td className="px-4 py-3 text-sm text-right text-red-400">-${p.deductions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right text-muted-foreground">-${p.tax.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-right font-semibold">${p.netPay.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
