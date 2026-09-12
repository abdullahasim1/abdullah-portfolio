import { useEffect, useState } from "react";

/**
 * Heavy chunks (3D, below-fold sections) ko initial load se hata kar
 * idle time pe defer karta hai. LCP/TBT ke liye — pehle content render ho.
 *
 * @param {number} timeoutMs — force timeout (idle na mile to bhi itne ms ke
 *   baad defer ho jata hai). Default 2000.
 * @param {number} delayMs — defer hone ke baad itna ms aur wait (dusre deferred
 *   groups ko spread karne ke liye — ek frame mein sab evaluate na ho).
 */
export function useIdleDeferred(timeoutMs = 2000, delayMs = 0) {
  const [deferred, setDeferred] = useState(false);

  useEffect(() => {
    // Agar tab background mein hai, visible hote hi defer
    if (document.visibilityState === "hidden") {
      const onVisible = () => {
        if (document.visibilityState === "visible") {
          setDeferred(true);
          document.removeEventListener("visibilitychange", onVisible);
        }
      };
      document.addEventListener("visibilitychange", onVisible);
      return () => document.removeEventListener("visibilitychange", onVisible);
    }

    let done = false;
    const mark = () => {
      if (done) return;
      done = true;
      if (delayMs > 0) {
        setTimeout(() => setDeferred(true), delayMs);
      } else {
        setDeferred(true);
      }
    };

    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(mark, { timeout: timeoutMs });
      return () => {
        cancelIdleCallback(id);
        mark();
      };
    }
    const t = setTimeout(mark, Math.max(400, timeoutMs - 200));
    return () => {
      clearTimeout(t);
      mark();
    };
  }, [timeoutMs, delayMs]);

  return deferred;
}
