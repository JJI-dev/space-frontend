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
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  useEffect(() => {
    const globalHeader = document.querySelector('header')

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowFloatingBar(currentScrollY > 200)

      if (globalHeader) {
        if (currentScrollY > 200) {
          globalHeader.style.transform = 'translateY(-100%)'
          globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        } else {
          globalHeader.style.transform = 'translateY(0)'
        }
      }

      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (currentScrollY / height) * 100
      setScrollPercent(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

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

    const revealElements = document.querySelectorAll(`.${styles.revealOnScroll}`)
    revealElements.forEach(el => observer.observe(el))

    // ✨ Vercel KV 진짜 조회수 연동
    const dateKey = `log_date_v2_${post.id}`
    const today = new Date().toDateString()
    const hasVisitedToday = localStorage.getItem(dateKey) === today

    fetch('/api/views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'log',
        id: post.id,
        increment: !hasVisitedToday // 오늘 처음 방문했으면 1 올림
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.views !== undefined) {
        setViewCount(data.views)
        if (!hasVisitedToday) {
          localStorage.setItem(dateKey, today)
        }
      }
    })
    .catch(err => console.error('View count error:', err))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (globalHeader) {
        globalHeader.style.transform = 'translateY(0)'
      }
    }
  }, [post.id])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      triggerToast('링크 복사가 완료되었습니다!')
    } catch (e) {
      console.error(e)
    }
  }

  // const renderContent = (md: string) => {
  //   if (!md) return null
  //   return md.trim().split('\n\n').map((block, i) => {
  //     const commonClass = `${styles.revealOnScroll}`
  //     if (block.startsWith('## '))  return <h2 key={i} className={`${styles.h2} ${commonClass}`}>{block.slice(3)}</h2>
  //     if (block.startsWith('### ')) return <h3 key={i} className={`${styles.h3} ${commonClass}`}>{block.slice(4)}</h3>
  //     if (block.startsWith('```')) {
  //       const code = block.replace(/```[a-z]*/g, '').trim()
  //       return <pre key={i} className={`${styles.codeBlock} ${commonClass}`}><code>{code}</code></pre>
  //     }
  //     if (/^\d+\./.test(block)) {
  //       const items = block.split('\n').filter(Boolean)
  //       return <ol key={i} className={`${styles.ol} ${commonClass}`}>{items.map((it, j) => <li key={j}>{it.replace(/^\d+\.\s*/, '')}</li>)}</ol>
  //     }
  //     return <p key={i} className={`${styles.p} ${commonClass}`}>{block}</p>
  //   })
  // }

  return (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>

      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      <div className={`${styles.hero} page-enter`}>
        {post.thumb
          ? <img src={post.thumb} alt={post.title} className={styles.heroImg} />
          : <div className={styles.heroPlaceholder} />
        }
      </div>

      <div className={styles.body}>
        <div className={styles.inner}>
          
          <aside className={styles.floatingBarContainer}>
            <div className={`${styles.floatingBar} ${showFloatingBar ? styles.visible : ''}`}>
              
              {prev ? (
                <Link href={`/log/${prev.id}`} className={styles.actionBtn} aria-label="이전 글">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                </Link>
              ) : (
                <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
              )}

              {next ? (
                <Link href={`/log/${next.id}`} className={styles.actionBtn} aria-label="다음 글">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </Link>
              ) : (
                <button className={styles.actionBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
              )}

              <button className={styles.actionBtn} onClick={handleCopyLink} aria-label="링크 복사">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>

              <button className={styles.actionBtn} onClick={() => setIsDrawerOpen(true)} aria-label="목록 열기">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>

            </div>
          </aside>

          <p className={`${styles.category} ${styles.revealOnScroll}`}>{post.category}</p>
          <h1 className={`${styles.title} ${styles.revealOnScroll}`}>{post.title}</h1>

          <div className={`${styles.meta} ${styles.revealOnScroll}`}>
            <span>{post.date}</span>
            <span>·</span>
            <span>조회 {viewCount}</span>
          </div>

          <div className={`${styles.content} ${styles.revealOnScroll}`}>
            {children}
          </div>

          {/* 태그 영역 - 본문 래퍼 내부 위치 */}
          {post.tags && post.tags.length > 0 && (
            <div className={`${styles.tagsSection} ${styles.revealOnScroll}`}>
              {post.tags.map(t => (
                <span key={t} className={styles.tagChip}>{t}</span>
              ))}
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        <p className={styles.drawerSub}></p>
        
        <div className={styles.drawerList}>
          {allPosts.map(item => (
            <Link key={item.id} href={`/log/${item.id}`} className={styles.drawerItem}>
              <div className={styles.drawerImg}>
                {item.thumb ? <img src={item.thumb} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:8}}/> : <div style={{width:'100%', height:'100%', background:'var(--gray-100)', borderRadius:8}}/>}
              </div>
              <div className={styles.drawerItemBody}>
                <h4>{item.title}</h4>
                <p style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.excerpt}</p>
                <span>{item.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}