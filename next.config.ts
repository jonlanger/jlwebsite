import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
