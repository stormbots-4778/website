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
    <section id="schedule" className="py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      {/* Engineering-themed accent lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Competition Schedule
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="max-w-5xl mx-auto">
          {competitions.map((comp, index) => (
            <Card
              key={index}
              className="p-8 mb-6 bg-background/80 backdrop-blur border-primary/20 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Blueprint corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-primary/20 group-hover:border-primary/40 transition-colors" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-primary/20 group-hover:border-primary/40 transition-colors" />
              
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors font-mono">
                    {comp.name}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Calendar className="w-5 h-5 text-primary" />
                      <span className="font-mono">{comp.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{comp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <span className="px-4 py-2 bg-primary/20 text-primary text-xs font-mono rounded border border-primary/30 group-hover:bg-primary/30 transition-colors">
                    {comp.status.toUpperCase()}
                  </span>
                  <ExternalLink className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
