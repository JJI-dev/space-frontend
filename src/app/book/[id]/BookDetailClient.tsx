'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Book } from '@/types'
import { formatDate } from '@/lib/formatDate'
import Footer from '@/components/layout/Footer'
import styles from './detail.module.css'

interface Props { 
  book: Book; 
  allBooks: Book[];
  children?: React.ReactNode;
}

export default function BookDetailClient({ book, allBooks, children }: Props) {
  // 이전 글 / 다음 글 계산
  const idx = allBooks.findIndex(p => p.id === book.id)
  const prev = allBooks[idx - 1]
  const next = allBooks[idx + 1]
  
  // 상태 관리
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  const triggerToast = (msg: string) => {
    setToastMsg(msg)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  // 스크롤 및 프로그레스 이벤트
  useEffect(() => {
    const globalHeader = document.querySelector('header')

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setShowFloatingBar(currentScrollY > 150) // 150px 이상 내리면 플로팅 바 등장

      if (globalHeader) {
        if (currentScrollY > 150) {
          globalHeader.style.transform = 'translateY(-100%)'
          globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        } else {
          globalHeader.style.transform = 'translateY(0)'
        }
      }

      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = height > 0 ? (currentScrollY / height) * 100 : 0
      setScrollPercent(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (globalHeader) globalHeader.style.transform = 'translateY(0)'
    }
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      triggerToast('링크 복사가 완료되었습니다!')
    } catch (e) {
      console.error(e)
    }
  }

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  }

  return (
    <>
      {/* 1. 프로그레스 바 & 토스트 */}
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      <div className={`page-enter ${styles.detailLayout}`}>
        
        {/* 2. Left Nav (플로팅 바 - 스크롤 연동) */}
        <aside className={`${styles.leftNav} ${showFloatingBar ? styles.visible : ''}`}>
          {prev ? (
            <Link href={`/book/${prev.id}`} className={styles.navBtn} aria-label="이전 책">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </Link>
          ) : (
            <button className={styles.navBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>
          )}

          {next ? (
            <Link href={`/book/${next.id}`} className={styles.navBtn} aria-label="다음 책">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          ) : (
            <button className={styles.navBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
          )}

          <button className={styles.navBtn} onClick={handleCopyLink} aria-label="링크 복사">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </button>

          <button className={styles.navBtn} onClick={() => setIsDrawerOpen(true)} aria-label="목록 열기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </aside>

        {/* 3. Main Content */}
        <main className={styles.mainContent}>
          <div className={styles.metaArea}>
            <img src={book.coverUrl} alt={book.title} className={styles.coverImg} />
            <div className={styles.metaInfo}>
              <h1 className={styles.title}>{book.title}</h1>
              <p className={styles.author}>{book.author}</p>
              <span className={styles.catBadge}>#{book.category}</span>
              
              {book.publisher && <div className={styles.metaRow}><span className={styles.metaLabel}>출판사</span><span className={styles.metaValue}>{book.publisher}</span></div>}
              {book.readDate && <div className={styles.metaRow}><span className={styles.metaLabel}>읽은 날짜</span><span className={styles.metaValue}>{formatDate(book.readDate)}</span></div>}
              {book.rating && <div className={styles.metaRow}><span className={styles.metaLabel}>평가</span><span className={styles.metaValue}>{'⭐'.repeat(book.rating)}</span></div>}
              {book.summary && <div className={styles.metaRow}><span className={styles.metaLabel}>한줄요약</span><span className={styles.metaValue}>{book.summary}</span></div>}
            </div>
          </div>

          <article>
            {children}
          </article>
        </main>

        {/* 4. Right TOC (토큰 디자인 적용) */}
        <aside className={`${styles.toc} no-scrollbar`}>
          <p className={styles.tocTitle}>On This Page</p>
          <div className={styles.tocGroup}>
            <button onClick={() => scrollTo('review')} className={styles.tocLink}>후기</button>
            <button onClick={() => scrollTo('clothes')} className={styles.tocLink}>CLOTHES</button>
          </div>
        </aside>
        
      </div>
    <Footer/>
      {/* 5. 목록 드로어 (모달) */}
      <div className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ''}`} onClick={() => setIsDrawerOpen(false)} />
      <aside className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <h2>목록</h2>
          <button onClick={() => setIsDrawerOpen(false)} className={styles.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--black)" strokeWidth="1.5"><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </button>
        </div>
        
        <div className={styles.drawerList}>
          {allBooks.map(item => (
            <Link key={item.id} href={`/book/${item.id}`} className={styles.drawerItem}>
              <div className={styles.drawerImg}>
                {item.coverUrl ? <img src={item.coverUrl} alt="" style={{width:'100%', height:'100%', objectFit:'cover', borderRadius:8}}/> : <div style={{width:'100%', height:'100%', background:'var(--gray-100)', borderRadius:8}}/>}
              </div>
              <div className={styles.drawerItemBody}>
                <h4>{item.title}</h4>
                {item.summary && <p>{item.summary}</p>}
                <span>#{item.category}</span>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}