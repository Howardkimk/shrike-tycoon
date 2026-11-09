# 때까치 타이쿤 0.8.4.9

World 8–10에 남아 있던 11종의 손님 도트를 제작해 주문창·조류 도감·결과 화면에 연결했습니다. 전체 조류 손님은 77/77종 PNG, 요리사는 11종, 월드 배경은 10종입니다.

새 손님: Northern Fiscal, Mackinnon's Shrike, Fiscal Flycatcher, Cape Crow, Karoo Scrub Robin, São Tomé Fiscal, São Tomé Thrush, São Tomé Oriole, Malagasy Kingfisher, Malagasy Kestrel, Madagascar Magpie Robin.

가이드의 둥근 실루엣과 따뜻한 외곽선, 기존 픽셀 밀도를 따랐습니다. 전신·발·꼬리를 포함한 투명 PNG로 제작했습니다. 맥키넌때까치의 회색 머리·흰 눈썹선과 상투메지빠귀의 어두운 부리를 반영했습니다.

기존 이름 중앙 정렬, 도감 전신 표시, 모바일 선택창 스크롤, 준비 화면 시작 버튼과 회전 간격, 재료→화구 즉시 조리, 자동 버닝은 유지합니다. 표지 제목에는 동봉된 Jua 한글 폰트를 명시해 네모 글자 표시를 수정했습니다. 홈 화면 설치용 manifest는 방향을 `any`로 변경해 메뉴 세로/플레이 가로 전환을 막지 않도록 했습니다. 기기별 방향 API 지원은 다릅니다.

내장 이미지 생성 도구를 사용했습니다. 정확한 프롬프트는 `GUEST_ART_PROMPTS_0.8.4.9.json`, 결과·에셋 경로는 `GUEST_ART_GENERATION_RESULTS_0.8.4.9.json`에 있습니다. 새 11종은 `NEW_GUEST_ART_GALLERY.html`, 전체는 `BIRD_ART_GALLERY.html`에서 확인할 수 있습니다.

배포본은 111개 파일입니다. 전체 배포 ZIP은 GitHub Desktop용, 웹 업로드 묶음은 기본 34개 + 손님 77개입니다. 압축을 풀어서 올리세요.
