const API_URL = new URL(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // There is another package-lock.json higher up on this machine; this is the real project root.
  turbopack: { root: import.meta.dirname },
  poweredByHeader: false,

  // Images uploaded in the admin panel live on the API server (/uploads/...). Allowing that
  // host lets next/image resize them and serve AVIF/WebP in the size each screen needs.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: API_URL.protocol.replace(':', ''),
        hostname: API_URL.hostname,
        port: API_URL.port,
        pathname: '/uploads/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
};

export default nextConfig;
