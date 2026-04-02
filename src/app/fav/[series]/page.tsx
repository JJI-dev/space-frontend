'use client'

import { use, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import SearchIcon from '@/components/ui/SearchIcon'
import { formatDate } from '@/lib/formatDate'
import styles from './list.module.css'

export const DUMMY_POSTS = [
  { id: '1', title: '가넷x케네스', sub: '둘이 컬파맞는다', tag: '#츄라이', date: '2026-03-23' },
  { id: '2', title: '아야x유키',   sub: '귀여운 조합',     tag: '#츄라이', date: '2026-02-14' },
  { id: '3', title: '현우x매그너스', sub: '근육과 근육',    tag: '#츄라이', date: '2026-01-10' },
  { id: '4', title: '혜진x쇼이치', sub: '분위기 맛집',     tag: '#츄라이', date: '2025-12-25' },
]

export default function FavSeriesPage({ params }: { params: Promise<{ series: string }> }) {
  const resolvedParams = use(params)
  const seriesName = resolvedParams.series === 'iri' ? '이리' : resolvedParams.series

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
          <h1 className={styles.pageTitle}>Fav/Game — {seriesName}</h1>
          <SearchIcon />
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.grid}>
            {DUMMY_POSTS.map((post, i) => (
              <Link
                key={post.id}
                href={`/fav/${resolvedParams.series}/${post.id}`}
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
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}