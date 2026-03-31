import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import CursorAnimation from '@/components/ui/CursorAnimation'

export const metadata: Metadata = {
  title: 'Space — JJI',
  description: 'Log, Life, Wish, Archive, Token — JJI Space',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>
        <CursorAnimation />
        <Header />
        <main style={{ paddingTop: 'var(--header-h)' }}>
          {children}
        </main>
      </body>
    </html>
  )
}
