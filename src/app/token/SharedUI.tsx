'use client'

import React from 'react'
import styles from './token.module.css'

export function Section({ id, title, badge, children }: { id: string; title: string; badge?: string; children: React.ReactNode }) {
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

export function Token({ children }: { children: React.ReactNode }) {
  return <code style={{ fontFamily: 'Courier New, monospace', fontSize: 13, background: '#f5f5f5', padding: '2px 8px', borderRadius: 4, color: '#FB4C4C' }}>{children}</code>
}

export function Row({ t, v, u }: { t: string; v: string; u?: string }) {
  return (
    <tr>
      <td><Token>{t}</Token></td>
      <td style={{ fontSize: 13, color: 'var(--gray-600)' }}>{v}</td>
      {u && <td style={{ fontSize: 13, color: 'var(--gray-400)' }}>{u}</td>}
    </tr>
  )
}

export function CodeBlock({ children }: { children: string }) {
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