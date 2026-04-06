'use client'

import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { WishItem } from '@/types'
import styles from './WishModal.module.css'

interface Props {
  item: WishItem
  onClose: () => void
}

export default function WishModal({ item, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    
    window.history.pushState({ modal: 'wish' }, '')

    const handlePopState = () => {
      onClose() 
    }
    window.addEventListener('popstate', handlePopState)

    const handleKeyDown = (e: KeyboardEvent) => { 
 
      if (e.key === 'Escape') window.history.back() 
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleManualClose = () => {
    window.history.back()
  }

  return createPortal(
    <div className={styles.overlay}>
      <div className={styles.bg} onClick={handleManualClose} />
      <div className={styles.panel}>
        <button className={styles.back} onClick={handleManualClose} aria-label="닫기">←</button>

        <div className={styles.img}>
          <img src={item.imageUrl} alt={item.title} />
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{item.title}</h2>
          <p className={styles.cat}>{item.categoryLabel}</p>

          <p className={styles.reasonLabel}>갖고 싶은 이유</p>
          <p className={styles.reason}>{item.reason}</p>

          <div className={styles.footer}>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Price</span>
              <span className={styles.rowVal}>{Number(item.price).toLocaleString()}원</span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Link</span>
              <span className={styles.rowVal}>
                <a href={item.link} target="_blank" rel="noopener noreferrer">+</a>
              </span>
            </div>
            <div className={styles.row}>
              <span className={styles.rowLabel}>Get?</span>
              <span className={styles.rowVal}>{item.isGot ? 'YES' : 'NO'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
