import React, { useState } from "react";
import { posts } from "../data/posts.gen";
import { useScrollReveal } from "../hooks";
import { playClickSound } from "../lib/sound";

/* Har post ki apni asal page hai: /blog/<slug> (build time par static
   prerender hoti hai — scripts/build-content.mjs). Cards wahan link
   karte hain; koi overlay reader nahi. */

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

/* ---------------- Board cards ---------------- */

/* Har post ki asal cover image — build time par generated title card
   (/blog/<slug>.jpg, scripts/build-content.mjs ka OG generator, fixed
   layout). Peeche gradient fallback hai taake image load hone tak
   card khaali na lage. */
function PostCover({ post, className = "", imgClass = "" }) {
  return (
    <span className={`relative block overflow-hidden bg-gradient-to-br from-violet-700 via-purple-800 to-indigo-950 ${className}`}>
      <img
        src={`/blog/${post.slug}.jpg`}
        alt={post.title}
        loading="lazy"
        width="1200"
        height="630"
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06] ${imgClass}`}
      />
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

function FeaturedCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} data-cursor="hover" className={`${cardShell} flex flex-col overflow-hidden sm:flex-row`}>
      <span className="relative block shrink-0 p-5 pb-0 sm:w-[54%] sm:self-center sm:p-6 sm:pr-0">
        <PostCover post={post} className="aspect-[1200/630] w-full rounded-2xl" />
        <span className="absolute left-9 top-9 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg sm:left-10 sm:top-10">
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
    </a>
  );
}

function SideCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} data-cursor="hover" className={`${cardShell} flex gap-5 p-5`}>
      <PostCover post={post} className="hidden h-[118px] w-[196px] shrink-0 rounded-2xl min-[420px]:block" imgClass="object-left" />
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
    </a>
  );
}

function RowCard({ post }) {
  return (
    <a href={`/blog/${post.slug}`} data-cursor="hover" className={`${cardShell} flex h-full flex-col p-5`}>
      <PostCover post={post} className="h-44 w-full shrink-0 rounded-2xl" />
      <span className="mt-4 text-xs font-medium text-slate-400">
        {formatDate(post.date)} &nbsp;·&nbsp; {post.readingMinutes} min read
      </span>
      <span className="mt-1.5 line-clamp-2 block font-display text-[17px] font-bold leading-snug text-slate-900 transition-colors group-hover:text-violet-700 dark:text-white dark:group-hover:text-violet-300">
        {post.title}
      </span>
      <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
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
    </a>
  );
}

/* ---------------- Section ---------------- */

function Blog() {
  const [query, setQuery] = useState("");
  useScrollReveal("#blog .reveal");

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
    <section id="blog" className="relative scroll-mt-24 overflow-hidden py-16">
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
                <RowCard key={post.slug} post={post} />
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
              <FeaturedCard post={featured} />
              <div className="flex flex-col gap-6">
                {side.map((post) => (
                  <SideCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {row.map((post) => (
                <RowCard key={post.slug} post={post} />
              ))}
              {extra.map((post) => (
                <RowCard key={post.slug} post={post} />
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
        </div>
      </div>
    </section>
  );
}

export default Blog;
