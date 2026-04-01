'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LOG_POSTS } from '@/lib/data'
import type { LogCategory } from '@/types'
// import SearchIcon from '@/components/ui/SearchIcon'
import Footer from '@/components/layout/Footer'
import styles from './log.module.css'

const CATEGORIES: LogCategory[] = ['All', 'Product', 'Design', 'Tech', 'Study']
const PER_PAGE = 5

export default function LogPage() {
  const [cat,  setCat]  = useState<LogCategory>('All')
  const [page, setPage] = useState(1)

  const filtered = cat === 'All' ? LOG_POSTS : LOG_POSTS.filter(p => p.category === cat)
  const total    = Math.ceil(filtered.length / PER_PAGE)
  const items    = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCat = (c: LogCategory) => { setCat(c); setPage(1) }

  const goPage = (n: number) => {
    setPage(n)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div className="page-enter">
        <div className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>Log</h1>
          {/* <SearchIcon /> */}
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

        <div className={`${styles.list} reveal reveal-delay-2`}>
          {items.map(post => (
            <Link key={post.id} href={`/log/${post.id}`} className={styles.item}>
              <div className={styles.thumb}>
                {post.thumb
                  ? <img src={post.thumb} alt={post.title} />
                  : <div className={styles.thumbPlaceholder} />
                }
              </div>
              <div className={styles.body}>
                <p className={styles.category}>{post.category}</p>
                <h2 className={styles.itemTitle}>{post.title}</h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <p className={styles.date}>{post.date}</p>
                <div className={styles.tags}>
                  {post.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className={styles.pagination}>
          {page > 1 && (
            <button className={`${styles.pageBtn} ${styles.arrow}`} onClick={() => goPage(page - 1)}>‹</button>
          )}
          {Array.from({ length: total }, (_, i) => i + 1).map(n => (
            <button
              key={n}
              className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
              onClick={() => goPage(n)}
            >
              {n}
            </button>
          ))}
          {page < total && (
            <button className={`${styles.pageBtn} ${styles.arrow}`} onClick={() => goPage(page + 1)}>›</button>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}