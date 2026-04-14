import { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreditCard, TrendingUp, DollarSign, AlertCircle, CheckCircle, Clock, Edit2, RefreshCw, Bell, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Plan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'annual';
  description: string;
  features: string[];
  userLimit: number;
  storageGB: number;
  supportLevel: string;
  companies: number;
}

interface Transaction {
  id: string;
  company: string;
  amount: number;
  status: 'Paid' | 'Failed' | 'Pending';
  date: string;
  plan: string;
  invoice: string;
}

interface FailedPayment {
  id: string;
  company: string;
  email: string;
  amount: number;
  daysOverdue: number;
  lastAttempt: string;
}

const initialPlans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    billing: 'monthly',
    description: 'Perfect for growing teams',
    features: [
      'Up to 50 employees',
      '100GB storage',
      'Basic analytics',
      'Email support',
      'Employee management',
      'Leave management',
    ],
    userLimit: 50,
    storageGB: 100,
    supportLevel: 'Email',
    companies: 15,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 799,
    billing: 'monthly',
    description: 'For established companies',
    features: [
      'Up to 500 employees',
      '1TB storage',
      'Advanced analytics',
      'Priority support',
      'All Starter features',
      'Custom integrations',
      'API access',
    ],
    userLimit: 500,
    storageGB: 1024,
    supportLevel: 'Priority',
    companies: 45,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2499,
    billing: 'monthly',
    description: 'For large organizations',
    features: [
      'Unlimited employees',
      'Unlimited storage',
      'Real-time analytics',
      '24/7 phone support',
      'All Professional features',
      'Dedicated account manager',
      'Custom SLA',
      'Advanced security',
    ],
    userLimit: -1,
    storageGB: -1,
    supportLevel: '24/7',
    companies: 12,
  },
];

const revenueData = [
  { month: 'Jan', mrr: 18000, arr: 216000 },
  { month: 'Feb', mrr: 21000, arr: 252000 },
  { month: 'Mar', mrr: 24500, arr: 294000 },
  { month: 'Apr', mrr: 28000, arr: 336000 },
  { month: 'May', mrr: 32500, arr: 390000 },
  { month: 'Jun', mrr: 38000, arr: 456000 },
];

const revenuePerPlan = [
  { plan: 'Starter', revenue: 4485, percentage: 12 },
  { plan: 'Professional', revenue: 35955, percentage: 45 },
  { plan: 'Enterprise', revenue: 29970, percentage: 43 },
];

const transactions: Transaction[] = [
  {
    id: 'txn_001',
    company: 'Acme Corporation',
    amount: 1500,
    status: 'Paid',
    date: '2024-06-14',
    plan: 'Enterprise',
    invoice: 'INV-2024-001',
  },
  {
    id: 'txn_002',
    company: 'Tech Innovations',
    amount: 800,
    status: 'Paid',
    date: '2024-06-14',
    plan: 'Professional',
    invoice: 'INV-2024-002',
  },
  {
    id: 'txn_003',
    company: 'Global Solutions',
    amount: 1500,
    status: 'Pending',
    date: '2024-06-13',
    plan: 'Enterprise',
    invoice: 'INV-2024-003',
  },
  {
    id: 'txn_004',
    company: 'StartUp Labs',
    amount: 299,
    status: 'Failed',
    date: '2024-06-12',
    plan: 'Starter',
    invoice: 'INV-2024-004',
  },
  {
    id: 'txn_005',
    company: 'Innovation Hub',
    amount: 800,
    status: 'Paid',
    date: '2024-06-11',
    plan: 'Professional',
    invoice: 'INV-2024-005',
  },
];

const failedPayments: FailedPayment[] = [
  {
    id: 'fail_001',
    company: 'StartUp Labs',
    email: 'contact@startuplabs.com',
    amount: 299,
    daysOverdue: 5,
    lastAttempt: '2024-06-12',
  },
  {
    id: 'fail_002',
    company: 'Tech Vision',
    email: 'billing@techvision.com',
    amount: 1500,
    daysOverdue: 12,
    lastAttempt: '2024-06-02',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Paid': return 'bg-green-500/10 text-green-600 border-green-200';
    case 'Pending': return 'bg-yellow-500/10 text-yellow-600 border-yellow-200';
    case 'Failed': return 'bg-red-500/10 text-red-600 border-red-200';
    default: return 'bg-gray-500/10 text-gray-600';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Paid': return <CheckCircle className="w-4 h-4" />;
    case 'Pending': return <Clock className="w-4 h-4" />;
    case 'Failed': return <AlertCircle className="w-4 h-4" />;
    default: return null;
  }
};

export default function PlatformSubscriptionBilling() {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [editedPrice, setEditedPrice] = useState('');
  const [isCreatePlanOpen, setIsCreatePlanOpen] = useState(false);
  const [newPlanForm, setNewPlanForm] = useState({
    name: '',
    price: '',
    description: '',
    userLimit: '',
    storageGB: '',
    supportLevel: '',
    features: '',
  });

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setEditedPrice(plan.price.toString());
    setIsEditPlanOpen(true);
  };

  const handleSavePlan = () => {
    console.log('Plan updated:', selectedPlan?.id, editedPrice);
    setIsEditPlanOpen(false);
  };

  const handleCreatePlan = () => {
    if (newPlanForm.name && newPlanForm.price) {
      const features = newPlanForm.features.split('\n').filter(f => f.trim());
      const newPlan: Plan = {
        id: `plan_${Date.now()}`,
        name: newPlanForm.name,
        price: parseInt(newPlanForm.price),
        billing: 'monthly',
        description: newPlanForm.description,
        userLimit: parseInt(newPlanForm.userLimit) || 100,
        storageGB: parseInt(newPlanForm.storageGB) || 500,
        supportLevel: newPlanForm.supportLevel || 'Email',
        features,
        companies: 0,
      };
      setPlans([...plans, newPlan]);
      setIsCreatePlanOpen(false);
      setNewPlanForm({
        name: '',
        price: '',
        description: '',
        userLimit: '',
        storageGB: '',
        supportLevel: '',
        features: '',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Subscription & Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your SaaS revenue and subscription plans</p>
      </div>

      {/* Revenue Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Monthly Recurring Revenue</p>
                <p className="text-3xl font-bold mt-2">$38,000</p>
                <p className="text-xs text-green-600 mt-2">↑ 18% from last month</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Annual Recurring Revenue</p>
                <p className="text-3xl font-bold mt-2">$456,000</p>
                <p className="text-xs text-green-600 mt-2">↑ 22% YoY</p>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">Failed Payments</p>
                <p className="text-3xl font-bold mt-2">{failedPayments.length}</p>
                <p className="text-xs text-red-600 mt-2">Action required</p>
              </div>
              <div className="p-3 rounded-lg bg-red-500/10">
                <CreditCard className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Plans Section */}
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>Manage your pricing and features</CardDescription>
          </div>
          <Button onClick={() => setIsCreatePlanOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Plan
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="group relative overflow-hidden rounded-xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-6 hover:border-primary/50 transition-all duration-300"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary">{plan.companies} companies</Badge>
                  </div>

                  <div className="pt-2 border-t border-border/30">
                    <p className="text-3xl font-bold">
                      ${plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/mo</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Features</p>
                    <ul className="space-y-1.5">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="text-sm flex items-start gap-2">
                          <span className="text-primary mt-1">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                      {plan.features.length > 4 && (
                        <li className="text-sm text-muted-foreground">+{plan.features.length - 4} more</li>
                      )}
                    </ul>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleEditPlan(plan)}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Revenue Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* MRR/ARR Trend */}
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>MRR and ARR over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 25%)" />
                <XAxis dataKey="month" stroke="hsl(220, 10%, 45%)" />
                <YAxis stroke="hsl(220, 10%, 45%)" tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 13%, 15%)',
                    border: '1px solid hsl(220, 14%, 25%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6', r: 4 }}
                  name="MRR"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
                <Line
                  type="monotone"
                  dataKey="arr"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ fill: '#10b981', r: 4 }}
                  name="ARR"
                  isAnimationActive={true}
                  animationDuration={1000}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Revenue per Plan */}
        <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
          <CardHeader>
            <CardTitle>Revenue Distribution</CardTitle>
            <CardDescription>Revenue by subscription plan</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenuePerPlan}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 14%, 25%)" />
                <XAxis dataKey="plan" stroke="hsl(220, 10%, 45%)" />
                <YAxis stroke="hsl(220, 10%, 45%)" tickFormatter={(v) => `$${v / 1000}K`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(220, 13%, 15%)',
                    border: '1px solid hsl(220, 14%, 25%)',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => `$${(value / 1000).toFixed(1)}K`}
                />
                <Bar dataKey="revenue" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Latest payment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Company</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr key={txn.id} className="border-b hover:bg-secondary/30 transition-colors">
                    <td className="py-3 px-4 font-medium">{txn.company}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{txn.plan}</td>
                    <td className="py-3 px-4 font-bold">${txn.amount}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(txn.status)} border flex items-center gap-1.5 w-fit`}>
                        {getStatusIcon(txn.status)}
                        {txn.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{txn.date}</td>
                    <td className="py-3 px-4">
                      <button className="text-primary hover:underline text-sm font-medium">
                        {txn.invoice}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Failed Payments */}
      <Card className="border-border/50 bg-gradient-to-br from-card/80 to-card/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Failed Payments
          </CardTitle>
          <CardDescription>Payments that need attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {failedPayments.map((payment) => (
              <div
                key={payment.id}
                className="group relative overflow-hidden rounded-lg border border-red-500/30 bg-red-500/5 p-4 hover:bg-red-500/10 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{payment.company}</p>
                    <p className="text-xs text-muted-foreground mt-1">{payment.email}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-red-600">
                      <span className="font-medium">${payment.amount}</span>
                      <span>{payment.daysOverdue} days overdue</span>
                      <span className="text-xs text-muted-foreground">Last attempt: {payment.lastAttempt}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors" title="Retry payment">
                      <RefreshCw className="w-4 h-4 text-red-600" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-blue-500/20 transition-colors" title="Notify company">
                      <Bell className="w-4 h-4 text-blue-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Plan Modal */}
      <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit {selectedPlan?.name} Plan</DialogTitle>
            <DialogDescription>
              Update pricing and configuration for this plan
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Monthly Price</label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">$</span>
                <Input
                  type="number"
                  value={editedPrice}
                  onChange={(e) => setEditedPrice(e.target.value)}
                  className="flex-1 border-border/50"
                />
                <span className="text-sm text-muted-foreground">/mo</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Features</label>
              <div className="space-y-2">
                {selectedPlan?.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/30">
                    <span className="text-primary">✓</span>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Plan Modal */}
      <Dialog open={isCreatePlanOpen} onOpenChange={setIsCreatePlanOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Create New Subscription Plan
            </DialogTitle>
            <DialogDescription>
              Add a new subscription plan to your platform
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Plan Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Plan Name</label>
              <Input
                placeholder="e.g., Premium, Custom, Growth"
                value={newPlanForm.name}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, name: e.target.value })}
                className="border-border/50"
              />
            </div>

            {/* Price */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Monthly Price</label>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">$</span>
                  <Input
                    type="number"
                    placeholder="999"
                    value={newPlanForm.price}
                    onChange={(e) => setNewPlanForm({ ...newPlanForm, price: e.target.value })}
                    className="flex-1 border-border/50"
                  />
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
              </div>

              {/* Support Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Support Level</label>
                <Input
                  placeholder="e.g., Email, Priority, 24/7"
                  value={newPlanForm.supportLevel}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, supportLevel: e.target.value })}
                  className="border-border/50"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Brief description of the plan"
                value={newPlanForm.description}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, description: e.target.value })}
                className="border-border/50"
              />
            </div>

            {/* Limits */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">User Limit</label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newPlanForm.userLimit}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, userLimit: e.target.value })}
                  className="border-border/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Storage (GB)</label>
                <Input
                  type="number"
                  placeholder="500"
                  value={newPlanForm.storageGB}
                  onChange={(e) => setNewPlanForm({ ...newPlanForm, storageGB: e.target.value })}
                  className="border-border/50"
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Features (one per line)</label>
              <Textarea
                placeholder="Feature 1&#10;Feature 2&#10;Feature 3&#10;..."
                value={newPlanForm.features}
                onChange={(e) => setNewPlanForm({ ...newPlanForm, features: e.target.value })}
                className="border-border/50 resize-none"
                rows={4}
              />
              <p className="text-xs text-muted-foreground">Enter each feature on a new line</p>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsCreatePlanOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePlan} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
