import React from "react";
import { siClaude, siMake, siN8n, siZapier } from "simple-icons";
import TiltCard from "../components/TiltCard";
import ProjectEstimator from "../components/ProjectEstimator";
import { playClickSound } from "../lib/sound";
import { Link, navigateTo } from "../lib/router";
import { services as serviceData } from "../data/services";

/* Cards ka data data/services.js se — detail pages ke sath shared */
const heroServices = serviceData.filter((s) => s.icon !== "automation");

/* Board ki 3D illustrations ki jagah CSS/SVG art — white glass tile +
   lavender blob, halki floating animation ke sath. */
export function ServiceArt({ name, delay = "0s" }) {
  return (
    <div aria-hidden className="relative flex h-[92px] items-center justify-start">
      <div className="absolute left-0 h-20 w-36 rounded-[45%_55%_60%_40%/55%_45%_60%_50%] bg-gradient-to-br from-violet-200/80 via-purple-100 to-indigo-100 dark:from-violet-500/20 dark:via-purple-500/10 dark:to-indigo-500/10" />
      <div
        className="animate-[floatY_6s_ease-in-out_infinite] relative ml-3 flex h-16 w-16 rotate-[-4deg] items-center justify-center rounded-[1.05rem] border border-white/70 bg-white/85 shadow-[0_16px_34px_-14px_rgba(124,58,237,0.45)] backdrop-blur-sm dark:border-white/15 dark:bg-white/10"
        style={{ animationDelay: delay }}
      >
        {name === "laptop" && (
          <svg className="h-8 w-8 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <rect x="4" y="4.5" width="16" height="11.5" rx="1.8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.3 8.8L7.2 10.7l2.1 1.9m5.4-3.8l2.1 1.9-2.1 1.9M2.8 19.5h18.4" />
          </svg>
        )}
        {name === "ai" && (
          <span className="relative flex h-full w-full items-center justify-center">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 font-display text-[12px] font-extrabold text-white shadow-md">
              AI
            </span>
            <span className="animate-pulse absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
            <span className="animate-pulse absolute right-2 top-2.5 h-1.5 w-1.5 rounded-full bg-fuchsia-400" style={{ animationDelay: "0.4s" }} />
            <span className="animate-pulse absolute bottom-2 left-2.5 h-1.5 w-1.5 rounded-full bg-indigo-400" style={{ animationDelay: "0.8s" }} />
            <span className="animate-pulse absolute bottom-2.5 right-2 h-1.5 w-1.5 rounded-full bg-violet-500" style={{ animationDelay: "1.2s" }} />
          </span>
        )}
        {name === "aws" && (
          <span className="flex flex-col items-center">
            <span className="text-[15px] font-extrabold lowercase leading-none tracking-tight text-slate-900 dark:text-white">
              aws
            </span>
            <svg className="mt-0.5 h-2.5 w-7 text-[#FF9900]" viewBox="0 0 28 10" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3c6 4.5 18 4.5 24 0" strokeLinecap="round" />
              <path d="M23.5 1.2l2.8 1.6-3.4 1.4" fill="currentColor" stroke="none" />
            </svg>
          </span>
        )}
        {name === "automation" && (
          <svg className="h-8 w-8 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
            <circle cx="5.5" cy="12" r="2.4" />
            <circle cx="18.5" cy="5.5" r="2.4" />
            <circle cx="18.5" cy="18.5" r="2.4" />
            <path strokeLinecap="round" d="M7.7 10.8 16.3 6.7M7.7 13.2l8.6 4.1" />
          </svg>
        )}
        {name === "rocket" && (
          <svg className="h-8 w-8 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.8 1.9 4.5 5.3 4.5 9l-4.5 4.5L7.5 12C7.5 8.3 9.2 4.9 12 3z" />
            <circle cx="12" cy="9.5" r="1.8" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 13.5L5 18l2.5-.5M16.5 13.5L19 18l-2.5-.5" />
          </svg>
        )}
      </div>
    </div>
  );
}

function BrandIcon({ name }) {
  const cls = "h-[18px] w-[18px] shrink-0";
  if (name === "GoHighLevel") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="4" y="13" width="4" height="7" rx="1" fill="#22C55E" />
        <rect x="10" y="9" width="4" height="11" rx="1" fill="#3B82F6" />
        <rect x="16" y="5" width="4" height="15" rx="1" fill="#F97316" />
      </svg>
    );
  }
  if (name === "Make.com") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="#7C3AED" aria-hidden>
        <path d={siMake.path} />
      </svg>
    );
  }
  if (name === "n8n") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="#E11D63" aria-hidden>
        <path d={siN8n.path} />
      </svg>
    );
  }
  if (name === "Claude") {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="#D97757" aria-hidden>
        <path d={siClaude.path} />
      </svg>
    );
  }
  if (name === "OpenAI") {
    return (
      <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] bg-gradient-to-br from-teal-400 to-sky-500 text-[8px] font-extrabold text-white" aria-hidden>
        AI
      </span>
    );
  }
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="#FF4A00" aria-hidden>
      <path d={siZapier.path} />
    </svg>
  );
}

const automationTools = ["GoHighLevel", "Make.com", "n8n", "Claude", "OpenAI", "Zapier"];

function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 overflow-hidden py-28">
      <div aria-hidden className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9.5l9 5 9-5M3 17.5l9 5 9-5" />
            </svg>
            Services
          </span>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
            Hire a Freelance n8n Developer &amp; AI Automation Expert
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            AI agents, n8n/Make.com workflow automation, GoHighLevel CRM and full-stack web apps — from first wireframe to production deployment.
          </p>
          <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
        </div>

        {/* Service cards — 3D tilt + hover lift, floating art */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4" style={{ perspective: "1200px" }}>
          {heroServices.map((s, i) => (
            <TiltCard key={s.title} className="h-full">
              <article className="group relative h-full rounded-[1.6rem] border border-violet-100 bg-white p-6 shadow-[0_14px_40px_-20px_rgba(124,58,237,0.22)] transition-shadow duration-300 hover:shadow-[0_24px_50px_-20px_rgba(124,58,237,0.38)] dark:border-white/10 dark:bg-slate-900/70 sm:p-7">
                <Link
                  href={`/services/${s.slug}`}
                  aria-label={`${s.title} — details`}
                  className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-violet-200 text-violet-500 transition-all duration-300 group-hover:bg-violet-600 group-hover:text-white dark:border-white/15 dark:text-violet-300"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
                  </svg>
                </Link>
                <ServiceArt name={s.icon} delay={`${i * 0.7}s`} />
                <h3 className="mt-4 font-display text-lg font-extrabold leading-snug text-slate-900 dark:text-white">
                  <Link href={`/services/${s.slug}`} className="transition-colors hover:text-violet-600 dark:hover:text-violet-300">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {s.short}
                </p>
              </article>
            </TiltCard>
          ))}
        </div>

        {/* AI & Automation spotlight */}
        <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-violet-200/70 bg-gradient-to-r from-[#F3EFFF] via-[#FAF8FF] to-[#F3EFFF] p-8 dark:border-white/10 dark:from-violet-500/10 dark:via-slate-900/60 dark:to-violet-500/10 sm:p-10">
          {/* Animated connector line — tools ke darmiyan data flow */}
          <svg aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-24 w-full -translate-y-1/2 text-violet-300/70 dark:text-violet-400/25 lg:block" viewBox="0 0 1200 96" preserveAspectRatio="none" fill="none">
            <path className="dash-flow" d="M-10 62 C 260 12, 520 92, 800 44 S 1120 20, 1210 52" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 shadow-sm dark:bg-white/10 dark:text-violet-300">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
                AI &amp; Automation
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-[28px]">
                I don&apos;t just build apps — I automate entire businesses.
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-slate-500 dark:text-slate-400">
                From GoHighLevel funnels &amp; CRM automations to Make.com
                scenarios, n8n workflows, and Claude-powered AI agents — I
                connect your tools so work happens on autopilot.
              </p>
              <Link
                href="/services/ai-automation-workflows"
                className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-300"
              >
                Explore automation services
                <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="grid shrink-0 grid-cols-2 gap-3 min-[480px]:grid-cols-3">
              {automationTools.map((tool, i) => (
                <span
                  key={tool}
                  className="animate-[floatY_7s_ease-in-out_infinite] inline-flex items-center gap-2.5 whitespace-nowrap rounded-2xl border border-violet-100 bg-white px-4 py-3.5 text-[13px] font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  style={{ animationDelay: `${i * 0.55}s` }}
                >
                  <BrandIcon name={tool} />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Scope & Timeline Estimator */}
        <ProjectEstimator />

        {/* Need Something Custom — board band */}
        <div className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-violet-200/70 bg-gradient-to-r from-[#F3EFFF] via-[#FAF8FF] to-[#F3EFFF] px-8 py-9 dark:border-white/10 dark:from-violet-500/10 dark:via-slate-900/60 dark:to-violet-500/10 sm:px-10">
          <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center">
            <div aria-hidden className="relative hidden h-[74px] w-[120px] shrink-0 min-[480px]:block">
              <div className="absolute left-0 top-1 h-14 w-[74px] rotate-[-6deg] rounded-xl border border-white/70 bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg" />
              <div className="absolute bottom-0 right-0 flex h-14 w-[74px] rotate-[5deg] items-center justify-center rounded-xl border border-violet-100 bg-white shadow-lg dark:border-white/15 dark:bg-slate-800">
                <svg className="h-6 w-6 text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
            </div>
            <span aria-hidden className="hidden h-14 w-px bg-violet-300/50 dark:bg-white/10 lg:block" />
            <div className="flex-1">
              <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white sm:text-[28px]">
                Need Something Custom?
              </h3>
              <p className="mt-2 max-w-xl leading-relaxed text-slate-500 dark:text-slate-400">
                Don&apos;t see exactly what you need? I&apos;m always open to discussing
                custom solutions that fit your specific requirements and goals.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                playClickSound();
                navigateTo("/contact");
              }}
              className="animate-glowPulse group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
            >
              Let&apos;s Discuss Your Project
              <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
