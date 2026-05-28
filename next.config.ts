import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const longCache = [
  {
    key: "Cache-Control",
    value: "public, max-age=31536000, immutable",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  trailingSlash: false,

  // Strip console.* calls from production bundles (keep errors).
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 192, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "sonner",
      "@supabase/supabase-js",
      "lenis",
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Immutable cache for our static images.
        source: "/:file(.*\\.(?:webp|avif|svg|jpg|jpeg|png|ico))",
        headers: longCache,
      },
    ];
  },
};

export default nextConfig;
