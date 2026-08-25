import { useEffect, useRef, useState } from "react";

/* Element viewport mein hai ya nahi — 3D canvases ka frameloop pause karne ke liye */
export function useInViewport(margin = "120px") {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: margin }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [margin]);

  return [ref, inView];
}

export default useInViewport;
