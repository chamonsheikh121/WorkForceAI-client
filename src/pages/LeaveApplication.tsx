import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface LeaveApplicationFormValues {
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
}

// Mock leave history data
const mockLeaveApplications = [
  {
    id: 1,
    type: 'Sick Leave',
    startDate: '2024-04-10',
    endDate: '2024-04-11',
    reason: 'Medical appointment',
    status: 'approved',
    approvedBy: 'John Manager',
    appliedOn: '2024-04-08',
  },
  {
    id: 2,
    type: 'Annual Leave',
    startDate: '2024-05-15',
    endDate: '2024-05-19',
    reason: 'Vacation',
    status: 'pending',
    approvedBy: null,
    appliedOn: '2024-05-01',
  },
  {
    id: 3,
    type: 'Casual Leave',
    startDate: '2024-03-25',
    endDate: '2024-03-25',
    reason: 'Personal work',
    status: 'approved',
    approvedBy: 'Jane Manager',
    appliedOn: '2024-03-22',
  },
];

const leaveTypes = [
  { value: 'annual', label: 'Annual Leave' },
  { value: 'sick', label: 'Sick Leave' },
  { value: 'casual', label: 'Casual Leave' },
  { value: 'emergency', label: 'Emergency Leave' },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'rejected':
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return null;
  }
};

export default function LeaveApplication() {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<LeaveApplicationFormValues>({
    defaultValues: {
      leaveType: 'annual',
      startDate: '',
      endDate: '',
      reason: '',
    },
  });

  const onSubmit = async (data: LeaveApplicationFormValues) => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      form.reset();

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Leave Application</h1>
        <p className="text-muted-foreground mt-2">
          Apply for leave and track your applications
        </p>
      </div>

      <Tabs defaultValue="apply" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
          <TabsTrigger value="history">My Applications</TabsTrigger>
        </TabsList>

        {/* Apply for Leave Tab */}
        <TabsContent value="apply" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Leave Application</CardTitle>
              <CardDescription>
                Fill in the details below to apply for leave
              </CardDescription>
            </CardHeader>
            <CardContent>
              {submitSuccess && (
                <Alert className="mb-6 border-green-500/30 bg-green-500/10">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-700">
                    Your leave application has been submitted successfully!
                  </AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Leave Type */}
                  <FormField
                    control={form.control}
                    name="leaveType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Leave Type</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/50"
                          >
                            {leaveTypes.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date Range */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>End Date</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              disabled={isSubmitting}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Reason */}
                  <FormField
                    control={form.control}
                    name="reason"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reason / Details</FormLabel>
                        <FormControl>
                          <textarea
                            placeholder="Provide reason for your leave request..."
                            disabled={isSubmitting}
                            className="w-full px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-1 focus:ring-primary/50 resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application History</CardTitle>
              <CardDescription>
                View all your leave applications and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLeaveApplications.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-start justify-between p-4 rounded-lg border border-border hover:bg-secondary/30 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(app.status)}
                        <h3 className="font-semibold">{app.type}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          app.status === 'approved'
                            ? 'bg-green-500/20 text-green-700'
                            : app.status === 'pending'
                            ? 'bg-yellow-500/20 text-yellow-700'
                            : 'bg-red-500/20 text-red-700'
                        }`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>
                          <span className="font-medium text-foreground">{app.startDate}</span>
                          {' to '}
                          <span className="font-medium text-foreground">{app.endDate}</span>
                        </p>
                        <p>Reason: {app.reason}</p>
                        <p>Applied on: {app.appliedOn}</p>
                        {app.approvedBy && (
                          <p>Approved by: <span className="font-medium text-foreground">{app.approvedBy}</span></p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
