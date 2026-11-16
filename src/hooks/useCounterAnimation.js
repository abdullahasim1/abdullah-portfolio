import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Count-up animation for a React-owned element.
 *
 * IMPORTANT: pehle yeh hook `element.innerHTML` likhta tha. React ka text
 * node GSAP se replace ho jata tha aur baad mein React ke reconcile par
 * `NotFoundError: Failed to execute 'removeChild'` aata tha (Experience
 * section ErrorBoundary fallback — Nov 2026 audit). Ab sirf React ke
 * bahar wala `textContent` likha jata hai, node replace nahi hota.
 *
 * @param {number|string} targetValue
 * @param {number} [duration]
 * @param {number} [delay]
 */
export const useCounterAnimation = (targetValue, duration = 2, delay = 0) => {
  const elementRef = useRef(null);

  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    const finalValue = Number(targetValue) || 0;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      element.textContent = String(finalValue);
      return undefined;
    }

    element.textContent = "0";
    const state = { value: 0 };
    /** @type {gsap.core.Tween | null} */
    let tween = null;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      once: true,
      onEnter: () => {
        tween = gsap.to(state, {
          value: finalValue,
          duration,
          delay,
          ease: "power2.out",
          onUpdate: () => {
            element.textContent = String(Math.ceil(state.value));
          },
          onComplete: () => {
            element.textContent = String(finalValue);
          },
        });
      },
    });

    return () => {
      trigger.kill();
      tween?.kill();
    };
  }, [targetValue, duration, delay]);

  return elementRef;
};

export default useCounterAnimation;
