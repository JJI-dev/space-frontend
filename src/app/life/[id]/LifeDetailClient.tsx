'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { LifePost } from '@/types'
import Footer from '@/components/layout/Footer'
import { useViewCount } from '@/lib/useViewCount'
import { formatDate } from '@/lib/formatDate'
import styles from './detail.module.css'

interface Props {
  post: LifePost
  allPosts: LifePost[]
}

export default function LifeDetailClient({ post, allPosts }: Props) {
  const idx  = allPosts.findIndex(p => p.id === post.id)
  const prev = allPosts[idx - 1]
  const next = allPosts[idx + 1]

  const viewCount = useViewCount('life', post.id)

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

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (globalHeader) globalHeader.style.transform = 'translateY(0)'
    }
  }, [post.id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => triggerToast('링크 복사가 완료되었습니다!'))
  }

  return (
    <>
      {/* Progress bar */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>

      {/* Toast */}
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      <div className="page-enter">
        <div className={styles.wrap}>

          {/* Floating bar */}
          <aside className={styles.floatingBarContainer}>
            <div className={`${styles.floatingBar} ${showFloatingBar ? styles.visible : ''}`}>
              {prev
                ? <Link href={`/life/${prev.id}`} className={styles.actionBtn} aria-label="이전 글"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
                : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
              }
              {next
                ? <Link href={`/life/${next.id}`} className={styles.actionBtn} aria-label="다음 글"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
              }
              <button className={styles.actionBtn} onClick={handleCopyLink} aria-label="링크 복사">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
            </div>
          </aside>

          {/* 카테고리 */}
          <p className={styles.category}>{post.category}</p>

          {/* 제목 */}
          <h1 className={styles.title}>{post.title}</h1>

          {/* 날짜 · 조회수 */}
          <div className={styles.meta}>
            <span>{formatDate(post.sub)}</span>
            <span>·</span>
            <span>조회 {viewCount}</span>
          </div>

          {/* 히어로 이미지 */}
          <div className={styles.heroImg}>
            {post.thumb
              ? <img src={post.thumb} alt={post.title} />
              : <div className={styles.heroPlaceholder}><span>Thumbnail</span></div>
            }
          </div>

          {/* 본문 */}
          <div className={styles.content}>
            {post.content.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
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