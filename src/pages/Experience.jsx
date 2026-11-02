import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data/experience";
import { useCounterAnimation } from "../hooks/useCounterAnimation";

gsap.registerPlugin(ScrollTrigger);

/* Journey Highlights ke numbers count-up hote hain jab card nazar aye */
function CountValue({ value }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const ref = useCounterAnimation(match ? parseInt(match[1], 10) : 0, 1.4);
  if (!match) return <>{value}</>;
  return (
    <>
      <span ref={ref}>0</span>
      {match[2]}
    </>
  );
}
import { scrollToSection } from "../lib/smoothScroll";
import { playClickSound } from "../lib/sound";

/* Board sirf pehli 4 entries dikhata hai (3 roles + AWS GenAI credential) —
   baaki certification milestones Certifications section me maujood hain. */
const shown = timeline.slice(0, 4);

function EntryIcon({ index }) {
  if (index === 3) {
    // AWS tile
    return (
      <span className="flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-violet-100 dark:bg-white/10 dark:ring-white/10">
        <span className="text-[15px] font-extrabold lowercase leading-none tracking-tight text-slate-900 dark:text-white">
          aws
        </span>
        <svg className="mt-0.5 h-2.5 w-7 text-[#FF9900]" viewBox="0 0 28 10" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 3c6 4.5 18 4.5 24 0" strokeLinecap="round" />
          <path d="M23.5 1.2l2.8 1.6-3.4 1.4" fill="currentColor" stroke="none" />
        </svg>
      </span>
    );
  }
  const cloudPath = (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
  );
  const icons = [
    <svg key="c1" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">{cloudPath}</svg>,
    <svg key="c2" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">{cloudPath}</svg>,
    <svg key="code" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>,
  ];
  const tones = [
    "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
    "bg-sky-100 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300",
    "bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300",
  ];
  return (
    <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${tones[index]}`}>
      {icons[index]}
    </span>
  );
}

const HIGHLIGHTS = [
  {
    value: "3+",
    label: "Years Experience",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m16.5 0a2.18 2.18 0 01-1.5-1.523M3.75 14.15a2.18 2.18 0 001.5-1.523m0 0a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    ),
  },
  {
    value: "25+",
    label: "Projects Shipped",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5M3 17.5l9 5 9-5" />
    ),
  },
  {
    value: "11+",
    label: "Certifications",
    icon: (
      <>
        <circle cx="12" cy="9" r="5.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.8 13.2L7 21l5-2.7L17 21l-1.8-7.8" />
      </>
    ),
  },
];

function Experience() {
  /* Timeline line scroll ke sath draw hoti hai (motion spec §14) */
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      lineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 78%",
          end: "bottom 55%",
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
    <section id="experience" className="relative scroll-mt-24 overflow-hidden py-28">
      <div aria-hidden className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Professional Journey
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
              My Journey
            </h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              From cloud engineering to AI-powered products — the experiences and credentials that shaped how I build.
            </p>
          </div>
          <a
            href="/resume.pdf"
            download="Abdullah-Bin-Asim-Resume.pdf"
            className="inline-flex items-center gap-2.5 rounded-full border border-violet-200 bg-white px-6 py-3.5 text-sm font-semibold text-violet-700 shadow-sm transition-all hover:border-violet-400 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-violet-300"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download Resume
          </a>
        </div>

        {/* Tabs row */}
        <div className="mt-9 flex flex-wrap items-center gap-5">
          <div className="inline-flex rounded-full border border-violet-100 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-slate-900/70">
            <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5M3 17.5l9 5 9-5" />
              </svg>
              Experience
            </span>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                scrollToSection("certifications");
              }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
              Certifications &amp; Learning
            </button>
          </div>
          <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-violet-200 to-transparent dark:from-violet-500/25 lg:block" />
          <span className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-500 dark:text-violet-300 lg:inline-flex">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
            Career Timeline
          </span>
        </div>

        {/* Content grid */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1fr_360px]">
          {/* Timeline */}
          <div className="relative" ref={timelineRef}>
            <span
              aria-hidden
              ref={lineRef}
              style={{ transformOrigin: "top" }}
              className="absolute bottom-8 left-[27px] top-8 w-px bg-gradient-to-b from-violet-400 via-violet-300 to-violet-200 dark:from-violet-400/60 dark:via-violet-500/30 dark:to-violet-500/10"
            />
            <div className="space-y-6">
              {shown.map((item, i) => (
                <div key={item.title} className="relative flex gap-5 sm:gap-7">
                  <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-violet-300 bg-white font-display text-[15px] font-extrabold text-violet-600 shadow-sm dark:border-violet-400/40 dark:bg-slate-900 dark:text-violet-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <article className="min-w-0 flex-1 rounded-[1.6rem] border border-violet-100 bg-white p-6 shadow-[0_14px_40px_-20px_rgba(124,58,237,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_-20px_rgba(124,58,237,0.32)] dark:border-white/10 dark:bg-slate-900/70 sm:p-7">
                    <div className="flex gap-5">
                      <EntryIcon index={i} />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="font-display text-lg font-extrabold leading-snug text-slate-900 dark:text-white sm:text-xl">
                            {item.title}
                          </h3>
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-semibold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            {item.period}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-semibold text-violet-600 dark:text-violet-300">
                          {item.org.replace(" — ", " • ")}
                        </p>
                        <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                          {item.desc}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full border border-violet-200 px-3 py-1 text-xs font-medium text-violet-600 dark:border-violet-400/25 dark:text-violet-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Journey Highlights */}
          <aside className="rounded-[1.8rem] border border-violet-100 bg-white p-7 shadow-[0_16px_44px_-20px_rgba(124,58,237,0.22)] dark:border-white/10 dark:bg-slate-900/70 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </span>
              <h3 className="font-display text-xl font-extrabold text-slate-900 dark:text-white">
                Journey Highlights
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              A quick look at my experience, work, and continuous learning.
            </p>
            <div className="mt-6 space-y-3.5">
              {HIGHLIGHTS.map((h) => (
                <div key={h.label} className="flex items-center gap-4 rounded-2xl bg-[#F7F4FF] p-4 dark:bg-white/5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-violet-600 shadow-sm dark:bg-white/10 dark:text-violet-300">
                    <svg className="h-[22px] w-[22px]" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
                      {h.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block font-display text-[24px] font-extrabold leading-none text-violet-700 dark:text-violet-300">
                      <CountValue value={h.value} />
                    </span>
                    <span className="mt-1 block text-[13px] text-slate-500 dark:text-slate-400">
                      {h.label}
                    </span>
                  </span>
                </div>
              ))}
            </div>
            {/* Path art */}
            <svg aria-hidden viewBox="0 0 300 120" className="mt-6 w-full">
              <path d="M0 96 Q60 66 118 84 T236 62 Q272 52 300 60 L300 120 L0 120 Z" fill="#EDE9FE" opacity="0.65" />
              <path d="M14 104 Q80 66 140 78 T286 34" fill="none" stroke="#C4B5FD" strokeWidth="5" strokeLinecap="round" strokeDasharray="1 10" />
              <circle cx="52" cy="88" r="9" fill="#fff" stroke="#A78BFA" strokeWidth="3" />
              <circle cx="52" cy="88" r="3.5" fill="#7C3AED" />
              <circle cx="150" cy="76" r="9" fill="#fff" stroke="#A78BFA" strokeWidth="3" />
              <circle cx="150" cy="76" r="3.5" fill="#7C3AED" />
              <circle cx="238" cy="52" r="9" fill="#fff" stroke="#A78BFA" strokeWidth="3" />
              <circle cx="238" cy="52" r="3.5" fill="#7C3AED" />
              <path d="M282 12v26" stroke="#7C3AED" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M282 13l16 6-16 6z" fill="#7C3AED" />
              <ellipse cx="282" cy="42" rx="17" ry="4.5" fill="#C4B5FD" opacity="0.7" />
            </svg>
          </aside>
        </div>

        {/* Bottom flow */}
        <div className="mt-14 flex items-center justify-center gap-3 sm:gap-5">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-violet-100 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3-.512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0-14.25v14.25" />
            </svg>
            Learn
          </span>
          <svg className="h-5 w-10 text-violet-300 sm:w-16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 64 24" preserveAspectRatio="none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h54m0 0l-6-6m6 6l-6 6" />
          </svg>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-violet-100 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
            Build
          </span>
          <svg className="h-5 w-10 text-violet-300 sm:w-16" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 64 24" preserveAspectRatio="none">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h54m0 0l-6-6m6 6l-6 6" />
          </svg>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-violet-100 px-6 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.8 1.9 4.5 5.3 4.5 9l-4.5 4.5L7.5 12C7.5 8.3 9.2 4.9 12 3z" />
              <circle cx="12" cy="9.5" r="1.8" />
            </svg>
            Ship
          </span>
        </div>
      </div>
    </section>
  );
}

export default Experience;
