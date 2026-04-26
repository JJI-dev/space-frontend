'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { LogPost } from '@/types'
import Footer from '@/components/layout/Footer'
import styles from './detail.module.css'

interface Props { 
  post: LogPost; 
  allPosts: LogPost[];
  children?: React.ReactNode;
}

export default function LogDetailClient({ post, allPosts, children }: Props) {
  const [mounted, setMounted] = useState(false)
  const idx  = allPosts.findIndex(p => p.id === post.id)
  const prev = allPosts[idx - 1]
  const next = allPosts[idx + 1]
  
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [viewCount, setViewCount] = useState<number>(0)

  const triggerToast = (msg: string) => {
    setToastMsg(msg); setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  useEffect(() => {
    setMounted(true)
    const globalHeader = document.querySelector('header')

    const handleScroll = () => {
      const y = window.scrollY
      setShowFloatingBar(y > 200)

      if (globalHeader) {
        globalHeader.style.transform = y > 200 ? 'translateY(-100%)' : 'translateY(0)'
        globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }

      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent(height > 0 ? (y / height) * 100 : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    if (post?.id) {
      const dateKey = `log_date_v2_${post.id}`
      const today = new Date().toDateString()
      const hasVisitedToday = localStorage.getItem(dateKey) === today

      fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'log', id: post.id, increment: !hasVisitedToday })
      })
      .then(res => res.json())
      .then(data => {
        if (data.views !== undefined) {
          setViewCount(data.views)
          if (!hasVisitedToday) localStorage.setItem(dateKey, today)
        }
      })
      .catch(err => console.error('View count error:', err))
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.isRevealed)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0 }
    )

    const timer = setTimeout(() => {
      document.querySelectorAll(`.${styles.revealOnScroll}`).forEach(el => observer.observe(el))
    }, 100)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
      observer.disconnect()
      if (globalHeader) globalHeader.style.transform = 'translateY(0)'
    }
  }, [post?.id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => triggerToast('링크 복사가 완료되었습니다!'))
  }

  if (!mounted || !post) return null

  return (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      {/* Log 고유의 대형 썸네일 (화면 상단) */}
      <div className={`${styles.hero} page-enter`}>
        {post.thumb ? <img src={post.thumb} alt={post.title} className={styles.heroImg} /> : <div className={styles.heroPlaceholder} />}
      </div>

      <div className={styles.body}>
        <div className={styles.inner}>
          
          <aside className={styles.floatingBarContainer}>
            <div className={`${styles.floatingBar} ${showFloatingBar ? styles.visible : ''}`}>
              {prev ? <Link href={`/log/${prev.slug}`} className={styles.actionBtn}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
                    : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>}
              {next ? <Link href={`/log/${next.slug}`} className={styles.actionBtn}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                    : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>}
              <button className={styles.actionBtn} onClick={handleCopyLink}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
              <button className={styles.actionBtn} onClick={() => setIsDrawerOpen(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
            </div>
          </aside>

          <p className={`${styles.category} ${styles.revealOnScroll}`}>{post.category}</p>
          <h1 className={`${styles.title} ${styles.revealOnScroll}`}>{post.title}</h1>
          <div className={`${styles.meta} ${styles.revealOnScroll}`}>
            <span>{post.date}</span><span>·</span><span>조회 {viewCount}</span>
          </div>

          <div className={`${styles.content} ${styles.revealOnScroll}`}>{children}</div>

          {post.tags && post.tags.length > 0 && (
            <div className={`${styles.tagsSection} ${styles.revealOnScroll}`}>
              {post.tags.map(t => <span key={t} className={styles.tagChip}>{t}</span>)}
            </div>
          )}

        </div>
      </div>
      <Footer />

      {/* 목록 드로어 */}
      <div className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ''}`} onClick={() => setIsDrawerOpen(false)} />
      <aside className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <h2>목록</h2>
          <button onClick={() => setIsDrawerOpen(false)} className={styles.closeBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.closeIcon}>
              {/* 선 2개를 겹쳐두고 호버 시 각각 45도, -45도로 회전시킵니다 */}
              <line x1="5" y1="12" x2="19" y2="12" className={styles.line1} />
              <line x1="5" y1="12" x2="19" y2="12" className={styles.line2} />
            </svg>
          </button>
        </div>
        <div className={styles.drawerList}>
          {allPosts.map(item => (
            <Link key={item.id} href={`/log/${item.slug}`} className={styles.drawerItem}>
              
              {/* ✨ 인라인 스타일 제거! (CSS의 확대 애니메이션이 먹히도록) */}
              <div className={styles.drawerImg}>
                {item.thumb ? (
                  <img src={item.thumb} alt="" />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--gray-100)' }} />
                )}
              </div>

              {/* ✨ 텍스트 스타일 정리 (CSS에서 1줄 말줄임 처리 완료) */}
              <div className={styles.drawerItemBody}>
                <h4>{item.title}</h4>
                {/* excerpt 대신 category나 깔끔한 서브 텍스트를 넣는 것이 포트폴리오 감성에 맞습니다 */}
                <p>{item.category}</p>
              </div>

            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}