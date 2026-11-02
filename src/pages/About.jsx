import React from "react";
import { useScrollReveal } from "../hooks";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";
import { techStack } from "../data/techLogos";

function StackTile({ item }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/[0.03] light:bg-white border border-white/[0.06] light:border-slate-200/90 light:shadow-[0_10px_24px_-16px_rgba(76,29,149,0.35)] px-1 py-4 hover:border-violet-400/40 transition-colors">
      {item.mono ? (
        <span
          className="inline-flex h-[26px] items-center justify-center rounded-md px-1.5 text-[10px] font-bold"
          style={{
            background: `linear-gradient(135deg, ${item.mono.from}22, ${item.mono.to}22)`,
            border: `1px solid ${item.mono.from}55`,
            color: item.mono.from,
          }}
        >
          {item.mono.label}
        </span>
      ) : (
        <svg viewBox="0 0 24 24" width="27" height="27" aria-hidden="true">
          <path d={item.icon.path} fill={`#${item.icon.hex}`} />
        </svg>
      )}
      <span className="text-[11px] font-semibold text-slate-300 light:text-slate-700 text-center leading-tight">
        {item.name}
      </span>
    </div>
  );
}

/* Stat mini-cards ke icons (board style) */
const STAT_ICONS = {
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9.5 5L12 13 2.5 8 12 3Z" />
      <path d="m2.5 13 9.5 5 9.5-5" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="m8.8 13.2-1.9 6.8L12 17l5.1 3-1.9-6.8" />
    </>
  ),
};

const STATS = [
  { icon: "calendar", num: "3+", label: "Years Experience" },
  { icon: "layers", num: "25+", label: "Projects Shipped" },
  { icon: "award", num: "11+", label: "Certifications" },
];

function About() {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="relative py-28 overflow-hidden">
      {/* Soft lavender corner waves (board ambience) */}
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-48 -right-32 h-[420px] w-[420px] rounded-full bg-fuchsia-300/10 blur-3xl" />

      <div className="relative max-w-[1400px] mx-auto px-6">
        {/* Header — board: eyebrow + title + gradient underline */}
        <div className="flex flex-col items-start gap-4 mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-400/25 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 light:text-violet-600">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            About Me
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 leading-tight max-w-3xl">
            Turning Ideas into AI-Powered Solutions
          </h2>
          <span className="block h-1 w-14 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" aria-hidden="true" />
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Photo — board badges: white AWS pill + dark Generative AI pill */}
          <div className="reveal lg:col-span-3 max-w-xs mx-auto w-full lg:max-w-none">
            <TiltCard>
            <div className="sweep-host relative rounded-[28px] overflow-hidden border border-violet-300/50 light:border-violet-200 shadow-[0_30px_60px_-25px_rgba(124,58,237,0.45)]">
              <img
                src="/IMG-20240224-WA0006.jpg"
                alt="Abdullah Bin Asim — AI Cloud Engineer & Full-Stack Developer"
                className="w-full aspect-[3/4] object-cover"
                loading="lazy"
                width="720"
                height="960"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-violet-500/25 via-transparent to-violet-400/10"
              />
              <span className="absolute top-3.5 right-3.5 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-bold text-slate-800 shadow-[0_10px_24px_-10px_rgba(15,23,42,0.45)] float-y">
                <span className="flex flex-col items-center leading-none text-[#232f3e]">
                  <span className="text-[12px] font-extrabold tracking-tight">aws</span>
                  <span className="mt-[1px] block h-[5px] w-6 rounded-b-full border-b-[2.5px] border-[#ff9900]" aria-hidden="true" />
                </span>
                AWS Certified
              </span>
              <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#131a38] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(19,26,56,0.8)] float-y" style={{ animationDelay: "0.8s" }}>
                <span className="text-amber-300">✦</span> Generative AI
              </span>
            </div>
            </TiltCard>
          </div>

          {/* Text */}
          <div className="reveal lg:col-span-4 space-y-5 text-slate-400 light:text-slate-600 leading-relaxed">
            <div>
              <h3 className="font-display text-[26px] font-bold text-white light:text-slate-900 leading-snug">
                Building Web Experiences That Make an Impact
              </h3>
              <span className="mt-3 block h-[3px] w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" aria-hidden="true" />
            </div>
            <p>
              I&apos;m an{" "}
              <span className="text-violet-300 light:text-violet-600 font-semibold">
                AI Cloud Engineer &amp; Full-Stack Developer at Experts Cloud
              </span>
              , specializing in Generative AI, AWS cloud and business
              automation. As an{" "}
              <span className="text-violet-300 light:text-violet-600 font-semibold">
                AWS Certified Generative AI Developer (Professional, Early
                Adopter)
              </span>{" "}
              and Claude Certified Architect, I build production AI systems end
              to end — Bedrock-powered apps, RAG architectures and serverless
              backends on Lambda, S3, DynamoDB and API Gateway.
            </p>
            <p>
              Alongside that, I build intelligent automations with n8n,
              Make.com and GoHighLevel that cut manual work and operating cost,
              and I run DevRox — my AI &amp; automation agency for client
              projects. With 25+ projects shipped, from secret-management
              platforms to AI hiring automation, I turn complex requirements
              into scalable, secure, production-ready products.
            </p>

            {/* Stat mini-cards (board) */}
            <div className="grid grid-cols-3 gap-3 pt-1">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white px-3.5 py-3 light:shadow-[0_12px_26px_-18px_rgba(76,29,149,0.4)]"
                >
                  <svg
                    className="h-6 w-6 shrink-0 text-violet-400 light:text-violet-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {STAT_ICONS[stat.icon]}
                  </svg>
                  <span className="leading-tight">
                    <span className="block font-display text-[19px] font-bold text-white light:text-slate-900">
                      {stat.num}
                    </span>
                    <span className="block text-[10.5px] text-slate-400 light:text-slate-500">
                      {stat.label}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {[
                "Full-Stack Development",
                "Generative AI Integration",
                "AWS & Cloud Solutions",
                "Product Development",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 light:text-slate-700">
                  <svg className="w-[19px] h-[19px] text-violet-400 light:text-violet-500 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <MagneticButton href="#experience">
                More About Me
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </div>
          </div>

          {/* Tech stack panel — board header + tiles */}
          <div className="reveal lg:col-span-5">
            <div className="rounded-[26px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white p-6 md:p-7 shadow-[0_20px_45px_-25px_rgba(76,29,149,0.35)]">
              <h3 className="flex items-center gap-3 mb-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/12 light:bg-violet-100/80 text-violet-300 light:text-violet-600 border border-violet-400/20 light:border-violet-200/70">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m12 3 9.5 5L12 13 2.5 8 12 3Z" />
                    <path d="m2.5 13 9.5 5 9.5-5" />
                  </svg>
                </span>
                <span className="font-display text-[15px] font-bold uppercase tracking-[0.18em] text-white light:text-slate-900">
                  My Tech Stack
                </span>
                <span className="h-px flex-1 bg-white/10 light:bg-slate-200" aria-hidden="true" />
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                {techStack.map((item) => (
                  <StackTile key={item.name} item={item} />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
