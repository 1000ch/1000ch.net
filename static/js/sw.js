const cacheKey = '20161229';

self.addEventListener('activate', e => {
  const deletion = caches.keys().then(keys => {
    const deletions = keys
      .filter(key => key !== cacheKey)
      .map(key => caches.delete(key));

    return Promise.all(deletions);
  });

  e.waitUntil(deletion);
});

self.addEventListener('fetch', e => {
  const response = caches.match(e.request).then(response => {
    return response || fetch(e.request.clone()).then(response => {
      if (e.request.url.endsWith('.html')) {
        caches.open(cacheKey).then(cache => cache.put(e.request, response.clone()));
      }

      return response;
    });
  });

  e.respondWith(response);
});
