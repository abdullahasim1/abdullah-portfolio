import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useGithubRepos } from "../hooks/useGithubRepos";
import SplitTextAnimation from "../components/SplitTextAnimation";
import ProjectModal from "../components/ProjectModal";
import {
  featuredProjects,
  languageColors,
  formatRelativeDate,
  formatRepoName,
  githubOgImage,
  GITHUB_USERNAME,
} from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

/* Cursor-following spotlight handler (per-card CSS vars) */
function spotMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/* ---------------- Featured project card (large = bento hero) ---------------- */

function ProjectImage({ project }) {
  const [src, setSrc] = useState(project.image);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`h-full min-h-[220px] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
        <span className="text-6xl drop-shadow-lg">{project.emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${project.title} screenshot`}
      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
      loading="lazy"
      onError={() => {
        if (src === project.image) {
          setSrc(githubOgImage(project.repoName));
        } else {
          setFailed(true);
        }
      }}
    />
  );
}

function CardLinks({ project, large = false, onOpenCaseStudy }) {
  const pad = large ? "px-5 py-3 text-sm" : "px-4 py-2.5 text-sm";
  return (
    <div className="flex gap-2.5 pt-1">
      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex-1 text-center font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-opacity ${pad}`}
        >
          Live Demo
        </a>
      )}
      {onOpenCaseStudy && (
        <button
          type="button"
          onClick={onOpenCaseStudy}
          className={`inline-flex items-center justify-center gap-1.5 rounded-xl glass font-medium text-cyan-300 hover:border-cyan-400/40 transition-colors ${pad}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Case Study
        </button>
      )}
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} source code on GitHub`}
        className={`inline-flex items-center justify-center rounded-xl glass font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors ${pad}`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        {!onOpenCaseStudy && "Code"}
      </a>
    </div>
  );
}

function Tags({ project, max = 4 }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.tags.slice(0, max).map((tag) => (
        <span
          key={tag}
          className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.07] text-slate-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function FeaturedProjectCard({ project, large = false, onOpenCaseStudy }) {
  return (
    <article
      onMouseMove={spotMove}
      className={`reveal group relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b1222] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75)] card-glow-hover hover:-translate-y-1.5 transition-transform duration-300 flex flex-col ${
        large ? "md:col-span-2 md:flex-row" : ""
      }`}
    >
      {/* Cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(34,211,238,0.10), transparent 55%)",
        }}
      />

      {/* Image zone */}
      <div className={`relative overflow-hidden shrink-0 ${large ? "md:w-[54%] min-h-[260px] md:min-h-[380px]" : "h-56"}`}>
        <ProjectImage project={project} />
        <div aria-hidden className={`absolute inset-0 pointer-events-none ${large ? "bg-gradient-to-r from-black/50 via-black/10 to-transparent md:bg-gradient-to-r" : "bg-gradient-to-t from-black/70 via-black/10 to-transparent"}`} />

        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-cyan-300 bg-black/50 border border-cyan-400/30 backdrop-blur">
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          Featured
        </span>

        {project.stars > 0 && (
          <span className="absolute top-4 right-4 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 bg-black/50 border border-white/10 backdrop-blur">
            ★ {project.stars}
          </span>
        )}

        {/* Title overlay (small cards only — large card title lives in body) */}
        {!large && (
          <h3 className="absolute bottom-4 left-5 right-5 font-display text-xl font-bold text-white leading-snug drop-shadow">
            {project.title}
          </h3>
        )}
      </div>

      {/* Body */}
      <div className={`relative z-10 flex flex-col flex-grow ${large ? "md:w-[46%] p-8 md:p-10 justify-center" : "p-6"}`}>
        {large && (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300 mb-3">
              Spotlight Project
            </p>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
              {project.title}
            </h3>
          </>
        )}

        <p className={`text-slate-400 leading-relaxed mb-5 ${large ? "text-[15px]" : "text-sm line-clamp-2"}`}>
          {project.description}
        </p>

        <Tags project={project} max={large ? 8 : 4} />

        <div className={`${large ? "mt-8" : "mt-auto pt-5"}`}>
          <CardLinks project={project} large={large} onOpenCaseStudy={onOpenCaseStudy} />
        </div>
      </div>
    </article>
  );
}

/* ---------------- Compact repo card ---------------- */

function LanguageDot({ language }) {
  const color = languageColors[language] || languageColors.default;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
      {language || "Other"}
    </span>
  );
}

function RepoCard({ repo }) {
  const displayName = formatRepoName(repo.name);
  const description =
    repo.description ||
    `Open source project built with ${repo.language || "modern web technologies"}.`;

  return (
    <div className="group relative overflow-hidden rounded-2xl glass card-glow-hover p-5 hover:-translate-y-1 transition-transform duration-300 h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display font-semibold text-[15px] text-slate-100 group-hover:text-cyan-300 transition-colors truncate"
        >
          {displayName}
        </a>
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1 text-xs text-amber-300/80 shrink-0">
            ★ {repo.stargazers_count}
          </span>
        )}
      </div>
      <p className="text-[13px] text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.06]">
        <LanguageDot language={repo.language} />
        <span className="text-xs text-slate-500">{formatRelativeDate(repo.pushed_at)}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
        >
          Source
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-opacity"
          >
            Live
          </a>
        )}
      </div>
    </div>
  );
}

const skeletonCards = [...Array(6)];

/* ---------------- Page ---------------- */

function Projects() {
  useScrollReveal("#projects .reveal");
  const { repos, profile, loading, error, rateLimited, retry } = useGithubRepos();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const stackRef = useRef(null);

  const featuredRepoNames = useMemo(
    () => new Set(featuredProjects.map((p) => p.repoName)),
    []
  );

  const enrichedFeatured = useMemo(() => {
    return featuredProjects.map((project) => {
      const repo = repos.find((r) => r.name === project.repoName);
      return {
        ...project,
        stars: repo?.stargazers_count ?? 0,
        githubLink: repo?.html_url ?? `https://github.com/${GITHUB_USERNAME}/${project.repoName}`,
        liveLink: project.liveLink || repo?.homepage || null,
      };
    });
  }, [repos]);

  /* Stacked-cards scroll effect:
     agli card aane par pichli card clean fade-out + halka scale-down —
     koi tilt/blur nahi, sirf smooth recede (smoothed scrub ke saath) */
  useEffect(() => {
    if (!stackRef.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-stack-card]");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card.querySelector("[data-stack-inner]"), {
          scale: 0.94,
          y: -26,
          autoAlpha: 0,
          transformOrigin: "50% 0%",
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top 110px",
            scrub: 0.75,
          },
        });
      });
    }, stackRef);

    return () => ctx.revert();
  }, [enrichedFeatured.length]);


  const otherRepos = useMemo(() => {
    return repos.filter((repo) => !featuredRepoNames.has(repo.name));
  }, [repos, featuredRepoNames]);

  const languages = useMemo(() => {
    const langs = new Set(repos.map((r) => r.language).filter(Boolean));
    return ["All", ...Array.from(langs).sort()];
  }, [repos]);

  const filteredRepos = useMemo(() => {
    if (activeFilter === "All") return otherRepos;
    return otherRepos.filter((repo) => repo.language === activeFilter);
  }, [otherRepos, activeFilter]);

  return (
    <section id="projects" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">

        {/* ---------- Section header ---------- */}
        <div className="mb-14">
          <span className="reveal inline-flex items-center gap-2.5 rounded-full glass px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-300/90 mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 blink-dot" />
            Portfolio
          </span>
          <SplitTextAnimation
            animationType="words"
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Projects &amp; GitHub
          </SplitTextAnimation>
          <p className="reveal text-slate-400 mt-4 max-w-2xl leading-relaxed">
            Selected work I've designed, built and shipped — keep scrolling, each project stacks onto the next.
          </p>
        </div>

        {/* ---------- Featured work — sticky stacking cards ---------- */}
        <div ref={stackRef} className="mb-24">
          {enrichedFeatured.map((project) => (
            <div
              key={project.repoName}
              data-stack-card
              className="sticky top-24 md:top-28 mb-[9vh] px-6 md:px-0"
            >
              <div data-stack-inner className="will-change-transform">
                <FeaturedProjectCard
                  project={project}
                  large
                  onOpenCaseStudy={() => setActiveProject(project)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ---------- Slim GitHub strip ---------- */}
        <div className="reveal flex flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl glass-strong neon-ring px-6 py-5 mb-14">
          <img
            src={profile?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`}
            alt="GitHub profile"
            className="w-11 h-11 rounded-full border border-cyan-400/40 shadow-[0_0_18px_rgba(34,211,238,0.25)]"
            loading="lazy"
          />
          <div className="min-w-0">
            <div className="font-display font-bold text-slate-100">@{GITHUB_USERNAME}</div>
            <div className="text-xs text-slate-400">
              {loading ? "Loading…" : error ? "Live stats unavailable" : `${profile?.public_repos ?? repos.length} public repos · ${profile?.followers ?? "—"} followers`}
            </div>
          </div>
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/[0.09] text-sm font-medium text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
          >
            View GitHub Profile
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* ---------- All repositories ---------- */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
          <h3 className="font-display text-2xl font-bold text-white">
            More Repositories
          </h3>
          <span className="text-sm text-slate-500 pb-0.5">
            {loading ? "Fetching…" : error ? "Unavailable right now" : `${filteredRepos.length} repositories · live from GitHub`}
          </span>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl glass border-amber-400/25 text-amber-200/90 text-sm">
            <p className="font-medium mb-1">
              {rateLimited
                ? "GitHub API rate limit reached (60 requests/hour for unauthenticated users)."
                : "Could not load GitHub repos."}
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <button
                type="button"
                onClick={retry}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-200 text-xs font-medium hover:bg-amber-500/25 transition-colors"
              >
                Retry
              </button>
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium underline underline-offset-2 hover:no-underline"
              >
                View repositories on GitHub instead
              </a>
            </div>
          </div>
        )}

        {!loading && !error && languages.length > 1 && (
          <div className="reveal flex flex-wrap gap-2 mb-6">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveFilter(lang)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === lang
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_0_16px_rgba(34,211,238,0.3)]"
                    : "glass text-slate-400 hover:text-cyan-300 hover:border-cyan-400/30"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {skeletonCards.map((_, i) => (
              <div key={i} className="glass rounded-2xl p-5 animate-pulse h-44" />
            ))}
          </div>
        ) : filteredRepos.length === 0 && !error ? (
          <p className="text-slate-500 text-sm py-10 text-center">No repositories match this filter.</p>
        ) : (
          !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )
        )}

        {/* ---------- Bottom CTA ---------- */}
        {!error && (
          <div className="text-center mt-14">
            <a
              href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl glass card-glow-hover text-slate-200 hover:text-cyan-300 transition-colors font-medium"
            >
              Explore All on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
        {/* ---------- Case study modal ---------- */}
        {activeProject && (
          <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        )}
      </div>
    </section>
  );
}

export default Projects;
