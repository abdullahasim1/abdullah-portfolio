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
      width="200"
      height="200"
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

          {cert.credentialUrl && (
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

/* ---------------- Certification card (mockup style) ---------------- */

function CertCard({ cert }) {
  const hasLink = cert.credentialUrl && cert.credentialUrl !== "#";
  return (
    <div className="group relative overflow-hidden rounded-3xl glass card-glow-hover hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
      <div className="relative h-44 flex items-center justify-center bg-gradient-to-br from-violet-500/[0.07] to-transparent border-b border-white/[0.06] shrink-0 p-4">
        <CertImage src={cert.image} alt={cert.title} className="max-h-full" />
        <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-medium text-slate-300 bg-black/50 border border-white/10">
          {cert.date}
        </span>
      </div>
      <div className="flex flex-col flex-grow p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-300/90 mb-1.5">
          {cert.issuer}
        </p>
        <h3 className="font-display text-base font-semibold text-white leading-snug mb-3">
          {cert.title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed mb-4">
          {cert.skills.slice(0, 4).join(" · ")}
        </p>
        <div className="mt-auto pt-2">
          {hasLink ? (
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 hover:text-violet-200 transition-colors"
            >
              Verify Credential
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-500">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Completed training
            </span>
          )}
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

  const featured = certifications.filter((c) => c.featured);
  const others = certifications.filter((c) => !c.featured);

  return (
    <section id="certifications" className="py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 md:px-0">
        <SectionHeading
          scene="05"
          label="Certifications"
          title="Credentials & Learning"
          subtitle="AWS Professional, Claude Certified Architect and OpenAI credentials, plus Anthropic and partner training."
        />

        {featured.map((cert) => (
          <FeaturedCert key={cert.id} cert={cert} />
        ))}

        <div ref={staggerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {others.map((cert) => (
            <div key={cert.id} data-stagger>
              <CertCard cert={cert} />
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
