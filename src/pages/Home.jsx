import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "../components/MagneticButton";
import { goSection } from "../lib/router";
import { techStack } from "../data/techLogos";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: "code", num: "25+", label: "Projects Completed" },
  { icon: "users", num: "10+", label: "Happy Clients" },
  { icon: "bolt", num: "3+", label: "Years Experience" },
  { icon: "award", num: "11+", label: "Certifications" },
];

function StatIcon({ name }) {
  const cls = "w-6 h-6 text-violet-400";
  if (name === "code")
    return (
      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    );
  if (name === "users")
    return (
      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    );
  if (name === "bolt")
    return (
      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    );
  if (name === "award")
    return (
      <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
      </svg>
    );
  return (
    <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
    </svg>
  );
}

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/abdullahasim1",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abdullahasim1/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-.001-4.124 2.062 2.062 0 01.001 4.124zM7.119 20.452H3.554V9h3.565v11.452z",
  },
];

function HeroChip({ item, className = "", delay = "0s" }) {
  return (
    <span
      className={`absolute inline-flex items-center gap-2 rounded-2xl glass-strong px-3.5 py-2.5 text-xs font-semibold text-slate-100 light:text-slate-800 float-y ${className}`}
      style={{ animationDelay: delay }}
    >
      {item.mono ? (
        <span
          className="inline-flex h-[22px] items-center justify-center rounded-md px-1.5 text-[9px] font-bold"
          style={{
            background: `linear-gradient(135deg, ${item.mono.from}22, ${item.mono.to}22)`,
            border: `1px solid ${item.mono.from}55`,
            color: item.mono.from,
          }}
        >
          {item.mono.label}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d={item.icon.path} fill={`#${item.icon.hex}`} />
        </svg>
      )}
      {item.name}
    </span>
  );
}

function Home({ introDone = true }) {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (!introDone || !sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-stagger]", {
        y: 30,
        opacity: 0,
        duration: 1.1,
        stagger: 0.13,
        ease: "power3.out",
        delay: 0.15,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [introDone]);

  /* Hero visual par halka scroll parallax — inkwell-style scrub feel */
  useEffect(() => {
    if (!visualRef.current) return;
    const tween = gsap.to(visualRef.current, {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    goSection(id);
  };

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-0 pt-36 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — intro */}
          <div className="space-y-7">
            <span
              data-hero-stagger
              className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-slate-300"
            >
              👋 Hello, I&apos;m
            </span>

            <h1
              data-hero-stagger
              className="font-display font-bold leading-[1.04] tracking-tight text-5xl sm:text-6xl lg:text-7xl"
            >
              <span className="text-white light:text-slate-900">Abdullah </span>
              <span className="text-gradient">Asim</span>
            </h1>

            <p data-hero-stagger className="font-display text-xl md:text-2xl font-semibold text-slate-200 light:text-slate-700">
              Generative AI Engineer
            </p>

            <p data-hero-stagger className="text-slate-400 leading-relaxed max-w-xl">
              AI Cloud Engineer at Experts Cloud with AWS Generative AI
              Professional &amp; Claude Certified Architect credentials. I build
              modern, scalable and AI-powered web applications using React,
              Next.js, Node.js and AWS — turning ideas into real, impactful
              digital products.
            </p>

            <div data-hero-stagger className="flex flex-wrap items-center gap-4 pt-1">
              <MagneticButton href="/#projects">View Projects</MagneticButton>
              <a
                href="/resume.pdf"
                download="Abdullah-Bin-Asim-Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3.5 font-semibold text-slate-200 light:text-slate-700 hover:border-violet-400/40 hover:text-violet-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Download CV
              </a>
            </div>

            <div data-hero-stagger className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-slate-300 light:text-slate-600 hover:text-violet-300 hover:border-violet-400/40 transition-colors"
                >
                  <svg className="w-4.5 h-4.5 w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "contact")}
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-slate-300 light:text-slate-600 hover:text-violet-300 hover:border-violet-400/40 transition-colors"
              >
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right — hero visual with floating badges */}
          <div data-hero-stagger className="relative">
            <div ref={visualRef} className="relative will-change-transform">
              <div
                aria-hidden
                className="absolute -inset-6 rounded-[36px] bg-violet-600/[0.13] blur-3xl"
              />
              <img
                src="/hero-light.webp"
                alt="Floating laptop with a code editor on a soft lavender background"
                className="relative w-full rounded-[28px] border border-violet-200/70 light:border-violet-100 object-cover shadow-[0_30px_80px_-30px_rgba(124,58,237,0.35)]"
                width="960"
                height="640"
                fetchPriority="high"
              />
              <HeroChip item={techStack[5]} className="-top-4 right-6" />
              <HeroChip item={techStack[0]} className="top-1/3 -left-3 sm:-left-6" delay="0.7s" />
              <HeroChip item={techStack[1]} className="-bottom-4 left-8" delay="1.2s" />
              <HeroChip
                item={{ name: "Generative AI", mono: { label: "AI", from: "#8b5cf6", to: "#6366f1" } }}
                className="-bottom-4 right-8"
                delay="0.4s"
              />
            </div>
          </div>
        </div>

        {/* Stats bar — mockup style */}
        <div
          data-hero-stagger
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-8 rounded-3xl glass px-8 py-7"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <StatIcon name={s.icon} />
              <div>
                <div className="font-display text-2xl font-bold text-white light:text-slate-900 leading-none">
                  {s.num}
                </div>
                <div className="text-xs text-slate-400 mt-1.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
