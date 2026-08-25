import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CursorFollower from "./components/CursorFollower";
import ScrollProgress from "./components/ScrollProgress";
import TechTicker from "./components/TechTicker";
import SplashScreen from "./components/SplashScreen";
import SiteBackground from "./components/three/SiteBackground";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Stats from "./pages/Stats";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Certifications from "./pages/Certifications";
import Process from "./pages/Process";
import Testimonials from "./pages/Testimonials";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import ScrollToTop from "./components/ScrollToTop";

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
      {/* Top progress bar */}
      <ScrollProgress />

      {/* Custom cursor */}
      <CursorFollower />

      {/* Film grain texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Fixed site-wide 3D background (starfield + drifting wireframes) */}
      <SiteBackground />

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

      <main className="relative z-10">
        <Home introDone={introDone} />
        <TechTicker />
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
      </main>

      <Footer />
      <ScrollToTop />

      {/* 3D intro splash — site ke upar render hota hai */}
      {!introDone && <SplashScreen onFinish={handleSplashFinish} />}
    </div>
  );
}

export default App;
