import React, { useRef } from "react";

function MagneticButton({ href = "#", className = "", children }) {
  const wrapRef = useRef(null);
  const innerRef = useRef(null);

  const onMouseMove = (e) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    inner.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const onMouseLeave = () => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform = `translate(0,0)`;
  };

  const onClick = (e) => {
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      ref={wrapRef}
      href={href}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={
        "sheen-btn inline-flex items-center justify-center rounded-lg overflow-hidden relative " +
        "bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-medium " +
        "hover:opacity-95 transition-all duration-200 px-8 py-3 " +
        className
      }
      data-cursor="hover"
    >
      <span ref={innerRef} className="relative z-10">{children}</span>
      <span className="sheen-layer" aria-hidden="true" />
    </a>
  );
}

export default MagneticButton;


