# CDN Setup Guide for Music Files

## Recommended Options

### Option 1: Cloudinary (Recommended for Ease of Use)
**Free Tier**: 25GB storage, 25GB bandwidth/month

**Steps:**
1. Sign up at https://cloudinary.com
2. Get your Cloud Name from the dashboard
3. Upload your music files to Cloudinary
4. Set environment variable:
   ```bash
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```
5. Update `src/lib/cdn.ts` to use Cloudinary URL format

**Cloudinary URL Format:**
```
https://res.cloudinary.com/{cloud_name}/video/upload/{public_id}.mp3
```

### Option 2: AWS S3 + CloudFront
**Free Tier**: 5GB S3 storage, 50GB CloudFront transfer/month (first year)

**Steps:**
1. Create S3 bucket for music files
2. Upload files to S3
3. Create CloudFront distribution
4. Set environment variable:
   ```bash
   VITE_CDN_BASE_URL=https://your-distribution.cloudfront.net
   ```

### Option 3: Cloudflare R2
**Free Tier**: 10GB storage, unlimited egress

**Steps:**
1. Sign up for Cloudflare
2. Create R2 bucket
3. Upload files
4. Create public domain or use Cloudflare Workers
5. Set environment variable:
   ```bash
   VITE_CDN_BASE_URL=https://your-r2-domain.com
   ```

### Option 4: Vercel Blob Storage
**Free Tier**: 1GB storage, 100GB bandwidth/month

**Steps:**
1. Install Vercel Blob: `npm install @vercel/blob`
2. Upload files via Vercel dashboard or API
3. Use blob URLs directly

## Current Implementation

The codebase is set up to use CDN URLs via `src/lib/cdn.ts`. 

**To use CDN:**
1. Choose a CDN provider
2. Upload your music files
3. Set the `VITE_CDN_BASE_URL` environment variable
4. Update components to use `getMusicUrl()` helper

**Example:**
```typescript
import { getMusicUrl } from '@/lib/cdn';

const musicUrl = getMusicUrl('sauce/1_sauce.mp3');
```

## Migration Steps

1. **Upload files to CDN** (choose one of the options above)
2. **Update environment variables** in `.env`:
   ```bash
   VITE_CDN_BASE_URL=https://your-cdn-url.com
   ```
3. **Update components** that reference music files (currently none in codebase, but ready for future use)
4. **Test** that files load correctly from CDN
5. **Update .gitignore** to exclude music files from repository:
   ```gitignore
   music/**/*.mp3
   music/**/*.wav
   music/**/*.m4a
   ```

## Benefits of Using CDN

- ✅ Faster loading times (CDN edge locations)
- ✅ Reduced server costs
- ✅ Better scalability
- ✅ Smaller git repository
- ✅ Automatic caching and compression
- ✅ Bandwidth savings
