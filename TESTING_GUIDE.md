# Testing Your Website 🧪

## Quick Start

The development server should now be running! Here's how to test your website:

### 1. Open in Browser

**The website should be available at:**
```
http://localhost:8080
```

Open this URL in your browser to see your website.

### 2. What to Test

#### ✅ Visual Elements
- [ ] **Header** - Check navigation, social links, and mobile menu
- [ ] **Hero Section** - Profile image, animations, audio tag (click profile image)
- [ ] **Services Section** - Accordion items expand/collapse
- [ ] **Footer** - Social links, music platform links, back-to-top button
- [ ] **Scroll Progress** - Progress bar at top when scrolling

#### ✅ Functionality
- [ ] **Audio Tag** - Click profile image in hero section to play audio
- [ ] **Smooth Scrolling** - Click navigation links to scroll to sections
- [ ] **Mobile Menu** - Test on mobile/tablet or resize browser
- [ ] **External Links** - Click social/music links (should open in new tab)
- [ ] **Back to Top** - Scroll down, then click the button in footer

#### ✅ Responsive Design
- [ ] **Desktop** - Full width browser
- [ ] **Tablet** - Resize to ~768px width
- [ ] **Mobile** - Resize to ~375px width
- [ ] **Navigation** - Should show hamburger menu on mobile

#### ✅ Performance
- [ ] **Page Load** - Should be fast and smooth
- [ ] **Animations** - Fade-in effects should work
- [ ] **Images** - Should load properly (check console for errors)

### 3. Browser Console

**Open Developer Tools** (F12 or Cmd+Option+I on Mac):
- Check for any errors (red messages)
- Check for warnings (yellow messages)
- Verify Cloudinary URLs are being generated correctly

### 4. Testing Cloudinary Integration

To test Cloudinary URLs, open browser console and run:

```javascript
// Test music URL generation
import { getMusicUrl } from '@/lib/cdn';
console.log(getMusicUrl('sauce/1_sauce.mp3'));

// Test image URL generation  
import { getImageUrl } from '@/lib/cdn';
console.log(getImageUrl('artwork/art_sauce.png'));
```

Or check the Network tab to see if Cloudinary URLs are being requested.

### 5. Testing Error Boundary

To test the error boundary (optional):
1. Temporarily break a component
2. You should see a friendly error message instead of a blank page

### 6. Testing on Different Devices

**Local Network Access:**
Since the server is configured with `host: "::"`, you can access it from other devices on your network:

1. Find your computer's IP address:
   ```bash
   # On Mac/Linux:
   ifconfig | grep "inet "
   
   # Or:
   ipconfig getifaddr en0
   ```

2. Access from phone/tablet:
   ```
   http://YOUR_IP_ADDRESS:8080
   ```

### 7. Common Issues & Fixes

**Port Already in Use:**
```bash
# Kill process on port 8080
lsof -ti:8080 | xargs kill -9

# Or change port in vite.config.ts
```

**Images Not Loading:**
- Check browser console for 404 errors
- Verify image paths are correct
- Check if Cloudinary files are set to "Public"

**Styles Not Applied:**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check if Tailwind is compiling correctly

**TypeScript Errors:**
- Check terminal for compilation errors
- Some errors might be warnings (non-blocking)

### 8. Production Build Test

To test the production build:

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

This will show you how the site looks when deployed.

### 9. Performance Testing

**Lighthouse Audit:**
1. Open Chrome DevTools
2. Go to "Lighthouse" tab
3. Run audit for Performance, Accessibility, SEO, Best Practices

**Network Tab:**
- Check load times
- Verify assets are loading efficiently
- Check for large files that could be optimized

## Quick Commands

```bash
# Start dev server (if not running)
npm run dev

# Stop dev server
# Press Ctrl+C in terminal

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Check for linting errors
npm run lint
```

## What's New to Test

Since the recent changes, make sure to test:

1. ✅ **Error Boundary** - Should catch any React errors gracefully
2. ✅ **Analytics** - Check console (should be disabled in dev mode)
3. ✅ **Cloudinary URLs** - Check Network tab for Cloudinary requests
4. ✅ **TypeScript StrictNullChecks** - Should catch null/undefined issues
5. ✅ **Performance Optimizations** - Should load faster

## Need Help?

- Check browser console for errors
- Check terminal for build errors
- See `CLOUDINARY_SETUP.md` for Cloudinary-specific issues
- See `IMPROVEMENTS.md` for all changes made

---

**Your website should now be running at http://localhost:8080** 🚀
