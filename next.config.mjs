/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
    // Ensure images are properly optimized and cached
    unoptimized: false,
    // Image quality is configured in the loader options, not at this level
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ['image/webp']
  },
  // Ensure proper asset prefixing in production
  assetPrefix: process.env.NODE_ENV === 'production' ? undefined : undefined,
};

export default nextConfig;
