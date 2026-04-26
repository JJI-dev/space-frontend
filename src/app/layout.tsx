import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import LoadingScreen from '@/components/ui/LoadingScreen';
import CursorAnimation from '@/components/ui/CursorAnimation'

export const metadata: Metadata = {
  metadataBase: new URL('https://space.jji.kr'),
  title: 'Space | JJI',
  description: 'Log, Life, Wish, Archive, Token — JJI Space',
  alternates: {
    canonical: 'https://space.jji.kr',
  },
  openGraph: {
    title: 'Space | JJI',
    description: 'Log, Life, Wish, Archive, Token — JJI Space',
    url: 'https://space.jji.kr',
    siteName: 'JJI',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: 'JJI 썸네일 이미지',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Space | JJI',
    description: 'Log, Life, Wish, Archive, Token — JJI Space',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <LoadingScreen/>
        <CursorAnimation />
        <Header />
        <main style={{ paddingTop: 'var(--header-h)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
