import { Trophy, Award, Target } from "lucide-react";
import { Card } from "./ui/card";

export const Accomplishments = () => {
  const accomplishments = [
    {
      icon: Trophy,
      year: "2024",
      title: "Regional Champions",
      event: "Great Lakes Regional",
    },
    {
      icon: Award,
      year: "2023",
      title: "Innovation in Control Award",
      event: "State Championship",
    },
    {
      icon: Target,
      year: "2023",
      title: "Autonomous Award",
      event: "District Event",
    },
    {
      icon: Trophy,
      year: "2022",
      title: "Finalist Alliance",
      event: "Regional Competition",
    },
  ];

  return (
    <section id="accomplishments" className="py-24 bg-card/30 relative">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Accomplishments
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accomplishments.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-background border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-6xl font-bold text-primary/5 font-mono">
                {item.year}
              </div>
              
              <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform relative z-10" />
              <div className="font-mono text-sm text-primary mb-2">{item.year}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.event}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
