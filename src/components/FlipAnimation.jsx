import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";

// Register Flip plugin
gsap.registerPlugin(Flip);

function FlipAnimation({ children, className = "", trigger = "hover" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const elements = container.querySelectorAll("[data-flip]");

    elements.forEach((element) => {
      if (trigger === "hover") {
        element.addEventListener("mouseenter", () => {
          const state = Flip.getState(element);
          element.style.transform = "scale(1.05) rotate(2deg)";
          Flip.from(state, {
            duration: 0.3,
            ease: "power2.out"
          });
        });

        element.addEventListener("mouseleave", () => {
          const state = Flip.getState(element);
          element.style.transform = "scale(1) rotate(0deg)";
          Flip.from(state, {
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", () => {});
        element.removeEventListener("mouseleave", () => {});
      });
    };
  }, [trigger]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

export default FlipAnimation;
