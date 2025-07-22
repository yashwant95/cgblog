/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cgblog.in',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;