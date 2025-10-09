import { useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Terminal } from "lucide-react";

export const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = 600;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.fillStyle = "rgba(17, 24, 39, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = "rgba(0, 255, 255, 0.6)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        particles.forEach((p2, j) => {
          if (i === j) return;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.2 - dist / 500})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 600;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: "blur(0.5px)" }}
      />
      <div className="blueprint-grid absolute inset-0 opacity-20" />
      <div className="scan-lines absolute inset-0 pointer-events-none" />
      
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Terminal className="w-8 h-8 text-primary" />
          <span className="font-mono text-primary text-sm">~/stormbots</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-4 font-mono glow-text">
          4778
        </h1>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          STORMBOTS
        </h2>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-mono">
          <span className="text-primary">&gt;</span> Building robots. Breaking limits.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono shadow-lg shadow-primary/50"
          >
            <Terminal className="w-4 h-4 mr-2" />
            View Projects
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 font-mono"
          >
            Join the Team
          </Button>
        </div>
      </div>
    </section>
  );
};
