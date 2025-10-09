import { useState } from "react";
import { ChevronLeft, ChevronRight, Users, Lightbulb, Wrench } from "lucide-react";
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

  const activities = [
    {
      icon: Users,
      title: "School Workshops",
      description: "Hands-on robotics sessions with local schools and STEM programs"
    },
    {
      icon: Lightbulb,
      title: "Team Mentorship",
      description: "Guiding younger FRC and FLL teams through competition seasons"
    },
    {
      icon: Wrench,
      title: "Community Demos",
      description: "Public demonstrations at events, fairs, and community gatherings"
    }
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

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Image Carousel */}
          <Card className="overflow-hidden border-primary/30 bg-card/50 backdrop-blur">
            <div className="relative aspect-video">
              <img
                src={images[currentSlide]}
                alt={`Outreach activity ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              
              {/* Carousel controls */}
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevSlide}
                  className="h-10 w-10 bg-background/80 backdrop-blur text-primary hover:bg-background/90 hover:text-primary"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>

                <div className="flex gap-2 bg-background/80 backdrop-blur px-4 py-2 rounded-full">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/50"
                      }`}
                    />
                  ))}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextSlide}
                  className="h-10 w-10 bg-background/80 backdrop-blur text-primary hover:bg-background/90 hover:text-primary"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Description */}
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We share our knowledge and inspire the next generation through outreach 
              initiatives with local schools and community events. Through hands-on workshops 
              and mentoring programs, we help students discover their passion for STEM.
            </p>
          </div>

          {/* Activities Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {activities.map((activity) => (
              <Card key={activity.title} className="p-6 bg-card/50 border-border hover:border-primary/30 transition-colors">
                <activity.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-bold mb-2 font-mono">{activity.title}</h3>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
