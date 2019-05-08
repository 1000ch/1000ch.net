const CACHE_KEY = '20200101';
const CACHE_FILES = [
  'base.css',
  'components.css',
  'font.css',
  'generic.css',
  'objects.css',
  'settings.css',
  'tools.css',
  'trumps.css',
  'NotoSansCJKjp-Bold.woff2',
  'NotoSansCJKjp-Regular.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', e => {
  const deletion = caches.keys()
    .then(keys => keys.filter(key => key !== CACHE_KEY))
    .then(keys => Promise.all(keys.map(key => caches.delete(key))));

  e.waitUntil(deletion.then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  if (!CACHE_FILES.some(file => e.request.url.includes(file))) {
    return;
  }

  const cache = caches.match(e.request).then(response => {
    return response || fetch(e.request.clone()).then(response => {
      if (response.ok) {
        const clone = response.clone();
        caches.open(CACHE_KEY).then(cache => cache.put(e.request, clone));
      }

      return response;
    });
  });

  e.respondWith(cache);
});
