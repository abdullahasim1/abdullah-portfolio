import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FloatingIcons from "./components/FloatingIcons";
import ParticleEffect from "./components/ParticleEffect";
import CursorFollower from "./components/CursorFollower";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Stats from "./pages/Stats";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Process from "./pages/Process";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={`relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0b0b0e] dark:to-[#0a0a0c] text-gray-900 dark:text-gray-100 overflow-x-clip`}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Animated Background Effects */}
      <FloatingIcons />
      <ParticleEffect />
      <CursorFollower />
      
      {/* Decorative background blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl dark:bg-indigo-500/20"></div>
      <div aria-hidden className="pointer-events-none absolute top-1/3 -right-24 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl dark:bg-fuchsia-500/20"></div>
      <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl dark:bg-emerald-500/10"></div>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-7xl mx-auto px-6 relative z-10">
        <Home />
        <About />
        <Services />
        <Stats />
        <Projects />
        <Skills />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
