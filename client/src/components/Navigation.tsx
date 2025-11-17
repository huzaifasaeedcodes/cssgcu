import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", hash: "" },
    { name: "About", path: "/", hash: "#about" },
    { name: "Events", path: "/", hash: "#events" },
    { name: "Team", path: "/", hash: "#team" },
    { name: "Announcements", path: "/", hash: "#announcements" },
    { name: "Contact", path: "/", hash: "#contact" },
  ];

  const scrollToSection = (hash: string) => {
    setMobileMenuOpen(false);
    
    setTimeout(() => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3 hover-elevate active-elevate-2 px-2 py-1 rounded-md">
            <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">CSS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-sm leading-tight">Computer Science Society</span>
              <span className="text-xs text-muted-foreground">GCU Lahore</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                onClick={() => scrollToSection(item.hash)}
                data-testid={`link-nav-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                variant="ghost"
                size="sm"
                className="relative"
              >
                {item.name}
              </Button>
            ))}
            <ThemeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                onClick={() => scrollToSection(item.hash)}
                data-testid={`link-mobile-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                variant="ghost"
                className="w-full justify-start"
              >
                {item.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
