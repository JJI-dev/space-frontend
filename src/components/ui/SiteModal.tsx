'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './SiteModal.module.css'

const ITEMS = [
  { label: 'Log',     href: '/log' },
  { label: 'Life',    href: '/life' },
  { label: 'Fav',    href: '/fav' },
  { label: 'Wish',    href: '/wish' },
  { label: 'Book',    href: '/book' },
  { label: 'Archive', href: '/archive' },
  { label: 'Token',   href: '/token' },
]

interface Props {
  open: boolean
  onClose: () => void
}

export default function SiteModal({ open, onClose }: Props) {
  const router = useRouter()

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const go = (href: string) => { onClose(); router.push(href) }

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.open : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.modal} ${open ? styles.open : ''}`}>
        {ITEMS.map(item => (
          <button
            key={item.label}
            className={styles.item}
            onClick={() => go(item.href)}
          >
            <span className={styles.label}>{item.label}</span>
          </button>
        ))}
      </div>
    </>
  )
}