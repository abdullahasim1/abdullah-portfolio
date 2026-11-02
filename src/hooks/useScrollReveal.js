import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(targetSelector, options = {}) {
  const optionsRef = useRef(options);
  const ctxRef = useRef(null);

  useEffect(() => {
    // Update options ref without causing re-render
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    const elements =
      typeof targetSelector === "string"
        ? document.querySelectorAll(targetSelector)
        : targetSelector;
    if (!elements || elements.length === 0) return;

    // Clean up previous animation
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    /* Motion spec: fade-up 28px, 0.7s, premium bezier, animate ONCE.
       Reduced-motion users skip reveals entirely (content just shows). */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    ctxRef.current = gsap.context(() => {
      gsap.utils.toArray(elements).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 28,
          duration: 0.7,
          ease: "cubic-bezier(0.22, 1, 0.36, 1)",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
          ...optionsRef.current,
        });
      });
    });

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [targetSelector]);
}
