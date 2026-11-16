import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initTheme } from "./lib/theme";
import { initAnalytics } from "./lib/analytics";

// Render se pehle theme apply — flash (FOUC) se bachne ke liye
initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for caching (production only — dev assets cache ho kar stale ho jate hain).
// Update flow: naya worker install hota hai lekin wait karta hai; sticky
// "Refresh" toast user ko dikhta hai. Pehle toast 0ms mein hide ho jata tha
// aur pointer-events:none tha, is liye update kabhi apply nahi hota tha.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        let refreshing = false;

        const showUpdateToast = (worker) => {
          if (document.getElementById("aa-update-toast")) return;
          const toast = document.createElement("div");
          toast.id = "aa-update-toast";
          toast.setAttribute("role", "status");
          toast.setAttribute("aria-live", "polite");
          toast.style.cssText =
            "position:fixed;bottom:24px;left:24px;z-index:9999;display:flex;align-items:center;gap:12px;" +
            "padding:12px 16px;border-radius:14px;background:#0f172a;color:#fff;font:500 14px/1.4 Inter,sans-serif;" +
            "box-shadow:0 16px 40px rgba(15,23,42,.35);max-width:calc(100vw - 48px)";
          const text = document.createElement("span");
          text.textContent = "New version available.";
          const button = document.createElement("button");
          button.type = "button";
          button.textContent = "Refresh";
          button.style.cssText =
            "border:0;border-radius:999px;padding:7px 14px;background:#7c3aed;color:#fff;font-weight:600;cursor:pointer";
          button.addEventListener("click", () => {
            if (refreshing) return;
            refreshing = true;
            button.disabled = true;
            button.textContent = "Refreshing…";
            worker.postMessage("skipWaiting");
          });
          toast.append(text, button);
          document.body.appendChild(toast);
        };

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;
          if (!newWorker) return;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              showUpdateToast(newWorker);
            }
          });
        });

        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) return;
          window.location.reload();
        });
      })
      .catch(() => {});
  });
}

// Defer non-critical initialization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
    initAnalytics();
    import("./lib/analytics").then((m) => m.initAutoTracking());
  });
} else {
  setTimeout(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
    initAnalytics();
    import("./lib/analytics").then((m) => m.initAutoTracking());
  }, 100);
}
