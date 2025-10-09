import { Code, Cpu, Zap } from "lucide-react";
import { Card } from "./ui/card";

export const About = () => {
  const features = [
    {
      icon: Code,
      title: "Software",
      description: "Advanced autonomous programming and vision systems",
    },
    {
      icon: Cpu,
      title: "Hardware",
      description: "Precision engineering and mechanical design",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Pushing boundaries in competitive robotics",
    },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> About
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We're FRC Team 4778, competing in the FIRST Robotics Competition. 
              Our team combines programming, mechanical engineering, and problem-solving 
              to build competition-ready robots.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Each season brings new challenges, and we meet them with practical solutions, 
              rigorous testing, and collaborative teamwork. We focus on what works, 
              iterate constantly, and learn from every competition.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond competition, we engage with our community through outreach programs, 
              workshops, and mentoring younger teams.
            </p>
          </div>

          <div className="relative">
            <div className="aspect-video bg-muted rounded border border-primary/30 overflow-hidden relative group">
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="w-24 h-24 text-primary/30 group-hover:text-primary/50 transition-colors" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 bg-card border-border hover:border-primary/30 transition-colors duration-300"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-mono font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
