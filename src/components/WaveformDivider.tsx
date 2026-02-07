import { useState } from "react";
import waveformGif from "@/assets/waveformcircle.gif";
import { Skeleton } from "@/components/ui/skeleton";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { cn } from "@/lib/utils";

export const WaveformDivider = () => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={elementRef as React.RefObject<HTMLDivElement>}
      className={cn(
        "relative pt-8 md:pt-10 pb-2 md:pb-3 flex items-center justify-center transition-all duration-700",
        hasIntersected
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
    >
      {/* Background gradient - matches hero section final state for seamless transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
      
      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      
      {/* Waveform GIF with glow - wrapper allows glow to extend */}
      <div className="relative z-10 px-8 py-8 -mt-4 md:-mt-5">
        <div className="relative animate-pulse-subtle">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full scale-110" />
          {!imageLoaded && (
            <Skeleton className="absolute inset-0 w-24 h-24 md:w-32 md:h-32 rounded-full" />
          )}
          <img
            src={waveformGif}
            alt="Animated waveform visualization representing the creative energy of music production"
            className={`relative w-24 h-24 md:w-32 md:h-32 object-contain transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default WaveformDivider;
