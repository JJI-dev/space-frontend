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
  const [mounted, setMounted] = useState(false)
  const idx = allBooks.findIndex(p => p.id === book.id)
  const prev = allBooks[idx - 1]
  const next = allBooks[idx + 1]
  
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [showToast, setShowToast] = useState(false)

  // ✨ 목차(TOC) 데이터를 담을 상태
  const [toc, setToc] = useState<{ id: string; text: string }[]>([])

  const triggerToast = (msg: string) => {
    setToastMsg(msg); setShowToast(true)
    setTimeout(() => setShowToast(false), 2500)
  }

  // 1. 기존 스크롤 및 등장 애니메이션 이벤트
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
  }, [book?.id])

  // ✨ 2. 무적의 MDX 목차(TOC) 자동 추출 로직 (플러그인 없어도 강제 생성!)
  useEffect(() => {
    const getHeadings = () => {
      // article 본문 안에 있는 h2만 콕 집어서 가져옵니다.
      const article = document.querySelector('article');
      if (!article) return;

      const headings = Array.from(article.querySelectorAll('h2'));
      
      const tocData = headings.map((heading, index) => {
        // id가 없다면 텍스트를 변환해서 강제로 id를 부여합니다!
        if (!heading.id) {
          const generatedId = heading.textContent?.trim().replace(/\s+/g, '-') || `heading-${index}`;
          heading.id = generatedId;
        }
        
        return {
          id: heading.id,
          text: heading.textContent || '', 
        };
      });

      setToc(tocData);
    };

    // DOM이 완전히 그려질 때까지 150ms 대기 후 실행
    const tocTimer = setTimeout(getHeadings, 150);
    return () => clearTimeout(tocTimer);
  }, [children]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => triggerToast('링크 복사가 완료되었습니다!'))
  }

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
    }
  }

  if (!mounted || !book) return null

  return (
    <>
      <div className={styles.progressContainer}>
        <div className={styles.progressBar} style={{ width: `${scrollPercent}%` }} />
      </div>
      <div className={`${styles.toast} ${showToast ? styles.toastVisible : ''}`}>{toastMsg}</div>

      <div className={styles.detailLayout}>
        <aside className={`${styles.leftNav} ${showFloatingBar ? styles.visible : ''}`}>
          {prev ? <Link href={`/book/${prev.id}`} className={styles.navBtn}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></Link>
                : <button className={styles.navBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 12H5M12 19l-7-7 7-7"/></svg></button>}
          {next ? <Link href={`/book/${next.id}`} className={styles.navBtn}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></Link>
                : <button className={styles.navBtn} disabled><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>}
          <button className={styles.navBtn} onClick={handleCopyLink}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></button>
          <button className={styles.navBtn} onClick={() => setIsDrawerOpen(true)}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>
        </aside>

        <div className={`page-enter ${styles.mainContentWrapper}`}>
          <main className={styles.mainContent}>
            <div className={`${styles.metaArea} ${styles.revealOnScroll}`}>
              {book.coverUrl && <img src={book.coverUrl} alt={book.title} className={styles.coverImg} />}
              <div className={styles.metaInfo}>
                <h1 className={styles.title}>{book.title}</h1>
                <p className={styles.author}>{book.author}</p>
                <span className={styles.catBadge}>#{book.category}</span>
                
                {book.publisher && <div className={styles.metaRow}><span className={styles.metaLabel}>출판사</span><span className={styles.metaValue}>{book.publisher}</span></div>}
                {book.startDate && <div className={styles.metaRow}><span className={styles.metaLabel}>시작 날짜</span><span className={styles.metaValue}>{formatDate(book.startDate)}</span></div>}
                {book.readDate && <div className={styles.metaRow}><span className={styles.metaLabel}>읽은 날짜</span><span className={styles.metaValue}>{formatDate(book.readDate)}</span></div>}
                {book.rating && <div className={styles.metaRow}><span className={styles.metaLabel}>평가</span><span className={styles.metaValue}>{'⭐'.repeat(book.rating)}</span></div>}
                {book.firstImpression && <div className={styles.metaRow}><span className={styles.metaLabel}>첫인상</span><span className={styles.metaValue}>{book.firstImpression}</span></div>}
                {book.summary && <div className={styles.metaRow}><span className={styles.metaLabel}>한줄요약</span><span className={styles.metaValue}>{book.summary}</span></div>}
              </div>
            </div>
            
            <article className={`${styles.content} ${styles.revealOnScroll}`}>
              {children}
            </article>
          </main>

          {/* ✨ 우측 목차 영역 (자동 생성) */}
          <aside className={`${styles.toc} ${styles.revealOnScroll} no-scrollbar`}>
            <p className={styles.tocTitle}>On This Page</p>
            <div className={styles.tocGroup}>
              {toc.length > 0 ? (
                toc.map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => scrollTo(item.id)} 
                    className={styles.tocLink}
                  >
                    {item.text}
                  </button>
                ))
              ) : (
                <p style={{ fontSize: '13px', color: '#8B95A1' }}>작성된 목차가 없습니다.</p>
              )}
            </div>
          </aside>
        </div>
      </div>

      <Footer/>

      {/* 서랍장 (Book) */}
      <div className={`${styles.drawerOverlay} ${isDrawerOpen ? styles.open : ''}`} onClick={() => setIsDrawerOpen(false)} />
      <aside className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <div className={styles.drawerHeader}>
          <h2>목록</h2>
          <button onClick={() => setIsDrawerOpen(false)} className={styles.closeBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.closeIcon}>
              <line x1="5" y1="12" x2="19" y2="12" className={styles.line1} />
              <line x1="5" y1="12" x2="19" y2="12" className={styles.line2} />
            </svg>
          </button>
        </div>
        <div className={styles.drawerList}>
          {allBooks.map(item => (
            <Link key={item.id} href={`/book/${item.id}`} className={styles.drawerItem}>
              <div className={styles.drawerImg}>
                {item.coverUrl ? <img src={item.coverUrl} alt="" /> : <div style={{width:'100%', height:'100%', background:'var(--gray-100)'}}/>}
              </div>
              <div className={styles.drawerItemBody}>
                <h4>{item.title}</h4>
                <p>{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </>
  )
}