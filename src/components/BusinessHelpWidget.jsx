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

  // Lenis scroll guard: widget.js #ai-widget-root ko body mein inject
  // karta hai — us par data-lenis-prevent lagana Lenis ka documented
  // opt-out hai, taake chat ke andar ka wheel/touch scroll page ko na
  // ghumaye aur message list natively scroll ho. Root kabhi bhi aa
  // sakta hai (script async load hota hai), is liye MutationObserver.
  useEffect(() => {
    const markRoot = (root) => root.setAttribute("data-lenis-prevent", "");
    const existing = document.getElementById("ai-widget-root");
    if (existing) {
      markRoot(existing);
      return;
    }
    const observer = new MutationObserver(() => {
      const root = document.getElementById("ai-widget-root");
      if (root) {
        markRoot(root);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
