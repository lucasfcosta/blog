import { getAllPosts, getAllTalks } from '../../lib/posts';
import { siteConfig } from '../../lib/config';

// Required for static export
export const dynamic = 'force-static';

export async function GET() {
  const baseUrl = siteConfig.url;

  // Get all posts and talks
  const posts = getAllPosts();
  const talks = getAllTalks();

  // Generate sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Health disclaimer page -->
  <url>
    <loc>${baseUrl}/health-advice-disclaimer/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
  <!-- Blog posts -->
${posts
  .map(
    (post) => `  <url>
    <loc>${baseUrl}/${post.slug}/</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
  
  <!-- Talks -->
${talks
  .map(
    (talk) => `  <url>
    <loc>${baseUrl}/talks/${talk.slug}/</loc>
    <lastmod>${new Date(talk.date).toISOString()}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate',
    },
  });
}
