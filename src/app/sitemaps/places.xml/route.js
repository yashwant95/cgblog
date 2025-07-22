import { placePosts } from '../../data/placesData';

export async function GET() {
  const baseUrl = 'https://cgblog.in';
  
  // Create entries for each place
  const placeEntries = placePosts.map(place => {
    return `
    <url>
      <loc>${baseUrl}/places/${place.slug}</loc>
      <lastmod>${new Date(place.date).toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
      ${place.image ? `
      <image:image>
        <image:loc>${baseUrl}${place.image}</image:loc>
        <image:title>${place.title}</image:title>
        <image:caption>${place.excerpt}</image:caption>
      </image:image>` : ''}
    </url>`;
  }).join('');

  // Combine all URLs into the sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
    <url>
      <loc>${baseUrl}/places</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
    ${placeEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    },
  });
} 