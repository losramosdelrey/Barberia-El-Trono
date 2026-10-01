/**
 * El Trono — Service Worker (root scope)
 */
const CACHE = 'el-trono-v7';
const ASSETS = [
  './', 'inicio.html', 'servicios.html', 'tienda.html', 'galeria.html', 'nosotros.html', 'contacto.html',
  'css/styles.css', 'css/install.css',
  'js/main.js', 'js/i18n.js', 'js/data.js', 'js/install.js', 'js/cursor.js',
  'manifest.json',
  'icons/icon-192.png', 'icons/icon-512.png',
  'images/logos/logo-mark.svg', 'images/flags/es.svg', 'images/flags/en.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  // Pages: network first, fall back to cache, then to the home page
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then(r => r || caches.match('inicio.html')))
    );
    return;
  }
  // Assets: cache first, refresh in background
  e.respondWith(
    caches.match(req).then(r => {
      const net = fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }).catch(() => r);
      return r || net;
    })
  );
});
