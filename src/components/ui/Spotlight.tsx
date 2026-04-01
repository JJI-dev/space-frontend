'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LOG_POSTS, LIFE_POSTS, WISH_ITEMS, ARCHIVE_ITEMS } from '@/lib/data'
import styles from './Spotlight.module.css'

interface SearchResult {
  href: string
  icon: string
  title: string
  sub: string
  tag: string
}

const PAGE_RESULTS: SearchResult[] = [
  { href: '/log',     icon: '📝', title: 'Log',     sub: 'space.jji.kr/log · 디자인, 개발 기록',     tag: 'Page' },
  { href: '/life',    icon: '💚', title: 'Life',    sub: 'space.jji.kr/life · 일상, 여행, 끄적임',   tag: 'Page' },
  { href: '/wish',    icon: '⭐', title: 'Wish',    sub: 'space.jji.kr/wish · 갖고 싶은 것들',       tag: 'Page' },
  { href: '/archive', icon: '📦', title: 'Archive', sub: 'space.jji.kr/archive · 사이트, 아티클',    tag: 'Page' },
  { href: '/token',   icon: '🎨', title: 'Token',   sub: 'space.jji.kr/token · 디자인 토큰 정리',    tag: 'Page' },
]

function buildAllResults(): SearchResult[] {
  const results: SearchResult[] = [...PAGE_RESULTS]

  LOG_POSTS.forEach(p => results.push({
    href: `/log/${p.id}`,
    icon: '📝',
    title: p.title,
    sub: `Log · ${p.category} · ${p.date}`,
    tag: 'Log',
  }))

  LIFE_POSTS.forEach(p => results.push({
    href: `/life/${p.id}`,
    icon: '💚',
    title: p.title,
    sub: `Life · ${p.category} · ${p.sub}`,
    tag: 'Life',
  }))

  WISH_ITEMS.forEach(w => results.push({
    href: '/wish',
    icon: '⭐',
    title: w.title,
    sub: `Wish · ${w.categoryLabel} · ${Number(w.price).toLocaleString()}원`,
    tag: 'Wish',
  }))

  ARCHIVE_ITEMS.forEach(a => results.push({
    href: a.url.startsWith('http') ? a.url : '/archive',
    icon: '📦',
    title: a.name,
    sub: `Archive · ${a.tab} · ${a.desc}`,
    tag: 'Archive',
  }))

  return results
}

const ALL_RESULTS = buildAllResults()

interface Props { open: boolean; onClose: () => void }

export default function Spotlight({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) { 
      setTimeout(() => {
        setQuery('');
        inputRef.current?.focus();
      }, 60);
    }
  }, [open])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const q = query.trim().toLowerCase()
  const results = q
    ? ALL_RESULTS.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.sub.toLowerCase().includes(q) ||
        r.tag.toLowerCase().includes(q)
      ).slice(0, 20)
    : PAGE_RESULTS

  const go = (href: string) => {
    onClose()
    if (href.startsWith('http')) window.open(href, '_blank', 'noopener')
    else router.push(href)
  }

  return (
    <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.box} onClick={e => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <svg width="18" height="18" viewBox="0 0 64 62" fill="none">
            <rect x="35.918" y="30" width="36" height="10.8473" rx="4" transform="rotate(39.6266 35.918 30)" fill="#aaa"/>
            <circle cx="29" cy="29" r="26" fill="white" stroke="#aaa" strokeWidth="6"/>
          </svg>
          <input
            ref={inputRef} className={styles.input}
            value={query} onChange={e => setQuery(e.target.value)}
            placeholder="검색..." autoComplete="off"
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--gray-400)', fontSize: 18 }}>×</button>
          )}
        </div>
        <div className={styles.results}>
          {results.length === 0
            ? <div className={styles.empty}>결과가 없습니다</div>
            : results.map((r, i) => (
              <button key={i} className={styles.resultItem} onClick={() => go(r.href)}>
                <div className={styles.resultIcon}>{r.icon}</div>
                <div>
                  <div className={styles.resultTitle}>{r.title}</div>
                  <div className={styles.resultSub}>
                    <span className={styles.resultTag}>{r.tag}</span>
                    {r.sub}
                  </div>
                </div>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}