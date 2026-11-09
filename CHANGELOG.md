# 0.9.3

- 모바일 작업대 압축, 화구 3열·2행, 재료 트레이 축소, 실제 화면 높이와 안전 영역 대응.
- 작은 세로 화면의 준비 화면 개선. 저장 형식과 난이도 유지.

# 0.9.2

- 배경 확대 버튼 제거, 준비 이미지 화면 맞춤, 재료 최대 10종 스크롤 없는 트레이.
- 작은 가로 화면 화구 터치 영역 조정. 저장 형식 11 유지.

# 때까치 타이쿤 0.9.1

0.9.0 단계별 난이도를 유지하면서 비주얼·요리사 성장·아이템을 추가한 웹 배포본입니다.

## 화면 디자인

기존 Visual Style Guide v1.0의 크림 종이, 잎색, 꿀색, 복숭아색, 밝은 나무 팔레트를 반영했습니다. 월드 엽서·스테이지 카드·요리사 선택·주문표·조리대의 재질과 색상 구분을 강화했습니다. 기존 새와 월드 아트 파일은 그대로 보존했습니다.

- 준비 화면: 월드 전체 풍경 엽서, 요리사 초상, 훈련 레벨, 난이도·클리어 목표, 보유 아이템을 함께 표시합니다. 준비 화면에서 훈련·가방 메뉴를 열 수 있습니다.
- 플레이 화면: 잘리지 않은 전경 엽서와 크게 보기 버튼을 추가했습니다. 크게 보기에서는 전체 그림을 비율 유지로 표시하고, 영업 시간을 멈춥니다. 이미 일시정지 상태였다면 닫아도 일시정지를 유지합니다.
- 데스크톱에서는 손님을 가로로, 짧은 모바일 가로 화면에서는 주문·재료·화구를 각 스크롤 영역에 배치했습니다. 모바일 세로 플레이도 대응합니다. 작은 가로 화면의 셰프는 전경 옆에 표시합니다.
- 주문/화구 버튼을 매 프레임 교체하지 않고 재사용해 초점과 터치를 안정화했습니다. 식당 전체가 초점 이동으로 옆으로 밀리는 현상을 막았습니다. 불씨·부채에 의해 단축된 실제 남은 조리 시간이 화구에 표시됩니다.

## 요리사 훈련

해금한 요리사를 각각 Lv.1→5로 훈련합니다. 비용은 200 / 400 / 600 / 800 XP입니다. 종별 기존 고유 능력은 유지합니다.

| 훈련 레벨 | 조리 속도 | 서빙 점수 | 타기 전 여유 |
|---|---:|---:|---:|
| 1 | 기본 | 기본 | 기본 |
| 2 | +3% | +2% | +0.15초 |
| 3 | +6% | +4% | +0.30초 |
| 4 | +9% | +6% | +0.45초 |
| 5 | +12% | +8% | +0.60초 |

훈련은 로비에서만 가능하며 잠긴 요리사·XP 부족·최고 레벨·개발 모드에서는 구매되지 않습니다. 보너스는 선택한 요리사에만 적용됩니다.

## 여행 가방

| 아이템 | 가격 | 효과 | 제한 |
|---|---:|---|---|
| 손님 차 | 80 XP | 현재 손님의 대기 시간 +10초 | 영업당 1회, 최대 9개 보관 |
| 불씨 | 100 XP | 조리 중인 모든 꼬치 5초 단축 | 영업당 1회, 최대 9개 보관 |

신규 게임과 이전 저장 기록에 처음 적용할 때 하나씩 지급합니다. 불씨는 READY/탄 꼬치를 변경하지 않으며, 즉시 익은 꼬치는 사용 시점부터 READY 여유 시간이 시작됩니다. 사용할 대상이 없거나 일시정지·영업 종료·개발 모드이면 소비되지 않습니다. 구매/사용 기록을 저장하지 못하면 XP·재고·효과 모두 적용하지 않습니다. 사용한 아이템은 재도전하거나 중도 종료해도 복구되지 않습니다.

## 저장과 배포

저장 키는 유지하고 저장 형식을 10→11로 이전합니다. 기존 점수·별·단계·요리사 해금·식당 업그레이드·도감은 유지되며 훈련·아이템도 JSON 백업에 포함됩니다. 0.9.0 이전 백업을 가져올 수 있습니다. 새 백업은 이전 앱의 검증기가 지원하지 않으므로 0.9.1 이상에서 사용하세요.

업데이트 전 로비의 기록 백업으로 기존 JSON을 보관하세요. 전체 웹 ZIP을 기존 웹 폴더에 덮어쓰거나, 0.9.0 웹 배포 폴더에 전용 패치를 적용하면 됩니다. 동일한 주소·브라우저의 저장 기록은 이어집니다. 주소를 바꾸면 JSON 가져오기를 사용하세요. 서비스 워커 캐시는 0.9.1로 갱신했습니다.

이번 산출물은 데스크톱/모바일 공용 웹 배포본, 전체 소스, 0.9.0→0.9.1 웹 패치입니다. Windows 실행 파일 재빌드·Steam 업로드·호스팅 게시는 수행하지 않았습니다.

## 검수 범위

TypeScript 빌드/타입 검사, 게임 회귀 검사 32개와 백업/터치 검사 10개를 통과했습니다. 저장 실패 시 원자적 처리, 이전 기록 이전, 레벨별 효과, 아이템 구매/사용 제약, 백업 유효성, 난이도·단축키·실패 조건 등을 확인했습니다.

Chromium 133에서 1366×900, 1366×768, 1024×600, 844×390, 568×320, 390×844 화면을 검수했습니다. 마우스 클릭 또는 터치 에뮬레이션으로 훈련·구매·준비·조리·아이템 사용·서빙·풍경 보기/복귀를 수행했습니다. 주문 6개·화구 5개·재료 9종, 스크롤 끝 접근, 버튼 크기와 화면 경계도 검사했습니다.

브라우저 검수는 실행 환경 제약으로 HTML/CSS/JS와 이미지를 한 페이지에 내장하고 저장소·오디오·네트워크를 대체한 환경에서 수행했습니다. 검수용 이미지 사본만 축소했고 배포 원본 이미지는 변경하지 않았습니다. 실제 Windows 앱, iPhone Safari/Android 실기기, 오디오 재생, 네트워크·서비스 워커 오프라인 동작 및 장시간 체감 밸런스 검수는 별도로 필요합니다. QA_BROWSER_0.9.1.json에 화면별 검사 결과와 치수를 기록했습니다.


# 때까치 타이쿤 0.9.0 — 단계별 난이도

0.8.4.26을 기반으로 난이도 조절만 적용한 웹 배포본입니다.

| 단계 | 동시 주문 최대 | 기본 대기 시간 |
|---|---:|---:|
| 1–5 | 2개 | 78초 |
| 6–15 | 3개 | 78→72초 |
| 16–30 | 4개 | 72→66초 |
| 31–50 | 5개 | 66→60초 |
| 51–70 | 6개 | 60→57초 |
| 71–100 | 6개 | 57→54초 |

각 구간 내 대기 시간은 단계마다 선형 감소합니다. 주문 상한이 늘어나는 첫 단계에는 직전 단계의 기본 대기 시간을 유지합니다. 주문은 기존 간격으로 순차 등장하며, 러시·강제 생성·업그레이드도 단계별 상한을 초과하지 않습니다.

재료 3개부터 추가 재료마다 3초를 더합니다. 주문 도착 시 조리 속도가 기본보다 느리면 예상 추가 조리 시간만큼 보정하며, 최소한 예상 조리 시간 + 재료당 1.25초 + 12초를 보장합니다. 이 값에 업그레이드·요리사 효과를 적용하고 초 단위로 올림합니다. 이미 들어온 주문의 제한시간은 날씨 변화로 다시 계산하지 않습니다. 일시정지는 기존대로 시간을 멈춥니다.

나뭇가지 업그레이드는 단계별 주문 상한을 유지하기 위해 레벨당 대기 시간 +5%로 변경했습니다. 기존 구매 레벨은 보존합니다. 편안한 횃대의 레벨당 +4%와 별도로 곱해집니다.

클리어 목표 산정에 주문 상한에 따른 동시 조리 여력과 평균 손님 유입 간격을 반영했습니다. 요리사·부채·업그레이드 없이 계산한 기준이며, 실측 플레이 결과가 아닙니다. 시작 전 단계 카드·생태 안내·최종 시작 화면에서 주문 상한과 기본 대기 시간을 확인할 수 있습니다.

## 저장 및 업데이트

기존 저장 키와 저장 버전 10을 유지해 점수·진행도·요리사·업그레이드·도감 기록을 이어갑니다. 업데이트 전 로비의 기록 백업에서 JSON을 내보내 두세요. 동일한 웹 주소와 브라우저에서 전체 웹 배포본을 덮어쓰거나, 0.8.4.26 웹 폴더에 전용 패치를 적용합니다. 다른 주소로 이전하면 JSON 백업을 가져오세요. 서비스 워커 캐시를 0.9.0으로 갱신했습니다.

## 검증

TypeScript 빌드/타입 검사, 게임 회귀 검사 22개와 백업/터치 검사 10개 통과. 100개 단계의 상한·단조 감소·경계값, 최대 업그레이드 및 러시, 주문 보충, 조리 환경·레시피 보정, 일시정지, 시작 전 안내, 이전 저장 호환을 검사했습니다. QA_0.9.0.json에 단계별 목표와 계산 결과가 있습니다.

이번 배포는 웹 전체본·웹 패치·전체 소스입니다. 실제 모바일/Windows 실행 검수, 체감 밸런스 플레이 테스트, Windows 새 빌드, 웹사이트 게시 및 Steam 업로드는 포함하지 않습니다. 효과음·신규 콘텐츠는 추가하지 않았습니다.


# 때까치 타이쿤 0.8.4.21

0.8.4.20 색상 누락 수정본을 정식 0.8.4.21로 배포합니다.
메뚜기: 팥중이 갈색형을 참고한 적갈색·황갈색.
도마뱀: 표범장지뱀을 참고한 모래빛 회갈색·짙은 고리 반점.
버튼·주문·꼬치·화구의 공통 SVG에 적용되어 있습니다.
표지·도움말·앱 설명·패키지 버전과 서비스워커 캐시를 갱신했습니다.
스페이스바 비우기, 부채, 표지 크레딧, 표지·로비 전용 BGM과 기존 점수·진행도 저장 구조를 유지했습니다.


# 0.8.4.20 재료 색상 수정

버전은 0.8.4.20으로 유지했습니다.
메뚜기는 팥중이 갈색형을 참고한 적갈색·황갈색으로 변경했습니다.
도마뱀은 표범장지뱀을 참고한 모래빛 회갈색과 짙은 고리 반점으로 변경했습니다.
재료 버튼·주문·조립 꼬치·화구가 사용하는 공통 SVG에 적용했습니다.
애벌레(사용자 피드백의 초록색 재료)는 기존 색을 유지합니다. 재료 이름·조리 시간·점수·스테이지·저장 구조·스페이스바·부채·BGM 동작은 유지했습니다.


# 때까치 타이쿤 0.8.4.20

0.8.4.19 기반. 데스크톱 플레이 중 스페이스바로 조립 중인 꼬치 재료를 비웁니다.
비우기 버튼과 같은 동작을 사용하며, 숫자 1~9·0 선택은 유지합니다.
데스크톱 비우기 버튼에 [Space] 안내·툴팁·접근성 단축키를 추가했습니다. 모바일은 기존 작은 비우기 버튼을 유지합니다.
일시정지·결과·로비·모바일·팝업·입력창·한글 조합·보조키 조합에서는 단축키가 작동하지 않습니다.
스페이스바를 길게 누를 때 반복 비우기와 페이지 스크롤·다른 버튼의 기본 활성화를 방지합니다.
부채 기능, 기존 크레딧, 표지·로비 전용 BGM과 진행도 저장 구조는 유지했습니다.


# 때까치 타이쿤 0.8.4.19

## 변경

0.8.4.18을 기반으로 세 번째 제안인 부채 버튼을 반영했습니다.
화구 옆 부채 버튼을 한 번 누르면 5초간 모든 화구의 조리속도가 60% 증가합니다. 사용 후 10초 뒤 다시 사용 가능합니다.
5초 내내 굽는 꼬치는 추가로 3초 분량의 조리가 진행됩니다. 효과 중 새로 올린 꼬치도 남은 효과 시간을 적용받습니다.
READY·탄 꼬치의 서빙 유예시간은 가속하지 않습니다. 굽는 꼬치가 없으면 부채를 사용할 수 없습니다.
일시정지 중 효과·재사용 대기시간도 멈춥니다. 스테이지 시작·재시작 시 부채 상태를 초기화합니다.
버튼에 효과 또는 재사용 대기시간을 표시합니다. 모바일 터치 영역은 최소 44px입니다.
101종 손님·11명 셰프·100개 스테이지·기존 진행도·화구 수·셰프 특성을 유지했습니다.
0.8.4.18의 표지 크레딧과 표지·로비 전용 BGM도 유지합니다.


# 때까치 타이쿤 0.8.4.18

- 0.8.4.17을 기반으로 제작했습니다.
- 표지 크레딧: 제작 : 흰검뺨둥, BGM 제작 : 야검유앵
- BGM은 표지·로비에서만 재생합니다. 스테이지 시작 시 즉시 멈추고 일시정지·결과·재시작 중에는 재생하지 않습니다.
- 로비 복귀 시 BGM ON이면 재생하고 OFF이면 멈춘 상태를 유지합니다.
- 플레이 화면의 BGM 버튼을 제거했습니다. ON/OFF 설정과 기존 진행도 저장 구조를 유지합니다.
- 표지 음악은 브라우저 자동재생 정책에 따라 첫 클릭·터치 후 시작할 수 있습니다.


# 0.8.4.10

모바일 여행지 선택의 여행수첩 잘림 수정. 영업 준비 화면 하단에 BGM 제작 : 야검유앵 크레딧 추가.

# 0.8.4.9

남은 11종 PNG로 전체 손님 77종 완성. 표지 한글 폰트 수정. PWA 방향 제한 해제. 배포 파일 111개 및 웹 업로드용 34/77개 묶음 제공.

## 0.8.4.8 · Mobile Selection Scrolling & Ready Rotation

Constrain mobile stage/chef lists to scrollable viewports; keep headers outside the list. Remove automatic vertical chef margins from preparation so rotation preserves spacing. See UPDATE_0.8.4.8.md.

## 0.8.4.7 · Ready Start Button & Direct Cooking

Preparation keeps its start button outside the scrolling summary. Ingredient assembly goes directly to the chosen empty hearth; removes the complete-skewer button/state and prevents duplicate assignment to cooking orders. See UPDATE_0.8.4.7.md.

## 0.8.4.6 · Guide UI, Guest Art & GitHub Upload

New guest PNGs 44 (total 66/77; 11 pending), world backgrounds 9, rounded guide UI, centered guest names and exactly 100-file GitHub runtime package. See UPDATE_0.8.4.6.md and QA_0.8.4.6.md.

## 0.8.4.5

- 붉은등때까치 성조 수컷 도트와 11번째 플레이 가능한 요리사 추가.
- 선택·도감·플레이·결과 연결, Stage 52 ★★ 해금과 기존 기록 소급 적용.
- 곤충 전용 꼬치 PERFECT 점수 기본 +10%, 버닝 +25% 보너스.
- 수집 수와 DEV 안내를 11종에 맞춰 갱신; 캐시/버전 업데이트.

# 0.8.4.4

- 디자인 가이드 Reference C 기반 때까치 요리사 10종 도트 신규 제작. 기본 때까치 포함 전종 교체.
- 갈색 어깨끈·크림 앞치마·둥근 몸과 종별 마스크/등색/꼬리 문법 통일.
- 선택·ShrikeDex·플레이·결과 화면 전신 아트 연결, CSS 상태 반응과 Reduced Motion 유지.
- 조립 반응을 짧게 조정하고 버닝/조리 흔들림 완화.
- 저장 ID, 능력, 해금 조건, 자동 버닝, 접시 배치 유지.

# 0.8.4.3

- 재료 접시가 두 번째 줄을 침범하던 정사각형 높이 강제를 제거하고 각 줄에 맞춰 축소.
- 6개 이상 재료는 추가 축소, 줄 간격과 모바일 스크롤 선택 영역 확보.
- World 2 미완성 손님 8종 도트 추가. 전체 22/77종, World 1·2 손님 전체 적용.
- 자동 버닝과 기존 게임 규칙 유지. 도감 전신 표시와 서비스 워커 캐시 갱신.

# 0.8.4.2

World 1 손님 14종 도트 적용 완료. 게이지 만충 시 자동 버닝, 현재 버닝 종료 후 재충전 발동, 소품 비주얼 개선, 소쩍새 표기 수정.

# 0.8.4.1

손님과 주문 축소, 상단 바 겹침 수정, 도감 전신 이미지 표시 및 모바일 도감 겹침 수정. 황로·알락할미새·노랑할미새·물총새 도트 추가.

# Changelog

## 0.8.4 · 숲속 식당과 첫 도트 조류

World 1 픽셀 풍경, 때까치 Chef·박새·쇠박새·딱새 이미지, 주문 말풍선, 통합 둥근 조리대, 한글 글꼴, 모바일 가로 배치, 결과 화면을 업데이트했습니다. 상세 내용은 README.md 및 QA_0.8.4.md를 참고하세요.

# Shrike Tycoon Changelog

## 0.8.3 · Guest Perch & In-Game Soft Visual Pass
- Replaced the old order-panel heading with a dedicated guest header row.
- Fixed `오늘의 손님` being hidden on mobile landscape by reserving its own grid row.
- Expanded the Visual Style Guide material language to all World gameplay screens.
- Added World-specific soft ecological accent palettes.
- Restyled HUD, orders, Chef counter, ingredient plates, burners, status strip and game actions.
- Preserved 0.8.2.2 World scrolling and Ready readability fixes.
- Gameplay/content logic remains unchanged.

## 0.8.2.2 · Mobile Scroll & Gameplay Readability Hotfix
- Added explicit vertical scrolling to the World travel page so World 07–10 remain accessible.
- Added a visual scroll cue under the destination postcard board.
- Increased contrast and weight throughout the Ready / 영업 시작 준비 완료 screen.
- Increased contrast in the landscape-orientation guidance shown before Stage play.
- Moved and reduced the mobile-landscape `오늘의 손님` heading so it no longer collides with the guest perch.
- Gameplay/content logic remains unchanged.

## 0.8.2.1 · Visual Guide Alignment Hotfix
- Fixed Travel Journal / World-selector overlap by separating them into explicit desktop grid areas and mobile single-column flow.
- Redesigned the Travel Journal as a notebook page.
- Redesigned World cards as illustrated postcards with habitat subtitles and chapter numbers.
- Added destination-board, paper, tape, leaf and scrapbook visual language from Visual Style Guide v1.0.
- Preserved readability and mobile density fixes.
- Gameplay/content logic remains unchanged.

## 0.8.2 · World Select & Soft UI Pass
- Replaced the World-screen career-stat row with a dedicated Travel Journal board.
- Prevented XP / plays / served / PERFECT statistics from clipping into the World selector.
- Replaced the plain progress string with compact journal chips.
- Restyled World selector buttons as larger illustrated postcards and softened technical WORLD wording.
- Restyled guided progress as paper tabs.
- Reduced visible developer/reset affordances during normal play.
- Restyled modal/help surfaces to match the Visual Style Guide.
- Preserved 0.8.1.2 readability and mobile clipping fixes.
- Gameplay/content values remain unchanged.

## 0.8.1.2 · Secondary Text Scale Hotfix
- Slightly reduced supporting text sizes to prevent clipping while preserving primary titles and core gameplay labels.
- Kept the 0.8.1.1 high-contrast cover title and Stage-header fixes.
- No gameplay/content changes.

## 0.8.1.2 · Readability & Stage Header Hotfix
- Rebuilt cover title treatment for guaranteed readability.
- Increased text contrast and weight across soft UI surfaces.
- Fixed Stage selection top/header clipping, especially on mobile.
- Switched mobile guided-start screens to natural page height instead of fixed-height clipping.
- Strengthened Stage-ticket and World 1 gameplay text readability.
- Retained 0.8.1 design direction and all gameplay/content behavior.

## 0.8.1 · Design Sheet Integration Pass
- Applied Visual Style Guide v1.0 across World, Stage, Chef, Ready, Result, Bird Book and ShrikeDex surfaces.
- Reworked World selector into warm illustrated postcard tiles with World-specific colour accents.
- Restyled Stage cards as readable paper tickets, preserving 0.8.0.1 safe geometry.
- Restyled Chef selection as collectible character cards and Stage Ecology as a field-guide strip.
- Strengthened World 1's bird-restaurant presentation: branch guest area, paper orders, wooden skewer counter, rounded ingredient plates, clay hearth burners and larger Chef presence.
- Localised Result labels and restyled the screen as a celebratory board.
- Restyled Bird Book and ShrikeDex as scrapbook/field-guide collections.
- Retained 0.8.0.1 readability improvements and every 0.7.6.5 functional/mobile/BGM fix.
- Gameplay/content logic remains unchanged.

## 0.8.0.1 · Readability & Stage Selection Hotfix
- Increased text contrast across the soft non-game shell and World 1 gameplay surfaces.
- Raised small-label readability without reverting to the old dark dashboard style.
- Replaced floating Stage icons with dedicated circular icon badges and reserved text space.
- Added safer Stage-card minimum heights and responsive 2-column / 1-column layouts to prevent clipping.
- No gameplay/content or input changes.

## 0.8.0 · Soft Visual Overhaul / World 1 Visual Target
- Began the 0.8.x art-direction reset using World 1 as the reference gameplay screen.
- Replaced dark dashboard panels in World 1 with warm, rounded, cover-aligned restaurant materials.
- Softened the World/Stage/Chef start flow and orientation gates.
- Made HUD, orders, guest perch, Chef, food buttons, skewer bench, burners and status feedback more toy-like and illustrated.
- Preserved the 0.7.6.5 BGM integration and all prior mobile layout hotfixes.
- No scoring, ecology, stage, recipe, guest, Shrike ability, save-version or core input changes.

## 0.7.6.5 · BGM Integration Hotfix
- Added the user-created BGM track `モズさんの串焼き屋` as a bundled looping game asset.
- Playback begins on the first Game Start click, avoiding browser autoplay-policy failure.
- Added synchronized BGM ON/OFF controls for menu and in-game use.
- Saved BGM preference in localStorage and set default volume to 32%.
- Retained 0.7.6.4 mobile layout/orientation gates and all previous hotfixes.
- Gameplay/content values remain unchanged.

## 0.7.6.4 · Mobile Layout & Orientation Gate Hotfix
- Added Ultra Dense Food Mode for 7–9 ingredient pools on mobile landscape.
- 7+ ingredients use five columns, smaller Food Art, two-line ingredient labels and visible cook-time text.
- Added an internal vertical-scroll fallback when the ingredient grid cannot fit even after compaction.
- Added full-screen mobile portrait guidance at app launch and whenever returning to the World/menu flow.
- Added a full-screen landscape gate after pressing Stage Start; gameplay timers begin only after the player confirms the orientation gate.
- Next Stage and Restart also use the landscape gate on mobile.
- Retained 0.7.6.1 Compact Order Mode and 0.7.6.2 ingredient/burner scale fixes.
- Gameplay/content values remain unchanged.

## 0.7.6.3 · Orientation Guidance Hotfix
- Added a clear mobile portrait-mode recommendation on the World/menu screen, visible both after launch and after returning from play.
- Added a high-contrast landscape-mode recommendation on the READY screen immediately before gameplay.
- Increased contrast of the existing in-game portrait orientation warning.
- No gameplay/content changes.

## 0.7.6.2 · Mobile Ingredient & Burner Scale Hotfix
- Ingredient pools with 4+ foods use smaller Food Art and smaller ingredient-name type on mobile.
- Added overflow-safe ingredient labels and tighter dense-button spacing.
- Reduced burner flame art on mobile and short landscape phones.
- Retained 0.7.6.1 Compact Order Mode and all 0.7.6 Animation & Juice feedback.
- Gameplay/content logic remains unchanged.

## 0.7.6.1 · Mobile Order Density Hotfix
- Added automatic Compact Order Mode for 5+ simultaneous orders on mobile landscape.
- Compact tickets prioritise common name, Food Art recipe, and timer; taxonomy detail is suppressed only in high-density play.
- Added minimum compact ticket heights and internal order-list scrolling as a short-screen fallback.
- Gameplay/content, order capacity, scoring, ecology, character passives and delegated pointer input remain unchanged.

## 0.7.6 · Animation & Juice
- Added Food pick → assembly visual flight and ingredient button feedback.
- Added AUTO MATCH, burner transfer, READY, OVERCOOKED, PERFECT and BURNING one-shot juice cues.
- Added happy / disappointed / late guest departure reactions.
- Added Shrike Chef OOPS reaction for overcooked service.
- Added score/combo/Burning-ready HUD pulses and restrained gameplay flashes.
- Added lightweight World ambience plus stage/result transitions.
- Added reduced-motion handling and lower mobile particle density.
- Gameplay/content baseline remains 0.6.5.11.

## 0.7.5 · Bird Book & ShrikeDex Upgrade
- Added Bird Book collection progress, discovered/unseen filters and World filter.
- Added clickable bird detail panel with portrait, taxonomy, diet Food Art, World chips, habitat and ecology note.
- Added silhouette-based discovery hints for unseen birds.
- Added ShrikeDex progress, unlock filters, role colours and clickable character detail panel.
- Added responsive collection workspace for desktop and mobile.
- Gameplay/content baseline remains 0.6.5.11; gameplay mechanics and progression logic are unchanged.

## 0.7.4.2 · Ingredient Label Type Scale Hotfix
- Reduced ingredient-name typography slightly across desktop and mobile.
- Ingredient illustrations, button dimensions, touch targets, recipes, and gameplay logic are unchanged.
- Retains the 0.7.4.1 world-contrast/readability improvements.

## 0.7.4.1 · World Identity Contrast & Readability Hotfix
- Removed the shared cover-image backdrop from active gameplay to eliminate the muddy double-background effect.
- Removed backdrop blur from in-game world labels and stage intro cards.
- Increased world-scenery visibility while making gameplay panels more opaque for clearer text and recipe readability.
- Strengthened World 1–10 palette separation and world-specific ambient accents.
- Mobile landscape now keeps crisp scenery instead of heavily muting it.
- Gameplay/content logic remains unchanged from 0.7.4 and the locked 0.6.5.11 baseline.

## 0.7.4 · World Visual Identity
- Added distinct vector scenery and palette systems for World 1–10.
- Added real-time visual response to existing time phases and weather events.
- Added visual-only feedback for Migration Wave, Insect Emergence, low Fire Warmth, and high Heat.
- Added a compact World/Stage identity intro at stage start.
- Kept gameplay geometry stable and reduced scenery intensity on mobile landscape.
- Gameplay/content baseline remains locked to 0.6.5.11.

## 0.7.3 · Food & Skewer Art
- Added dedicated illustrated Food Art for all 9 ingredients.
- Added a shared recipe/skewer renderer across order cards, the assembly bench, burners, Stage Ecology, and Bird Book prey labels.
- Added readable visual cook states: fresh, cooking, READY/PERFECT, and OVERCOOKED.
- Preserved 0.7.2.1 mobile control visibility and the locked 0.6.5.11 gameplay/content baseline.

## 0.7.2.1 · Mobile Landscape Bottom Controls Visibility Hotfix
- Fixed Pause and World Map buttons being clipped or pushed below the viewport on mobile landscape.
- Mobile landscape game actions are now pinned to the bottom safe area.
- Reserved a small bottom viewport gutter so the fixed controls do not cover gameplay content.
- Added a shorter control height for very short landscape phones.
- Gameplay/content logic is unchanged from 0.7.2 and the locked 0.6.5.11 baseline.
