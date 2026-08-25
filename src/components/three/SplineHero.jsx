import React, { Suspense, lazy } from "react";

/**
 * ── SPLINE 3D SCENE ────────────────────────────────────────────────
 *
 * Apna Spline scene use karne ke liye:
 *   1. spline.design pe open karo → apna model design karo
 *   2. Export → React (Code) → copy the scene URL
 *      (looks like: https://prod.spline.design/XXXXXX/scene.splinecode)
 *   3. Neeche SPLINE_SCENE_URL mein paste kar do — bas!
 *
 * Agar Spline ki jagah wapas built-in Three.js scene chahiye toh
 * Home.jsx mein USE_SPLINE_HERO = false kar do.
 */
export const SPLINE_SCENE_URL =
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"; // placeholder demo scene

const Spline = lazy(() => import("@splinetool/react-spline"));

function SplineHero({ url = SPLINE_SCENE_URL }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none [&_canvas]:!w-full [&_canvas]:!h-full"
      aria-hidden="true"
    >
      {/* Glow fallback while the scene loads */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[110px]" />
      <Suspense fallback={null}>
        <Spline scene={url} style={{ width: "100%", height: "100%" }} />
      </Suspense>
    </div>
  );
}

export default SplineHero;
