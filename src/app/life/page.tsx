'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LIFE_POSTS } from '@/lib/data/index'
import type { LifeCategory } from '@/types'
import Footer from '@/components/layout/Footer'
import { formatDate } from '@/lib/formatDate' // ✨ formatDate 임포트 추가
import styles from './life.module.css'

const CATEGORIES: LifeCategory[] = ['All', 'Travel', 'Hot spot', 'Diary', 'Game']
const BATCH = 6

export default function LifePage() {
  const [cat,    setCat]    = useState<LifeCategory>('All')
  const [loaded, setLoaded] = useState(BATCH)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [gridKey, setGridKey] = useState(0)

  const sortedPosts = [...LIFE_POSTS].sort((a, b) => {
    const dateA = new Date(a.sub).getTime();
    const dateB = new Date(b.sub).getTime();
    if (dateA === dateB) return Number(b.id) - Number(a.id);
    return dateB - dateA;
  });

  const filtered = cat === 'All' ? sortedPosts : sortedPosts.filter(p => p.category === cat)
  
  const items    = filtered.slice(0, loaded)
  const hasMore  = loaded < filtered.length

  const handleCat = (c: LifeCategory) => {
    setCat(c)
    setLoaded(BATCH)
    setGridKey(k => k + 1)
  }

  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setLoaded(n => n + BATCH) },
      { rootMargin: '200px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [hasMore, loaded, cat])

  return (
    <>
      <div className="page-enter">
        <div className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>Life</h1>
        </div>

        <div className={`${styles.filterBar} reveal reveal-delay-1 no-scrollbar`}>
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`${styles.filterBtn} ${cat === c ? styles.active : ''}`}
              onClick={() => handleCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div key={gridKey} className={`${styles.grid} reveal reveal-delay-2`}>
          {items.map(post => (
            <Link key={post.id} href={`/life/${post.slug}`} className={styles.card}>
              <div className={styles.cardImg}>
                {post.thumb && <img src={post.thumb} alt={post.title} />}
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardCat}>
                  <span>{post.category}</span>
                </p>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                {/* ✨ formatDate 함수로 날짜 감싸기 */}
                <p className={styles.cardDate}>{formatDate(post.sub)}</p>
              </div>
            </Link>
          ))}
        </div>

        <div ref={sentinelRef} style={{ height: 1 }} />
        {hasMore && (
          <div className={styles.loading}>
            <div className={styles.loadDot} /><div className={styles.loadDot} /><div className={styles.loadDot} />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}