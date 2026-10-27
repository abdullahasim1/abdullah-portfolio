import React from "react";
import { useCounterAnimation, useStaggerAnimation } from "../hooks";
import SectionHeading from "../components/SectionHeading";

const stats = [
  { number: 3, suffix: "+", label: "Years Experience" },
  { number: 25, suffix: "+", label: "Projects Shipped" },
  { number: 11, suffix: "", label: "Certifications" },
  { number: 15, suffix: "+", label: "Technologies" },
];

function StatNumber({ stat, index }) {
  const counterRef = useCounterAnimation(stat.number, 2, index * 0.2);
  return (
    <div className="font-display text-5xl md:text-6xl font-medium text-white light:text-slate-900">
      <span ref={counterRef}>{stat.number}</span>
      {stat.suffix}
    </div>
  );
}

function Stats() {
  const staggerRef = useStaggerAnimation(0.12, 0.3);

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading label="Achievements" title="Numbers That Speak" />

        {/* Light Minimal: cards ki jagah hairline strip — numbers hi design hain */}
        <div
          ref={staggerRef}
          className="grid grid-cols-2 lg:grid-cols-4 border-y border-white/[0.07] light:border-[#e8e4da]"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              data-stagger
              className={`py-10 px-4 text-center border-white/[0.07] light:border-[#e8e4da] ${
                index % 2 === 0 ? "border-r" : ""
              } ${index < 2 ? "border-b lg:border-b-0" : ""} ${
                index === 1 ? "lg:border-r" : ""
              } ${index === 2 ? "lg:border-r" : ""}`}
            >
              <StatNumber stat={stat} index={index} />
              <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
