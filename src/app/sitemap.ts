import { MetadataRoute } from 'next'

// 🚨 주의: JJine님 프로젝트의 실제 데이터 파일 경로에 맞게 수정해 주세요!
// 예시: import { FAV_POSTS_DATA } from '@/lib/data'
import { FAV_POSTS_DATA } from '@/lib/data/fav' 
import { LIFE_POSTS } from '@/lib/data/life' 
import { books } from '@/lib/data/book' 
import { LOG_POSTS} from '@/lib/data/log'   

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://space.jji.kr'

  // 1. 기존에 있던 정적 페이지들 (한 번에 생성!)
  const staticRoutes = [
    '', 
    '/archive', 
    '/fav', 
    '/log', 
    '/book', 
    '/life', 
    '/wish', 
    '/token'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  // 2. Fav (덕질) 동적 페이지 자동 생성
  const favRoutes: MetadataRoute.Sitemap = []
  
  if (FAV_POSTS_DATA) {
    Object.entries(FAV_POSTS_DATA).forEach(([seriesKey, posts]) => {
      posts.forEach((post) => {
        const postSlug = (post as any).slug ?? post.id
        favRoutes.push({
          url: `${baseUrl}/fav/${seriesKey}/${postSlug}`,
          lastModified: new Date(post.date || new Date()), 
          changeFrequency: 'daily',
          priority: 0.7,
        })
      })
    })
  }

  // 3. Life 동적 페이지 자동 생성
  const lifeRoutes: MetadataRoute.Sitemap = []
  
  if (LIFE_POSTS) {
    LIFE_POSTS.forEach((post) => {
      lifeRoutes.push({
        url: `${baseUrl}/life/${post.slug}`, // 예: /life/trip-recap
        lastModified: new Date(post.sub || new Date()), 
        changeFrequency: 'daily',
        priority: 0.7,
      })
    })
  }


  const bookRoutes: MetadataRoute.Sitemap = []
  if (books) {
    books.forEach((book) => {
      bookRoutes.push({
        url: `${baseUrl}/book/${book.slug}`,
        lastModified: new Date(book.readDate || book.startDate || new Date()), 
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  }

  // ✨ 5. Log 동적 페이지 추가
  const logRoutes: MetadataRoute.Sitemap = []
  if (LOG_POSTS) {
    LOG_POSTS.forEach((log) => {
      logRoutes.push({
        url: `${baseUrl}/log/${log.slug}`,
        lastModified: new Date(log.date || new Date()), 
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    })
  }

  // (Book이나 Log 데이터가 있다면 위와 똑같은 방식으로 추가해 주시면 됩니다!)

  // 4. 모든 라우트를 싹 다 합쳐서 리턴!
  return [
    ...staticRoutes, 
    ...favRoutes, 
    ...lifeRoutes, 
    ...bookRoutes, 
    ...logRoutes
  ]
}