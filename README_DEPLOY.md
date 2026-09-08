# Shrike Tycoon Prototype 0.5.2 — Web Deploy

- `index.html + app.js + styles.css + assets/cover.png`: GitHub Pages / Netlify / Vercel 정적 배포용
- `shrike-tycoon-0.5-single.html`: 서버 없이 더블클릭 실행용 (표지 이미지는 data URI로 내장)


## Mobile / PWA
이 폴더 전체를 HTTPS 정적 호스팅에 올리면 manifest와 service worker가 함께 동작합니다. Chrome/Edge 계열에서는 조건이 충족되면 게임 내 `📲 앱 설치` 버튼이 나타날 수 있습니다. iOS Safari에서는 공유 메뉴 → `홈 화면에 추가`를 사용하세요. `shrike-tycoon-0.5.2-single.html`은 서버 없이 테스트하는 독립형 파일이며 PWA 설치/오프라인 캐시는 정적 배포판에서만 지원됩니다.

## Prototype 0.5.2
PWA manifest의 기본 방향은 `landscape`입니다. 모바일에서 홈 화면에 설치하면 가로화면 중심으로 실행됩니다. 브라우저 직접 접속에서도 게임 시작 시 가능한 경우 fullscreen/landscape lock을 시도합니다.
