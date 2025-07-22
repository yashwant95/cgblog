/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cgblog.in',
      'www.cgtourism.choice.gov.in',
      'maps.googleapis.com',
      'streetviewpixels-pa.googleapis.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cgblog.in',
      },
      {
        protocol: 'https',
        hostname: '**.cgtourism.choice.gov.in',
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    unoptimized: false,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `default-src 'self' cgblog.in www.googletagmanager.com; 
            img-src 'self' data: cgblog.in cgtourism.choice.gov.in maps.googleapis.com;
            script-src 'self' 'unsafe-inline' www.googletagmanager.com;
            style-src 'self' 'unsafe-inline';
            connect-src 'self' https://api.cgblog.in;`
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        },
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin'
        },
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()'
        },
        {
          key: 'X-DNS-Prefetch-Control',
          value: 'on'
        }
      ]
    },
    {
      source: '/(.*).(jpg|jpeg|png|webp|avif|ico|svg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/(.*).(js|css)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    },
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store'
        }
      ]
    }
  ],
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  i18n: {
    locales: ['en-IN', 'hi-IN'],
    defaultLocale: 'en-IN',
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    largePageDataBytes: 128 * 1000, // 128KB
    optimisticClientCache: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name][ext]',
      },
    });
    return config;
  },
  // Configure sitemaps
  siteMap: {
    siteUrl: 'https://cgblog.in',
    generateRobotsTxt: true,
    exclude: ['/admin', '/private', '/api'],
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          allow: '/',
          disallow: ['/admin', '/private', '/api'],
        },
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/admin', '/private'],
        },
      ],
      additionalSitemaps: [
        'https://cgblog.in/sitemap.xml',
        'https://cgblog.in/sitemapindex.xml',
      ],
    },
  },
  // Configure redirects for SEO
  async redirects() {
    return [
      {
        source: '/places',
        destination: '/places/',
        permanent: true,
      },
      {
        source: '/food',
        destination: '/food/',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/events/',
        permanent: true,
      },
      {
        source: '/reviews',
        destination: '/reviews/',
        permanent: true,
      },
      // Handle old URLs from previous site version if any
      {
        source: '/destinations/:path*',
        destination: '/places/:path*',
        permanent: true,
      },
      {
        source: '/cuisine/:path*',
        destination: '/food/:path*',
        permanent: true,
      },
      {
        source: '/festivals/:path*',
        destination: '/events/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;