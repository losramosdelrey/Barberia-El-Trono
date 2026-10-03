/**
 * El Trono — Service Worker
 * Cache larga para assets estáticos (visitas repetidas más rápidas).
 */
const CACHE = 'el-trono-v15';
const ASSETS = [
  './',
  'inicio.html',
  'servicios.html',
  'tienda.html',
  'galeria.html',
  'nosotros.html',
  'contacto.html',
  'labor-estudiantil.html',
  'css/styles.css',
  'css/install.css',
  'css/labor.css',
  'css/promo.css',
  'css/page-hero.css',
  'js/main.js',
  'js/i18n.js',
  'js/data.js',
  'js/precios.js',
  'js/install.js',
  'js/cursor.js',
  'js/labor.js',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'images/logos/logo-mark.svg',
  'images/flags/es.svg',
  'images/flags/en.svg',
  'images/backgrounds/hero-480.webp',
  'images/backgrounds/hero-800.webp',
  'images/backgrounds/hero-1200.webp',
  'images/equipo/jercey-h-pineda.webp',
  'images/equipo/daniel-cabrera.webp',
  'images/equipo/alejandro-rivera.webp'
];

const LONG_CACHE = /\/(css|js|icons|images|fonts)\//i;
const ONE_YEAR = 60 * 60 * 24 * 365;

function withCacheHeaders(res, seconds) {
  if (!res || !res.ok) return res;
  const headers = new Headers(res.headers);
  headers.set('Cache-Control', 'public, max-age=' + seconds + ', immutable');
  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: headers
  });
}

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) {
        return Promise.all(ASSETS.map(function (a) {
          return c.add(a).catch(function () {});
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // HTML: network first
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').indexOf('text/html') !== -1) {
    e.respondWith(
      fetch(req)
        .then(function (res) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          return res;
        })
        .catch(function () {
          return caches.match(req).then(function (r) { return r || caches.match('inicio.html'); });
        })
    );
    return;
  }

  // Static assets: cache-first + long cache headers
  e.respondWith(
    caches.match(req).then(function (cached) {
      if (cached) {
        // background refresh
        fetch(req).then(function (res) {
          if (res && res.ok) {
            caches.open(CACHE).then(function (c) { c.put(req, res.clone()); });
          }
        }).catch(function () {});
        return LONG_CACHE.test(url.pathname) ? withCacheHeaders(cached.clone(), ONE_YEAR) : cached;
      }
      return fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, copy); });
          if (LONG_CACHE.test(url.pathname)) return withCacheHeaders(res, ONE_YEAR);
        }
        return res;
      }).catch(function () { return cached; });
    })
  );
});
