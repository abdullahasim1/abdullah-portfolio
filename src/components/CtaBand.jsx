import React from "react";
import { navigateTo } from "../lib/router";
import { playClickSound } from "../lib/sound";

function CtaBand() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="relative flex flex-col items-start gap-7 overflow-hidden rounded-[1.8rem] border border-violet-200/70 bg-gradient-to-r from-violet-100 via-purple-50 to-violet-100 px-8 py-9 dark:border-white/10 dark:from-violet-500/15 dark:via-slate-900 dark:to-violet-500/10 sm:px-10 lg:flex-row lg:items-center lg:gap-9">
          <div className="flex items-center gap-6">
            <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-[0_14px_30px_-10px_rgba(124,58,237,0.6)]">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </span>
            <span aria-hidden className="hidden h-14 w-px bg-violet-300/50 dark:bg-white/10 sm:block" />
            <div>
              <p className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.24em] text-violet-600 dark:text-violet-300">
                Let&apos;s Work Together
              </p>
              <h2 className="font-display text-[26px] font-extrabold leading-tight text-slate-900 dark:text-white sm:text-3xl">
                Have a Project in Mind?
              </h2>
            </div>
          </div>
          <span aria-hidden className="hidden h-14 w-px bg-violet-300/50 dark:bg-white/10 lg:block" />
          <p className="max-w-sm leading-relaxed text-slate-500 dark:text-slate-400">
            I&apos;m always open to discussing new ideas, projects or
            opportunities. Let&apos;s build something great together.
          </p>
          <div className="shrink-0 lg:ml-auto">
            <button
              type="button"
              onClick={() => {
                playClickSound();
                navigateTo("/contact");
              }}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
            >
              Get in Touch
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CtaBand;
