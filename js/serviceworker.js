// asignar un nombre y una versión de la cache
const CACHE_NAME = 'v1_cache_pwa_short';

// array de ficheros a "cachear" en la aplicación
const URLS_TO_CACHE = [
    './',
    './css/styles.css',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png',
    './js/main.js',
]

// Eventos: la variable "self" sería el propio "ServiceWorker"
// ... evento INSTALL: instalar la aplicación (instalación del ServiceWorker y guardar en cache los recursos estáticos)
self.addEventListener('install', function(e) {
    e.waitUntil( // Inicia una espera
        caches.open(CACHE_NAME) // Abrir la cache
        .then(function(cache) { // Promesa que se ejecuta cuando se abra la cache
            cache.addAll(URLS_TO_CACHE) // Añadir los ficheros a la cache
                .then(function() { // Promesa que se lanza cuando se hayan cacheado los ficheros
                    self.skipWaiting(); // Detiene la espera
                });
        })
        .catch(function(err) {
            console.log('No se ha registrado la cache', err);
        })
    );
});
// ... evento ACTIVATE: activar la aplicación para que funcione sin conexión
self.addEventListener('activate', function(e) {
    const CACHE_WHITE_LIST = [CACHE_NAME];
    e.waitUntil(
        caches.keys() // Devuelve todos los elementos que hay en la cache
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) { // Recorrer todos los elementos cacheados ...
                    if (CACHE_WHITE_LIST.indexOf(cacheName) === -1) {
                        // ... Borrar de la cache los elementos que no se necesitan
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(function() {
            self.clients.claim(); // Activa la cache actual
        })
        .catch(function(err) {
            console.log(err);
        })
    );
});
// ... evento FETCH: actualizar la aplicación. Al solicitar una URL, mira si está en la cache y, si no está, las solicita al servidor
self.addEventListener('fetch', function(e) {
    e.respondWith(
        caches.match(e.request)
        .then(function(res) {
            if (res) {
                // devolver los datos desde cache
                return res;
            } else {
                // Si no está en cache, se recupera del servidor mediante una petición AJAX via "fetch"
                return fetch(e.request);
            }
        })
    )
});