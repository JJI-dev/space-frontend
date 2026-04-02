'use client'

import styles from '@/app/token/token.module.css'
import { Section, Row } from '@/app/token/SharedUI'

export default function HeaderPage() {
  const scrollTo = (id: string) => document.getElementById('token-' + id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          <Section id="header" title="Header Component">
            <p className={styles.desc}>헤더 높이 공식</p>
            <div className={styles.formulaBox}>
              <p><strong>MO</strong> — padding 14px + pill 6px + logo 40px + pill 6px + padding 14px = <strong>80px</strong></p>
              <p><strong>NE / JJI</strong> — padding 20px + logo 40px + padding 20px = <strong>80px</strong></p>
            </div>
          </Section>

          <Section id="motion" title="Motion & Animation">
            <table className={styles.table}>
              <thead><tr><th>Name</th><th>Value</th><th>Usage</th></tr></thead>
              <tbody>
                <Row t="instant" v="0.15s" u="hover color 변화" />
                <Row t="fast" v="0.2–0.25s" u="opacity, cursor 크기" />
                <Row t="base" v="0.3–0.4s" u="nav scroll blur, 드롭다운" />
                <Row t="reveal" v="0.65s" u="IntersectionObserver fade-up" />
              </tbody>
            </table>
          </Section>
        </div>
      </div>

      <nav className={`${styles.toc} no-scrollbar`}>
        <p className={styles.tocTitle}>On This Page</p>
        <div className={styles.tocGroup}>
          <button className={styles.tocLink} onClick={() => scrollTo('header')}>Header Component</button>
          <button className={styles.tocLink} onClick={() => scrollTo('motion')}>Motion & Animation</button>
        </div>
      </nav>
    </>
  )
}