'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { LogPost } from '@/types'
import Footer from '@/components/layout/Footer'
import styles from './detail.module.css'

interface Props {
  post: LogPost
  allPosts: LogPost[]
}

export default function LogDetailClient({ post, allPosts }: Props) {
  const idx  = allPosts.findIndex(p => p.id === post.id)
  const prev = allPosts[idx - 1]
  const next = allPosts[idx + 1]

  const heroRef = useRef<HTMLDivElement>(null)
  const [shrink, setShrink] = useState(false)

  useEffect(() => {
    const fn = () => {
      const scrollY = window.scrollY
      setShrink(scrollY > 60)
      if (heroRef.current) {
        const maxScroll = 300
        const ratio = Math.min(scrollY / maxScroll, 1)
        const vh = window.innerHeight
        const startH = vh * 0.58
        const endH   = vh * 0.28
        heroRef.current.style.height = (startH - (startH - endH) * ratio) + 'px'
      }
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const renderContent = (md: string) => {
    if (!md) return null
    return md.trim().split('\n\n').map((block, i) => {
      if (block.startsWith('## '))  return <h2  key={i} className={styles.h2}>{block.slice(3)}</h2>
      if (block.startsWith('### ')) return <h3  key={i} className={styles.h3}>{block.slice(4)}</h3>
      if (block.startsWith('```')) {
        const code = block.replace(/```[a-z]*/g, '').trim()
        return <pre key={i} className={styles.codeBlock}><code>{code}</code></pre>
      }
      if (/^\d+\./.test(block)) {
        const items = block.split('\n').filter(Boolean)
        return <ol key={i} className={styles.ol}>{items.map((it, j) => <li key={j}>{it.replace(/^\d+\.\s*/, '')}</li>)}</ol>
      }
      return <p key={i} className={styles.p}>{block}</p>
    })
  }

  return (
    <>
      {/* Fixed back bar — appears when scrolled */}
      <div className={`${styles.backBar} ${shrink ? styles.backBarVisible : ''}`}>
        <Link href="/log" className={styles.backBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          로그 목록으로
        </Link>
      </div>

      {/* Hero — shrinks on scroll */}
      <div ref={heroRef} className={`${styles.hero} page-enter`}>
        {post.thumb
          ? <img src={post.thumb} alt={post.title} className={styles.heroImg} />
          : <div className={styles.heroPlaceholder} />
        }
        <div className={`${styles.heroTitle} ${shrink ? styles.heroTitleHidden : ''}`}>
          <p className={styles.heroCat}>{post.category}</p>
          <h1 className={styles.heroH1}>{post.title}</h1>
        </div>
        <div className={styles.heroGradient} />
      </div>

      {/* White body */}
      <div className={styles.body}>
        <div className={styles.inner}>
          {!shrink && (
            <Link href="/log" className={styles.backBtnInline}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              로그 목록으로
            </Link>
          )}

          <div className={styles.meta}>
            <span>{post.date}</span>
            <span>·</span>
            {post.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <h1 className={`${styles.bodyTitle} ${shrink ? styles.bodyTitleVisible : ''}`}>
            {post.title}
          </h1>

          <div className={styles.content}>
            {renderContent(post.content || post.excerpt)}
          </div>
        </div>

        <div className={styles.nav}>
          {prev
            ? <Link href={`/log/${prev.id}`} className={styles.navLink}>← {prev.title}</Link>
            : <span />
          }
          {next
            ? <Link href={`/log/${next.id}`} className={styles.navLink}>{next.title} →</Link>
            : <span />
          }
        </div>
      </div>

      <Footer />
    </>
  )
}
