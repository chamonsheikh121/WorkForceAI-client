import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  iconColor?: string;
}

export default function KPICard({ title, value, change, icon: Icon, iconColor = 'text-primary' }: KPICardProps) {
  const isPositive = change && change > 0;

  return (
    <div className="kpi-card animate-fade-in group hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className={`w-10 h-10 rounded-lg bg-secondary/60 flex items-center justify-center group-hover:bg-primary/10 transition-colors ${iconColor}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="space-y-1">
        <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span>{Math.abs(change)}% from last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
