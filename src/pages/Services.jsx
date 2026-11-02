import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import ProjectEstimator from "../components/ProjectEstimator";

const automationTools = [
  "GoHighLevel",
  "Make.com",
  "n8n",
  "Claude",
  "OpenAI",
  "Zapier",
];

const heroServices = [
  { title: "Full-Stack Web Development", desc: "Modern, responsive and high-performance web apps — React, Next.js and Node.js.", icon: "monitor" },
  { title: "Generative AI Integration", desc: "Integrate powerful AI capabilities (Claude, OpenAI, Bedrock, etc.).", icon: "cpu" },
  { title: "AWS Cloud & Serverless", desc: "Deploy, scale and automate apps on AWS — Lambda, S3 and API Gateway.", icon: "cloud" },
  { title: "AI-Powered Product Development", desc: "End-to-end SaaS development from idea to launch.", icon: "rocket" },
];

function HeroServiceIcon({ name }) {
  const cls = "w-6 h-6";
  const common = { className: cls, fill: "none", stroke: "currentColor", strokeWidth: 1.7, viewBox: "0 0 24 24" };
  if (name === "monitor")
    return (<svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>);
  if (name === "cpu")
    return (<svg {...common}><rect x="7" y="7" width="10" height="10" rx="2" /><path strokeLinecap="round" d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" /></svg>);
  if (name === "cloud")
    return (<svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>);
  return (<svg {...common}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-6.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>);
}

function Services() {
  useScrollReveal("#services .reveal");

  return (
    <section id="services" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          scene="02"
          label="Services"
          title="Hire a Freelance n8n Developer & AI Automation Expert"
          subtitle="AI agents, n8n/Make.com workflow automation, GoHighLevel CRM and full-stack web apps — from first wireframe to production deployment."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {heroServices.map((s) => (
            <div
              key={s.title}
              data-stagger
              className="reveal group relative rounded-3xl glass p-7 card-glow-hover hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-400/25 text-violet-300">
                  <HeroServiceIcon name={s.icon} />
                </span>
                <svg className="w-5 h-5 text-slate-500 group-hover:text-violet-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                </svg>
              </div>
              <h3 className="font-display text-lg font-semibold text-white light:text-slate-900 mb-2">
                {s.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* AI & Automation spotlight */}
        <div className="reveal mt-14 relative overflow-hidden rounded-3xl glass-strong neon-ring p-8 md:p-10">
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="text-center lg:text-left flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 border border-violet-400/30 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400 blink-dot" />
                AI &amp; Automation
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                I don't just build apps — I automate entire businesses.
              </h3>
              <p className="text-slate-400 leading-relaxed max-w-xl mx-auto lg:mx-0">
                From GoHighLevel funnels &amp; CRM automations to Make.com
                scenarios, n8n workflows, and Claude-powered AI agents — I
                connect your tools so work happens on autopilot.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3 shrink-0">
              {automationTools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center justify-center rounded-xl glass px-4 py-3 text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors cursor-default whitespace-nowrap"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Scope & Cost Estimator */}
        <ProjectEstimator />

        <div className="reveal mt-14">
          <div className="relative overflow-hidden rounded-3xl glass-strong neon-ring p-10 text-center">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            />
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
              Need Something Custom?
            </h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto leading-relaxed">
              Don't see exactly what you need? I'm always open to discussing
              custom solutions that fit your specific requirements and goals.
            </p>
            <MagneticButton href="#contact">
              Let's Discuss Your Project
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
