import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Mail, ExternalLink, Github, Figma } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PublicNavbar from '@/components/PublicNavbar';

export default function CreatedBy() {
  const navigate = useNavigate();

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

  const techStack = [
    { category: 'Frontend', technologies: 'React 18, TypeScript, Tailwind CSS, Vite' },
    { category: 'UI Components', technologies: 'shadcn/ui, Radix UI, Lucide Icons' },
    { category: 'State Management', technologies: 'React Context API, React Hooks' },
    { category: 'Routing', technologies: 'React Router v6' },
    { category: 'Forms', technologies: 'React Hook Form, Zod' },
    { category: 'Data Visualization', technologies: 'Recharts' },
    { category: 'HTTP Client', technologies: '@tanstack/react-query' },
    { category: 'Build Tool', technologies: 'Vite' },
    { category: 'Theme System', technologies: 'Custom Context with localStorage' },
    { category: 'Authentication', technologies: 'Custom Auth Context' },
  ];

  const socialLinks = [
    {
      name: 'Portfolio',
      icon: ExternalLink,
      url: 'https://chamonali.com',
      color: 'hover:text-blue-600',
    },
    {
      name: 'Fiverr',
      icon: ExternalLink,
      url: 'https://fiverr.com/chamonali',
      color: 'hover:text-green-600',
    },
    {
      name: 'Upwork',
      icon: ExternalLink,
      url: 'https://upwork.com/fl/chamonali',
      color: 'hover:text-green-700',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/chamonali',
      color: 'hover:text-gray-800',
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:chamon@example.com',
      color: 'hover:text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PublicNavbar />

      {/* Header Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16 space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold">Created By</h1>
            <p className="text-xl text-muted-foreground">
              Meet the builder behind WorkForceAI
            </p>
          </div>

          {/* Creator Card */}
          <div className="bg-card rounded-2xl border border-border/50 p-12 mb-16 shadow-xl hover:shadow-2xl transition-shadow">
            <div className="space-y-6">
              {/* Avatar & Name */}
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-5xl font-bold text-primary-foreground">
                  CA
                </div>
                <div className="text-center">
                  <h2 className="text-3xl font-bold">Chamon Ali</h2>
                  <p className="text-primary text-lg font-semibold mt-2">
                    Application Designer & Technical Solution Provider
                  </p>
                </div>
              </div>

              {/* Bio */}
              <div className="max-w-2xl mx-auto">
                <p className="text-center text-muted-foreground text-lg leading-relaxed">
                  A passionate full-stack developer and UI/UX designer with expertise in building scalable web applications.
                  Specializes in crafting intuitive user interfaces combined with robust backend solutions. Dedicated to
                  helping businesses streamline their operations through intelligent software design and implementation.
                </p>
              </div>

              {/* Key Skills */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <p className="text-sm text-muted-foreground mt-1">Projects Completed</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">5+ Years</div>
                  <p className="text-sm text-muted-foreground mt-1">Experience</p>
                </div>
                <div className="bg-primary/10 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <p className="text-sm text-muted-foreground mt-1">Client Satisfaction</p>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-300 group"
                    >
                      <Icon className={`w-5 h-5 ${link.color} transition-colors`} />
                      <span className="text-sm font-medium">{link.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tech Stack Section */}
          {/* <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-bold">Tech Stack Used</h3>
              <p className="text-muted-foreground">
                Built with modern technologies for performance and scalability
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {techStack.map((item, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all"
                >
                  <h4 className="font-bold text-lg mb-2 text-primary">{item.category}</h4>
                  <p className="text-muted-foreground">{item.technologies}</p>
                </div>
              ))}
            </div>
          </div> */}

          {/* CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl border border-primary/20 p-8 text-center space-y-6">
            <h3 className="text-2xl font-bold">Ready to Start?</h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Experience the power of WorkForceAI and transform your workforce management today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" onClick={() => navigate('/register')}>
                <Zap className="w-5 h-5" />
                Get Started Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/pricing')}
              >
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border/50 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-lg">
                  Workforce<span className="text-primary">AI</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Simplifying workforce management for modern businesses
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate('/')} className="hover:text-foreground transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/pricing')} className="hover:text-foreground transition-colors">
                    Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate('/faq')} className="hover:text-foreground transition-colors">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Creator</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://chamonali.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="https://github.com/chamonali" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://fiverr.com/chamonali" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Fiverr
                  </a>
                </li>
                <li>
                  <a href="https://upwork.com/fl/chamonali" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    Upwork
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 WorkForceAI. All rights reserved. Design & built by{' '}
              <span className="text-primary font-semibold">Chamon Ali</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
