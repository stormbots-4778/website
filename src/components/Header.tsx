import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Menu, X, Terminal } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "About FRC", href: "#about-frc" },
    { label: "Accomplishments", href: "#accomplishments" },
    { label: "Meetings", href: "#meetings" },
    { label: "Schedule", href: "#schedule" },
    { label: "Outreach", href: "#outreach" },
    { label: "Sponsors", href: "#sponsors" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <Terminal className="w-6 h-6 text-primary transition-transform" />
            <span className="font-mono font-bold text-xl">STORMBOTS</span>
            <span className="font-mono text-primary text-sm">4778</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-4 py-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3 font-mono text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-primary mr-2">&gt;</span>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};
