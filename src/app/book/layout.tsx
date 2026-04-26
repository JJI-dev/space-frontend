import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book',
  description: '독서 기록, 서평',
  alternates: {
    canonical: 'https://space.jji.kr/book',
  },
  openGraph: {
    title: 'Book',
    description: '독서 기록, 서평',
    url: 'https://space.jji.kr/book',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Book',
    description: '독서 기록, 서평',
    images: ['/og-image.png'],
  },
}

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children
}
