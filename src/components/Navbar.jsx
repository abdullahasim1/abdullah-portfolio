import React, { useEffect, useState } from "react";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";
import { getSoundMuted, toggleSound, playClickSound } from "../lib/sound";
import { getTheme, applyTheme } from "../lib/theme";

/* Board design: har nav link ke sath chhota violet line icon */
const ICONS = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.8V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.8" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20c1.4-3.2 4-4.5 7-4.5s5.6 1.3 7 4.5" />
    </>
  ),
  skills: (
    <>
      <path d="m12 3 9.5 5L12 13 2.5 8 12 3Z" />
      <path d="m2.5 13 9.5 5 9.5-5" />
    </>
  ),
  services: (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  projects: (
    <path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
  ),
  experience: (
    <>
      <rect x="3" y="8" width="18" height="12" rx="2" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      <path d="M3 13h18" />
    </>
  ),
  certifications: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.8 13.2-1.9 6.8L12 17l5.1 3-1.9-6.8" />
    </>
  ),
  contact: (
    <>
      <path d="M21 3 10.8 13.2" />
      <path d="M21 3l-6.6 18-3.6-7.8L3 9.6 21 3Z" />
    </>
  ),
};

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Certifications", id: "certifications" },
  { label: "Contact", id: "contact" },
];

function NavIcon({ id, className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      {ICONS[id]}
    </svg>
  );
}

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(() => getSoundMuted());
  const [active, setActive] = useState("home");
  const [theme, setTheme] = useState(() => getTheme());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* Scroll-spy: jis section par ho uski nav link highlight.
       Sections lazy-load hoti hain — mount ke waqt DOM mein nahi hotin,
       is liye jo section jab appear ho use tab observe karo
       (pehle sirf "home" observe hota tha, highlight wahin atka rehta tha). */
    const ids = links.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    const observed = new Set();
    const collect = () => {
      ids.forEach((id) => {
        if (observed.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          observed.add(id);
          observer.observe(el);
        }
      });
    };
    collect();
    let mo = null;
    if (observed.size < ids.length) {
      mo = new MutationObserver(() => {
        collect();
        if (observed.size >= ids.length && mo) mo.disconnect();
      });
      mo.observe(document.body, { childList: true, subtree: true });
    }

    const onSoundToggle = (e) => setMuted(e.detail.isMuted);
    window.addEventListener("aa-sound-toggle", onSoundToggle);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("aa-sound-toggle", onSoundToggle);
      observer.disconnect();
      if (mo) mo.disconnect();
    };
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setMuted(next);
    if (!next) playClickSound();
  };

  const handleOpenPalette = () => {
    playClickSound();
    window.dispatchEvent(new CustomEvent("aa-open-palette"));
  };

  const handleSetTheme = (next) => {
    if (next === theme) return;
    playClickSound();
    applyTheme(next);
    setTheme(next);
  };

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    setMobileOpen(false);
    if (targetId === "home") {
      scrollToTop();
    } else {
      scrollToSection(targetId);
    }
  };

  const circleBtn =
    "inline-flex items-center justify-center w-10 h-10 rounded-full glass text-slate-300 light:text-violet-600 hover:text-violet-500 hover:border-violet-400/40 transition-colors cursor-pointer shrink-0";
  const segBtn = (isOn) =>
    `inline-flex h-8 w-8 items-center justify-center rounded-full transition-all cursor-pointer ${
      isOn
        ? "bg-violet-500/15 light:bg-violet-200/80 text-violet-500 shadow-[inset_0_1px_3px_rgba(124,58,237,0.25)]"
        : "text-slate-400 hover:text-violet-400"
    }`;

  return (
    <header className="nav-in fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`max-w-[1440px] mx-auto flex items-center justify-between gap-2 rounded-[26px] lg:rounded-full px-4 py-3 transition-all duration-300 ${
          scrolled || theme === "light"
            ? "glass-strong neon-ring shadow-2xl"
            : "glass"
        }`}
      >
        {/* Brand — board style line-A mark + sparkle */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group shrink-0"
          aria-label="Abdullah Asim - Home"
        >
          <span className="relative inline-flex h-11 w-11 items-center justify-center shrink-0 text-violet-500">
            <svg
              viewBox="0 0 48 48"
              className="h-10 w-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 37 24 10l15 27" />
              <path d="M16 27.5h16" />
            </svg>
            <span className="absolute -right-1 -top-0.5 text-[13px] leading-none text-fuchsia-500">✦</span>
          </span>
          <span className="hidden sm:block leading-tight">
            <span className="block font-display font-bold tracking-tight text-[15px] text-white light:text-slate-900">
              Abdullah Asim
            </span>
            <span className="block text-[11px] text-slate-400">
              Full-Stack Developer
            </span>
          </span>
        </a>

        <span className="hidden lg:block h-9 w-px bg-slate-400/25 light:bg-slate-300/70 shrink-0" aria-hidden="true" />

        {/* Desktop links — icon + label, active = gradient pill + hanging underline */}
        <div
          className="hidden lg:flex items-center gap-0.5 text-[13px]"
          role="navigation"
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const isActive = active === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                aria-current={isActive ? "true" : undefined}
                className={`relative inline-flex items-center gap-1 px-2.5 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? "text-white bg-gradient-to-r from-cyan-500 to-violet-600 shadow-[0_8px_20px_-8px_rgba(124,58,237,0.55)]"
                    : "text-slate-300 light:text-slate-700 hover:text-violet-500 hover:bg-white/[0.05] light:hover:bg-violet-50"
                }`}
              >
                <span className={isActive ? "text-white" : "text-violet-400 light:text-violet-500"}>
                  <NavIcon id={link.id} />
                </span>
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[17px] h-[5px] w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-[0_4px_10px_rgba(168,85,247,0.5)]"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Quick Command Palette — board style circle search */}
          <button
            type="button"
            onClick={handleOpenPalette}
            aria-label="Open Command Palette (Cmd + K)"
            title="Quick Search & Actions (Cmd + K)"
            className={circleBtn}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
            title={muted ? "Sound Effects: Muted (Click to enable)" : "Sound Effects: Active (Click to mute)"}
            className={`${circleBtn} hidden xl:inline-flex`}
          >
            {muted ? (
              <svg className="w-[18px] h-[18px] text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>

          {/* Theme — board style segmented sun/moon pill */}
          <div className="inline-flex items-center gap-0.5 rounded-full glass p-1 shrink-0" role="group" aria-label="Theme">
            <button
              type="button"
              onClick={() => handleSetTheme("light")}
              aria-label="Switch to light mode"
              aria-pressed={theme === "light"}
              title="Light mode"
              className={segBtn(theme === "light")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => handleSetTheme("dark")}
              aria-label="Switch to dark mode"
              aria-pressed={theme === "dark"}
              title="Dark mode"
              className={segBtn(theme === "dark")}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>

          <a
            href="/resume.pdf"
            download="Abdullah-Bin-Asim-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full glass px-4 py-2.5 text-sm font-semibold text-slate-200 light:text-slate-700 hover:text-violet-500 hover:border-violet-400/40 transition-colors"
          >
            <svg className="w-4 h-4 text-violet-400 light:text-violet-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
            </svg>
            Resume
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden sm:inline-flex sheen-btn items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(139,92,246,0.35)]"
          >
            Let&apos;s Talk
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7m0 0H8m9 0v9" />
            </svg>
          </a>

          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full glass text-slate-300 light:text-slate-700"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0 invisible"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="max-w-[1440px] mx-auto rounded-3xl glass-strong p-4 grid gap-1 text-sm"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 text-slate-300 light:text-slate-700 hover:text-violet-500 hover:bg-white/[0.05] light:hover:bg-violet-50 transition-colors"
            >
              <span className="text-violet-400 light:text-violet-500">
                <NavIcon id={link.id} />
              </span>
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="mt-2 inline-flex items-center justify-center rounded-full px-4 py-2.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
