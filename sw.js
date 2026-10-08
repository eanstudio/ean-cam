const CACHE_NAME = 'ean-skeneris-shell-v21';
const APP_SHELL = new URL('./index.html', self.registration.scope).href;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.add(APP_SHELL))
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
  if (event.request.method !== 'GET' || event.request.mode !== 'navigate') return;

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(APP_SHELL).then(response => {
        if (!response) throw new Error('Lietotnes sākuma lapa nav pieejama bezsaistē.');
        return response;
      })
    )
  );
});
