import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "dummyimage.com",
      },
    ],
  },
};

export default nextConfig;
