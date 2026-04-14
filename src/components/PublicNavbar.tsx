import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active route
  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  // Navigation items
  const navItems = [
    { label: 'Home', route: '/', key: 'home' },
    { label: 'Pricing', route: '/pricing', key: 'pricing' },
    { label: 'FAQs', route: '/faq', key: 'faq' },
    { label: 'Created By', route: '/created-by', key: 'created-by' },
  ];

  // Handle navigation
  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-card/80 backdrop-blur-xl border-b border-border/50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleNavClick('/')}
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">
            Workforce<span className="text-primary">AI</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.route)}
              className={`text-sm font-medium transition-colors cursor-pointer relative group ${
                isActiveRoute(item.route)
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {item.label}
              {/* Active indicator line */}
              <span
                className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-all duration-300 ${
                  isActiveRoute(item.route) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button size="sm" className="gap-2" onClick={() => navigate('/register')}>
            <Zap className="w-4 h-4" />
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border/50 p-4 space-y-3">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.route)}
              className={`block w-full text-left text-sm font-medium transition-colors cursor-pointer ${
                isActiveRoute(item.route)
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-2 pt-3">
            <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
            <Button size="sm" onClick={() => navigate('/register')}>Get Started</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
