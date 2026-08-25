/* Device capability detection — sirf genuinely weak devices par heavy 3D skip hota hai.
   Note: navigator.deviceMemory sirf rough buckets deta hai (0.25/0.5/1/2/4/8),
   aur zyada tar capable phones 4 report karte hain — is liye threshold <= 2 rakha hai. */

function detectLowEnd() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;
  if (typeof WebGLRenderingContext === "undefined") return true; // WebGL hi nahi

  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8; // GB (Chrome/Android only)

  return cores <= 2 || mem <= 1;
}

export const IS_LOW_END = detectLowEnd();

export default IS_LOW_END;
