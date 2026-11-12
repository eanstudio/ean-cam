const CACHE_NAME = 'ean-skeneris-shell-v2.55.2';
const APP_SHELL = new URL('./index.html', self.registration.scope).href;
const APP_ASSETS = [
  './index.html',
  './manifest.json',
  './sw.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
].map(path => new URL(path, self.registration.scope).href);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_ASSETS))
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    event.waitUntil(self.skipWaiting());
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('ean-skeneris-shell-') && key !== CACHE_NAME)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() =>
        caches.open(CACHE_NAME).then(cache => cache.match(APP_SHELL)).then(response => {
          if (!response) throw new Error('Lietotnes sākuma lapa nav pieejama bezsaistē.');
          return response;
        })
      )
    );
  } else if (APP_ASSETS.includes(event.request.url)) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache => cache.match(event.request)).then(response =>
        response || fetch(event.request)
      )
    );
  }
});
