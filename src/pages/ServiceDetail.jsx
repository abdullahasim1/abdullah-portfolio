import React, { useEffect } from "react";
import { getService, services } from "../data/services";
import { featuredProjects, projectSlug } from "../data/projects";
import { ServiceArt } from "./Services";
import { Link } from "../lib/router";
import { applyPageMeta } from "../lib/pageMeta";

/* /services/<slug> — service detail page */

export default function ServiceDetail({ slug }) {
  const service = getService(slug);

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
