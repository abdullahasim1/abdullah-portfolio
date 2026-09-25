---
title: Cutting portfolio LCP from 3.7s to 0.9s — a real performance audit
description: The exact fixes — code-splitting Three.js, deferring the service worker, rAF-throttling mouse handlers — that took my portfolio from a 0.9s LCP and what I measured at each step.
date: 2026-09-12
tags: Performance, Vite, Three.js, Core Web Vitals
---

My portfolio had a Lighthouse performance score that looked fine on desktop and fell apart on a mid-range phone. Field numbers told the real story: **LCP 3.7s, TBT 866ms**. Here is exactly what was wrong and what I changed.

## 1. Three.js was riding along on first load

The hero scene is nice, but nothing about a starfield is content. I was importing `three`, `@react-three/fiber` and `@react-three/drei` eagerly, so the browser had to download and parse a **~730KB chunk before first paint** even finished competing for the main thread.

**Fix:** every R3F component is now behind `React.lazy()`, and Vite's `manualChunks` keeps `three` in its own chunk so it never lands in the entry graph. The site background is deferred further with an idle hook, so it mounts only after the main thread has been quiet for a while.

## 2. The service worker was doing too much, too early

Cache-priming during install meant the SW was fetching assets while the page was still hydrating.

**Fix:** static pre-caching is now tolerant (a single 404 no longer fails the whole install), hashed assets use stale-while-revalidate, and navigations are network-first with a cache fallback. The SW only registers in production builds.

## 3. Mouse handlers were fighting the main thread

The cursor follower and tilt cards attached raw `mousemove` listeners that ran layout reads on every event.

**Fix:** a shared `useRafThrottle` hook collapses events into one callback per frame. Combined with viewport-gated frameloops (`useInViewport`) and DPR clamping on every canvas, the GPU work dropped to what is actually visible.

## The result

| Metric | Before | After |
| --- | --- | --- |
| LCP | 3.7s | 0.9s |
| TBT | 866ms | 406ms |
| 3D on first load | yes | no |

The lesson: **performance is mostly subtraction.** Defer the decoration, keep the content, and measure on a phone — not on the laptop that wrote the code.
