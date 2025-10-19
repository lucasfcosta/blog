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

  // Don't process if already redirected (check for redirect header)
  // This prevents redirect loops at the middleware level
  if (request.headers.get('x-middleware-rewrite')) {
    return NextResponse.next();
  }

  // Handle Jekyll date-based URLs: /YYYY/MM/DD/post-slug.html -> /post-slug
  // Only process URLs that actually match the old Jekyll pattern
  const jekyllPostMatch = pathname.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
  if (jekyllPostMatch) {
    const [, year, month, day, slugPart] = jekyllPostMatch;

    // Clean the slug: remove .html extension and trailing slashes
    const slug = slugPart.replace(/\.html$/, '').replace(/\/$/, '');

    const newPath = `/${slug}`;

    // Only redirect if:
    // 1. The path is actually different
    // 2. We're not already at the destination
    // 3. The destination doesn't look like a date-based path
    if (pathname !== newPath && !newPath.match(/^\/\d{4}\//)) {
      const newUrl = new URL(newPath, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Handle Jekyll reveries URLs: /reveries/YYYY-MM-DD-slug.html -> /slug
  // Only match URLs that have the date prefix pattern
  const reveriesMatch = pathname.match(
    /^\/reveries\/(\d{4}-\d{2}-\d{2})-(.+?)(?:\.html)?(?:\/)?$/
  );
  if (reveriesMatch) {
    const [, date, slug] = reveriesMatch;
    const newPath = `/${slug}`;

    // Only redirect if the path is different and doesn't already look like a reveries path
    if (pathname !== newPath && !newPath.startsWith('/reveries/')) {
      const newUrl = new URL(newPath, request.url);
      return NextResponse.redirect(newUrl, 301);
    }
  }

  // Handle old static pages with .html extension only
  // This won't trigger on the destination paths (which don't have .html)
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

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match old Jekyll URL patterns that need redirecting
    // Match date-based URLs: /YYYY/MM/DD/anything
    '/(\\d{4})/(\\d{2})/(\\d{2})/:path*',
    // Match reveries with dates: /reveries/YYYY-*
    '/reveries/(\\d{4})-:path*',
    // Match any .html files (old static pages)
    '/:path*.html',
  ],
};
