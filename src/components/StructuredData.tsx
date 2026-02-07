/**
 * Structured Data (JSON-LD) component for SEO
 * Adds Person/Artist schema markup for better search engine understanding
 */
export const StructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Kaushal Rao",
    "alternateName": "kraogotthesauce",
    "jobTitle": "Hip-Hop Music Producer",
    "description": "Hip-hop music producer offering custom beatmaking, mixing & mastering, and music critique services.",
    "url": "https://kraogotthesauce.com",
    "sameAs": [
      "https://instagram.com/kraogotthesauce",
      "https://x.com/kraogotthesauce",
      "https://open.spotify.com/artist/2D93GdQLZxSWecarb2NIY9",
      "https://music.apple.com/us/artist/kraogotthesauce/1506258415",
      "https://soundcloud.com/kraogotthesauce"
    ],
    "email": "kaushalrao101@gmail.com",
    "knowsAbout": [
      "Hip-Hop Music Production",
      "Beatmaking",
      "Music Mixing",
      "Music Mastering",
      "Music Critique"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Music Producer",
      "occupationLocation": {
        "@type": "Country",
        "name": "United States"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
};
