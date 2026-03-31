'use client'

import { useState, useEffect } from 'react'
import Spotlight from './Spotlight'

export default function SearchIcon() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(p => !p) }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="검색 (⌘K)"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 36, height: 36, borderRadius: '50%',
          transition: 'background .2s',
        }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,.06)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
      >
        <svg width="18" height="18" viewBox="0 0 64 62" fill="none">
          <rect x="35.918" y="30" width="36" height="10.8473" rx="4" transform="rotate(39.6266 35.918 30)" fill="black"/>
          <circle cx="29" cy="29" r="26" fill="white" stroke="black" strokeWidth="6"/>
        </svg>
      </button>
      <Spotlight open={open} onClose={() => setOpen(false)} />
    </>
  )
}
