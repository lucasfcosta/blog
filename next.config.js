/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages compatibility
  output: 'export',
  trailingSlash: true,
  
  // Configure images for static export
  images: {
    unoptimized: true,
  },
  
  // Configure page extensions to include MDX
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  // Webpack configuration to handle fs module
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
