import type { LogPost, LifePost, WishItem, ArchiveItem } from '@/types'

// ── LOG ───────────────────────────────────────────────
export const LOG_POSTS: LogPost[] = [
  {
    id: '1',
    category: 'Design',
    title: '제작기 #1',
    excerpt: '자유도와 안정성을 동시에 잡는 방법: 샐러드게임 DSL을 소개합니다. 컴포넌트 시스템 설계부터 토큰 관리까지 전반적인 내용을 다룹니다.',
    date: '2025-12-01',
    tags: ['#추천', '#DSL'],
    content: `
## 들어가며
디자인 시스템을 만들면서 가장 어려웠던 점은 자유도와 안정성의 균형이었습니다.

## 본론
샐러드게임 DSL은 이 문제를 해결하기 위해 고안된 방법론입니다.

### 핵심 개념
1. 토큰 레이어 분리
2. 컴포넌트 합성 패턴
3. 변형 제약 시스템

## 마무리
이 방법론을 도입한 후 디자인-개발 협업 속도가 눈에 띄게 향상되었습니다.
    `,
  },
  {
    id: '2',
    category: 'Design',
    title: 'SmileMe (이모티콘 제작 플랫폼)',
    excerpt: '자유도와 안정성을 동시에 잡는 방법: 샐러드게임 DSL을 소개합니다. 뷰티카메라 SDK와 AI 감정분석 기술을 활용한 차별화된 UX 구현.',
    date: '2025-11-15',
    tags: ['#추천', '#UX'],
    content: `## SmileMe 프로젝트 소개\n\n이모티콘 제작 플랫폼 SmileMe의 UX 설계 과정을 공유합니다.\n\n## 핵심 기능\n\n- AI 감정 분석\n- 실시간 프리뷰\n- 원클릭 배포`,
  },
  {
    id: '3',
    category: 'Tech',
    title: 'Next.js App Router 마이그레이션 후기',
    excerpt: 'Pages Router에서 App Router로 전환하면서 겪은 것들. RSC, 스트리밍, 레이아웃 중첩 패턴 정리.',
    date: '2025-11-01',
    tags: ['#Tech', '#Next.js'],
    content: `## 마이그레이션 배경\n\nPages Router의 한계를 느끼고 App Router로 전환을 결정했습니다.\n\n## 주요 변경점\n\n- 레이아웃 중첩\n- 서버 컴포넌트 활용\n- 스트리밍 렌더링`,
  },
  {
    id: '4',
    category: 'Study',
    title: '타입스크립트 타입 체조 입문',
    excerpt: '조건부 타입, infer, 템플릿 리터럴 타입으로 유틸리티 타입 직접 만들어보기.',
    date: '2025-10-20',
    tags: ['#Study', '#TypeScript'],
    content: `## 타입 체조란?\n\n복잡한 타입 연산을 통해 TypeScript의 타입 시스템을 극한까지 활용하는 기법입니다.\n\n## 기초 예제\n\n\`\`\`ts\ntype MyReadonly<T> = { readonly [K in keyof T]: T[K] }\n\`\`\``,
  },
  {
    id: '5',
    category: 'Product',
    title: '사이드 프로젝트 회고',
    excerpt: '6개월 간의 사이드 프로젝트를 마무리하면서 느낀 것들. 기술 선택, 일정 관리, 런칭까지.',
    date: '2025-10-05',
    tags: ['#회고', '#Product'],
    content: `## 프로젝트 개요\n\n6개월간 혼자 진행한 사이드 프로젝트의 회고입니다.\n\n## 잘한 점\n\n- 초기에 MVP 범위를 확실히 정한 것\n- 주 1회 회고 진행\n\n## 아쉬운 점\n\n- 마케팅 계획 부재\n- 디자인에 너무 많은 시간 투자`,
  },
  {
    id: '6',
    category: 'Design',
    title: '디자인 시스템 구축기',
    excerpt: 'Figma Variables와 코드 토큰을 싱크 맞추는 방법. 실제 프로덕션에서 적용한 방법론.',
    date: '2025-09-18',
    tags: ['#Design', '#System'],
    content: `## 배경\n\nFigma와 코드 사이의 싱크 문제를 해결하기 위해 디자인 토큰 시스템을 구축했습니다.`,
  },
  {
    id: '7',
    category: 'Tech',
    title: 'Framer Motion 애니메이션 패턴',
    excerpt: '페이지 전환, stagger, 제스처 기반 인터랙션 패턴 모음.',
    date: '2025-09-01',
    tags: ['#Tech', '#Animation'],
    content: `## 패턴 모음\n\nFramer Motion을 활용한 다양한 애니메이션 패턴을 정리했습니다.`,
  },
]

// ── LIFE ──────────────────────────────────────────────
export const LIFE_POSTS: LifePost[] = [
  { id: '1', category: 'Travel', sub: '2025-12-12', title: '여행갔다왔당', tags: ['UI', 'UI UX'], content: '여행 좋아용. 이번 여행은 정말 좋았다. 날씨도 좋고 음식도 맛있었다.' },
  { id: '2', category: 'Diary', sub: '2025-12-01', title: '오늘의 끄적임', tags: ['일상'], content: '오늘은 날씨가 정말 좋았다. 카페에서 작업하다가 산책도 했다.' },
  { id: '3', category: 'Hot spot', sub: '2025-11-20', title: '요즘 자주 가는 카페', tags: ['카페', 'Hot spot'], content: '성수동에 새로 생긴 카페. 분위기가 너무 좋아서 자주 가게 됐다.' },
  { id: '4', category: 'Travel', sub: '2025-11-05', title: '제주 2박 3일', tags: ['Travel', '제주'], content: '바람이 많이 불었지만 그래서 더 좋았다. 흑돼지도 먹고 한라봉도 먹고.' },
  { id: '5', category: 'Diary', sub: '2025-10-28', title: '프로젝트 마무리', tags: ['일상', '작업'], content: '드디어 끝냈다. 6개월 만에 런칭. 뿌듯하다.' },
  { id: '6', category: 'Hot spot', sub: '2025-10-15', title: '숨은 맛집 발견', tags: ['맛집', 'Hot spot'], content: '우연히 지나가다 발견한 곳. 줄이 길었지만 기다릴 만했다.' },
  { id: '7', category: 'Travel', sub: '2025-09-30', title: '부산 당일치기', tags: ['Travel', '부산'], content: 'KTX 타고 갔다왔다. 광안리에서 맥주 한 캔.' },
  { id: '8', category: 'Diary', sub: '2025-09-10', title: '가을이 왔다', tags: ['일상', '가을'], content: '날이 선선해졌다. 좋아하는 계절이 왔다.' },
  { id: '9', category: 'Hot spot', sub: '2025-08-22', title: '한남동 팝업', tags: ['팝업', '한남'], content: '줄이 엄청 길었다. 2시간 기다렸는데 가치 있었다.' },
  { id: '10', category: 'Travel', sub: '2025-08-10', title: '강릉 짧은 여행', tags: ['Travel', '강릉'], content: '바다가 보고 싶어서 갑자기 갔다. 커피거리에서 커피 한 잔.' },
  { id: '11', category: 'Diary', sub: '2025-07-25', title: '여름 작업 일기', tags: ['일상', '여름'], content: '더운 여름엔 카페에서 작업하는 게 최고다.' },
  { id: '12', category: 'Hot spot', sub: '2025-07-01', title: '새로 생긴 서점', tags: ['서점', '책'], content: '독립서점이 동네에 생겼다. 분위기가 너무 좋다.' },
]

// ── WISH ──────────────────────────────────────────────
export const WISH_ITEMS: WishItem[] = [
  { id: '1', title: '낼나샵 - 뽀모도로', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://cdn.imweb.me/thumbnail/20250509/c8aa18c78bfaa.jpg', price: 35000, link: 'https://nelna.shop', reason: 'ADHD', isGot: false },
  { id: '2', title: '누하 서울 - Eyelet Laptop Pouch', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://cdn.imweb.me/thumbnail/20250417/caf901107c7e8.jpg', price: 69000, link: 'https://noohaseoul.com', reason: '발레코어 못참G', isGot: false },
  { id: '3', title: '그랑핸드 - Susie Salmon Multi Perfume', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://granhand.com/web/product/big/202510/d1500f411f5be071be1d323e0f05457a.jpg', price: 35000, link: 'https://granhand.com', reason: '이거 필수 향수잔아.', isGot: false },
  { id: '4', title: '머지 - Foldy Wallet(Silent Dot)', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://heymerge.com/web/product/big/202512/3fc0e0c866442f357a43f41bdd035af6.png', price: 89000, link: 'https://heymerge.com', reason: '애플워치를 더욱 세련되게', isGot: false },
  { id: '5', title: '딥디크 - 플레르 드 뽀 오 드 퍼퓸', category: 'COSMETICS', categoryLabel: 'COSMETICS', imageUrl: 'https://www.wishbucket.io/_next/image?url=https%3A%2F%2Fd2gfz7wkiigkmv.cloudfront.net%2Fpickin%2F2%2F1%2F2%2FNqcj83jFRU-GyTIyhS-VaQ&w=1080&q=75', price: 230000, link: 'https://perfumegraphy.com', reason: '딥디크는 기본 향수 소양이야', isGot: false },
  { id: '6', title: '바이레도 - 모하비고스트', category: 'COSMETICS', categoryLabel: 'COSMETICS', imageUrl: 'https://ecimg.cafe24img.com/pg139b23311640016/dearmytaste/web/product/big/20220725/73c06054d10e1f7802d6428adeebab15.jpg', price: 230000, link: 'https://perfumegraphy.com', reason: '나쁘지않았던거같애 시향했을때는', isGot: false },
  { id: '7', title: '팀디바이더 - M-4', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://teamdivider.kr/wp-content/uploads/2024/04/4EA_Front_G1-1-uai-1000x1000.jpg', price: 14000, link: 'https://teamdivider.kr', reason: "그냥 '느껴'", isGot: true },
  { id: '8', title: '로프리 - 플로우2', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://image.auction.co.kr/origin/54/2f/11/542f114b56.jpg', price: 170000, link: 'https://prod.danawa.com', reason: '진짜 화이트 너무 이뻐', isGot: false },
  { id: '9', title: '로지텍 - MX master 4(그래파이트)', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://resource.logitech.com/w_544,h_466,ar_7:6,c_pad,q_auto,f_auto,dpr_2.0/d_transparent.gif/content/dam/logitech/en/products/mice/mx-master-4/gallery/mx-master-4-graphite-top-angle-gallery-1.png', price: 170000, link: 'https://www.logitech.com', reason: '작업 환경에서는 이 마우스만한게 없다', isGot: false },
  { id: '10', title: '보스 - 울트라', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://m.thegrabsound.com/web/product/big/202409/82d53d0735e3f8b089c6d5de0553935e.jpg', price: 490000, link: 'https://www.bose.co.kr', reason: '헤드폰 갖고싶다', isGot: false },
  { id: '11', title: '소도시 - BLUE STRIPE SHIRTS POUCH M', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://contents.sixshop.com/thumbnails/uploadedFiles/39371/product/image_1764256229923_750.png', price: 39000, link: 'https://www.sodoci.co.kr', reason: '셔츠 파우치라니 내 깔', isGot: false },
  { id: '12', title: '아이패드 프로 13인치 M5', category: 'GOODS', categoryLabel: 'GOODS', imageUrl: 'https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/ipad-pro-finish-unselect-gallery-1-202405?wid=5120&hei=2880&fmt=webp&qlt=90', price: 2100000, link: 'https://www.apple.com/kr', reason: '귀엽고 도트이거 못참쥐', isGot: false },
]

// ── ARCHIVE ───────────────────────────────────────────
export const ARCHIVE_ITEMS: ArchiveItem[] = [
  { id: '1', tab: 'site', category: '디자인 토큰', name: '당근 디자인 토큰 사이트', url: 'https://seed-design.io', desc: '당근마켓 디자인 시스템 토큰 사이트', favicon: 'https://seed-design.io/favicon.ico', preview: '' },
  { id: '2', tab: 'site', category: '디자인', name: 'Refactoring UI', url: 'https://www.refactoringui.com', desc: 'UI 개선 레퍼런스 모음', favicon: '', preview: '' },
  { id: '3', tab: 'site', category: '에이전시 사이트', name: 'Locomotive', url: 'https://locomotive.ca', desc: '캐나다 크리에이티브 에이전시', favicon: '', preview: '' },
  { id: '4', tab: 'site', category: '디자인', name: 'Dribbble', url: 'https://dribbble.com', desc: '디자인 포트폴리오 커뮤니티', favicon: 'https://cdn.dribbble.com/assets/favicon-b38525134603b9513174ec887944bde1a869eb6cd414f4d640ee48ab2a15a26b.ico', preview: '' },
  { id: '5', tab: 'site', category: '디자인', name: 'Awwwards', url: 'https://www.awwwards.com', desc: '웹 디자인 어워드', favicon: 'https://www.awwwards.com/favicon.ico', preview: '' },
  { id: '6', tab: 'article', category: '디자인', name: '디자인 시스템의 미래', url: '#', desc: '컴포넌트에서 토큰으로의 전환', favicon: '', preview: '' },
  { id: '7', tab: 'article', category: '디자인 토큰', name: 'CSS Variables 완벽 가이드', url: '#', desc: '실무에서 바로 쓰는 방법', favicon: '', preview: '' },
  { id: '8', tab: 'article', category: '디자인', name: 'Figma Variables로 토큰 관리하기', url: '#', desc: 'Figma와 코드 사이의 싱크 맞추기', favicon: '', preview: '' },
]
