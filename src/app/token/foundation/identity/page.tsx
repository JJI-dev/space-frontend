'use client'

import styles from '@/app/token/token.module.css'
import { Section, Token, Row } from '@/app/token/SharedUI'

export default function IdentityPage() {
  const scrollTo = (id: string) => document.getElementById('token-' + id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <Section id="sites" title="사이트별 Identity">
            <p className={styles.desc}>각 사이트는 고유한 테마, 폰트, 커서 설정을 가집니다.</p>
            <table className={styles.table}>
              <thead><tr><th>Site</th><th>Theme</th><th>Primary Font</th><th>Display Font</th><th>Cursor</th></tr></thead>
              <tbody>
                <tr><td><Token>mo.jji.kr</Token></td><td>Dark (black bg)</td><td>Poppins</td><td>Poppins 900</td><td>Custom (none)</td></tr>
                <tr><td><Token>ne.jji.kr</Token></td><td>Light (white bg)</td><td>Pretendard</td><td>Panchang</td><td>Custom (none)</td></tr>
                <tr><td><Token>jji.kr</Token></td><td>Light (white bg)</td><td>Pretendard</td><td>Panchang</td><td>Custom (none)</td></tr>
              </tbody>
            </table>
          </Section>

          <Section id="shared" title="공유 토큰" badge="shared">
            <table className={styles.table}>
              <thead><tr><th>Token</th><th>Value</th><th>Usage</th></tr></thead>
              <tbody>
                <Row t="--px" v="clamp(24px, 4vw, 48px)" u="좌우 page padding (모든 섹션)" />
                <Row t="--logo-h" v="20px" u="헤더 로고 SVG 높이" />
                <Row t="--ham-h" v="20px" u="햄버거 아이콘 높이" />
                <Row t="--ls" v="-0.04em" u="전체 자간 (letter-spacing)" />
                <Row t="--footer-clip-h" v="clamp(80px, 7vw, 130px)" u="푸터 워드마크 clip 높이" />
                <Row t="--footer-clip-ty" v="-10%" u="워드마크 translateY offset" />
              </tbody>
            </table>
          </Section>

          <Section id="breakpoints" title="Breakpoints">
            <table className={styles.table}>
              <thead><tr><th>Name</th><th>Value</th><th>Usage</th></tr></thead>
              <tbody>
                <Row t="mobile" v="≤ 480px" u="--px: 20px 고정, 1컬럼" />
                <Row t="tablet" v="≤ 640px" u="2컬럼, 모바일 nav" />
                <Row t="desktop" v="≥ 1024px" u="4컬럼 풀 레이아웃" />
              </tbody>
            </table>
          </Section>
        </div>
      </div>

      <nav className={`${styles.toc} no-scrollbar`}>
        <p className={styles.tocTitle}>On This Page</p>
        <div className={styles.tocGroup}>
          <button className={styles.tocLink} onClick={() => scrollTo('sites')}>사이트별 Identity</button>
          <button className={styles.tocLink} onClick={() => scrollTo('shared')}>공유 토큰</button>
          <button className={styles.tocLink} onClick={() => scrollTo('breakpoints')}>Breakpoints</button>
        </div>
      </nav>
    </>
  )
}