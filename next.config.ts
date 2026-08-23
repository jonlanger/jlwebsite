import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    // Nothing renders wider than the 900px content column (1800 @2x). Capping
    // here also keeps the optimizer away from libwebp's 16383px dimension
    // limit, which the tall case-study boards would otherwise trip — sharp
    // throws and Next silently falls back to serving the raw PNG.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
    // Next 16 requires every `quality` prop to be allowlisted here.
    qualities: [75, 82],
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 days; these assets are content-stable
  },
  async redirects() {
    return [
      {
        source: "/projects/ecowell",
        destination: "/projects/ecowell-c79b",
        permanent: true,
      },
      {
        source: "/projects/autonomous-shipping",
        destination: "/projects/stemcell-spray",
        permanent: true,
      },
      {
        source: "/projects/voxelplm-board-1",
        destination: "/projects/mdx",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
