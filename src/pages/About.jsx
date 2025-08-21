import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const strengths = [
  {
    title: "Backend Expertise",
    desc: "Scalable, secure apps that handle real-world demands",
  },
  {
    title: "Frontend Finesse",
    desc: "Sleek interfaces that feel natural on any screen",
  },
  {
    title: "Design Mastery",
    desc: "Branding and visuals that connect emotionally",
  },
  {
    title: "Problem Solver",
    desc: "Complex challenges solved with creative tech solutions",
  },
  {
    title: "On-Time Delivery",
    desc: "You get quality work, delivered fast and reliably",
  },
];

function About() {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Why Choose Me</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="text-left space-y-5">
            <p className="reveal text-gray-700 dark:text-gray-300">
              I'm a full-stack developer specializing in React, Node.js, and modern web technologies. I love building fast, accessible, and delightful user interfaces.
            </p>
            <p className="reveal text-gray-700 dark:text-gray-300">
              My work blends clean design, robust engineering, and attention to detail. Outside of coding, I enjoy learning new tools and contributing to open source.
            </p>
            <p className="reveal text-gray-700 dark:text-gray-300">
              Let's create something your users will love.
            </p>
          </div>
          <div className="reveal rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6">
            <h3 className="font-semibold mb-4">My Strengths & What They Mean for You</h3>
            <div className="space-y-4">
              {strengths.map((s) => (
                <div key={s.title} className="border-l-2 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{s.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.desc}</p>
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


