import { useEffect, useState } from "react";

/* Pinned / scroll-scrubbed effects (ExpertsCloud-style showcases) sirf
   desktop par chalte hain — chhoti screens par sections apne maujooda
   stacked layouts mein rehte hain, pixel-for-pixel. Reduced-motion
   users ke liye bhi effects band hain (codebase ka maujooda pattern).
   Ye hook React ko batata hai ke FX variant DOM render karna hai ya
   nahi; asal GSAP setup har component apne effect mein isi flag se
   gate karta hai. */
export const FX_DESKTOP_QUERY = "(min-width: 1024px)";
export const FX_REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function computeFxEnabled() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return (
    window.matchMedia(FX_DESKTOP_QUERY).matches &&
    !window.matchMedia(FX_REDUCED_QUERY).matches
  );
}

export function useScrollFxEnabled() {
  const [enabled, setEnabled] = useState(computeFxEnabled);

  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const mq = window.matchMedia(FX_DESKTOP_QUERY);
    const rm = window.matchMedia(FX_REDUCED_QUERY);
    const update = () => setEnabled(mq.matches && !rm.matches);
    update();
    mq.addEventListener?.("change", update);
    rm.addEventListener?.("change", update);
    return () => {
      mq.removeEventListener?.("change", update);
      rm.removeEventListener?.("change", update);
    };
  }, []);

  return enabled;
}
