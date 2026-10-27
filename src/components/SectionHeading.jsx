import React from "react";

function SectionHeading({ label, title, subtitle, align = "left" }) {
  const alignment =
    align === "center"
      ? "items-center text-center"
      : align === "right"
        ? "items-end text-right"
        : "items-start text-left";

  return (
    <div
      className={`flex flex-col gap-4 ${alignment} mb-14 border-b border-white/[0.07] pb-10 light:border-[#e8e4da]`}
    >
      {/* Light Minimal editorial heading: chhota caps label, serif title,
          neeche full-width hairline — koi pill/gradient nahi */}
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500">
        {label}
      </span>
      <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight text-white leading-[1.1] max-w-3xl light:text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-slate-400 max-w-2xl leading-relaxed light:text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;
