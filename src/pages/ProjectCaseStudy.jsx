import React, { useEffect, useMemo, useState } from "react";
import {
  featuredProjects,
  getFeaturedBySlug,
  projectSlug,
  GITHUB_USERNAME,
} from "../data/projects";
import { useGithubRepos } from "../hooks/useGithubRepos";
import { Link } from "../lib/router";
import { applyPageMeta, SITE_URL } from "../lib/pageMeta";

/* /projects/<slug> — case-study page (pehle modal mein tha, ab apni
   page: apna URL, apna meta, shareable link). Design board style. */

export default function ProjectCaseStudy({ slug }) {
  const project = getFeaturedBySlug(slug);
  const { repos } = useGithubRepos();
  const [lightbox, setLightbox] = useState(-1);

  const gallery = project?.gallery?.length ? project.gallery : project ? [project.image] : [];

  useEffect(() => {
    if (lightbox < 0) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(-1);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % gallery.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, gallery.length]);

  const enriched = useMemo(() => {
    if (!project) return null;
    const repo = repos.find((r) => r.name === project.repoName);
    return {
      ...project,
      liveLink: project.liveLink || repo?.homepage || null,
      githubLink:
        repo?.html_url ??
        `https://github.com/${GITHUB_USERNAME}/${project.repoName}`,
    };
  }, [project, repos]);

  useEffect(() => {
    if (!project) return;
    applyPageMeta({
      title: `${project.title} — Case Study | Abdullah Bin Asim`,
      description: project.overview || project.description,
      path: `/projects/${slug}`,
      type: "article",
      image: project.image ? `${SITE_URL}${project.image}` : undefined,
    });
  }, [project, slug]);

  if (!project || !enriched) return null;

  const idx = featuredProjects.findIndex((p) => p.repoName === project.repoName);
  const prev = featuredProjects[(idx - 1 + featuredProjects.length) % featuredProjects.length];
  const next = featuredProjects[(idx + 1) % featuredProjects.length];

  return (
    <section className="relative overflow-hidden pb-28 pt-36">
      <div aria-hidden className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/[0.07]" />
      <div aria-hidden className="absolute -right-32 top-[480px] h-96 w-96 rounded-full bg-fuchsia-300/10 blur-3xl dark:bg-fuchsia-600/[0.05]" />
      <div className="relative mx-auto max-w-4xl px-6">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-300"
        >
          <svg className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          All Projects
        </Link>

        {/* Hero card */}
        <div className="mt-6 overflow-hidden rounded-[2rem] border border-violet-100 bg-white shadow-[0_24px_55px_-24px_rgba(124,58,237,0.3)] dark:border-white/10 dark:bg-slate-900/70">
          <div className="relative aspect-[2/1] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} - ${project.description}`}
              className="h-full w-full object-cover object-top"
              width="800"
              height="400"
            />
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-violet-300/40 bg-black/55 px-3 py-1 text-[11px] font-semibold text-violet-200 backdrop-blur">
              <span className="h-1 w-1 rounded-full bg-violet-300" />
              Case Study
            </span>
          </div>
          <div className="p-7 sm:p-9">
            <div className="flex flex-wrap gap-2">
              {[project.role, project.year].filter(Boolean).map((meta) => (
                <span
                  key={meta}
                  className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  {meta}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 leading-relaxed text-slate-500 dark:text-slate-400">
              {project.overview || project.description}
            </p>

            {/* Project facts strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[
                { label: "My Role", value: project.role },
                { label: "Year", value: project.year },
                { label: "Project Type", value: project.type },
                {
                  label: "Status",
                  value: enriched.liveLink ? "Live & Public" : "Client Delivery",
                },
              ]
                .filter((f) => f.value)
                .map((f) => (
                  <div
                    key={f.label}
                    className="flex flex-col justify-between rounded-2xl border border-violet-100 bg-violet-50/60 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                      {f.label}
                    </span>
                    <span className="mt-1.5 text-sm font-bold leading-snug text-slate-800 dark:text-slate-100">
                      {f.value}
                    </span>
                  </div>
                ))}
            </div>

            {(project.results?.length ?? 0) > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Results &amp; Impact
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {project.results.map((r) => (
                    <div
                      key={r.label}
                      className="rounded-2xl border border-violet-100 bg-violet-50/60 p-4 text-center dark:border-white/10 dark:bg-white/5"
                    >
                      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text font-display text-2xl font-extrabold text-transparent">
                        {r.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                        {r.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(project.features?.length ?? 0) > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Highlights
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(project.challenges?.length ?? 0) > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Key Challenges &amp; Solutions
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {project.challenges.map((c) => (
                    <div
                      key={c.title}
                      className="flex flex-col rounded-2xl border border-violet-100 bg-violet-50/60 p-5 dark:border-white/10 dark:bg-white/5"
                    >
                      <h3 className="flex items-start gap-2 text-sm font-bold leading-snug text-slate-800 dark:text-slate-100">
                        <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                        {c.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {c.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.architectureFlow && (
              <div className="mt-8 rounded-3xl border border-violet-200/70 bg-gradient-to-r from-[#F3EFFF] via-[#FAF8FF] to-[#F3EFFF] p-6 dark:border-white/10 dark:from-violet-500/10 dark:via-slate-900/60 dark:to-violet-500/10">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
                  <h2 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-violet-600 dark:text-violet-300">
                    System &amp; AI Architecture Pipeline
                  </h2>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {project.architectureFlow.map((node, i) => (
                    <div
                      key={node.step}
                      className="flex flex-col justify-between rounded-2xl border border-violet-100 bg-white p-3.5 dark:border-white/10 dark:bg-white/5"
                    >
                      <div>
                        <span className="mb-1 block font-mono text-[10px] font-bold text-violet-500">
                          STEP 0{i + 1}
                        </span>
                        <div className="text-xs font-semibold leading-snug text-slate-800 dark:text-slate-100">
                          {node.step}
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                        {node.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(project.responsibilities?.length ?? 0) > 0 && (
              <div className="mt-8">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  My Responsibilities
                </h2>
                <ul className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {project.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-xs font-medium text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2.5">
              {enriched.liveLink && (
                <a
                  href={enriched.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:shadow-violet-600/45 active:scale-[0.98]"
                >
                  Live Demo
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              )}
              <a
                href={enriched.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 transition-all hover:border-violet-400 hover:bg-violet-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-violet-200 dark:hover:bg-violet-500/10"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Code
              </a>
            </div>

            {/* Project gallery — live product ki asal screenshots */}
            {gallery.length > 0 && (
              <div className="mt-10">
                <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
                  Project Gallery
                </h2>
                <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
                  Screenshots taken from the live product — no mockups.
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setLightbox(i)}
                      aria-label={`Open screenshot ${i + 1} of ${project.title}`}
                      className={`group relative block w-full overflow-hidden rounded-2xl border border-violet-100 bg-violet-50/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/10 dark:bg-white/5 ${
                        i === 0 ? "aspect-[16/8] sm:col-span-2" : "aspect-[16/10]"
                      }`}
                    >
                      <img
                        src={src}
                        alt={`${project.title} screenshot ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lightbox — gallery image full size */}
        {lightbox >= 0 && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setLightbox(-1)}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot viewer`}
          >
            <img
              src={gallery[lightbox]}
              alt={`${project.title} screenshot ${lightbox + 1}`}
              className="max-h-[86vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              aria-label="Close"
              onClick={() => setLightbox(-1)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox - 1 + gallery.length) % gallery.length);
                  }}
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next screenshot"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightbox((lightbox + 1) % gallery.length);
                  }}
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                  {lightbox + 1} / {gallery.length}
                </span>
              </>
            )}
          </div>
        )}

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {[
            { p: prev, label: "Previous Project" },
            { p: next, label: "Next Project" },
          ].map(({ p, label }) => (
            <Link
              key={label}
              href={`/projects/${projectSlug(p)}`}
              className="group rounded-3xl border border-violet-100 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-[0_18px_38px_-18px_rgba(124,58,237,0.35)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-violet-400/40"
            >
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-violet-500">
                {label}
              </span>
              <span className="mt-1.5 block font-display text-lg font-bold text-slate-900 dark:text-white">
                {p.title}
              </span>
              <span className="mt-1 line-clamp-2 block text-sm text-slate-500 dark:text-slate-400">
                {p.description}
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-3xl border border-violet-200/70 bg-gradient-to-r from-[#F3EFFF] via-[#FAF8FF] to-[#F3EFFF] px-7 py-8 text-center dark:border-white/10 dark:from-violet-500/10 dark:via-slate-900/60 dark:to-violet-500/10">
          <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
            Have a similar project in mind?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Let&apos;s talk about what you want to build — I&apos;ll reply with
            honest next steps, no pressure.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
          >
            Start a Project
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
