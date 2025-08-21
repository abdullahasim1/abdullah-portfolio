import React, { useRef } from "react";

function GlowCard({ className = "", children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width;
    const py = y / rect.height;
    const rotateY = (px - 0.5) * 10; // -5..5
    const rotateX = (0.5 - py) * 10; // -5..5
    el.style.setProperty("--rx", `${rotateX}deg`);
    el.style.setProperty("--ry", `${rotateY}deg`);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={
        "relative rounded-2xl p-[1px] overflow-hidden group " +
        "bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/30 to-rose-500/30 " +
        "animate-glowPulse " +
        className
      }
      style={{
        transform: "perspective(800px) rotateX(var(--rx, 0)) rotateY(var(--ry, 0))",
        transition: "transform 120ms ease-out",
      }}
      data-cursor="hover"
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
        background: "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(167,139,250,0.25), transparent 40%)"
      }} />
      <div className="relative rounded-2xl bg-white/60 dark:bg-black/30 backdrop-blur border border-gray-200/60 dark:border-gray-800/60">
        {children}
      </div>
    </div>
  );
}

export default GlowCard;


