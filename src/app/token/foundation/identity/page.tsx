'use client'

import styles from '@/app/token/token.module.css'

export default function IdentityPage() {
  return (
    <>
      {/* ── CENTER: 본문 ── */}
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <section id="overview" className={styles.section}>
            <h2 className={styles.sectionTitle}>사이트별 Identity</h2>
            <p className={styles.desc}>각 사이트는 고유한 테마, 폰트, 커서 설정을 가집니다.</p>
            {/* ... 표 내용 등 ... */}
          </section>
        </div>
      </div>

      {/* ── RIGHT: 현재 페이지 전용 TOC ── */}
      <nav className={`${styles.toc} no-scrollbar`}>
        <p className={styles.tocTitle}>On This Page</p>
        <div className={styles.tocGroup}>
          <button className={styles.tocLink} onClick={() => document.getElementById('overview')?.scrollIntoView()}>
            사이트별 Identity
          </button>
        </div>
      </nav>
    </>
  )
}