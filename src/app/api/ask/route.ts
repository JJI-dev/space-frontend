import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

// JJine님 전용 마스터 비밀번호
const MASTER_PASSWORD = 'jjipwmaster0321345lam_2'; 

/** * 1. 테이블 생성 및 데이터 불러오기 (GET) 
 */
export async function GET() {
  try {
    // ✨ 마법의 한 줄: 테이블이 없으면 자동으로 만듭니다 (id, 내용, 비번, 날짜)
    await sql`
      CREATE TABLE IF NOT EXISTS asks (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        password TEXT NOT NULL,
        date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 최신순으로 50개 가져오기
    const { rows } = await sql`SELECT * FROM asks ORDER BY date DESC LIMIT 50`;
    return NextResponse.json(rows);
  } catch (error) {
    console.error('DB GET 에러:', error);
    return NextResponse.json([], { status: 500 });
  }
}

/** * 2. 메시지 저장하기 (POST) 
 */
export async function POST(req: Request) {
  try {
    const { content, password } = await req.json();
    if (!content) return NextResponse.json({ error: '내용 없음' }, { status: 400 });

    // DB에 데이터 삽입 (INSERT)
    const result = await sql`
      INSERT INTO asks (content, password)
      VALUES (${content}, ${password || '0000'})
      RETURNING id
    `;

    return NextResponse.json({ success: true, id: result.rows[0].id });
  } catch (error) {
    console.error('DB POST 에러:', error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
}

/** * 3. 메시지 삭제하기 (DELETE) 
 */
export async function DELETE(req: Request) {
  try {
    const { id, password } = await req.json();

    // ID로 해당 글 찾기
    const { rows } = await sql`SELECT * FROM asks WHERE id = ${id}`;
    const target = rows[0];

    if (!target) return NextResponse.json({ error: '글 없음' }, { status: 404 });

    // 비번 체크 (글 비번 OR 마스터 비번)
    if (target.password === password || password === MASTER_PASSWORD) {
      await sql`DELETE FROM asks WHERE id = ${id}`;
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: '비밀번호 불일치' }, { status: 403 });
    }
  } catch (error) {
    console.error('DB DELETE 에러:', error);
    return NextResponse.json({ error: '서버 에러' }, { status: 500 });
  }
}