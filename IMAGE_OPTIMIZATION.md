# Image Optimization Guide

## Overview

This guide explains how to use optimized WebP images with fallbacks for better performance.

## Running the Optimization Script

1. **Install sharp** (if not already installed):
   ```bash
   npm install --save-dev sharp
   ```

2. **Run the optimization script**:
   ```bash
   node scripts/optimize-images.js
   ```

3. **The script will**:
   - Convert all PNG/JPG images to WebP format
   - Create AVIF versions (where supported)
   - Show file size savings
   - Keep original files intact

## Using Optimized Images in Components

### Option 1: Picture Element (Recommended)

```tsx
<picture>
  <source srcSet={imageWebp} type="image/webp" />
  <source srcSet={imageAvif} type="image/avif" />
  <img 
    src={imageOriginal} 
    alt="Description"
    loading="lazy"
  />
</picture>
```

### Option 2: WebP with Fallback

```tsx
<img 
  src={imageWebp}
  srcSet={`${imageWebp} 1x, ${imageWebp2x} 2x`}
  onError={(e) => {
    // Fallback to original if WebP fails
    e.currentTarget.src = imageOriginal;
  }}
  alt="Description"
  loading="lazy"
/>
```

### Option 3: Helper Component

Create a component like this:

```tsx
// src/components/OptimizedImage.tsx
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export const OptimizedImage = ({ src, alt, className, loading = 'lazy' }: OptimizedImageProps) => {
  const webpSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  const avifSrc = src.replace(/\.(png|jpg|jpeg)$/i, '.avif');
  
  return (
    <picture>
      <source srcSet={avifSrc} type="image/avif" />
      <source srcSet={webpSrc} type="image/webp" />
      <img 
        src={src} 
        alt={alt}
        className={className}
        loading={loading}
      />
    </picture>
  );
};
```

## Expected File Size Savings

- **WebP**: Typically 25-35% smaller than PNG/JPG
- **AVIF**: Typically 50% smaller than PNG/JPG (best compression)
- **Browser Support**: 
  - WebP: All modern browsers (95%+)
  - AVIF: Chrome, Firefox, Edge (85%+)

## Current Images to Optimize

- `src/assets/background1.png`
- `src/assets/beatmaking.png`
- `src/assets/critique.png`
- `src/assets/mastering.png`
- `src/assets/profile.png`
- `src/assets/waveformcircle.gif` (GIF - consider converting to video or WebP animation)
- `public/profile-og.png`
- `music/artwork/*.png` and `*.jpg`

## Manual Optimization Tools

If you prefer manual optimization:

1. **Online Tools**:
   - [Squoosh](https://squoosh.app/) - Google's image compression tool
   - [TinyPNG](https://tinypng.com/) - PNG/JPEG compression

2. **CLI Tools**:
   - `sharp` (Node.js) - Already in script
   - `imagemagick` - Command line tool
   - `cwebp` - Google's WebP encoder

## Next Steps

1. Run the optimization script
2. Update components to use WebP versions
3. Test in different browsers
4. Monitor performance improvements
