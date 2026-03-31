'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './Spotlight.module.css'

const PAGES = [
  { label: 'Log',     href: '/log',     icon: '📝', desc: '디자인, 개발 기록' },
  { label: 'Life',    href: '/life',    icon: '💚', desc: '일상, 여행, 끄적임' },
  { label: 'Wish',    href: '/wish',    icon: '⭐', desc: '갖고 싶은 것들' },
  { label: 'Archive', href: '/archive', icon: '📦', desc: '사이트, 아티클 북마크' },
  { label: 'Token',   href: '/token',   icon: '🎨', desc: '디자인 토큰 정리' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function Spotlight({ open, onClose }: Props) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (open) {
      setQuery('')
      setTimeout(() => inputRef.current?.focus(), 60)
    }
  }, [open])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const results = query.trim()
    ? PAGES.filter(p =>
        p.label.toLowerCase().includes(query.toLowerCase()) ||
        p.desc.toLowerCase().includes(query.toLowerCase())
      )
    : PAGES

  const go = (href: string) => { onClose(); router.push(href) }

  return (
    <div
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      onClick={onClose}
    >
      <div className={styles.box} onClick={e => e.stopPropagation()}>
        <div className={styles.inputRow}>
          <svg width="18" height="18" viewBox="0 0 64 62" fill="none">
            <rect x="35.918" y="30" width="36" height="10.8473" rx="4" transform="rotate(39.6266 35.918 30)" fill="#aaa"/>
            <circle cx="29" cy="29" r="26" fill="white" stroke="#aaa" strokeWidth="6"/>
          </svg>
          <input
            ref={inputRef}
            className={styles.input}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="페이지 검색..."
            autoComplete="off"
          />
          {query && (
            <button onClick={() => setQuery('')} style={{ color: 'var(--gray-400)', fontSize: 18 }}>×</button>
          )}
        </div>

        <div className={styles.results}>
          {results.length === 0 ? (
            <div className={styles.empty}>결과가 없습니다</div>
          ) : results.map(r => (
            <button
              key={r.href}
              className={styles.resultItem}
              onClick={() => go(r.href)}
            >
              <div className={styles.resultIcon}>{r.icon}</div>
              <div>
                <div className={styles.resultTitle}>{r.label}</div>
                <div className={styles.resultSub}>space.jji.kr{r.href} · {r.desc}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
