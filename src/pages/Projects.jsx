import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { useGithubRepos } from "../hooks/useGithubRepos";
import SplitTextAnimation from "../components/SplitTextAnimation";
import {
  featuredProjects,
  languageColors,
  formatRelativeDate,
  formatRepoName,
  githubOgImage,
  GITHUB_USERNAME,
} from "../data/projects";

function ProjectImage({ project }) {
  const [src, setSrc] = useState(project.image);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center shrink-0`}>
        <span className="text-5xl">{project.emoji}</span>
      </div>
    );
  }

  return (
    <div className="relative h-52 overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-900">
      <img
        src={src}
        alt={`${project.title} screenshot`}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        onError={() => {
          if (src === project.image) {
            setSrc(githubOgImage(project.repoName));
          } else {
            setFailed(true);
          }
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
    </div>
  );
}

function FeaturedProjectCard({ project }) {
  return (
    <article className="group min-w-[360px] max-w-[380px] shrink-0 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-black/40 backdrop-blur overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        <ProjectImage project={project} />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-600/90 text-white backdrop-blur">
            Featured
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-snug">{project.title}</h3>
          {project.stars > 0 && (
            <span className="text-xs text-gray-500 shrink-0">★ {project.stars}</span>
          )}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              Live Demo
            </a>
          )}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label={`${project.title} on GitHub`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
}

function LanguageDot({ language }) {
  const color = languageColors[language] || languageColors.default;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
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
    <div className="reveal group relative overflow-hidden rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur p-5 hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <svg className="w-4 h-4 text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.346.346 0 010 .659A.985.985 0 003 11.639v6.639A2.5 2.5 0 015.5 19h8.75a2.5 2.5 0 002.5-2.5v-12.5A2.5 2.5 0 0114.25 1h-8.75A2.5 2.5 0 002 3.5v9.086a1.5 1.5 0 011.364-.576h1.636a.25.25 0 00.25-.25V4.5a.25.25 0 00-.25-.25H5.5A1.5 1.5 0 004 5.5v6.639z" />
          </svg>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate"
          >
            {displayName}
          </a>
        </div>
        {repo.stargazers_count > 0 && (
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 shrink-0">
            ★ {repo.stargazers_count}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-grow">
        {description}
      </p>
      <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <LanguageDot language={repo.language} />
        <span className="text-xs text-gray-400">{formatRelativeDate(repo.pushed_at)}</span>
      </div>
      <div className="flex gap-2 mt-3">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg border border-gray-300/70 dark:border-gray-600/70 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Source Code
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center text-xs font-medium px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}

function Projects() {
  useScrollReveal("#projects .reveal");
  const marqueeRef = useRef(null);
  const { repos, profile, loading, error } = useGithubRepos();
  const [activeFilter, setActiveFilter] = useState("All");

  const featuredRepoNames = new Set(featuredProjects.map((p) => p.repoName));

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

  const marqueeItems = useMemo(
    () => [...enrichedFeatured, ...enrichedFeatured],
    [enrichedFeatured]
  );

  useEffect(() => {
    if (!marqueeRef.current) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-project-marquee]", {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration: 45,
      });
    }, marqueeRef);

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
    <section id="projects" className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 px-6 md:px-0">
          <span className="inline-flex items-center gap-2 text-lg font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400">
            <span className="h-[2px] w-6 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            Portfolio
          </span>
          <SplitTextAnimation animationType="words" className="text-3xl md:text-4xl font-extrabold mt-2">
            Projects & GitHub
          </SplitTextAnimation>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl">
            Featured work with screenshots and live demos — scrolls automatically like testimonials.
          </p>

          <div className="reveal mt-6 flex flex-wrap items-center gap-4 p-5 rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/60 dark:bg-black/30 backdrop-blur">
            <img
              src={profile?.avatar_url || `https://github.com/${GITHUB_USERNAME}.png`}
              alt="GitHub profile"
              className="w-14 h-14 rounded-full border-2 border-indigo-500/30"
            />
            <div className="flex-grow min-w-0">
              <div className="font-bold text-lg">@{GITHUB_USERNAME}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {loading ? "Loading..." : `${profile?.public_repos ?? repos.length} public repositories`}
              </div>
            </div>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View Profile
            </a>
          </div>
        </div>

        <div className="mb-6 px-6 md:px-0">
          <h3 className="text-2xl font-bold">Featured Projects</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Swipe through my best work — each with project screenshot and live demo.
          </p>
        </div>

        {/* Sliding marquee — same style as testimonials */}
        <div ref={marqueeRef} className="overflow-hidden mb-20 -mx-6 md:-mx-0">
          <div className="flex gap-6 px-6 md:px-0" data-project-marquee>
            {marqueeItems.map((project, i) => (
              <FeaturedProjectCard key={`${project.repoName}-${i}`} project={project} />
            ))}
          </div>
        </div>

        {/* GitHub Repositories grid below */}
        <div className="mb-6 px-6 md:px-0">
          <h3 className="text-2xl font-bold">All GitHub Repositories</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {loading ? "Fetching..." : `${filteredRepos.length} repos · live from GitHub`}
          </p>
        </div>

        {error && (
          <div className="reveal mx-6 md:mx-0 mb-6 p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 text-sm">
            Could not load GitHub repos.
          </div>
        )}

        {!loading && languages.length > 1 && (
          <div className="reveal flex flex-wrap gap-2 mb-6 px-6 md:px-0">
            {languages.map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setActiveFilter(lang)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === lang
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}

        <div className="px-6 md:px-0">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="rounded-2xl border p-5 animate-pulse h-40" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRepos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-16 px-6">
          <a
            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-gray-300/70 dark:border-gray-700/70 hover:bg-white/40 dark:hover:bg-white/5 backdrop-blur transition-all hover:scale-105 shadow-lg"
          >
            Explore All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default Projects;
