import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware for handling Jekyll to Next.js redirects
 *
 * This handles redirects for static export deployment where
 * next.config.js redirects don't work
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (request.headers.get('x-middleware-rewrite')) {
    return NextResponse.next();
  }

  // Handle Jekyll date-based URLs: /YYYY/MM/DD/post-slug.html -> /blog/post-slug
  const jekyllPostMatch = pathname.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
  if (jekyllPostMatch) {
    const [, year, month, day, slugPart] = jekyllPostMatch;
    const slug = slugPart.replace(/\.html$/, '').replace(/\/$/, '');
    const newPath = `/blog/${slug}`;

    if (pathname !== newPath && !newPath.match(/^\/\d{4}\//)) {
      const newUrl = new URL(newPath, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Handle Jekyll reveries URLs: /reveries/YYYY-MM-DD-slug.html -> /blog/slug
  const reveriesMatch = pathname.match(
    /^\/reveries\/(\d{4}-\d{2}-\d{2})-(.+?)(?:\.html)?(?:\/)?$/
  );
  if (reveriesMatch) {
    const [, date, slug] = reveriesMatch;
    const newPath = `/blog/${slug}`;

    if (pathname !== newPath && !newPath.startsWith('/reveries/')) {
      const newUrl = new URL(newPath, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Handle old static pages with .html extension only
  if (pathname.endsWith('.html')) {
    const staticPageRedirects: Record<string, string> = {
      '/about.html': '/about',
      '/talks.html': '/talks',
      '/reveries.html': '/reveries',
      '/disclaimer.html': '/disclaimer',
    };

    const redirectTarget = staticPageRedirects[pathname];

    if (redirectTarget && pathname !== redirectTarget) {
      const newUrl = new URL(redirectTarget, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Redirect old root-level blog post URLs to /blog/ prefix
  // Exclude known static pages
  const staticPages = [
    'about',
    'talks',
    'health-advice-disclaimer',
    'page',
    'blog',
    '_next',
    'api',
    'assets',
    'css',
    'fonts',
    'webfonts',
  ];

  const pathParts = pathname.split('/').filter(Boolean);
  if (
    pathParts.length === 1 &&
    !staticPages.includes(pathParts[0]) &&
    !pathParts[0].includes('.')
  ) {
    const newPath = `/blog/${pathParts[0]}`;
    const newUrl = new URL(newPath, request.url);
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match date-based URLs: /YYYY/MM/DD/anything
    '/(\\d{4})/(\\d{2})/(\\d{2})/:path*',
    // Match reveries with dates: /reveries/YYYY-*
    '/reveries/(\\d{4})-:path*',
    // Match any .html files (old static pages)
    '/:path*.html',
    // Match root-level slugs (potential blog posts)
    '/:slug',
  ],
};
