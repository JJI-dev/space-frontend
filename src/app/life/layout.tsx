import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Life',
  description: '일상, 여행, 끄적임',
  alternates: {
    canonical: 'https://space.jji.kr/life',
  },
  openGraph: {
    title: 'Life',
    description: '일상, 여행, 끄적임',
    url: 'https://space.jji.kr/life',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Life',
    description: '일상, 여행, 끄적임',
    images: ['/og-image.png'],
  },
}

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return children
}
