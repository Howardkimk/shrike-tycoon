# 0.8.4.8 GitHub 업로드 안내

GitHub 웹 업로드는 한 번에 최대 100개 파일, 파일당 최대 25 MiB입니다. 기존 패키지의 여러 글꼴 조각과 개발·검증 문서가 파일 수를 늘렸습니다. 이번 배포용 ZIP은 글꼴을 2개 TTF로 통합하고 CSS를 한 파일로 합쳐 실행에 필요한 파일을 정확히 100개로 줄였습니다. 가장 큰 개별 파일은 약 5.36 MiB입니다.

## 웹에서 업로드

1. `shrike-tycoon-github-pages-0.8.4.8.zip`을 압축 해제합니다. ZIP 파일 자체는 올리지 않습니다.
2. 저장소 → Add file → Upload files에서 압축 해제한 **내용물**을 넣습니다. `index.html`, `styles.css`, `sw.js`, `manifest.webmanifest`, `.nojekyll`, `LICENSES.txt`와 `assets`, `dist` 폴더입니다. 폴더 구조를 유지하고 `index.html`이 저장소 루트에 있어야 합니다. 폴더를 드래그하면 하위 파일도 올라갑니다.
3. 변경을 커밋합니다. 네트워크·브라우저 문제로 한 번에 실패하면 루트 파일/dist와 assets 폴더를 나눠 업로드할 수 있습니다.
4. Settings → Pages → Source: Deploy from a branch → Branch: main → Folder: /(root) → Save. 다른 브랜치를 사용한다면 실제 업로드한 브랜치를 고릅니다.
5. Pages 화면의 배포 주소를 열어 확인합니다. 이전 화면이 남으면 새로고침 후 한 번 더 열거나 브라우저의 해당 사이트 데이터/서비스 워커를 초기화합니다. 사이트 데이터 초기화는 해당 브라우저의 게임 진행도를 지우므로 진행도 보존이 필요하면 먼저 저장된 데이터를 별도로 보관하세요.

100개 묶음에는 실행 파일만 포함됩니다. 소스·도감 갤러리·검증 문서는 별도의 prototype ZIP에 있습니다. node_modules나 소스 ZIP을 웹 업로드에 함께 넣지 마세요. 기존 저장소의 오래된 파일은 새 업로드의 개수에 포함되지 않지만 더 이상 사용하지 않는 파일이 남을 수 있습니다.

## 반복 업데이트에는 GitHub Desktop

GitHub Desktop에서 저장소를 Clone → 해당 로컬 폴더에 압축 해제한 배포 내용물을 복사하여 같은 경로의 파일을 덮어쓰기 → 변경 내역 확인 → Commit → Push origin 순서로 진행합니다. 웹 UI의 한 번에 100개 업로드 제한을 피할 수 있습니다. 다른 프로젝트 파일이 있는 저장소 전체를 삭제하지 말고 게임 배포 경로만 갱신하세요.

## 공식 안내

- 파일 업로드 제한 및 방법: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
- Pages 배포 브랜치/폴더 설정: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

이 패키지는 로컬 하위 경로와 서비스 워커 오프라인 재접속을 검증했습니다. 사용자 GitHub 저장소에는 직접 업로드하거나 배포하지 않았습니다.
