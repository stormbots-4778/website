import { MapPin, Calendar, ExternalLink } from "lucide-react";
import { Card } from "./ui/card";

export const CompetitionSchedule = () => {
  // Mock data - will be replaced with API
  const competitions = [
    {
      name: "District Event #1",
      date: "March 15-17, 2024",
      location: "Michigan State University",
      status: "upcoming",
    },
    {
      name: "Great Lakes Regional",
      date: "April 5-7, 2024",
      location: "Grand Rapids, MI",
      status: "upcoming",
    },
    {
      name: "State Championship",
      date: "April 20-22, 2024",
      location: "Detroit, MI",
      status: "upcoming",
    },
  ];

  return (
    <section id="schedule" className="py-24 bg-card/30 relative">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Competition Schedule
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="max-w-3xl">
          {competitions.map((comp, index) => (
            <Card
              key={index}
              className="p-6 mb-4 bg-background border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {comp.name}
                  </h3>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-mono text-sm">{comp.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm">{comp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-mono rounded border border-primary/30">
                    {comp.status.toUpperCase()}
                  </span>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-mono">API Integration Ready - Connect your competition data</span>
        </div>
      </div>
    </section>
  );
};
