import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useCounterAnimation = (targetValue, duration = 2, delay = 0) => {
  const elementRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      once: true,
      onEnter: () => {
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        gsap.fromTo(
          element,
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: duration,
            delay: delay,
            ease: "power2.out",
            snap: { innerHTML: 1 },
            onUpdate: function() {
              element.innerHTML = Math.ceil(element.innerHTML);
            }
          }
        );
      }
    });

    return () => {
      trigger.kill();
    };
  }, [targetValue, duration, delay]);

  return elementRef;
};
