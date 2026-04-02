'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from '@/components/layout/Footer'
import styles from './token.module.css'

// 1. TypeScript 타입 정의
type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

type NavGroup = {
  group: string;
  items: NavItem[];
}

// 2. 사이드바 데이터
const NAV_DATA: Record<'foundation' | 'components', NavGroup[]> = {
  foundation: [
    {
      group: 'Overview',
      items: [
        {
          label: '사이트별 Identity',
          href: '/token/foundation/identity',
          children: [
            { label: 'MO Identity', href: '/token/foundation/identity/mo' },
            { label: 'NE Identity', href: '/token/foundation/identity/ne' },
          ]
        },
        { label: 'Colors', href: '/token/foundation/colors' },
        { label: 'Header', href: '/token/foundation/header' },
        { label: 'footer', href: '/token/foundation/footer' },
      ],
    },
    {
      group: 'test',
      items: [
        {
          label: 'sub test1',
          href: '', // 💡 페이지 이동 없이 클릭 시 하위 메뉴만 펼쳐집니다.
          children: [
            { label: 'test2', href: '/token/foundation/identity/mo' },
            { label: 'test3', href: '/token/foundation/identity/ne' },
          ]
        },
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
  const pathname = usePathname()
  const currentTab = pathname.includes('/components') ? 'components' : 'foundation'
  const currentTree = NAV_DATA[currentTab]

  // 메인 그룹(1Depth 상위) 접기/펴기 상태
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
    Object.fromEntries(currentTree.map(g => [g.group, true]))
  )

  // 서브 메뉴(2Depth) 접기/펴기 상태
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({})

  const toggleGroup = (group: string) => {
    setOpenGroups(prev => ({ ...prev, [group]: !prev[group] }))
  }

  return (
    <div className="page-enter">
      <div className={styles.topNavContainer}>
        <h1 className={styles.pageTitle}>Design Token</h1>
        <div className={styles.topTabs}>
          <Link href="/token/foundation/identity" className={`${styles.topTab} ${currentTab === 'foundation' ? styles.topTabActive : ''}`}>Foundation</Link>
          <Link href="/token/components/header" className={`${styles.topTab} ${currentTab === 'components' ? styles.topTabActive : ''}`}>Components</Link>
        </div>
      </div>

      <div className={styles.page}>
        <nav className={`${styles.sidenav} no-scrollbar`}>
          {currentTree.map(g => (
            <div key={g.group} className={styles.navSection}>
              <button className={styles.navSectionHeader} onClick={() => toggleGroup(g.group)}>
                {g.group}
                <svg className={`${styles.navChevron} ${openGroups[g.group] ? styles.open : ''}`} viewBox="0 0 12 12" fill="none">
                  <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={`${styles.navItems} ${!openGroups[g.group] ? styles.collapsed : ''}`}>
                {g.items.map(item => {
                  const hasChildren = item.children && item.children.length > 0
                  
                  // 1. 링크가 비어있는 폴더 전용 메뉴인지 확인
                  const isFolderOnly = item.href === ''
                  
                  // 2. 상태를 저장할 고유 Key (href가 비어있으면 label을 키로 사용)
                  const itemKey = isFolderOnly ? item.label : item.href

                  // 3. 부모 메뉴 활성화(하이라이트) 조건 똑똑하게 처리
                  const isParentActive = isFolderOnly
                    ? (item.children?.some(child => pathname.startsWith(child.href)) || false)
                    : pathname.startsWith(item.href)

                  // 현재 열려있는지 여부
                  const isSubMenuOpen = openSubMenus[itemKey] ?? isParentActive

                  // 4. 토글 함수 통합 (버튼이든 글자든 누르면 발동)
                  const handleToggle = (e: React.MouseEvent) => {
                    e.preventDefault()
                    setOpenSubMenus(prev => ({ ...prev, [itemKey]: !isSubMenuOpen }))
                  }

                  return (
                    <div key={itemKey} className={styles.navLinkWrapper}>
                      
                      {/* ✨ 링크 여부에 따라 Link 태그 또는 버튼(div) 렌더링 */}
                      {isFolderOnly ? (
                        <div
                          className={`${styles.navLink} ${isParentActive ? styles.navLinkActive : ''}`}
                          onClick={handleToggle}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.label}
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={`${styles.navLink} ${pathname === item.href ? styles.navLinkActive : ''}`}
                        >
                          {item.label}
                        </Link>
                      )}

                      {/* ✨ 서브 메뉴 화살표 버튼 (클릭 영역 통합) */}
                      {hasChildren && (
                        <button
                          className={`${styles.subToggleBtn} ${isParentActive ? styles.subToggleBtnActive : ''}`}
                          onClick={handleToggle}
                        >
                          <svg className={`${styles.navChevron} ${isSubMenuOpen ? styles.open : ''}`} viewBox="0 0 12 12" fill="none">
                            <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      )}

                      {/* ✨ 서브 메뉴 리스트 영역 */}
                      {hasChildren && (
                        <div className={`${styles.subItems} ${!isSubMenuOpen ? styles.collapsed : ''}`}>
                          {item.children!.map(sub => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              className={`${styles.navLinkSub} ${pathname === sub.href ? styles.navLinkSubActive : ''}`}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {children}
      </div>
      <Footer />
    </div>
  )
}