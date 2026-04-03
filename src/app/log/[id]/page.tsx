import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { LOG_POSTS } from '@/lib/data/index' 
import LogDetailClient from './LogDetailClient'
import styles from './detail.module.css'

export default async function LogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
 //기존 데이터에서 메타데이터(제목, 날짜, 썸네일 등) 가져오기
  const post = LOG_POSTS.find(p => p.id === resolvedParams.id)
  
  if (!post) return <div>404 Not Found</div>

 
  const fileName = post.id;
  const filePath = path.join(process.cwd(), 'content/log', `${fileName}.mdx`);
  
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch(e) { 
    // Log 페이지에서는 id 변수명에 따라 post.id 혹은 resolvedParams.id 를 사용합니다.
    const currentId = post ? post.id : '알수없음';

    return (
      <div className="page-enter" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '0 var(--px)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h2 style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.04em', marginBottom: '12px', color: 'var(--black)' }}>
          앗! 아직 파일이 없어요.
        </h2>
        <p style={{ color: 'var(--gray-400)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>
          열심히 작성 중이거나 경로가 잘못된 것 같아요.<br />
          <code style={{ fontSize: '12px', background: 'var(--gray-100)', padding: '4px 8px', borderRadius: '6px', marginTop: '12px', display: 'inline-block', color: 'var(--gray-600)' }}>
            content/log/{currentId}.mdx
          </code>
        </p>
        
        {/* ✨ 주소가 /log 로 수정되었습니다! */}
        <Link href="/log" className={styles.backBtn}>
          목록으로 돌아가기
        </Link>
      </div>
    ) 
  }
  
  const { content } = matter(fileContent)
  const components = {
    h2: (props: any) => <h2 className={`${styles.h2} ${styles.revealOnScroll}`} {...props} />,
    h3: (props: any) => <h3 className={`${styles.h3} ${styles.revealOnScroll}`} {...props} />,
    p: (props: any) => <p className={`${styles.p} ${styles.revealOnScroll}`} {...props} />,
    ol: (props: any) => <ol className={`${styles.ol} ${styles.revealOnScroll}`} {...props} />,
    pre: (props: any) => <pre className={`${styles.codeBlock} ${styles.revealOnScroll}`} {...props} />,
  }

  return (
    <LogDetailClient post={post} allPosts={LOG_POSTS}>
      <MDXRemote source={content} components={components} />
    </LogDetailClient>
  )
}