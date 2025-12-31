/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Suppress hydration warnings
  reactStrictMode: true,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
}

module.exports = nextConfig
