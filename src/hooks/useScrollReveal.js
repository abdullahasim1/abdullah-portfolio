import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(targetSelector, options = {}) {
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const elements =
      typeof targetSelector === "string"
        ? document.querySelectorAll(targetSelector)
        : targetSelector;
    if (!elements || elements.length === 0) return;

    const parsedOptions = JSON.parse(optionsKey);

    const ctx = gsap.context(() => {
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
          ...parsedOptions,
        });
      });
    });

    return () => ctx.revert();
  }, [targetSelector, optionsKey]);
}
