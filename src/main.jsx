import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./index.css";
import App from "./App.jsx";
import { initWebMCP } from "./webmcp";
import { initSmoothScroll } from "./lib/smoothScroll";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </StrictMode>
);

initSmoothScroll();
initWebMCP();
