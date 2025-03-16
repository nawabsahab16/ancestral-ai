
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/testimonials", label: "Success Stories" },
    { path: "/faq", label: "FAQ" },
    { path: "/get-started", label: "Get Started" }
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? 
          "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm" : 
          "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-xl md:text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AncestralAI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md text-foreground/80 hover:text-foreground transition-colors",
                  location.pathname === link.path && "text-foreground font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="ml-4 flex items-center space-x-2">
              <ThemeToggle />
              
              {user ? (
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm text-foreground/70">
                    Hi, {user.name || user.email.split('@')[0]}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => logout()}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 ml-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center md:hidden gap-2">
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleMobileMenuToggle}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 rounded-md hover:bg-muted transition-colors",
                  location.pathname === link.path && "bg-muted font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex flex-col gap-2 px-4 py-2">
                <span className="text-sm text-foreground/70">
                  Signed in as {user.email}
                </span>
                <Button variant="outline" size="sm" onClick={() => logout()} className="justify-start">
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-4 py-2">
                <Link to="/login" className="w-full">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" className="w-full">
                  <Button size="sm" className="w-full justify-start">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
