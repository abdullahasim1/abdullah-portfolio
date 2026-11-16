// @ts-check
/* Device capability detection — splash jaisi heavy intros sirf capable
   desktops par chalte hain. Phones/tablets/low-core machines par skip.

   NOTE: pehle yahan ek throwaway WebGL context bana kar software renderer
   (SwiftShader/llvmpipe) detect hota tha. 3D scenes remove ho chuke hain,
   is liye woh synchronous GPU probe ab sirf startup cost thi — hata diya
   gaya (Nov 2026 audit). */

function detectLowEnd() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return true;

  const cores = navigator.hardwareConcurrency || 8;
  const mem = /** @type {any} */ (navigator).deviceMemory || 8; // GB (Chrome/Android only)

  // pointer: coarse = touch (phones/tablets)
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  // Narrow desktop windows bhi skip
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;

  return cores <= 2 || mem <= 1 || coarsePointer || smallScreen;
}

export const IS_LOW_END = detectLowEnd();

export default IS_LOW_END;
