# 때까치 타이쿤 0.8.4.3

## 재료 접시 겹침 수정

이전 버전에서는 높이가 작은 재료 영역에 두 줄을 배치하면서 접시의 정사각형 비율을 강제해 두 번째 줄과 겹쳤습니다. 접시가 행 높이에 맞춰 줄어들도록 비율 강제를 제거했습니다.

- 기본 접시 너비 상한 94px, 6종 이상은 84px / 높이 상한 82px.
- 줄 사이 8px 간격을 확보. 그림·재료 이름·조리 시간을 함께 축소.
- 가로 모바일 접시는 50px 높이, 6종 이상 최대 58px 너비. 줄 사이 6px.
- 높이가 부족한 화면에서는 재료 영역만 스크롤하며 마지막 재료까지 선택 가능.
- 주문·조리·서빙 규칙, 저장 구조, 자동 버닝 유지.

## 신규 손님 도트 8종

한국명 → 영명·학명 → Cornell eBird/Macaulay 또는 BirdNET 대표 사진 → 형태 특징 확인 → 기존 pixel 스타일로 신규 포즈 제작 순서로 작업했습니다.

| 종 ID | 한국명 | 영명 | 학명 | 참조 / 표현 특징 |
|---|---|---|---|---|
| little-egret | 쇠백로 | Little Egret | Egretta garzetta | [ML115910611](https://macaulaylibrary.org/asset/115910611) / 검은 부리·다리, 노란 발, 흰 장식깃 |
| black-crowned-night-heron | 해오라기 | Black-crowned Night Heron | Nycticorax nycticorax | [ML304988121](https://macaulaylibrary.org/asset/304988121) / 성조 검은 머리·등, 회색 날개, 붉은 눈, 흰 장식깃 |
| common-sandpiper | 깝작도요 | Common Sandpiper | Actitis hypoleucos | [Cornell 사진](https://birdnet.cornell.edu/taxonomy/species/Actitis%20hypoleucos) / 갈색 등, 흰 어깨 쐐기, 녹색 다리 |
| oriental-reed-warbler | 개개비 | Oriental Reed Warbler | Acrocephalus orientalis | [ML138132341](https://macaulaylibrary.org/asset/138132341) / 갈색 등, 크림색 눈썹, 긴 부리와 꼬리 |
| barn-swallow | 제비 | Barn Swallow | Hirundo rustica | [Cornell 사진](https://birdnet.cornell.edu/taxonomy/species/Hirundo%20rustica) / 한국의 흰 배 형태, 남색 등, 붉은 이마·목, 갈라진 긴 꼬리 |
| grey-headed-lapwing | 민댕기물떼새 | Grey-headed Lapwing | Vanellus cinereus | [Cornell 사진](https://birdnet.cornell.edu/taxonomy/species/Vanellus%20cinereus) / 회색 머리, 검은 가슴띠, 노란 부리·다리, 깃 없는 머리 |
| common-kestrel | 황조롱이 | Common Kestrel | Falco tinnunculus | [Cornell 사진](https://birdnet.cornell.edu/taxonomy/species/Falco%20tinnunculus) / 수컷 회색 머리·꼬리, 붉은 등 검은 점, 꼬리 검은 끝띠 |
| ruddy-kingfisher | 호반새 | Ruddy Kingfisher | Halcyon coromanda | [ML88858901](https://macaulaylibrary.org/asset/88858901) / 붉은 큰 부리·발, 적갈색 몸과 보라색 광택 |

황조롱이는 eBird 영명 Eurasian Kestrel과 같은 Falco tinnunculus이며 게임에서는 기존 Common Kestrel 표시와 ID를 유지했습니다. 종명 확인 자료: [eBird 쇠백로](https://ebird.org/species/litegr), [해오라기](https://ebird.org/species/bcnher), [깝작도요](https://ebird.org/species/comsan), [개개비](https://ebird.org/species/orrwar1), [제비](https://ebird.org/species/barswa), [민댕기물떼새](https://ebird.org/species/gyhlap1), [황조롱이](https://ebird.org/species/eurkes), [호반새](https://ebird.org/species/rudkin1).

최종 PNG는 assets/pixel에 저장하고 주문 렌더러와 도감에 연결했습니다. 내장 이미지 생성 도구 사용. 프롬프트는 ART_PROMPTS_0.8.4.3_A.json 및 B.json에 포함합니다. 실제 사진은 참조용이며 배포 파일에 포함하지 않습니다.

World 1·2 손님 전체 완료. 전체 손님 77종 중 22종 완료 / 55종 후속 작업. 추가 요리사는 기존 SVG를 유지하며 도트 확장 대상입니다. 그림은 종별 정지 포즈이며 CSS 상태 효과를 사용합니다.
