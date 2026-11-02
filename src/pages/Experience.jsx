import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import { timeline } from "../data/experience";

/* Professional Experience — About se alag section (Clean Light redesign).
   Data src/data/experience.js se aata hai (CV-verified roles hi). */
function Experience() {
  useScrollReveal("#experience .reveal");

  return (
    <section id="experience" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Professional Experience"
          title="My Journey"
          subtitle="From cloud engineering intern to AI Cloud Engineer — the roles that shaped how I design and ship production systems."
        />

        <div className="flex flex-wrap items-center justify-end gap-4 mb-10 -mt-4">
          <a
            href="/resume.pdf"
            download="Abdullah-Bin-Asim-Resume.pdf"
            className="reveal inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200 transition-colors"
          >
            View Full Resume
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        <div className="relative border-l border-white/[0.09] light:border-violet-200 ml-3 space-y-12">
          {timeline.map((item) => (
            <div key={item.title + item.period} className="reveal relative pl-8">
              <span
                aria-hidden
                className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 border-2 border-void light:border-[#F8FAFF] shadow-[0_0_14px_rgba(168,85,247,0.6)]"
              />
              <div className="rounded-3xl glass p-6 md:p-7 card-glow-hover">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-display font-bold text-slate-100 light:text-slate-900">
                      {item.title}
                    </h4>
                    <div className="text-sm font-medium text-violet-300/90 mt-0.5">
                      {item.org}
                    </div>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/25 text-[11px] font-semibold text-violet-200">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-2 max-w-2xl">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.07] text-slate-300"
                    >
                      {tag}
                    </span>
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

export default Experience;
