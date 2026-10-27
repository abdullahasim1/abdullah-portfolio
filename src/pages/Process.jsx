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

        {/* Light Minimal: timeline cards ki jagah numbered editorial rows */}
        <div className="border-t border-white/[0.07] light:border-[#e8e4da]">
          {processSteps.map((step) => (
            <div
              key={step.step}
              className="reveal grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-10 border-b border-white/[0.07] light:border-[#e8e4da]"
            >
              <div className="font-display text-6xl md:text-7xl font-medium leading-none text-slate-600 light:text-[#cfc8b8]">
                {step.step}
              </div>
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-medium text-white light:text-slate-900">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mt-3 max-w-2xl light:text-slate-600">
                  {step.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5 mt-6 max-w-2xl">
                  {step.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm text-slate-300 light:text-slate-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Process;
