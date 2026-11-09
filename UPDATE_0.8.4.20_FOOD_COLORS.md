# 0.8.4.20 재료 색상 수정

버전은 0.8.4.20으로 유지했습니다.
메뚜기는 팥중이 갈색형을 참고한 적갈색·황갈색으로 변경했습니다.
도마뱀은 표범장지뱀을 참고한 모래빛 회갈색과 짙은 고리 반점으로 변경했습니다.
재료 버튼·주문·조립 꼬치·화구가 사용하는 공통 SVG에 적용했습니다.
애벌레(사용자 피드백의 초록색 재료)는 기존 색을 유지합니다. 재료 이름·조리 시간·점수·스테이지·저장 구조·스페이스바·부채·BGM 동작은 유지했습니다.

기존 0.8.4.20에는 shrike-tycoon-patch-0.8.4.20-food-colors.zip을 풀어 같은 경로에 덮어쓰세요. 변경 파일은 dist/game.js, sw.js입니다.
전체 배포본과 개발 원본에도 새 색상을 반영했습니다.
같은 버전 내 수정이지만 서비스워커 캐시 구분값을 갱신하여 이전 색상이 남지 않도록 했습니다. 기존 사이트 데이터/localStorage를 삭제하지 마세요.

검증: TypeScript 빌드, SVG 렌더링과 확대/32·24·17px 아이콘 검수, 모든 조리 상태·레시피 표시 위치의 공통 SVG 적용, 두 SVG 외 게임 코드 동일성 확인.
브라우저 전체 화면과 실제 iOS/Android 기기는 검수하지 못했습니다. GitHub 게시 자체는 수행하지 않았습니다.

참고 자료:
https://www.nibr.go.kr/aiibook/access/ecatalogt.jsp?Dir=1484&callmode=admin&catimage=&eclang=ko&start=90&um=s
https://koreantk.com/ktkp2014/medicine/medicine-view.view?medCd=M0002004&tempLang=ko
