import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import beatmakingImage from "@/assets/beatmaking.png";
import masteringImage from "@/assets/mastering.png";
import critiqueImage from "@/assets/critique.png";

interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
}

const services: Service[] = [
  {
    id: "beatmaking",
    title: "Beatmaking",
    tagline: "Custom instrumentals crafted to your vision",
    description:
      "I love making music, and I feel inspired when challenged to create a specific sound or vibe that's different from what I would typically make. Over time, I've developed a style that blends sample-based, boom-bap, and soulful production, but don't let that limit your vision—I'm always down to experiment and push into new territory. Reach out to collaborate or commission a one-of-a-kind beat.",
    image: beatmakingImage,
    imageAlt: "kraogotthesauce hands on MPC creating hip-hop beats",
  },
  {
    id: "mastering",
    title: "Mixing & Mastering",
    tagline: "Professional polish for release-ready sound",
    description:
      "I pride myself on making my music sound professional and polished, even when the aesthetic calls for a lo-fi or gritty texture. If you have a finished song that needs mix refinement or mastering for streaming platforms, I can help bring out clarity, punch, and warmth while preserving the character of your original vision. From balancing levels to final loudness optimization, I handle every detail.",
    image: masteringImage,
    imageAlt: "DAW interface showing mixing and mastering session",
  },
  {
    id: "critique",
    title: "Music Critique",
    tagline: "Constructive feedback to elevate your craft",
    description:
      "I tend to listen to music with a producer's ear, focusing not just on lyrics and vibe but also on structure, sound selection, and mix decisions. If you're looking for honest, constructive feedback on your latest track, EP, or album, I offer detailed critique sessions to help you identify strengths and areas for improvement—delivered with respect and a genuine desire to see you grow.",
    image: critiqueImage,
    imageAlt: "Music producer consultation providing track feedback",
  },
];

const scrollToConnect = () => {
  document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" });
};

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-12 md:py-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Services
          </h2>
        </div>

        {/* Services Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className={`bg-card border border-border rounded-xl overflow-hidden hover-scale transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms",
                }}
              >
                <AccordionTrigger className="px-6 py-6 hover:no-underline group">
                  <div className="flex items-center gap-4 md:gap-6 w-full">
                    {/* Service Image - Circular with border and skeleton */}
                    <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-primary/30" style={{ aspectRatio: '1/1' }}>
                      {!loadedImages[service.id] && (
                        <div className="absolute inset-0 bg-muted animate-pulse" />
                      )}
                      <img
                        src={service.image}
                        alt={service.imageAlt}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${
                          loadedImages[service.id] ? "opacity-100" : "opacity-0"
                        }`}
                        loading="lazy"
                        onLoad={() => handleImageLoad(service.id)}
                      />
                    </div>
                    
                    {/* Service Info */}
                    <div className="flex-1 text-left">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">
                        {service.tagline}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-6">
                  <div className="pt-4 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <button
                      onClick={scrollToConnect}
                      className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium"
                    >
                      Get In Touch
                    </button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
