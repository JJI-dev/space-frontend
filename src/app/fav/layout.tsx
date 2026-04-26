import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fav',
  description: '덕질 기록',
  alternates: {
    canonical: 'https://space.jji.kr/fav',
  },
  openGraph: {
    title: 'Fav',
    description: '덕질 기록',
    url: 'https://space.jji.kr/fav',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fav',
    description: '덕질 기록',
    images: ['/og-image.png'],
  },
}

export default function FavLayout({ children }: { children: React.ReactNode }) {
  return children
}
