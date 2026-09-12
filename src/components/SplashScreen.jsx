import React, { Suspense, lazy, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IS_LOW_END } from "../lib/device";

/* R3F lazy — SplashScreen App ka static import hai, is liye Canvas yahan
   lazy kiya hai warna three/r3f chunks HAR page load pe initial JS mein
   aa jate hain (mobile pe bhi, jahan splash kabhi chalta hi nahi). */
const SplashCanvas = lazy(() =>
  import("./three/SplashCanvas").then((m) => ({ default: m.SplashCanvas }))
);

const NAME = "ABDULLAH ASIM";

function SplashScreen({ onFinish }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null); // canvas + text wrapper (fly-through target)
  const percentRef = useRef(null);
  const barRef = useRef(null);
  const progressRef = useRef(0);
  const finishedRef = useRef(false);

  const [showSkip, setShowSkip] = useState(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    // Fly-through iris: camera object ke through site mein enter hota hai
    const tl = gsap.timeline({
      onComplete: () => onFinish(),
    });
    tl.to(stageRef.current, {
      scale: 2.6,
      opacity: 0,
      duration: 0.85,
      ease: "power3.in",
    }, 0)
      .to(rootRef.current, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 0.9,
        ease: "power3.inOut",
      }, 0.15);
  };

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || IS_LOW_END) {
      onFinish();
      return;
    }

    const ctx = gsap.context(() => {
      // Name letters stagger in
      gsap.from("[data-splash-letter]", {
        y: 46,
        opacity: 0,
        rotateX: -80,
        duration: 0.8,
        stagger: 0.045,
        ease: "back.out(1.8)",
        delay: 0.25,
      });
      gsap.from("[data-splash-fade]", {
        opacity: 0,
        y: 14,
        duration: 0.7,
        stagger: 0.12,
        delay: 0.7,
      });

      // Progress 0 → 100 (min showtime ~2.2s)
      const counter = { v: 0 };
      gsap.to(counter, {
        v: 100,
        duration: 2.1,
        delay: 0.35,
        ease: "power2.inOut",
        onUpdate: () => {
          progressRef.current = counter.v / 100;
          if (percentRef.current) {
            percentRef.current.textContent = `${String(Math.round(counter.v)).padStart(3, "0")}%`;
          }
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${counter.v / 100})`;
          }
        },
        onComplete: () => {
          gsap.delayedCall(0.35, finish);
        },
      });
    }, rootRef);

    const skipTimer = setTimeout(() => setShowSkip(true), 1100);

    return () => {
      ctx.revert();
      clearTimeout(skipTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-void overflow-hidden flex flex-col items-center justify-center"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
      aria-label="Loading portfolio"
    >
      {/* Ambient glows */}
      <div aria-hidden className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-cyan-500/[0.07] blur-[110px]" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-violet-600/[0.08] blur-[110px]" />

      {/* 3D stage */}
      <div ref={stageRef} className="relative flex flex-col items-center will-change-transform">
        <div className="w-[min(64vw,340px)] aspect-square pointer-events-none" aria-hidden="true">
          <Suspense fallback={null}>
            <SplashCanvas progressRef={progressRef} />
          </Suspense>
        </div>

        <p data-splash-fade className="mt-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-cyan-300/70">
          Welcome to my universe
        </p>
        <h1 className="mt-3 font-display font-bold text-white text-2xl sm:text-4xl tracking-tight flex flex-wrap justify-center">
          {NAME.split("").map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              data-splash-letter
              className={`inline-block ${ch === " " ? "w-4 sm:w-6" : ""}`}
              style={{ transformOrigin: "50% 100%" }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </h1>
        <p data-splash-fade className="mt-2 text-xs sm:text-sm text-slate-400 tracking-wide">
          Full Stack Developer · AI &amp; Automation
        </p>
      </div>

      {/* Bottom progress rail */}
      <div data-splash-fade className="absolute bottom-10 inset-x-0 px-8 sm:px-14 max-w-3xl mx-auto w-full">
        <div className="flex items-end justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Initializing</span>
          <span ref={percentRef} className="font-mono text-sm text-cyan-300">000%</span>
        </div>
        <div className="h-px w-full bg-white/[0.08] overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-gradient-to-r from-cyan-400 via-indigo-400 to-violet-500 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Skip */}
      {showSkip && (
        <button
          onClick={finish}
          className="absolute bottom-4 right-6 text-[11px] text-slate-600 hover:text-cyan-300 transition-colors"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}

export default SplashScreen;
