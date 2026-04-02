'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { useViewCount } from '@/lib/useViewCount'
import { formatDate } from '@/lib/formatDate'
import styles from './detail.module.css'
import { DUMMY_POSTS } from '../page'

export default function FavDetailPage({ params }: { params: Promise<{ series: string, id: string }> }) {
  const resolvedParams = use(params)

  const viewCount = useViewCount('fav', `${resolvedParams.series}_${resolvedParams.id}`)

  const [scrollPercent,   setScrollPercent]   = useState(0)
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [isDrawerOpen,    setIsDrawerOpen]    = useState(false)
  const [toastMsg,        setToastMsg]        = useState('')
  const [showToast,       setShowToast]       = useState(false)

  const currentIndex = DUMMY_POSTS.findIndex(p => p.id === resolvedParams.id)
  const prevPost = currentIndex > 0 ? DUMMY_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < DUMMY_POSTS.length - 1 ? DUMMY_POSTS[currentIndex + 1] : null
  const current  = DUMMY_POSTS[currentIndex]

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
  }, [resolvedParams.id])

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

      {/* Hero placeholder */}
      <div className={`${styles.hero} page-enter`}>
        <div className={styles.heroPlaceholder} />
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.inner}>

          {/* Floating bar */}
          <aside className={styles.floatingBarContainer}>
            <div className={`${styles.floatingBar} ${showFloatingBar ? styles.visible : ''}`}>
              {prevPost
                ? <Link href={`/fav/${resolvedParams.series}/${prevPost.id}`} className={styles.actionBtn} aria-label="이전 글"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
                : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
              }
              {nextPost
                ? <Link href={`/fav/${resolvedParams.series}/${nextPost.id}`} className={styles.actionBtn} aria-label="다음 글"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
              }
              <button className={styles.actionBtn} onClick={handleCopyLink} aria-label="링크 복사">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
              <button className={styles.actionBtn} onClick={() => setIsDrawerOpen(true)} aria-label="목록">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </aside>

          {/* 카테고리 */}
          <p className={styles.category}>이리</p>

          {/* 제목 */}
          <h1 className={styles.title}>{current?.title ?? '가넷 x 케네스'}</h1>

          {/* 날짜 · 조회수 */}
          <div className={styles.meta}>
            <span>{formatDate(current?.date ?? '2026-03-23')}</span>
            <span>·</span>
            <span>조회 {viewCount}</span>
          </div>

          {/* 본문 placeholder */}
          <div className={styles.contentPlaceholder}></div>
        </div>
      </div>

      {/* 태그 — 푸터 위 */}
      {current?.tag && (
        <div className={styles.tagsSection}>
          <span className={styles.tagChip}>{current.tag}</span>
        </div>
      )}

      <Footer />

      {/* Drawer overlay */}
      <div className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ''}`} onClick={() => setIsDrawerOpen(false)} />
      <aside className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <h2>목록</h2>
          <button onClick={() => setIsDrawerOpen(false)} className={styles.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <p className={styles.drawerSub}>Frame 2610516</p>
        <div className={styles.drawerList}>
          {DUMMY_POSTS.map(item => (
            <Link key={item.id} href={`/fav/${resolvedParams.series}/${item.id}`} className={styles.drawerItem}>
              <div className={styles.drawerImg} />
              <div className={styles.drawerItemBody}>
                <h4>{item.title}</h4>
                <p>{item.sub}</p>
                <span>{item.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}