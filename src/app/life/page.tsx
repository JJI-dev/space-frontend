'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { LIFE_POSTS } from '@/lib/data'
import type { LifeCategory } from '@/types'
import SearchIcon from '@/components/ui/SearchIcon'
import Footer from '@/components/layout/Footer'
import styles from './life.module.css'

const CATEGORIES: LifeCategory[] = ['All', 'Travel', 'Hot spot', 'Diary']
const BATCH = 6

export default function LifePage() {
  const [cat,    setCat]    = useState<LifeCategory>('All')
  const [loaded, setLoaded] = useState(BATCH)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const filtered = cat === 'All' ? LIFE_POSTS : LIFE_POSTS.filter(p => p.category === cat)
  const items    = filtered.slice(0, loaded)
  const hasMore  = loaded < filtered.length

  // Reset on category change
  const handleCat = (c: LifeCategory) => { setCat(c); setLoaded(BATCH) }

  // IntersectionObserver for infinite scroll
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
        {/* Header */}
        <div className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>Life</h1>
          <SearchIcon />
        </div>

        {/* Filter */}
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

        {/* Masonry grid */}
        <div className={`${styles.grid} reveal reveal-delay-2`}>
          {items.map(post => (
            <Link key={post.id} href={`/life/${post.id}`} className={styles.card}>
              <div className={styles.cardImg}>
                {post.thumb && <img src={post.thumb} alt={post.title} />}
              </div>
              <div className={styles.cardBody}>
                <p className={styles.cardCat}>
                  <span>{post.category}</span> · Admin
                </p>
                <h3 className={styles.cardTitle}>{post.title}</h3>
                <p className={styles.cardDate}>{post.sub}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Infinite scroll sentinel */}
        <div ref={sentinelRef} style={{ height: 1 }} />

        {hasMore && (
          <div className={styles.loading}>
            <div className={styles.loadDot} />
            <div className={styles.loadDot} />
            <div className={styles.loadDot} />
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}
