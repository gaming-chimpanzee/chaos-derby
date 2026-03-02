/* Chaos Derby - Service Worker (https/localhost only; file:// won't register) */
const CACHE_NAME = 'chaos-derby-cache-v1';
const ASSETS = [
  './',
  './index.html',
  './balance.js',
  './assets.js',
  './manifest.json'
];

// install: pre-cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).then(()=>self.skipWaiting())
  );
});

// activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k===CACHE_NAME)?null:caches.delete(k)))
    ).then(()=>self.clients.claim())
  );
});

// fetch: cache-first for our assets, network fallback
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if(req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(hit => {
      if(hit) return hit;
      return fetch(req).then(res => {
        // cache same-origin GET responses
        try{
          const url = new URL(req.url);
          if(url.origin === location.origin){
            const copy = res.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
          }
        }catch(_){}
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
