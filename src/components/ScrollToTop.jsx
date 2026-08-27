import React, { useState, useEffect } from "react";
import { scrollToTop as smoothScrollToTop } from "../lib/smoothScroll";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => smoothScrollToTop();

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 w-12 h-14 bg-gradient-to-br from-cyan-500 to-violet-600 text-white rounded-2xl neon-ring hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group ${
        isVisible 
          ? "translate-y-0 opacity-100" 
          : "translate-y-4 opacity-0 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-y-0.5 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
}

export default ScrollToTop;
