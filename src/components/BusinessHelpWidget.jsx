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

  return null;
}
