import { useEffect, useRef, useState } from "react";

/* Header hide-on-scroll (ExpertsCloud pattern):
   - neeche scroll → header chhup jata hai
   - upar scroll → header wapas aa jata hai
   - page ke top ke qareeb hamesha visible
   - `suspended` ho (mobile menu khula ho, ya keyboard focus header ke
     andar ho) to force-visible — focus kabhi chhupe hue header mein
     trap nahi hota.
   Chhote jitter (±threshold px) par state flip nahi hota; lastY sirf
   decision par update hota hai taake slow drift bhi accumulate ho. */
export function useHideOnScroll({
  topOffset = 120,
  threshold = 6,
  suspended = false,
} = {}) {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const suspendedRef = useRef(suspended);
  suspendedRef.current = suspended;

  useEffect(() => {
    if (suspended) setHidden(false);
  }, [suspended]);

  useEffect(() => {
    lastYRef.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (suspendedRef.current || y <= topOffset) {
        lastYRef.current = y;
        setHidden(false);
        return;
      }
      const dy = y - lastYRef.current;
      if (dy > threshold) {
        lastYRef.current = y;
        setHidden(true);
      } else if (dy < -threshold) {
        lastYRef.current = y;
        setHidden(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [topOffset, threshold]);

  return hidden;
}
