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

    ctxRef.current = gsap.context(() => {
      gsap.utils.toArray(elements).forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
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
