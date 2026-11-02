import React from "react";
import { useScrollReveal } from "../hooks";
import SectionHeading from "../components/SectionHeading";
import MagneticButton from "../components/MagneticButton";
import { timeline } from "../data/experience";
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
          title="Turning Ideas Into Digital Reality"
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

        {/* Experience & milestones — mockup timeline style */}
        <div id="experience" className="mt-24 scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <h3 className="reveal font-display text-2xl md:text-3xl font-bold text-white light:text-slate-900">
              Work Experience
            </h3>
            <a
              href="/resume.pdf"
              download="Abdullah-Bin-Asim-Resume.pdf"
              className="reveal inline-flex items-center gap-2 text-sm font-medium text-violet-300 hover:text-violet-200 transition-colors"
            >
              View Full Resume
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          <div className="relative border-l border-white/[0.09] ml-3 space-y-12">
            {timeline.map((item) => (
              <div key={item.title + item.period} className="reveal relative pl-8">
                <span
                  aria-hidden
                  className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 border-2 border-void shadow-[0_0_14px_rgba(168,85,247,0.6)]"
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="font-display font-bold text-slate-100 light:text-slate-900">
                      {item.title}
                    </h4>
                    <div className="text-sm font-medium text-violet-300/90 mt-0.5">
                      {item.org}
                    </div>
                  </div>
                  <span className="inline-flex px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/25 text-[11px] font-semibold text-violet-200">
                    {item.period}
                  </span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mt-2 max-w-2xl">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.07] text-slate-300"
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
