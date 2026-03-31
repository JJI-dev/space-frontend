'use client'

import { useState } from 'react'
import Footer from '@/components/layout/Footer'
import styles from './token.module.css'

const SECTIONS = [
  { id: 'sites',      label: '사이트별 Identity', group: 'Overview' },
  { id: 'shared',     label: '공유 토큰',          group: 'Overview' },
  { id: 'breakpoints',label: 'Breakpoints',        group: 'Overview' },
  { id: 'mo-colors',  label: 'MO — Dark',          group: 'Colors' },
  { id: 'ne-colors',  label: 'NE/JJI — Light',     group: 'Colors' },
  { id: 'spacing',    label: 'Spacing Scale',       group: 'Layout' },
  { id: 'padding',    label: 'Padding 패턴',        group: 'Layout' },
  { id: 'header',     label: 'Header',             group: 'Components' },
  { id: 'footer',     label: 'Footer',             group: 'Components' },
  { id: 'motion',     label: 'Motion',             group: 'Components' },
  { id: 'css-vars',   label: 'CSS Variables',       group: 'CSS Variables' },
]

const GROUPS = ['Overview', 'Colors', 'Layout', 'Components', 'CSS Variables']

export default function TokenPage() {
  const [activeId, setActiveId] = useState('sites')

  const scrollTo = (id: string) => {
    setActiveId(id)
    document.getElementById('token-' + id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className={`${styles.page} page-enter`}>
        {/* Side nav */}
        <nav className={`${styles.sidenav} no-scrollbar`}>
          {GROUPS.map(group => (
            <div key={group} className={styles.navGroup}>
              <p className={styles.navGroupTitle}>{group}</p>
              {SECTIONS.filter(s => s.group === group).map(s => (
                <button
                  key={s.id}
                  className={`${styles.navLink} ${activeId === s.id ? styles.navLinkActive : ''}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Content */}
        <div className={styles.content}>

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
                <Row t="--fg-subtle" v="rgba(255,255,255,0.15)" u="힌트, 플레이스홀더" />
                <Row t="--surface" v="rgba(255,255,255,0.04)" u="카드, pill 배경" />
                <Row t="--surface-hover" v="rgba(255,255,255,0.07)" u="hover 상태 surface" />
                <Row t="--border" v="rgba(255,255,255,0.1)" u="기본 구분선, pill 테두리" />
                <Row t="--border-strong" v="rgba(255,255,255,0.2)" u="강조 테두리" />
              </tbody>
            </table>
          </Section>

          <Section id="ne-colors" title="NE / JJI (Light theme)">
            <div className={styles.swatchRow}>
              {[
                { bg: '#0a0a0a', label: '--black',    val: '#0a0a0a' },
                { bg: '#ffffff', label: '--white',    val: '#fff', border: true },
                { bg: '#f5f5f5', label: '--gray-100', val: '#f5f5f5' },
                { bg: '#e8e8e8', label: '--gray-200', val: '#e8e8e8' },
                { bg: '#aaaaaa', label: '--gray-400', val: '#aaa' },
                { bg: '#666666', label: '--gray-600', val: '#666' },
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
                <Row t="--gray-200" v="#e8e8e8" u="구분선 (border-top)" />
                <Row t="--gray-400" v="#aaaaaa" u="보조 텍스트, 레이블" />
                <Row t="--gray-600" v="#666666" u="비활성 링크, 날짜" />
              </tbody>
            </table>
          </Section>

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
                <tr><td>Contact button</td><td className={styles.val}>10px 22px</td></tr>
                <tr><td>Card inner</td><td className={styles.val}>24px 20px</td></tr>
              </tbody>
            </table>
          </Section>

          <Section id="header" title="Header Component">
            <p className={styles.desc}>헤더 높이 공식</p>
            <div className={styles.formulaBox}>
              <p><strong>MO</strong> — padding 14px + pill 6px + logo 40px + pill 6px + padding 14px = <strong>80px</strong></p>
              <p><strong>NE / JJI</strong> — padding 20px + logo 40px + padding 20px = <strong>80px</strong></p>
            </div>
          </Section>

          <Section id="footer" title="Footer Component">
            <p className={styles.desc}>모든 사이트 footer는 동일한 3-zone 구조를 공유합니다:</p>
            <ol className={styles.ol}>
              <li><strong>Info zone</strong> — 연락처 / 내비게이션 / 브랜드 (grid, padding var(--px))</li>
              <li><strong>Bottom bar</strong> — 카피라이트 좌 / 사이트명 우 (flex, border-top)</li>
              <li><strong>Wordmark clip</strong> — 대형 로고 SVG, overflow:hidden clip</li>
            </ol>
            <CodeBlock>{`.footer-wordmark {
  overflow: hidden;
  height: var(--footer-clip-h);
}
svg {
  preserveAspectRatio: "xMidYMin slice";
  height: 200%; /* 공백 방지 */
}`}</CodeBlock>
          </Section>

          <Section id="motion" title="Motion & Animation">
            <div className={styles.easingGrid}>
              {[
                { name: 'spring', val: 'cubic-bezier(0.22, 1, 0.36, 1)', desc: '페이지 진입, 슬라이드 reveal' },
                { name: 'snap',   val: 'cubic-bezier(0.76, 0, 0.24, 1)', desc: '푸터 전환, 메뉴 슬라이드' },
                { name: 'menu',   val: 'cubic-bezier(0.4, 0, 0.2, 1)',   desc: '드롭다운 max-height' },
                { name: 'default',val: 'ease',                            desc: 'color, bg, opacity 전환' },
              ].map(e => (
                <div key={e.name} className={styles.easingCard}>
                  <p className={styles.easingName}>{e.name}</p>
                  <p className={styles.easingVal}>{e.val}</p>
                  <p className={styles.easingDesc}>{e.desc}</p>
                </div>
              ))}
            </div>
            <table className={styles.table}>
              <thead><tr><th>Name</th><th>Value</th><th>Usage</th></tr></thead>
              <tbody>
                <Row t="instant" v="0.15s" u="hover color 변화" />
                <Row t="fast" v="0.2–0.25s" u="opacity, cursor 크기" />
                <Row t="base" v="0.3–0.4s" u="nav scroll blur, 드롭다운" />
                <Row t="slide" v="0.55–0.65s" u="슬라이드 콘텐츠 전환" />
                <Row t="page" v="0.7s" u="페이지 진입, 메뉴 열기/닫기" />
                <Row t="reveal" v="0.65s" u="IntersectionObserver fade-up" />
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
}
@media (max-width: 480px) {
  :root { --px: 20px; }
}`}</CodeBlock>

            <CodeBlock>{`/* MO — Dark Theme */
:root {
  --bg: #000000;
  --fg: #ffffff;
  --fg-muted: rgba(255,255,255,0.4);
  --fg-subtle: rgba(255,255,255,0.15);
  --surface: rgba(255,255,255,0.04);
  --surface-hover: rgba(255,255,255,0.07);
  --border: rgba(255,255,255,0.1);
  --border-strong: rgba(255,255,255,0.2);
  --font: 'Poppins', sans-serif;
}`}</CodeBlock>

            <CodeBlock>{`/* NE / JJI — Light Theme */
:root {
  --black: #0a0a0a;
  --white: #ffffff;
  --gray-100: #f5f5f5;
  --gray-200: #e8e8e8;
  --gray-400: #aaaaaa;
  --gray-600: #666666;
  --tracking: -0.04em;
  --font-body: 'Pretendard', 'Noto Sans KR', sans-serif;
  --font-display: 'Panchang', 'Noto Sans KR', sans-serif;
}`}</CodeBlock>
          </Section>

        </div>
      </div>
      <Footer />
    </>
  )
}

/* ── Sub-components ── */
function Section({ id, title, badge, children }: {
  id: string; title: string; badge?: string; children: React.ReactNode
}) {
  return (
    <section id={`token-${id}`} className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {title}
        {badge && <span className={styles.badge}>{badge}</span>}
      </h2>
      {children}
    </section>
  )
}

function Token({ children }: { children: React.ReactNode }) {
  return <code style={{ fontFamily: 'Courier New, monospace', fontSize: 13, background: '#f5f5f5', padding: '2px 8px', borderRadius: 4, color: '#FB4C4C' }}>{children}</code>
}

function Row({ t, v, u }: { t: string; v: string; u?: string }) {
  return (
    <tr>
      <td><Token>{t}</Token></td>
      <td style={{ fontSize: 13, color: 'var(--gray-600)' }}>{v}</td>
      {u && <td style={{ fontSize: 13, color: 'var(--gray-400)' }}>{u}</td>}
    </tr>
  )
}

function CodeBlock({ children }: { children: string }) {
  return (
    <pre style={{
      background: '#f5f5f5', borderRadius: 12, padding: '20px 24px', margin: '16px 0',
      fontFamily: 'Courier New, monospace', fontSize: 12, lineHeight: 1.8,
      color: '#0a0a0a', overflowX: 'auto',
    }}>
      <code>{children}</code>
    </pre>
  )
}
