// ── Log ──────────────────────────────────────────────
export type LogCategory = 'All' | 'Product' | 'Design' | 'Tech' | 'Study'

export interface LogPost {
  id: string
  slug: string
  category: Exclude<LogCategory, 'All'>
  title: string
  excerpt: string
  date: string
  tags: string[]
  thumb?: string
  content?: string
}

// ── Life ─────────────────────────────────────────────
export type LifeCategory = 'All' | 'Travel' | 'Hot spot' | 'Diary'| 'Game'

export interface LifePost {
  id: string
  slug: string
  category: Exclude<LifeCategory, 'All'>
  sub: string   // date string
  title: string
  thumb?: string
  thumbnail?: string
  tags: string[]
  content: string
}


// ── Wish ─────────────────────────────────────────────
export type WishCategory = 'All' | 'GOODS' | 'CLOTHES' | 'COSMETICS'

export interface WishItem {
  id: string
  slug: string
  title: string
  category: Exclude<WishCategory, 'All'>
  categoryLabel: string
  imageUrl: string
  price: number
  link: string
  reason: string
  isGot: boolean
}

// ── Book ─────────────────────────────────────────────
export type BookCategory = 'All' | '기술' | '디자인' | '기획' | '문학' | '소설' | '자기계발' | '인문' | '과학' | 'SF' | '추리';
export type BookType = '리뷰' | '위시';

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  publisher?: string;
  startDate?: string; // yyyy.mm.dd
  readDate?: string; // yyyy.mm.dd
  rating?: number; // 1~5
  summary?: string; // 한줄요약
  firstImpression?: string; //첫인상
  type: BookType;
  category: BookCategory;
  coverUrl: string;
  content?: string; // 상세 내용 (MDX 등)
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