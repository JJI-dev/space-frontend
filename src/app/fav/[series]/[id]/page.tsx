'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import styles from './detail.module.css'
import { DUMMY_POSTS } from '../page'

export default function FavDetailPage({ params }: { params: Promise<{ series: string, id: string }> }) {
  const resolvedParams = use(params)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [viewCount, setViewCount] = useState<number>(0)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const currentIndex = DUMMY_POSTS.findIndex(p => p.id === resolvedParams.id)
  const prevPost = currentIndex > 0 ? DUMMY_POSTS[currentIndex - 1] : null
  const nextPost = currentIndex < DUMMY_POSTS.length - 1 ? DUMMY_POSTS[currentIndex + 1] : null

  const displayToast = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  useEffect(() => {
    const handleScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      setScrollPercent((window.scrollY / height) * 100)
    }
    window.addEventListener('scroll', handleScroll)

    const viewKey = `fav_views_${resolvedParams.series}_${resolvedParams.id}`
    const currentViews = parseInt(localStorage.getItem(viewKey) || '105', 10)
    const newViews = currentViews + 1
    localStorage.setItem(viewKey, newViews.toString())
    setViewCount(newViews)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [resolvedParams.series, resolvedParams.id])

  return (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>

      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      <div className={`page-enter ${styles.pageWrapper}`}>
        <div className={styles.inner}>
          
          <p className={styles.category}>이리</p>
          <h1 className={styles.title}>가넷 x 케네스</h1>
          <p className={styles.subTitle}>둘이 잘 맞는다</p>

          <div className={styles.metaBar}>
            <div className={styles.metaLeft}>
              <span>2026. 3. 23.</span>
              <span className={styles.clickableMeta} onClick={() => displayToast('조회수가 동기화되었습니다.')}>
                조회 {viewCount}
              </span>
            </div>
            
            <div className={styles.metaRight}>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); displayToast('링크 복사가 완료되었습니다!'); }} className={styles.iconBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>
              <span className={styles.divider}>/</span>
              <button onClick={() => setIsDrawerOpen(true)} className={styles.iconBtn}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>

          <div className={styles.contentPlaceholder}></div>

          <div className={styles.bottomArea}>
            <span className={styles.tag}>#츄라이</span>
            
            <div className={styles.bottomNav}>
              {prevPost ? (
                <Link href={`/fav/${resolvedParams.series}/${prevPost.id}`} className={styles.bottomNavLink}>&larr; {prevPost.title}</Link>
              ) : <span />}
              {nextPost ? (
                <Link href={`/fav/${resolvedParams.series}/${nextPost.id}`} className={styles.bottomNavLink}>{nextPost.title} &rarr;</Link>
              ) : <span />}
            </div>
          </div>

        </div>
      </div>
      <Footer />

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