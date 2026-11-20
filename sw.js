/* Get By · Service Worker
   - Guarda la app en el dispositivo para que funcione sin internet.
   - Páginas, CSS y JS: primero busca en internet (así ves las actualizaciones) y, si no hay conexión, usa lo guardado.
   - Imágenes, íconos y fuentes: primero lo guardado (más rápido, ahorra datos).
   IMPORTANTE: cada vez que publiques cambios, subí el número de VERSION para que los celulares actualicen. */
const VERSION = "2026-11-20-3";
const CACHE = "getby-" + VERSION;

const PRECACHE = [
  "./", "index.html", "teoria-nivel1.html", "manifest.webmanifest",
  "starter-module.html", "phonetics-studio.html", "chronos-arcade.html", "comparatives-module.html",
  "airport-scramble.html", "hotel-checkin.html", "hotel-friends.html", "cafe-dialogue.html",
  "pharmacy-match.html", "gps-navigator.html", "spot-object.html", "fill-blanks.html", "sopa-letras.html",
  "assets/css/base.css", "assets/js/gb.js", "assets/js/curso.js", "assets/js/inicio.js", "assets/js/nav.js",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  "imagenes/mapa-ciudad-optimizado.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Si un archivo falla, no se cae toda la instalación
      Promise.all(PRECACHE.map((url) => cache.add(url).catch(() => null)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("getby-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const mismoOrigen = url.origin === self.location.origin;
  const esImagen = /\.(png|jpe?g|gif|webp|svg|ico|woff2?)$/i.test(url.pathname);

  if (mismoOrigen && !esImagen) {
    // Red primero, caché de respaldo
    event.respondWith(
      fetch(req).then((resp) => {
        if (resp && resp.ok) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
        return resp;
      }).catch(() => caches.match(req, { ignoreSearch: true }).then((hit) => hit || caches.match("index.html")))
    );
    return;
  }

  // Imágenes, íconos y fuentes externas (Google Fonts): caché primero
  event.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((resp) => {
      if (resp && (resp.ok || resp.type === "opaque")) { const copia = resp.clone(); caches.open(CACHE).then((c) => c.put(req, copia)); }
      return resp;
    }).catch(() => hit))
  );
});
