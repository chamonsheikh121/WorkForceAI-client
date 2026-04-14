import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth, getAvailableRoles } from '@/context/AuthContext';
import { AlertCircle, Shield, Building2, Users } from 'lucide-react';

interface LoginFormValues {
  email: string;
  password: string;
}

const roleIcons: Record<string, any> = {
  'platform_owner': Shield,
  'company': Building2,
  'employee': Users,
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const roles = getAvailableRoles();

  // Force light mode on login page
  useEffect(() => {
    const root = document.documentElement;
    const previousClass = root.className;
    root.classList.remove('dark');
    root.classList.add('light');
    
    return () => {
      root.className = previousClass;
    };
  }, []);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError('');

    try {
      if (login(data.email, data.password)) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return;

    setIsLoading(true);
    setError('');
    try {
      if (login(role.user.email, 'demo123', roleId)) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
          {/* Demo Roles Selection */}
          <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">WorkForceAI Platform</h1>
          <p className="text-center text-slate-400 mb-8">Try different roles to see the platform in action</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {roles.map((role) => {
              const Icon = roleIcons[role.id];
              const isSelected = selectedRole === role.id;
              
              return (
                <button
                  key={role.id}
                  onClick={() => handleDemoLogin(role.id)}
                  disabled={isLoading}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-slate-600 hover:border-primary/50 bg-slate-800/50'
                  } disabled:opacity-50 disabled:cursor-not-allowed group`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className={`p-3 rounded-lg transition-colors ${
                      isSelected ? 'bg-primary/20 text-primary' : 'bg-slate-700 text-slate-400 group-hover:text-primary'
                    }`}>
                      {Icon && <Icon className="w-6 h-6" />}
                    </div>
                    <div className="text-left w-full">
                      <div className="font-semibold text-white text-sm">{role.user.name}</div>
                      <div className="text-xs text-slate-400 capitalize">{role.user.role.replace('_', ' ')}</div>
                      <div className="text-xs text-slate-500 mt-1 truncate">{role.user.tenantName}</div>
                    </div>
                    <Button
                      size="sm"
                      className="w-full mt-2"
                      disabled={isLoading}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDemoLogin(role.id);
                      }}
                    >
                      {isLoading ? 'Loading...' : 'Login'}
                    </Button>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Or Manual Login */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-slate-800 text-slate-400 text-sm">Or login manually</span>
          </div>
        </div>

        {/* Login Form */}
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@email.com"
                          type="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          type="password"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            <div className="space-y-2 text-sm">
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-semibold">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/forgot-password" className="text-primary hover:underline font-semibold">
                  Forgot password?
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
