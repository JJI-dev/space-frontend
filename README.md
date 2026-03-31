# space.jji.kr

개인 공간 — Log, Life, Wish, Archive, Token

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **Animation**: CSS + Framer Motion (WishModal)
- **Font**: Pretendard (CDN)

## 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx          # Home (메인 로고 + site 모달)
│   ├── log/              # 로그 목록 + 상세
│   ├── life/             # 라이프 목록(무한스크롤) + 상세
│   ├── wish/             # 위시리스트 (슬라이드 모달)
│   ├── archive/          # 북마크 (사이트/아티클, hover preview)
│   └── token/            # 디자인 토큰 문서
├── components/
│   ├── layout/
│   │   ├── Header.tsx    # 네비게이션 + 모바일 메뉴
│   │   └── Footer.tsx    # 3-zone 푸터 (wordmark clip)
│   └── ui/
│       ├── CursorAnimation.tsx   # 커스텀 커서
│       ├── SiteModal.tsx         # Site 버튼 모달
│       ├── Spotlight.tsx         # ⌘K 검색
│       ├── SearchIcon.tsx        # 검색 아이콘 버튼
│       └── RevealOnScroll.tsx    # Intersection Observer reveal
├── lib/
│   └── data.ts           # 모든 mock 데이터
└── types/
    └── index.ts          # 공유 타입 정의
```

## 시작하기

```bash
npm install
npm run dev
```

## 디자인 토큰

NE/JJI 라이트 테마 기반. 주요 토큰:

| Token | Value |
|-------|-------|
| `--accent` | `#FB4C4C` |
| `--px` | `clamp(24px, 4vw, 48px)` |
| `--tracking` | `-0.04em` |
| `--header-h` | `80px` |

## 페이지별 특징

- **Home**: 메인 로고 클릭 시 #FB4C4C 전환, `site` 버튼으로 모달 열기
- **Log**: 5개 페이지네이션, 스크롤 시 썸네일 축소 애니메이션
- **Life**: 무한 스크롤 (IntersectionObserver), 마소너리 그리드
- **Wish**: 사이드바 카테고리, 슬라이드인 상세 모달
- **Archive**: 사이트/아티클 탭, hover 미리보기 툴팁
- **Token**: seed-design.io 스타일 사이드 네비게이션
