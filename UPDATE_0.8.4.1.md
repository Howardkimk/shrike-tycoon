# 0.8.4.1 · 손님 크기와 도감 전신 이미지 수정

## 수정
- 손님 이미지 최대 높이 145px → 106px, 말풍선 최대 폭 260px → 220px.
- 고정 160px 손님 행을 남은 높이에 맞춰 줄어드는 행으로 변경. 상단 바와 조리대 사이의 주문 영역 안에서 배치합니다.
- 모바일 가로 화면에서 주문 말풍선과 38px 너비 새 이미지를 가로로 배치합니다. 주문 5개도 같은 높이 안에 들어갑니다.
- Bird Book / ShrikeDex 상세 이미지 영역에 명시적인 크기와 여백을 설정하고, 원본 전체를 `object-fit: contain`으로 표시합니다. 이미지 고유 크기가 영역을 늘리지 않으며 꼬리·발끝도 함께 표시합니다.
- 황로·알락할미새·노랑할미새·물총새 도트 이미지 추가. 기존 손님 ID에 연결하여 실제 주문과 도감에서 사용합니다.
- 황로 학명을 현행 eBird 표기 Ardea coromanda로 갱신. 내부 ID 및 저장 진행도는 유지합니다.

## 그림 범위
기존 4종과 신규 4종을 합쳐 총 8종(기본 요리사 1종 + 손님 7종)에 도트 스타일 이미지가 있습니다. 다른 조류는 기존 SVG를 유지합니다. 새 이미지는 단일 포즈이며 동작별 프레임 애니메이션은 이번 범위에 포함하지 않습니다.

## 검증 참고와 표현
- 황로: 번식깃, 주황색 머리·목·등 장식깃, 흰 날개, 긴 다리.
- 알락할미새: ocularis형 참고. 흰 얼굴·검은 눈선·목밑, 회색 등, 긴 꼬리. 종 내 모든 아종의 깃을 대표하지 않습니다.
- 노랑할미새: 번식기 수컷, 회색 등, 검은 목, 노란 배와 아랫꼬리덮깃, 긴 꼬리.
- 물총새: 수컷, 청록색 등·머리, 주황색 배, 흰 목, 긴 검은 부리, 짧은 꼬리.

Macaulay Library 사진을 형태 검토용으로 확인했으며 사진 원본은 배포하지 않습니다:
- https://ebird.org/species/categr2 — ML176720111
- https://ebird.org/species/whiwag — ML238426941
- https://ebird.org/species/grywag — ML23443031
- https://ebird.org/species/comkin1 — ML26854431

## 이미지 제작
내장 이미지 생성 도구로 제작했으며 기존 쇠박새 이미지가 스타일 참고입니다. 프로젝트 파일은 `assets/pixel/eastern-cattle-egret.png`, `white-wagtail.png`, `grey-wagtail.png`, `common-kingfisher.png`입니다.

공통 프롬프트: one full-body standing bird game sprite, facing left in three-quarter side view, transparent background, visibly stepped pixel edges, warm dark outline, layered feather shading, bright bead eye, species-specific anatomy; full bill, both feet and entire tail visible; centered with margin; no text, perch, shadow, clothes or extra birds. 위 종별 형태와 각 실물 사진을 참고 입력으로 사용했습니다.

공개 사이트에는 자동 배포하지 않았습니다. 정적 배포 루트에 GitHub Pages ZIP 내용을 교체하면 됩니다.
