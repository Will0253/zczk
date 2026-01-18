import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 图片域名白名单
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // 严格模式
  reactStrictMode: true,
}

export default nextConfig
