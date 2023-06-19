/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: process.env.NEXT_PUBLIC_SERVER_PROTOCOL,
        hostname: process.env.NEXT_PUBLIC_SERVER_NAME,
        port: process.env.NEXT_PUBLIC_BACKEND_PORT,
        pathname: '/uploads/avatars/**',
      },
    ],
  },
};

module.exports = nextConfig;
