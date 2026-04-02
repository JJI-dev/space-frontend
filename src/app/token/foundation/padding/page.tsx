'use client'

import styles from '@/app/token/token.module.css'
import { Section } from '@/app/token/SharedUI'

export default function PaddingPage() {
  const scrollTo = (id: string) => document.getElementById('token-' + id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <Section id="spacing" title="Spacing Scale">
            <div className={styles.spacingBars}>
              {[4,8,12,16,20,24,32,40,48,60,80].map(n => (
                <div key={n} className={styles.spacingBar}>
                  <div style={{ width: n * 1.4, height: n, background: 'rgba(99,102,241,.25)', border: '1px solid rgba(99,102,241,.4)', borderRadius: 4 }} />
                  <span className={styles.spacingLabel}>{n}px</span>
                </div>
              ))}
            </div>
          </Section>

          <Section id="padding" title="Component Padding 패턴">
            <table className={styles.table}>
              <thead><tr><th>Component</th><th>Value</th></tr></thead>
              <tbody>
                <tr><td>Header (MO)</td><td className={styles.val}>14px 28px (pill 포함 80px 총높이)</td></tr>
                <tr><td>Header (NE/JJI)</td><td className={styles.val}>20px 28px (80px 총높이)</td></tr>
                <tr><td>Footer top</td><td className={styles.val}>60px var(--px) 40px</td></tr>
                <tr><td>Footer bottom bar</td><td className={styles.val}>16px var(--px)</td></tr>
                <tr><td>Section</td><td className={styles.val}>var(--px) 기준 (좌우)</td></tr>
                <tr><td>Nav link</td><td className={styles.val}>8px 18px</td></tr>
              </tbody>
            </table>
          </Section>
        </div>
      </div>

      <nav className={`${styles.toc} no-scrollbar`}>
        <p className={styles.tocTitle}>On This Page</p>
        <div className={styles.tocGroup}>
          <button className={styles.tocLink} onClick={() => scrollTo('spacing')}>Spacing Scale</button>
          <button className={styles.tocLink} onClick={() => scrollTo('padding')}>Component Padding 패턴</button>
        </div>
      </nav>
    </>
  )
}