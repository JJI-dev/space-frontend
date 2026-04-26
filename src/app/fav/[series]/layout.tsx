import type { Metadata } from 'next'

const SERIES_NAME: Record<string, string> = {
  iri: '이터널리턴',
  elsword: '엘소드',
  fsf: '페스페',
}

export async function generateMetadata({ params }: { params: Promise<{ series: string }> }): Promise<Metadata> {
  const { series } = await params
  const seriesName = SERIES_NAME[series] ?? series
  const title = `${seriesName} | Fav`
  const description = `덕질 기록 · ${seriesName}`
  const url = `https://space.jji.kr/fav/${series}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: 'JJI',
      images: [{ url: '/og-image.png', alt: 'JJI 썸네일 이미지' }],
      locale: 'ko_KR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-image.png'],
    },
  }
}

export default function FavSeriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
