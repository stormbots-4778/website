import { ExternalLink } from "lucide-react";
import { Card } from "./ui/card";

export const Sponsors = () => {
  const sponsors = [
    {
      name: "Title Sponsor",
      logo: "https://via.placeholder.com/200x100?text=Title+Sponsor",
      description: "Primary funding partner supporting our mission to inspire young engineers and build competitive robots.",
      url: "#",
      tier: "title",
    },
    {
      name: "Gold Sponsor A",
      logo: "https://via.placeholder.com/180x90?text=Gold+Sponsor+A",
      description: "Providing materials and resources for our build season and competition travel.",
      url: "#",
      tier: "gold",
    },
    {
      name: "Gold Sponsor B",
      logo: "https://via.placeholder.com/180x90?text=Gold+Sponsor+B",
      description: "Supporting our outreach programs and community engagement initiatives.",
      url: "#",
      tier: "gold",
    },
    {
      name: "Silver Sponsor",
      logo: "https://via.placeholder.com/160x80?text=Silver+Sponsor",
      description: "Contributing to our team's operational expenses and equipment needs.",
      url: "#",
      tier: "silver",
    },
  ];

  return (
    <section id="sponsors" className="py-24 bg-card/30 relative">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Our Sponsors
          </h2>
          <div className="w-24 h-1 bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            We're grateful for the support of our sponsors who make our robotics program possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sponsors.map((sponsor, index) => (
            <Card
              key={index}
              className={`p-8 bg-background border-border hover:border-primary/50 transition-all duration-300 group relative overflow-hidden ${
                sponsor.tier === "title" ? "md:col-span-2 border-primary/30" : ""
              }`}
            >
              {/* Tier indicator */}
              <div className={`absolute top-0 right-0 px-4 py-1 text-xs font-mono border-l border-b ${
                sponsor.tier === "title" ? "bg-primary/20 text-primary border-primary/40" :
                sponsor.tier === "gold" ? "bg-secondary/20 text-secondary border-secondary/40" :
                "bg-muted text-muted-foreground border-border"
              }`}>
                {sponsor.tier.toUpperCase()}
              </div>

              <div className={`flex ${sponsor.tier === "title" ? "md:flex-row flex-col" : "flex-col"} gap-6 items-center text-center md:text-left`}>
                <div className={`flex items-center justify-center ${sponsor.tier === "title" ? "md:w-64" : "w-full"}`}>
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="max-w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>

                <div className="flex-1">
                  <h3 className={`font-bold mb-3 group-hover:text-primary transition-colors ${
                    sponsor.tier === "title" ? "text-2xl" : "text-xl"
                  }`}>
                    {sponsor.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">{sponsor.description}</p>
                  
                  <a
                    href={sponsor.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm group-hover:gap-3"
                  >
                    Visit Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Interested in supporting Team 4778?</p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono rounded hover:bg-primary/90 transition-colors"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};
