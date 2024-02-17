self.addEventListener('install', function (e) {
    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches
            .keys()
            .then(keys => Promise.all(
                keys.map(key => caches.delete(key))
            ))
    );
    self.registration.unregister()
        .then(function () {
            return self.clients.matchAll();
        })
        .then(function (clients) {
            clients.forEach(client => client.navigate(client.url))
        });
});