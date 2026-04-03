'use client'

import { useState } from 'react'
import { WISH_ITEMS } from '@/lib/data/index'
import type { WishCategory } from '@/types'
// import SearchIcon from '@/components/ui/SearchIcon'
import WishModal from './WishModal'
import Footer from '@/components/layout/Footer'
import styles from './wish.module.css'
import type { WishItem } from '@/types'

const CATEGORIES: WishCategory[] = ['All', 'GOODS', 'CLOTHES', 'COSMETICS']

export default function WishPage() {
  const [cat,      setCat]      = useState<WishCategory>('All')
  const [selected, setSelected] = useState<WishItem | null>(null)

  const filtered = (cat === 'All' ? WISH_ITEMS : WISH_ITEMS.filter(w => w.category === cat))
    .sort((a, b) => Number(a.isGot) - Number(b.isGot))

  return (
    <>
      <div className="page-enter">
        {/* Page header */}
        <div className={`${styles.pageHeader} reveal`}>
          <h1 className={styles.pageTitle}>Wish</h1>
          {/* <SearchIcon /> */}
        </div>

        <div className={styles.layout}>
          {/* Sidebar categories */}
          <aside className={`${styles.sidebar} no-scrollbar`}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`${styles.catBtn} ${cat === c ? styles.active : ''}`}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </aside>

          {/* Grid */}
          <div className={styles.gridWrap}>
            <div className={styles.grid}>
              {filtered.map(item => (
                <button
                  key={item.id}
                  className={styles.item}
                  onClick={() => setSelected(item)}
                >
                  <div className={styles.itemImg}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      onError={e => ((e.target as HTMLImageElement).style.display = 'none')}
                    />
                  </div>
                  <div className={styles.itemBody}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    <p className={styles.itemCat}>{item.categoryLabel}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <WishModal item={selected} onClose={() => setSelected(null)} />
      )}
      <Footer />
    </>
  )
}
