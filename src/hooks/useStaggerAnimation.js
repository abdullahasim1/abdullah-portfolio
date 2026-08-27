import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useStaggerAnimation = (stagger = 0.1, delay = 0) => {
  const elementRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    // Clean up previous animation
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    ctxRef.current = gsap.context(() => {
      const elements = elementRef.current?.querySelectorAll("[data-stagger]");
      if (!elements || elements.length === 0) return;

      gsap.set(elements, { opacity: 0, y: 30 });

      // Use ScrollTrigger for each element
      elements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // Also apply stagger to the group
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: stagger,
        delay: delay,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
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
