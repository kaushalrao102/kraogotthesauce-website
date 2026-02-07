import { useEffect, useRef, useState, useCallback } from "react";

interface ScrollState {
  scrollY: number;
  scrollProgress: number; // 0 to 1
  isScrolled: boolean; // scrolled past 50px
  direction: "up" | "down" | "none";
}

interface UseScrollManagerOptions {
  onScroll?: (state: ScrollState) => void;
}

/**
 * Shared scroll manager hook that consolidates all scroll listeners
 * Provides batched updates and reduces re-renders
 * Single source of truth for scroll state across all components
 */
export const useScrollManager = (options: UseScrollManagerOptions = {}) => {
  const { onScroll } = options;
  const [scrollState, setScrollState] = useState<ScrollState>({
    scrollY: 0,
    scrollProgress: 0,
    isScrolled: false,
    direction: "none",
  });

  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);
  const onScrollRef = useRef(onScroll);

  // Update callback ref when it changes
  useEffect(() => {
    onScrollRef.current = onScroll;
  }, [onScroll]);

  const updateScrollState = useCallback(() => {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollHeight > 0 ? Math.min(Math.max(scrollY / scrollHeight, 0), 1) : 0;
    const isScrolled = scrollY > 50;
    const direction = scrollY > lastScrollY.current ? "down" : scrollY < lastScrollY.current ? "up" : "none";

    const newState: ScrollState = {
      scrollY,
      scrollProgress,
      isScrolled,
      direction,
    };

    setScrollState(newState);
    lastScrollY.current = scrollY;

    // Call optional callback
    if (onScrollRef.current) {
      onScrollRef.current(newState);
    }

    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      rafId.current = requestAnimationFrame(updateScrollState);
      ticking.current = true;
    }
  }, [updateScrollState]);

  useEffect(() => {
    // Initial state
    updateScrollState();

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [handleScroll, updateScrollState]);

  return scrollState;
};
