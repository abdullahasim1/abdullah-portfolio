import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import WordFlipper from "../components/WordFlipper";

function Home() {
  const headingRef = useRef(null);

  useEffect(() => {
    // Initial animation for the hero section
    const tl = gsap.timeline();
    
    tl.fromTo(headingRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    );
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-6 mx-auto max-w-4xl" ref={headingRef}>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400 mx-auto reveal">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Available for new opportunities
          </span>
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-reveal">
              <span className="block">Full Stack Web Developer</span>
              <span className="block">and <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500">UI/UX Expert</span></span>
            </h1>
          </div>
          <h3 className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 reveal">
            Build Your Vision with Clean Code and Stunning Design
          </h3>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-xl mx-auto reveal">
            <span className="block">Need a web app that performs flawlessly or visuals that tell your brand's story? I'm</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500">Abdullah Bin Asim</span>
            <span className="block">a results-driven developer and designer who transforms ideas into seamless digital products. Let's turn your project into a reality—faster, better, smarter.</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs place-items-center mx-auto max-w-2xl stagger-children">
            {/* Service Badges */}
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 float-card">Backend Development</span>
            <span className="px-3 py-1 rounded-full bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-900/40 dark:text-fuchsia-300 float-card">Mobile Apps</span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 float-card">Web Apps</span>
            <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300 float-card">UI/UX Design</span>
          </div>
          <div className="flex gap-3 justify-center">
            <a href="#contact" className="magnetic px-5 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity">
              Get a Free Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;


