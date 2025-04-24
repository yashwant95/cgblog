/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'www.cgtourism.choice.gov.in',
      'cgtourism.choice.gov.in',
      'localhost'
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
