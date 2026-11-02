import React from "react";

function SectionHeading({ label, title, subtitle, align = "left" }) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <div className={`flex flex-col gap-4 ${alignment} mb-14`}>
      <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-400/25 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300">
        <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
        {label}
      </span>
      <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 leading-tight max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionHeading;
