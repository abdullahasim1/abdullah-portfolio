import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { initPerformanceOptimizations } from "./lib/performance";

// Initialize performance optimizations immediately
initPerformanceOptimizations();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Defer non-critical initialization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
  }, 100);
}
