import React from "react";
import MagneticButton from "./MagneticButton";

function CtaBand() {
  return (
    <section className="py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/25 bg-gradient-to-r from-violet-600/[0.18] via-fuchsia-600/[0.08] to-transparent p-8 md:p-12 flex flex-col lg:flex-row lg:items-center gap-8">
          <div
            aria-hidden
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-600/[0.14] blur-[90px]"
          />
          <div className="relative flex items-start gap-5 flex-1">
            <span className="hidden sm:inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-[0_0_24px_rgba(168,85,247,0.45)]">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-violet-300 mb-2">
                Let&apos;s Work Together
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
                Have a Project in Mind?
              </h2>
            </div>
          </div>
          <p className="relative text-slate-400 leading-relaxed max-w-sm">
            I&apos;m always open to discussing new ideas, projects or
            opportunities. Let&apos;s build something great together.
          </p>
          <div className="relative shrink-0">
            <MagneticButton href="#contact">Get in Touch</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBand;
