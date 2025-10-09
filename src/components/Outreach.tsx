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
    <section id="outreach" className="py-24 relative">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Outreach
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <Card className="overflow-hidden border-primary/30">
              <div className="relative aspect-video">
                <img
                  src={images[currentSlide]}
                  alt={`Outreach activity ${currentSlide + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </Card>

            <div className="flex items-center justify-between mt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="border-primary text-primary hover:bg-primary/10"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Community Impact</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              We believe in sharing our knowledge and inspiring the next generation 
              of engineers and programmers. Our outreach initiatives connect us with 
              local schools, community events, and younger robotics teams.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Through hands-on workshops, demonstrations, and mentoring programs, 
              we help students discover their passion for STEM fields while building 
              practical skills in robotics, coding, and teamwork.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our team members volunteer hundreds of hours each year, working to make 
              robotics accessible and exciting for everyone in our community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
