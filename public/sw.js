const STATIC_CACHE = "portfolio-static-v2";
const DYNAMIC_CACHE = "portfolio-dynamic-v2";

// Static assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/og-image.png",
  "/IMG-20240224-WA0006.jpg",
  "/manifest.webmanifest",
];

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

// Install event - cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
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
  if (url.origin !== self.location.origin && !/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/.test(url.pathname)) {
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
  if (url.pathname.startsWith("/assets/") || url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchAndCache = fetch(request).then((response) => {
          if (response && response.ok) {
            const responseClone = response.clone();
            cachePut(STATIC_CACHE, request, responseClone);
          }
          return response;
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
