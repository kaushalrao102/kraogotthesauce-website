import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  width?: number;
  height?: number;
  onLoad?: () => void;
}

/**
 * OptimizedImage component that automatically uses WebP/AVIF with fallbacks
 * 
 * Usage:
 * <OptimizedImage 
 *   src="/path/to/image.png" 
 *   alt="Description"
 *   className="..."
 * />
 */
export const OptimizedImage = ({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
  onLoad,
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);

  // Generate WebP and AVIF paths
  const getOptimizedPaths = (originalSrc: string) => {
    const basePath = originalSrc.replace(/\.(png|jpg|jpeg)$/i, "");
    const extension = originalSrc.match(/\.(png|jpg|jpeg)$/i)?.[1] || "png";
    
    return {
      avif: `${basePath}.avif`,
      webp: `${basePath}.webp`,
      original: originalSrc,
      extension,
    };
  };

  const paths = getOptimizedPaths(src);

  // If error loading optimized versions, fall back to original
  if (error) {
    return (
      <img
        src={paths.original}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onLoad={onLoad}
      />
    );
  }

  return (
    <picture>
      {/* AVIF - best compression, newer format */}
      <source srcSet={paths.avif} type="image/avif" />
      {/* WebP - good compression, wide support */}
      <source srcSet={paths.webp} type="image/webp" />
      {/* Fallback to original */}
      <img
        src={paths.original}
        alt={alt}
        className={className}
        loading={loading}
        width={width}
        height={height}
        onLoad={onLoad}
        onError={() => setError(true)}
      />
    </picture>
  );
};
