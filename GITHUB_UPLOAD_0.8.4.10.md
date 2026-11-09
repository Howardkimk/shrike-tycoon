# 0.8.4.10 배포

기존 0.8.4.9를 배포했다면 `shrike-tycoon-patch-0.8.4.9-to-0.8.4.10.zip`을 압축 해제하고 내용 6개를 기존 게임 루트에 덮어쓰세요. `dist/game.js`는 dist 폴더 안에 유지합니다. 패치는 index.html, styles.css, dist/game.js, sw.js, manifest.webmanifest, LICENSES.txt입니다. ZIP 자체를 올리지 마세요.

새 배포 또는 다른 버전에서 업데이트한다면 `shrike-tycoon-github-pages-0.8.4.10.zip`을 풀어 내용물을 GitHub Desktop의 로컬 저장소에 복사한 뒤 Commit → Push origin 합니다. 전체 파일은 111개이므로 웹 업로드를 한 번에 하지 말고 Desktop을 사용하세요. 개별 파일은 모두 25 MiB 미만입니다.

편집용 소스는 `shrike-tycoon-prototype-0.8.4.10.zip`입니다. `npm install` → `npm run build` → `python BUILD_RUNTIME.py`로 배포본을 다시 만듭니다.

업데이트 후 새로고침하고 재접속하세요. 서비스 워커 캐시가 0.8.4.10으로 바뀝니다. 진행도는 기존 저장 키로 유지됩니다.
