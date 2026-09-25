---
title: How I split a React 19 + Three.js app without breaking the bundle
description: Practical patterns for code-splitting a Vite + React app that ships WebGL — lazy sections, manual chunks, module preload pitfalls, and the circular-dependency trap with react-three-fiber.
date: 2026-08-28
tags: React, Vite, Architecture, Three.js
---

Code splitting looks easy until one day your "optimised" build downloads the 3D engine on a 3G connection. These are the patterns that actually held up in production on my portfolio.

## Split the page, not just the components

My app is a single scrolling page with eleven sections. Lazy-loading `Contact` while eagerly importing `Projects` buys you nothing — the browser still waits for the entry graph.

So **every below-the-fold section** is a `React.lazy()` import wrapped in one `<Suspense>`. The entry chunk contains the hero, the navbar and the shell. Everything else streams in after first paint.

## Let Vite's modulepreload work for you — carefully

Vite adds `<link rel="modulepreload">` for every dependency of your entry. If your entry touches `three` even once, the browser preloads the whole 3D chunk for every visitor, and your split was theatre.

The fix is boring: keep heavy imports inside `lazy()` callbacks only, and turn off the polyfill you do not need:

```js
build: {
  modulePreload: { polyfill: false },
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes("node_modules/three/")) return "three";
        if (id.includes("node_modules/gsap/")) return "gsap";
      },
    },
  },
}
```

## Do not hand-split react-three-fiber

It is tempting to pull `react`, `react-dom` and `r3f` into separate vendor chunks. **Do not.** `react-reconciler` (r3f's dependency) reaches into React internals; manual splitting creates circular chunk dependencies and can drag r3f back into the entry graph. Let small vendors stay next to the index chunk — gzip keeps them honest.

## Defer by idle, not by timer

A `setTimeout(() => mountBackground(), 2000)` fires during a user's scroll and competes with it. An idle-deferred hook (`requestIdleCallback` with a timeout guard) waits for quiet time, which is exactly when you want decoration to arrive.

## Rule of thumb

If a chunk contains **zero bytes of content the user came for**, it must not be in the critical path. Split it, preload-guard it, and verify on a throttled mobile profile — not in your devtools on fibre.
