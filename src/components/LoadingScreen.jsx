import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

function LoadingScreen({ onLoadingComplete }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(textRef.current, { opacity: 0, y: 50 });
    gsap.set(cursorRef.current, { opacity: 0 });

    // Text animation sequence
    tl.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out"
    })
    .to(cursorRef.current, {
      opacity: 1,
      duration: 0.3
    }, "-=0.5")
    .to(cursorRef.current, {
      opacity: 0,
      duration: 0.3,
      repeat: 3,
      yoyo: true
    }, "-=0.2")
    .to(textRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.in"
    }, "+=1")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        onLoadingComplete();
      }
    });
  }, [onLoadingComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center z-[9999]"
      style={{ opacity: 0 }}
    >
      <div className="text-center">
        <div 
          ref={textRef}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Hi, I'm Abdullah
        </div>
        <div 
          ref={cursorRef}
          className="w-1 h-12 bg-white mx-auto animate-pulse"
        ></div>
      </div>
    </div>
  );
}

export default LoadingScreen;
