import { useState } from "react";

/**
 * Hook to handle external link clicks with loading state
 * Useful for tracking when users navigate to external platforms
 */
export const useExternalLink = () => {
  const [loadingLinks, setLoadingLinks] = useState<Set<string>>(new Set());

  const handleExternalClick = (url: string, label: string) => {
    // Add loading state (though browser navigation is immediate)
    setLoadingLinks((prev) => new Set(prev).add(url));
    
    // Optional: Track external link clicks for analytics
    if (import.meta.env.PROD) {
      // You can add analytics tracking here
      // e.g., gtag('event', 'click', { event_category: 'External Link', event_label: label });
    }

    // Reset loading state after a short delay (navigation happens immediately)
    setTimeout(() => {
      setLoadingLinks((prev) => {
        const next = new Set(prev);
        next.delete(url);
        return next;
      });
    }, 100);
  };

  return {
    loadingLinks,
    handleExternalClick,
  };
};
