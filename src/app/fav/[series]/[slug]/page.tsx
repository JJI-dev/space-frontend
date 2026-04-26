import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { FAV_POSTS_DATA } from '@/lib/data/index'
import Link from 'next/link'
import FavDetailClient from './FavDetailClient'
import styles from './detail.module.css'

export function generateStaticParams() {
  return Object.entries(FAV_POSTS_DATA).flatMap(([seriesKey, posts]) =>
    posts.map((post: any) => ({ series: seriesKey, slug: post.slug ?? post.id }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ series: string; slug: string }> }) {
  const { series, slug } = await params
  const seriesPosts: any[] = (FAV_POSTS_DATA as any)[series] || []
  const current = seriesPosts.find(p => (p.slug ?? p.id) === slug)
  if (!current) return {}

  const baseUrl = 'https://space.jji.kr'
  const url = `${baseUrl}/fav/${series}/${current.slug ?? current.id}`
  const description = (current.sub || current.tag || '').trim() || current.title
  const image = current.thumbnail

  return {
    title: current.title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: current.title,
      description,
      url,
      siteName: 'JJI',
      images: image ? [{ url: image, alt: current.title }] : undefined,
      locale: 'ko_KR',
      type: 'article',
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title: current.title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function FavDetailPage({ params }: { params: Promise<{ series: string, slug: string }> }) {
  const resolvedParams = await params
  const { series, slug } = resolvedParams

  // 1. 해당 장르(series)의 데이터 찾기
  const seriesPosts = FAV_POSTS_DATA[series as keyof typeof FAV_POSTS_DATA] || []
  const currentIndex = seriesPosts.findIndex((p: any) => (p.slug ?? p.id) === slug)
  const current = seriesPosts[currentIndex]

  // 데이터 없으면 에러 화면 렌더링
  if (!current) {
    return (
      <div style={{ padding: '200px 0', textAlign: 'center', minHeight: '60vh' }}>
        <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>페이지를 찾을 수 없습니다</h2>
        <Link href={`/fav/${series}`} style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
          목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const prevPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null
  const seriesName = series === 'iri' ? '이터널리턴' : series === 'elsword' ? '엘소드' : series === 'fsf' ? '페스페' : series

  // 2. ✨ MDX 파일 읽어오기 (핵심: content/fav/iri/1.mdx)
  const filePath = path.join(process.cwd(), 'content/fav', series, `${current.id}.mdx`)
  
  let fileContent = ''
  try { fileContent = fs.readFileSync(filePath, 'utf8') } 
  catch(e) { 
    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '0 var(--px)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '12px', color: 'var(--black)' }}>
          앗! 아직 연성 파일이 없어요.
        </h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
          열심히 작성 중이거나 경로가 잘못된 것 같아요.<br />
          <code style={{ fontSize: '12px', background: 'var(--gray-100)', padding: '4px 8px', borderRadius: '6px', marginTop: '12px', display: 'inline-block', color: 'var(--gray-600)' }}>
            content/fav/{series}/{current.id}.mdx
          </code>
        </p>
        
        {/* ✨ 자바스크립트 이벤트 대신 CSS 클래스로 호버 애니메이션 적용! */}
        <Link href={`/fav/${series}`} className={styles.backBtn}>
          목록으로 돌아가기
        </Link>
      </div>
    ) 
  }
  const { content } = matter(fileContent)

  const components = {
    p: (props: any) => <p className={styles.revealOnScroll} {...props} />,
    // 꾸미고 싶은 태그 맵핑
  }

  return (
    <FavDetailClient 
      seriesKey={series} 
      seriesName={seriesName} 
      current={current} 
      prevPost={prevPost} 
      nextPost={nextPost} 
      seriesPosts={seriesPosts}
    >
      <MDXRemote source={content} components={components} />
    </FavDetailClient>
  )
}