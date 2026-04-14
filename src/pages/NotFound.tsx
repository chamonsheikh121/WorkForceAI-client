import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PublicNavbar from "@/components/PublicNavbar";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  // Force light mode on 404 page
  useEffect(() => {
    const root = document.documentElement;
    const previousClass = root.className;
    root.classList.remove('dark');
    root.classList.add('light');
    
    return () => {
      root.className = previousClass;
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
