import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { books } from '@/lib/data/book' 
import BookDetailClient from './BookDetailClient'
import styles from './detail.module.css'

export default async function BookDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const book = books.find(p => p.id === resolvedParams.id)
  
  if (!book) return <div>404 Not Found</div>

  const fileName = book.id;
  const filePath = path.join(process.cwd(), 'content/book', `${fileName}.mdx`);
  
  let fileContent = '';
  try {
    fileContent = fs.readFileSync(filePath, 'utf8');
  } catch(e) { 
    const currentId = book ? book.id : '알수없음';
    return (
      <div className={`page-enter ${styles.notFound}`}>
        <div className={styles.iconWrap}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <h2 className={styles.notFoundTitle}>앗! 아직 파일이 없어요.</h2>
        <p className={styles.notFoundDesc}>
          열심히 작성 중이거나 경로가 잘못된 것 같아요.<br />
          <code className={styles.code}>content/book/{currentId}.mdx</code>
        </p>
        <Link href="/book" className={styles.backBtn}>목록으로 돌아가기</Link>
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
    <BookDetailClient book={book} allBooks={books}>
      <MDXRemote source={content} components={components} />
    </BookDetailClient>
  )
}