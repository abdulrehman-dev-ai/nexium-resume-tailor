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
};

export default nextConfig;
