import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

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
    import("@vercel/analytics/react").then((m) => {
      const { Analytics } = m;
      const root = document.getElementById("root");
      if (root) {
        const div = document.createElement("div");
        root.appendChild(div);
        // Lazy load analytics
      }
    });
  });
} else {
  // Fallback for browsers without requestIdleCallback
  setTimeout(() => {
    import("./lib/smoothScroll").then((m) => m.initSmoothScroll());
    import("./webmcp").then((m) => m.initWebMCP());
  }, 100);
}
