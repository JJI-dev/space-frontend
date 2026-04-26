import type { Metadata } from 'next'
import TokenLayoutClient from './TokenLayoutClient'

export const metadata: Metadata = {
  title: 'Design Token',
  description: '디자인 토큰 정리',
  alternates: {
    canonical: 'https://space.jji.kr/token',
  },
  openGraph: {
    title: 'Design Token',
    description: '디자인 토큰 정리',
    url: 'https://space.jji.kr/token',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Design Token',
    description: '디자인 토큰 정리',
    images: ['/og-image.png'],
  },
}

export default function TokenLayout({ children }: { children: React.ReactNode }) {
  return <TokenLayoutClient>{children}</TokenLayoutClient>
}
