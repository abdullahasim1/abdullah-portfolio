import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

function WordFlipper({ words, intervalMs = 2000, className = "" }) {
  const [index, setIndex] = useState(0);
  const textRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    timelineRef.current = gsap.timeline({ paused: true });
    timelineRef.current
      .fromTo(
        textRef.current,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: "power2.out" }
      )
      .to(textRef.current, { yPercent: -50, opacity: 0, duration: 0.35, ease: "power2.in" });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!timelineRef.current || !textRef.current) return;
      timelineRef.current.restart();
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
      }, 450);
    }, intervalMs);
    return () => clearInterval(id);
  }, [words, intervalMs]);

  return (
    <span className={`inline-block overflow-hidden align-middle h-[1em] ${className}`}>
      <span ref={textRef} className="inline-block">
        {words[index]}
      </span>
    </span>
  );
}

export default WordFlipper;


