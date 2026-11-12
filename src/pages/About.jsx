import React from "react";
import { useScrollReveal } from "../hooks";
import MagneticButton from "../components/MagneticButton";
import TiltCard from "../components/TiltCard";
import ViewAllButton from "../components/ViewAllButton";
import { techStack } from "../data/techLogos";
import { certifications } from "../data/certifications";

function StackTile({ item }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/[0.03] light:bg-white border border-white/[0.06] light:border-slate-200/90 light:shadow-[0_10px_24px_-16px_rgba(76,29,149,0.35)] px-1 py-4 hover:border-violet-400/40 transition-colors">
      {item.img ? (
        <span className="flex h-[27px] items-center justify-center">
          <img src={item.img} alt="" aria-hidden="true" className="h-[21px] w-auto max-w-[56px] object-contain dark:hidden" />
          <img src={item.imgDark} alt="" aria-hidden="true" className="hidden h-[21px] w-auto max-w-[56px] object-contain dark:block" />
        </span>
      ) : item.mono ? (
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
  { icon: "award", num: `${certifications.length}+`, label: "Certifications" },
];

/* preview: home par sirf header + photo + intro text — tech stack
   panel aur detail cards sirf asal /about page par; neeche "More
   About Me" View All wahan le jata hai. */
function About({ preview = false } = {}) {
  useScrollReveal("#about .reveal");

  return (
    <section id="about" className="relative scroll-mt-24 py-16 overflow-hidden">
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

        <div className="grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Photo — board badges: white AWS pill + dark Generative AI pill */}
          <div className="reveal lg:col-span-3 max-w-xs mx-auto w-full lg:max-w-none self-start">
            <TiltCard>
            <div className="sweep-host relative rounded-[28px] overflow-hidden border border-violet-300/50 light:border-violet-200 shadow-[0_30px_60px_-25px_rgba(124,58,237,0.45)]">
              <img
                src="/about-photo.webp"
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
                <img src="/logos/aws.svg" alt="AWS" className="h-[17px] w-auto" />
                AWS Certified
              </span>
              <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-full bg-[#131a38] px-4 py-2 text-[12px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(19,26,56,0.8)] float-y" style={{ animationDelay: "0.8s" }}>
                <span className="text-amber-300">✦</span> Generative AI
              </span>
            </div>
            </TiltCard>
          </div>

          {/* Text */}
          <div className={`reveal ${preview ? "lg:col-span-9" : "lg:col-span-5"} space-y-5 text-slate-400 light:text-slate-600 leading-relaxed`}>
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
            {!preview && (
            <div className="pt-2">
              <MagneticButton href="/experience">
                More About Me
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
            </div>
            )}
          </div>

          {/* Tech stack panel — board header + tiles (home preview mein nahi) */}
          {!preview && (
          <div className="reveal lg:col-span-4 h-full">
            <div className="flex h-full flex-col rounded-[26px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white p-6 md:p-7 shadow-[0_20px_45px_-25px_rgba(76,29,149,0.35)]">
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
              <div className="grid flex-1 auto-rows-fr grid-cols-3 sm:grid-cols-5 lg:grid-cols-2 gap-3">
                {techStack.map((item) => (
                  <StackTile key={item.name} item={item} />
                ))}
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Detail cards — education, writing, current role (equal height; home preview mein nahi) */}
        {!preview && (
        <div className="reveal mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              label: "Education",
              title: "BSCS — Computer Science",
              desc: "Government College University Faisalabad (2021–2025). The foundation behind everything I ship today.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              ),
            },
            {
              label: "Published Writing",
              title: "daily.dev Author",
              desc: "“The 4-File System That Makes Claude Code 10× Smarter” — my system for making AI coding assistants dramatically more effective.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3-.512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0-14.25v14.25" />
              ),
            },
            {
              label: "Currently",
              title: "AI Cloud Engineer @ Experts Cloud",
              desc: "Building production GenAI systems on AWS Bedrock — and running DevRox, my AI & automation agency, for client projects.",
              icon: (
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              ),
            },
          ].map((card) => (
            <article
              key={card.label}
              className="flex h-full flex-col rounded-[26px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white p-6 shadow-[0_20px_45px_-25px_rgba(76,29,149,0.35)]"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/12 light:bg-violet-100/80 text-violet-300 light:text-violet-600 border border-violet-400/20 light:border-violet-200/70">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24" aria-hidden="true">
                  {card.icon}
                </svg>
              </span>
              <span className="mt-4 text-[10.5px] font-bold uppercase tracking-[0.18em] text-violet-400 light:text-violet-500">
                {card.label}
              </span>
              <h3 className="mt-1.5 font-display text-[17px] font-bold leading-snug text-white light:text-slate-900">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400 light:text-slate-600">
                {card.desc}
              </p>
            </article>
          ))}
        </div>
        )}

        {preview && <ViewAllButton href="/about">More About Me</ViewAllButton>}

      </div>
    </section>
  );
}

export default About;
