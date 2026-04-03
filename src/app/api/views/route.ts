import { kv } from '@vercel/kv'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { type, id, increment } = await request.json()
    
    if (!type || !id) {
      return NextResponse.json({ error: 'Type and ID are required' }, { status: 400 })
    }

    // DB에 저장될 키 이름 (예: views_log_1)
    const key = `views_${type}_${id}`

    let views = 0

    if (increment) {
      // increment가 true면 DB의 숫자를 1 올리고 반환
      views = await kv.incr(key)
    } else {
      // increment가 false면 숫자만 조회해서 반환
      views = (await kv.get<number>(key)) || 0
    }

    return NextResponse.json({ views })
  } catch (error) {
    console.error('KV error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}