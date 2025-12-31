/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove 'output: export' when using API routes
  // For GitHub Pages: uncomment output: 'export' and remove API routes
  // output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
