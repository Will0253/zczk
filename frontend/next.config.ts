import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // 图片优化配置
  images: {
    // 远程域名白名单
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
      {
        protocol: 'http',
        hostname: '192.168.0.2',
        port: '1337',
      },
    ],
    // 启用现代图片格式
    formats: ['image/avif', 'image/webp'],
    // 响应式图片尺寸
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // 严格模式
  reactStrictMode: true,
}

export default nextConfig
