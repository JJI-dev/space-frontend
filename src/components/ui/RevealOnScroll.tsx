'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: 0 | 1 | 2 | 3 | 4
  // 👇 세상의 모든 HTML 태그를 검사하지 않도록 any(또는 React.ElementType)로 풀어줍니다.
  as?: any 
}

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: Props) {
  // 👇 ref 역시 까다로운 타입 검사를 피하도록 any로 설정합니다.
  const ref = useRef<any>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const delayClass = delay > 0 ? `reveal-delay-${delay}` : ''

  return (
    <Tag
      ref={ref}
      className={`reveal ${delayClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}