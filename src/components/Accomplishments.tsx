import { Trophy, Award, Calendar, Star, Hash } from "lucide-react";
import { Card } from "./ui/card";

export const Accomplishments = () => {
  // Stats from FRC events page
  const stats = [
    { number: "4778", label: "Team Number", icon: Hash },
    { number: "14", label: "Seasons Competed", icon: Calendar },
    { number: "21", label: "Total Events", icon: Trophy },
    { number: "1", label: "Championship Trips", icon: Star },
  ];

  // Real awards from FRC events page
  const awards = [
    {
      icon: Award,
      year: "2025",
      title: "Imagery Award in honor of Jack Kamen",
      event: "Minnesota 10,000 Lakes Regional",
      season: "REEFSCAPE",
    },
    {
      icon: Award,
      year: "2015",
      title: "Innovation in Control Award",
      event: "Minnesota North Star Regional",
      season: "RECYCLE RUSH",
      sponsor: "Rockwell Automation",
    },
    {
      icon: Trophy,
      year: "2014",
      title: "Regional Winner",
      event: "Minnesota North Star Regional",
      season: "AERIAL ASSIST",
      championship: "FIRST Championship - Archimedes Division",
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className="p-6 border-2 border-primary bg-background text-center hover:scale-105 transition-transform duration-300 cursor-pointer group"
              >
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                <div className="font-mono text-3xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Awards Grid */}
        <div className="mb-8">
          <h3 className="text-2xl font-mono font-bold mb-6 text-primary">
            Awards & Achievements
          </h3>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((item, index) => (
            <Card
              key={index}
              className="p-6 bg-background border-border hover:border-primary/30 transition-colors duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 text-6xl font-bold text-primary/5 font-mono">
                {item.year}
              </div>
              
              <item.icon className="w-10 h-10 text-primary mb-4 relative z-10" />
              <div className="font-mono text-sm text-primary mb-2">{item.year} • {item.season}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              {item.sponsor && (
                <p className="text-xs text-muted-foreground mb-1">Sponsored by {item.sponsor}</p>
              )}
              <p className="text-sm text-muted-foreground mb-2">{item.event}</p>
              {item.championship && (
                <p className="text-xs text-primary font-mono mt-2">→ {item.championship}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
