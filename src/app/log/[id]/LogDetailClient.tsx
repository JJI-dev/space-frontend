'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { LogPost } from '@/types'
import Footer from '@/components/layout/Footer'
import { useViewCount } from '@/lib/useViewCount'
import { formatDate } from '@/lib/formatDate'
import styles from './detail.module.css'

interface Props {
  post: LogPost
  allPosts: LogPost[]
}

export default function LogDetailClient({ post, allPosts }: Props) {
  const idx  = allPosts.findIndex(p => p.id === post.id)
  const prev = allPosts[idx - 1]
  const next = allPosts[idx + 1]

  const viewCount = useViewCount('log', post.id)

  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [scrollPercent,   setScrollPercent]   = useState(0)
  const [toastMsg,        setToastMsg]        = useState('')
  const [showToast,       setShowToast]       = useState(false)

  const triggerToast = (msg: string) => {
    setToastMsg(msg); setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  useEffect(() => {
    const globalHeader = document.querySelector('header') as HTMLElement | null

    const handleScroll = () => {
      const y = window.scrollY
      setShowFloatingBar(y > 200)
      if (globalHeader) {
        globalHeader.style.transform  = y > 200 ? 'translateY(-100%)' : 'translateY(0)'
        globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent((y / height) * 100)
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add(styles.isRevealed); observer.unobserve(e.target) }
      }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    )
    document.querySelectorAll(`.${styles.revealOnScroll}`).forEach(el => observer.observe(el))

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (globalHeader) globalHeader.style.transform = 'translateY(0)'
    }
  }, [post.id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => triggerToast('링크 복사가 완료되었습니다!'))
  }

  const renderContent = (md: string) => {
    if (!md) return null
    return md.trim().split('\n\n').map((block, i) => {
      const cls = styles.revealOnScroll
      if (block.startsWith('## '))  return <h2 key={i} className={`${styles.h2} ${cls}`}>{block.slice(3)}</h2>
      if (block.startsWith('### ')) return <h3 key={i} className={`${styles.h3} ${cls}`}>{block.slice(4)}</h3>
      if (block.startsWith('```')) {
        const code = block.replace(/```[a-z]*/g, '').trim()
        return <pre key={i} className={`${styles.codeBlock} ${cls}`}><code>{code}</code></pre>
      }
      if (/^\d+\./.test(block)) {
        const items = block.split('\n').filter(Boolean)
        return <ol key={i} className={`${styles.ol} ${cls}`}>{items.map((it, j) => <li key={j}>{it.replace(/^\d+\.\s*/, '')}</li>)}</ol>
      }
      return <p key={i} className={`${styles.p} ${cls}`}>{block}</p>
    })
  }

  return (
    <>
      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>

      {/* Toast */}
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      {/* Hero */}
      <div className={`${styles.hero} page-enter`}>
        {post.thumb
          ? <img src={post.thumb} alt={post.title} className={styles.heroImg} />
          : <div className={styles.heroPlaceholder} />
        }
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.inner}>

          {/* Floating bar */}
          <aside className={styles.floatingBarContainer}>
            <div className={`${styles.floatingBar} ${showFloatingBar ? styles.visible : ''}`}>
              {prev
                ? <Link href={`/log/${prev.id}`} className={styles.actionBtn} aria-label="이전 글"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
                : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
              }
              {next
                ? <Link href={`/log/${next.id}`} className={styles.actionBtn} aria-label="다음 글"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
              }
              <button className={styles.actionBtn} onClick={handleCopyLink} aria-label="링크 복사">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
          </aside>

          {/* 제목 */}
          <p className={`${styles.category} ${styles.revealOnScroll}`}>{post.category}</p>
          <h1 className={`${styles.title} ${styles.revealOnScroll}`}>{post.title}</h1>

          {/* 날짜 · 조회수 */}
          <div className={`${styles.meta} ${styles.revealOnScroll}`}>
            <span>{formatDate(post.date)}</span>
            <span>·</span>
            <span>조회 {viewCount}</span>
          </div>

          {/* 본문 */}
          <div className={styles.content}>
            {renderContent(post.content || post.excerpt)}
          </div>
        </div>
      </div>

      {/* 태그 — 푸터 위 */}
      {post.tags.length > 0 && (
        <div className={styles.tagsSection}>
          {post.tags.map(t => (
            <span key={t} className={styles.tagChip}>{t}</span>
          ))}
        </div>
      )}

      <Footer />
    </>
  )
}