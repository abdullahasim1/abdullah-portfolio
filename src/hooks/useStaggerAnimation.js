import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useStaggerAnimation = (stagger = 0.08, delay = 0) => {
  const elementRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Clean up previous animation
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    ctxRef.current = gsap.context(() => {
      const elements = elementRef.current?.querySelectorAll("[data-stagger]");
      if (!elements || elements.length === 0) return;

      gsap.set(elements, { opacity: 0, y: 28 });

      // Motion spec: stagger 0.08s, 0.7s, premium bezier, animate ONCE
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: stagger,
        delay: delay,
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 88%",
          once: true,
        },
      });
    }, elementRef);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [stagger, delay]);

  return elementRef;
};
