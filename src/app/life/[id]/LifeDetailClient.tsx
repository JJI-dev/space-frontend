'use client'

import Link from 'next/link'
import type { LifePost } from '@/types'
import Footer from '@/components/layout/Footer'
import styles from './detail.module.css'

interface Props {
  post: LifePost
  allPosts: LifePost[]
}

export default function LifeDetailClient({ post, allPosts }: Props) {
  const idx  = allPosts.findIndex(p => p.id === post.id)
  const prev = allPosts[idx - 1]
  const next = allPosts[idx + 1]

  return (
    <>
      <div className="page-enter">
        <div className={styles.topBar}>
          <Link href="/life" className={styles.back}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            라이프 목록으로
          </Link>
          <button
            className={styles.shareBtn}
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
          >
            공유
          </button>
        </div>

        <div className={styles.wrap}>
          <p className={styles.category}>{post.category} · {post.sub}</p>
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.heroImg}>
            {post.thumb
              ? <img src={post.thumb} alt={post.title} />
              : <div className={styles.heroPlaceholder}><span>Thumbnail</span></div>
            }
          </div>

          <div className={styles.tags}>
            {post.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={styles.content}>
            {post.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>

        <div className={styles.nav}>
          {prev
            ? <Link href={`/life/${prev.id}`} className={styles.navLink}>← {prev.title}</Link>
            : <span />
          }
          {next
            ? <Link href={`/life/${next.id}`} className={styles.navLink}>{next.title} →</Link>
            : <span />
          }
        </div>
      </div>
      <Footer />
    </>
  )
}
