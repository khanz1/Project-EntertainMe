/** @type {import('next').NextConfig} */
// const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin';

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
      {
        hostname: 'cmdxd98sb0x3yprd.mangadex.network',
        protocol: 'https',
        port: '',
        pathname: '/data-saver/**',

      },
    ],
  },
};

export default nextConfig;
