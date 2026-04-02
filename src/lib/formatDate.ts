/**
 * 날짜 문자열을 'YYYY. MM. DD' 형식으로 변환
 * 입력: '2025-12-01' | '2026. 3. 23.' 등
 */
export function formatDate(raw?: string): string {
    if (!raw) return ''
    const already = raw.match(/^(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/)
    if (already) {
      const [, y, m, d] = already
      return `${y}. ${m.padStart(2, '0')}. ${d.padStart(2, '0')}`
    }
    const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})/)
    if (iso) {
      const [, y, m, d] = iso
      return `${y}. ${m}. ${d}`
    }
    return raw
  }