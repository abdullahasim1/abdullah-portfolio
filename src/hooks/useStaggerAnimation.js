import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useStaggerAnimation = (stagger = 0.1, delay = 0) => {
  const elementRef = useRef(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const elements = elementRef.current.querySelectorAll("[data-stagger]");
    
    gsap.set(elements, { opacity: 0, y: 30 });
    
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: stagger,
      delay: delay,
      ease: "power2.out"
    });
  }, [stagger, delay]);

  return elementRef;
};
