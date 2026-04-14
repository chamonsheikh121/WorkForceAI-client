import { useState } from 'react';
import { Search, MoreVertical, AlertTriangle, Lock, RotateCcw, UserX, UserCheck, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'company_admin' | 'company_user' | 'employee' | 'platform_admin';
  status: 'active' | 'suspended' | 'banned';
  lastLogin: string;
  suspiciousActivity: boolean;
  activityFlags: string[];
  createdAt: string;
}

interface RoleChangeDialogProps {
  open: boolean;
  user: SystemUser | null;
  onClose: () => void;
  onConfirm: (newRole: string) => void;
}

interface PasswordResetDialogProps {
  open: boolean;
  user: SystemUser | null;
  onClose: () => void;
  onConfirm: () => void;
}

const initialUsers: SystemUser[] = [
  {
    id: 'user_001',
    name: 'John Anderson',
    email: 'john.anderson@acmecorp.com',
    company: 'Acme Corporation',
    role: 'company_admin',
    status: 'active',
    lastLogin: '2 hours ago',
    suspiciousActivity: false,
    activityFlags: [],
    createdAt: '2025-01-15',
  },
  {
    id: 'user_002',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@techvision.com',
    company: 'TechVision Inc',
    role: 'company_user',
    status: 'active',
    lastLogin: '30 minutes ago',
    suspiciousActivity: true,
    activityFlags: ['Multiple failed logins', 'Unusual location'],
    createdAt: '2025-02-20',
  },
  {
    id: 'user_003',
    name: 'Michael Chen',
    email: 'michael.chen@acmecorp.com',
    company: 'Acme Corporation',
    role: 'employee',
    status: 'suspended',
    lastLogin: '5 days ago',
    suspiciousActivity: false,
    activityFlags: [],
    createdAt: '2025-01-10',
  },
  {
    id: 'user_004',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@globaltech.com',
    company: 'GlobalTech Solutions',
    role: 'company_admin',
    status: 'active',
    lastLogin: '1 hour ago',
    suspiciousActivity: true,
    activityFlags: ['Mass data download', 'Disabled 2FA'],
    createdAt: '2025-03-05',
  },
  {
    id: 'user_005',
    name: 'James Wilson',
    email: 'james.wilson@techvision.com',
    company: 'TechVision Inc',
    role: 'employee',
    status: 'banned',
    lastLogin: '10 days ago',
    suspiciousActivity: true,
    activityFlags: ['Unauthorized access attempt', 'IP mismatch'],
    createdAt: '2024-12-01',
  },
  {
    id: 'user_006',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@acmecorp.com',
    company: 'Acme Corporation',
    role: 'company_user',
    status: 'active',
    lastLogin: '15 minutes ago',
    suspiciousActivity: false,
    activityFlags: [],
    createdAt: '2025-02-10',
  },
  {
    id: 'user_007',
    name: 'David Kumar',
    email: 'david.kumar@globaltech.com',
    company: 'GlobalTech Solutions',
    role: 'platform_admin',
    status: 'active',
    lastLogin: '1 minute ago',
    suspiciousActivity: false,
    activityFlags: [],
    createdAt: '2025-01-01',
  },
];

const RoleChangeDialog: React.FC<RoleChangeDialogProps> = ({ open, user, onClose, onConfirm }) => {
  const [selectedRole, setSelectedRole] = useState<string>(user?.role || '');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-500" />
            Change User Role
          </DialogTitle>
          <DialogDescription>
            Update role for {user?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Current Role: <span className="text-muted-foreground">{user?.role}</span></label>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">New Role</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="company_admin">Company Admin</SelectItem>
                <SelectItem value="company_user">Company User</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
                <SelectItem value="platform_admin">Platform Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={() => onConfirm(selectedRole)} className="gap-2">
            <Lock className="w-4 h-4" />
            Update Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const PasswordResetDialog: React.FC<PasswordResetDialogProps> = ({ open, user, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-orange-500" />
            Reset Password
          </DialogTitle>
          <DialogDescription>
            Send password reset link to {user?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
            <p className="text-sm text-orange-900 dark:text-orange-100">
              A password reset email will be sent to <span className="font-semibold">{user?.email}</span>
            </p>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm} className="gap-2 bg-orange-600 hover:bg-orange-700">
            <RotateCcw className="w-4 h-4" />
            Send Reset Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function PlatformUserControl() {
  const [users, setUsers] = useState<SystemUser[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompanyFilter, setSelectedCompanyFilter] = useState<string>('all');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [roleChangeDialog, setRoleChangeDialog] = useState({ open: false, user: null as SystemUser | null });
  const [passwordResetDialog, setPasswordResetDialog] = useState({ open: false, user: null as SystemUser | null });

  // Get unique companies
  const companies = Array.from(new Set(users.map(u => u.company)));

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = selectedCompanyFilter === 'all' || user.company === selectedCompanyFilter;
    const matchesRole = selectedRoleFilter === 'all' || user.role === selectedRoleFilter;
    return matchesSearch && matchesCompany && matchesRole;
  });

  const handleBanUnban = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status: u.status === 'banned' ? 'active' : 'banned',
        };
      }
      return u;
    }));
  };

  const handleSuspend = (userId: string) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return {
          ...u,
          status: u.status === 'suspended' ? 'active' : 'suspended',
        };
      }
      return u;
    }));
  };

  const handlePasswordReset = () => {
    // In real app, would trigger email
    setPasswordResetDialog({ open: false, user: null });
    // Show toast notification
  };

  const handleRoleChange = (newRole: string) => {
    if (roleChangeDialog.user) {
      setUsers(users.map(u => {
        if (u.id === roleChangeDialog.user!.id) {
          return {
            ...u,
            role: newRole as SystemUser['role'],
          };
        }
        return u;
      }));
    }
    setRoleChangeDialog({ open: false, user: null });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600/20 text-green-700 dark:text-green-400 hover:bg-green-600/30 border-green-600/30">Active</Badge>;
      case 'suspended':
        return <Badge className="bg-yellow-600/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-600/30 border-yellow-600/30">Suspended</Badge>;
      case 'banned':
        return <Badge className="bg-red-600/20 text-red-700 dark:text-red-400 hover:bg-red-600/30 border-red-600/30">Banned</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getRoleBadge = (role: string) => {
    const roleColors: Record<string, string> = {
      platform_admin: 'bg-purple-600/20 text-purple-700 dark:text-purple-400 border-purple-600/30',
      company_admin: 'bg-blue-600/20 text-blue-700 dark:text-blue-400 border-blue-600/30',
      company_user: 'bg-cyan-600/20 text-cyan-700 dark:text-cyan-400 border-cyan-600/30',
      employee: 'bg-slate-600/20 text-slate-700 dark:text-slate-400 border-slate-600/30',
    };
    return (
      <Badge className={`${roleColors[role]} hover:${roleColors[role]}`}>
        {role.replace('_', ' ')}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global User Control</h1>
        <p className="text-muted-foreground mt-2">Manage system-level users and monitor suspicious activity</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active system users</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Suspended</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">{users.filter(u => u.status === 'suspended').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Temporarily suspended</p>
          </CardContent>
        </Card>

        <Card className="border-red-600/30 bg-red-50/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Suspicious Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">{users.filter(u => u.suspiciousActivity).length}</div>
            <p className="text-xs text-muted-foreground mt-1">Flagged for review</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Search and filter system-level users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar and Filters - Same Row */}
            <div className="flex gap-3 flex-wrap items-end">
              {/* Search Bar */}
              <div className="relative flex-1 min-w-[250px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  className="pl-8 border-border/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Company Filter */}
              <div className="flex-1 min-w-[180px]">
                <Select value={selectedCompanyFilter} onValueChange={setSelectedCompanyFilter}>
                  <SelectTrigger className="border-border/50">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Companies</SelectItem>
                    {companies.map(company => (
                      <SelectItem key={company} value={company}>{company}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Role Filter */}
              <div className="flex-1 min-w-[180px]">
                <Select value={selectedRoleFilter} onValueChange={setSelectedRoleFilter}>
                  <SelectTrigger className="border-border/50">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="platform_admin">Platform Admin</SelectItem>
                    <SelectItem value="company_admin">Company Admin</SelectItem>
                    <SelectItem value="company_user">Company User</SelectItem>
                    <SelectItem value="employee">Employee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="border-b border-border/50 bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="font-semibold">Name</TableHead>
                  <TableHead className="font-semibold">Email</TableHead>
                  <TableHead className="font-semibold">Company</TableHead>
                  <TableHead className="font-semibold">Role</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Last Login</TableHead>
                  <TableHead className="font-semibold text-center">Alerts</TableHead>
                  <TableHead className="font-semibold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-border/50 hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                    <TableCell className="text-sm">{user.company}</TableCell>
                    <TableCell>
                      {getRoleBadge(user.role)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{user.lastLogin}</TableCell>
                    <TableCell className="text-center">
                      {user.suspiciousActivity ? (
                        <div className="flex items-center justify-center gap-1">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-semibold text-red-600">Alert</span>
                        </div>
                      ) : (
                        <span className="text-xs text-green-600">✓ Safe</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          {user.suspiciousActivity && (
                            <>
                              <div className="px-2 py-1.5 text-xs font-semibold text-red-600 flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                Suspicious Flags:
                              </div>
                              {user.activityFlags.map((flag, idx) => (
                                <div key={idx} className="px-2 py-1 text-xs text-muted-foreground ml-2">
                                  • {flag}
                                </div>
                              ))}
                              <DropdownMenuSeparator />
                            </>
                          )}

                          <DropdownMenuItem onClick={() => setPasswordResetDialog({ open: true, user })}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => setRoleChangeDialog({ open: true, user })}>
                            <Lock className="w-4 h-4 mr-2" />
                            Change Role
                          </DropdownMenuItem>

                          <DropdownMenuSeparator />

                          <DropdownMenuItem
                            onClick={() => handleSuspend(user.id)}
                            className={user.status === 'suspended' ? 'text-green-600' : 'text-yellow-600'}
                          >
                            <UserX className="w-4 h-4 mr-2" />
                            {user.status === 'suspended' ? 'Unsuspend' : 'Suspend'}
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => handleBanUnban(user.id)}
                            className={user.status === 'banned' ? 'text-green-600' : 'text-red-600'}
                          >
                            <UserCheck className="w-4 h-4 mr-2" />
                            {user.status === 'banned' ? 'Unban' : 'Ban'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <RoleChangeDialog
        open={roleChangeDialog.open}
        user={roleChangeDialog.user}
        onClose={() => setRoleChangeDialog({ open: false, user: null })}
        onConfirm={handleRoleChange}
      />

      <PasswordResetDialog
        open={passwordResetDialog.open}
        user={passwordResetDialog.user}
        onClose={() => setPasswordResetDialog({ open: false, user: null })}
        onConfirm={handlePasswordReset}
      />
    </div>
  );
}
