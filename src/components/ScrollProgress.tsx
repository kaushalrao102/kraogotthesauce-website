import { useScrollManager } from "@/hooks/useScrollManager";

export const ScrollProgress = () => {
  const { scrollProgress } = useScrollManager();

  return (
    <div className="fixed top-16 md:top-20 left-0 w-full h-1 bg-border/50 z-[90] overflow-hidden">
      <div
        className="h-full w-full bg-gradient-to-r from-primary via-secondary to-accent"
        style={{
          transform: `scaleX(${scrollProgress})`,
          transformOrigin: "left",
          willChange: "transform",
        }}
      />
    </div>
  );
};

export default ScrollProgress;
