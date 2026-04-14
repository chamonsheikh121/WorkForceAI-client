import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { useAuth, UserRole } from "@/context/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import PlatformCompanyManagement from "./pages/PlatformCompanyManagement";
import PlatformSubscriptionBilling from "./pages/PlatformSubscriptionBilling";
import PlatformUserControl from "./pages/PlatformUserControl";
import PlatformSettings from "./pages/PlatformSettings";
import PlatformIntegrations from "./pages/PlatformIntegrations";
import PlatformAnalytics from "./pages/PlatformAnalytics";
import PlatformLogs from "./pages/PlatformLogs";
import PlatformSupport from "./pages/PlatformSupport";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Projects from "./pages/Projects";
import TimeTracking from "./pages/TimeTracking";
import Leave from "./pages/Leave";
import LeaveApplication from "./pages/LeaveApplication";
import MyTasks from "./pages/MyTasks";
import Recruitment from "./pages/Recruitment";
import Payroll from "./pages/Payroll";
import Reports from "./pages/Reports";
import AIInsights from "./pages/AIInsights";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import CreatedBy from "./pages/CreatedBy";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: UserRole[] }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return <AppLayout>{children}</AppLayout>;
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/created-by" element={<CreatedBy />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/platform-companies" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformCompanyManagement /></ProtectedRoute>} />
      <Route path="/platform-billing" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformSubscriptionBilling /></ProtectedRoute>} />
      <Route path="/platform-users" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformUserControl /></ProtectedRoute>} />
      <Route path="/platform-settings" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformSettings /></ProtectedRoute>} />
      <Route path="/platform-integrations" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformIntegrations /></ProtectedRoute>} />
      <Route path="/platform-analytics" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformAnalytics /></ProtectedRoute>} />
      <Route path="/platform-logs" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformLogs /></ProtectedRoute>} />
      <Route path="/platform-support" element={<ProtectedRoute allowedRoles={['platform_owner']}><PlatformSupport /></ProtectedRoute>} />
      <Route path="/employees" element={<ProtectedRoute allowedRoles={['platform_owner', 'company', 'company_hr']}><Employees /></ProtectedRoute>} />
      <Route path="/attendance" element={<ProtectedRoute allowedRoles={['platform_owner', 'company', 'company_hr']}><Attendance /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/my-tasks" element={<ProtectedRoute allowedRoles={['employee']}><MyTasks /></ProtectedRoute>} />
      <Route path="/time-tracking" element={<ProtectedRoute><TimeTracking /></ProtectedRoute>} />
      <Route path="/leave" element={<ProtectedRoute allowedRoles={['platform_owner', 'company', 'company_hr']}><Leave /></ProtectedRoute>} />
      <Route path="/leave-application" element={<ProtectedRoute allowedRoles={['employee']}><LeaveApplication /></ProtectedRoute>} />
      <Route path="/recruitment" element={<ProtectedRoute allowedRoles={['platform_owner', 'company', 'company_hr']}><Recruitment /></ProtectedRoute>} />
      <Route path="/payroll" element={<ProtectedRoute allowedRoles={['platform_owner', 'company']}><Payroll /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute allowedRoles={['platform_owner', 'company']}><Reports /></ProtectedRoute>} />
      <Route path="/ai-insights" element={<ProtectedRoute allowedRoles={['platform_owner', 'company']}><AIInsights /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <AppRoutes />
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
