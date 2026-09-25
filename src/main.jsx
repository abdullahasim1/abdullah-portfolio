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

// Register service worker for caching (production only — dev assets cache ho kar stale ho jate hain)
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      let refreshing = false;
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (!newWorker) return;
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version ready — show toast
            import('./lib/toast').then((m) => {
              m.showToast('New version available — click to refresh', 0);
              // Make toast clickable to refresh
              const toastEl = document.getElementById('aa-toast');
              if (toastEl) {
                toastEl.style.cursor = 'pointer';
                toastEl.onclick = () => {
                  if (!refreshing) {
                    refreshing = true;
                    window.location.reload();
                  }
                };
              }
            });
          }
        });
      });
      let controllerChangeHandled = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (controllerChangeHandled) return;
        controllerChangeHandled = true;
        // Optionally auto-refresh or show toast
      });
    }).catch(() => {});
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
