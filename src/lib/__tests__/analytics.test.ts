import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { trackEvent, trackPageView, trackExternalLink, initAnalytics } from "../analytics";

describe("Analytics", () => {
  beforeEach(() => {
    // Mock window.gtag
    window.gtag = vi.fn();
    window.dataLayer = [];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("trackEvent", () => {
    it("calls gtag with correct parameters", () => {
      trackEvent("click", "Button", "Header CTA", 1);
      expect(window.gtag).toHaveBeenCalledWith("event", "click", {
        event_category: "Button",
        event_label: "Header CTA",
        value: 1,
      });
    });

    it("does not call gtag in development mode", () => {
      const originalEnv = import.meta.env.DEV;
      // @ts-expect-error - temporarily override env
      import.meta.env.DEV = true;

      trackEvent("click", "Button");
      expect(window.gtag).not.toHaveBeenCalled();

      // @ts-expect-error - restore env
      import.meta.env.DEV = originalEnv;
    });
  });

  describe("trackPageView", () => {
    it("calls gtag with page path", () => {
      trackPageView("/about");
      expect(window.gtag).toHaveBeenCalledWith("config", "", {
        page_path: "/about",
      });
    });
  });

  describe("trackExternalLink", () => {
    it("calls trackEvent with correct parameters", () => {
      trackExternalLink("https://example.com", "Example Link");
      expect(window.gtag).toHaveBeenCalledWith("event", "click", {
        event_category: "External Link",
        event_label: "Example Link",
        value: undefined,
      });
    });
  });
});
