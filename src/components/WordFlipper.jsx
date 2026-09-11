import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function WordFlipper({
  words,
  intervalMs = 2000,
  initialDelayMs = 800,
  className = "",
  textClassName = "",
}) {
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);
  const intervalIdRef = useRef(null);
  const initialTimeoutRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (!Array.isArray(words) || words.length <= 1) return;

    // Create GSAP context — iske andar bane saare tweens cleanup mein revert honge
    const ctx = gsap.context(() => {
      const playAnimation = () => {
        if (!textRef.current) return;

        // Animate out
        gsap.to(textRef.current, {
          yPercent: -50,
          opacity: 0,
          duration: 0.35,
          ease: "power2.in",
          onComplete: () => {
            // Change word when it's invisible
            setIndex((prev) => (prev + 1) % words.length);

            // Animate in
            gsap.fromTo(
              textRef.current,
              { yPercent: 100, opacity: 0 },
              { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
            );
          },
        });
      };

      // Initial entry animation
      gsap.fromTo(
        textRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      );

      initialTimeoutRef.current = setTimeout(() => {
        intervalIdRef.current = setInterval(playAnimation, intervalMs);
      }, Math.max(0, initialDelayMs));
    });
    ctxRef.current = ctx;

    return () => {
      // Clear timeouts and intervals
      if (initialTimeoutRef.current) {
        clearTimeout(initialTimeoutRef.current);
        initialTimeoutRef.current = null;
      }
      if (intervalIdRef.current) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
      // Revert GSAP context — saare tweens (interval wale bhi) kill ho jate hain
      ctx.revert();
      ctxRef.current = null;
    };
  }, [words, intervalMs, initialDelayMs]);

  const safeIndex = words && words.length > 0 ? index % words.length : 0;

  return (
    <span
      className={`inline-block overflow-hidden align-baseline ${className}`}
    >
      <span ref={textRef} className={`inline-block align-baseline ${textClassName}`}>
        {words && words.length > 0 ? words[safeIndex] : null}
      </span>
    </span>
  );
}

export default WordFlipper;
