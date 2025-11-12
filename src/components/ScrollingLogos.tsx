import { useEffect, useState, useRef } from "react";

interface Sponsor {
  name: string;
  filename: string;
  url: string;
}

export const ScrollingLogos = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [logoUrls, setLogoUrls] = useState<Map<string, string>>(new Map());
  const [duplicatedSponsors, setDuplicatedSponsors] = useState<Array<{ logo: string; url: string; name: string }>>([]);
  const [logoSetWidth, setLogoSetWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load sponsor data from logos.json
    const loadSponsors = async () => {
      try {
        const logosData = await import('../assets/logos/logos.json');
        if (logosData.default && Array.isArray(logosData.default)) {
          setSponsors(logosData.default);
        }
      } catch (error) {
        console.warn('Could not load sponsors:', error);
      }
    };

    loadSponsors();
  }, []);

  useEffect(() => {
    // Load logo images for all sponsors
    if (sponsors.length === 0) return;

    const loadLogoUrls = async () => {
      const urlMap = new Map<string, string>();
      for (const sponsor of sponsors) {
        try {
          const logoModule = await import(`../assets/logos/${sponsor.filename}`);
          urlMap.set(sponsor.filename, logoModule.default);
        } catch (error) {
          console.warn(`Could not load logo ${sponsor.filename}:`, error);
        }
      }
      setLogoUrls(urlMap);
    };

    loadLogoUrls();
  }, [sponsors]);

  useEffect(() => {
    if (sponsors.length === 0 || logoUrls.size === 0) {
      return;
    }

    const calculateDuplicates = () => {
      // Wait for next frame to ensure DOM is rendered
      requestAnimationFrame(() => {
        if (!containerRef.current || !logosRef.current) {
          return;
        }

        const containerWidth = containerRef.current.clientWidth || window.innerWidth;
        const singleSetWidth = logosRef.current.scrollWidth || 0;
        
        if (singleSetWidth === 0) {
          // Retry after a short delay if width not available yet
          setTimeout(calculateDuplicates, 100);
          return;
        }

        // Calculate how many sets we need to fill the screen + buffer
        // We need at least 2 sets for seamless loop, but more for wider screens
        const setsNeeded = Math.ceil((containerWidth * 2) / singleSetWidth) + 1;
        const totalDuplicates = Math.max(2, setsNeeded);
        
        // Create array with sponsor data and enough duplicates
        const sponsorData = sponsors.map(sponsor => ({
          logo: logoUrls.get(sponsor.filename) || '',
          url: sponsor.url,
          name: sponsor.name,
        }));

        const duplicates: Array<{ logo: string; url: string; name: string }> = [];
        for (let i = 0; i < totalDuplicates; i++) {
          duplicates.push(...sponsorData);
        }
        
        setDuplicatedSponsors(duplicates);
        setLogoSetWidth(singleSetWidth);
      });
    };

    // Calculate on mount and resize
    calculateDuplicates();
    
    const handleResize = () => {
      calculateDuplicates();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sponsors, logoUrls]);

  // If no sponsors found, show nothing
  if (sponsors.length === 0 || logoUrls.size === 0) {
    return null;
  }

  // Combine original and duplicates for rendering
  const sponsorData = sponsors.map(sponsor => ({
    logo: logoUrls.get(sponsor.filename) || '',
    url: sponsor.url,
    name: sponsor.name,
  }));
  const allSponsors = [...sponsorData, ...duplicatedSponsors];

  return (
    <section className="py-12 bg-card/30 border-y border-border relative overflow-hidden">
      <div className="relative" ref={containerRef}>
        <div className="flex animate-scroll">
          <div ref={logosRef} className="flex" style={{ visibility: 'hidden', position: 'absolute' }}>
            {sponsorData.map((sponsor, index) => (
              <div
                key={`measure-${sponsor.name}-${index}`}
                className="flex items-center justify-center px-8 flex-shrink-0"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-20 w-auto object-contain"
                />
              </div>
            ))}
          </div>
          {allSponsors.map((sponsor, index) => (
            <a
              key={`sponsor-${sponsor.name}-${index}`}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-8 flex-shrink-0"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-20 w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
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
            transform: translateX(-${logoSetWidth}px);
          }
        }
        
        .animate-scroll {
          animation: scroll 5s linear infinite;
        }
      `}</style>
    </section>
  );
};
