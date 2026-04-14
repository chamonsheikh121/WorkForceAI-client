import { UserRole } from '@/context/AuthContext';
import {
  LayoutDashboard, Users, CalendarCheck, FolderKanban, Clock, CalendarOff,
  UserPlus, Wallet, BarChart3, Brain, Settings, HelpCircle, FileText, Building2, CreditCard,
  Link as LinkIcon, TrendingUp, Activity, MessageCircle, CheckSquare
} from 'lucide-react';

interface NavItem {
  icon: any;
  label: string;
  path: string;
  roles: UserRole[];
  description?: string;
}

// Platform Owner Navigation - only Dashboard
const platformOwnerNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
    roles: ['platform_owner'],
    description: 'Platform overview',
  },
  {
    icon: Building2,
    label: 'Companies',
    path: '/platform-companies',
    roles: ['platform_owner'],
    description: 'Manage all companies',
  },
  {
    icon: CreditCard,
    label: 'Billing',
    path: '/platform-billing',
    roles: ['platform_owner'],
    description: 'Subscription and billing',
  },
  {
    icon: Users,
    label: 'Users',
    path: '/platform-users',
    roles: ['platform_owner'],
    description: 'Manage system users',
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/platform-settings',
    roles: ['platform_owner'],
    description: 'System configuration',
  },
  {
    icon: LinkIcon,
    label: 'Integrations',
    path: '/platform-integrations',
    roles: ['platform_owner'],
    description: 'Third-party integrations',
  },
  {
    icon: TrendingUp,
    label: 'Analytics',
    path: '/platform-analytics',
    roles: ['platform_owner'],
    description: 'SaaS metrics and insights',
  },
  {
    icon: Activity,
    label: 'Logs',
    path: '/platform-logs',
    roles: ['platform_owner'],
    description: 'System logs and monitoring',
  },
  {
    icon: MessageCircle,
    label: 'Support',
    path: '/platform-support',
    roles: ['platform_owner'],
    description: 'Support tickets',
  },
];

// Company/Employee Navigation
const companyEmployeeNavItems: NavItem[] = [
  {
    icon: LayoutDashboard,
    label: 'Dashboard',
    path: '/dashboard',
    roles: ['company', 'employee'],
    description: 'Overview and key metrics',
  },
  {
    icon: Users,
    label: 'Employees',
    path: '/employees',
    roles: ['company', 'company_hr'],
    description: 'Manage all employees',
  },
  {
    icon: CalendarCheck,
    label: 'Attendance',
    path: '/attendance',
    roles: ['company', 'company_hr'],
    description: 'Track attendance records',
  },
  {
    icon: FolderKanban,
    label: 'Projects',
    path: '/projects',
    roles: ['company', 'company_hr', 'employee'],
    description: 'Manage projects',
  },
  {
    icon: CheckSquare,
    label: 'My Tasks',
    path: '/my-tasks',
    roles: ['employee'],
    description: 'Assigned tasks',
  },
  {
    icon: Clock,
    label: 'Time Tracking',
    path: '/time-tracking',
    roles: ['company', 'company_hr', 'employee'],
    description: 'Track work hours',
  },
  {
    icon: CalendarOff,
    label: 'Leave Management',
    path: '/leave',
    roles: ['company', 'company_hr'],
    description: 'Manage employee leave',
  },
  {
    icon: FileText,
    label: 'Leave Application',
    path: '/leave-application',
    roles: ['employee'],
    description: 'Apply for leave',
  },
  {
    icon: UserPlus,
    label: 'Recruitment',
    path: '/recruitment',
    roles: ['company', 'company_hr'],
    description: 'Manage hiring',
  },
  {
    icon: Wallet,
    label: 'Payroll',
    path: '/payroll',
    roles: ['company'],
    description: 'Manage salaries',
  },
  {
    icon: BarChart3,
    label: 'Reports',
    path: '/reports',
    roles: ['company'],
    description: 'View analytics',
  },
  {
    icon: Brain,
    label: 'AI Insights',
    path: '/ai-insights',
    roles: ['company'],
    description: 'AI-powered analytics',
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings',
    roles: ['company', 'company_hr', 'employee'],
    description: 'System settings',
  },
  {
    icon: HelpCircle,
    label: 'Support',
    path: '/support',
    roles: ['company', 'company_hr', 'employee'],
    description: 'Get help',
  },
];

const allNavItems: NavItem[] = [...platformOwnerNavItems, ...companyEmployeeNavItems];

export const useRoleBasedNavigation = (userRole?: UserRole) => {
  if (!userRole) return [];
  return allNavItems.filter((item) => item.roles.includes(userRole));
};

export const getAllNavItems = () => allNavItems;
