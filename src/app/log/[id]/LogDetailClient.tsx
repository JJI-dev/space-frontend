'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { LogPost } from '@/types'
import Footer from '@/components/layout/Footer'
import styles from './detail.module.css'

interface Props { 
  post: LogPost; 
  allPosts: LogPost[] 
}

export default function LogDetailClient({ post, allPosts }: Props) {
  const idx  = allPosts.findIndex(p => p.id === post.id)
  const prev = allPosts[idx - 1]
  const next = allPosts[idx + 1]
  
  // ✨ 플로팅 바 노출 상태
  const [showFloatingBar, setShowFloatingBar] = useState(false)
  // ✨ 스크롤 진행률 상태 복구
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const globalHeader = document.querySelector('header')

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // 1. 200px 이상 스크롤 시 플로팅 바 나타남
      setShowFloatingBar(currentScrollY > 200)

      // 2. 글로벌 헤더 숨기기/보이기 로직
      if (globalHeader) {
        if (currentScrollY > 200) {
          globalHeader.style.transform = 'translateY(-100%)'
          globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        } else {
          globalHeader.style.transform = 'translateY(0)'
        }
      }

      // 3. ✨ 스크롤 진행률(Progress Bar) 계산 복구
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
      alert('링크가 복사되었습니다.')
    } catch (e) {
      console.error(e)
    }
  }

  const renderContent = (md: string) => {
    if (!md) return null
    return md.trim().split('\n\n').map((block, i) => {
      const commonClass = `${styles.revealOnScroll}`
      if (block.startsWith('## '))  return <h2 key={i} className={`${styles.h2} ${commonClass}`}>{block.slice(3)}</h2>
      if (block.startsWith('### ')) return <h3 key={i} className={`${styles.h3} ${commonClass}`}>{block.slice(4)}</h3>
      if (block.startsWith('```')) {
        const code = block.replace(/```[a-z]*/g, '').trim()
        return <pre key={i} className={`${styles.codeBlock} ${commonClass}`}><code>{code}</code></pre>
      }
      if (/^\d+\./.test(block)) {
        const items = block.split('\n').filter(Boolean)
        return <ol key={i} className={`${styles.ol} ${commonClass}`}>{items.map((it, j) => <li key={j}>{it.replace(/^\d+\.\s*/, '')}</li>)}</ol>
      }
      return <p key={i} className={`${styles.p} ${commonClass}`}>{block}</p>
    })
  }

  return (
    <>
      {/* ✨ 상단 스크롤 진행 바 (Progress Bar) 복구 ── */}
      <div className={styles.progressContainer}>
        <div 
          className={styles.progressBar} 
          style={{ width: `${scrollPercent}%` }} 
        />
      </div>

      {/* ── Hero Thumbnail ── */}
      <div className={`${styles.hero} page-enter`}>
        {post.thumb
          ? <img src={post.thumb} alt={post.title} className={styles.heroImg} />
          : <div className={styles.heroPlaceholder} />
        }
      </div>

      {/* ── White Body Area ── */}
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

              {/* 공유, 좋아요 버튼 주석 처리 유지 */}
              {/* <button className={styles.actionBtn} onClick={handleShare} aria-label="공유하기">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </button> */}

              <button className={styles.actionBtn} onClick={handleCopyLink} aria-label="링크 복사">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </button>

              {/* <button className={`${styles.actionBtn} ${isLiked ? styles.liked : ''}`} onClick={handleLike} aria-label="좋아요">
                <svg width="24" height="24" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                <span className={styles.likeCount}>{likeCount}</span>
              </button> */}
            </div>
          </aside>

          {/* 타이틀 및 본문 내용 (기존 유지) */}
          <p className={`${styles.category} ${styles.revealOnScroll}`}>{post.category}</p>
          <h1 className={`${styles.title} ${styles.revealOnScroll}`}>{post.title}</h1>

          <div className={`${styles.meta} ${styles.revealOnScroll}`}>
            <span>{post.date}</span>
            <span>·</span>
            {post.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
          </div>

          <div className={styles.content}>
            {renderContent(post.content || post.excerpt)}
          </div>
        </div>

        {/* 하단 내비게이션 주석 처리 유지 */}
        {/* <div className={`${styles.nav} ${styles.revealOnScroll}`}>
          {prev ? <Link href={`/log/${prev.id}`} className={styles.navLink}>← {prev.title}</Link> : <span />}
          {next ? <Link href={`/log/${next.id}`} className={styles.navLink}>{next.title} →</Link> : <span />}
        </div> */}

      </div>
      <Footer />
    </>
  )
}