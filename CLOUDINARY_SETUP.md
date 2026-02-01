# Cloudinary Setup Complete! ✅

Your Cloudinary integration is now configured and ready to use.

## Configuration

- **Cloud Name**: `dkp4ta9id`
- **Status**: ✅ Configured in `src/lib/cdn.ts`
- **Environment Variable**: Set in `.env` file

## How It Works

### Music Files

Cloudinary uses the `video` resource type for audio files. The helper function automatically constructs the correct URL:

```typescript
import { getMusicUrl } from '@/lib/cdn';

// Example: Get URL for a music file
const musicUrl = getMusicUrl('sauce/1_sauce.mp3');
// Returns: https://res.cloudinary.com/dkp4ta9id/video/upload/sauce/1_sauce.mp3
```

### Image Files

Images can be optimized with automatic transformations:

```typescript
import { getImageUrl, getOptimizedImageUrl } from '@/lib/cdn';

// Basic image URL
const imageUrl = getImageUrl('artwork/art_sauce.png');
// Returns: https://res.cloudinary.com/dkp4ta9id/image/upload/q_auto,f_auto/artwork/art_sauce.png

// Optimized image with specific dimensions
const optimizedUrl = getOptimizedImageUrl('artwork/art_sauce.png', 800, 600, 'webp');
// Returns: https://res.cloudinary.com/dkp4ta9id/image/upload/q_auto,f_webp,w_800,h_600/artwork/art_sauce.png
```

## File Structure in Cloudinary

Make sure your files in Cloudinary match the expected structure:

### Music Files
- `sauce/1_sauce.mp3`
- `sauce/2_angel.mp3`
- `singles/1_section.mp3`
- `throwaways(bonus!)/1_diamonds_shleempink.mp3`
- etc.

### Images
- `artwork/art_sauce.png`
- `artwork/art_changes.png`
- `profile-og.png`
- etc.

## Using in Components

### Example: Music Player

```tsx
import { getMusicUrl } from '@/lib/cdn';

const MusicPlayer = () => {
  const audioUrl = getMusicUrl('sauce/1_sauce.mp3');
  
  return (
    <audio controls>
      <source src={audioUrl} type="audio/mpeg" />
    </audio>
  );
};
```

### Example: Optimized Image

```tsx
import { OptimizedImage } from '@/components/OptimizedImage';
// Or use Cloudinary directly:
import { getOptimizedImageUrl } from '@/lib/cdn';

const MyComponent = () => {
  // Option 1: Use OptimizedImage component (handles WebP/AVIF automatically)
  return <OptimizedImage src="artwork/art_sauce.png" alt="Album Art" />;
  
  // Option 2: Use Cloudinary URL directly
  const imageUrl = getOptimizedImageUrl('artwork/art_sauce.png', 800, 800);
  return <img src={imageUrl} alt="Album Art" />;
};
```

## Cloudinary Transformations

Cloudinary supports many transformations. Common ones:

- `q_auto` - Automatic quality optimization
- `f_auto` - Automatic format (WebP, AVIF when supported)
- `f_webp` - Force WebP format
- `f_avif` - Force AVIF format
- `w_800` - Width 800px
- `h_600` - Height 600px
- `c_fill` - Crop to fill
- `c_thumb` - Thumbnail crop

Example with transformations:
```typescript
const url = getImageUrl('artwork/art_sauce.png', 'q_auto,f_webp,w_800,h_800,c_fill');
```

## Testing

To test that Cloudinary is working:

1. Check that `.env` file has `VITE_CLOUDINARY_CLOUD_NAME=dkp4ta9id`
2. Start dev server: `npm run dev`
3. Open browser console and check for any CDN-related errors
4. Verify that images/audio load from Cloudinary URLs

## Troubleshooting

### Files not loading?

1. **Check file paths**: Make sure the path in Cloudinary matches what you're using in code
2. **Check file permissions**: Ensure files are set to "Public" in Cloudinary
3. **Check console**: Look for 404 errors in browser console
4. **Verify cloud name**: Confirm `dkp4ta9id` is correct in `.env`

### Need to update cloud name?

Edit `.env` file:
```
VITE_CLOUDINARY_CLOUD_NAME=your_new_cloud_name
```

## Next Steps

1. ✅ Cloudinary is configured and ready
2. Upload any new music files to Cloudinary (if needed)
3. Update components to use `getMusicUrl()` and `getImageUrl()` helpers
4. Test that files load correctly
5. (Optional) Remove local music files from repository after confirming CDN works

## Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Transformations](https://cloudinary.com/documentation/image_transformations)
- [Cloudinary Video/Audio](https://cloudinary.com/documentation/video_manipulation_and_delivery)
