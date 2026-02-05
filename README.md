# kraogotthesauce Website

Personal website for music production showcasing hip-hop beats, artist services, and portfolio.

## Tech Stack

- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **React** - UI framework
- **shadcn-ui** - UI component library
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **TanStack Query** - Data fetching (configured, ready for API integration)

## Features

- 🎵 Music producer portfolio
- 🎨 Modern, responsive design
- ♿ Accessibility features
- 🔍 SEO optimized (structured data, sitemap, meta tags)
- 🛡️ Error boundaries for graceful error handling
- 📱 Mobile-first responsive design
- 🎭 Smooth animations and transitions

## Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn-ui components
│   ├── Header.tsx   # Navigation header
│   ├── HeroSection.tsx
│   ├── ServicesSection.tsx
│   ├── Footer.tsx
│   ├── ErrorBoundary.tsx
│   └── StructuredData.tsx
├── pages/           # Page components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
└── assets/          # Images, audio, etc.

public/
├── sitemap.xml      # SEO sitemap
├── robots.txt       # Search engine directives
└── _headers         # Security headers (Netlify/Cloudflare)
```

## License

Personal project - All rights reserved.
