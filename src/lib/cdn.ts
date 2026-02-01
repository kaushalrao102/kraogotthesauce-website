/**
 * CDN Configuration for music files and assets using Cloudinary
 * 
 * Cloudinary Setup:
 * - Cloud name: dkp4ta9id
 * - Free tier: 25GB storage, 25GB bandwidth/month
 * 
 * Music files should be uploaded to Cloudinary with the same folder structure:
 * - sauce/1_sauce.mp3
 * - singles/1_section.mp3
 * - throwaways(bonus!)/1_diamonds_shleempink.mp3
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dkp4ta9id';
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

/**
 * Get Cloudinary URL for a music file
 * @param path - Relative path to the music file (e.g., 'sauce/1_sauce.mp3')
 * @returns Full Cloudinary URL
 * 
 * Note: Cloudinary uses 'video' resource type for audio files
 */
export const getMusicUrl = (path: string): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove 'music/' prefix if present (since files are uploaded directly to Cloudinary)
  const cloudinaryPath = cleanPath.startsWith('music/') 
    ? cleanPath.replace('music/', '') 
    : cleanPath;
  
  // Cloudinary URL format for audio/video files
  return `${CLOUDINARY_BASE_URL}/video/upload/${cloudinaryPath}`;
};

/**
 * Get Cloudinary URL for an image
 * @param path - Relative path to the image (e.g., 'artwork/art_sauce.png')
 * @param transformations - Optional Cloudinary transformations (e.g., 'q_auto,f_auto')
 * @returns Full Cloudinary URL
 */
export const getImageUrl = (path: string, transformations: string = 'q_auto,f_auto'): string => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Remove 'public/' or 'src/assets/' prefix if present
  let cloudinaryPath = cleanPath;
  if (cloudinaryPath.startsWith('public/')) {
    cloudinaryPath = cloudinaryPath.replace('public/', '');
  } else if (cloudinaryPath.startsWith('src/assets/')) {
    cloudinaryPath = cloudinaryPath.replace('src/assets/', '');
  }
  
  // Cloudinary URL format for images
  return `${CLOUDINARY_BASE_URL}/image/upload/${transformations}/${cloudinaryPath}`;
};

/**
 * Get Cloudinary URL with specific transformations
 * Useful for responsive images, cropping, etc.
 * 
 * @param path - Image path
 * @param width - Optional width
 * @param height - Optional height
 * @param format - Optional format (auto, webp, avif)
 * @returns Cloudinary URL with transformations
 */
export const getOptimizedImageUrl = (
  path: string,
  width?: number,
  height?: number,
  format: 'auto' | 'webp' | 'avif' = 'auto'
): string => {
  const transformations: string[] = ['q_auto', `f_${format}`];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  
  return getImageUrl(path, transformations.join(','));
};
