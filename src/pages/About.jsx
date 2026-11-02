import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import { techStack } from "../data/techLogos";

function StackTile({ item }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.06] px-1 py-4 hover:border-violet-400/30 transition-colors">
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
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <path d={item.icon.path} fill={`#${item.icon.hex}`} />
        </svg>
      )}
      <span className="text-[11px] font-medium text-slate-300 light:text-slate-600 text-center leading-tight">
        {item.name}
      </span>
    </div>
  );
}

function About() {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="py-28">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="About Me"
          title="Turning Ideas into AI-Powered Solutions"
        />

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Photo — uski asal photo, neon frame ke sath */}
          <div className="reveal lg:col-span-3 max-w-xs mx-auto w-full lg:max-w-none">
            <div className="relative rounded-3xl overflow-hidden border border-violet-400/30 shadow-[0_0_50px_-12px_rgba(168,85,247,0.55)]">
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
                className="absolute inset-0 bg-gradient-to-t from-[#070213]/70 via-transparent to-violet-500/10"
              />
              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-white border border-white/25 float-y">
                ☁️ AWS Certified
              </span>
              <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/35 backdrop-blur px-3 py-1.5 text-[11px] font-semibold text-white border border-white/25 float-y" style={{ animationDelay: "0.8s" }}>
                ✨ Generative AI
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="reveal lg:col-span-4 space-y-5 text-slate-400 leading-relaxed">
            <h3 className="font-display text-2xl font-bold text-white light:text-slate-900 leading-snug">
              Building Web Experiences That Make an Impact
            </h3>
            <p>
              I&apos;m an{" "}
              <span className="text-violet-300 font-medium">
                AI Cloud Engineer &amp; Full-Stack Developer at Experts Cloud
              </span>
              , specializing in Generative AI, AWS cloud and business
              automation. As an{" "}
              <span className="text-violet-300 font-medium">
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
            <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-white/[0.06]">
              {[
                ["3+", "Years Experience"],
                ["25+", "Projects Shipped"],
                ["11+", "Certifications"],
              ].map(([num, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-gradient">
                    {num}
                  </div>
                  <div className="text-xs text-slate-400">{label}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                "Full-Stack Development",
                "Generative AI Integration",
                "AWS & Cloud Solutions",
                "Product Development",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 text-sm text-slate-300 light:text-slate-600">
                  <svg className="w-[18px] h-[18px] text-violet-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
            <div className="pt-2">
              <MagneticButton href="#experience">More About Me</MagneticButton>
            </div>
          </div>

          {/* Tech stack panel — mockup style */}
          <div className="reveal lg:col-span-5">
            <div className="rounded-3xl glass p-6 md:p-7">
              <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white light:text-slate-900 mb-5">
                <span aria-hidden>⭐</span> My Tech Stack
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
