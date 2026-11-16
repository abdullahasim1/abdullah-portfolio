import { useEffect } from "react";

const WIDGET_SRC = "https://clone-bussiness-help.vercel.app/widget.js";
const BUSINESS_ID = "8";
const WIDGET_KEY = "cmwexoy200001le079xr7ps3o";

/**
 * Business Help chat widget — Abdullah ke apne Business Help product ka
 * site-wide embed (portfolio ka purana built-in assistant is se replace
 * hua, 2026-11-13). Widget public embed key se load hota hai; origin
 * allowlist Business Help dashboard mein set hai.
 *
 * Script sirf EK dafa inject hota hai: dobara mount (React StrictMode,
 * route changes) par maujooda script tag dekh kar ruk jata hai, aur
 * widget.js khud bhi #ai-widget-root ki mojoodgi par dobara render
 * nahi karta.
 */
export default function BusinessHelpWidget() {
  useEffect(() => {
    if (document.querySelector(`script[src="${WIDGET_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    script.setAttribute("data-business-id", BUSINESS_ID);
    script.setAttribute("data-widget-key", WIDGET_KEY);
    document.body.appendChild(script);
  }, []);

  // Lenis scroll guard + keyboard accessibility patch.
  // Vendor script launcher ko <span onclick> banata hai (keyboard se open
  // nahi hota — audit). Root ko mark karo aur launcher spans ko button
  // semantics + Enter/Space handler do. Widget apna launcher re-render
  // karta hai, is liye observer disconnect nahi hota.
  useEffect(() => {
    const upgraded = new WeakSet();

    const patch = () => {
      const root = document.getElementById("ai-widget-root");
      if (!root) return;
      root.setAttribute("data-lenis-prevent", "");
      root.querySelectorAll(".aiw-launcher-note > span").forEach((el) => {
        if (upgraded.has(el)) return;
        upgraded.add(el);
        el.setAttribute("role", "button");
        el.setAttribute("tabindex", "0");
        el.setAttribute(
          "aria-label",
          (el.textContent || "").trim() || "Open chat",
        );
        el.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            el.click();
          }
        });
      });
    };

    patch();
    const observer = new MutationObserver(patch);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
