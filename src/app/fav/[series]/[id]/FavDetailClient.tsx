'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import { formatDate } from '@/lib/formatDate'
import styles from './detail.module.css'

interface Props {
  seriesKey: string; seriesName: string; current: any; prevPost: any; nextPost: any; seriesPosts: any[]; children?: React.ReactNode;
}

export default function FavDetailClient({ seriesKey, seriesName, current, prevPost, nextPost, seriesPosts, children }: Props) {
  const [mounted, setMounted] = useState(false)
  const [viewCount, setViewCount] = useState<number>(0)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const triggerToast = (msg: string) => {
    setToastMsg(msg); setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  useEffect(() => {
    setMounted(true)
    const globalHeader = document.querySelector('header') as HTMLElement | null
    const handleScroll = () => {
      const y = window.scrollY
      setShowFloatingBar(y > 200)
      if (globalHeader) {
        globalHeader.style.transform  = y > 200 ? 'translateY(-100%)' : 'translateY(0)'
        globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
      }
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent(height > 0 ? (y / height) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    if (current?.id) {
      const dateKey = `fav_date_v2_${seriesKey}_${current.id}`
      const today = new Date().toDateString()
      const hasVisitedToday = localStorage.getItem(dateKey) === today

      fetch('/api/views', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: `fav_${seriesKey}`, id: current.id, increment: !hasVisitedToday })
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

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (globalHeader) globalHeader.style.transform = 'translateY(0)'
    }
  }, [current?.id, seriesKey])

  // ✨ 투명도 0 갇힘 해결
  useEffect(() => {
    if (!mounted) return;

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
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [mounted, current?.id])

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => triggerToast('링크 복사가 완료되었습니다!'))
  }

  if (!mounted || !current) return null

  return (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      <div className={styles.wrap}>
        
        {/* ✨ 플로팅 바 분리 (고정 박힘 해결) */}
        <aside className={styles.floatingBarContainer}>
          <div className={`${styles.floatingBar} ${showFloatingBar ? styles.visible : ''}`}>
            {prevPost ? <Link href={`/fav/${seriesKey}/${prevPost.id}`} className={styles.actionBtn}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
                      : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>}
            {nextPost ? <Link href={`/fav/${seriesKey}/${nextPost.id}`} className={styles.actionBtn}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                      : <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>}
            <button className={styles.actionBtn} onClick={handleCopyLink}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
            <button className={styles.actionBtn} onClick={() => setIsDrawerOpen(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
          </div>
        </aside>

        <div>
          <p className={`${styles.category} ${styles.revealOnScroll}`}>{seriesName}</p>
          <h1 className={`${styles.title} ${styles.revealOnScroll}`}>{current.title}</h1>
          <div className={`${styles.meta} ${styles.revealOnScroll}`}>
            <span>{current.date ? formatDate(current.date) : ''}</span><span>·</span><span>조회 {viewCount}</span>
          </div>

          <div className={`${styles.heroImg} ${styles.revealOnScroll}`}>
            {current.thumb ? <img src={current.thumb} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div className={styles.heroPlaceholder}><span>Thumbnail</span></div>}
          </div>

          <div className={`${styles.content} ${styles.revealOnScroll}`}>{children}</div>

          {current.tag && (
            <div className={`${styles.tagsSection} ${styles.revealOnScroll}`}>
              <span className={styles.tagChip}>{current.tag}</span>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <div className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ''}`} onClick={() => setIsDrawerOpen(false)} />
      <aside className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}><h2>목록</h2><button onClick={() => setIsDrawerOpen(false)} className={styles.closeBtn}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/></svg></button></div>
        <div className={styles.drawerList}>
          {seriesPosts.map(item => (
            <Link key={item.id} href={`/fav/${seriesKey}/${item.id}`} className={styles.drawerItem}>
              <div className={styles.drawerImg}>{item.thumb && <img src={item.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:8}}/>}</div>
              <div className={styles.drawerItemBody}><h4>{item.title}</h4><p>{item.date}</p></div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}