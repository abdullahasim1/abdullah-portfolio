import React, { useEffect, useState } from "react";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";
import { getSoundMuted, toggleSound, playClickSound } from "../lib/sound";
import { getTheme, toggleTheme } from "../lib/theme";

const links = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Projects", id: "projects" },
  { label: "Certs", id: "certifications" },
  { label: "Skills", id: "skills" },
  { label: "Contact", id: "contact" },
];

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

    /* Scroll-spy: jis section par ho uski nav link highlight */
    const ids = links.map((l) => l.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));

    const onSoundToggle = (e) => setMuted(e.detail.isMuted);
    window.addEventListener("aa-sound-toggle", onSoundToggle);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("aa-sound-toggle", onSoundToggle);
      observer.disconnect();
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

  const handleThemeToggle = () => {
    playClickSound();
    setTheme(toggleTheme());
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

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav
        className={`max-w-6xl mx-auto flex items-center justify-between gap-4 rounded-2xl px-4 md:px-6 py-3 transition-all duration-300 ${
          /* Light mode mein navbar hamesha dark pill — light canvas par premium look */
          scrolled || theme === "light"
            ? "glass-strong neon-ring shadow-2xl"
            : "glass"
        }`}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3 group shrink-0"
          aria-label="Abdullah Asim - Home"
        >
          <span className="relative">
            <img
              src="/IMG-20240224-WA0006.jpg"
              alt="Abdullah Bin Asim - Full Stack Developer"
              className="w-10 h-10 rounded-xl object-cover border border-cyan-400/40 group-hover:border-cyan-300 transition-colors"
              width="40"
              height="40"
            />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-void blink-dot" />
          </span>
          <span className="font-display font-bold tracking-tight text-lg hidden sm:block">
            <span className="text-white">abdullah</span>
            <span className="text-gradient">.dev</span>
          </span>
        </a>

        {/* Desktop links */}
        <div
          className="hidden lg:flex items-center gap-1 text-sm"
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
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "text-cyan-300 bg-white/[0.06] shadow-[inset_0_0_0_1px_rgba(34,211,238,0.15)]"
                    : "text-slate-400 hover:text-cyan-300 hover:bg-white/[0.05]"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Quick Command Palette Button */}
          <button
            type="button"
            onClick={handleOpenPalette}
            aria-label="Open Command Palette (Cmd + K)"
            title="Quick Search & Actions (Cmd + K)"
            className="inline-flex items-center gap-1.5 rounded-xl glass px-2.5 sm:px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-pointer"
          >
            <svg
              className="w-3.5 h-3.5 text-cyan-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden md:inline font-mono text-[10px] text-slate-400 bg-white/[0.08] px-1.5 py-0.5 rounded">
              ⌘K
            </span>
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
            title={
              muted
                ? "Sound Effects: Muted (Click to enable)"
                : "Sound Effects: Active (Click to mute)"
            }
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl glass text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-pointer"
          >
            {muted ? (
              <svg
                className="w-4 h-4 text-slate-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4 text-cyan-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={handleThemeToggle}
            aria-label={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            title={
              theme === "light" ? "Switch to dark mode" : "Switch to light mode"
            }
            className="inline-flex items-center justify-center w-9 h-9 rounded-xl glass text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-pointer"
          >
            {theme === "light" ? (
              /* Moon — dark mode par jao */
              <svg
                className="w-4 h-4 text-cyan-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              /* Sun — light mode par jao */
              <svg
                className="w-4 h-4 text-amber-300"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          <a
            href="/resume.pdf"
            download="Abdullah-Bin-Asim-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl glass px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
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
            Resume
          </a>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="hidden sm:inline-flex sheen-btn items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all shadow-[0_0_24px_rgba(34,211,238,0.25)] hover:shadow-[0_0_32px_rgba(139,92,246,0.35)]"
          >
            Hire Me
          </a>

          <button
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl glass text-slate-300"
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
          className="max-w-6xl mx-auto rounded-2xl glass-strong p-4 grid gap-1 text-sm"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="rounded-lg px-4 py-2.5 text-slate-300 hover:text-cyan-300 hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="mt-2 inline-flex items-center justify-center rounded-xl px-4 py-2.5 font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600"
          >
            Hire Me
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
