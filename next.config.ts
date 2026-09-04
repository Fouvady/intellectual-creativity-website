import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Performance: disable the X-Powered-By header (saves bytes on every request)
  poweredByHeader: false,
  // Performance: enable gzip compression for all responses
  compress: true,
  // Performance: optimize image handling
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.21st.dev" },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },
  // Performance: allow the preview proxy origin
  allowedDevOrigins: [
    "preview-chat-4ab8a83e-46c9-4127-8e70-1e7102ec028f.space-z.ai",
  ],
  // Performance: experimental optimizations
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "zod"],
  },
};

export default nextConfig;
