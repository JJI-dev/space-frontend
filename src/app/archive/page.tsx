'use client'

import { useState, useRef, useEffect } from 'react'
import { ARCHIVE_ITEMS } from '@/lib/data'
import type { ArchiveTab, ArchiveCategory } from '@/types'
import SearchIcon from '@/components/ui/SearchIcon'
import Footer from '@/components/layout/Footer'
import styles from './archive.module.css'

const TABS: ArchiveTab[]         = ['site', 'article']
const CATS: ArchiveCategory[]    = ['ALL', '디자인', '디자인 토큰', '에이전시 사이트']

interface TooltipState {
  visible: boolean
  x: number; y: number
  name: string; url: string; preview: string
}

export default function ArchivePage() {
  const [tab, setTab] = useState<ArchiveTab>('site')
  const [cat, setCat] = useState<ArchiveCategory>('ALL')
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false, x: 0, y: 0, name: '', url: '', preview: ''
  })

  const items = ARCHIVE_ITEMS
    .filter(i => i.tab === tab)
    .filter(i => cat === 'ALL' || i.category === cat)

  const showTooltip = (e: React.MouseEvent, item: typeof ARCHIVE_ITEMS[0]) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setTooltip({
      visible: true,
      x: Math.min(rect.right + 12, window.innerWidth - 296),
      y: rect.top + window.scrollY - 80,
      name: item.name,
      url: item.url,
      preview: item.preview || '',
    })
  }
  const hideTooltip = () => setTooltip(t => ({ ...t, visible: false }))

  return (
    <>
      <div className="page-enter">
        {/* Header */}
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
                {c === 'ALL' ? 'All' : c}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className={styles.content}>
            {/* Tab toggle */}
            <div className={styles.tabs}>
              {TABS.map(t => (
                <button
                  key={t}
                  className={`${styles.tab} ${tab === t ? styles.tabActive : ''}`}
                  onClick={() => setTab(t)}
                >
                  {t === 'site' ? '사이트' : '아티클'}
                </button>
              ))}
            </div>

            {/* Table */}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>제목</th>
                  <th>설명</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={2} className={styles.empty}>항목이 없습니다</td>
                  </tr>
                ) : items.map(item => (
                  <tr
                    key={item.id}
                    className={styles.row}
                    onMouseEnter={e => showTooltip(e, item)}
                    onMouseLeave={hideTooltip}
                    onClick={() => window.open(item.url, '_blank', 'noopener')}
                  >
                    <td>
                      <div className={styles.nameCell}>
                        <span className={styles.favicon}>
                          {item.favicon && (
                            <img src={item.favicon} alt="" width={16} height={16}
                              onError={e => ((e.target as HTMLImageElement).style.display='none')}
                            />
                          )}
                        </span>
                        <span className={styles.siteName}>{item.name}</span>
                      </div>
                    </td>
                    <td className={styles.desc}>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Preview tooltip */}
      <div
        className={`${styles.tooltip} ${tooltip.visible ? styles.tooltipVisible : ''}`}
        style={{ top: tooltip.y, left: tooltip.x }}
      >
        <div className={styles.tooltipImg}>
          {tooltip.preview
            ? <img src={tooltip.preview} alt="" onError={e => ((e.target as HTMLImageElement).style.display='none')} />
            : <div className={styles.tooltipImgPlaceholder} />
          }
        </div>
        <div className={styles.tooltipBody}>
          <p className={styles.tooltipName}>{tooltip.name}</p>
          <p className={styles.tooltipUrl}>{tooltip.url}</p>
        </div>
      </div>

      <Footer />
    </>
  )
}
