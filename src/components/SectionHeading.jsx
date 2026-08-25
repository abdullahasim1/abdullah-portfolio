import React from "react";

function SectionHeading({ label, title, subtitle, align = "center" }) {
  const alignment =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  return (
    <div className={`flex flex-col gap-4 ${alignment} mb-14`}>
      <span className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 blink-dot" />
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
      <span
        aria-hidden
        className="h-px w-24 bg-gradient-to-r from-cyan-400 via-violet-500 to-transparent"
      />
    </div>
  );
}

export default SectionHeading;
