# 0.8.4.4 — 때까치 요리사 전종 도트

현재 구현된 요리사 10종이 대상입니다. 기획 문서의 추가 캐릭터는 아직 게임에 구현돼 있지 않으므로 이번 10종과 구분합니다.

## 디자인 가이드 반영

Shrike_Tycoon_Visual_Style_Guide_v1.0(1).docx의 7쪽과 포함된 Reference A/B/C 그림을 다시 확인했습니다. Reference C를 모든 종의 직접 스타일 참조로 사용했습니다.

- 둥근 새 몸과 머리, 따뜻한 잉크색 픽셀 외곽선, 단순화한 깃 명암.
- 가이드의 갈색 어깨끈과 금색 버클을 공유하고, 작은 크림색 허리 앞치마에 잎색 포인트 적용.
- 마스크·부리·등색·옆구리색·꼬리를 가리지 않는 복장. 큰 요리사 모자는 사용하지 않음.
- 오른쪽을 바라보며 작은 꼬치를 든 현장 요리사로 제작. 기본 때까치도 같은 방향으로 새로 제작.
- 선택 화면, ShrikeDex, 플레이 화면, 결과 화면에서 같은 전신 아트 사용.
- 캐릭터를 별도 프로필 패널에 넣지 않고 조리대 왼쪽의 가장 큰 단일 캐릭터로 유지.
- 조립 반응은 짧게, 조리/버닝은 작은 움직임과 빛으로 표현. Reduced Motion 유지.

한국명 → 현재 영명·학명 → Cornell 대표 사진과 종 식별 특징 → 신규 포즈 제작 순서로 확인했습니다. 가이드 그림에 적힌 오기나 종명은 복사하지 않았습니다.

| ID | 한국명 | 영명 | 학명 | 주요 구분 |
|---|---|---|---|---|
| bull-headed | 때까치 | Bull-headed Shrike | Lanius bucephalus | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20bucephalus) |
| tiger | 칡때까치 | Tiger Shrike | Lanius tigrinus | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20tigrinus) |
| brown | 노랑때까치 | Brown Shrike | Lanius cristatus | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20cristatus) |
| chinese-grey | 물때까치 | Chinese Grey Shrike | Lanius sphenocercus | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20sphenocercus) |
| long-tailed | 긴꼬리때까치 | Long-tailed Shrike | Lanius schach | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20schach) |
| northern | 재때까치 | Northern Shrike | Lanius borealis | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20borealis) |
| grey-backed | 회색등때까치 | Grey-backed Shrike | Lanius tephronotus | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20tephronotus) |
| isabelline | 사막때까치 | Isabelline Shrike | Lanius isabellinus | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20isabellinus) |
| red-tailed | 붉은꼬리때까치 | Red-tailed Shrike | Lanius phoenicuroides | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20phoenicuroides) |
| great-grey | 초원때까치 | Great Grey Shrike | Lanius excubitor | [실제 사진·종 정보](https://birdnet.cornell.edu/taxonomy/species/Lanius%20excubitor) |

재때까치는 Lanius borealis / Northern Shrike, 초원때까치는 Lanius excubitor / Great Grey Shrike로 구분합니다. 종 ID와 표시명, 능력과 해금 조건은 유지합니다.

정지 전신 PNG 10개이며, 상태별 별도 애니메이션 프레임을 제작한 것은 아닙니다. idle/assemble/cook/perfect/oops/burning은 기존 상태 로직과 CSS 반응을 사용합니다. 제작 프롬프트 전체는 CHEF_ART_PROMPTS_0.8.4.4.json, 파일 연결과 참조 목록은 CHEF_ART_PROGRESS.json에 있습니다. 내장 이미지 생성 도구를 사용했습니다.

손님 신규 도트는 이번에 추가하지 않았습니다. 손님 22/77종, 남은 55종 현황은 ART_PROGRESS.json에 유지했습니다. 게임 밸런스·저장 구조·자동 버닝 변경 없음. 서비스 워커 캐시와 버전만 갱신합니다.
