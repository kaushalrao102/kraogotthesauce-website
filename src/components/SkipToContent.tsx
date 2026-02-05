/**
 * Skip to Content Link
 * Accessibility feature that allows keyboard users to skip navigation
 * and jump directly to main content
 */
export const SkipToContent = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to content
    </a>
  );
};
