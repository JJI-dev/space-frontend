import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// content 폴더의 절대 경로를 잡습니다.
const rootDirectory = path.join(process.cwd(), 'content')

// 단일 포스트를 읽어오는 함수
export const getPostBySlug = (folder: string, slug: string) => {
  const filePath = path.join(rootDirectory, folder, `${slug}.mdx`)
  
  // 파일이 없으면 null 반환
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)

  return {
    meta: { ...data, slug } as any, // 기존 LogPost 타입에 맞춰도 좋습니다.
    content,
  }
}

// 특정 폴더(예: log)의 모든 포스트 목록을 가져오는 함수 (목록 페이지용)
export const getAllPosts = (folder: string) => {
  const folderPath = path.join(rootDirectory, folder)
  
  if (!fs.existsSync(folderPath)) return []

  const files = fs.readdirSync(folderPath)

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const { meta } = getPostBySlug(folder, slug)!
      return meta
    })
    // 날짜 최신순 정렬
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}   