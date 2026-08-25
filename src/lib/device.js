/* Device capability detection — low-end devices par heavy 3D skip hota hai */

function detectLowEnd() {
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;

  const cores = navigator.hardwareConcurrency || 8;
  const mem = navigator.deviceMemory || 8; // GB (Chrome/Android)
  const coarse = window.matchMedia?.("(pointer: coarse)").matches;

  return cores <= 4 || mem <= 4 || (coarse && cores <= 6);
}

export const IS_LOW_END = detectLowEnd();

export default IS_LOW_END;
