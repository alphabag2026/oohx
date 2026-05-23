# OohX Landing Page TODO

## 완료된 작업

- [x] OohX 랜딩 페이지 기본 디자인 (딥 레드/다크 톤)
- [x] 크리에이터 프로필 갤러리 섹션 (4명: Luna, Alex, Sophia, James)
- [x] 토큰 연계 섹션 (지갑 연결 버튼)
- [x] Xplay AI 크레딧 표시 (푸터)
- [x] OohX 로고 CDN 업로드 및 적용
- [x] web-db-user 기능 업그레이드 (tRPC + Manus Auth + Database)
- [x] Home.tsx 복원 및 useAuth 훅 통합
- [x] 네비게이션에 로그인/로그아웃 버튼 추가
- [x] 인증 상태에 따른 CTA 버튼 변경 (로그인 전/후)
- [x] 크리에이터 상세 페이지 생성 (/creator/:id)
- [x] App.tsx에 크리에이터 상세 라우트 추가
- [x] drizzle/schema.ts에 creators 테이블 추가
- [x] DB 마이그레이션 실행 (pnpm db:push)
- [x] server/db.ts에 creators 쿼리 헬퍼 추가
- [x] server/routers.ts에 creators tRPC 라우터 추가
- [x] vitest 테스트 작성 및 통과 (4/4)
- [x] dark 테마 설정 (App.tsx ThemeProvider)

## 남은 작업

- [x] AWS 서버 재배포 (oohx.ai 도메인)
- [ ] Let's Encrypt SSL 인증서 발급 (DNS 전파 완료 후)
- [ ] 결제 시스템 연동 (추후 진행)
- [ ] 크리에이터 어드민 관리 페이지
- [ ] 실제 채팅 기능 연동 (AI 모델 서버)

## Promptchan API 연동

- [x] PROMPTCHAN_API_KEY 환경변수 설정
- [x] 백엔드 tRPC 라우터에 AI 이미지 생성 API 추가
- [x] 프론트엔드 AI 이미지 생성 페이지 구현 (/ai-generate)
- [x] AWS 서버 배포
- [x] GitHub 업로드
