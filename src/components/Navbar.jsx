import React, { useEffect, useState } from "react";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (event, targetId) => {
    event.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md transition-all ${
        scrolled
          ? "bg-white/70 dark:bg-black/40 border-b border-gray-200/60 dark:border-gray-800/60 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
          : "bg-white/40 dark:bg-black/30 border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
            alt="Abdullah Asim"
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          <span className="font-bold tracking-tight text-xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">Abdullah Asim</span>
          </span>
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Home</a>
          <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">About</a>
          <a href="#services" onClick={(e) => handleNavClick(e, "services")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Services</a>
          <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Projects</a>
          <a href="#skills" onClick={(e) => handleNavClick(e, "skills")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Skills</a>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact</a>
          
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 md:gap-3">
          
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300/60 dark:border-gray-700/60"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <span>✕</span>
            ) : (
              <span>☰</span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-black/60 backdrop-blur">
          <div className="max-w-7xl mx-auto px-6 py-4 grid gap-4 text-sm">
            <a href="#services" onClick={(e) => { handleNavClick(e, "services"); setMobileOpen(false); }} className="py-1">Services</a>
            <a href="#projects" onClick={(e) => { handleNavClick(e, "projects"); setMobileOpen(false); }} className="py-1">Projects</a>
            <a href="#skills" onClick={(e) => { handleNavClick(e, "skills"); setMobileOpen(false); }} className="py-1">Skills</a>
            <a href="#process" onClick={(e) => { handleNavClick(e, "process"); setMobileOpen(false); }} className="py-1">Process</a>
            <a href="#contact" onClick={(e) => { handleNavClick(e, "contact"); setMobileOpen(false); }} className="py-1">Contact</a>
            <a href="#contact" onClick={(e) => { handleNavClick(e, "contact"); setMobileOpen(false); }} className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white">Get Quote</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;


