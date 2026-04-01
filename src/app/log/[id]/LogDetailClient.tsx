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
  
  const [showBackBar, setShowBackBar] = useState(false)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    // 💡 글로벌 메인 헤더 요소를 찾습니다 (보통 <header> 태그)
    const globalHeader = document.querySelector('header')

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // 1. 200px 이상 내리면 백 바(뒤로가기 바) 노출
      setShowBackBar(currentScrollY > 200)

      // 2. 글로벌 헤더 숨기기/보이기 로직
      if (globalHeader) {
        if (currentScrollY > 200) {
          // 스크롤을 내리면 헤더를 화면 밖으로 밀어냄 (-100%)
          globalHeader.style.transform = 'translateY(-100%)'
          globalHeader.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
        } else {
          // 다시 맨 위로 올라오면 헤더 복구
          globalHeader.style.transform = 'translateY(0)'
        }
      }

      // 3. 스크롤 진행률(Progress Bar) 계산
      const height = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (currentScrollY / height) * 100
      setScrollPercent(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // 4. 등장 애니메이션 (Intersection Observer)
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

    // 🧹 클린업: 이 페이지를 떠날 때 다른 페이지에 영향이 없도록 헤더를 강제로 보이게 롤백
    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
      if (globalHeader) {
        globalHeader.style.transform = 'translateY(0)'
      }
    }
  }, [post.id])

  // 본문을 파싱하면서 애니메이션 클래스를 입혀줍니다.
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
      {/* ── Fixed back bar & Progress Bar ── */}
      <div className={`${styles.backBar} ${showBackBar ? styles.backBarVisible : ''}`}>
        <div className={styles.progressContainer}>
          <div 
            className={styles.progressBar} 
            style={{ width: `${scrollPercent}%` }} 
          />
        </div>
        <Link href="/log" className={styles.backBtn}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          로그 목록으로
        </Link>
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
          
          {/* <Link href="/log" className={`${styles.backBtnInline} ${styles.revealOnScroll}`}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L7 1M1 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            로그 목록으로
          </Link> */}

          {/* 썸네일에서 이사 온 카테고리와 제목 */}
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

        {/* ── Navigation (Prev / Next) ── */}
        <div className={`${styles.nav} ${styles.revealOnScroll}`}>
          {prev ? <Link href={`/log/${prev.id}`} className={styles.navLink}>← {prev.title}</Link> : <span />}
          {next ? <Link href={`/log/${next.id}`} className={styles.navLink}>{next.title} →</Link> : <span />}
        </div>
      </div>

      <Footer />
    </>
  )
}