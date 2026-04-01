'use client'

import { useState } from 'react'
import { ARCHIVE_ITEMS } from '@/lib/data'
import type { ArchiveTab, ArchiveCategory } from '@/types'
import SearchIcon from '@/components/ui/SearchIcon'
import Footer from '@/components/layout/Footer'
import styles from './archive.module.css'

const TABS_CONFIG = [
  { id: 'site' as ArchiveTab, label: '사이트' },
  { id: 'article' as ArchiveTab, label: '아티클' }
]
const CATS: ArchiveCategory[] = ['All', '디자인', '디자인 토큰', '에이전시 사이트']

// URL이 유효한지 검사하고 파비콘 주소를 안전하게 반환하는 헬퍼 함수
const getFaviconUrl = (url?: string) => {
  if (!url) return null;
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;
  } catch (error) {
    return null; // URL 형식이 이상하면 파비콘을 띄우지 않음
  }
}

export default function ArchivePage() {
  const [tab, setTab] = useState<ArchiveTab>('site')
  const [cat, setCat] = useState<ArchiveCategory>('All')
  const [tip, setTip] = useState<{ x: number; y: number; item: typeof ARCHIVE_ITEMS[0] } | null>(null)

  const filtered = ARCHIVE_ITEMS
    .filter(i => i.tab === tab)
    .filter(i => cat === 'All' || i.category === cat)

  const handleMouseEnter = (e: React.MouseEvent, item: typeof ARCHIVE_ITEMS[0]) => {
    setTip({ x: e.clientX + 16, y: e.clientY - 80, item })
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (tip) setTip(prev => prev ? { ...prev, x: e.clientX + 16, y: e.clientY - 80 } : null)
  }
  
  const handleMouseLeave = () => setTip(null)

  return (
    <>
      <div className="page-enter">
        <div className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>Archive</h1>
          <SearchIcon />
        </div>

        <div className={`${styles.layout} reveal reveal-delay-1`}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} no-scrollbar`}>
            {CATS.map(c => (
              <button
                key={c}
                className={`${styles.catBtn} ${cat === c ? styles.active : ''}`}
                onClick={() => setCat(c)}
              >
                {c === 'All' ? 'All' : c}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.tabs}>
              {TABS_CONFIG.map(t => (
                <button
                  key={t.id}
                  className={`${styles.tab} ${tab === t.id ? styles.tabActive : ''}`}
                  onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <table className={styles.table}>
              <colgroup>
                <col style={{ width: '45%' }} />
                <col style={{ width: '55%' }} />
              </colgroup>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>설명</th>
                </tr>
              </thead>
              {/* key={tab}을 주어 탭이 바뀔 때마다 tbody가 새로 마운트되며 애니메이션이 실행됨 */}
              <tbody key={tab} className={styles.tabContentEnter}>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={2} className={styles.empty}>항목이 없습니다</td>
                  </tr>
                ) : filtered.map(item => {
                  const faviconUrl = getFaviconUrl(item.url);
                  
                  return (
                    <tr
                      key={item.id}
                      className={styles.row}
                      onMouseEnter={e => handleMouseEnter(e, item)}
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => item.url && window.open(item.url, '_blank', 'noopener')}
                    >
                      <td>
                        <div className={styles.nameCell}>
                          <span className={styles.favicon}>
                            {faviconUrl ? (
                              <img 
                                src={faviconUrl}
                                alt="" 
                                width={16} 
                                height={16}
                                onError={e => ((e.target as HTMLImageElement).style.display='none')}
                              />
                            ) : (
                              <span style={{ fontSize: 10, color: 'var(--gray-400)' }}>🔖</span>
                            )}
                          </span>
                          <span className={styles.siteName}>{item.name}</span>
                        </div>
                      </td>
                      <td className={styles.desc}>{item.desc}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Hover preview tooltip */}
      {tip && (
        <div
          className={`${styles.tooltip} ${styles.tooltipVisible}`}
          style={{ left: tip.x, top: tip.y }}
        >
          <div className={styles.tooltipImg}>
            {tip.item.preview ? (
              <img 
                src={tip.item.preview} 
                alt="" 
                onError={e => ((e.target as HTMLImageElement).style.display='none')} 
              />
            ) : tip.item.url ? (
              <img 
                src={`https://api.microlink.io/?url=${encodeURIComponent(tip.item.url)}&screenshot=true&meta=false&embed=screenshot.url`} 
                alt="" 
                onError={e => ((e.target as HTMLImageElement).style.display='none')}
              />
            ) : (
              <div className={styles.tooltipImgPlaceholder} />
            )}
          </div>
          <div className={styles.tooltipBody}>
            <p className={styles.tooltipName}>{tip.item.name}</p>
            <p className={styles.tooltipUrl}>{tip.item.url}</p>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}