import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Counter({ from = 0, to = 100, duration = 1.4, suffix = "", prefix = "", className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!ref.current) return;
    const element = ref.current;
    const obj = { v: from };
    const tween = gsap.to(obj, {
      v: to,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
      onUpdate: () => setValue(Math.floor(obj.v)),
    });
    return () => tween.kill();
  }, [from, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default Counter;


