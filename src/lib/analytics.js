// @ts-check
/**
 * Privacy-friendly analytics (Plausible) — sirf tab load hota hai jab
 * VITE_ANALYTICS_DOMAIN set ho. Koi cookie/trackers nahi, koi PII nahi.
 * Domain set na ho to bundle mein se script bilkul inject nahi hoti.
 */

const domain = import.meta.env.VITE_ANALYTICS_DOMAIN;
const enabled = Boolean(domain) && import.meta.env.PROD;

export function initAnalytics() {
  if (!enabled || document.getElementById("plausible-script")) return;

  const script = document.createElement("script");
  script.id = "plausible-script";
  script.defer = true;
  script.dataset.domain = domain;
  script.src = "https://plausible.io/js/script.js";
  document.head.appendChild(script);
}

/** Custom event bhejo (e.g. track("project-open", { id })) */
/**
 * @param {string} name
 * @param {Record<string, unknown>} [props]
 */
export function track(name, props) {
  if (!enabled) return;
  const w = /** @type {any} */ (window);
  if (typeof w.plausible === "function") {
    w.plausible(name, props ? { props } : undefined);
  }
}

export const analyticsEnabled = enabled;

/* ---------- Auto-tracking helpers (section views, outbound clicks, scroll depth) ---------- */

/** @type {IntersectionObserver | null} */
let sectionObserver = null;
/** @type {Set<number>} */
let scrollDepthTracked = new Set();

/** Section views via IntersectionObserver — tracks when user actually sees a section */
export function initSectionTracking() {
  if (!enabled || sectionObserver) return;

  /** @type {NodeListOf<HTMLElement>} */
  const sections = document.querySelectorAll("section[id]");
  if (sections.length === 0) return;

  /** @type {IntersectionObserver} */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          const id = entry.target.id;
          if (id) track("section-view", { section: id });
        }
      });
    },
    { threshold: [0.5], rootMargin: "0px 0px -20% 0px" },
  );

  sectionObserver = observer;
  sections.forEach((sec) => observer.observe(sec));
}

/** Outbound link tracking — captures clicks to external domains */
export function initOutboundTracking() {
  if (!enabled) return;

  document.addEventListener("click", /** @param {MouseEvent} e */ (e) => {
    /** @type {HTMLAnchorElement | null} */
    const link = e.target instanceof Element ? e.target.closest("a[href]") : null;
    if (!link) return;

    const href = link.getAttribute("href");
    if (!href) return;

    try {
      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) {
        track("outbound-click", {
          url: href,
          domain: url.hostname,
          text: link.textContent?.trim().slice(0, 50),
        });
      }
    } catch {
      // invalid URL, skip
    }
  });
}

/** Scroll depth tracking — fires at 25%, 50%, 75%, 100% of page */
export function initScrollDepthTracking() {
  if (!enabled) return;

  /** @type {number[]} */
  const thresholds = [25, 50, 75, 100];

  const handleScroll = () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const percentage = Math.min(100, Math.round((scrolled / docHeight) * 100));

    thresholds.forEach((t) => {
      if (percentage >= t && !scrollDepthTracked.has(t)) {
        scrollDepthTracked.add(t);
        track("scroll-depth", { depth: t });
      }
    });
  };

  // Throttle scroll handler
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/** Initialize all auto-tracking in one call */
export function initAutoTracking() {
  initSectionTracking();
  initOutboundTracking();
  initScrollDepthTracking();
}

/** Cleanup (useful for testing or SPA navigation) */
export function destroyAutoTracking() {
  /** @type {IntersectionObserver | null} */
  const obs = sectionObserver;
  if (obs !== null) {
    obs.disconnect();
    sectionObserver = null;
  }
  scrollDepthTracked.clear();
}