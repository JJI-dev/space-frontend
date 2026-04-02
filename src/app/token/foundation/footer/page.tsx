'use client'

import styles from '@/app/token/token.module.css'
import { Section, CodeBlock } from '@/app/token/SharedUI'

export default function FooterPage() {
  const scrollTo = (id: string) => document.getElementById('token-' + id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentInner}>
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
        </div>
      </div>

      <nav className={`${styles.toc} no-scrollbar`}>
        <p className={styles.tocTitle}>On This Page</p>
        <div className={styles.tocGroup}>
          <button className={styles.tocLink} onClick={() => scrollTo('footer')}>Footer Component</button>
        </div>
      </nav>
    </>
  )
}