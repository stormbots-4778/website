import { useEffect, useRef } from "react";

interface Sponsor {
  name: string;
  logo: string;
  url: string;
}

const sponsors: Sponsor[] = [
  { name: "Sponsor 1", logo: "https://via.placeholder.com/150x80?text=Sponsor+1", url: "#" },
  { name: "Sponsor 2", logo: "https://via.placeholder.com/200x80?text=Sponsor+2", url: "#" },
  { name: "Sponsor 3", logo: "https://via.placeholder.com/120x80?text=Sponsor+3", url: "#" },
  { name: "Sponsor 4", logo: "https://via.placeholder.com/180x80?text=Sponsor+4", url: "#" },
  { name: "Sponsor 5", logo: "https://via.placeholder.com/150x80?text=Sponsor+5", url: "#" },
  { name: "Sponsor 6", logo: "https://via.placeholder.com/160x80?text=Sponsor+6", url: "#" },
];

export const ScrollingLogos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += 0.5;
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-16 bg-card/50 border-y border-border relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl font-mono text-center text-muted-foreground">
          <span className="text-primary">&gt;</span> Powered By
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-12 items-center overflow-hidden whitespace-nowrap"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {duplicatedSponsors.map((sponsor, index) => (
          <a
            key={`${sponsor.name}-${index}`}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block flex-shrink-0 hover:scale-110 transition-transform duration-300"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            />
          </a>
        ))}
      </div>
    </section>
  );
};
