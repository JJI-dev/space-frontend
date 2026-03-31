import { LOG_POSTS } from '@/lib/data'
import { notFound } from 'next/navigation'
import LogDetailClient from './LogDetailClient'

export function generateStaticParams() {
  return LOG_POSTS.map(p => ({ id: p.id }))
}

export default async function LogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = LOG_POSTS.find(p => p.id === id)
  if (!post) notFound()
  return <LogDetailClient post={post} allPosts={LOG_POSTS} />
}
