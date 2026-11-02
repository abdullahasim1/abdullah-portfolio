import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IS_LOW_END } from "../lib/device";
import { siReact } from "simple-icons";

/* Premium signature splash — Clean Light identity.
   - CSS 3D emblem: glass "A" tile + orbital rings + dotted globe (koi WebGL
     nahi — splash instant aur lightweight rehna chahiye, fallback built-in hai)
   - Progress FAKE nahi hai: real readiness stages (DOM ready → window load →
     fonts ready) drive karte hain; site ready ho to foran exit, hard cap 4.5s. */

const NAME = "ABDULLAH ASIM";
const TITLE = "AI CLOUD ENGINEER & FULL-STACK DEVELOPER";

const CARDS = [
  {
    label: "Generative AI",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"
      />
    ),
  },
  {
    label: "AWS Cloud",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
      />
    ),
  },
  {
    label: "Full-Stack",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.429 5.556L2.999 8.25l3.43 2.694M18.582 13.306l3.43 2.694-3.43 2.694M12 18.75l3.43-2.694M12 5.25L8.57 7.944M12 12L8.57 9.306"
      />
    ),
  },
  {
    label: "Product Development",
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-6.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
      />
    ),
  },
];

const PARTICLES = [
  { left: "12%", top: "22%", size: 5, dur: "5s", delay: "0s" },
  { left: "20%", top: "64%", size: 4, dur: "6s", delay: "0.6s" },
  { left: "82%", top: "26%", size: 6, dur: "5.5s", delay: "0.3s" },
  { left: "76%", top: "68%", size: 4, dur: "7s", delay: "1s" },
  { left: "34%", top: "14%", size: 4, dur: "6.5s", delay: "0.9s" },
  { left: "64%", top: "12%", size: 5, dur: "5.2s", delay: "0.2s" },
  { left: "8%", top: "44%", size: 4, dur: "7.5s", delay: "1.4s" },
  { left: "90%", top: "48%", size: 5, dur: "6.2s", delay: "0.5s" },
];

function SplashScreen({ onFinish }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const percentRef = useRef(null);
  const barRef = useRef(null);
  const finishedRef = useRef(false);

  const [showSkip, setShowSkip] = useState(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Exit (spec): emblem halka sa scale-down, poori screen smooth fade
    const tl = gsap.timeline({
      onComplete: () => onFinish(),
    });
    tl.to(
      stageRef.current,
      { scale: 0.94, y: -12, opacity: 0, duration: 0.5, ease: "power2.inOut" },
      0,
    ).to(
      rootRef.current,
      { opacity: 0, duration: 0.55, ease: "power1.inOut" },
      0,
    );
  };

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced || IS_LOW_END) {
      onFinish();
      return;
    }

    const startedAt = performance.now();
    const counter = { v: 0 };
    let loadDone = document.readyState === "complete";
    let fontsDone = false;

    const renderProgress = () => {
      if (percentRef.current) {
        percentRef.current.textContent = `${String(Math.round(counter.v)).padStart(3, "0")}%`;
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${counter.v / 100})`;
      }
    };
    const goTo = (target, duration = 0.6) => {
      gsap.to(counter, {
        v: target,
        duration,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: renderProgress,
      });
    };
    const maybeFinish = () => {
      if (!loadDone || !fontsDone) return;
      const elapsed = performance.now() - startedAt;
      const wait = Math.max(0, 1500 - elapsed); // entrance sequence ka min waqt
      gsap.delayedCall(wait / 1000, () => {
        goTo(100, 0.35);
        gsap.delayedCall(0.45, finish);
      });
    };
    const onLoad = () => {
      loadDone = true;
      goTo(78);
      maybeFinish();
    };

    goTo(30, 0.8); // DOM parsed (React mount ho chuka hai)
    if (loadDone) goTo(78, 0.8);
    else window.addEventListener("load", onLoad);
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        fontsDone = true;
        goTo(90);
        maybeFinish();
      });
    } else {
      fontsDone = true;
    }
    const hardCap = setTimeout(finish, 4500);

    const ctx = gsap.context(() => {
      gsap.from("[data-splash-emblem]", {
        scale: 0.7,
        opacity: 0,
        rotateY: -24,
        duration: 0.9,
        ease: "back.out(1.4)",
        delay: 0.15,
      });
      gsap.from("[data-splash-ring]", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.55,
      });
      gsap.from("[data-splash-chip]", {
        scale: 0.5,
        opacity: 0,
        duration: 0.55,
        stagger: 0.09,
        ease: "back.out(2)",
        delay: 0.85,
      });
      gsap.from("[data-splash-letter]", {
        y: 40,
        opacity: 0,
        rotateX: -70,
        duration: 0.75,
        stagger: 0.04,
        ease: "back.out(1.8)",
        delay: 0.9,
      });
      gsap.from("[data-splash-fade]", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.12,
        delay: 1.2,
      });
      gsap.fromTo(
        "[data-splash-line]",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power3.out", delay: 1.35 },
      );
      gsap.from("[data-splash-card]", {
        opacity: 0,
        y: 18,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1.5,
      });
    }, rootRef);

    const skipTimer = setTimeout(() => setShowSkip(true), 1100);

    return () => {
      ctx.revert();
      clearTimeout(skipTimer);
      clearTimeout(hardCap);
      window.removeEventListener("load", onLoad);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-[#F8FAFF] overflow-hidden flex flex-col items-center justify-center px-6"
      aria-label="Loading portfolio"
    >
      {/* Ambient glows */}
      <div
        aria-hidden
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-500/[0.12] blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-500/[0.12] blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-fuchsia-400/[0.07] blur-[100px]"
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute rounded-full bg-violet-400/40 float-y"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: p.dur,
            animationDelay: p.delay,
          }}
        />
      ))}

      {/* Layered liquid waves */}
      <div aria-hidden className="absolute bottom-0 inset-x-0 pointer-events-none">
        <svg
          className="block w-[200%] h-40 sm:h-52 splash-wave-back"
          viewBox="0 0 2880 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0,120 C240,60 480,180 720,130 C960,80 1200,170 1440,120 C1680,70 1920,180 2160,130 C2400,80 2640,170 2880,120 L2880,220 L0,220 Z"
            fill="#E9E4FF"
            opacity="0.75"
          />
        </svg>
        <svg
          className="block w-[200%] h-32 sm:h-44 -mt-24 sm:-mt-32 splash-wave-front"
          viewBox="0 0 2880 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0,150 C260,100 520,200 780,150 C1040,100 1300,190 1560,150 C1820,110 2080,200 2340,150 C2600,105 2760,170 2880,150 L2880,220 L0,220 Z"
            fill="#FEFEFF"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Stage */}
      <div
        ref={stageRef}
        className="relative flex flex-col items-center will-change-transform"
      >
        {/* ---------- 3D emblem ---------- */}
        <div
          className="relative flex items-center justify-center"
          style={{ perspective: "900px" }}
        >
          {/* Dotted digital globe */}
          <div
            aria-hidden
            className="absolute h-64 w-64 sm:h-80 sm:w-80 rounded-full splash-globe"
            style={{
              backgroundImage:
                "radial-gradient(rgba(124,58,237,0.22) 1.2px, transparent 1.4px)",
              backgroundSize: "15px 15px",
              maskImage:
                "radial-gradient(circle, black 30%, transparent 68%)",
              WebkitMaskImage:
                "radial-gradient(circle, black 30%, transparent 68%)",
            }}
          />

          {/* Orbital rings (CSS 3D) */}
          <div
            aria-hidden
            data-splash-ring
            className="absolute h-60 w-60 sm:h-72 sm:w-72 rounded-full border border-violet-400/35 splash-orbit"
          />
          <div
            aria-hidden
            data-splash-ring
            className="absolute h-60 w-60 sm:h-72 sm:w-72 splash-orbit-tilt"
          >
            <span className="absolute left-1/2 -top-[5px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-violet-500 shadow-[0_0_14px_rgba(139,92,246,0.9)]" />
          </div>
          <div
            aria-hidden
            data-splash-ring
            className="absolute h-48 w-48 sm:h-60 sm:w-60 rounded-full border border-indigo-400/25 splash-orbit-rev"
          />

          {/* Illuminated platform */}
          <div
            aria-hidden
            className="absolute -bottom-7 h-12 w-52 sm:w-64 rounded-[100%] bg-gradient-to-r from-violet-500/25 via-fuchsia-400/25 to-indigo-500/25 blur-md splash-platform"
          />
          <div
            aria-hidden
            className="absolute -bottom-5 h-8 w-44 sm:w-56 rounded-[100%] border border-violet-300/50 bg-white/30"
          />

          {/* Glass A tile */}
          <div
            data-splash-emblem
            className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-[30%] bg-white/45 backdrop-blur-xl border border-white/70 shadow-[0_30px_60px_-18px_rgba(124,58,237,0.45),inset_0_1px_0_rgba(255,255,255,0.9)] flex items-center justify-center float-y"
            style={{ animationDuration: "6s" }}
          >
            <span
              aria-hidden
              className="absolute inset-x-6 top-2 h-8 rounded-full bg-white/50 blur-lg"
            />
            <span
              className="font-display font-bold leading-none text-[84px] sm:text-[104px] select-none"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #7C3AED 10%, #6366F1 60%, #A855F7 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              A
            </span>
            <svg
              className="absolute top-4 right-4 w-5 h-5 text-[#A855F7]"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M12 2l1.9 6.1L20 10l-6.1 1.9L12 18l-1.9-6.1L4 10l6.1-1.9L12 2z" />
            </svg>
          </div>

          {/* Floating glass chips */}
          <span
            data-splash-chip
            className="absolute -left-14 sm:-left-24 top-2 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/55 backdrop-blur border border-white/70 shadow-[0_14px_30px_-12px_rgba(124,58,237,0.4)] float-y"
            style={{ animationDuration: "5s" }}
          >
            <span className="text-[11px] font-black lowercase tracking-tight text-[#FF9900]">
              aws
            </span>
          </span>
          <span
            data-splash-chip
            className="absolute -left-20 bottom-10 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/55 backdrop-blur border border-white/70 shadow-[0_14px_30px_-12px_rgba(124,58,237,0.4)] float-y"
            style={{ animationDuration: "6.5s", animationDelay: "0.5s" }}
          >
            <svg
              className="w-5 h-5 text-violet-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75L3.75 12l4.5 5.25m7.5-10.5l4.5 5.25-4.5 5.25"
              />
            </svg>
          </span>
          <span
            data-splash-chip
            className="absolute -right-14 sm:-right-24 top-4 inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/55 backdrop-blur border border-white/70 shadow-[0_14px_30px_-12px_rgba(124,58,237,0.4)] float-y"
            style={{ animationDuration: "5.6s", animationDelay: "0.3s" }}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
              <path d={siReact.path} fill="#61DAFB" />
            </svg>
          </span>
          <span
            data-splash-chip
            className="absolute -right-20 bottom-14 hidden md:inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/55 backdrop-blur border border-white/70 shadow-[0_14px_30px_-12px_rgba(124,58,237,0.4)] float-y"
            style={{ animationDuration: "7s", animationDelay: "0.8s" }}
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 font-display text-[11px] font-bold text-white">
              N
            </span>
          </span>
        </div>

        {/* ---------- Name + title ---------- */}
        <p
          data-splash-fade
          className="mt-12 text-[10px] font-semibold uppercase tracking-[0.4em] text-violet-600"
        >
          Welcome to my portfolio
        </p>
        <h1 className="mt-3 font-display font-bold text-slate-900 text-3xl sm:text-5xl tracking-tight flex flex-wrap justify-center">
          {NAME.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-splash-letter
              className={`inline-block ${ch === " " ? "w-4 sm:w-6" : ""} ${
                i >= 9 ? "splash-gradient-text" : ""
              }`}
              style={{ transformOrigin: "50% 100%" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <p
          data-splash-fade
          className="mt-3 text-[10px] sm:text-xs font-medium uppercase tracking-[0.32em] text-slate-500 text-center"
        >
          {TITLE}
        </p>
        <div
          data-splash-line
          aria-hidden
          className="mt-4 h-px w-44 origin-center bg-gradient-to-r from-transparent via-violet-500 to-transparent"
        />

        {/* ---------- Capability cards ---------- */}
        <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CARDS.map((card, i) => (
            <div key={card.label} data-splash-card>
              <div
                className="flex flex-col items-center gap-2 rounded-2xl bg-white/60 backdrop-blur border border-white/70 shadow-[0_16px_36px_-16px_rgba(124,58,237,0.35)] px-4 py-3.5 min-w-[124px] float-y"
                style={{
                  animationDuration: `${4.6 + i * 0.7}s`,
                  animationDelay: `${i * 0.4}s`,
                }}
              >
                <svg
                  className="w-6 h-6 text-violet-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.6}
                  viewBox="0 0 24 24"
                  aria-hidden
                >
                  {card.icon}
                </svg>
                <span className="text-[11px] font-semibold text-slate-700 whitespace-nowrap">
                  {card.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Progress rail ---------- */}
      <div className="absolute bottom-10 inset-x-0 px-8 sm:px-14 max-w-3xl mx-auto w-full">
        <div className="flex items-end justify-between mb-3">
          <span className="text-[11px] font-medium tracking-wide text-slate-500">
            Preparing Your Experience...
          </span>
          <span ref={percentRef} className="font-mono text-sm text-violet-600">
            000%
          </span>
        </div>
        <div className="h-[6px] w-full bg-slate-900/[0.08] overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="relative h-full w-full origin-left rounded-full bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#6366F1] shadow-[0_0_16px_rgba(168,85,247,0.55)]"
            style={{ transform: "scaleX(0)" }}
          >
            <span className="absolute right-0 top-0 h-full w-8 bg-white/50 blur-md" />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[10px] text-slate-400">
          {["Responsive", "Animated UI", "Modern Design", "High Performance"].map(
            (t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-violet-500"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.4}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {t}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Skip */}
      {showSkip && (
        <button
          onClick={finish}
          className="absolute bottom-4 right-6 text-[11px] text-slate-500 hover:text-violet-600 transition-colors cursor-pointer"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}

export default SplashScreen;
