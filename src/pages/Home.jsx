import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitTextAnimation from "../components/SplitTextAnimation";
import WordFlipper from "../components/WordFlipper";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const imageRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 24, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "power2.out", delay: 0.2 }
      );
    }
  }, []);

  return (
    <section id="home" className="min-h-[92vh] flex items-center py-20">
      <div className="w-full flex justify-center">
        <div className="max-w-3xl text-center space-y-6" ref={headingRef}>
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Available for new opportunities
          </span>
          <div className="space-y-1">
            {/* Static first line (no SplitText) */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="block">Full Stack Web Developer</span>
            </h1>
            {/* Role flipper */}
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              <span className="block">
                and <span>
                  <WordFlipper
                    words={["UI/UX Expert", "Developer", "Hacker"]}
                    intervalMs={2500}
                    initialDelayMs={1200}
                    textClassName="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"
                  />
                </span>
              </span>
            </h1>
          </div>
          <SplitTextAnimation animationType="lines" delay={0.5} className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
            Build Your Vision with Clean Code and Stunning Design
          </SplitTextAnimation>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl text-xl">
            <span className="block">Need a web app that performs flawlessly or visuals that tell your brand's story? I'm</span>
            <span className="bg-clip-text text-transparent text-2xl font-bold font-stretch-100% bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500"> Abdullah Bin Asim,</span>
            <span className="block"> a results-driven developer and designer who transforms ideas into seamless digital products. Let's turn your project into a reality—faster, better, smarter.</span>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs place-items-center mx-auto max-w-2xl">
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200/70 dark:border-indigo-800/70 px-3 py-2 bg-fuchsia/50 dark:bg-rose/30 backdrop-blur">Backend Development</span>
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200/70 dark:border-indigo-800/70 px-3 py-2 bg-indigo/50 dark:bg-fuchsia/30 backdrop-blur">Mobile Apps</span>
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200/70 dark:border-indigo-800/70 px-3 py-2 bg-rose/50 dark:bg-indigo/30 backdrop-blur">Web Apps</span>
            <span className="inline-flex items-center justify-center rounded-full border border-gray-200/70 dark:border-indigo-800/70 px-3 py-2 bg-emerald/50 dark:bg-indigo/30 backdrop-blur">UI/UX Design</span>
          </div>
          <div className="pt-2">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">Let's Build Your Project Today</div>
            <div className="flex gap-3 justify-center">
              <a href="#contact" className="px-5 py-3 rounded-md bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white hover:opacity-90 transition-opacity">Get a Free Quote</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;


