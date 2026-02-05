import { useState, useEffect, useRef } from "react";
import { Instagram, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackExternalLink } from "@/lib/analytics";
import { toast } from "@/hooks/use-toast";

// Custom SVG icons for platforms
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const SpotifyIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
);

const AppleMusicIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.873-.09-2.66-.73a2.1 2.1 0 01-.602-.788 2.086 2.086 0 01-.158-1.116c.1-.647.44-1.152.978-1.524.306-.21.65-.353 1.008-.46.387-.114.783-.19 1.18-.267.358-.07.716-.132 1.064-.233.174-.05.332-.128.457-.266a.59.59 0 00.164-.427V8.07c0-.197-.076-.327-.262-.39-.12-.04-.244-.063-.37-.08-.376-.052-.755-.088-1.132-.136l-3.852-.462c-.08-.01-.16-.02-.24-.032-.26-.043-.453.09-.512.34-.01.047-.015.096-.015.144v7.47c0 .352-.023.7-.134 1.037-.166.498-.47.898-.91 1.185-.267.175-.564.29-.877.37-.406.102-.82.147-1.238.154-.76.013-1.483-.107-2.116-.563-.443-.32-.747-.736-.87-1.276a2.103 2.103 0 01.062-1.152c.206-.56.576-.998 1.072-1.32.286-.187.6-.318.926-.418.39-.12.79-.193 1.19-.27l.592-.106c.28-.054.552-.124.81-.24a.75.75 0 00.416-.515.91.91 0 00.02-.2V5.282c0-.138.013-.278.04-.414.088-.43.34-.672.773-.725.19-.023.38-.032.57-.038l4.36-.016c.747-.002 1.493.033 2.236.116.197.022.39.065.582.116.39.104.603.388.64.79.013.14.02.28.02.42v4.6z"/>
  </svg>
);

const SoundCloudIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    aria-hidden="true"
  >
    {/* Simplified SoundCloud waveform bars + cloud */}
    <rect x="1" y="14" width="1.5" height="4" rx="0.75" />
    <rect x="4" y="12" width="1.5" height="6" rx="0.75" />
    <rect x="7" y="10" width="1.5" height="8" rx="0.75" />
    <rect x="10" y="8" width="1.5" height="10" rx="0.75" />
    <path d="M14 18h6a4 4 0 0 0 0-8h-.5a5.5 5.5 0 0 0-5.5-4 5.5 5.5 0 0 0-5 3.2V18h5z" />
  </svg>
);

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
];

const socialLinks = [
  {
    href: "https://instagram.com/kraogotthesauce",
    label: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://x.com/kraogotthesauce",
    label: "X (Twitter)",
    icon: XIcon,
  },
  {
    href: "mailto:kraogotthesauce@gmail.com",
    label: "Email",
    icon: Mail,
  },
];

const musicLinks = [
  {
    href: "https://open.spotify.com/artist/2D93GdQLZxSWecarb2NIY9?si=Y1nKWb0GRsynT7ZDt4Dq0A",
    label: "Spotify",
    icon: SpotifyIcon,
  },
  {
    href: "https://music.apple.com/us/artist/kraogotthesauce/1506258415",
    label: "Apple Music",
    icon: AppleMusicIcon,
  },
  {
    href: "https://soundcloud.com/kraogotthesauce",
    label: "SoundCloud",
    icon: SoundCloudIcon,
  },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section (check in reverse order for proper highlighting)
      const sections = ["services", "about"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key handler to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        // Return focus to menu button
        mobileMenuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isMobileMenuOpen]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const menu = mobileMenuRef.current;
    const focusableElements = menu.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Focus first element when menu opens
    firstElement?.focus();
    menu.addEventListener("keydown", handleTabKey);

    return () => {
      menu.removeEventListener("keydown", handleTabKey);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      // Calculate header height (h-16 md:h-20 = 64px/80px)
      const headerHeight = window.innerWidth >= 768 ? 80 : 64;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - 20; // 20px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-background/60 backdrop-blur-sm"
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick("#about");
                    }}
                    className="text-xl md:text-2xl font-bold text-primary hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                  >
                    kraogotthesauce
                  </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                        className={cn(
                  // Underline-only selected state; avoid focus ring "pill" on click
                  "relative text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:underline focus-visible:underline-offset-8 focus-visible:decoration-2 focus-visible:decoration-primary rounded-none",
                          activeSection === link.href.slice(1)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-foreground"
                        )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Desktop Social & Music Icons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Music Links */}
            {musicLinks.map((music) => (
              <a
                key={music.label}
                href={music.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={music.label}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                onClick={() => {
                  trackExternalLink(music.href, music.label);
                  toast({
                    title: "Opening link",
                    description: `Opening ${music.label}...`,
                  });
                }}
              >
                <music.icon className="w-5 h-5" />
              </a>
            ))}
            
            {/* Divider */}
            <div className="w-px h-5 bg-border mx-1" />
            
            {/* Social Links */}
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                onClick={() => {
                  if (!social.href.startsWith("mailto")) {
                    trackExternalLink(social.href, social.label);
                    toast({
                      title: "Opening link",
                      description: `Opening ${social.label}...`,
                    });
                  }
                }}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={mobileMenuButtonRef}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 top-16 bg-background/80 backdrop-blur-md md:hidden z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        <div
          ref={mobileMenuRef}
          aria-modal="true"
          role="dialog"
          aria-label="Mobile navigation menu"
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out relative z-50",
            isMobileMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                        className={cn(
                          "text-lg font-medium py-2 transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm",
                          activeSection === link.href.slice(1)
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
              >
                {link.label}
              </a>
            ))}
            
            {/* Music Links */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Listen</p>
              <div className="flex items-center gap-6">
                        {musicLinks.map((music) => (
                          <a
                            key={music.label}
                            href={music.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={music.label}
                            className="text-muted-foreground hover:text-primary transition-all active:scale-95 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                            onClick={() => {
                              trackExternalLink(music.href, music.label);
                              toast({
                                title: "Opening link",
                                description: `Opening ${music.label}...`,
                              });
                            }}
                          >
                    <music.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Social Links */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider">Connect</p>
              <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                          <a
                            key={social.label}
                            href={social.href}
                            target={social.href.startsWith("mailto") ? undefined : "_blank"}
                            rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                            aria-label={social.label}
                            className="text-muted-foreground hover:text-primary transition-all active:scale-95 p-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-sm"
                            onClick={() => {
                              if (!social.href.startsWith("mailto")) {
                                trackExternalLink(social.href, social.label);
                                toast({
                                  title: "Opening link",
                                  description: `Opening ${social.label}...`,
                                });
                              }
                            }}
                          >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
