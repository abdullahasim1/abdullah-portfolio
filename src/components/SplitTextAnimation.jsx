import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function SplitTextAnimation({ children, className = "", animationType = "chars", delay = 0 }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Try to use SplitText if available (premium plugin)
    try {
      import("gsap/SplitText").then(({ SplitText }) => {
        gsap.registerPlugin(SplitText);
        
        const split = new SplitText(textRef.current, {
          type: animationType,
          charsClass: "char",
          wordsClass: "word",
          linesClass: "line"
        });

        let elements;
        if (animationType === "chars") {
          elements = split.chars;
        } else if (animationType === "words") {
          elements = split.words;
        } else {
          elements = split.lines;
        }

        gsap.set(elements, { opacity: 0, y: 50 });
        
        gsap.to(elements, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.03,
          delay: delay,
          ease: "power2.out"
        });
      }).catch(() => {
        // Fallback animation without SplitText
        gsap.fromTo(
          textRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: delay,
            ease: "power2.out"
          }
        );
      });
    } catch (error) {
      // Fallback animation
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: delay,
          ease: "power2.out"
        }
      );
    }
  }, [children, animationType, delay]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}

export default SplitTextAnimation;
