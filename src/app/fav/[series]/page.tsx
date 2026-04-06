'use client'

import { use, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
// import SearchIcon from '@/components/ui/SearchIcon'
import { formatDate } from '@/lib/formatDate'
import styles from './list.module.css'
import { FAV_POSTS_DATA } from '@/lib/data/index'

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
  const seriesPosts = FAV_POSTS_DATA[seriesKey as keyof typeof FAV_POSTS_DATA] || []

  const sortedPosts = [...seriesPosts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    if (dateA === dateB) return Number(b.id) - Number(a.id); 
    return dateB - dateA; 
  });

  const seriesName = 
    seriesKey === 'iri' ? '이리' : 
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
          {/* <SearchIcon /> */}
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
                  <div className={styles.cardImg} />
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