import React from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const services = [
  { title: "Web App Development", desc: "Custom, scalable web apps built with React, Node, and modern tooling.", badge: "React • Node • REST" },
  { title: "Mobile Apps", desc: "Cross-platform apps using React Native for iOS and Android.", badge: "React Native" },
  { title: "Backend APIs", desc: "Secure, performant APIs with Node and PostgreSQL.", badge: "Node • PostgreSQL" },
  { title: "UI/UX & Branding", desc: "Design systems and visuals that convert and delight.", badge: "Figma • Design Systems" },
  { title: "Payment Integration", desc: "Stripe and PayPal integrations for seamless checkout.", badge: "Stripe • PayPal" },
  { title: "Automation", desc: "Scrapers and internal tools to streamline operations.", badge: "Automation" },
];

function Services() {
  useScrollReveal("#services .reveal");

  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-left">
          <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500"></span>
            Services
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">Complete Digital Solutions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="reveal relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-6 transition-transform hover:-translate-y-1">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-indigo-500/10 via-fuchsia-500/10 to-emerald-400/10 opacity-0 hover:opacity-100 transition-opacity"></div>
              <div className="relative">
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{s.desc}</p>
                <span className="inline-block text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200/50 dark:border-indigo-800/50">{s.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;


