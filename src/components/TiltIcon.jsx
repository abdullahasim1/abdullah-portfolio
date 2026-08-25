import React, { useRef } from "react";

/**
 * 3D tilt logo tile — cursor follow karta hai, tile perspective mein
 * ghoomta hai aur icon pop-out hota hai. Spotlight glow included.
 */
function TiltIcon({ logo, size = 56, iconSize = 28, showLabel = false }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--rx", `${(0.5 - y / r.height) * 20}deg`);
    el.style.setProperty("--ry", `${(x / r.width - 0.5) * 20}deg`);
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="flex flex-col items-center gap-2.5">
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor="hover"
        title={logo.name}
        className="tilt-tile group relative flex items-center justify-center rounded-2xl glass overflow-hidden"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(80px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.20), transparent 65%)",
          }}
        />
        {logo.icon ? (
          <svg
            viewBox="0 0 24 24"
            width={iconSize}
            height={iconSize}
            aria-hidden="true"
            className="pop-3d relative z-10 transition-transform duration-200 group-hover:scale-110"
            style={{ filter: `drop-shadow(0 0 9px #${logo.icon.hex}66)` }}
          >
            <path d={logo.icon.path} fill={`#${logo.icon.hex}`} />
          </svg>
        ) : (
          <span
            className="relative z-10 font-display font-bold leading-none select-none transition-transform duration-200 group-hover:scale-110"
            style={{
              fontSize: Math.max(11, iconSize * 0.42),
              background: `linear-gradient(135deg, ${logo.mono.from}, ${logo.mono.to})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              filter: "drop-shadow(0 0 8px rgba(255,255,255,0.18))",
            }}
          >
            {logo.mono.label}
          </span>
        )}
      </div>

      {showLabel && (
        <span className="text-[11px] font-medium text-slate-500">{logo.name}</span>
      )}
    </div>
  );
}

export default TiltIcon;
