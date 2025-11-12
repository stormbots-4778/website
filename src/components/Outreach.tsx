import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface OutreachImage {
  filename: string;
  caption: string;
}

export const Outreach = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [images, setImages] = useState<Array<{ url: string; caption: string }>>([]);

  useEffect(() => {
    // Load outreach images from src/assets/outreach/outreach.json
    const loadOutreachImages = async () => {
      try {
        const outreachData = await import('../assets/outreach/outreach.json');
        if (outreachData.default && Array.isArray(outreachData.default)) {
          const imageData: OutreachImage[] = outreachData.default;
          
          // Load image URLs from filenames
          const loadedImages = await Promise.all(
            imageData.map(async (item) => {
              try {
                const imageModule = await import(`../assets/outreach/${item.filename}`);
                return {
                  url: imageModule.default,
                  caption: item.caption,
                };
              } catch (error) {
                console.warn(`Could not load image ${item.filename}:`, error);
                return null;
              }
            })
          );
          
          const validImages = loadedImages.filter((img): img is { url: string; caption: string } => img !== null);
          if (validImages.length > 0) {
            setImages(validImages);
            return;
          }
        }
      } catch (error) {
        console.warn('Could not load outreach images:', error);
      }
      // Fallback to empty if JSON fails to load
      setImages([]);
    };

    loadOutreachImages();
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  if (images.length === 0) {
    return null;
  }

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
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-0">
              {images.map((image, index) => (
                <CarouselItem key={index} className="pl-0">
                  {/* Image Frame */}
                  <div className="relative rounded-2xl overflow-hidden border-2 border-primary/30">
                    <div className="relative aspect-video">
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <p className="text-lg font-mono text-foreground">
                          {image.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollPrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 h-14 w-14 text-primary hover:bg-primary/10"
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => api?.scrollNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 h-14 w-14 text-primary hover:bg-primary/10"
          >
            <ChevronRight className="w-8 h-8" />
          </Button>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === current
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
