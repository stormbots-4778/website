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
  // Triple the sponsors for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

  return (
    <section className="py-12 bg-card/30 border-y border-border relative overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-5" />

      <div className="relative">
        <div className="flex gap-16 items-center animate-scroll">
          {duplicatedSponsors.map((sponsor, index) => (
            <a
              key={`${sponsor.name}-${index}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block flex-shrink-0 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
