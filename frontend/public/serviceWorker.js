self.addEventListener("install", event => {
  console.log("installed ------");
  // // Perform install steps
  // event.waitUntil(
  //   caches.open(CACHE_NAME).then(function (cache) {
  //     console.log("Opened cache");
  //     return cache.addAll(urlsToCache);
  //   })
  // );
});

// Cache and return requests
self.addEventListener("fetch", event => {
  console.log("fetch is working", event);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// Update a service worker
self.addEventListener("activate", event => {
  console.log("activated ---", event);
});
