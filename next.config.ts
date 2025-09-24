import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */

  // enabled prerendering in this application
  experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;
