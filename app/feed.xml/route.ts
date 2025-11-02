import { Feed } from 'feed';
import { getAllPosts } from '../../lib/posts';
import { siteConfig } from '../../lib/config';

// Required for static export
export const dynamic = 'force-static';

export async function GET() {
  const feed = new Feed({
    title: `${siteConfig.title} - Blog`,
    description: siteConfig.description,
    id: siteConfig.url,
    link: siteConfig.url,
    language: 'en-US',
    image: `${siteConfig.url}/android-chrome-384x384.png`,
    favicon: `${siteConfig.url}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteConfig.fullName}`,
    updated: new Date(),
    generator: 'Next.js Feed Generator',
    feedLinks: {
      rss: `${siteConfig.url}/feed.xml`,
    },
    author: {
      name: siteConfig.fullName,
      email: siteConfig.email,
      link: siteConfig.url,
    },
  });

  const posts = getAllPosts();

  // Limit to the most recent 50 posts to keep feed size reasonable
  const recentPosts = posts.slice(0, 50);

  recentPosts.forEach((post) => {
    const postUrl = `${siteConfig.url}/blog/${post.slug}/`;

    // Convert YYYY-MM-DD date to proper Date object
    const postDate = new Date(post.date + 'T12:00:00.000Z');

    // Create a clean description from description or truncated content
    let description = post.description || '';
    if (!description && post.content) {
      // Remove markdown and HTML, then truncate
      description =
        post.content
          .replace(/#{1,6}\s+/g, '') // Remove markdown headers
          .replace(/\*\*([^*]+)\*\*/g, '$1') // Remove bold markdown
          .replace(/\*([^*]+)\*/g, '$1') // Remove italic markdown
          .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove markdown links
          .replace(/<[^>]*>/g, '') // Remove HTML tags
          .slice(0, 200) + '...';
    }

    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: description,
      content: post.content,
      author: [
        {
          name: post.author || siteConfig.fullName,
          email: siteConfig.email,
          link: siteConfig.url,
        },
      ],
      date: postDate,
      category: post.tags
        ? post.tags.split(',').map((tag) => ({ name: tag.trim() }))
        : [],
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
