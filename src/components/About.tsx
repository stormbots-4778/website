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

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/30">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-mono font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <Card className="p-8 bg-card/50 border-primary/20">
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We're FRC Team 4778, competing in the FIRST Robotics Competition. 
              Our team combines programming, mechanical engineering, and problem-solving 
              to build competition-ready robots each season.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond competition, we engage with our community through outreach programs, 
              workshops, and mentoring. We focus on practical solutions, rigorous testing, 
              and learning from every challenge we face.
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
