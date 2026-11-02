import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../hooks";

gsap.registerPlugin(ScrollTrigger);

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

/* Board ki 3D art ki jagah CSS/SVG art — har step ka icon ek white glass
   tile par, peeche lavender blob. */
function StepArt({ index }) {
  return (
    <div aria-hidden className="relative flex h-[104px] flex-1 items-center justify-center">
      <div className="absolute h-24 w-40 rounded-[45%_55%_60%_40%/55%_45%_60%_50%] bg-gradient-to-br from-violet-200/80 via-purple-100 to-indigo-100 dark:from-violet-500/20 dark:via-purple-500/10 dark:to-indigo-500/10" />
      <div className="animate-[floatY_6s_ease-in-out_infinite] relative flex h-[68px] w-[68px] items-center justify-center rounded-[1.1rem] border border-white/70 bg-white/80 shadow-[0_16px_34px_-14px_rgba(124,58,237,0.45)] backdrop-blur-sm dark:border-white/15 dark:bg-white/10">
        {index === 0 && (
          <svg className="h-9 w-9 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="8.5" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 8.5l-2 5-5 2 2-5 5-2z" fill="currentColor" stroke="none" opacity="0.9" />
            <circle cx="12" cy="12" r="1.1" fill="white" stroke="none" />
          </svg>
        )}
        {index === 1 && (
          <svg className="h-9 w-9 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
            <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
            <path strokeLinecap="round" d="M3 9h18" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 12.5L7 15l2.5 2.5m5-5L17 15l-2.5 2.5" />
          </svg>
        )}
        {index === 2 && (
          <svg className="h-9 w-9 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.8 1.9 4.5 5.3 4.5 9l-4.5 4.5L7.5 12C7.5 8.3 9.2 4.9 12 3z" />
            <circle cx="12" cy="9.5" r="1.8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 13.5L5 18l2.5-.5M16.5 13.5L19 18l-2.5-.5M12 16.5L10.8 20c-.2.8.5 1.4 1.2 1.4s1.4-.6 1.2-1.4L12 16.5z" />
          </svg>
        )}
      </div>
      {index === 0 && (
        <svg aria-hidden className="absolute right-6 top-1 h-6 w-6 text-violet-500 dark:text-violet-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2a7 7 0 00-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
        </svg>
      )}
      {index === 2 && (
        <span aria-hidden className="absolute bottom-1 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg">
          <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
    </div>
  );
}

function Process() {
  useScrollReveal("#process .reveal");

  /* Timeline line left→right draw hoti hai scroll par (motion spec §16) */
  const lineWrapRef = useRef(null);
  const drawRef = useRef(null);
  useEffect(() => {
    if (!lineWrapRef.current || !drawRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      drawRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineWrapRef.current,
          start: "top 85%",
          end: "top 35%",
          scrub: 0.5,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden py-16">
      <div aria-hidden className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13l9 5 9-5" />
            </svg>
            Process
          </span>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
              How I Work
            </h2>
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/70 px-4 py-2 text-[13px] font-semibold text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-violet-300">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              Collaborative &amp; transparent
            </span>
          </div>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            A clear process that keeps every project aligned, on time, and built for long-term success.
          </p>
          <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
        </div>

        {/* Timeline */}
        <div aria-hidden ref={lineWrapRef} className="relative mx-2 mb-0 mt-12 hidden lg:block">
          <div className="h-px bg-gradient-to-r from-violet-200 via-violet-400/70 to-violet-200 dark:from-violet-500/20 dark:via-violet-400/50 dark:to-violet-500/20" />
          <div
            ref={drawRef}
            style={{ transformOrigin: "left" }}
            className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400"
          />
          {[16.66, 50, 83.33].map((left) => (
            <span
              key={left}
              className="absolute top-0 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-violet-400 bg-white dark:bg-slate-900"
              style={{ left: `${left}%` }}
            >
              <span className="h-2 w-2 rounded-full bg-violet-600" />
            </span>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-3">
          {processSteps.map((step, index) => (
            <article
              key={step.step}
              className="rounded-[1.8rem] border border-violet-100 bg-white p-7 shadow-[0_16px_44px_-20px_rgba(124,58,237,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-20px_rgba(124,58,237,0.32)] dark:border-white/10 dark:bg-slate-900/70 sm:p-8"
            >
              <div className="flex items-start gap-2">
                <span aria-hidden className="font-display text-[64px] font-extrabold leading-none text-[#D9CEFC] dark:text-violet-500/25">
                  {step.step}
                </span>
                <StepArt index={index} />
              </div>
              <h3 className="mt-5 font-display text-[22px] font-extrabold text-slate-900 dark:text-white">
                {step.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                {step.description}
              </p>
              <span className="mt-6 inline-block rounded-full bg-violet-100 px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.16em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                Key Deliverables
              </span>
              <ul className="mt-4 grid grid-cols-1 gap-x-4 gap-y-3 min-[420px]:grid-cols-2">
                {step.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-violet-500 text-violet-600 dark:text-violet-300">
                      <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={3.2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-[13px] font-medium leading-snug text-slate-600 dark:text-slate-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* Bottom flow */}
        <div className="mt-12 flex items-center justify-center gap-3 sm:gap-4">
          <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-violet-200 dark:to-violet-500/25 sm:block" />
          <span className="rounded-full bg-violet-100 px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            Plan
          </span>
          <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-violet-600/30">
            Build
          </span>
          <svg className="h-4 w-4 text-violet-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span className="rounded-full bg-violet-100 px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            Launch
          </span>
          <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-violet-200 dark:to-violet-500/25 sm:block" />
        </div>
      </div>
    </section>
  );
}

export default Process;
