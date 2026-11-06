import React from "react";
import {
  languageColors,
  formatRelativeDate,
  formatRepoName,
  repoLiveUrl,
  GITHUB_USERNAME,
} from "../data/projects";

/* Compact repo card — Projects.jsx se extract kiya gaya (sirf mechanical
   move, props/logic/exports bilkul wahi). Repos grid ke cards yahan se
   render hote hain. */

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
  /* Live URL: override (projects.js) GitHub homepage par jeet-ta hai —
     dead homepages (Events Agent, purana GENAI) kabhi link nahi bante */
  const liveUrl = repoLiveUrl(repo);
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
        {liveUrl && (
          <a
            href={liveUrl}
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


export default RepoCard;
