import React from "react";
import Services from "./Services";

/* /services — saari services ka index. Detail pages /services/<slug>
   par hain; home section sirf preview dikhata hai. */
export default function ServicesIndex() {
  return (
    <div>
      <header className="relative overflow-hidden pb-4 pt-28">
        <div
          aria-hidden
          className="absolute -right-24 top-8 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl"
        />
        <div className="relative mx-auto max-w-[1200px] px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-700">
            Services
          </span>
          <h1 className="mt-5 max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl">
            AI automation, AWS and full-stack engineering
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-slate-600">
            Five focused services — each with a clear scope, fixed quote and a
            realistic timeline. Pick the one closest to your project, or send a
            brief and I&apos;ll point you to the right one.
          </p>
        </div>
      </header>
      <Services />
    </div>
  );
}
