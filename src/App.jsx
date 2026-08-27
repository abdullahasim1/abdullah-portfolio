import React, { Suspense, lazy, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";
import ScrollProgress from "./components/ScrollProgress";
import TechTicker from "./components/TechTicker";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import { IS_LOW_END } from "./lib/device";

/* Three.js wale components lazy — warna three main bundle mein aa jata hai */
const SplashScreen = lazy(() => import("./components/SplashScreen"));
const SiteBackground = lazy(() => import("./components/three/SiteBackground"));

/* Below-the-fold sections lazy load */
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Stats = lazy(() => import("./pages/Stats"));
const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const Certifications = lazy(() => import("./pages/Certifications"));
const Process = lazy(() => import("./pages/Process"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Faq = lazy(() => import("./pages/Faq"));
const Contact = lazy(() => import("./pages/Contact"));

function App() {
  // Splash har session mein sirf ek dafa (refresh pe skip hota hai)
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return true;
    return sessionStorage.getItem("aa-splash-seen") === "1";
  });

  const handleSplashFinish = () => {
    sessionStorage.setItem("aa-splash-seen", "1");
    setIntroDone(true);
  };

  return (
    <div className="relative min-h-screen bg-void text-slate-200 overflow-x-clip">
      {/* Skip to content (keyboard users) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-xl focus:bg-cyan-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lg"
      >
        Skip to content
      </a>

      {/* Top progress bar */}
      <ScrollProgress />

      {/* Custom cursor */}
      <CursorFollower />

      {/* Film grain texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed site-wide 3D background (starfield + drifting wireframes) — low-end par skip */}
      {!IS_LOW_END && (
        <Suspense fallback={null}>
          <SiteBackground />
        </Suspense>
      )}

      {/* Ambient background glows */}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        <div className="absolute top-1/3 -right-48 h-[520px] w-[520px] rounded-full bg-violet-600/[0.08] blur-[130px]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />
        {/* Subtle dot matrix texture */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.055) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
      </div>

      <Navbar />

      <main id="main-content" tabIndex={-1} className="relative z-10 focus:outline-none">
        <Home introDone={introDone} />
        <TechTicker />
        <Suspense fallback={<div className="py-20" />}>
          <About />
          <Services />
          <Stats />
          <Projects />
          <Skills />
          <Certifications />
          <Process />
          <Testimonials />
          <Faq />
          <Contact />
        </Suspense>
      </main>

      <Footer />
      <ScrollToTop />

      {/* 3D intro splash — site ke upar render hota hai */}
      {!introDone && (
        <Suspense fallback={null}>
          <SplashScreen onFinish={handleSplashFinish} />
        </Suspense>
      )}
    </div>
  );
}

export default App;
