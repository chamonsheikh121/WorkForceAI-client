import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, Mail } from 'lucide-react';

interface ForgotPasswordFormValues {
  email: string;
}

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  // Force light mode on forgot password page
  useEffect(() => {
    const root = document.documentElement;
    const previousClass = root.className;
    root.classList.remove('dark');
    root.classList.add('light');
    
    return () => {
      root.className = previousClass;
    };
  }, []);

  const form = useForm<ForgotPasswordFormValues>({
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitted(true);
      setSubmittedEmail(data.email);
    } catch (err) {
      form.setError('email', {
        type: 'manual',
        message: 'An error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <Mail className="h-16 w-16 text-blue-500" />
              <h2 className="text-2xl font-bold text-center">Check Your Email</h2>
              <p className="text-muted-foreground text-center">
                We've sent a password reset link to <span className="font-semibold">{submittedEmail}</span>
              </p>
              <p className="text-sm text-muted-foreground text-center">
                Please check your email and follow the link to reset your password.
              </p>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/login">Back to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>

          <div className="text-sm text-center">
            <p>
              Remember your password?{' '}
              <Link to="/login" className="text-primary hover:underline font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
