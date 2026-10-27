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
        <div className="lg:col-span-2 relative min-h-[260px] md:min-h-[300px] bg-gradient-to-br from-slate-900 via-black to-slate-950 flex items-center justify-center light:bg-none light:bg-[#f4f1ea]">
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

/* ---------------- Certification row (Light Minimal list) ---------------- */

function CertRow({ cert }) {
  const hasLink = cert.credentialUrl && cert.credentialUrl !== "#";
  return (
    <div className="reveal flex items-center gap-5 py-5 border-b border-white/[0.07] light:border-[#e8e4da]">
      <div className="hidden sm:flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden light:bg-[#f4f1ea] light:border-[#e8e4da]">
        <CertImage src={cert.image} alt={cert.title} className="w-full h-full" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-lg font-medium text-white leading-snug light:text-slate-900">
          {cert.title}
        </h3>
        <p className="text-sm text-slate-400 mt-0.5 light:text-slate-600">
          {cert.issuer} · {cert.date}
        </p>
        <p className="text-xs text-slate-500 mt-1 truncate">
          {cert.skills.join(" · ")}
        </p>
      </div>
      {hasLink ? (
        <a
          href={cert.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-200 underline underline-offset-4 decoration-slate-500 hover:decoration-current light:text-slate-900"
        >
          Verify
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ) : (
        <span className="shrink-0 inline-flex items-center gap-1.5 text-xs text-slate-500">
          <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Completed
        </span>
      )}
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
      className="reveal group mt-14 flex flex-col items-center justify-center text-center"
    >
      <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/25 to-violet-500/25 border border-cyan-400/40 mb-5 group-hover:scale-110 transition-transform duration-300">
        <svg className="w-7 h-7 text-cyan-300" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </span>
      <h3 className="relative font-display text-2xl font-medium text-white leading-snug light:text-slate-900">
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
          subtitle="AWS Professional, Claude Certified Architect and OpenAI credentials, plus Anthropic and partner training — har aik ke skills sath listed hain."
        />

        {featured.map((cert) => (
          <FeaturedCert key={cert.id} cert={cert} />
        ))}

        <div ref={staggerRef} className="border-t border-white/[0.07] light:border-[#e8e4da]">
          {others.map((cert) => (
            <CertRow key={cert.id} cert={cert} />
          ))}
        </div>

        <CredlyTile />
      </div>
    </section>
  );
}

export default Certifications;
