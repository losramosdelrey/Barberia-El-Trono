/**
 * El Trono — PWA install
 * - Native prompt when available (Android / Chrome / Edge)
 * - Step-by-step help sheet otherwise (iOS Safari, other browsers)
 * - Hides the install button once installed or when running as an app
 */
(function () {
  var deferred = null;
  var K_DISMISS = 'eltrono_install_dismissed_at';
  var K_DONE = 'eltrono_installed';
  var WEEK = 7 * 24 * 3600 * 1000;
  var root = document.documentElement;

  function ls(op, k, v) {
    try { return op === 'get' ? localStorage.getItem(k) : op === 'set' ? localStorage.setItem(k, v) : localStorage.removeItem(k); } catch (e) { return null; }
  }
  function $(id) { return document.getElementById(id); }
  function t(k) { return (window.Lang && Lang.t) ? Lang.t(k) : k; }

  var isStandalone = (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  if (isStandalone) { root.classList.add('is-standalone'); ls('set', K_DONE, '1'); }
  else if (ls('get', K_DONE)) { root.classList.add('is-installed'); }

  function banner() { return $('install-banner'); }
  function showBanner() {
    var b = banner(); if (!b || isStandalone) return;
    var d = parseInt(ls('get', K_DISMISS) || '0', 10);
    if (d && Date.now() - d < WEEK) return;
    b.classList.add('show');
    requestAnimationFrame(function () { requestAnimationFrame(function () { b.classList.add('in'); }); });
  }
  function hideBanner() {
    var b = banner(); if (!b) return;
    b.classList.remove('in');
    setTimeout(function () { b.classList.remove('show'); }, 450);
  }
  function toast(msg) {
    var el = $('install-toast'); if (!el) return;
    el.textContent = msg; el.classList.add('show');
    setTimeout(function () { el.classList.remove('show'); }, 4500);
  }
  function markInstalled() {
    ls('set', K_DONE, '1'); root.classList.add('is-installed'); hideBanner();
  }

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferred = e;
    // browser says the app is NOT installed (any more): make sure the button is back
    ls('del', K_DONE); root.classList.remove('is-installed');
    document.querySelectorAll('.float-app').forEach(function (b) { b.classList.add('can-install'); });
    setTimeout(showBanner, 3500);
  });

  window.addEventListener('appinstalled', function () {
    deferred = null; markInstalled(); toast(t('install_done'));
  });

  window.elTronoInstall = function () {
    if (isStandalone) return;
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function (choice) {
        deferred = null; hideBanner();
        if (choice && choice.outcome === 'accepted') markInstalled();
      });
      return;
    }
    hideBanner();
    openHelp();
  };

  window.elTronoInstallDismiss = function () {
    ls('set', K_DISMISS, String(Date.now()));
    hideBanner();
  };

  function openHelp() {
    var h = $('install-help'); if (!h) return;
    $('ih-ios').hidden = !isIOS;
    $('ih-and').hidden = isIOS;
    h.hidden = false;
  }
  window.elTronoInstallHelpClose = function () { var h = $('install-help'); if (h) h.hidden = true; };
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') window.elTronoInstallHelpClose(); });

  // iOS has no beforeinstallprompt: offer the banner once in a while
  if (isIOS && !isStandalone) setTimeout(showBanner, 5000);

  // Service worker (root scope)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
