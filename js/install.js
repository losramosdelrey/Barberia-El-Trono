/**
 * El Trono — PWA install prompt
 */
(function () {
  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    showBanner();
  });

  function showBanner() {
    const banner = document.getElementById('install-banner');
    if (!banner || localStorage.getItem('eltrono_install_dismissed')) return;
    banner.classList.add('show');
  }

  window.elTronoInstall = function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      hideBanner();
    });
  };

  window.elTronoInstallDismiss = function () {
    localStorage.setItem('eltrono_install_dismissed', '1');
    hideBanner();
  };

  function hideBanner() {
    const banner = document.getElementById('install-banner');
    if (banner) banner.classList.remove('show');
  }

  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('js/sw.js').catch(() => {});
    });
  }
})();
