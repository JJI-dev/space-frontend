'use client'

import styles from '@/app/token/token.module.css'
import { Section, Row, CodeBlock } from '@/app/token/SharedUI'

export default function ColorsPage() {
  const scrollTo = (id: string) => document.getElementById('token-' + id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <Section id="mo-colors" title="MO (Dark theme)">
            <div className={styles.swatchRow}>
              {[
                { bg: '#000', label: '--bg', val: '#000' },
                { bg: '#fff', label: '--fg', val: '#fff', border: true },
                { bg: 'rgba(255,255,255,.04)', label: '--surface', val: 'w/0.04', border: true },
                { bg: 'rgba(255,255,255,.1)', label: '--border', val: 'w/0.1', border: true },
              ].map(s => (
                <div key={s.label} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{ background: s.bg, border: s.border ? '1px solid #e8e8e8' : undefined }} />
                  <p className={styles.swatchLabel}>{s.label}<br /><span>{s.val}</span></p>
                </div>
              ))}
            </div>
            <table className={styles.table}>
              <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
              <tbody>
                <Row t="--bg" v="#000000" u="페이지 배경" />
                <Row t="--fg" v="#ffffff" u="주 텍스트" />
                <Row t="--fg-muted" v="rgba(255,255,255,0.4)" u="보조 텍스트, nav links" />
                <Row t="--surface" v="rgba(255,255,255,0.04)" u="카드, pill 배경" />
                <Row t="--border" v="rgba(255,255,255,0.1)" u="기본 구분선, pill 테두리" />
              </tbody>
            </table>
          </Section>

          <Section id="ne-colors" title="NE / JJI (Light theme)">
            <div className={styles.swatchRow}>
              {[
                { bg: '#0a0a0a', label: '--black',    val: '#0a0a0a' },
                { bg: '#ffffff', label: '--white',    val: '#fff', border: true },
                { bg: '#f5f5f5', label: '--gray-100', val: '#f5f5f5' },
                { bg: '#aaaaaa', label: '--gray-400', val: '#aaa' },
              ].map(s => (
                <div key={s.label} className={styles.swatch}>
                  <div className={styles.swatchColor} style={{ background: s.bg, border: s.border ? '1px solid #e8e8e8' : undefined }} />
                  <p className={styles.swatchLabel}>{s.label}<br /><span>{s.val}</span></p>
                </div>
              ))}
            </div>
            <table className={styles.table}>
              <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
              <tbody>
                <Row t="--black" v="#0a0a0a" u="주 텍스트, 아이콘" />
                <Row t="--white" v="#ffffff" u="페이지 배경" />
                <Row t="--gray-100" v="#f5f5f5" u="카드 배경, 이미지 placeholder" />
                <Row t="--gray-400" v="#aaaaaa" u="보조 텍스트, 레이블" />
              </tbody>
            </table>
          </Section>

          <Section id="css-vars" title="CSS Variables — 복사용">
            <CodeBlock>{`:root {
  /* Layout */
  --px: clamp(24px, 4vw, 48px);
  --logo-h: 20px;
  --ham-h: 20px;
  --footer-clip-h: clamp(80px, 7vw, 130px);
  --footer-clip-ty: -10%;
  /* Typography */
  --ls: -0.04em;
}`}</CodeBlock>
          </Section>
        </div>
      </div>

      <nav className={`${styles.toc} no-scrollbar`}>
        <p className={styles.tocTitle}>On This Page</p>
        <div className={styles.tocGroup}>
          <button className={styles.tocLink} onClick={() => scrollTo('mo-colors')}>MO (Dark theme)</button>
          <button className={styles.tocLink} onClick={() => scrollTo('ne-colors')}>NE / JJI (Light theme)</button>
          <button className={styles.tocLink} onClick={() => scrollTo('css-vars')}>CSS Variables</button>
        </div>
      </nav>
    </>
  )
}