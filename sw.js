const CACHE_NAME = 'game-cache-v1';
// Add any other local assets (like 'icon.png') to this list if you add them later
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'manifest.json',
  'archive-research.png',
  'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.0/jszip.min.js'
];

// 1. Save the game files to cache immediately upon installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Serve the cached files instantly, even if the user is completely offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return the cached file if found; otherwise, try the network
      return cachedResponse || fetch(event.request);
    })
  );
});
