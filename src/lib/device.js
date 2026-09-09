/* Device capability detection — 3D scenes (Three.js/R3F) sirf capable desktops par
   render hote hain. Phones/tablets par 3D skip hota hai kyunki:
   1. Hardware weak hota hai (fewer cores, less RAM)
   2. Touch devices par 3D scenes main-thread block karte hain (TBT/LCP hit)
   CSS fallbacks (glows, grid-floor, gradients) visuals sambhal lete hain. */

function detectLowEnd() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return true;
  if (typeof WebGLRenderingContext === "undefined") return true; // WebGL hi nahi

  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8; // GB (Chrome/Android only)

  // pointer: coarse = touch (phones/tablets) — 3D skip, CSS fallback dikhao
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  // Narrow desktop windows bhi skip — 3D scene ke liye jagah nahi
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;

  return cores <= 2 || mem <= 1 || coarsePointer || smallScreen;
}

export const IS_LOW_END = detectLowEnd();

export default IS_LOW_END;
