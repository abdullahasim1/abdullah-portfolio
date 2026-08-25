import React, { useState } from "react";
import { useScrollReveal, useStaggerAnimation } from "../hooks";
import { certifications } from "../data/certifications";
import GlowCard from "../components/GlowCard";
import SectionHeading from "../components/SectionHeading";

function CertImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-violet-500/10 ${className}`}>
        <span className="text-4xl">🎓</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`object-contain p-3 ${className}`}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

/* ---------------- Featured certification ---------------- */

function FeaturedCert({ cert }) {
  return (
    <GlowCard className="reveal mb-14">
      <div className="grid lg:grid-cols-5 rounded-2xl overflow-hidden">
        {/* Badge zone */}
        <div className="lg:col-span-2 relative min-h-[260px] md:min-h-[300px] bg-gradient-to-br from-slate-900 via-black to-slate-950 flex items-center justify-center">
          <CertImage src={cert.image} alt={cert.title} className="w-full h-full max-h-[300px]" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-cyan-300 bg-black/50 border border-cyan-400/30 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 blink-dot" />
            AWS Professional
          </span>
        </div>

        {/* Content zone */}
        <div className="lg:col-span-3 p-8 md:p-10 flex flex-col justify-center">
          <p className="text-xs font-semibold text-cyan-300 uppercase tracking-[0.18em] mb-3">
            {cert.issuer} · {cert.date}
          </p>
          <h3 className="font-display text-2xl md:text-[32px] font-bold text-white leading-tight mb-4">
            {cert.title}
          </h3>
          <p className="text-slate-400 leading-relaxed mb-6">{cert.description}</p>

          <div className="flex flex-wrap gap-2 mb-8">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 rounded-full text-xs font-medium text-cyan-200/90 bg-cyan-500/[0.08] border border-cyan-400/20"
              >
                {skill}
              </span>
            ))}
          </div>

          {cert.credentialUrl && cert.credentialUrl !== "#" && (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen-btn relative self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-sm font-semibold shadow-[0_0_24px_rgba(34,211,238,0.2)] hover:opacity-90 transition-opacity"
            >
              Verify Credential
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span className="sheen-layer" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </GlowCard>
  );
}

/* ---------------- Interactive 3D flip card ---------------- */

function FlipCertCard({ cert }) {
  const [flipped, setFlipped] = useState(false);
  const hasLink = cert.credentialUrl && cert.credentialUrl !== "#";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${cert.title} — flip for details`}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
      data-cursor="hover"
      className={`cert-flip h-[330px] cursor-pointer outline-none rounded-2xl focus-visible:ring-2 focus-visible:ring-cyan-400 ${flipped ? "is-flipped" : ""}`}
    >
      <div className="cert-flip-inner">
        {/* ── FRONT ── */}
        <div className="cert-flip-face glass rounded-2xl overflow-hidden flex flex-col">
          <div className="relative h-[56%] flex items-center justify-center bg-gradient-to-br from-slate-900 to-black border-b border-white/[0.06] shrink-0">
            <CertImage src={cert.image} alt={cert.title} className="w-full h-full" />
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-medium text-slate-300 bg-black/60 border border-white/10 backdrop-blur">
              {cert.date}
            </span>
          </div>
          <div className="flex flex-col flex-grow p-5 min-h-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-300/80 mb-1 truncate">
              {cert.issuer}
            </p>
            <h3 className="font-display text-[15px] font-bold text-white leading-snug line-clamp-2">
              {cert.title}
            </h3>
            <div className="mt-auto pt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
              <svg className="w-3.5 h-3.5 text-cyan-400/70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Hover / tap to flip
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div className="cert-flip-face cert-flip-back glass-strong rounded-2xl p-6 flex flex-col neon-ring">
          <span className="inline-flex self-start items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-400/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300 mb-4">
            <span className="h-1 w-1 rounded-full bg-cyan-400" />
            Skills gained
          </span>

          <div className="flex flex-wrap gap-2 content-start overflow-hidden">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-200 bg-white/[0.05] border border-white/[0.08]"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-white/[0.07]">
            {hasLink ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                View Credential
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Completed training
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Credly CTA tile (fills the last grid cell) ---------------- */

function CredlyTile() {
  return (
    <a
      href="https://www.credly.com/users/abdullah-asim/badges"
      target="_blank"
      rel="noopener noreferrer"
      className="reveal group relative overflow-hidden rounded-2xl glass-strong neon-ring min-h-[330px] p-7 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 to-violet-500/25 border border-cyan-400/40 mb-5 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </span>
      <h3 className="relative font-display text-lg font-bold text-white leading-snug">
        All Credentials,
        <br />
        One Place
      </h3>
      <p className="relative text-sm text-slate-400 mt-2 mb-5">
        Every badge is publicly verifiable on Credly.
      </p>
      <span className="relative inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 group-hover:text-cyan-200 transition-colors">
        Verify on Credly
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </a>
  );
}

/* ---------------- Page ---------------- */

function Certifications() {
  useScrollReveal("#certifications .reveal");
  const staggerRef = useStaggerAnimation(0.07, 0.15);

  const featured = certifications.find((c) => c.featured);
  const others = certifications.filter((c) => !c.featured);

  return (
    <section id="certifications" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          label="Certifications"
          title="Credentials & Learning"
          subtitle="AWS Professional & AI credentials plus Anthropic and partner training. Hover or tap any card to see the skills behind it."
        />

        {featured && <FeaturedCert cert={featured} />}

        <div ref={staggerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {others.map((cert) => (
            <div key={cert.id} data-stagger>
              <FlipCertCard cert={cert} />
            </div>
          ))}
          <div data-stagger>
            <CredlyTile />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certifications;
