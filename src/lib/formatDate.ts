/**
 * 날짜 문자열을 'YYYY.mm.dd' 형식으로 변환
 * 입력: '2025-12-01' | '2026. 3. 23.' | '2026.04.23' 등
 */
export function formatDate(raw?: string): string {
  if (!raw) return ''

  const trimmed = raw.trim()

  const dotted = trimmed.match(/^(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})(?:\.)?$/)
  if (dotted) {
    const [, y, m, d] = dotted
    return `${y}.${m.padStart(2, '0')}.${d.padStart(2, '0')}`
  }

  const iso = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/)
  if (iso) {
    const [, y, m, d] = iso
    return `${y}.${m}.${d}`
  }

  const compact = trimmed.match(/^(\d{4})\.(\d{2})\.(\d{2})$/)
  if (compact) {
    const [, y, m, d] = compact
    return `${y}.${m}.${d}`
  }

  return trimmed
}

/**
 * 날짜 문자열을 정렬/비교용 타임스탬프로 변환
 */
export function parseDateTime(raw?: string): number {
  if (!raw) return NaN

  const normalized = formatDate(raw)
  const match = normalized.match(/^(\d{4})\.(\d{2})\.(\d{2})$/)
  if (!match) return NaN

  const [, y, m, d] = match
  return Date.UTC(Number(y), Number(m) - 1, Number(d))
}
