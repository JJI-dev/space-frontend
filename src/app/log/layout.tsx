import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Log',
  description: '디자인, 개발 기록',
  alternates: {
    canonical: 'https://space.jji.kr/log',
  },
  openGraph: {
    title: 'Log',
    description: '디자인, 개발 기록',
    url: 'https://space.jji.kr/log',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Log',
    description: '디자인, 개발 기록',
    images: ['/og-image.png'],
  },
}

export default function LogLayout({ children }: { children: React.ReactNode }) {
  return children
}
