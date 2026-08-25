import React from "react";
import { useCounterAnimation, useStaggerAnimation } from "../hooks";
import SectionHeading from "../components/SectionHeading";

const stats = [
  { number: 3, suffix: "+", label: "Years Experience", icon: "🎯" },
  { number: 25, suffix: "+", label: "Projects Done", icon: "🚀" },
  { number: 8, suffix: "", label: "Certifications", icon: "🏆" },
  { number: 15, suffix: "+", label: "Technologies", icon: "⚡" }
];

function StatNumber({ stat, index }) {
  const counterRef = useCounterAnimation(stat.number, 2, index * 0.2);
  return (
    <div className="font-display text-4xl md:text-5xl font-bold text-gradient">
      <span ref={counterRef.elementRef}>{stat.number}</span>
      {stat.suffix}
    </div>
  );
}

function Stats() {
  const staggerRef = useStaggerAnimation(0.12, 0.3);

  return (
    <section className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Achievements"
          title="Numbers That Speak"
        />

        <div ref={staggerRef} className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => (
            <div key={stat.label} data-stagger>
              <div className="relative overflow-hidden rounded-2xl glass card-glow-hover p-8 text-center group">
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <div className="text-3xl mb-4 float-y">{stat.icon}</div>
                <StatNumber stat={stat} index={index} />
                <div className="mt-2 text-sm font-medium text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;
