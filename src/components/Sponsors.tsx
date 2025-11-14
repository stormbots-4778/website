import { ExternalLink } from "lucide-react";
import { Card } from "./ui/card";

export const Sponsors = () => {
  const sponsors = [
    {
      name: "Title Sponsor",
      logo: "https://via.placeholder.com/300x120?text=Title+Sponsor",
      description: "Primary funding partner supporting our mission to inspire young engineers and build competitive robots.",
      url: "#",
      tier: "title",
    },
    {
      name: "Gold Sponsor A",
      logo: "https://via.placeholder.com/240x100?text=Gold+Sponsor+A",
      description: "Providing materials and resources for our build season.",
      url: "#",
      tier: "gold",
    },
    {
      name: "Gold Sponsor B",
      logo: "https://via.placeholder.com/240x100?text=Gold+Sponsor+B",
      description: "Supporting outreach programs and community engagement.",
      url: "#",
      tier: "gold",
    },
    {
      name: "Silver Sponsor A",
      logo: "https://via.placeholder.com/200x80?text=Silver+Sponsor+A",
      description: "Contributing to operational expenses.",
      url: "#",
      tier: "silver",
    },
    {
      name: "Silver Sponsor B",
      logo: "https://via.placeholder.com/200x80?text=Silver+Sponsor+B",
      description: "Supporting team equipment needs.",
      url: "#",
      tier: "silver",
    },
  ];

  const titleSponsors = sponsors.filter(s => s.tier === "title");
  const goldSponsors = sponsors.filter(s => s.tier === "gold");
  const silverSponsors = sponsors.filter(s => s.tier === "silver");

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

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Title Sponsors */}
          {titleSponsors.length > 0 && (
            <div>
              <h3 className="text-sm font-mono text-primary mb-4 uppercase tracking-wider">Title Sponsors</h3>
              <div className="space-y-4">
                {titleSponsors.map((sponsor, index) => (
                  <Card
                    key={index}
                    className="p-10 bg-background border-primary/40 hover:border-primary/60 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                      <div className="w-full md:w-80 flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                          {sponsor.name}
                        </h4>
                        <p className="text-muted-foreground mb-4">{sponsor.description}</p>
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-mono text-sm"
                        >
                          Visit Website <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Gold Sponsors */}
          {goldSponsors.length > 0 && (
            <div>
              <h3 className="text-sm font-mono text-secondary mb-4 uppercase tracking-wider">Gold Sponsors</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {goldSponsors.map((sponsor, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-background border-secondary/40 hover:border-secondary/60 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-full h-24 flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-full max-w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors">
                          {sponsor.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">{sponsor.description}</p>
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors font-mono text-sm"
                        >
                          Visit <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Silver Sponsors */}
          {silverSponsors.length > 0 && (
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-wider">Silver Sponsors</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {silverSponsors.map((sponsor, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-card border-border hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-full h-16 flex items-center justify-center">
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="max-h-full max-w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                          {sponsor.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">{sponsor.description}</p>
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-mono text-xs"
                        >
                          Visit <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">Interested in supporting Team 4778?</p>
          <a
            href="#join"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-mono rounded hover:bg-primary/90 transition-colors"
          >
            Become a Sponsor
          </a>
        </div>
      </div>
    </section>
  );
};
