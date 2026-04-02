'use client'

import { useState, useEffect } from 'react'

/**
 * 페이지 진입 시 localStorage 기반 조회수 +1
 * key: `views_${namespace}_${id}`
 */
export function useViewCount(namespace: string, id: string): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const key     = `views_${namespace}_${id}`
    const current = parseInt(localStorage.getItem(key) || '0', 10)
    const next    = current + 1
    localStorage.setItem(key, String(next))
    setCount(next)
  }, [namespace, id])

  return count
}