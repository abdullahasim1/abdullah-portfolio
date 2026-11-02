import React, { useState } from "react";
import { useScrollReveal } from "../hooks";
import { navigateTo } from "../lib/router";
import { playClickSound } from "../lib/sound";
/* Single source of truth — isi se index.html ka FAQPage JSON-LD bhi banta hai */
import { faqs } from "../data/faqs";

const GROUPS = [
  {
    label: "About",
    icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
    range: [0, 1],
  },
  {
    label: "Services",
    icon: "M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 17l9 5 9-5",
    range: [1, 3],
  },
  {
    label: "Working Together",
    icon: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    range: [3, 99],
  },
];

/* Glass question-orb illustration (CSS/SVG version of the board art). */
function OrbArt() {
  return (
    <div aria-hidden className="relative mx-auto mt-10 hidden h-[240px] w-[280px] sm:block">
      <div className="absolute left-1/2 top-2 -translate-x-1/2">
        <div className="animate-[floatY_6s_ease-in-out_infinite] flex h-44 w-44 items-center justify-center rounded-full border border-white/70 bg-white/50 shadow-[0_24px_44px_-16px_rgba(124,58,237,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-white/10">
          <span className="bg-gradient-to-br from-violet-500 to-purple-600 bg-clip-text font-display text-[92px] font-extrabold leading-none text-transparent">
            ?
          </span>
        </div>
      </div>
      <div className="absolute bottom-2 left-1/2 h-6 w-48 -translate-x-1/2 rounded-[50%] bg-violet-400/30 blur-md" />
      <svg className="animate-[spin_46s_linear_infinite] absolute left-1/2 top-6 h-44 w-[270px] -translate-x-1/2 text-violet-400/70" viewBox="0 0 270 176" fill="none">
        <ellipse cx="135" cy="88" rx="132" ry="82" stroke="currentColor" strokeWidth="1.4" transform="rotate(-8 135 88)" />
      </svg>
      <span className="absolute right-2 top-16 h-2.5 w-2.5 rounded-full bg-violet-500" />
      <span className="absolute bottom-14 left-3 h-2 w-2 rounded-full bg-purple-400" />
      <span className="absolute right-6 top-2 flex h-11 w-11 items-center justify-center rounded-2xl rounded-br-md bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.5 4.5a3 3 0 00-3 3v6a3 3 0 003 3h.75l3 3v-3h11.25a3 3 0 003-3v-6a3 3 0 00-3-3H4.5zM7 9.75A.75.75 0 017.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 017 9.75zm4.25 0a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75zM15.5 9.75a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5a.75.75 0 01-.75-.75z" transform="scale(0.92) translate(1 1)" />
        </svg>
      </span>
      <span className="absolute bottom-20 left-0 flex h-10 w-10 items-center justify-center rounded-2xl rounded-bl-md bg-white text-violet-500 shadow-lg shadow-violet-500/20 dark:bg-slate-800">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" d="M4 8h13M4 12h9" />
        </svg>
      </span>
    </div>
  );
}

/* Smooth accordion — grid-rows 0fr→1fr height animation, plus rotates
   45°, active row lavender (motion spec §19). Keyboard accessible. */
function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white transition-colors duration-300 dark:bg-white/[0.03] ${
        open
          ? "border-violet-300 bg-violet-50/60 dark:border-violet-400/40 dark:bg-violet-500/[0.06]"
          : "border-violet-100 dark:border-white/10"
      }`}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          playClickSound();
          setOpen((v) => !v);
        }}
        className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-[13px] font-bold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 font-display text-[15px] font-bold text-slate-800 dark:text-slate-100 sm:text-base">
          {item.q}
        </span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/25 transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        id={panelId}
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 pl-[68px] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

function Faq() {
  useScrollReveal("#faq .reveal");

  const goContact = () => {
    playClickSound();
    navigateTo("/contact");
  };

  return (
    <section id="faq" className="relative scroll-mt-24 overflow-hidden pt-28 pb-20">
      <div aria-hidden className="absolute -left-32 top-32 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Left column */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              FAQ
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px] sm:leading-[1.08]">
              Frequently Asked Questions
            </h2>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              Quick answers about who I am, what I build, and how we can work together.
            </p>

            <OrbArt />

            <div className="mt-10 rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_14px_36px_-18px_rgba(124,58,237,0.25)] dark:border-white/10 dark:bg-slate-900/70">
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm3.75 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM8.25 21a9 9 0 118.25-4.935.75.75 0 01-.588-.245A6.002 6.002 0 0012 15.75a5.993 5.993 0 00-3.912-.93.75.75 0 01-.588.245A8.953 8.953 0 018.25 21zm9.352-2.998a.75.75 0 01.242-.988l1.405-1.054a9.721 9.721 0 01-1.647 2.042zM12 3a8.958 8.958 0 00-6.94 3.31.75.75 0 01.988-.243l1.053 1.406c.35.467.24 1.124-.161 1.493A6.002 6.002 0 006.75 12c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V10.5a.75.75 0 01.75-.75h6a.75.75 0 01.75.75V12a.75.75 0 00.75.75h.008a.75.75 0 00.75-.75 6.002 6.002 0 00-1.658-4.166c-.4-.37-.51-1.026-.16-1.493l1.052-1.406a.75.75 0 01.989.242A8.957 8.957 0 0012 3z" opacity="0" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" opacity="0" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5a3.75 3.75 0 117.5 0v3.75a3 3 0 01-3 3h-1.5a3 3 0 01-3-3V4.5zM5.25 9.75a.75.75 0 01.75.75v2.25a2.25 2.25 0 002.25 2.25h.75m6 0h.75a2.25 2.25 0 002.25-2.25V10.5a.75.75 0 01.75-.75M12 18.75v1.5a2.25 2.25 0 002.25 2.25h1.5" />
                  </svg>
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                    Still have questions?
                  </h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Let&apos;s discuss your project or opportunity.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={goContact}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-opacity hover:opacity-90"
              >
                Contact Abdullah
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right column — grouped accordion card */}
          <div className="reveal rounded-[1.8rem] border border-violet-100 bg-white/70 p-5 shadow-[0_20px_50px_-24px_rgba(124,58,237,0.25)] backdrop-blur-sm dark:border-white/10 dark:bg-slate-900/60 sm:p-7">
            {GROUPS.map((group, gi) => (
              <div key={group.label} className={gi > 0 ? "mt-8" : ""}>
                <div className="mb-4 flex items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-3.5 py-1.5 text-[13px] font-bold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
                    </svg>
                    {group.label}
                  </span>
                  <span className="h-px flex-1 bg-violet-100 dark:bg-white/[0.07]" />
                </div>
                <div className="space-y-3">
                  {faqs.slice(group.range[0], group.range[1]).map((item, i) => (
                    <FaqItem key={item.q} item={item} index={group.range[0] + i} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <div className="reveal relative mt-12 flex flex-col items-center gap-6 overflow-hidden rounded-[1.8rem] border border-violet-100 bg-white px-8 py-8 shadow-[0_20px_50px_-24px_rgba(124,58,237,0.25)] dark:border-white/10 dark:bg-slate-900/70 sm:px-10 lg:flex-row">
          <div aria-hidden className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-600/10" />
          <span aria-hidden className="animate-[floatY_6s_ease-in-out_infinite] relative hidden h-20 w-24 shrink-0 -rotate-6 items-center justify-center rounded-2xl border border-white/70 bg-white/60 shadow-[0_16px_30px_-12px_rgba(124,58,237,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-white/10 sm:flex">
            <svg className="h-10 w-10 text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </span>
          <span aria-hidden className="relative hidden h-16 w-px bg-violet-100 dark:bg-white/10 lg:block" />
          <div className="relative flex-1 text-center lg:text-left">
            <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white sm:text-[28px]">
              Didn&apos;t find your answer?
            </h3>
            <p className="mt-1.5 text-[15px] text-slate-500 dark:text-slate-400">
              Feel free to reach out — I&apos;ll be happy to help.
            </p>
          </div>
          <button
            type="button"
            onClick={goContact}
            className="relative inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
          >
            <svg className="h-4.5 w-4.5 h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            Send me a message
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Faq;
