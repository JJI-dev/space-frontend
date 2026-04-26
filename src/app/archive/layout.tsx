import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Archive',
  description: '사이트, 아티클',
  alternates: {
    canonical: 'https://space.jji.kr/archive',
  },
  openGraph: {
    title: 'Archive',
    description: '사이트, 아티클',
    url: 'https://space.jji.kr/archive',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Archive',
    description: '사이트, 아티클',
    images: ['/og-image.png'],
  },
}

export default function ArchiveLayout({ children }: { children: React.ReactNode }) {
  return children
}
