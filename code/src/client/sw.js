const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  '/',
  '/share-target/',
]

self.addEventListener('install', function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function (cache) {
      console.log('Opened cache')
      return cache.addAll(urlsToCache)
    }),
  )
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
    .then(function (response) {
        // only use cache when no fetching possible
        try {
          return fetch(event.request)
        } catch (ex) {
          if (response) {
            return response
          }
          throw ex
        }
      },
    ),
  )
})
