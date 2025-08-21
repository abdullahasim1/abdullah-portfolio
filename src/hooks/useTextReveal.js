import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const useTextReveal = (type = "chars", delay = 0) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    // Check if SplitText is available (it's a premium plugin)
    if (typeof gsap.utils.wrap === "undefined") {
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
      return;
    }

    // Try to use SplitText if available
    try {
      // Dynamic import for SplitText (premium plugin)
      import("gsap/SplitText").then(({ SplitText }) => {
        gsap.registerPlugin(SplitText);
        
        const split = new SplitText(textRef.current, {
          type: type,
          charsClass: "char",
          wordsClass: "word",
          linesClass: "line"
        });

        let elements;
        if (type === "chars") {
          elements = split.chars;
        } else if (type === "words") {
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
        // Fallback if SplitText is not available
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
  }, [type, delay]);

  return textRef;
};
