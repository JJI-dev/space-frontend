'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import styles from './token.module.css'

// URL 경로와 매칭될 사이드바 데이터
const NAV_DATA = {
  foundation: [
    {
      group: 'Overview',
      items: [
        { label: '사이트별 Identity', href: '/token/foundation/identity' },
        { label: 'Colors', href: '/token/foundation/colors' },
        { label: 'Padding 패턴', href: '/token/foundation/padding' },
      ],
    },
  ],
  components: [
    {
      group: 'UI Components',
      items: [
        { label: 'Header', href: '/token/components/header' },
        { label: 'Footer', href: '/token/components/footer' },
      ],
    },
  ],
}

export default function TokenLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() // 현재 주소 가져오기 (ex: /token/foundation/colors)
  
  // 주소를 분석해서 현재 탭(foundation 인지 components 인지) 파악
  const currentTab = pathname.includes('/components') ? 'components' : 'foundation'
  const currentTree = NAV_DATA[currentTab]

  // 그룹 접기/펴기 상태 (기본적으로 다 열어둠)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(currentTree.map(g => [g.group, true]))
  )

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  return (
    <div className="page-enter">
      {/* ── TOP: 타이틀 및 최상위 탭 ── */}
      <div className={styles.topNavContainer}>
        <h1 className={styles.pageTitle}>Design Token</h1>
        <div className={styles.topTabs}>
          <Link 
            href="/token/foundation/identity" 
            className={`${styles.topTab} ${currentTab === 'foundation' ? styles.topTabActive : ''}`}
          >
            Foundation
          </Link>
          <Link 
            href="/token/components/header" 
            className={`${styles.topTab} ${currentTab === 'components' ? styles.topTabActive : ''}`}
          >
            Components
          </Link>
        </div>
      </div>

      <div className={styles.page}>
        {/* ── LEFT: 해당 탭의 사이드바 목차 (링크 이동) ── */}
        <nav className={`${styles.sidenav} no-scrollbar`}>
          {currentTree.map(g => (
            <div key={g.group} className={styles.navSection}>
              <button
                className={styles.navSectionHeader}
                onClick={() => toggleGroup(g.group)}
              >
                {g.group}
                <svg className={`${styles.navChevron} ${openGroups[g.group] ? styles.open : ''}`} viewBox="0 0 12 12" fill="none">
                  <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`${styles.navItems} ${!openGroups[g.group] ? styles.collapsed : ''}`}>
                {g.items.map(item => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ── CENTER & RIGHT: 실제 페이지 내용이 들어가는 자리 ── */}
        {children}
      </div>
      <Footer />
    </div>
  )
}