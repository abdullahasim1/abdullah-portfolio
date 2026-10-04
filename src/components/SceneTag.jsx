import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Cinematic "SCENE 01" tag with a 3D flip-in on scroll.
   CSS 3D (GPU-cheap) — no WebGL needed. Reduced-motion safe. */
function SceneTag({ scene, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        rotationX: -90,
        opacity: 0,
        transformOrigin: "center top",
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <span
      ref={ref}
      className={`scene-tag ${className}`}
      aria-hidden="true"
      style={{ transformStyle: "preserve-3d", display: "inline-flex" }}
    >
      Scene {scene}
    </span>
  );
}

export default SceneTag;
