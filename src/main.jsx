import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initTheme } from "./lib/theme";

// Render se pehle theme apply — flash (FOUC) se bachne ke liye
initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered:', registration.scope);
      })
      .catch((error) => {
        console.log('SW registration failed:', error);
      });
  });
}

// Defer non-critical initialization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
  });
} else {
  setTimeout(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
  }, 100);
}
