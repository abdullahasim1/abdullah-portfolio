import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { siGsap, siMysql, siNodedotjs, siReact } from "simple-icons";
import { useScrollReveal } from "../hooks";
import { useGithubRepos } from "../hooks/useGithubRepos";
import TiltCard from "../components/TiltCard";
import { track } from "../lib/analytics";
import { Link, navigateTo } from "../lib/router";
import {
  featuredProjects,
  languageColors,
  formatRelativeDate,
  formatRepoName,
  githubOgImage,
  projectSlug,
  GITHUB_USERNAME,
} from "../data/projects";

/* Featured project categories — filter tabs ke liye (repoName keyed) */
const FEATURED_CATEGORIES = {
  "four-ai-ai-powered-voice-image-generation-platform": "ai",
  GENAI: "ai",
  "Job-Recuitment": "web",
  "Business-Help": "ai",
  "events-agent-frontend": "cloud",
  "abdullah-portfolio": "web",
};
const FEATURED_FILTERS = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI / ML" },
  { id: "web", label: "Web Apps" },
  { id: "cloud", label: "Cloud" },
];

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
      alt={`${project.title} - ${project.description}`}
      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.05]"
      loading="lazy"
      width="800"
      height="400"
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
  const pad = large ? "px-6 py-3 text-sm" : "px-5 py-2.5 text-[13px]";
  const ghSize = large ? "h-11 w-11" : "h-10 w-10";
  return (
    <div className="flex flex-wrap items-center gap-2.5 pt-1">
      {project.liveLink && (
        <a
          href={project.liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`group/btn inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 font-semibold text-white shadow-lg shadow-violet-600/25 transition-all duration-200 hover:shadow-violet-600/45 active:scale-[0.98] ${pad}`}
        >
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.5-6.86a1.03 1.03 0 000-1.76L9.56 4.26A1.03 1.03 0 008 5.14z" />
          </svg>
          Live Demo
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.4} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
      {onOpenCaseStudy && (
        <button
          type="button"
          onClick={onOpenCaseStudy}
          className={`group/btn inline-flex items-center justify-center gap-1.5 rounded-full border border-violet-200 bg-white font-semibold text-violet-700 transition-all duration-200 hover:border-violet-400 hover:bg-violet-50 active:scale-[0.98] dark:border-white/15 dark:bg-white/5 dark:text-violet-200 dark:hover:border-violet-400/50 dark:hover:bg-violet-500/10 ${pad}`}
        >
          <svg className="h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
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
        className={`group/btn inline-flex shrink-0 items-center justify-center rounded-full border border-violet-200 bg-white text-slate-700 transition-all duration-200 hover:border-violet-400 hover:bg-violet-50 active:scale-[0.96] dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-violet-400/50 dark:hover:bg-violet-500/10 ${ghSize}`}
      >
        <svg className="h-[18px] w-[18px] transition-transform duration-300 group-hover/btn:rotate-[8deg] group-hover/btn:scale-110" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
        {!onOpenCaseStudy && <span className="ml-1.5 pr-1 text-[13px] font-semibold">Code</span>}
      </a>
    </div>
  );
}

function Tags({ project, max = 4 }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {project.tags.slice(0, max).map((tag, i) => (
        <span
          key={tag}
          className="animate-[fadeUpSm_.45s_cubic-bezier(0.22,1,0.36,1)_both] rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors duration-200 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:border-violet-400/40 dark:hover:text-violet-300"
          style={{ animationDelay: `${i * 70}ms` }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

/* Featured hero ke tag pills — brand icons ke sath (board style) */
const TAG_ICONS = {
  React: siReact,
  GSAP: siGsap,
  "Node.js": siNodedotjs,
  MySQL: siMysql,
};

function HeroTags({ project }) {
  return (
    <div className="flex flex-wrap gap-2">
      {project.tags.slice(0, 4).map((tag, i) => {
        const icon = TAG_ICONS[tag];
        return (
          <span
            key={tag}
            className="animate-[fadeUpSm_.45s_cubic-bezier(0.22,1,0.36,1)_both] inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white px-3.5 py-1.5 text-[13px] font-semibold text-slate-700 shadow-sm transition-colors duration-200 hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-white/10 dark:text-slate-200 dark:hover:text-violet-300"
            style={{ animationDelay: `${0.25 + i * 0.09}s` }}
          >
            {icon && (
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" style={{ fill: `#${icon.hex}` }} aria-hidden>
                <path d={icon.path} />
              </svg>
            )}
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function FeaturedProjectCard({ project, onOpenCaseStudy }) {
  return (
    <article className="reveal group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-violet-100 bg-white shadow-[0_14px_40px_-18px_rgba(124,58,237,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_22px_46px_-18px_rgba(124,58,237,0.32)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-violet-400/40">
      {/* Image zone */}
      <div className="relative h-48 overflow-hidden shrink-0">
        <ProjectImage project={project} />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
        {project.stars > 0 && (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold text-amber-300 bg-black/50 border border-white/10 backdrop-blur">
            ★ {project.stars}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="mt-auto">
          <Tags project={project} max={4} />
          <div className="mt-5">
            <CardLinks project={project} onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ---------------- Featured hero card (board: Four-AI wide showcase) ---------------- */

function FeaturedHeroCard({ project, onOpenCaseStudy }) {
  const host = project.liveLink
    ? project.liveLink.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : "";
  return (
    <div className="reveal relative mb-6 overflow-hidden rounded-[2rem] border border-violet-200/70 bg-gradient-to-br from-[#F5F1FF] via-white to-[#F1EDFF] shadow-[0_24px_55px_-24px_rgba(124,58,237,0.35)] dark:border-white/10 dark:from-violet-500/10 dark:via-slate-900/70 dark:to-violet-500/10">
      {/* Floating lavender orb */}
      <div aria-hidden className="animate-[floatY_9s_ease-in-out_infinite] absolute -right-16 -top-20 h-72 w-72 rounded-full bg-violet-300/30 blur-3xl dark:bg-violet-600/15" />
      <div aria-hidden className="absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-fuchsia-200/30 blur-3xl dark:bg-fuchsia-600/10" />
      <div className="relative grid items-center gap-8 p-7 sm:p-9 lg:grid-cols-[1fr_1.12fr] lg:gap-12 lg:p-11">
        {/* Left content */}
        <div>
          <span className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:text-violet-300">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-500/15">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M5 16L3 6l5.5 4L12 4l3.5 6L21 6l-2 10H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z" />
              </svg>
            </span>
            Featured Project
          </span>
          <h3 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            {project.title}
          </h3>
          <p className="mt-3.5 max-w-md text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
            {project.description}
          </p>
          <div className="mt-6">
            <HeroTags project={project} />
          </div>
          <div className="mt-7">
            <CardLinks project={project} large onOpenCaseStudy={onOpenCaseStudy} />
          </div>
        </div>

        {/* Right visual — browser frame, gentle 3° tilt, zoom-in entry */}
        <TiltCard divisor={55} maxDeg={3} className="group">
          <div className="zoom-in overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-[0_30px_60px_-24px_rgba(124,58,237,0.45)] dark:border-white/10 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-violet-100 bg-[#FAF8FF] px-4 py-2.5 dark:border-white/[0.07] dark:bg-white/[0.04]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              {host && (
                <span className="ml-3 hidden truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium text-slate-400 shadow-sm dark:bg-white/10 dark:text-slate-400 min-[420px]:block">
                  {host}
                </span>
              )}
            </div>
            <div className="relative aspect-[2/1] overflow-hidden">
              <ProjectImage project={project} />
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-900/10 via-transparent to-transparent" />
            </div>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}

/* ---------------- Wide project card (board bottom row) ---------------- */

function WideProjectCard({ project, onOpenCaseStudy }) {
  return (
    <article className="reveal group relative flex h-full flex-col overflow-hidden rounded-[1.8rem] border border-violet-100 bg-white shadow-[0_14px_40px_-18px_rgba(124,58,237,0.2)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-[0_22px_46px_-18px_rgba(124,58,237,0.32)] dark:border-white/10 dark:bg-slate-900/70 dark:hover:border-violet-400/40 min-[520px]:flex-row">
      <div className="relative h-52 shrink-0 overflow-hidden min-[520px]:h-auto min-[520px]:w-[44%] [&_img]:[object-position:left_top]">
        <ProjectImage project={project} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-lg font-bold leading-snug text-slate-900 dark:text-white">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400 line-clamp-3">
          {project.description}
        </p>
        <div className="mt-auto pt-5">
          <Tags project={project} max={4} />
          <div className="mt-5">
            <CardLinks project={project} onOpenCaseStudy={onOpenCaseStudy} />
          </div>
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

/* Repo card icons — board style: har repo ko uske topic ke mutabiq icon tile */
const REPO_ICONS = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  file: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M12 16v3M8.5 21h7" />
    </>
  ),
  car: (
    <>
      <path d="M5 16 6.6 9.5A2 2 0 0 1 8.5 8h7a2 2 0 0 1 1.9 1.5L19 16" />
      <path d="M4 16h16a1 1 0 0 1 1 1v3h-2.5" />
      <path d="M3 17v3h2.5" />
      <circle cx="7.5" cy="20" r="1.6" />
      <circle cx="16.5" cy="20" r="1.6" />
      <path d="M9.1 20h5.8" />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2.2l2.3 11.2a1.8 1.8 0 0 0 1.8 1.5h7.9a1.8 1.8 0 0 0 1.8-1.4L20.5 8H6" />
      <circle cx="10" cy="21" r="1.3" />
      <circle cx="17.5" cy="21" r="1.3" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.8V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.8" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8.5 7h7" />
      <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 15.5h.01M12 15.5h.01M15.5 15.5h.01" strokeWidth="2.4" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3v7a2 2 0 0 0 2-2V3M7 3v18M9 3v5" />
      <path d="M17 3c-1.7 1.2-2.5 3.4-2.5 6 0 2 .8 3 2.5 3v9" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </>
  ),
  atom: (
    <>
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  code: (
    <path d="m8 7-5.5 5L8 17M16 7l5.5 5L16 17" />
  ),
};

function repoIconKind(repo) {
  if (repo.name === GITHUB_USERNAME) return "github";
  const hay = `${repo.name} ${repo.description || ""}`.toLowerCase();
  if (/hadith|quran|dataset|\bdata\b/.test(hay)) return "database";
  if (/auth|login|foam/.test(hay)) return "lock";
  if (/blog/.test(hay)) return "file";
  if (/portfolio/.test(hay)) return "monitor";
  if (/car|auto|vehicle|driv/.test(hay)) return "car";
  if (/commerce|shop|store|cart/.test(hay)) return "cart";
  if (/home|service/.test(hay)) return "home";
  if (/calculator|calc/.test(hay)) return "calculator";
  if (/food|order|restaurant/.test(hay)) return "utensils";
  if (/birthday|event|calendar/.test(hay)) return "calendar";
  if (/react/.test(hay)) return "atom";
  return "code";
}

function RepoIcon({ repo }) {
  const kind = repoIconKind(repo);
  if (kind === "github") {
    return (
      <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      width="21"
      height="21"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {REPO_ICONS[kind]}
    </svg>
  );
}

function RepoCard({ repo }) {
  const displayName = formatRepoName(repo.name);
  const description =
    repo.description ||
    `Open source project built with ${repo.language || "modern web technologies"}.`;

  return (
    <article className="group flex h-full flex-col rounded-[22px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white p-5 shadow-[0_16px_38px_-24px_rgba(76,29,149,0.35)] transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/60">
      <div className="flex items-start gap-3 mb-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 light:bg-violet-50 border border-violet-400/15 light:border-violet-100 text-violet-400 light:text-violet-600">
          <RepoIcon repo={repo} />
        </span>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 font-display font-bold text-[16px] leading-snug text-slate-100 light:text-slate-900 group-hover:text-violet-500 transition-colors"
        >
          {displayName}
        </a>
        {repo.stargazers_count > 0 && (
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 text-xs text-amber-500">
            ★ {repo.stargazers_count}
          </span>
        )}
      </div>
      <p className="text-[13px] text-slate-400 light:text-slate-500 mb-4 line-clamp-2 leading-relaxed flex-grow">
        {description}
      </p>
      <div className="flex items-center justify-between gap-2">
        <LanguageDot language={repo.language} />
        <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 light:text-slate-500">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <rect x="3.5" y="5" width="17" height="16" rx="2" />
            <path d="M3.5 10h17M8 3v4M16 3v4" strokeLinecap="round" />
          </svg>
          {formatRelativeDate(repo.pushed_at)}
        </span>
      </div>
      <div className="flex gap-2.5 mt-4">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold border border-slate-300/40 light:border-slate-200 bg-white/[0.04] light:bg-white text-slate-200 light:text-slate-700 hover:border-violet-400/50 hover:text-violet-500 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="m8 7-5.5 5L8 17M16 7l5.5 5L16 17" />
          </svg>
          Source
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-xs font-semibold bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-opacity"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M10 14a5 5 0 0 0 7.1 0l2.8-2.8a5 5 0 0 0-7-7.1L11.5 5.5" />
              <path d="M14 10a5 5 0 0 0-7.1 0L4.1 12.8a5 5 0 0 0 7 7.1l1.4-1.4" />
            </svg>
            Live
          </a>
        )}
      </div>
    </article>
  );
}

const skeletonCards = [...Array(6)];

/* ---------------- Featured work section (Home preview + Projects page) ---------------- */

export function FeaturedWork({ preview = false }) {
  useScrollReveal("#projects .reveal");
  const { repos } = useGithubRepos();
  const [featuredFilter, setFeaturedFilter] = useState("all");

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

  const visibleFeatured = useMemo(() => {
    if (featuredFilter === "all") return enrichedFeatured;
    return enrichedFeatured.filter(
      (p) => FEATURED_CATEGORIES[p.repoName] === featuredFilter
    );
  }, [enrichedFeatured, featuredFilter]);

  /* Featured filters — sliding gradient indicator (skills pattern) */
  const fBtnRefs = useRef({});
  const [fInd, setFInd] = useState({ x: 0, y: 0, w: 0, ready: false });
  useLayoutEffect(() => {
    const measure = () => {
      const btn = fBtnRefs.current[featuredFilter];
      if (btn) setFInd({ x: btn.offsetLeft, y: btn.offsetTop, w: btn.offsetWidth, ready: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [featuredFilter]);

  /* Case Study ab modal nahi — apni page /projects/<slug> khulti hai */
  const openCase = (project) => () => {
    track("project-open", { id: project.repoName });
    navigateTo(`/projects/${projectSlug(project)}`);
  };

  return (
    <section id="projects" className={`relative overflow-hidden scroll-mt-24 ${preview ? "py-16" : "pt-28 pb-0"}`}>
      {/* Soft background blobs — screenshots se compete nahi karte */}
      <div aria-hidden className="animate-[floatY_11s_ease-in-out_infinite] absolute -left-32 top-24 h-80 w-80 rounded-full bg-violet-300/15 blur-3xl dark:bg-violet-600/[0.07]" />
      <div aria-hidden className="animate-[floatY_13s_ease-in-out_infinite] absolute -right-32 top-[560px] h-96 w-96 rounded-full bg-fuchsia-300/10 blur-3xl dark:bg-fuchsia-600/[0.05]" />
      <div className="relative max-w-[1400px] mx-auto px-6">

        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-400/25 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
              Featured Projects
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white light:text-slate-900 leading-tight">
              My Recent Work
            </h2>
            <p className="text-slate-400 mt-4 max-w-2xl leading-relaxed">
              Selected work I&apos;ve designed, built and shipped — real
              products solving real problems.
            </p>
          </div>
          {preview ? (
            <Link
              href="/projects"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-violet-600 shadow-sm transition-all duration-200 hover:bg-violet-600 hover:text-white dark:border-violet-400/30 dark:bg-white/5 dark:text-violet-300 dark:hover:bg-violet-600 dark:hover:text-white"
            >
              View All Projects
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          ) : (
            <a
              href="https://github.com/abdullahasim1?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-violet-300 bg-white/60 px-5 py-2.5 text-sm font-semibold text-violet-600 shadow-sm transition-all duration-200 hover:bg-violet-600 hover:text-white dark:border-violet-400/30 dark:bg-white/5 dark:text-violet-300 dark:hover:bg-violet-600 dark:hover:text-white"
            >
              View All Projects
              <svg className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          )}
        </div>

        {/* ---------- Featured filters — sliding indicator ---------- */}
        <div className="relative flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter featured projects">
          <span
            aria-hidden
            className="absolute left-0 top-0 h-9 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)] transition-all duration-300 ease-out"
            style={{
              width: fInd.w,
              transform: `translate(${fInd.x}px, ${fInd.y}px)`,
              opacity: fInd.ready ? 1 : 0,
            }}
          />
          {FEATURED_FILTERS.map((f) => (
            <button
              key={f.id}
              ref={(el) => {
                fBtnRefs.current[f.id] = el;
              }}
              role="tab"
              aria-selected={featuredFilter === f.id}
              onClick={() => setFeaturedFilter(f.id)}
              className={`relative z-10 h-9 px-5 rounded-full text-[13px] font-semibold transition-colors duration-300 cursor-pointer ${
                featuredFilter === f.id
                  ? "text-white"
                  : "glass text-slate-300 light:text-slate-600 hover:border-violet-400/40 hover:text-violet-500"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* ---------- Featured work — board layout (All) / uniform grid (filtered) ---------- */}
        {featuredFilter === "all" ? (
          <div className={preview ? "" : "mb-24"}>
            <FeaturedHeroCard
              project={enrichedFeatured[0]}
              onOpenCaseStudy={openCase(enrichedFeatured[0])}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {enrichedFeatured.slice(1, 4).map((project, i) => (
                <div
                  key={project.repoName}
                  className="animate-[fadeUpSm_.55s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${i * 0.11}s` }}
                >
                  <TiltCard divisor={40} maxDeg={4} className="h-full">
                    <FeaturedProjectCard project={project} onOpenCaseStudy={openCase(project)} />
                  </TiltCard>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {enrichedFeatured.slice(4, 6).map((project, i) => (
                <div
                  key={project.repoName}
                  className="animate-[fadeUpSm_.55s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${0.33 + i * 0.11}s` }}
                >
                  <WideProjectCard project={project} onOpenCaseStudy={openCase(project)} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div key={featuredFilter} className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ${preview ? "" : "mb-24"}`}>
            {visibleFeatured.map((project, i) => (
              <div
                key={project.repoName}
                className="animate-[fadeUpSm_.55s_cubic-bezier(0.22,1,0.36,1)_both]"
                style={{ animationDelay: `${i * 0.11}s` }}
              >
                <TiltCard divisor={40} maxDeg={4} className="h-full">
                  <FeaturedProjectCard project={project} onOpenCaseStudy={openCase(project)} />
                </TiltCard>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

/* ---------------- Projects page — featured work + GitHub repositories ---------------- */

export function ProjectsPage() {
  useScrollReveal("#projects-repos .reveal");
  const { repos, profile, loading, error, rateLimited, retry } = useGithubRepos();
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredRepoNames = useMemo(
    () => new Set(featuredProjects.map((p) => p.repoName)),
    []
  );

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
    <>
      <FeaturedWork />
      <section id="projects-repos" className="relative overflow-hidden pb-20">
        <div className="relative max-w-[1400px] mx-auto px-6">
        {/* ---------- GitHub repositories — board header ---------- */}
        <div className="reveal flex flex-wrap items-start justify-between gap-6 mb-9">
          <div className="flex flex-col items-start gap-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-500/10 border border-violet-400/25 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-violet-300 light:text-violet-600">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub Repositories
            </span>
            <h2 className="font-display text-3xl md:text-[42px] font-bold tracking-tight text-white light:text-slate-900 leading-tight">
              My GitHub Repositories
            </h2>
            <p className="text-slate-400 light:text-slate-500 max-w-xl leading-relaxed">
              A collection of my open-source work, projects and experiments.
            </p>
            <span className="block h-1 w-14 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400" aria-hidden="true" />
          </div>

          {/* GitHub glass cube + orbit (board) */}
          <div className="relative hidden xl:block w-[230px] h-[150px] shrink-0" aria-hidden="true">
            <div
              className="absolute left-1/2 top-1/2 h-[128px] w-[228px] rounded-[50%] border border-violet-400/40 light:border-violet-300/70"
              style={{ transform: "translate(-50%, -46%) rotateX(64deg) rotate(-10deg)" }}
            />
            <span className="absolute left-[16px] top-[86px] h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_2px_rgba(167,139,250,0.7)]" />
            <span className="absolute right-[12px] top-[38px] h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_2px_rgba(129,140,248,0.7)]" />
            <div className="float-y absolute left-[67px] top-[27px] grid h-24 w-24 place-items-center rounded-[26px] border border-white/50 bg-gradient-to-br from-violet-400/85 via-indigo-400/75 to-fuchsia-300/75 shadow-[0_24px_45px_-15px_rgba(124,58,237,0.55)] backdrop-blur">
              <svg viewBox="0 0 24 24" className="h-11 w-11 text-white" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ---------- Profile bar (board) ---------- */}
        <div className="reveal flex flex-wrap items-center gap-x-8 gap-y-4 rounded-[26px] border border-white/10 light:border-violet-100 bg-white/[0.03] light:bg-white px-7 py-5 mb-12 shadow-[0_20px_45px_-25px_rgba(76,29,149,0.35)]">
          <div className="flex items-center gap-4 min-w-0">
            <img
              src={profile?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`}
              alt={`${GITHUB_USERNAME} GitHub profile`}
              className="w-16 h-16 rounded-full border-2 border-violet-300/60 shadow-[0_10px_24px_-10px_rgba(124,58,237,0.5)]"
              loading="lazy"
              width="64"
              height="64"
            />
            <div className="min-w-0">
              <div className="font-display font-bold text-[19px] text-slate-100 light:text-slate-900">@{GITHUB_USERNAME}</div>
              <div className="text-[13px] text-slate-400 light:text-slate-500">
                {loading ? "Loading…" : error ? "Live stats unavailable" : `${profile?.public_repos ?? repos.length} public repos · ${profile?.followers ?? "—"} followers`}
              </div>
            </div>
          </div>

          <span className="hidden md:block h-11 w-px bg-slate-400/20 light:bg-slate-200" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 light:bg-violet-50 border border-violet-400/15 light:border-violet-100 text-violet-400 light:text-violet-600">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m12 3 9.5 5L12 13 2.5 8 12 3Z" />
                <path d="m2.5 13 9.5 5 9.5-5" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[19px] font-bold text-slate-100 light:text-slate-900">
                {loading || error ? "—" : profile?.public_repos ?? repos.length}
              </span>
              <span className="block text-[12px] text-slate-400 light:text-slate-500">Public Repos</span>
            </span>
          </div>

          <span className="hidden md:block h-11 w-px bg-slate-400/20 light:bg-slate-200" aria-hidden="true" />

          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 light:bg-violet-50 border border-violet-400/15 light:border-violet-100 text-violet-400 light:text-violet-600">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="9" cy="8.5" r="3.2" />
                <path d="M3.5 19.5c.9-3 3-4.4 5.5-4.4s4.6 1.4 5.5 4.4" />
                <path d="M15.5 5.9a3.2 3.2 0 0 1 0 5.9M17.8 15.4c1.4.7 2.4 2 2.9 4.1" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[19px] font-bold text-slate-100 light:text-slate-900">
                {loading || error ? "—" : profile?.followers ?? "—"}
              </span>
              <span className="block text-[12px] text-slate-400 light:text-slate-500">Followers</span>
            </span>
          </div>

          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2.5 rounded-full border border-slate-300/40 light:border-slate-200 bg-white/[0.04] light:bg-white px-5 py-2.5 text-sm font-semibold text-slate-200 light:text-slate-800 hover:border-violet-400/50 hover:text-violet-500 transition-colors"
          >
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-500/15 light:bg-violet-100 text-violet-500">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </span>
            View GitHub Profile
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* ---------- All repositories ---------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h3 className="flex items-center gap-3 font-display text-[26px] font-bold text-white light:text-slate-900">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10 light:bg-violet-100/80 border border-violet-400/20 light:border-violet-200/70 text-violet-400 light:text-violet-600">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m8 7-5.5 5L8 17M16 7l5.5 5L16 17" />
              </svg>
            </span>
            More Repositories
          </h3>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[13px] font-medium text-slate-300 light:text-slate-600">
            <span className={`h-2 w-2 rounded-full ${error ? "bg-amber-400" : "bg-emerald-500"}`} />
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
                aria-pressed={activeFilter === lang}
                onClick={() => setActiveFilter(lang)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                  activeFilter === lang
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-[0_10px_24px_-10px_rgba(124,58,237,0.6)]"
                    : "glass text-slate-300 light:text-slate-600 hover:border-violet-400/40 hover:text-violet-500"
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
          <p className="text-slate-400 text-sm py-10 text-center light:text-slate-600">
            No repositories match this filter.
          </p>
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
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-[15px] shadow-[0_16px_35px_-12px_rgba(124,58,237,0.65)] hover:opacity-92 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Explore All on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
        </div>
      </section>
    </>
  );
}

export default ProjectsPage;
