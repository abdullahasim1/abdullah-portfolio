import React from "react";
import {
  siReact,
  siNextdotjs,
  siNodedotjs,
  siTypescript,
  siTailwindcss,
  siGsap,
  siN8n,
  siClaude,
} from "simple-icons";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";
import { playClickSound } from "../lib/sound";

const exploreLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

const ICONS = {
  sparkles: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z",
  share:
    "M7.217 10.907a2.752 2.752 0 100 5.504 2.752 2.752 0 000-5.504zm9.875-5.659a2.754 2.754 0 10-1.698-4.947 2.754 2.754 0 001.698 4.947zM4.38 13.05l6.066-3.391a2.772 2.772 0 01-.051-.973l-6.61-3.691a2.752 2.752 0 10-.905 1.618l6.41 3.58a2.752 2.752 0 01.698-.028l6.25 3.485a2.753 2.753 0 101.032-1.85l-6.776-3.783a2.772 2.772 0 01-.05.973L4.38 13.05z",
  code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  cloud:
    "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  cube: "M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9",
  layers: "M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 17l9 5 9-5",
  calendar:
    "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
  award:
    "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0",
  briefcase:
    "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m16.5 0a2.18 2.18 0 01-1.5-1.523M3.75 14.15a2.18 2.18 0 001.5-1.523m0 0a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
  star: "M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z",
};

function LineIcon({ d, className = "h-5 w-5", filled = false }) {
  return filled ? (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={d} />
    </svg>
  );
}

const whatIDo = [
  { icon: "sparkles", label: "Generative AI Integration", filled: true },
  { icon: "share", label: "Workflow Automation", filled: true },
  { icon: "code", label: "Web Development" },
  { icon: "cloud", label: "AWS & Cloud Solutions" },
  { icon: "cube", label: "SaaS Product Development" },
  { icon: "layers", label: "API Integration" },
];

const highlights = [
  { icon: "calendar", value: "3+", label: "Years Experience" },
  { icon: "layers", value: "25+", label: "Projects Shipped" },
  { icon: "award", value: "11+", label: "Certifications" },
  { icon: "code", value: "15+", label: "Technologies" },
];

const techTiles = [
  { name: "React", icon: siReact },
  { name: "Next.js", icon: siNextdotjs, mono: true },
  { name: "Node.js", icon: siNodedotjs },
  { name: "TypeScript", icon: siTypescript },
  { name: "AWS", aws: true },
  { name: "Claude", icon: siClaude },
  { name: "OpenAI", ai: true },
  { name: "Tailwind CSS", icon: siTailwindcss },
  { name: "GSAP", icon: siGsap },
  { name: "n8n", icon: siN8n },
];

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playClickSound();
    const id = href.replace(/^#/, "");
    if (id === "home") scrollToTop();
    else scrollToSection(id);
  };

  const socialBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-violet-200 bg-white text-violet-600 shadow-sm transition-all hover:-translate-y-0.5 hover:border-violet-400 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-violet-300";

  return (
    <footer className="relative px-4 pb-10 pt-6 sm:px-6">
      <div className="relative w-full overflow-hidden rounded-[2rem] border border-violet-100 bg-white px-7 pb-7 pt-12 shadow-[0_24px_60px_-24px_rgba(124,58,237,0.18)] dark:border-white/10 dark:bg-slate-900/80 sm:px-10">
        <div aria-hidden className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-600/10" />
        <div aria-hidden className="absolute -bottom-28 -left-24 h-64 w-64 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-600/10" />

        <div className="relative grid gap-10 lg:grid-cols-[1.25fr_0.75fr_1fr_1.05fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-600/25">
                <svg viewBox="0 0 48 48" className="h-7 w-7 text-white" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M10 36 L24 10 L38 36 M16.5 26.5 H31.5" />
                  <path d="M35 6l.9 2.3L38.2 9.2 35.9 10.1 35 12.4 34.1 10.1 31.8 9.2 34.1 8.3z" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <div>
                <p className="font-display text-[22px] font-extrabold leading-tight text-slate-900 dark:text-white">
                  Abdullah Asim
                </p>
                <p className="text-[13px] text-slate-500 dark:text-slate-400">
                  AI Cloud Engineer &amp; Full-Stack Developer
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-slate-600 dark:text-slate-400">
              Building scalable web experiences, AI-powered products and cloud solutions.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://github.com/abdullahasim1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialBtn}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/abdullahasim1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialBtn}>
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="mailto:abdullah.gc.18@gmail.com" aria-label="Email" className={socialBtn}>
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="lg:border-l lg:border-violet-100 lg:pl-8 dark:lg:border-white/[0.07]">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-slate-900 dark:text-white">
              <LineIcon d={ICONS.layers} className="h-5 w-5 text-violet-600 dark:text-violet-300" />
              Explore
            </h3>
            <ul className="mt-4">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="group flex items-center justify-between py-[5px] text-[15px] text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300"
                  >
                    {link.name}
                    <svg className="h-4 w-4 text-violet-300 transition-transform group-hover:translate-x-0.5 dark:text-violet-400/60" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* What I Do */}
          <div className="lg:border-l lg:border-violet-100 lg:pl-8 dark:lg:border-white/[0.07]">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-slate-900 dark:text-white">
              <LineIcon d={ICONS.briefcase} className="h-5 w-5 text-violet-600 dark:text-violet-300" />
              What I Do
            </h3>
            <ul className="mt-4">
              {whatIDo.map((item) => (
                <li key={item.label}>
                  <a
                    href="#services"
                    onClick={(e) => handleNavClick(e, "#services")}
                    className="flex items-center gap-3 py-[7px] text-[15px] text-slate-600 transition-colors hover:text-violet-600 dark:text-slate-300 dark:hover:text-violet-300"
                  >
                    <LineIcon d={ICONS[item.icon]} filled={item.filled} className="h-[18px] w-[18px] shrink-0 text-violet-500 dark:text-violet-300" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="lg:border-l lg:border-violet-100 lg:pl-8 dark:lg:border-white/[0.07]">
            <h3 className="flex items-center gap-2.5 font-display text-lg font-bold text-slate-900 dark:text-white">
              <LineIcon d={ICONS.star} filled className="h-5 w-5 text-violet-600 dark:text-violet-300" />
              Highlights
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {highlights.map((h) => (
                <div key={h.label} className="rounded-2xl border border-violet-100 bg-violet-50/50 p-3.5 dark:border-white/10 dark:bg-white/[0.03]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                    <LineIcon d={ICONS[h.icon]} className="h-[18px] w-[18px]" />
                  </span>
                  <p className="mt-2.5 font-display text-[22px] font-extrabold leading-none text-violet-600 dark:text-violet-300">
                    {h.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{h.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Built with technology */}
        <div className="relative mt-12">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-violet-100 dark:bg-white/[0.07]" />
            <span className="rounded-full bg-violet-100/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              Built with Technology
            </span>
            <span className="h-px flex-1 bg-violet-100 dark:bg-white/[0.07]" />
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-5">
            {techTiles.map((t) => (
              <div key={t.name} className="flex w-[76px] flex-col items-center gap-2">
                <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-violet-100 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                  {t.ai ? (
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-sky-500 font-display text-sm font-extrabold text-white">
                      AI
                    </span>
                  ) : t.aws ? (
                    <span className="relative font-display text-xl font-extrabold lowercase leading-none text-slate-900 dark:text-white">
                      aws
                      <svg className="absolute -bottom-[7px] left-0 h-[6px] w-full text-[#FF9900]" viewBox="0 0 24 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                        <path d="M1 1.5 C 7 5.5, 17 5.5, 23 1.5" />
                      </svg>
                    </span>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-9 w-9 ${t.mono ? "text-slate-900 dark:text-white" : ""}`}
                      style={t.mono ? undefined : { fill: `#${t.icon.hex}` }}
                      fill={t.mono ? "currentColor" : undefined}
                      aria-hidden
                    >
                      <path d={t.icon.path} />
                    </svg>
                  )}
                </span>
                <span className="text-[13px] font-medium text-slate-600 dark:text-slate-300">{t.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-10 flex flex-col items-center justify-between gap-4 border-t border-violet-100 pt-6 dark:border-white/[0.07] md:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} Abdullah Asim. All rights reserved.
          </p>
          <p className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
            <a href="/privacy.html" className="transition-colors hover:text-violet-600 dark:hover:text-violet-300">
              Privacy
            </a>
            <span aria-hidden className="h-4 w-px bg-slate-300 dark:bg-white/15" />
            <span>Terms</span>
          </p>
          <div className="flex items-center gap-5">
            <p className="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for new opportunities
            </p>
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => {
                playClickSound();
                scrollToTop();
              }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30 transition-transform hover:-translate-y-0.5"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
