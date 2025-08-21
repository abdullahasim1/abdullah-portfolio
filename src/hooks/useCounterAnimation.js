import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useCounterAnimation = (targetValue, duration = 2, delay = 0) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    const trigger = ScrollTrigger.create({
      trigger: element,
      start: "top 80%",
      onEnter: () => {
        if (!isVisible) {
          setIsVisible(true);
          
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
      }
    });

    return () => {
      trigger.kill();
    };
  }, [targetValue, duration, delay, isVisible]);

  return elementRef;
};
