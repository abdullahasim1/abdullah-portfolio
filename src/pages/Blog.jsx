import React, { useEffect, useRef, useState } from "react";
import { posts, getPost } from "../data/posts.gen";
import { useScrollReveal } from "../hooks";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { scrollToSection } from "../lib/smoothScroll";
import { track } from "../lib/analytics";
import { playClickSound } from "../lib/sound";

const SITE_URL = "https://abdullah-asim-dev.vercel.app";
const BLOG_PATH_RE = /^\/blog\/([^/]+)\/?$/;

const DEFAULT_TITLE = "Abdullah Bin Asim — Full Stack Developer & AI Builder";
const DEFAULT_DESCRIPTION = "Full Stack Developer with AWS Generative AI credentials. React, Next.js, Node.js, AI agents & automation. 25+ projects shipped. Available for new opportunities.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

function setMeta(attr, selector, content) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, content);
}

function applyPostMeta(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  document.title = `${post.title} — Abdullah Bin Asim`;
  setMeta("content", 'meta[name="description"]', post.description);
  setMeta("href", 'link[rel="canonical"]', url);
  setMeta("content", 'meta[property="og:url"]', url);
  setMeta("content", 'meta[property="og:type"]', "article");
  setMeta("content", 'meta[property="og:title"]', post.title);
  setMeta("content", 'meta[property="og:description"]', post.description);
  setMeta("content", 'meta[name="twitter:title"]', post.title);
  setMeta("content", 'meta[name="twitter:description"]', post.description);
  setMeta("content", 'meta[property="og:image"]', `${SITE_URL}/blog/${post.slug}.jpg`);

  // Inject BlogPosting JSON-LD
  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    url,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: url,
    image: `${SITE_URL}/blog/${post.slug}.jpg`,
  });
  document.head.appendChild(ld);
}

function restoreDefaultMeta() {
  document.title = DEFAULT_TITLE;
  setMeta("content", 'meta[name="description"]', DEFAULT_DESCRIPTION);
  setMeta("href", 'link[rel="canonical"]', SITE_URL);
  setMeta("content", 'meta[property="og:url"]', SITE_URL);
  setMeta("content", 'meta[property="og:type"]', "website");
  setMeta("content", 'meta[property="og:title"]', DEFAULT_TITLE);
  setMeta("content", 'meta[property="og:description"]', DEFAULT_DESCRIPTION);
  setMeta("content", 'meta[name="twitter:title"]', DEFAULT_TITLE);
  setMeta("content", 'meta[name="twitter:description"]', DEFAULT_DESCRIPTION);
  setMeta("content", 'meta[property="og:image"]', DEFAULT_OG_IMAGE);
}

/* ---------------- Reader overlay ---------------- */

function PostReader({ post, onClose }) {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  useFocusTrap(panelRef);

  useEffect(() => {
    closeRef.current?.focus();
    const lenisStop = () => {
      document.body.style.overflow = "hidden";
    };
    lenisStop();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${post.title} — article`}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <article
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-strong neon-ring shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <header className="px-6 sm:px-10 pt-10 pb-6 border-b border-white/[0.07]">
          <p className="text-xs font-semibold text-cyan-300 uppercase tracking-[0.18em] mb-3">
            {formatDate(post.date)} · {post.readingMinutes} min read
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight pr-12">
            {post.title}
          </h2>
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.08] text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose-content px-6 sm:px-10 py-8">
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </article>
    </div>
  );
}

/* ---------------- Board cards ---------------- */

/* NOTE: post ki OG images (/blog/<slug>.jpg) generator se clipped banti hain
   (title canvas se bahar) — is liye cards par designed gradient cover use
   hota hai. OG images sirf social-share meta me rehti hain. */
const COVER_ICONS = {
  briefcase:
    "M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m16.5 0a2.18 2.18 0 01-1.5-1.523M3.75 14.15a2.18 2.18 0 001.5-1.523m0 0a2.18 2.18 0 01-.75-1.661V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0",
  share:
    "M7.217 10.907a2.752 2.752 0 100 5.504 2.752 2.752 0 000-5.504zm9.875-5.659a2.754 2.754 0 10-1.698-4.947 2.754 2.754 0 001.698 4.947zM4.38 13.05l6.066-3.391a2.772 2.772 0 01-.051-.973l-6.61-3.691a2.752 2.752 0 10-.905 1.618l6.41 3.58a2.752 2.752 0 01.698-.028l6.25 3.485a2.753 2.753 0 101.032-1.85l-6.776-3.783a2.772 2.772 0 01-.05.973L4.38 13.05z",
  cloud:
    "M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z",
  bolt: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
  code: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  pencil:
    "M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213 3 21l1.787-4.5L16.862 3.487z",
};

function coverIconFor(post) {
  const hay = `${post.slug} ${post.tags.join(" ")}`.toLowerCase();
  if (hay.includes("hiring") || hay.includes("case study")) return COVER_ICONS.briefcase;
  if (hay.includes("n8n") || hay.includes("make")) return COVER_ICONS.share;
  if (hay.includes("aws")) return COVER_ICONS.cloud;
  if (hay.includes("lcp") || hay.includes("performance")) return COVER_ICONS.bolt;
  if (hay.includes("react") || hay.includes("vite") || hay.includes("three")) return COVER_ICONS.code;
  return COVER_ICONS.pencil;
}

function PostCover({ post, className = "", iconClass = "h-10 w-10" }) {
  const filled = coverIconFor(post) === COVER_ICONS.share || coverIconFor(post) === COVER_ICONS.bolt;
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="relative flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-800 transition-transform duration-500 group-hover:scale-[1.06]">
        <span aria-hidden className="absolute -left-6 -top-8 h-24 w-24 rounded-full bg-white/10 blur-md" />
        <span aria-hidden className="absolute -bottom-10 -right-4 h-28 w-28 rounded-full bg-fuchsia-400/20 blur-md" />
        {filled ? (
          <svg viewBox="0 0 24 24" className={`relative ${iconClass} text-white/90`} fill="currentColor" aria-hidden>
            <path d={coverIconFor(post)} />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className={`relative ${iconClass} text-white/90`} fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d={coverIconFor(post)} />
          </svg>
        )}
      </span>
    </span>
  );
}

function TagPills({ tags, limit = 3 }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tags.slice(0, limit).map((tag) => (
        <span
          key={tag}
          className="rounded-full bg-violet-100 px-2.5 py-1 text-[11px] font-semibold text-violet-600 dark:bg-violet-500/15 dark:text-violet-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

const cardShell =
  "group w-full text-left rounded-3xl border border-violet-100 bg-white shadow-[0_12px_36px_-16px_rgba(124,58,237,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(124,58,237,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-white/10 dark:bg-slate-900/70";

function FeaturedCard({ post, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(post)} data-cursor="hover" className={`${cardShell} flex flex-col overflow-hidden sm:flex-row`}>
      <span className="relative block shrink-0 sm:w-[46%]">
        <PostCover post={post} className="h-52 w-full sm:h-full" iconClass="h-16 w-16" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.55l1.28 5.38a.56.56 0 01-.83.6l-4.72-2.88a.56.56 0 00-.59 0l-4.73 2.88a.56.56 0 01-.83-.6l1.29-5.38a.56.56 0 00-.19-.55l-4.2-3.6a.56.56 0 01.33-.99l5.51-.44a.56.56 0 00.48-.35L11.48 3.5z" />
          </svg>
          Featured Article
        </span>
      </span>
      <span className="flex flex-1 flex-col p-6 sm:p-7">
        <span className="text-xs font-medium text-slate-400">
          {formatDate(post.date)} &nbsp;·&nbsp; {post.readingMinutes} min read
        </span>
        <span className="mt-2.5 font-display text-[22px] font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">
          {post.title}
        </span>
        <span className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          {post.description}
        </span>
        <span className="mt-4 block">
          <TagPills tags={post.tags} />
        </span>
        <span className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25">
          Read Article
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </span>
    </button>
  );
}

function SideCard({ post, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(post)} data-cursor="hover" className={`${cardShell} flex gap-5 p-5`}>
      <PostCover post={post} className="hidden h-[118px] w-[132px] shrink-0 rounded-2xl min-[420px]:block" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-medium text-slate-400">
          {formatDate(post.date)} &nbsp;·&nbsp; {post.readingMinutes} min read
        </span>
        <span className="mt-1.5 line-clamp-2 font-display text-[17px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">
          {post.title}
        </span>
        <span className="mt-3 flex items-end justify-between gap-3">
          <TagPills tags={post.tags} />
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-200 text-violet-600 transition-all group-hover:bg-violet-600 group-hover:text-white dark:border-white/15 dark:text-violet-300">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </span>
      </span>
    </button>
  );
}

function RowCard({ post, onOpen }) {
  return (
    <button type="button" onClick={() => onOpen(post)} data-cursor="hover" className={`${cardShell} flex flex-col p-5`}>
      <span className="flex gap-4">
        <PostCover post={post} className="h-[104px] w-[104px] shrink-0 rounded-2xl" />
        <span className="min-w-0">
          <span className="text-xs font-medium text-slate-400">
            {formatDate(post.date)} &nbsp;·&nbsp; {post.readingMinutes} min read
          </span>
          <span className="mt-1.5 line-clamp-3 block font-display text-[16px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">
            {post.title}
          </span>
        </span>
      </span>
      <span className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {post.description}
      </span>
      <span className="mt-4 flex items-center justify-between gap-3">
        <TagPills tags={post.tags} />
      </span>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-all group-hover:gap-2.5 dark:text-violet-300">
        Read Article
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </button>
  );
}

/* ---------------- Section ---------------- */

function Blog() {
  const [active, setActive] = useState(null);
  const [query, setQuery] = useState("");
  useScrollReveal("#blog .reveal");

  const openPost = (post, { push = true } = {}) => {
    playClickSound();
    setActive(post);
    track("blog-open", { slug: post.slug });
    applyPostMeta(post);
    if (push) history.pushState({ slug: post.slug }, "", `/blog/${post.slug}`);
  };

  const closePost = () => {
    setActive(null);
    restoreDefaultMeta();
    if (BLOG_PATH_RE.test(location.pathname)) {
      if (history.state?.slug) history.back();
      else history.replaceState({}, "", "/");
    }
  };

  /* Deep links: /blog/<slug> directly load par bhi post khule */
  useEffect(() => {
    const syncFromPath = () => {
      const match = location.pathname.match(BLOG_PATH_RE);
      const post = match ? getPost(match[1]) : null;
      setActive(post);
      if (post) {
        requestAnimationFrame(() => scrollToSection("blog"));
        track("blog-open", { slug: post.slug });
      }
    };
    syncFromPath();
    window.addEventListener("popstate", syncFromPath);
    return () => window.removeEventListener("popstate", syncFromPath);
  }, []);

  if (posts.length === 0) return null;

  const q = query.trim().toLowerCase();
  const filtered = q
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
    : posts;

  const [featured, ...rest] = posts;
  const side = rest.slice(0, 2);
  const row = rest.slice(2, 5);
  const extra = rest.slice(5);

  return (
    <section id="blog" className="relative scroll-mt-24 overflow-hidden py-28">
      <div aria-hidden className="absolute -right-32 top-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 113.182 3.182L7.5 19.213 3 21l1.787-4.5L16.862 3.487z" />
              </svg>
              Blog
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
              Notes &amp; Articles
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              Deep dives on performance, React architecture and generative AI — the same problems I solve for clients, written down.
            </p>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
          </div>
          <label className="relative block w-full max-w-xs">
            <span className="sr-only">Search articles</span>
            <svg className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full rounded-full border border-violet-100 bg-white py-3 pl-11 pr-4 text-sm text-slate-800 shadow-sm transition-all placeholder:text-slate-400 focus:border-violet-400 focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
            />
          </label>
        </div>

        {q ? (
          filtered.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((post) => (
                <RowCard key={post.slug} post={post} onOpen={openPost} />
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-violet-100 bg-white px-6 py-10 text-center text-slate-500 dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-400">
              No articles match “{query}” — try another keyword.
            </p>
          )
        ) : (
          <>
            <div className="grid items-stretch gap-6 lg:grid-cols-[1.5fr_1fr]">
              <FeaturedCard post={featured} onOpen={openPost} />
              <div className="flex flex-col gap-6">
                {side.map((post) => (
                  <SideCard key={post.slug} post={post} onOpen={openPost} />
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {row.map((post) => (
                <RowCard key={post.slug} post={post} onOpen={openPost} />
              ))}
              {extra.map((post) => (
                <RowCard key={post.slug} post={post} onOpen={openPost} />
              ))}
            </div>
          </>
        )}

        {/* Bottom actions */}
        <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setQuery("");
              scrollToSection("blog");
            }}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
          >
            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3-.512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6-2.292m0-14.25v14.25" />
            </svg>
            View All Articles
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-2.5 rounded-full border border-violet-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
          >
            <svg className="h-[18px] w-[18px] text-violet-600 dark:text-violet-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5m0-6.75c.75 0 1.477.083 2.175.238A13.495 13.495 0 0119.5 17.325c0 .578-.03 1.152-.088 1.718a.75.75 0 01-1.328.553A15.883 15.883 0 0012.75 12.5m-8.25 7.5h-.75a.75.75 0 01-.75-.75v-.008c0-.414.336-.75.75-.75h.75a.75.75 0 01.75.75v.008c0 .414-.336.75-.75.75z" transform="rotate(90 12 12)" />
            </svg>
            Subscribe via RSS
          </a>
        </div>
      </div>

      {active && <PostReader post={active} onClose={closePost} />}
    </section>
  );
}

export default Blog;
