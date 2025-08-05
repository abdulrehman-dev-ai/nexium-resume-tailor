import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure webpack to handle pdf-parse library properly
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Exclude problematic test files from pdf-parse during build
      config.externals = config.externals || [];
      config.externals.push({
        // Prevent bundling of test files that cause build errors
        './test/data/05-versions-space.pdf': 'commonjs ./test/data/05-versions-space.pdf'
      });
    }
    
    // Handle pdf-parse and other binary dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      crypto: false,
    };
    
    return config;
  },
  
  // External packages for server components
  serverExternalPackages: ['pdf-parse'],
  
  // SEO and Performance optimizations
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
      {
        source: '/robots.txt',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/plain',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=86400',
          },
        ],
      },
    ];
  },
  
  // SEO-friendly redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/app',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/help',
        destination: '/support',
        permanent: true,
      },
      {
        source: '/faq',
        destination: '/support',
        permanent: true,
      },
    ];
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
