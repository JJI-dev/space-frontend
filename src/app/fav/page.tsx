'use client'

import Link from 'next/link'
import Footer from '@/components/layout/Footer'
import styles from './fav.module.css'

const FAV_CATEGORIES = {
  Game: [
    { name: '이리', slug: 'iri', active: true },
    { name: '엘소드', slug: 'elsword', active: false },
    { name: '스타레일', slug: 'starrail', active: false },
    { name: '메이플', slug: 'maple', active: false },
    { name: '던파', slug: 'dnf', active: false },
    { name: '로아', slug: 'loa', active: false },
    { name: '원신', slug: 'genshin', active: false },
    { name: '포켓몬', slug: 'pokemon', active: false },
  ],
  Animation: [
    { name: '페스페', slug: 'fsf', active: false },
    { name: '리제로', slug: 'rezero', active: false },
    { name: '흑집사', slug: 'blackbutler', active: false },
    { name: '마기', slug: 'magi', active: false },
    { name: '하나코군', slug: 'hanako', active: false },
    { name: '약사의 혼잣말', slug: 'apothecary', active: false },
    { name: '에이티식스', slug: '86', active: false },
    { name: '이누야샤', slug: 'inuyasha', active: false },
  ],
  Webtoon: [
    { name: '쿠베라', slug: 'kubera', active: false },
    { name: '로판', slug: 'ropan', active: false },
  ],
}

export default function FavMainPage() {
  return (
    <>
      <div className="page-enter">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Fav</h1>
        </div>

        <div className={styles.container}>
          <div className={styles.introBox}>
            <p>모든 장르를 사랑합니다. 영업해주신다면 츄라이하겠습니다.</p>
            <p>저 사실 왼/른 가리지도 않고 다 먹어요... 진짜..</p>
            <p>연성 다 품어드릴 수 있습니다.</p>
            <p>주접하시는 내용도? 다 귀담아듣겠습니다.</p>
            <p>지뢰도 없습니다</p>
            <br />
            <p>장르 클릭하시면 내용 확인하실 수 있어요</p>
          </div>

          <div className={styles.navGrid}>
            {Object.entries(FAV_CATEGORIES).map(([category, items]) => (
              <div key={category} className={styles.navColumn}>
                <h2 className={styles.navTitle}>{category}</h2>
                <ul className={styles.navList}>
                  {items.map(item => (
                    <li key={item.name}>
                      {item.active ? (
                        <Link href={`/fav/${item.slug}`} className={styles.navLinkActive}>
                          {item.name}
                        </Link>
                      ) : (
                        <span className={styles.navLinkDisabled}>{item.name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}