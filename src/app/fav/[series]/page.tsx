'use client'

import { use, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { formatDate } from '@/lib/formatDate'
import styles from './list.module.css'
import { FAV_POSTS_DATA } from '@/lib/data/index' // 데이터 경로는 JJine님 환경에 맞게!

const getCategoryName = (seriesKey: string) => {
  const categories = {
    Game: ['iri', 'elsword', 'starrail', 'maple', 'dnf', 'loa', 'genshin', 'pokemon'],
    Animation: ['fsf', 'rezero', 'blackbutler', 'magi', 'hanako', 'apothecary', '86', 'inuyasha', 'fairytail'],
    Webtoon: ['kubera', 'ropan']
  };

  if (categories.Game.includes(seriesKey)) return 'Game';
  if (categories.Animation.includes(seriesKey)) return 'Animation';
  if (categories.Webtoon.includes(seriesKey)) return 'Webtoon';
  return 'Fav';
};

export default function FavSeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const resolvedParams = use(params)
  const seriesKey = resolvedParams.series

  const parentCategory = getCategoryName(seriesKey);
  // ✨ any 타입으로 에러나는 것을 방지하기 위해 간단히 타입 단언
  const seriesPosts: any[] = FAV_POSTS_DATA[seriesKey as keyof typeof FAV_POSTS_DATA] || []

  const sortedPosts = [...seriesPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA === dateB) return Number(b.id) - Number(a.id); 
    return dateB - dateA; 
  });

  const seriesName = 
    seriesKey === 'iri' ? '이터널리턴' : 
    seriesKey === 'elsword' ? '엘소드' : 
    seriesKey === 'fsf' ? '페스페' : seriesKey

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.isRevealed)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    document.querySelectorAll(`.${styles.revealOnScroll}`).forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="page-enter">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>{parentCategory} — {seriesName}</h1>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {seriesPosts.length === 0 ? (
              <p style={{ color: 'var(--gray-400)', gridColumn: '1 / -1' }}>아직 등록된 연성이 없습니다.</p>
            ) : (
              sortedPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/fav/${seriesKey}/${post.id}`}
                  className={`${styles.card} ${styles.revealOnScroll}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  {/* ✨ 썸네일 영역 수정! */}
                  <div className={styles.cardImg} style={{ overflow: 'hidden', backgroundColor: 'var(--gray-100)' }}>
                    {post.thumbnail ? (
                      <img 
                        src={post.thumbnail} 
                        alt={post.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : (
                      // 썸네일이 없을 때 보여줄 기본 아이콘이나 텍스트 (생략 가능)
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                        Thumbnail
                      </div>
                    )}
                  </div>
                  
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.cardSub}>{post.sub}</p>
                    <p className={styles.cardDate}>{formatDate(post.date)}</p>
                    <span className={styles.cardTag}>{post.tag}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}