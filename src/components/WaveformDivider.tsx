import waveformGif from "@/assets/waveformcircle.gif";

export const WaveformDivider = () => {
  return (
    <div className="relative py-6 md:py-8 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      {/* Decorative lines */}
      <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Waveform GIF */}
      <div className="relative z-10">
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full scale-110" />
          <img
            src={waveformGif}
            alt="Animated waveform visualization representing the creative energy of music production"
            className="relative w-24 h-24 md:w-32 md:h-32 object-contain"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
};

export default WaveformDivider;
