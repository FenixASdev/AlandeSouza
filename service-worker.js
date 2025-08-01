const CACHE_NAME = 'app-cache-v1';
const FILES_TO_CACHE = [
  '/AlandeSouza/',
  '/AlandeSouza/index.html',
  '/AlandeSouza/style.css',
  '/AlandeSouza/manifest.json',
  '/AlandeSouza/js/main.js',
  '/AlandeSouza/js/clientes.js',
  '/AlandeSouza/js/produtos.js',
  '/AlandeSouza/js/pedidos.js',
  '/AlandeSouza/js/relatorios.js',
  '/AlandeSouza/js/storage.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
