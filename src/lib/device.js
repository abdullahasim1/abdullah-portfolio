// @ts-check
/* Device capability detection — 3D scenes (Three.js/R3F) sirf capable desktops par
   render hote hain. Phones/tablets par 3D skip hota hai kyunki:
   1. Hardware weak hota hai (fewer cores, less RAM)
   2. Touch devices par 3D scenes main-thread block karte hain (TBT/LCP hit)
   CSS fallbacks (glows, grid-floor, gradients) visuals sambhal lete hain.

   Software renderers (SwiftShader/llvmpipe — headless CI, GPU-less VMs,
   remote desktops) bhi "low-end" treat hote hain: wahan WebGL CPU pe chalta
   hai, jisse continuous 3D frameloop main thread ko block karta rehta hai
   (Lighthouse TBT me ~22s recurring tasks). */

function detectLowEnd() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return true;
  if (typeof WebGLRenderingContext === "undefined") return true; // WebGL hi nahi

  const cores = navigator.hardwareConcurrency || 8;
  const mem = /** @type {any} */ (navigator).deviceMemory || 8; // GB (Chrome/Android only)

  // pointer: coarse = touch (phones/tablets) — 3D skip, CSS fallback dikhao
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  // Narrow desktop windows bhi skip — 3D scene ke liye jagah nahi
  const smallScreen = window.matchMedia("(max-width: 767px)").matches;

  if (cores <= 2 || mem <= 1 || coarsePointer || smallScreen) return true;

  return detectSoftwareGL();
}

/* WebGL renderer ka asli naam nikal kar software-rendered stack detect karo.
   Context ko turant lose karke free rakhte hain (browsers ~16 contexts
   tak limit karte hain). */
function detectSoftwareGL() {
  try {
    const canvas = document.createElement("canvas");
    const gl = /** @type {WebGLRenderingContext | null} */ (
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
    if (!gl) return true; // WebGL available hi nahi → 3D skip

    const dbg = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = String(
      dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
    );
    gl.getExtension("WEBGL_lose_context")?.loseContext();

    return /swiftshader|llvmpipe|softpipe|software|mesa offscreen/i.test(renderer);
  } catch {
    return true; // koi bhi failure → safe side, 3D skip
  }
}

export const IS_LOW_END = detectLowEnd();

export default IS_LOW_END;
