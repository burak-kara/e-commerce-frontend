const CACHE_NAME = 'e-commerce-ozu';
const urlsToCache = ['/'];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        }),
    );
    // eslint-disable-next-line no-restricted-globals
    self.skipWaiting();
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request);
        }),
    );
});
