import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { githubOgImage, GITHUB_USERNAME } from "../data/projects";
import { getLenis } from "../lib/smoothScroll";

/* Modal image — project screenshot, fallback OG image, phir gradient */
function ModalImage({ project }) {
  const [src, setSrc] = useState(project.image);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`h-full min-h-[240px] bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
        <span className="text-7xl drop-shadow-lg">{project.emoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`${project.title} - ${project.description}`}
      className="h-full w-full object-cover object-top"
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

/* ---------------- Case-study modal ---------------- */

export default function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);

  /* Entrance animation */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { y: 48, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 0.45, ease: "power3.out" }
      );
    });
    closeBtnRef.current?.focus();
    return () => ctx.revert();
  }, []);

  /* Scroll lock (Lenis + native) + Escape-to-close */
  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [onClose]);

  /* Exit animation phir unmount */
  const handleClose = () => {
    const lenis = getLenis();
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.22, ease: "power2.in" });
    gsap.to(panelRef.current, {
      y: 32,
      opacity: 0,
      scale: 0.97,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        document.body.style.overflow = "";
        lenis?.start();
        onClose();
      },
    });
  };

  return (
    <div
      ref={backdropRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} case study`}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Panel */}
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl glass-strong neon-ring shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
      >
        {/* Close button */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleClose}
          aria-label="Close case study"
          className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/60 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header image */}
        <div className="relative h-56 sm:h-72 overflow-hidden">
          <ModalImage project={project} />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0b1222] via-transparent to-black/30" />
          <span className="absolute top-4 left-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-cyan-300 bg-black/60 border border-cyan-400/30 backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            Case Study
          </span>
          <h3 className="absolute bottom-4 left-6 right-16 font-display text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow">
            {project.title}
          </h3>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {/* Meta */}
          <div className="flex flex-wrap gap-2 mb-5">
            {[project.role, project.year].filter(Boolean).map((meta) => (
              <span key={meta} className="px-3 py-1 rounded-full text-xs font-medium text-slate-300 bg-white/[0.05] border border-white/[0.08]">
                {meta}
              </span>
            ))}
          </div>

          <p className="text-slate-300 leading-relaxed mb-6">{project.overview || project.description}</p>

          {(project.features?.length ?? 0) > 0 && (
            <>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Highlights
              </h4>
              <ul className="space-y-2.5 mb-7">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-400 leading-relaxed">
                    <svg className="w-4 h-4 mt-0.5 shrink-0 text-cyan-400" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full text-xs bg-white/[0.05] border border-white/[0.07] text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-2.5">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] text-center px-5 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:opacity-90 transition-opacity"
              >
                Live Demo
              </a>
            )}
            <a
              href={`https://github.com/${GITHUB_USERNAME}/${project.repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-xl glass text-slate-200 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
