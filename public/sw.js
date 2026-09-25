const STATIC_CACHE = "portfolio-static-v3";
const DYNAMIC_CACHE = "portfolio-dynamic-v3";

// Static assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/og-image.jpg",
  "/IMG-20240224-WA0006.jpg",
  "/manifest.webmanifest",
];

const ASSET_EXT_RE = /\.(js|css|png|jpe?g|gif|ico|svg|webp|avif|woff2?)$/;

// Helper — sirf successful responses cache karo (404/500 cache poisoning se bachav)
function cachePut(cacheName, request, response) {
  if (!response || !response.ok || response.type === "opaque") {
    return Promise.resolve();
  }
  return caches
    .open(cacheName)
    .then((cache) => cache.put(request, response))
    .catch(() => {});
}

// Install event - cache static assets (ek 404 poora install fail na kare)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        Promise.all(
          STATIC_ASSETS.map((url) =>
            cache.add(url).catch(() => undefined),
          ),
        ),
      )
      .then(() => self.skipWaiting()),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE,
            )
            .map((cacheName) => caches.delete(cacheName)),
        );
      })
      .then(() => self.clients.claim()),
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith("http")) return;

  // Skip cross-origin non-asset requests (analytics etc.)
  if (url.origin !== self.location.origin && !ASSET_EXT_RE.test(url.pathname)) {
    return;
  }

  // API requests - network first, NO cache fallback (stale form submissions ka risk)
  if (
    url.pathname.startsWith("/api/") ||
    url.hostname.includes("web3forms.com")
  ) {
    event.respondWith(
      fetch(request).catch(() =>
        new Response(JSON.stringify({ success: false, message: "Offline" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    return;
  }

  // Hashed static assets - stale-while-revalidate (URLs immutable hoti hain)
  // Offline + cache miss par fetch reject hota tha → ab explicit fallback
  if (url.pathname.startsWith("/assets/") || ASSET_EXT_RE.test(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchAndCache = fetch(request)
          .then((response) => {
            if (response && response.ok) {
              const responseClone = response.clone();
              cachePut(STATIC_CACHE, request, responseClone);
            }
            return response;
          })
          .catch(() => {
            // Purana deploy + offline = missing hashed chunk → clear error
            return (
              cachedResponse ||
              new Response("Asset unavailable offline", {
                status: 503,
                headers: { "Content-Type": "text/plain" },
              })
            );
          });
        return cachedResponse ? cachedResponse : fetchAndCache;
      }),
    );
    return;
  }

  // HTML navigations - network first, cache fallback, phir offline fallback
  if (request.mode === "navigate" || request.headers.get("accept")?.includes("text/html")) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseClone = response.clone();
            cachePut(DYNAMIC_CACHE, request, responseClone);
          }
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match("/index.html")),
        ),
    );
    return;
  }

  // Default - network first, cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok) {
          const responseClone = response.clone();
          cachePut(DYNAMIC_CACHE, request, responseClone);
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});
