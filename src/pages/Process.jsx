import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";

const processSteps = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We start by understanding your vision, goals, and requirements to create a solid foundation.",
    features: [
      "Project requirements analysis",
      "User research and personas",
      "Technical architecture planning",
      "Timeline and milestone setting"
    ]
  },
  {
    step: "02",
    title: "Development & Design",
    description: "Bringing your ideas to life with clean code, beautiful design, and seamless user experiences.",
    features: [
      "UI/UX design and prototyping",
      "Frontend and backend development",
      "Database design and setup",
      "API integration and testing"
    ]
  },
  {
    step: "03",
    title: "Launch & Support",
    description: "Deploying to production and providing ongoing support to ensure long-term success.",
    features: [
      "Deployment and optimization",
      "Performance monitoring",
      "Bug fixes and updates",
      "Ongoing maintenance support"
    ]
  }
];

function Process() {
  useScrollReveal("#process .reveal");

  return (
    <section id="process" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Process"
          title="How I Work"
          subtitle="A proven process that ensures your project is delivered on time, within budget, and exceeds expectations."
        />

        {/* Timeline */}
        <div className="space-y-10">
          {processSteps.map((step, index) => {
            const isLast = index === processSteps.length - 1;
            return (
              <div key={step.step} className="reveal grid lg:grid-cols-[72px_1fr] gap-6 lg:gap-8">
                {/* Rail: number + connector */}
                <div className="hidden lg:flex flex-col items-center">
                  <span className="relative font-display inline-flex items-center justify-center w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-xl font-bold text-gradient">
                    {step.step}
                    <span aria-hidden className="absolute inset-0 rounded-2xl bg-cyan-400/15 blur-xl -z-10" />
                  </span>
                  {!isLast && (
                    <span
                      aria-hidden
                      className="relative w-px flex-1 min-h-[70px] my-4 bg-gradient-to-b from-cyan-400/40 via-violet-500/25 to-transparent"
                    >
                      <span className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-cyan-300/70 to-transparent blur-[2px]" />
                    </span>
                  )}
                </div>

                {/* Card */}
                <div className="glass rounded-3xl p-8 card-glow-hover hover:-translate-y-1 transition-transform duration-300">
                  {/* Mobile header */}
                  <div className="flex items-center gap-4 mb-5 lg:hidden">
                    <span className="font-display inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-400/30 text-lg font-bold text-gradient shrink-0">
                      {step.step}
                    </span>
                    <h3 className="font-display text-xl font-bold text-white">{step.title}</h3>
                  </div>

                  <h3 className="hidden lg:block font-display text-2xl font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-2xl">
                    {step.description}
                  </p>

                  <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 mb-4">
                    What's included
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {step.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.03] border border-white/[0.05] px-4 py-3 hover:border-cyan-400/25 transition-colors"
                      >
                        <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="reveal mt-14 relative overflow-hidden rounded-3xl glass-strong neon-ring p-10 text-center">
          <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent" />
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Start Your Project?
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
            Let's discuss your requirements and create something amazing together.
          </p>
          <a
            href="#contact"
            className="sheen-btn relative inline-flex items-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold shadow-[0_0_28px_rgba(34,211,238,0.22)] hover:opacity-90 transition-opacity"
          >
            Get Started Today
            <span className="sheen-layer" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}

export default Process;
