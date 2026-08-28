import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Source images are already small and pre-sized for how they're used.
    // Vercel's on-demand image optimizer adds a serverless resize/encode
    // round-trip (and a cache-miss penalty right after every deploy) that
    // was showing up as multi-second blank image placeholders on mobile.
    // Serving them as plain static assets removes that failure mode.
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
