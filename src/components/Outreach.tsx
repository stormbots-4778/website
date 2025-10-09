import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export const Outreach = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Placeholder images - replace with actual outreach photos
  const images = [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=500&fit=crop",
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section id="outreach" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Outreach
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden border-primary/30 bg-card/50 backdrop-blur">
            <div className="grid md:grid-cols-5 gap-0">
              {/* Carousel - takes up 3 columns */}
              <div className="md:col-span-3 relative">
                <div className="relative aspect-video md:aspect-square">
                  <img
                    src={images[currentSlide]}
                    alt={`Outreach activity ${currentSlide + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
                  
                  {/* Carousel controls overlaid on image */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-background/80 backdrop-blur px-4 py-2 rounded-full border border-primary/30">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={prevSlide}
                      className="h-8 w-8 text-primary hover:bg-primary/20"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>

                    <div className="flex gap-1.5">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            index === currentSlide
                              ? "bg-primary w-6"
                              : "bg-muted-foreground/40"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={nextSlide}
                      className="h-8 w-8 text-primary hover:bg-primary/20"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Content - takes up 2 columns */}
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4 font-mono">Community Impact</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We share our knowledge and inspire the next generation through 
                  outreach initiatives with local schools and community events.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Through hands-on workshops and mentoring programs, we help students 
                  discover their passion for STEM while building practical robotics skills.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
