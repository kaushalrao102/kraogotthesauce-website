/**
 * Google Analytics integration
 * Replace GA_MEASUREMENT_ID with your actual Google Analytics Measurement ID
 */

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const initAnalytics = () => {
  if (!GA_MEASUREMENT_ID) {
    if (import.meta.env.DEV) {
      console.log('Analytics disabled: No VITE_GA_MEASUREMENT_ID set in .env file');
    }
    return;
  }

  // Skip in development unless explicitly enabled
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_ANALYTICS_IN_DEV !== 'true') {
    console.log('Analytics disabled in development mode');
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };

  // Load Google Analytics script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Configure Google Analytics
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (!GA_MEASUREMENT_ID || import.meta.env.DEV) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const trackPageView = (path: string) => {
  if (!GA_MEASUREMENT_ID || import.meta.env.DEV) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

export const trackExternalLink = (url: string, label: string) => {
  trackEvent('click', 'External Link', label);
};
