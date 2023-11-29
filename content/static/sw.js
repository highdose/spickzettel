const version = "v.1:";
const cacheName = version + 'pages';
const offlinePages = [
    '',
    'index.html',
    'theme/js/utils.js',
    'theme/css/main03.css',
    'pages/about.html',
    'pages/contribute.html',
    'pages/impressum.html',
    "/pages/hypertensive-krise.html",
    "/pages/scape.html",
    "/pages/hypotonie.html",
    "/pages/kardiogener-schock.html",
    "/pages/septischer-schock.html",
    "/pages/anaphylaxie.html",
    "/pages/intubation.html",
    "/pages/post-intubation.html",
    "/pages/post-resus.html",
    "/pages/lungenembolie-verdacht",
    "/pages/schwere-lungenembolie",
    "/pages/heparin",
];
self.addEventListener('install', function (event) {
    // service worker installed
    // now load offlinepages
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => cache.addAll(offlinePages))
    );
});
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(cached => {
                // Fetch from network for "eventually fresh" response 
                const networked = fetch(event.request)
                    .then(fetchedFromNetwork)
                    .catch(unableToResolve);

                return cached || networked;

                function fetchedFromNetwork(response) {
                    const responseCopy = response.clone();
                    caches
                        .open(cacheName)
                        .then(cache => cache.put(event.request, responseCopy));

                    // Return the response so that the promise is settled in fulfillment.
                    return response;
                }

                function unableToResolve() {
                    /* There's a couple of things we can do here.
                       - Test the Accept header and then return one of the `offlinePages`
                         e.g: `return caches.match('/some/cached/image.png')`
                       - You should also consider the origin. It's easier to decide what
                         "unavailable" means for requests against your origins than for requests
                         against a third party, such as an ad provider.
                       - Generate a Response programmaticaly, as shown below, and return that.
                    */

                    return new Response('<h1>Service Unavailable</h1>', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    });
                }
            })
    );
});
/* The activate event fires after a service worker has been 
   successfully installed.
   It is most useful when phasing out an older version of a service worker, 
   as at this point you know that the new worker was installed correctly. 
   In this example, we delete old caches that don't match the version in the 
   worker we just finished
   installing.
*/
self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches
            .keys()
            .then(keys => Promise.all(
                keys
                    .filter(key => !key.startsWith(version))
                    .map(key => caches.delete(key))
            ))
    );
});