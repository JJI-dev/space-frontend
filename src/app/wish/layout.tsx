import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wish',
  description: '갖고 싶은 것들',
  alternates: {
    canonical: 'https://space.jji.kr/wish',
  },
  openGraph: {
    title: 'Wish',
    description: '갖고 싶은 것들',
    url: 'https://space.jji.kr/wish',
    siteName: 'JJI',
    images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wish',
    description: '갖고 싶은 것들',
    images: ['/og-image.png'],
  },
}

export default function WishLayout({ children }: { children: React.ReactNode }) {
  return children
}
