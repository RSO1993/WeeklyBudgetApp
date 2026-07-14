// Change this version number every time you update your code!
const CACHE_NAME = 'smart-budget-v8'; 

const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-512x512.png'
];

// 1. Install and cache the new files
self.addEventListener('install', event => {
  self.skipWaiting(); // Forces the new update to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Clear out the old versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 3. Serve the cached files so the app works offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
