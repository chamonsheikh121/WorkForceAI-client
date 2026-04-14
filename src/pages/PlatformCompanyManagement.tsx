import { useState } from 'react';
import { Search, ArrowUpDown, Eye, Shield, LogIn, Zap, Clock, MoreVertical, Mail, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface Company {
  id: number;
  name: string;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  users: number;
  status: 'Active' | 'Suspended';
  createdAt: string;
  lastActivity: string;
  revenue: number;
  email: string;
  admin: string;
  subscriptionDate: string;
  renewalDate: string;
}

interface CompanyDetails extends Company {
  usersList: { id: number; name: string; email: string; role: string; status: string }[];
  subscriptionHistory: { date: string; plan: string; amount: number; status: string }[];
  activityLogs: { date: string; action: string; details: string }[];
}

const mockCompanies: Company[] = [
  {
    id: 1,
    name: 'Acme Corporation',
    plan: 'Enterprise',
    users: 42,
    status: 'Active',
    createdAt: '2024-01-15',
    lastActivity: '2m ago',
    revenue: 1500,
    email: 'admin@acme.com',
    admin: 'John Smith',
    subscriptionDate: '2024-01-15',
    renewalDate: '2024-07-15',
  },
  {
    id: 2,
    name: 'Tech Innovations',
    plan: 'Professional',
    users: 28,
    status: 'Active',
    createdAt: '2024-02-20',
    lastActivity: '45m ago',
    revenue: 800,
    email: 'info@techinnovations.com',
    admin: 'Sarah Johnson',
    subscriptionDate: '2024-02-20',
    renewalDate: '2024-08-20',
  },
  {
    id: 3,
    name: 'Global Solutions',
    plan: 'Enterprise',
    users: 35,
    status: 'Active',
    createdAt: '2024-03-10',
    lastActivity: '3h ago',
    revenue: 1500,
    email: 'admin@globalsolutions.com',
    admin: 'Mike Chen',
    subscriptionDate: '2024-03-10',
    renewalDate: '2024-09-10',
  },
  {
    id: 4,
    name: 'StartUp Labs',
    plan: 'Starter',
    users: 8,
    status: 'Suspended',
    createdAt: '2024-05-15',
    lastActivity: '2d ago',
    revenue: 0,
    email: 'contact@startuplabs.com',
    admin: 'Alex Rivera',
    subscriptionDate: '2024-05-15',
    renewalDate: '2024-05-20',
  },
  {
    id: 5,
    name: 'Innovation Hub',
    plan: 'Professional',
    users: 19,
    status: 'Active',
    createdAt: '2024-06-01',
    lastActivity: '1h ago',
    revenue: 800,
    email: 'support@innovationhub.com',
    admin: 'Emma Wilson',
    subscriptionDate: '2024-06-01',
    renewalDate: '2024-12-01',
  },
];

const mockCompanyDetails: Record<number, CompanyDetails> = {
  1: {
    ...mockCompanies[0],
    usersList: [
      { id: 1, name: 'John Smith', email: 'john@acme.com', role: 'Admin', status: 'Active' },
      { id: 2, name: 'Jane Doe', email: 'jane@acme.com', role: 'Manager', status: 'Active' },
      { id: 3, name: 'Bob Wilson', email: 'bob@acme.com', role: 'Employee', status: 'Active' },
    ],
    subscriptionHistory: [
      { date: '2024-01-15', plan: 'Professional', amount: 500, status: 'Completed' },
      { date: '2024-02-15', plan: 'Enterprise', amount: 1500, status: 'Completed' },
      { date: '2024-03-15', plan: 'Enterprise', amount: 1500, status: 'Completed' },
    ],
    activityLogs: [
      { date: '2024-06-14', action: 'Login', details: 'Admin user logged in' },
      { date: '2024-06-14', action: 'Users Added', details: '3 new employees added' },
      { date: '2024-06-13', action: 'Payroll Run', details: 'Monthly payroll processed' },
    ],
  },
};

const getPlanBadgeColor = (plan: string) => {
  switch (plan) {
    case 'Enterprise': return 'bg-purple-500/10 text-purple-600 border-purple-200';
    case 'Professional': return 'bg-blue-500/10 text-blue-600 border-blue-200';
    case 'Starter': return 'bg-green-500/10 text-green-600 border-green-200';
    default: return 'bg-gray-500/10 text-gray-600';
  }
};

const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case 'Active': return 'bg-green-500/10 text-green-600 border-green-200';
    case 'Suspended': return 'bg-red-500/10 text-red-600 border-red-200';
    default: return 'bg-gray-500/10 text-gray-600';
  }
};

export default function PlatformCompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('activity');
  const [selectedCompany, setSelectedCompany] = useState<CompanyDetails | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailModalCompany, setEmailModalCompany] = useState<Company | null>(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Filter and search
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === 'all' || company.plan === planFilter;
    const matchesStatus = statusFilter === 'all' || company.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  // Sort
  const sortedCompanies = [...filteredCompanies].sort((a, b) => {
    if (sortBy === 'revenue') return b.revenue - a.revenue;
    if (sortBy === 'users') return b.users - a.users;
    return 0;
  });

  const handleViewDetails = (company: Company) => {
    const details = mockCompanyDetails[company.id] || {
      ...company,
      usersList: [],
      subscriptionHistory: [],
      activityLogs: [],
    };
    setSelectedCompany(details);
    setIsDrawerOpen(true);
  };

  const handleSuspend = (companyId: number) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, status: 'Suspended' as const } : c
    ));
  };

  const handleActivate = (companyId: number) => {
    setCompanies(companies.map(c => 
      c.id === companyId ? { ...c, status: 'Active' as const } : c
    ));
  };

  const handleOpenEmailModal = (company: Company) => {
    setEmailModalCompany(company);
    setEmailSubject('Important Update Regarding Your Subscription');
    setEmailBody(`Dear ${company.admin},\n\nI hope this message finds you well. We wanted to reach out regarding your account with us.\n\n[Your message here]\n\nBest regards,\nWorkForceAI Team`);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = () => {
    if (emailModalCompany && emailSubject && emailBody) {
      console.log('Email sent to:', emailModalCompany.email);
      console.log('Subject:', emailSubject);
      console.log('Body:', emailBody);
      setIsEmailModalOpen(false);
      setEmailSubject('');
      setEmailBody('');
      setEmailModalCompany(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Company Management</h1>
        <p className="text-muted-foreground mt-1">Manage all companies on your platform</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{mockCompanies.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Companies</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{mockCompanies.filter(c => c.status === 'Active').length}</div>
            <p className="text-sm text-muted-foreground mt-1">Active</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">${mockCompanies.reduce((sum, c) => sum + c.revenue, 0).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-1">Total MRR</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold">{mockCompanies.reduce((sum, c) => sum + c.users, 0)}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Users</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by company name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters and Sort */}
              <div className="flex gap-2">
                <Select value={planFilter} onValueChange={setPlanFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="Starter">Starter</SelectItem>
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">Last Activity</SelectItem>
                    <SelectItem value="revenue">Revenue</SelectItem>
                    <SelectItem value="users">Users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Showing {sortedCompanies.length} of {mockCompanies.length} companies
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Companies Table */}
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
        <CardHeader>
          <CardTitle>Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Company</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold">Users</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Created</th>
                  <th className="text-left py-3 px-4 font-semibold">Last Activity</th>
                  <th className="text-left py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedCompanies.map((company) => (
                  <tr
                    key={company.id}
                    className="border-b hover:bg-secondary/30 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-foreground">{company.name}</p>
                        <p className="text-xs text-muted-foreground">{company.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getPlanBadgeColor(company.plan)} border`}>
                        {company.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{company.users}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusBadgeColor(company.status)} border`}>
                        {company.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{company.createdAt}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {company.lastActivity}
                    </td>
                    <td className="py-3 px-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-1.5 rounded-lg hover:bg-secondary/60 transition-colors">
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => handleViewDetails(company)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {company.status === 'Active' ? (
                            <DropdownMenuItem onClick={() => handleSuspend(company.id)} className="text-red-600">
                              <Shield className="w-4 h-4 mr-2" />
                              Suspend Company
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleActivate(company.id)} className="text-green-600">
                              <Zap className="w-4 h-4 mr-2" />
                              Activate Company
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleOpenEmailModal(company)}>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Company Details Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent side="right" className="w-full sm:w-[900px] overflow-y-auto">
          {selectedCompany && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedCompany.name}</SheetTitle>
                <SheetDescription>{selectedCompany.email}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* Company Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Admin</p>
                      <p className="font-medium">{selectedCompany.admin}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Plan</p>
                      <p className="font-medium">{selectedCompany.plan}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge className={getStatusBadgeColor(selectedCompany.status)}>
                        {selectedCompany.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Users</p>
                      <p className="font-medium">{selectedCompany.users}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Subscription Start</p>
                      <p className="font-medium">{selectedCompany.subscriptionDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Renewal Date</p>
                      <p className="font-medium">{selectedCompany.renewalDate}</p>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="users" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="users">Users</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>

                  {/* Users Tab */}
                  <TabsContent value="users" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      {selectedCompany.usersList.map((user) => (
                        <div
                          key={user.id}
                          className="p-3 rounded-lg border border-border/30 bg-background/40 hover:bg-background/60 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="flex gap-2">
                              <Badge variant="outline" className="text-xs">{user.role}</Badge>
                              <Badge className={user.status === 'Active' ? 'bg-green-500/20 text-green-600' : 'bg-gray-500/20 text-gray-600'} variant="outline">
                                {user.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Subscription Tab */}
                  <TabsContent value="subscription" className="space-y-4 mt-4">
                    <div className="space-y-3">
                      {selectedCompany.subscriptionHistory.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-border/30 bg-background/40 hover:bg-background/60 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{sub.plan} Plan</p>
                              <p className="text-xs text-muted-foreground">{sub.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm">${sub.amount}</p>
                              <Badge
                                className={sub.status === 'Completed' ? 'bg-green-500/20 text-green-600' : 'bg-yellow-500/20 text-yellow-600'}
                                variant="outline"
                              >
                                {sub.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  {/* Activity Tab */}
                  <TabsContent value="activity" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      {selectedCompany.activityLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg border border-border/30 bg-background/40 hover:bg-background/60 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-sm">{log.action}</p>
                              <p className="text-xs text-muted-foreground">{log.details}</p>
                            </div>
                            <p className="text-xs text-muted-foreground">{log.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                {/* Quick Actions */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-semibold">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      🔄 Upgrade Plan
                    </Button>
                    <Button variant="outline" className="w-full">
                      🔐 Impersonate
                    </Button>
                    {selectedCompany.status === 'Active' ? (
                      <Button
                        variant="outline"
                        className="w-full text-red-600 hover:text-red-600"
                        onClick={() => {
                          handleSuspend(selectedCompany.id);
                          setIsDrawerOpen(false);
                        }}
                      >
                        ⛔ Suspend Company
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        className="w-full text-green-600 hover:text-green-600"
                        onClick={() => {
                          handleActivate(selectedCompany.id);
                          setIsDrawerOpen(false);
                        }}
                      >
                        ✅ Activate Company
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleOpenEmailModal(selectedCompany)}
                    >
                      📧 Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Email Modal */}
      <Dialog open={isEmailModalOpen} onOpenChange={setIsEmailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Send Email to {emailModalCompany?.name}
            </DialogTitle>
            <DialogDescription>
              Send a message to {emailModalCompany?.admin} at {emailModalCompany?.email}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* From */}
            <div className="space-y-2">
              <label className="text-sm font-medium">From</label>
              <div className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm">
                support@workforceai.com
              </div>
            </div>

            {/* To */}
            <div className="space-y-2">
              <label className="text-sm font-medium">To</label>
              <div className="px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm">
                {emailModalCompany?.email}
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label htmlFor="email-subject" className="text-sm font-medium">Subject</label>
              <Input
                id="email-subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="Email subject..."
                className="border-border/50"
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label htmlFor="email-body" className="text-sm font-medium">Message</label>
              <Textarea
                id="email-body"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Write your message here..."
                rows={10}
                className="border-border/50 resize-none"
              />
            </div>

            {/* Email Templates */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Templates</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmailSubject('Account Status Update');
                    setEmailBody(`Dear ${emailModalCompany?.admin},\n\nWe're writing to inform you about important updates regarding your WorkForceAI account.\n\nPlease review the attached details and let us know if you have any questions.\n\nBest regards,\nWorkForceAI Support Team`);
                  }}
                >
                  📋 Account Update
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmailSubject('Plan Upgrade Recommendation');
                    setEmailBody(`Dear ${emailModalCompany?.admin},\n\nBased on your recent usage, we believe an upgraded plan could better serve your organization's needs.\n\nLet's discuss which plan works best for you.\n\nBest regards,\nWorkForceAI Team`);
                  }}
                >
                  📈 Upgrade Offer
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmailSubject('Urgent: Action Required');
                    setEmailBody(`Dear ${emailModalCompany?.admin},\n\nWe need your immediate attention on the following matter:\n\n[Details]\n\nPlease reply at your earliest convenience.\n\nBest regards,\nWorkForceAI Team`);
                  }}
                >
                  ⚠️ Urgent
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEmailSubject('Welcome to WorkForceAI!');
                    setEmailBody(`Dear ${emailModalCompany?.admin},\n\nWelcome to WorkForceAI! We're excited to have you on board.\n\nWe're here to support you every step of the way.\n\nBest regards,\nWorkForceAI Team`);
                  }}
                >
                  🎉 Welcome
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEmailModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSendEmail} className="gap-2">
              <Mail className="w-4 h-4" />
              Send Email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
