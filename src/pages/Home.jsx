import React, { Suspense, lazy, useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitTextAnimation from "../components/SplitTextAnimation";
import WordFlipper from "../components/WordFlipper";
import MagneticButton from "../components/MagneticButton";
import { scrollToSection } from "../lib/smoothScroll";
import { IS_LOW_END } from "../lib/device";

// Hero 3D scene — lazy chunk (heavy hai, sirf zaroorat par load hota hai)
const HeroScene = lazy(() => import("../components/three/HeroScene"));

const chips = [
  "React",
  "Next.js",
  "Node.js",
  "Claude & AI Agents",
  "GoHighLevel",
  "Make.com",
  "n8n",
  "AWS",
];

function Home({ introDone = true }) {
  const contentRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    // Splash screen ke baad hi hero entrance chale
    if (!introDone || !contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-stagger]", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }, contentRef);
    return () => ctx.revert();
  }, [introDone]);

  /* Mouse parallax — sirf desktops par (touch/low-end skip), subtle depth effect */
  useEffect(() => {
    if (IS_LOW_END || !parallaxRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const dx = e.clientX / window.innerWidth - 0.5;
        const dy = e.clientY / window.innerHeight - 0.5;
        parallaxRef.current.style.transform = `translate3d(${dx * -16}px, ${dy * -12}px, 0)`;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
    >
      {/* CSS glow fallback while the R3F scene loads */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full bg-cyan-500/[0.08] blur-[110px]" />
      </div>

      {/* Cyber grid floor */}
      <div className="grid-floor" aria-hidden="true" />

      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-void to-transparent pointer-events-none"
      />

      {/* Content */}
      <div
        ref={parallaxRef}
        className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-8 md:pb-28 w-full will-change-transform"
      >
        <div ref={contentRef}>
        <div className="max-w-2xl space-y-7">
          <span
            data-hero-stagger
            className="inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-slate-300 light:bg-white light:border-slate-300/80 light:text-slate-700"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for new opportunities
          </span>

          <h1
            data-hero-stagger
            className="font-display font-bold leading-[1.05] tracking-tight text-4xl sm:text-6xl lg:text-7xl"
          >
            <span className="block text-white light:text-slate-900">Full Stack</span>
            <span className="block">
              <WordFlipper
                words={["Developer.", "UI/UX Designer.", "AI Builder."]}
                intervalMs={2600}
                initialDelayMs={1400}
                textClassName="text-gradient"
              />
            </span>
          </h1>

          <SplitTextAnimation
            
            delay={0.6}
            className="text-lg md:text-2xl font-medium text-slate-300 light:text-slate-600"
          >
            I build fast, scalable products with clean code and stunning design.
          </SplitTextAnimation>

          <p
            data-hero-stagger
            className="text-slate-400 leading-relaxed max-w-xl light:text-slate-600"
          >
            Hi, I'm{" "}
            <span className="text-white font-semibold light:text-slate-900">
              Abdullah Bin Asim
            </span>{" "}
            — a results-driven developer &amp; designer with AWS Generative AI
            credentials. From AI-powered platforms to full-stack web apps, I
            turn ideas into digital products that perform.
          </p>

          <div data-hero-stagger className="flex flex-wrap gap-2 max-w-md">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full glass px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-default light:bg-white light:border-slate-300 light:text-slate-700 light:hover:text-cyan-600"
              >
                {chip}
              </span>
            ))}
          </div>

          <div
            data-hero-stagger
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <MagneticButton href="#contact">Start a Project</MagneticButton>
            <a
              href="/resume.pdf"
              download="Abdullah-Bin-Asim-Resume.pdf"
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 font-semibold text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors light:bg-white light:border-slate-300 light:text-slate-700 light:hover:text-cyan-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              Download Resume
            </a>
            <a
              href="#projects"
              onClick={(e) => scrollTo(e, "projects")}
              className="inline-flex items-center gap-2 rounded-xl glass px-6 py-3.5 font-semibold text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors light:bg-white light:border-slate-300 light:text-slate-700 light:hover:text-cyan-600"
            >
              View My Work
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </div>
        </div>
      </div>

      {/* 3D Scene */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Suspense fallback={null}>{!IS_LOW_END && <HeroScene />}</Suspense>
      </div>

      {/* Scroll hint */}
      <a
        href="#about"
        onClick={(e) => scrollTo(e, "about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-slate-400 hover:text-cyan-300 transition-colors light:text-slate-500"
      >
        Scroll
        <span className="block h-8 w-px bg-gradient-to-b from-cyan-400 to-transparent float-y" />
      </a>
    </section>
  );
}

export default Home;
