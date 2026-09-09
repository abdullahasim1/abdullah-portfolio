import React, { Suspense, lazy } from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import { IS_LOW_END } from "../lib/device";
import { timeline } from "../data/experience";

const HoloOrb = lazy(() => import("../components/three/HoloOrb"));

const strengths = [
  {
    icon: "🧩",
    title: "Problem Solver",
    desc: "I break complex challenges into manageable solutions, keeping your project on track and results-driven.",
  },
  {
    icon: "⌨️",
    title: "Clean Code Advocate",
    desc: "Maintainable, scalable code that grows with your business and makes future updates effortless.",
  },
  {
    icon: "🎯",
    title: "User-Focused Designer",
    desc: "Every pixel and interaction is crafted for your users — experiences that convert and delight.",
  },
  {
    icon: "⚡",
    title: "Fast & Reliable",
    desc: "Quick turnaround without compromising quality. Your deadlines are my deadlines.",
  },
  {
    icon: "💬",
    title: "Communication Pro",
    desc: "Regular updates, clear explanations, and always available to discuss progress.",
  },
  {
    icon: "🚀",
    title: "Future-Proof Tech",
    desc: "Cutting-edge technologies that keep your product competitive and scalable for years.",
  },
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
                I'm a passionate{" "}
                <span className="text-cyan-300 font-medium">
                  Full Stack Developer
                </span>{" "}
                with a love for creating seamless digital experiences. With
                expertise across frontend and backend — plus{" "}
                <span className="text-violet-300 font-medium">
                  AWS Generative AI credentials
                </span>{" "}
                — I bring ideas to life with clean code and intuitive design.
              </p>
              <p>
                My journey started with curiosity and evolved into a commitment
                to shipping high-quality products that solve real problems. From
                AI-powered platforms to full-stack web apps — I build things
                that work, scale, and look great doing it.
              </p>

              {/* Holographic 3D orb */}
              {!IS_LOW_END && (
                <div className="relative h-40 sm:h-48 -mx-2">
                  <Suspense fallback={null}>
                    <HoloOrb className="absolute inset-0" />
                  </Suspense>
                </div>
              )}

              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-3 border-t border-white/[0.06]">
                {[
                  ["3+", "Years Experience"],
                  ["25+", "Projects Shipped"],
                  ["8+", "Certifications"],
                ].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-2xl font-bold text-gradient">
                      {num}
                    </div>
                    <div className="text-xs text-slate-400">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-display text-xl font-semibold text-white reveal light:text-slate-900">
              My Strengths &amp; What They Mean for You
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {strengths.map((strength) => (
                <div
                  key={strength.title}
                  className="reveal glass rounded-2xl p-5 card-glow-hover hover:-translate-y-1"
                >
                  <div className="text-2xl mb-3">{strength.icon}</div>
                  <h4 className="font-display font-semibold text-slate-100 mb-1.5">
                    {strength.title}
                  </h4>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {strength.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience & milestones timeline */}
        <div className="mt-24">
          <h3 className="reveal font-display text-2xl md:text-3xl font-bold text-white mb-10 light:text-slate-900">
            Experience &amp; Milestones
          </h3>
          <div className="relative border-l border-white/[0.09] ml-3 space-y-12 light:border-slate-300">
            {timeline.map((item) => (
              <div key={item.title + item.period} className="reveal relative pl-8">
                {/* Timeline dot */}
                <span
                  aria-hidden
                  className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 border-2 border-void shadow-[0_0_14px_rgba(34,211,238,0.55)] light:border-white"
                />
                <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90 light:text-cyan-700">
                  {item.period}
                </div>
                <h4 className="font-display font-bold text-slate-100 mt-1.5 light:text-slate-900">
                  {item.title}
                </h4>
                <div className="text-sm font-medium text-violet-300/90 mt-0.5 light:text-violet-700">
                  {item.org}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-2 max-w-2xl light:text-slate-600">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.07] text-slate-300 light:bg-slate-900/5 light:border-slate-300 light:text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
