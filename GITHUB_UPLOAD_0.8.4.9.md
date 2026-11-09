# GitHub 업로드 · 0.8.4.9

전체 배포본은 111개 파일입니다. ZIP 파일 자체를 올리지 말고 압축을 풀어 내용물을 올리세요. 개별 배포 파일은 모두 25 MiB 미만입니다.

## GitHub Desktop 권장

1. 저장소를 Clone합니다.
2. `shrike-tycoon-github-pages-0.8.4.9.zip`을 별도 폴더에 압축 해제합니다.
3. 내용물을 로컬 저장소의 게임 배포 위치에 덮어씁니다. `index.html`과 `assets`가 같은 수준에 있어야 합니다. `.git`은 유지합니다.
4. 변경 파일을 확인하고 Commit → Push origin을 실행합니다.
5. 저장소 Settings → Pages에서 배포 브랜치·폴더를 확인합니다. 루트에 복사했다면 해당 브랜치의 `/ (root)`를 사용합니다.

소스 ZIP에는 편집용 TypeScript와 프롬프트·검수 결과가 포함됩니다. `npm install` → `npm run build` → `python BUILD_RUNTIME.py`로 배포본을 다시 만들 수 있습니다.

## 웹 업로드: 두 번

- `shrike-tycoon-core-0.8.4.9.zip`을 풀어 기본 파일 34개를 게임 루트에 업로드하고 커밋합니다.
- `shrike-tycoon-guests-0.8.4.9.zip`을 풀어 그 안의 `assets` 폴더를 동일한 게임 루트에 업로드하고 커밋합니다. 손님 파일은 77개입니다.

두 묶음은 경로가 겹치지 않으며 합치면 전체 배포본과 같습니다. `assets/pixel/이름.png` 구조를 유지하고 폴더가 중첩되지 않도록 하세요. 숨김 파일 `.nojekyll`이 빠지면 Add file → Create new file로 빈 파일을 만듭니다. 두 업로드를 모두 완료한 뒤 실행하세요.

서비스 워커 캐시 이름을 갱신했습니다. 배포 반영 후 새로고침하고 재접속하세요.

공식 업로드 제한: 한 번에 100개 파일, 브라우저 업로드의 개별 파일 25 MiB. [GitHub 공식 문서](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)
