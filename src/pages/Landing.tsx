import { useNavigate } from 'react-router-dom';
import {
  Zap, Users, Clock, BarChart3, Lock, Brain, ChevronRight, Star,
  Facebook, Twitter, Linkedin, Mail, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Employee Management',
      description: 'Centralized employee database with role-based access control',
    },
    {
      icon: Clock,
      title: 'Attendance Tracking',
      description: 'Real-time attendance and time tracking with automated reports',
    },
    {
      icon: BarChart3,
      title: 'Smart Payroll',
      description: 'Automated payroll processing with deductions and compliance',
    },
    {
      icon: Brain,
      title: 'AI Insights',
      description: 'Data-driven insights to optimize workforce management',
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Bank-level security with role-based access control',
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Comprehensive dashboards and custom analytics reports',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc',
      feedback: 'WorkForceAI transformed how we manage our 500+ employees. The automation saved us 20+ hours per week.',
      avatar: 'SJ',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      company: 'Global Solutions Ltd',
      feedback: 'The best HR platform we\'ve used. Intuitive interface and excellent customer support.',
      avatar: 'MC',
      rating: 5,
    },
    {
      name: 'Emma Davis',
      company: 'StartUp Labs',
      feedback: 'From 10 to 100 employees, WorkForceAI scaled with us perfectly. Highly recommended!',
      avatar: 'ED',
      rating: 5,
    },
  ];

  const benefits = [
    { icon: Clock, title: 'Save Time', desc: 'Automate repetitive HR tasks' },
    { icon: Zap, title: 'Increase Efficiency', desc: 'Streamline workflows and processes' },
    { icon: BarChart3, title: 'Better Insights', desc: 'Data-driven decision making' },
    { icon: Lock, title: 'Enterprise Security', desc: 'Keep your data safe' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                All-in-One
                <span className="text-primary"> Workforce</span>
                <br />
                Management Platform
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Manage employees, payroll, attendance, and operations from one powerful and scalable platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                  <Zap className="w-5 h-5" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline">
                  Book Demo
                </Button>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground mb-3">Trusted by 500+ companies worldwide</p>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Dashboard Preview */}
            <div className="relative h-96 lg:h-full hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-3xl" />
              <div className="relative bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl p-6 h-full overflow-hidden">
                <div className="space-y-4">
                  <div className="h-8 bg-muted/40 rounded w-2/3" />
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-20 bg-muted/30 rounded" />
                    ))}
                  </div>
                  <div className="h-32 bg-muted/20 rounded mt-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your workforce efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="glass-card p-6 hover:scale-105 transition-transform duration-300 group cursor-pointer"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT PREVIEW SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Screenshot */}
            <div className="relative h-96 bg-card/40 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <div className="p-6 space-y-4 h-full">
                <div className="h-8 bg-muted/40 rounded w-1/3" />
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 bg-muted/30 rounded" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Powerful Dashboard</h2>
              <p className="text-lg text-muted-foreground">
                Get complete visibility into your workforce with real-time analytics and insights.
              </p>

              <div className="space-y-4">
                {[
                  'Visual analytics and real-time metrics',
                  'Easy employee and payroll management',
                  'Scalable for businesses of any size',
                  'Secure and compliant data handling',
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <ChevronRight className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="gap-2 w-full sm:w-auto">
                Start Free Trial <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section className="py-20 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">Why Choose WorkForceAI?</h2>
              <p className="text-lg text-muted-foreground">
                Streamline your HR operations and focus on what matters most - growing your business.
              </p>

              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="p-3 rounded-lg bg-primary/20">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Illustration */}
            <div className="relative h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center">
              <div className="text-center space-y-4">
                <BarChart3 className="w-32 h-32 text-primary/30 mx-auto" />
                <p className="text-muted-foreground">Dashboard Preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Loved by companies worldwide</h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say about WorkForceAI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="glass-card p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6">"{testimonial.feedback}"</p>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl p-12 md:p-16 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent blur-3xl -z-10" />

            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Start managing your workforce smarter today
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join 500+ companies that trust WorkForceAI for their HR and payroll management.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                  <Zap className="w-5 h-5" />
                  Get Started Free
                </Button>
                <Button size="lg" variant="outline">
                  Contact Sales
                </Button>
              </div>

              <p className="text-sm text-muted-foreground pt-4">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-secondary/50 border-t border-border py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Product */}
            <div className="space-y-4">
              <h3 className="font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>

            {/* Social */}
            <div className="space-y-4">
              <h3 className="font-semibold">Follow</h3>
              <div className="flex gap-3">
                <button className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="p-2 rounded-lg bg-secondary/50 hover:bg-primary/20 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">WorkForceAI</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 WorkForceAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
