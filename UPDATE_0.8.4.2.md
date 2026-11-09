# 0.8.4.2 · World 1 손님 도트 완성 / 자동 버닝

## 자동 버닝

게이지가 100%에 도달하면 버튼 입력 없이 기존 버닝 효과가 15초간 발동합니다. 자동 발동 시 게이지는 0%로 소비됩니다. 버닝 중 게이지가 다시 차면 현재 버닝을 덮어쓰지 않고 종료 후 다음 버닝이 자동 발동합니다.

일시정지·스테이지 종료 상태에서는 발동하지 않습니다. 일시정지 중 만충된 게이지는 재개 후 발동합니다. 상단의 버닝 버튼을 자동 버닝 상태 표시로 변경했고, 버닝 중에는 남은 시간과 재충전 게이지를 함께 표시합니다. 셰프별 기존 버닝 효과는 유지됩니다.

## 신규 도트 7종

| 게임 ID | 한국명 | 영명 / 학명 | 실물 검토 사진 |
| --- | --- | --- | --- |
| great-spotted-woodpecker | 오색딱따구리 | Great Spotted Woodpecker / Dendrocopos major | ML180000101 |
| eurasian-nuthatch | 동고비 | Eurasian Nuthatch / Sitta europaea | ML656109371 |
| brown-eared-bulbul | 직박구리 | Brown-eared Bulbul / Hypsipetes amaurotis | ML651574390 |
| oriental-magpie | 까치 | Oriental Magpie / Pica serica | ML611069072 |
| grey-heron | 왜가리 | Grey Heron / Ardea cinerea | ML423947981 |
| eurasian-sparrowhawk | 새매 | Eurasian Sparrowhawk / Accipiter nisus | ML154133151 |
| oriental-scops-owl | 소쩍새 | Oriental Scops-Owl / Otus sunia | ML649665699 |

실물 사진과 기존 쇠박새 스타일 이미지를 참고한 내장 이미지 생성 도구의 결과입니다. 투명 배경 PNG는 assets/pixel/<게임 ID>.png에 있으며 주문·도감·결과 화면에서 공유합니다. 프롬프트는 ART_PROMPTS_0.8.4.2.json에 보관합니다. 사진 원본은 배포하지 않습니다.

오색딱따구리는 수컷의 붉은 뒷머리·아랫꼬리덮깃, 동고비는 동아시아형의 옅은 배, 직박구리는 갈색 귀깃, 까치는 긴 청록 꼬리, 왜가리는 긴 다리와 목, 새매는 암컷의 가로줄무늬, 소쩍새는 노란 눈과 회색형 깃을 중심으로 표현했습니다. 모든 성별·나이·계절 변이를 포함하는 그림은 아닙니다.

World 1의 기존 7종과 신규 7종을 합쳐 손님 14종 전체에 도트가 적용됩니다. 기본 때까치 요리사까지 총 15종입니다. 다른 월드 전용 손님과 추가 셰프의 도트는 후속 작업으로 남아 있으며 진행 목록은 ART_PROGRESS.json에 있습니다. 이미지는 단일 포즈 기반으로 기존 CSS 상태 모션을 사용합니다.

## 이름 수정

기존 oriental-scops-owl에 잘못 연결된 “큰소쩍새”를 학명 Otus sunia에 맞는 “소쩍새”로 수정했습니다. 종 ID·단계 구성·도감 저장 키는 유지합니다.

확인 자료:
- https://species.nibr.go.kr/nibr/assets/K-BON_GUIDE.pdf
- https://www.nibr.go.kr/aiibook/access/ecatalogt.jsp?Dir=1201&callmode=admin&catimage=&eclang=ko&start=110&um=s
- https://macaulaylibrary.org/asset/180000101 (다른 사진도 표의 ML 번호로 식별)

## 비주얼

가이드의 식당 소품 방향을 따라 조리대에 옅은 나뭇결을 추가하고, 화덕에 숯과 조리 상태에 따른 따뜻한 빛을 추가했습니다. 데스크톱 재료 접시는 원형 비율로 정리했습니다. 도감 카드 높이를 늘려 여러 월드 표기가 다음 카드와 겹치지 않도록 했습니다. 이전 패치의 주문 영역 제한과 도감 전신 표시를 유지합니다.

공개 사이트 자동 배포는 하지 않았습니다.
