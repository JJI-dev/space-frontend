import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 빌드 시 TypeScript 에러가 있어도 무시하고 진행합니다. (선택사항)
  typescript: {
    ignoreBuildErrors: true,
  }
}

export default nextConfig
