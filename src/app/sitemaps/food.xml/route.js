import { foodPosts } from '../../data/foodData';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET() {
  const baseUrl = 'https://cgblog.in';
  
  // Create entries for each food item
  const foodEntries = foodPosts.map(food => {
    return `
    <url>
      <loc>${baseUrl}/food/${food.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`;
  }).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${foodEntries}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400'
    },
  });
}
