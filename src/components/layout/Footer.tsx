import Link from 'next/link'
import styles from './Footer.module.css'

const PAGES = [
  { label: 'Log',     href: '/log' },
  { label: 'Life',    href: '/life' },
  { label: 'Wish',    href: '/wish' },
  { label: 'Archive', href: '/archive' },
  { label: 'Token',   href: '/token' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div>
          <p className={styles.colHead}>Pages</p>
          <div className={styles.links}>
            {PAGES.map(p => (
              <Link key={p.href} href={p.href} className={styles.link}>{p.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className={styles.colHead}>Me</p>
          <div className={styles.links}>
            <span className={styles.link}>space</span>
          </div>
        </div>
        <div>
          <p className={styles.colHead}>Contact</p>
          <div className={styles.links}>
            <a href="mailto:contact@jji.kr" className={styles.link}>contact@jji.kr</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span className={styles.copy}>© 2026 JJI All rights reserved.</span>
        <span className={styles.copy}>Space</span>
      </div>

      {/* Wordmark clip */}
      <div className={styles.wordmark}>
        <svg
          viewBox="0 0 1920 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMin slice"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <path
            d="M88.92 219.659C167.88 219.659 183.42 200.339 183.42 158.339V-0.000564098H268.68V158.759C268.68 241.079 227.1 292.739 91.86 292.739C49.02 292.739 7.86 286.859 -24.06 276.359L-4.74 207.059C23.4 215.459 61.2 219.659 88.92 219.659ZM385.463 219.659C464.423 219.659 479.963 200.339 479.963 158.339V-0.000564098H565.223V158.759C565.223 241.079 523.643 292.739 388.403 292.739C345.563 292.739 304.403 286.859 272.483 276.359L291.803 207.059C319.943 215.459 357.743 219.659 385.463 219.659ZM691.663 286.439H606.403V-0.000564098H691.663V286.439ZM1034.61 351.539H730.112V301.139H1034.61V351.539ZM1158.42 286.439H1073.16V-0.000564098H1170.6L1416.72 193.619V-0.000564098H1501.98V286.439H1406.64L1158.42 89.4594V286.439ZM1929.5 286.439H1547.3V-0.000564098H1929.5V66.7795H1632.56V114.239H1921.52V169.259H1632.56V219.659H1929.5V286.439Z"
            fill="rgba(0,0,0,0.06)"
          />
        </svg>
      </div>
    </footer>
  )
}
