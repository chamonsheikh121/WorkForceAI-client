import { useState } from 'react';
import { tasks, projects } from '@/data/mockData';
import { CheckCircle2, Clock, AlertCircle, ListTodo, Search, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import KPICard from '@/components/dashboard/KPICard';

interface TaskWithProject {
  id: string;
  title: string;
  projectId: string;
  projectName: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
}

const statusColors: Record<string, string> = {
  'todo': 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'review': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'done': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

const priorityColors: Record<string, string> = {
  'low': 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  'medium': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  'high': 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  'critical': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function MyTasks() {
  const [taskList, setTaskList] = useState<TaskWithProject[]>(
    tasks.map(task => ({
      ...task,
      projectName: projects.find(p => p.id === task.projectId)?.name || 'Unknown Project'
    }))
  );
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = taskList.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.projectName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: taskList.length,
    todo: taskList.filter(t => t.status === 'todo').length,
    inProgress: taskList.filter(t => t.status === 'in-progress').length,
    review: taskList.filter(t => t.status === 'review').length,
    done: taskList.filter(t => t.status === 'done').length,
  };

  const handleStatusChange = (taskId: string, newStatus: 'todo' | 'in-progress' | 'review' | 'done') => {
    setTaskList(taskList.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-header">My Tasks</h1>
        <p className="page-subheader">Track and manage your assigned tasks</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard title="Total Tasks" value={stats.total} icon={ListTodo} />
        <KPICard title="To Do" value={stats.todo} icon={Clock} />
        <KPICard title="In Progress" value={stats.inProgress} icon={AlertCircle} />
        <KPICard title="In Review" value={stats.review} icon={AlertCircle} />
        <KPICard title="Completed" value={stats.done} icon={CheckCircle2} />
      </div>

      {/* Tasks Table */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="border-0 bg-transparent placeholder-muted-foreground focus-visible:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Task Title</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Project</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Priority</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Due Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.slice(0, 100).map(task => (
                <tr key={task.id} className="border-b border-border/50 table-row-hover">
                  <td className="px-4 py-3 text-sm font-medium max-w-xs truncate">{task.title}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{task.projectName}</td>
                  <td className="px-4 py-3">
                    <Badge className={statusColors[task.status]}>
                      {task.status.replace('-', ' ')}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge className={priorityColors[task.priority]}>
                      {task.priority}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{task.dueDate}</td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {task.status !== 'todo' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'todo')}>
                            To Do
                          </DropdownMenuItem>
                        )}
                        {task.status !== 'in-progress' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'in-progress')}>
                            In Progress
                          </DropdownMenuItem>
                        )}
                        {task.status !== 'review' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'review')}>
                            Review
                          </DropdownMenuItem>
                        )}
                        {task.status !== 'done' && (
                          <DropdownMenuItem onClick={() => handleStatusChange(task.id, 'done')}>
                            Done
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
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
