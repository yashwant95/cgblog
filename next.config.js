/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 REQUIRED: generate /out folder
  output: 'export',

  // ✅ Ignore ESLint during production build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🖼️ Image config (required fix for static export)
  images: {
    unoptimized: true, // ❗ REQUIRED for static export

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cgblog.in',
      },
      {
        protocol: 'https',
        hostname: 'backend.cgblog.in',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],

    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
  },

  // ⚡ Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion', 'antd'],
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  // 🧹 Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  // 📦 Webpack optimization
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      config.target = ['web', 'es2017'];
    }
    return config;
  },
};

module.exports = nextConfig;
