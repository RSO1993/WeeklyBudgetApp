javascript
// A simple service worker to satisfy PWA install requirements
self.addEventListener('install', (event) => {
  console.log('Service worker installed');
});

self.addEventListener('fetch', (event) => {
  // This allows the app to bypass offline errors and satisfies the PWA fetch requirement
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});