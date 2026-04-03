'use client'

import { useState } from 'react'
import Link from 'next/link'
import { books } from '@/lib/data/book'
import { BookCategory, BookType } from '@/types'
import Footer from '@/components/layout/Footer'
import styles from './list.module.css'

const CATEGORIES: BookCategory[] = ['All', '기술', '디자인', '기획', '문학', '소설', '자기계발']

export default function BookListClient() {
  const [activeCategory, setActiveCategory] = useState<BookCategory>('All')
  const [activeType, setActiveType] = useState<BookType>('리뷰')

  const filteredBooks = books.filter(book => {
    const matchCategory = activeCategory === 'All' || book.category === activeCategory;
    const matchType = book.type === activeType;
    return matchCategory && matchType;
  })

  return (
    <>
      <div className="page-enter">
        <div className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>Book</h1>
        </div>

        <div className={`${styles.layout} reveal reveal-delay-1`}>
          {/* Sidebar */}
          <aside className={`${styles.sidebar} no-scrollbar`}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`${styles.catBtn} ${activeCategory === c ? styles.active : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </aside>

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.tabs}>
              {(['리뷰', '위시'] as BookType[]).map(t => (
                <button
                  key={t}
                  className={`${styles.tab} ${activeType === t ? styles.tabActive : ''}`}
                  onClick={() => setActiveType(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className={styles.grid}>
              {filteredBooks.map(book => (
                <Link href={`/book/${book.id}`} key={book.id} className={styles.card}>
                  <div className={styles.coverWrap}>
                    <img src={book.coverUrl} alt={book.title} className={styles.cover} />
                  </div>
                  <h3 className={styles.bookTitle}>{book.title}</h3>
                  <p className={styles.bookAuthor}>{book.author}</p>
                  <span className={styles.bookCat}>#{book.category}</span>
                </Link>
              ))}
              {filteredBooks.length === 0 && (
                <div className={styles.empty}>아직 등록된 {activeType}가 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}