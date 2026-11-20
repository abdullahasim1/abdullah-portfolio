import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// jsdom mein matchMedia nahi hota — theme/prefers-reduced-motion checks chahiye
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// IntersectionObserver (useInViewport/scroll reveals) ka no-op stub
if (!window.IntersectionObserver) {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  };
}

// rAF jsdom mein exist karta hai, lekin GSAP/anim loops ke liye deterministic banao.
// NOTE: vi.stubGlobal yahan kaam nahi karta — Vitest har test file ke baad stub
// restore kar deta hai, aur ScrollTrigger ka _rafBugFix loop (gsap/ScrollTrigger.js)
// bare global `requestAnimationFrame` ko dobara call karta rehta hai. File khatam
// hone ke baad fire hone wala callback phir `ReferenceError: requestAnimationFrame
// is not defined` deta hai (77/77 tests pass hone ke bawajood CI red). Is liye
// seedha globalThis + window par permanent assignment — ye teardown se bachti hai.
const rafPolyfill = (cb) => setTimeout(() => cb(performance.now()), 0);
const cancelRafPolyfill = (id) => clearTimeout(id);
globalThis.requestAnimationFrame = rafPolyfill;
globalThis.cancelAnimationFrame = cancelRafPolyfill;
if (typeof window !== "undefined") {
  window.requestAnimationFrame = rafPolyfill;
  window.cancelAnimationFrame = cancelRafPolyfill;
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
