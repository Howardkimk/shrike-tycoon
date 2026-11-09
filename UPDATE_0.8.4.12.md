# 때까치 타이쿤 0.8.4.12

손님 9종을 추가해 총 86종의 손님 전신 도트를 적용했습니다. 요리사 11종과 월드 10개, 기존 진행도 저장 키를 유지합니다.

| 손님 | 영명 · 학명 | 월드 | Stage |
|---|---|---|---|
| 큰재갈매기 | Slaty-backed Gull · *Larus schistisagus* | 2 | 18, 20 |
| 논병아리 | Little Grebe · *Tachybaptus ruficollis* | 1, 2 | 7, 11, 16, 17, 20 |
| 꼬리치레 | Beijing Babbler · *Rhopophilus pekinensis* | 1, 2 | 6, 8, 14 |
| 덤불해오라기 | Yellow Bittern · *Botaurus sinensis* | 1, 2 | 3, 7, 14, 16, 20 |
| 야자잎검은유황앵무 | Palm Cockatoo · *Probosciger aterrimus* | 10 | 91, 94, 99, 100 |
| 쇠바위종다리 | Japanese Accentor · *Prunella rubida* | 3 | 24, 25, 26, 30 |
| 큰부리밀화부리 | Japanese Grosbeak · *Eophona personata* | 1, 3 | 4, 22, 23, 30 |
| 멧닭 | Black Grouse · *Lyrurus tetrix* | 6 | 55, 59, 60 |
| 알바트로스 | Short-tailed Albatross · *Phoebastria albatrus* | 2 | 20 |

야자잎검은유황앵무는 뉴기니·아루 제도·호주 케이프요크에서 온 World 10 초대 손님으로 설정했습니다. 알바트로스는 북태평양에서 하구 식당을 방문한 World 2 초대 손님입니다. 실제 서식지와 먹이를 도감 설명에 함께 표시하며, 기존 월드의 지리적 테마는 유지합니다.

씨앗을 먹는 손님을 위해 해당 스테이지에 씨앗·견과 재료(2.6초, 기본 점수 15)를 추가했습니다. 기존 77종의 주문에는 이 재료가 섞이지 않습니다. 기존 동물성 재료로 표현할 수 없는 해양 먹이와 식물성 먹이는 도감에 단순화 범위를 적었습니다.

도감의 86종 진행률·월드 필터·첫 방문 발견 기록·기존 세이브 유지가 연결됩니다. 신규 도트는 기본 image_gen 도구로 제작했으며, 종별 프롬프트와 실제 사진 참고 URL은 NEW_GUEST_ART_PROMPTS_0.8.4.12.json에 기록했습니다.

기존 100개 스테이지의 시간·점수 기준·목표·이벤트, 자동 버닝과 꼬치 직접 굽기, 표지 BGM 크레딧 위치는 유지했습니다.

## 실행과 배포

개발: `npm install` → `npm run build` → `npm run serve`.

배포: `python3 BUILD_RUNTIME.py`를 실행해 생성되는 `github-pages-0.8.4.12`의 내용을 GitHub Pages 저장소에 올립니다. 배포본은 120개 파일이며 개별 파일은 25 MiB 미만입니다. ZIP 전체를 올리지 말고 압축을 푼 내용을 업로드하세요.

0.8.4.11 사용자는 patch ZIP을 압축 해제해 기존 사이트 루트에 같은 경로로 덮어쓰면 됩니다. 세이브를 지우지 마세요.

종 검증 자료: Cornell BirdNET/Macaulay, eBird, 꼬리치레 국명은 국립생물자원관 국가생물종목록. 참고 사진 자체는 배포하지 않습니다.
