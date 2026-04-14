import { useState } from 'react';
import { MessageCircle, Plus, Search, Filter, Clock, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface Ticket {
  id: string;
  title: string;
  company: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  created: string;
  updated: string;
  replies: number;
  lastReply: string;
  description: string;
}

interface TicketReply {
  id: string;
  author: string;
  role: 'company' | 'support';
  timestamp: string;
  message: string;
}

const tickets: Ticket[] = [
  {
    id: 'TKT-001',
    title: 'Cannot upload files larger than 5GB',
    company: 'Acme Corporation',
    status: 'open',
    priority: 'high',
    created: '2026-04-14 10:30',
    updated: '2 hours ago',
    replies: 2,
    lastReply: 'Support Agent',
    description: 'Users are unable to upload files larger than 5GB. Error: File too large.',
  },
  {
    id: 'TKT-002',
    title: 'Integration with Slack not working',
    company: 'TechVision Inc',
    status: 'in-progress',
    priority: 'high',
    created: '2026-04-13 15:20',
    updated: '1 hour ago',
    replies: 5,
    lastReply: 'TechVision Inc',
    description: 'Slack integration keeps disconnecting after 24 hours.',
  },
  {
    id: 'TKT-003',
    title: 'Feature request: Custom reports',
    company: 'GlobalTech Solutions',
    status: 'open',
    priority: 'medium',
    created: '2026-04-12 09:15',
    updated: '20 hours ago',
    replies: 1,
    lastReply: 'GlobalTech Solutions',
    description: 'Request to add custom report builder with drag-and-drop interface.',
  },
  {
    id: 'TKT-004',
    title: 'Dashboard loading slowly',
    company: 'Acme Corporation',
    status: 'resolved',
    priority: 'medium',
    created: '2026-04-11 12:00',
    updated: '3 hours ago',
    replies: 8,
    lastReply: 'Support Agent',
    description: 'Dashboard takes 15+ seconds to load with 10k+ data points.',
  },
  {
    id: 'TKT-005',
    title: 'User permissions issue',
    company: 'TechVision Inc',
    status: 'closed',
    priority: 'low',
    created: '2026-04-10 14:45',
    updated: '1 day ago',
    replies: 3,
    lastReply: 'Support Agent',
    description: 'Admin user unable to assign roles to team members.',
  },
];

const ticketReplies: TicketReply[] = [
  {
    id: 'reply_001',
    author: 'Sarah Chen (TechVision Inc)',
    role: 'company',
    timestamp: '1 hour ago',
    message: 'The Slack integration disconnected again this morning. This is affecting our team notifications.',
  },
  {
    id: 'reply_002',
    author: 'Alex Kumar (Support)',
    role: 'support',
    timestamp: '30 minutes ago',
    message: 'Thank you for reporting this. We\'ve identified the issue - Slack token validation was failing due to a recent API change. We\'ve deployed a fix and the integration should now work correctly. Please reconnect your Slack workspace.',
  },
  {
    id: 'reply_003',
    author: 'Sarah Chen (TechVision Inc)',
    role: 'company',
    timestamp: '15 minutes ago',
    message: 'Great! Reconnected successfully and it\'s working now. Thanks for the quick fix!',
  },
];

export default function PlatformSupport() {
  const [selectedTicketId, setSelectedTicketId] = useState('TKT-002');
  const [newReply, setNewReply] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [createTicketDialog, setCreateTicketDialog] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    priority: 'medium',
    description: '',
  });

  const selectedTicket = tickets.find(t => t.id === selectedTicketId);

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      'in-progress': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      resolved: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      closed: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const styles: Record<string, string> = {
      low: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
      medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
      high: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
      urgent: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };
    return <Badge className={styles[priority]}>{priority}</Badge>;
  };

  const stats = {
    open: tickets.filter(t => t.status === 'open').length,
    inProgress: tickets.filter(t => t.status === 'in-progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
  };

  const handleCreateTicket = () => {
    if (formData.company && formData.title && formData.description) {
      // Reset form and close dialog
      setFormData({
        company: '',
        title: '',
        priority: 'medium',
        description: '',
      });
      setCreateTicketDialog(false);
      // Show success feedback (in production, would add to tickets array and API call)
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            Support Tickets
          </h1>
          <p className="text-muted-foreground mt-2">Manage company support requests and issues</p>
        </div>
        <Button onClick={() => setCreateTicketDialog(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{stats.open}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{stats.inProgress}</div>
            <p className="text-xs text-muted-foreground mt-1">Being worked on</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{stats.resolved}</div>
            <p className="text-xs text-muted-foreground mt-1">Fixed this month</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2.4h</div>
            <p className="text-xs text-muted-foreground mt-1">Within SLA ✓</p>
          </CardContent>
        </Card>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <Card className="border-border/50 lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm">Tickets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-8 border-border/50 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="space-y-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="h-8 border-border/50 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="h-8 border-border/50 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tickets */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredTickets.map(ticket => (
                <button
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedTicketId === ticket.id
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                      : 'border-border/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-600">{ticket.id}</span>
                    {getPriorityBadge(ticket.priority)}
                  </div>
                  <p className="text-sm font-medium line-clamp-2">{ticket.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{ticket.company}</p>
                  <div className="flex items-center justify-between mt-2">
                    {getStatusBadge(ticket.status)}
                    <span className="text-xs text-muted-foreground">{ticket.replies} replies</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Ticket Details */}
        {selectedTicket && (
          <Card className="border-border/50 lg:col-span-2">
            <CardHeader>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-mono font-bold text-blue-600">{selectedTicket.id}</span>
                      {getStatusBadge(selectedTicket.status)}
                      {getPriorityBadge(selectedTicket.priority)}
                    </div>
                    <CardTitle>{selectedTicket.title}</CardTitle>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="text-muted-foreground mb-1">Company</p>
                    <p className="font-medium">{selectedTicket.company}</p>
                  </div>
                  <div className="p-2 bg-muted/50 rounded">
                    <p className="text-muted-foreground mb-1">Created</p>
                    <p className="font-medium">{selectedTicket.created}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Description</p>
                  <p className="text-sm">{selectedTicket.description}</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 border-t border-border/50 pt-4">
              {/* Conversation */}
              <div className="space-y-4">
                <p className="text-sm font-semibold">{ticketReplies.length} Replies</p>
                {ticketReplies.map(reply => (
                  <div
                    key={reply.id}
                    className={`p-3 rounded-lg border ${
                      reply.role === 'support'
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200/50 dark:border-blue-800/50'
                        : 'bg-muted/30 border-border/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-medium">{reply.author}</p>
                      <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                    </div>
                    <p className="text-sm text-foreground">{reply.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              <div className="space-y-2 border-t border-border/50 pt-4">
                <Label htmlFor="reply" className="text-sm font-semibold">Your Reply</Label>
                <Textarea
                  id="reply"
                  placeholder="Type your response..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="border-border/50 resize-none"
                  rows={3}
                />
                <div className="flex gap-2 justify-end">
                  <Button variant="outline" size="sm">
                    Close Ticket
                  </Button>
                  <Button size="sm" className="gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* New Ticket Dialog */}
      <Dialog open={createTicketDialog} onOpenChange={setCreateTicketDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Support Ticket</DialogTitle>
            <DialogDescription>
              Create a new support ticket for internal tracking
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Select value={formData.company} onValueChange={(value) => setFormData({...formData, company: value})}>
                <SelectTrigger id="company" className="border-border/50">
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="acme">Acme Corporation</SelectItem>
                  <SelectItem value="techvision">TechVision Inc</SelectItem>
                  <SelectItem value="globaltech">GlobalTech Solutions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                placeholder="Brief description of the issue" 
                className="border-border/50" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger id="priority" className="border-border/50">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Detailed description of the issue"
                className="border-border/50"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setCreateTicketDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTicket} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Ticket
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
