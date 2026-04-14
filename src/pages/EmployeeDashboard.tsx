import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, FileText, TrendingUp } from 'lucide-react';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    {
      title: 'Total Tasks',
      value: '12',
      change: '+2 this week',
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      title: 'Hours This Week',
      value: '40',
      change: 'On track',
      icon: Clock,
      color: 'bg-green-500/10 text-green-600',
    },
    {
      title: 'Leaves Used',
      value: '3/15',
      change: '12 remaining',
      icon: Calendar,
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      title: 'Performance',
      value: '95%',
      change: 'Excellent',
      icon: TrendingUp,
      color: 'bg-orange-500/10 text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's your work dashboard for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>Your active tasks this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg border border-border hover:bg-secondary/40 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="font-medium">Complete project milestone {i}</p>
                    <p className="text-sm text-muted-foreground">Due in {5 - i} days</p>
                  </div>
                  <Button variant="ghost" size="sm">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              className="w-full justify-start"
              variant="outline"
              onClick={() => navigate('/leave-application')}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Apply for Leave
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Clock className="w-4 h-4 mr-2" />
              Log Time
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Request Equipment
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcements */}
      <Card>
        <CardHeader>
          <CardTitle>Company Announcements</CardTitle>
          <CardDescription>Latest updates from management</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-medium text-sm">Office will be closed on April 14</p>
              <p className="text-xs text-muted-foreground mt-1">Posted 2 days ago</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-medium text-sm">New wellness program launched</p>
              <p className="text-xs text-muted-foreground mt-1">Posted 1 week ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
