'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Spotlight from '@/components/ui/Spotlight'
import styles from './Header.module.css'

const NAV_LINKS = [
  { label: 'Log',     href: '/log' },
  { label: 'Life',    href: '/life' },
  { label: 'Wish',    href: '/wish' },
  { label: 'Archive', href: '/archive' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled,      setScrolled]      = useState(false)
  const [spotlightOpen, setSpotlightOpen] = useState(false)
  const [mobOpen,       setMobOpen]       = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { setMobOpen(false) }, [pathname])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSpotlightOpen(p => !p)
      }
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        {/* Logo */}
        <Link href="/" aria-label="Home" className={styles.logo}>
          <svg viewBox="0 0 107 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M28.0831 37.8998C27.3803 38.1933 26.2398 38.1938 21.8673 37.3204C19.2958 36.8067 14.8826 36.0369 12.2049 35.4698C7.49817 34.4731 6.55574 33.4429 5.5403 32.4422C4.6659 31.5804 3.87078 28.8889 3.23539 26.5626C2.83302 25.0895 3.00242 23.67 3.319 21.9061C3.55532 20.5894 4.18176 18.4554 4.67927 16.9116C5.47065 14.4557 6.25665 13.2037 6.83065 12.3718C7.51516 11.3798 8.95755 9.96557 11.4351 8.0389C12.8493 6.93917 14.8725 5.91338 16.3891 5.16269C18.8643 3.93758 20.5833 3.54078 22.2373 3.28163C24.7552 2.88714 27.0833 2.97955 28.6307 3.12426C30.1962 3.27066 31.8955 3.86453 33.7203 4.43638C37.1424 5.50884 39.2811 6.67545 40.3723 7.45089C41.7436 8.42541 42.9618 11.3104 43.9898 13.8119C44.4587 14.9531 44.4694 16.1015 44.4802 17.9809C44.5013 21.6777 44.3366 24.3178 44.2596 24.8655C44.2044 25.4133 44.1164 25.9457 43.9845 26.4058C43.9181 26.6135 43.8526 26.7688 43.3224 27.104" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round"/>
            <path d="M43.668 26.7708C43.9658 26.5895 44.9639 26.0197 46.5745 25.703C47.5547 25.5103 48.9238 25.8896 50.4488 26.6447C51.0292 26.937 51.4928 27.1998 51.8724 27.4411C52.0537 27.5429 52.2123 27.6027 52.6152 27.8456" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round"/>
            <path d="M53.0848 28.1695C53.0848 28.1311 52.9749 27.5945 52.8084 26.1449C52.5494 23.8896 52.9241 21.5002 53.2661 19.6831C53.5318 18.2714 53.9174 17.3119 54.5066 16.1679C56.4838 12.3287 58.1073 10.7965 59.1517 9.66114C60.2062 8.5147 61.4653 7.46196 62.6095 6.72232C63.8913 5.89369 65.9866 5.71168 70.2299 5.82055C72.3468 5.87485 73.951 6.35634 76.4314 6.97007C78.4919 7.47992 80.1652 8.40921 81.5846 9.04396C82.9157 9.63919 83.9237 10.2144 84.7813 10.7532C86.05 11.5504 87.9628 12.9596 88.8866 13.6514C90.1374 14.588 90.8847 15.7037 92.0694 17.277C92.8512 18.3153 93.4312 19.3509 94.1459 20.6089C95.0685 22.2329 95.2782 23.1168 95.4656 24.1507C95.889 26.4867 95.2553 27.5117 95.0665 28.3299C94.8958 29.0697 94.4136 29.8549 93.7919 30.6624C93.0568 31.6175 91.6691 32.4653 88.9912 33.8322C86.0546 35.3313 84.9558 35.433 82.6968 35.6493C81.9148 35.7113 81.0066 35.7961 80.0308 35.8588C79.0551 35.9215 78.0392 35.9595 76.9925 35.9405" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round"/>
            <path d="M72.7373 48.3953C73.7384 48.9424 75.8053 49.5858 82.8808 49.4249C86.7021 49.338 89.4998 47.5337 91.2424 46.1901C91.9985 45.607 92.614 44.8704 93.4372 44.3625C94.7243 43.5685 96.5807 44.3509 101.218 45.9323C102.178 46.2449 102.455 46.313 102.764 46.4274C103.073 46.5419 103.405 46.7007 103.999 47.2767" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round"/>
            <path d="M28.3586 37.3556C28.2723 37.4579 27.9402 37.8429 27.2383 38.6404C26.3039 39.7021 25.421 40.7647 24.7161 41.9108C23.7873 43.4207 23.2421 45.2513 22.8936 47.0156C22.5442 48.7848 22.7018 50.0213 22.816 50.7799C22.9817 51.8799 23.5037 53.2958 24.2198 54.8223C24.9301 56.3364 26.3875 57.7118 27.8648 59.0268C29.0468 60.0789 29.9431 60.494 30.4227 60.7514C31.0434 61.0845 32.3074 61.5379 33.8716 62.0538C34.9877 62.422 36.1894 62.5857 37.4949 62.7855C39.2581 63.0555 41.2406 63.1918 42.8659 63.3737C45.183 63.6329 46.4332 63.7992 48.001 63.8906C50.2619 64.0224 51.9172 64.007 52.211 63.9874C53.3073 63.9144 55.1749 63.6683 57.3999 63.31C58.5827 63.1195 60.226 62.7042 61.4798 62.3567C62.2334 62.1478 62.7809 61.8936 63.5348 61.3983C64.19 60.9677 65.1065 60.2129 65.856 59.5192C66.6278 58.8049 67.1061 58.1759 67.6381 57.5552C68.6485 56.3764 68.9177 55.8772 69.5209 55.0043C70.0403 54.2527 70.2551 53.8281 70.4567 53.3905C70.7159 52.8277 70.9018 52.275 71.2967 50.5963C71.4962 49.7484 71.4489 48.1987 71.4776 46.211C71.508 44.1033 71.5925 43.3229 71.6858 42.7267C71.7643 42.2253 71.808 41.6508 71.9085 41.0693C72.0199 40.4242 72.0667 39.8229 72.0885 39.2224C72.1098 38.9614 72.1245 38.2988 72.1316 37.4183C72.1387 37.0806 72.153 36.9643 72.1676 36.5703" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round"/>
            <path d="M72.6021 36.5859C72.7468 36.5859 72.8937 36.5793 73.4883 36.5036C74.9802 36.303 76.1168 36.1544 76.3614 36.1312C76.4684 36.1212 76.5408 36.1146 76.7908 36.0879" stroke="#0a0a0a" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className={styles.nav}>
          {NAV_LINKS.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={`${styles.navLink} ${isActive(n.href) ? styles.active : ''}`}
            >
              {n.label}
            </Link>
          ))}
          <span className={styles.sep} />
          <Link
            href="/token"
            className={`${styles.navLink} ${isActive('/token') ? styles.active : ''}`}
          >
            Token
          </Link>
          <span className={styles.sep} />
        </nav>

        {/* Right */}
        <div className={styles.right}>
          <button
            className={styles.searchBtn}
            onClick={() => setSpotlightOpen(true)}
            aria-label="검색 (⌘K)"
          >
            <svg width="18" height="18" viewBox="0 0 64 62" fill="none">
              <rect x="35.918" y="30" width="36" height="10.8473" rx="4" transform="rotate(39.6266 35.918 30)" fill="black"/>
              <circle cx="29" cy="29" r="26" fill="white" stroke="black" strokeWidth="6"/>
            </svg>
          </button>
          <button className={styles.contactBtn}>Contact</button>

          {/* Mobile ham */}
          <button
            className={styles.hamBtn}
            onClick={() => setMobOpen(p => !p)}
            aria-label="메뉴"
          >
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
              <line x1="1" y1="2"  x2="21" y2="2"  stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="1" y1="10" x2="21" y2="10" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
              <line x1="1" y1="18" x2="21" y2="18" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobOpen && (
        <div className={styles.mobOverlay} onClick={() => setMobOpen(false)} />
      )}
      <div className={`${styles.mobMenu} ${mobOpen ? styles.mobOpen : ''}`}>
        {[...NAV_LINKS, { label: 'Token', href: '/token' }].map(n => (
          <Link key={n.href} href={n.href} className={styles.mobLink}>{n.label}</Link>
        ))}
        <button
          className={styles.mobLink}
          onClick={() => { setSpotlightOpen(true); setMobOpen(false) }}
        >
          Search
        </button>
      </div>

      <Spotlight open={spotlightOpen} onClose={() => setSpotlightOpen(false)} />
    </>
  )
}
