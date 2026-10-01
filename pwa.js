(() => {
  const button = document.getElementById('installAppButton');
  const status = document.getElementById('pwaStatus');
  const standalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const mobile = ios || /Android/.test(navigator.userAgent);
  let promptEvent;
  const refreshButton = () => button.classList.toggle('hidden', standalone() || (!mobile && !promptEvent));
  refreshButton();
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault(); promptEvent = event; refreshButton();
  });
  button.onclick = async () => {
    if (promptEvent) {
      const event = promptEvent; promptEvent = null;
      try { await event.prompt(); await event.userChoice; } finally { refreshButton(); }
      return;
    }
    alert(ios
      ? 'Safari에서 이 게임을 열고 공유 → 홈 화면에 추가를 선택하세요. “웹 앱으로 열기” 항목이 보이면 켜 주세요.\n\n설치 후 홈 화면의 때까치 타이쿤 아이콘으로 실행하세요.'
      : 'Chrome 메뉴(⋮) → 앱 설치 또는 홈 화면에 추가를 선택하세요. 설치 항목이 없다면 Chrome에서 이 링크를 직접 열어 주세요.');
  };
  window.addEventListener('appinstalled', () => { promptEvent = null; button.classList.add('hidden'); });
  window.matchMedia('(display-mode: standalone)').addEventListener('change', refreshButton);
  if (!('serviceWorker' in navigator) || !window.isSecureContext) {
    status.textContent = '홈 화면 설치와 오프라인 저장은 HTTPS에서 이용할 수 있습니다.';
    return;
  }
  const readyText = '오프라인 저장 완료 · 인터넷 없이 실행할 수 있습니다. 기기의 사이트 데이터를 지우면 진행도와 저장 파일이 삭제될 수 있습니다.';
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js', {updateViaCache: 'none'});
      const showState = () => {
        status.textContent = registration.waiting
          ? '새 버전 준비 완료 · 게임 탭과 홈 화면 앱을 모두 닫은 뒤 다시 열면 적용됩니다.'
          : registration.installing
          ? '오프라인 파일 저장 중(약 115MB) · 완료될 때까지 인터넷 연결을 유지해 주세요.'
          : registration.active ? readyText : '오프라인 저장을 준비하고 있습니다.';
      };
      const watch = worker => worker && worker.addEventListener('statechange', () => {
        if (worker.state === 'redundant') {
          status.textContent = '오프라인 파일 저장 실패 · 인터넷 연결과 저장 공간을 확인한 뒤 다시 열어 주세요.';
        } else { showState(); }
      });
      watch(registration.installing);
      registration.addEventListener('updatefound', () => { watch(registration.installing); showState(); });
      navigator.serviceWorker.addEventListener('controllerchange', showState);
      showState();
      registration.update().catch(() => {});
    } catch (error) {
      status.textContent = '오프라인 저장을 완료하지 못했습니다. 인터넷에 연결한 상태에서 다시 열어 주세요.';
      console.warn('PWA registration failed', error);
    }
  });
})();
