import { useEffect, useRef, useState } from "react";
import { getLenis } from "../lib/smoothScroll";

/* Header hide-on-scroll (ExpertsCloud pattern):
   - neeche scroll → header chhup jata hai
   - upar scroll → header wapas aa jata hai
   - page ke top ke qareeb hamesha visible
   - `suspended` ho (mobile menu khula ho, ya keyboard focus header ke
     andar ho) to force-visible — focus kabhi chhupe hue header mein
     trap nahi hota.

   Signal ka source Lenis hai (direction + velocity, animatedScroll
   par mabni) — raw window.scrollY nahi. Wajah: GSAP pin sections ke
   dauran pin-spacer recalcs aur ScrollTrigger refresh native scroll
   position ko intent ke khilaf jhatka de sakte hain (mid-pin pause
   par header ghalti se wapas aa jata tha, dedicated pages par neeche
   scroll par bhi visible reh jata tha). Lenis ka animatedScroll sirf
   user ki scroll intent se harkat karta hai: sustained downward
   scroll (pin plateaus samait) header ko hidden rakhta hai, pause
   par velocity 0 ho jati hai aur state barqarar rehta hai (koi flip
   nahi), aur ek hi upward gesture foran wapas le ata hai.

   Lenis maujood na ho (initialization se pehle, ya reduced-motion —
   wahan init hota hi nahi) to window scroll par wohi threshold
   accumulation fallback chalta hai. Lenis idle-callback se late init
   hota hai, is liye hook poll karke usay milte hi Lenis par switch
   kar deta hai aur window listener hata deta hai. */
export function useHideOnScroll({
  topOffset = 120,
  threshold = 6,
  suspended = false,
} = {}) {
  const [hidden, setHidden] = useState(false);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;

  useEffect(() => {
    if (suspended) setHidden(false);
  }, [suspended]);

  useEffect(() => {
    /* --- Native fallback: pichla threshold-accumulation logic --- */
    let lastY = window.scrollY;
    const onWindowScroll = () => {
      const y = window.scrollY;
      if (suspendedRef.current || y <= topOffset) {
        lastY = y;
        setHidden(false);
        return;
      }
      const dy = y - lastY;
      if (dy > threshold) {
        lastY = y;
        setHidden(true);
      } else if (dy < -threshold) {
        lastY = y;
        setHidden(false);
      }
    };
    onWindowScroll();
    window.addEventListener("scroll", onWindowScroll, { passive: true });

    /* --- Lenis mode: direction/velocity se drive ---
       velocity = animatedScroll ka per-frame delta. Frames ki
       velocity accumulate hoti hai; threshold cross hone par hi
       decision. Direction badle to accumulation reset. velocity 0
       (pause) par sample ignore — state nahi badalta. */
    let lenis = null;
    let acc = 0;
    const onLenisScroll = (e) => {
      const y = e.animatedScroll ?? e.scroll ?? 0;
      if (suspendedRef.current || y <= topOffset) {
        acc = 0;
        setHidden(false);
        return;
      }
      const v = e.velocity ?? 0;
      if (v === 0) return;
      if ((acc > 0 && v < 0) || (acc < 0 && v > 0)) acc = 0;
      acc += v;
      if (acc > threshold) {
        acc = 0;
        setHidden(true);
      } else if (acc < -threshold) {
        acc = 0;
        setHidden(false);
      }
    };
    const attachLenis = () => {
      const instance = getLenis();
      if (!instance) return false;
      lenis = instance;
      window.removeEventListener("scroll", onWindowScroll);
      instance.on("scroll", onLenisScroll);
      return true;
    };
    let timer = null;
    if (!attachLenis()) {
      timer = setInterval(() => {
        if (attachLenis()) {
          clearInterval(timer);
          timer = null;
        }
      }, 250);
    }

    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      if (timer) clearInterval(timer);
      if (lenis) lenis.off("scroll", onLenisScroll);
    };
  }, [topOffset, threshold]);

  return hidden;
}
