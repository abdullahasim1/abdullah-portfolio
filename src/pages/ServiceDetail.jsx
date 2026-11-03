import React, { useEffect, useState } from "react";
import { getService, services } from "../data/services";
import { featuredProjects, projectSlug } from "../data/projects";
import { ServiceArt } from "./Services";
import { Link } from "../lib/router";
import { applyPageMeta } from "../lib/pageMeta";

/* /services/<slug> — service detail page */

export default function ServiceDetail({ slug }) {
  const service = getService(slug);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    if (!service) return;
    applyPageMeta({
      title: `${service.title} — Services | Abdullah Bin Asim`,
      description: service.short,
      path: `/services/${slug}`,
    });
  }, [service, slug]);

  if (!service) return null;

  const related = featuredProjects.filter((p) =>
    service.related.includes(p.repoName),
  );
  const others = services.filter((s) => s.slug !== slug);

  return (
    <section className="relative overflow-hidden pb-28 pt-36">
      <div aria-hidden className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/[0.07]" />
      <div aria-hidden className="absolute -right-32 top-[420px] h-96 w-96 rounded-full bg-fuchsia-300/10 blur-3xl dark:bg-fuchsia-600/[0.05]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <Link
          href="/services"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-300"
        >
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All Services
        </Link>

        <div className="mt-6 rounded-[2rem] border border-violet-100 bg-white p-7 shadow-[0_24px_55px_-24px_rgba(124,58,237,0.3)] dark:border-white/10 dark:bg-slate-900/70 sm:p-9">
          <ServiceArt name={service.icon} />
          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">
            {service.intro}
          </p>

          {service.idealFor && (
            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-violet-200/70 bg-gradient-to-r from-[#F3EFFF] to-[#FAF8FF] p-5 dark:border-white/10 dark:from-violet-500/10 dark:to-slate-900/60">
              <svg className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" fill="none" stroke="currentColor" strokeWidth={1.9} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                <span className="font-bold text-slate-800 dark:text-white">Best for: </span>
                {service.idealFor}
              </p>
            </div>
          )}

          <h2 className="mt-9 font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
            What&apos;s Included
          </h2>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
              >
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {(service.process?.length ?? 0) > 0 && (
            <>
              <h2 className="mt-9 font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                How It Works
              </h2>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {service.process.map((step, i) => (
                  <div
                    key={step.title}
                    className="flex flex-col rounded-2xl border border-violet-100 bg-violet-50/60 p-5 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="font-mono text-[11px] font-bold text-violet-500">
                      STEP 0{i + 1}
                    </span>
                    <h3 className="mt-1.5 text-sm font-bold text-slate-800 dark:text-slate-100">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          <h2 className="mt-9 font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
            Tools I Use
          </h2>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {service.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>

          {(service.faqs?.length ?? 0) > 0 && (
            <>
              <h2 className="mt-9 font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                Common Questions
              </h2>
              <div className="mt-4 space-y-2.5">
                {service.faqs.map((f, i) => {
                  const open = openFaq === i;
                  return (
                    <div
                      key={f.q}
                      className="overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/50 dark:border-white/10 dark:bg-white/5"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        aria-expanded={open}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                          {f.q}
                        </span>
                        <svg
                          className={`h-4 w-4 shrink-0 text-violet-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.2}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      <div
                        className="grid transition-[grid-template-rows] duration-300 ease-out"
                        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                      >
                        <div className="overflow-hidden">
                          <p className="px-5 pb-4 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            {f.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <div className="mt-9 flex flex-wrap gap-2.5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:shadow-violet-600/45 active:scale-[0.98]"
            >
              Start a Project
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:border-violet-400 hover:bg-violet-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-violet-200 dark:hover:bg-violet-500/10"
            >
              See How I Work
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <>
            <h2 className="mt-12 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
              Related Work
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <Link
                  key={p.repoName}
                  href={`/projects/${projectSlug(p)}`}
                  className="group overflow-hidden rounded-3xl border border-violet-100 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_18px_38px_-18px_rgba(124,58,237,0.35)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-violet-400/40"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.title} - ${p.description}`}
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                      width="800"
                      height="400"
                    />
                  </div>
                  <div className="p-5">
                    <span className="font-display text-lg font-bold text-slate-900 dark:text-white">
                      {p.title}
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm text-slate-500 dark:text-slate-400">
                      {p.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        <h2 className="mt-12 font-display text-2xl font-extrabold text-slate-900 dark:text-white">
          Other Services
        </h2>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="rounded-full border border-violet-200 bg-white px-5 py-2.5 text-sm font-semibold text-violet-700 transition-all hover:border-violet-400 hover:bg-violet-50 dark:border-white/15 dark:bg-white/5 dark:text-violet-200 dark:hover:bg-violet-500/10"
            >
              {s.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
