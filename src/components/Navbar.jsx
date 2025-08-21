import React, { useState } from "react";

function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Home
            </a>
            <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              About
            </a>
            <a href="#services" onClick={(e) => handleNavClick(e, "services")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Services
            </a>
            <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Projects
            </a>
            <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="magnetic px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity font-medium"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/60 dark:border-gray-800/60">
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Home
              </a>
              <a href="#about" onClick={(e) => handleNavClick(e, "about")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                About
              </a>
              <a href="#services" onClick={(e) => handleNavClick(e, "services")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Services
              </a>
              <a href="#projects" onClick={(e) => handleNavClick(e, "projects")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Projects
              </a>
              <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                Contact
              </a>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200/60 dark:border-gray-800/60">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {theme === "dark" ? "☀️" : "🌙"}
                </button>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, "contact")}
                  className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity font-medium text-center"
                >
                  Get Quote
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;


