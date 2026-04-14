import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Check, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';

export default function Pricing() {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(false);

  // Force light mode - never dark
  useEffect(() => {
    const root = document.documentElement;
    root.className = '';
    root.classList.add('light');
    
    // Always restore to light on unmount
    return () => {
      root.className = '';
      root.classList.add('light');
    };
  }, []);

  const plans = [
    {
      name: 'Starter',
      description: 'Perfect for small teams',
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        { text: 'Up to 50 employees', included: true },
        { text: 'Basic payroll processing', included: true },
        { text: 'Attendance tracking', included: true },
        { text: 'Employee management', included: true },
        { text: 'Basic reports', included: true },
        { text: 'Email support', included: true },
        { text: 'API access', included: false },
        { text: 'Advanced analytics', included: false },
        { text: 'Custom integrations', included: false },
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      description: 'For growing companies',
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        { text: 'Up to 500 employees', included: true },
        { text: 'Advanced payroll processing', included: true },
        { text: 'Real-time attendance tracking', included: true },
        { text: 'Full employee management', included: true },
        { text: 'Custom reports', included: true },
        { text: 'Priority support', included: true },
        { text: 'API access', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom integrations', included: false },
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      monthlyPrice: 'Custom',
      annualPrice: 'Custom',
      features: [
        { text: 'Unlimited employees', included: true },
        { text: 'Enterprise payroll', included: true },
        { text: 'White-label solution', included: true },
        { text: 'Full employee management', included: true },
        { text: 'Advanced analytics & BI', included: true },
        { text: '24/7 dedicated support', included: true },
        { text: 'API access', included: true },
        { text: 'Advanced analytics', included: true },
        { text: 'Custom integrations', included: true },
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={isAnnual ? 'text-muted-foreground' : 'font-semibold'}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-primary/20 rounded-full border-2 border-primary/30 transition-all"
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-primary rounded-full transition-all ${
                  isAnnual ? 'right-1' : 'left-1'
                }`}
              />
            </button>
            <span className={!isAnnual ? 'text-muted-foreground' : 'font-semibold'}>
              Annual <span className="text-primary text-sm">(Save 17%)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 transition-all ${
                  plan.highlighted
                    ? 'bg-primary/10 border-2 border-primary shadow-lg scale-105'
                    : 'bg-card/50 border border-border/50 hover:border-border'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>

                <div className="mb-6">
                  {typeof plan.monthlyPrice === 'number' ? (
                    <>
                      <div className="text-4xl font-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {isAnnual ? 'per year' : 'per month'} (billed {isAnnual ? 'annually' : 'monthly'})
                      </p>
                    </>
                  ) : (
                    <div className="text-2xl font-bold">{plan.monthlyPrice}</div>
                  )}
                </div>

                <Button
                  className="w-full mb-8"
                  variant={plan.highlighted ? 'default' : 'outline'}
                  onClick={() => navigate(plan.cta === 'Contact Sales' ? '/contact' : '/register')}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex gap-3 items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={feature.included ? '' : 'text-muted-foreground line-through'}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground mb-12">
            Have questions about our pricing? Check out our full FAQ page.
          </p>
          <Button 
            size="lg"
            variant="outline"
            onClick={() => navigate('/faq')}
          >
            View All FAQs
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl p-12 border border-primary/30">
          <h2 className="text-3xl font-bold">Ready to get started?</h2>
          <p className="text-lg text-muted-foreground">
            Join 500+ companies using WorkForceAI to manage their workforce.
          </p>
          <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
            <Zap className="w-5 h-5" />
            Start Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 border-t border-border py-12 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="font-semibold">WorkForceAI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 WorkForceAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
