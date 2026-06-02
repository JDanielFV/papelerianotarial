/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Optimize placeholders and future product images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: '/productos',
        destination: '/catalogo',
        permanent: true,
      },
      {
        source: '/productos/:path*',
        destination: '/catalogo/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
