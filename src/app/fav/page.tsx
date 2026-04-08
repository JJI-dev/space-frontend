'use client'

import Link from 'next/link'
import Footer from '@/components/layout/Footer'
// import SearchIcon from '@/components/ui/SearchIcon'
import styles from './fav.module.css'

const FAV_CATEGORIES = {
  Game: [
    { name: '엘소드', slug: 'elsword', active: true },
    { name: '이터널리턴', slug: 'iri', active: true },
    { name: '스타레일', slug: 'starrail', active: true },
    { name: '메이플', slug: 'maple', active: true },
    { name: '던전앤파이터', slug: 'dnf', active: false },
    { name: '로스트아크', slug: 'loa', active: false },
    { name: '원신', slug: 'genshin', active: false },
    { name: '포켓몬', slug: 'pokemon', active: false },
    { name: '리그오브레전드', slug: 'lol', active: false },
    { name: '발로란트', slug: 'valorant', active: false },
    { name: '오버워치', slug: 'overwatch', active: false },
    { name: '배틀그라운드', slug: 'battleground', active: false },
    { name: '명일방주:엔드필드', slug: 'endfield', active: false },
    { name: '페이트그랜드오더', slug: 'fgo', active: false },
    { name: 'etc.', slug: 'game_etc', active: false },
  ],
  Animation: [
    { name: '페스페', slug: 'fsf', active: true },
    { name: '리제로', slug: 'rezero', active: true },
    { name: '흑집사', slug: 'blackbutler', active: false },
    { name: '마기', slug: 'magi', active: false },
    { name: '하나코군', slug: 'hanako', active: false },
    { name: '약사의 혼잣말', slug: 'apothecary', active: false },
    { name: '에이티식스', slug: '86', active: false },
    { name: '이누야샤', slug: 'inuyasha', active: false },
    { name: '페어리테일', slug: 'fairytail', active: false },
    { name: 'etc.', slug: 'ani_etc', active: false },
  ],
  Webtoon: [
    { name: '쿠베라', slug: 'kubera', active: true },
    { name: '로판', slug: 'ropan', active: false },
    { name: 'etc.', slug: 'webtoon_etc', active: false },
  ],
}

export default function FavMainPage() {
  return (
    <>
      <div className="page-enter">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Fav</h1>
          {/* <SearchIcon /> */}
        </div>

        <div className={styles.container}>
          <div>
            <div className={styles.introBox}>
              <p>모든 장르를 사랑합니다. 영업해주신다면 츄라이하겠습니다.</p>
              <p>저 사실 왼/른 가리지도 않고 다 먹어요... 진짜..</p>
              <p>연성 다 품어드릴 수 있습니다.</p>
              <p>주접하시는 내용도? 다 귀담아듣겠습니다.</p>
              <p>지뢰도 없습니다</p>
              <br />
              <p>장르 클릭하시면 내용 확인하실 수 있어요</p>
              <p>이세계 스마트폰 이런거 안받습니다 똥중에 탑티어</p>
              
            </div>
            
            <Link href="/fav/ask" className={styles.askLink}>
              리퀘박스 💌
            </Link>

            <div className="!mt-5">
              <Link href="https://x.com/Ram_jjine" className={styles.askLink2}>
                낙서, 사담 🗣️
              </Link> 
              <Link href="http://x.com/Jine_Nim" className={styles.askLink2}>
                쿠베라계 🍛
              </Link>
              <Link href="https://x.com/GOOGI_Nim" className={styles.askLink2}>
                페스페계 🏆
              </Link>
            </div>
            
            <div className='flex !mt-5'>
              <Link href="https://x.com/jji__ne" className={styles.askLink3}>
              ne 창작계 🎨
              </Link>
              <Link href="https://x.com/jji__mo" className={styles.askLink4}>
              mo 작업계 🎧
              </Link>
            </div>
            
           
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