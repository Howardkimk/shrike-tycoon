# 앱 배포 논의안 · 2026-10-01

현재 게임은 정적 HTML/CSS/TypeScript, manifest, 서비스 워커, 브라우저 저장 데이터를 사용합니다. 0.8.4.9는 웹 배포본이며 APK/IPA 또는 스토어 제출본은 아닙니다.

| 방법 | 플레이어 설치 방식 | 필요한 후속 작업 |
| --- | --- | --- |
| PWA | 웹 링크에서 홈 화면에 추가 | HTTPS 공개 배포, 실제 iPhone/Android의 설치·오프라인·회전·재접속 검수 |
| Android 앱 | 테스트 APK 또는 Google Play | Capacitor Android 프로젝트, 앱 ID, 서명, 백그라운드 처리·뒤로가기·세이브 검수, 스토어 제출 설정 |
| iPhone 앱 | TestFlight 또는 App Store | Capacitor iOS 프로젝트, macOS/Xcode 빌드·서명, Apple 개발자 계정, 기기 검수, 스토어 메타데이터·심사 |

권장 순서: 웹/PWA를 공개해 실제 기기에서 테스트 → Capacitor에 게임 파일을 동봉한 Android/iOS 테스트 앱 → 스토어 배포. 현재 코드를 계속 사용하면서 기기별 처리만 추가하는 방향입니다. 원격 웹사이트 URL만 표시하기보다 게임 에셋을 앱에 포함하면 첫 실행부터 오프라인 플레이를 준비할 수 있습니다. 이 문서의 권장은 현재 코드 구조를 근거로 한 개발 판단입니다.

현재 manifest의 `orientation`은 `any`로 수정했습니다. 메뉴는 세로, 영업은 가로라는 기존 안내를 유지하며 네이티브 앱에서는 플랫폼 방향 API를 연결해 전환을 검수해야 합니다.

앱 전환 전 확인할 점:

- 웹/PWA 저장 데이터가 새 네이티브 앱에 자동으로 전달된다고 가정하지 않습니다. 현재 localStorage 기반 진행도를 옮길지 결정하고, 원하면 백업 내보내기·가져오기를 먼저 만듭니다.
- 앱 전환·화면 잠금 시 타이머/BGM 정지와 복귀 처리, Android 뒤로가기, 노치·안전 영역, 터치 지연을 실제 기기에서 확인합니다.
- 네이티브에 동봉된 게임 파일은 웹 서비스 워커 캐시와 충돌하지 않게 배포 방식을 구분합니다.
- App Store는 재포장 웹사이트를 넘어서는 앱의 기능과 사용 경험을 요구합니다. 충분한 게임 콘텐츠와 기기에서의 완성도를 검수하며, 승인 여부는 제출 시 심사로 결정됩니다.

먼저 정할 것: Android/iPhone 중 우선 플랫폼, 무료 배포/유료/광고 방향, 개발자 계정 보유 여부, iOS용 Mac 사용 가능 여부.

공식 자료:

- [Capacitor 소개](https://capacitorjs.com/docs)
- [Capacitor 개발 환경](https://capacitorjs.com/docs/getting-started/environment-setup)
- [PWA 설치 방식](https://web.dev/learn/pwa/installation)
- [Apple 앱 심사 지침 · 4.2 최소 기능](https://developer.apple.com/kr/app-store/review/guidelines/)
