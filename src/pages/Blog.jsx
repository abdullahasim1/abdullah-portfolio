import React, { useEffect, useRef, useState } from "react";
import { posts, getPost } from "../data/posts.gen";
import SectionHeading from "../components/SectionHeading";
import { useScrollReveal, useStaggerAnimation } from "../hooks";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { scrollToSection } from "../lib/smoothScroll";
import { track } from "../lib/analytics";
import { playClickSound } from "../lib/sound";

const SITE_URL = "https://abdullah-asim-dev.vercel.app";
const BLOG_PATH_RE = /^\/blog\/([^/]+)\/?$/;

function formatDate(iso) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
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

/* ---------------- Section ---------------- */

function Blog() {
  const [active, setActive] = useState(null);
  const staggerRef = useStaggerAnimation(0.08, 0.2);
  useScrollReveal("#blog .reveal");

  const openPost = (post, { push = true } = {}) => {
    setActive(post);
    track("blog-open", { slug: post.slug });
    if (push) history.pushState({ slug: post.slug }, "", `/blog/${post.slug}`);
  };

  const closePost = () => {
    setActive(null);
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

  return (
    <section id="blog" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Blog"
          title="Notes & Articles"
          subtitle="Deep dives on performance, React architecture and generative AI — the same problems I solve for clients, written down."
        />

        <div ref={staggerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <button
              key={post.slug}
              type="button"
              data-stagger
              data-cursor="hover"
              onClick={() => {
                playClickSound();
                openPost(post);
              }}
              className="reveal group text-left rounded-2xl glass-strong neon-ring p-6 flex flex-col min-h-[240px] hover:-translate-y-1 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            >
              <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-4">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h3 className="font-display text-lg font-bold text-white leading-snug mb-3 group-hover:text-cyan-200 transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-5 line-clamp-3">
                {post.description}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full text-[11px] bg-white/[0.05] border border-white/[0.07] text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 group-hover:gap-2.5 transition-all">
                Read article
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        <div className="reveal mt-10 flex justify-center">
          <a
            href="/rss.xml"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm font-medium text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden />
            Subscribe via RSS
          </a>
        </div>
      </div>

      {active && <PostReader post={active} onClose={closePost} />}
    </section>
  );
}

export default Blog;
