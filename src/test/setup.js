import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
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

// rAF jsdom mein exist karta hai, lekin GSAP/anim loops ke liye deterministic banao
vi.stubGlobal("requestAnimationFrame", (cb) => setTimeout(() => cb(performance.now()), 0));
vi.stubGlobal("cancelAnimationFrame", (id) => clearTimeout(id));

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
