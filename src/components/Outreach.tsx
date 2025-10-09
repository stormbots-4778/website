import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

export const Outreach = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=800&fit=crop",
      caption: "School Workshop - Teaching robotics fundamentals"
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
      caption: "Community Demo - Showcasing our competition robot"
    },
    {
      url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop",
      caption: "Team Mentorship - Guiding younger FRC teams"
    },
    {
      url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&h=800&fit=crop",
      caption: "STEM Fair - Inspiring future engineers"
    },
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

        <div className="max-w-5xl mx-auto relative">
          {/* Image Frame */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
            <div className="relative aspect-video">
              <img
                src={images[currentSlide].url}
                alt={images[currentSlide].caption}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-lg font-mono text-foreground">
                  {images[currentSlide].caption}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 h-14 w-14 text-primary hover:bg-primary/10"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 h-14 w-14 text-primary hover:bg-primary/10"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-primary w-8"
                    : "bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Description paragraph */}
        <div className="text-center max-w-3xl mx-auto mt-12">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We share our knowledge and inspire the next generation through outreach 
            initiatives with local schools and community events. Through hands-on workshops 
            and mentoring programs, we help students discover their passion for STEM.
          </p>
        </div>
      </div>
    </section>
  );
};
