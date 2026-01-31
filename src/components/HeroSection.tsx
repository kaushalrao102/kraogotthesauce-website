import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Volume2 } from "lucide-react";
import backgroundImage from "@/assets/background1.png";
import profileImage from "@/assets/profile.png";
import tagAudio from "@/assets/tag-audio.mp3";

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleProfileClick = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background with Fade-in */}
      <div
        className="absolute inset-0 parallax-bg-fade"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image with Float Animation and Rotating Gradient */}
          <div
            className={`mb-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <button
              onClick={handleProfileClick}
              className={`relative inline-block profile-float rotating-gradient-wrapper cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full ${isPlaying ? 'audio-playing' : ''}`}
              aria-label={isPlaying ? "Pause audio tag" : "Play audio tag"}
            >
              {/* Skeleton loader */}
              {!profileLoaded && (
                <div className="absolute inset-0 w-40 h-40 md:w-52 md:h-52 rounded-full bg-muted animate-pulse" />
              )}
              <img
                src={profileImage}
                alt="Kaushal Rao - music producer (kraogotthesauce) portrait"
                className={`relative w-40 h-40 md:w-52 md:h-52 rounded-full object-cover transition-opacity duration-500 ${
                  profileLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setProfileLoaded(true)}
              />
              {/* Audio playing indicator */}
              {isPlaying && (
                <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-1.5 animate-pulse">
                  <Volume2 className="w-4 h-4" />
                </div>
              )}
            </button>
            {/* Hidden audio element */}
            <audio ref={audioRef} src={tagAudio} onEnded={() => setIsPlaying(false)} />
          </div>

          {/* Headline */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-gradient">kraogotthesauce</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-muted-foreground font-medium mb-8 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Hip-Hop Music Producer
          </p>

          {/* One-liner / Short Bio */}
          <p
            className={`text-lg md:text-xl text-primary/90 italic mb-12 transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            "I craft custom hip-hop and experimental beats, master tracks for streaming, and provide producer-level feedback to help artists level up."
          </p>

          {/* Full Bio */}
          <div
            className={`max-w-2xl mx-auto text-left md:text-center transition-all duration-700 delay-[400ms] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-border space-y-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30">
              <p className="text-muted-foreground leading-relaxed">
                Hi! Thank you for visiting my website. My name is Kaushal Rao, and I produce hip-hop music under the alias <strong className="text-primary/90">kraogotthesauce</strong>. My catalog spans multiple projects, including two beat tapes, two full-length albums, and a growing collection of singles. While much of my early work lives on SoundCloud, my more recent releases are available across all major streaming platforms.
              </p>
              
              {/* Expandable content */}
              <div className={`space-y-4 overflow-hidden transition-all duration-500 ${showFullBio ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                <p className="text-muted-foreground leading-relaxed">
                  I grew up playing the trumpet and violin, which gave me an early foundation in melody and structure. In middle school, I discovered hip-hop through iHeartRadio and quickly gravitated toward artists like Eminem, Drake, Lil Wayne, Jay-Z, and Dr. Dre. I started making music on Garageband when I was 15 years old, primarily because I also wanted to make music but I didn't really have anything to rap about. A few years later, I transitioned to Logic Pro X, giving me greater control and creative flexibility in my workflow.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Since then, I've focused on experimenting across subgenres and collaborating with emerging artists to bring full songs to life. I released my first beat tape, <em className="text-primary/80">Resolutionzzzzz</em>, in 2017, followed by <em className="text-primary/80">Vacationzzzzz</em> in 2018. These projects marked an early period of exploration, helping define my style while pushing me to try new sounds, tempos, and textures.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  In 2019, I released my first ever full-length album (<em className="text-primary/80">Revelationzzzzz</em>) in collaboration with different underground artists including LEEWAY, Krishu, Soul-G, BISSIBOI, and Ca$hfllow. Life got a bit busier after that, but several years later in 2023, I released another full-length album (<em className="text-primary/80">Sauce!</em>) that I am really proud of. I got a lot better at producing, mixing, and mastering during those years in between, and also was able to work with talented artists like seiji oda, Surf, Kevin Kazi, 6ixteenth, Reezan, and airy baby.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Music remains both a creative outlet and a constant through changing seasons of life. I've been working on a new album since 2024, and I hope to release it this year. Let's see.
                </p>
              </div>

              {/* Read more / Read less button */}
              <button
                onClick={() => setShowFullBio(!showFullBio)}
                className="flex items-center justify-center gap-1 mx-auto text-primary hover:text-primary/80 transition-colors text-sm font-medium mt-2"
              >
                {showFullBio ? (
                  <>
                    Read less <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Read more <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
