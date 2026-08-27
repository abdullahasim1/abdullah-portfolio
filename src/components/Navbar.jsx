import React, { useEffect, useState } from "react";
import { scrollToSection, scrollToTop } from "../lib/smoothScroll";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          scrolled ? "glass-strong neon-ring shadow-2xl" : "glass"
        }`}
      >
        {/* Brand */}
        <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="flex items-center gap-3 group shrink-0" aria-label="Abdullah Asim - Home">
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
        <div className="hidden lg:flex items-center gap-1 text-sm" role="navigation" aria-label="Main navigation">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="px-3 py-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download="Abdullah-Bin-Asim-Resume.pdf"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-xl glass px-3.5 py-2 text-sm font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 4v12m0 0l-4-4m4 4l4-4" />
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
      {mobileOpen && (
        <div className="lg:hidden mt-2 max-w-6xl mx-auto rounded-2xl glass-strong p-4 grid gap-1 text-sm" role="navigation" aria-label="Mobile navigation">
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
      )}
    </header>
  );
}

export default Navbar;
