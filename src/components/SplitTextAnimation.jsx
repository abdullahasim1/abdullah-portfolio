import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function SplitTextAnimation({ children, className = "", animationType = "chars", delay = 0 }) {
  const textRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Clean up previous animation
    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    // Create GSAP context for proper cleanup
    ctxRef.current = gsap.context(() => {
      const el = textRef.current;
      if (!el) return;

      // Simple fallback animation - animate the whole element
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: "power2.out",
        }
      );
    }, textRef);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [children, animationType, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}

export default SplitTextAnimation;
