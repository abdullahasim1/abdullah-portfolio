import React, { Suspense, lazy } from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";

const HoloOrb = lazy(() => import("../components/three/HoloOrb"));

const strengths = [
  {
    icon: "🧩",
    title: "Problem Solver",
    desc: "I break complex challenges into manageable solutions, keeping your project on track and results-driven."
  },
  {
    icon: "⌨️",
    title: "Clean Code Advocate",
    desc: "Maintainable, scalable code that grows with your business and makes future updates effortless."
  },
  {
    icon: "🎯",
    title: "User-Focused Designer",
    desc: "Every pixel and interaction is crafted for your users — experiences that convert and delight."
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    desc: "Quick turnaround without compromising quality. Your deadlines are my deadlines."
  },
  {
    icon: "💬",
    title: "Communication Pro",
    desc: "Regular updates, clear explanations, and always available to discuss progress."
  },
  {
    icon: "🚀",
    title: "Future-Proof Tech",
    desc: "Cutting-edge technologies that keep your product competitive and scalable for years."
  }
];

function About() {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="About Me"
          title="Turning Ideas Into Digital Reality"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 reveal">
            <div className="rounded-2xl glass card-glow-hover p-8 space-y-5 text-slate-400 leading-relaxed">
              <p>
                I'm a passionate <span className="text-cyan-300 font-medium">Full Stack Developer</span> with a
                love for creating seamless digital experiences. With expertise across frontend and backend —
                plus <span className="text-violet-300 font-medium">AWS Generative AI credentials</span> — I bring
                ideas to life with clean code and intuitive design.
              </p>
              <p>
                My journey started with curiosity and evolved into a commitment to shipping high-quality
                products that solve real problems. From AI-powered platforms to full-stack web apps —
                I build things that work, scale, and look great doing it.
              </p>

              {/* Holographic 3D orb */}
              <div className="relative h-40 sm:h-48 -mx-2">
                <Suspense fallback={null}>
                  <HoloOrb className="absolute inset-0" />
                </Suspense>
              </div>

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-3 border-t border-white/[0.06]">
                {[
                  ["3+", "Years Experience"],
                  ["25+", "Projects Shipped"],
                  ["8", "Certifications"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl font-bold text-gradient">{num}</div>
                    <div className="text-xs text-slate-500">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold text-white reveal">
              My Strengths &amp; What They Mean for You
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {strengths.map((strength) => (
                <div
                  key={strength.title}
                  className="reveal glass rounded-2xl p-5 card-glow-hover hover:-translate-y-1"
                >
                  <div className="text-2xl mb-3">{strength.icon}</div>
                  <h4 className="font-display font-semibold text-slate-100 mb-1.5">{strength.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{strength.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
