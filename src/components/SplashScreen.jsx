import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { IS_LOW_END } from "../lib/device";

/* Light Minimal: splash ab sirf saaf naam + progress hai — koi 3D canvas nahi. */

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
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-[#fbfbfa] overflow-hidden flex flex-col items-center justify-center"
      style={{ clipPath: "circle(150% at 50% 50%)" }}
      aria-label="Loading portfolio"
    >
      <div ref={stageRef} className="relative flex flex-col items-center will-change-transform">
        <p data-splash-fade className="mt-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-slate-500">
          Portfolio
        </p>
        <h1 className="mt-3 font-display font-medium text-slate-900 text-3xl sm:text-5xl tracking-tight flex flex-wrap justify-center">
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
          AI Cloud Engineer · AI &amp; Automation
        </p>
      </div>

      {/* Bottom progress rail */}
      <div data-splash-fade className="absolute bottom-10 inset-x-0 px-8 sm:px-14 max-w-3xl mx-auto w-full">
        <div className="flex items-end justify-between mb-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">Initializing</span>
          <span ref={percentRef} className="font-mono text-sm text-slate-700">000%</span>
        </div>
        <div className="h-px w-full bg-slate-900/10 overflow-hidden rounded-full">
          <div
            ref={barRef}
            className="h-full w-full origin-left bg-slate-900"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Skip */}
      {showSkip && (
        <button
          onClick={finish}
          className="absolute bottom-4 right-6 text-[11px] text-slate-500 hover:text-slate-900 transition-colors"
        >
          Skip intro →
        </button>
      )}
    </div>
  );
}

export default SplashScreen;
