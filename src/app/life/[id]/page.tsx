import { LIFE_POSTS } from '@/lib/data'
import { notFound } from 'next/navigation'
import LifeDetailClient from './LifeDetailClient'

export function generateStaticParams() {
  return LIFE_POSTS.map(p => ({ id: p.id }))
}

export default async function LifeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = LIFE_POSTS.find(p => p.id === id)
  if (!post) notFound()
  return <LifeDetailClient post={post} allPosts={LIFE_POSTS} />
}
