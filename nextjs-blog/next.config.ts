import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages compatibility
  output: 'export',
  trailingSlash: true,
  
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  
  // No experimental config needed for Pages Router
  
  // Configure page extensions to include MDX
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default nextConfig;
