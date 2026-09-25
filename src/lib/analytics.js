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
