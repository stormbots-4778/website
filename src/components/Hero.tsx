import { Button } from "./ui/button";
import { Terminal, ArrowDown } from "lucide-react";

export const Hero = () => {
  const scrollToContent = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
      
      {/* Subtle grid overlay */}
      <div className="blueprint-grid absolute inset-0 opacity-10" />
      
      {/* Accent elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Terminal className="w-6 h-6 text-primary" />
          <span className="font-mono text-primary text-sm">FRC Team</span>
        </div>
        
        <h1 className="text-7xl md:text-9xl font-bold mb-4 font-mono subtle-glow">
          4778
        </h1>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
          STORMBOTS
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Building competitive robots through programming, engineering, and teamwork
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
          >
            <Terminal className="w-4 h-4 mr-2" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-mono"
            onClick={() => {
              document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Join the Team
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to content"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
};
