// ── Log ──────────────────────────────────────────────
export type LogCategory = 'All' | 'Product' | 'Design' | 'Tech' | 'Study'

export interface LogPost {
  id: string
  category: Exclude<LogCategory, 'All'>
  title: string
  excerpt: string
  date: string
  tags: string[]
  thumb?: string
  content?: string
}

// ── Life ─────────────────────────────────────────────
export type LifeCategory = 'All' | 'Travel' | 'Hot spot' | 'Diary'

export interface LifePost {
  id: string
  category: Exclude<LifeCategory, 'All'>
  sub: string   // date string
  title: string
  thumb?: string
  tags: string[]
  content: string
}

// ── Wish ─────────────────────────────────────────────
export type WishCategory = 'All' | 'GOODS' | 'CLOTHES' | 'COSMETICS'

export interface WishItem {
  id: string
  title: string
  category: Exclude<WishCategory, 'All'>
  categoryLabel: string
  imageUrl: string
  price: number
  link: string
  reason: string
  isGot: boolean
}

// ── Archive ───────────────────────────────────────────
export type ArchiveTab = 'site' | 'article'
export type ArchiveCategory = 'All' | '디자인' | '디자인 토큰' | '에이전시 사이트'

export interface ArchiveItem {
  id: string
  tab: ArchiveTab
  category: Exclude<ArchiveCategory, 'All'>
  name: string
  url: string
  desc: string
  favicon?: string
  preview?: string
}