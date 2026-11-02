import React, { useState } from "react";
import { siAnthropic } from "simple-icons";
import { useScrollReveal } from "../hooks";
import { certifications } from "../data/certifications";

const CREDLY_URL = "https://www.credly.com/users/abdullah-asim/badges";

/* Short card descriptions (board copy, matched to each real credential). */
const DESCRIPTIONS = {
  "aws-genai-professional":
    "Build and deploy production generative AI applications on AWS.",
  "aws-genai-early-adopter":
    "Early Adopter badge — among the first 5,000 holders of this credential worldwide.",
  "aws-ai-practitioner":
    "Foundational understanding of AI, ML and generative AI on AWS.",
  "anthropic-claude-code":
    "Hands-on usage of Claude for real-world development workflows.",
  "anthropic-mcp": "Learn the Model Context Protocol (MCP) for integrating AI tools.",
  "anthropic-agent-skills":
    "Build effective agent skills using Claude and automation patterns.",
  "aws-partner-technical": "Technical accreditation for AWS partners.",
  "aws-partner-sales": "Business accreditation for AWS partners.",
  "anthropic-ccaf": "Core concepts for designing applications with Claude.",
  "openai-chatgpt-deployment":
    "Deploy and manage ChatGPT solutions in real-world use cases.",
  "openai-consultative-solutions":
    "Design and deliver business solutions using OpenAI models.",
};

function kindOf(cert) {
  if (cert.id.startsWith("aws-")) return "aws";
  if (cert.issuer.includes("Anthropic")) return "anthropic";
  return "openai";
}

function IssuerMark({ kind, className = "h-4 w-4" }) {
  if (kind === "aws") {
    return (
      <span className="relative inline-flex shrink-0 items-center font-display text-[11px] font-extrabold lowercase leading-none text-slate-800 dark:text-slate-100">
        aws
        <svg className="absolute -bottom-[5px] left-0 h-[5px] w-full text-[#FF9900]" viewBox="0 0 24 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1 1.5 C 7 5.5, 17 5.5, 23 1.5" />
        </svg>
      </span>
    );
  }
  if (kind === "openai") {
    /* OpenAI icon is not in simple-icons (trademark) — mono tile, same convention as techLogos. */
    return (
      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] bg-gradient-to-br from-teal-400 to-sky-500 text-[8px] font-extrabold text-white">
        AI
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0 text-slate-800 dark:text-slate-100`} fill="currentColor" aria-hidden>
      <path d={siAnthropic.path} />
    </svg>
  );
}

function CertImage({ src, alt, className = "" }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-violet-500/15 to-indigo-500/10 ${className}`}>
        <svg className="h-8 w-8 text-violet-400" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  }
  return (
    <img src={src} alt={alt} className={`object-contain ${className}`} loading="lazy" width="200" height="200" onError={() => setFailed(true)} />
  );
}

/* ---------------- Header award illustration (glass medal) ---------------- */

function AwardArt() {
  return (
    <div aria-hidden className="relative hidden h-[120px] w-[190px] shrink-0 lg:block">
      <div className="absolute right-6 top-1 h-24 w-24 rotate-6 rounded-[1.4rem] border border-white/70 bg-white/50 shadow-[0_18px_36px_-14px_rgba(124,58,237,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-white/10" />
      <span className="absolute right-[52px] top-[26px] flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/40">
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.55l1.28 5.38a.56.56 0 01-.83.6l-4.72-2.88a.56.56 0 00-.59 0l-4.73 2.88a.56.56 0 01-.83-.6l1.29-5.38a.56.56 0 00-.19-.55l-4.2-3.6a.56.56 0 01.33-.99l5.51-.44a.56.56 0 00.48-.35L11.48 3.5z" />
        </svg>
      </span>
      <svg className="absolute right-0 top-0 h-[104px] w-[150px] text-violet-400/70" viewBox="0 0 150 104" fill="none">
        <ellipse cx="75" cy="52" rx="72" ry="48" stroke="currentColor" strokeWidth="1.4" transform="rotate(-14 75 52)" />
      </svg>
      <span className="absolute right-[138px] top-[6px] h-2 w-2 rounded-full bg-violet-500" />
      <span className="absolute right-[6px] top-[64px] h-2.5 w-2.5 rounded-full bg-purple-400" />
      <span className="absolute right-[104px] top-[92px] text-violet-400">
        <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" /></svg>
      </span>
    </div>
  );
}

/* ---------------- Featured certification banner ---------------- */

function FeaturedCert({ cert }) {
  return (
    <div className="sweep-host relative mb-10 overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-violet-200 via-purple-200 to-violet-300 shadow-[0_24px_50px_-24px_rgba(124,58,237,0.45)]">
      <div aria-hidden className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/40 blur-3xl" />
      <div aria-hidden className="absolute -bottom-28 right-1/4 h-72 w-72 rounded-full bg-fuchsia-300/40 blur-3xl" />
      <div className="relative grid items-center gap-6 p-7 sm:p-9 lg:grid-cols-[1fr_1.5fr] lg:gap-10">
        {/* Badge side */}
        <div className="relative flex flex-col items-center">
          <span className="absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm backdrop-blur">
            <svg className="h-3.5 w-3.5 text-amber-500" fill="currentColor" viewBox="0 0 24 24"><path d="M11.48 3.5a.56.56 0 011.04 0l2.13 5.11a.56.56 0 00.47.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.55l1.28 5.38a.56.56 0 01-.83.6l-4.72-2.88a.56.56 0 00-.59 0l-4.73 2.88a.56.56 0 01-.83-.6l1.29-5.38a.56.56 0 00-.19-.55l-4.2-3.6a.56.56 0 01.33-.99l5.51-.44a.56.56 0 00.48-.35L11.48 3.5z" /></svg>
            Featured Certification
          </span>
          <CertImage src={cert.image} alt={cert.title} className="mt-8 h-48 w-48 drop-shadow-[0_18px_24px_rgba(13,84,84,0.35)] sm:h-56 sm:w-56" />
          <div aria-hidden className="mt-1 h-5 w-52 rounded-[50%] bg-violet-500/25 blur-md" />
        </div>

        {/* Content side */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
            {cert.issuer} &bull; {cert.date}
          </p>
          <h3 className="mt-3 font-display text-[26px] font-extrabold leading-tight text-slate-900 sm:text-[32px]">
            {cert.title}
            <svg className="mb-1 ml-2.5 inline h-6 w-6 text-violet-600" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 12c0 5.084 3.068 9.433 7.452 11.34a.75.75 0 00.596 0C14.682 21.433 17.75 17.084 17.75 12c0-2.18-.24-4.295-.676-6.235a.75.75 0 00-.722-.515 11.21 11.21 0 01-7.877-3.08zM8.28 11.28a.75.75 0 10-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l5.25-5.25a.75.75 0 10-1.06-1.06l-4.72 4.72-1.72-1.72z" clipRule="evenodd" transform="scale(1.15) translate(-1.5 -1.5)" />
            </svg>
          </h3>
          <p className="mt-3 max-w-xl leading-relaxed text-slate-600">{cert.description}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[...cert.skills, "RAG"].map((skill) => (
              <span key={skill} className="rounded-full border border-violet-300/70 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-violet-700 backdrop-blur">
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-opacity hover:opacity-90"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Verify Credential
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            <a
              href={CREDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition-colors hover:bg-violet-50"
            >
              <svg className="h-4 w-4 text-violet-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              View Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Certification card ---------------- */

function CertCard({ cert }) {
  const kind = kindOf(cert);
  const hasLink = Boolean(cert.credentialUrl);
  return (
    <div className="flex h-full flex-col rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_10px_36px_-16px_rgba(124,58,237,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-16px_rgba(124,58,237,0.3)] dark:border-white/10 dark:bg-slate-900/70">
      <div className="flex items-start justify-between gap-3">
        <CertImage src={cert.image} alt={cert.title} className="h-16 w-16 shrink-0" />
        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-semibold text-violet-500 dark:bg-violet-500/10 dark:text-violet-300">
          {cert.date}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[17px] font-bold leading-snug text-slate-900 dark:text-white">
        {cert.title}
      </h3>
      <p className="mt-1.5 flex items-center gap-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
        <IssuerMark kind={kind} />
        {cert.issuer}
      </p>
      <p className="mt-2.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        {DESCRIPTIONS[cert.id] || cert.skills.slice(0, 3).join(" · ")}
      </p>

      <div className="mt-auto flex items-center justify-between gap-2 pt-5">
        {hasLink ? (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-4 py-2 text-[13px] font-semibold text-violet-600 transition-colors hover:bg-violet-100 dark:bg-violet-500/10 dark:text-violet-300 dark:hover:bg-violet-500/20"
          >
            Verify Credential
            <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-4 py-2 text-[13px] font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300">
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Completed Training
          </span>
        )}
        <a
          href={hasLink ? cert.credentialUrl : CREDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open credential for ${cert.title}`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:text-slate-300"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/* ---------------- Keep Learning tile ---------------- */

function KeepLearning() {
  return (
    <div className="flex h-full flex-col items-center justify-center rounded-3xl border-2 border-dashed border-violet-300 bg-violet-50/40 p-6 text-center dark:border-violet-500/30 dark:bg-violet-500/[0.04]">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
        <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth={1.7} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 5-9 5-9-5 9-5zm-9 9l9 5 9-5M3 17l9 5 9-5" />
        </svg>
      </span>
      <h3 className="mt-4 font-display text-lg font-bold text-slate-900 dark:text-white">Keep Learning</h3>
      <p className="mt-2 max-w-[240px] text-sm leading-relaxed text-slate-500 dark:text-slate-400">
        I regularly upskill through certifications, workshops and hands-on projects.
      </p>
      <a
        href={CREDLY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-violet-300 bg-white px-5 py-2.5 text-[13px] font-semibold text-violet-600 transition-colors hover:bg-violet-50 dark:border-violet-500/40 dark:bg-transparent dark:text-violet-300"
      >
        View All on Credly
        <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M9 7h8v8" />
        </svg>
      </a>
    </div>
  );
}

/* ---------------- Page ---------------- */

const FILTER_DEFS = [
  { key: "all", label: "All" },
  { key: "aws", label: "AWS" },
  { key: "anthropic", label: "Anthropic" },
  { key: "openai", label: "OpenAI" },
];

function Certifications() {
  useScrollReveal("#certifications .reveal");
  const [filter, setFilter] = useState("all");

  const featured = certifications.find((c) => c.featured);
  const counts = {
    all: certifications.length,
    aws: certifications.filter((c) => kindOf(c) === "aws").length,
    anthropic: certifications.filter((c) => kindOf(c) === "anthropic").length,
    openai: certifications.filter((c) => kindOf(c) === "openai").length,
  };
  const shown = certifications.filter((c) => filter === "all" || kindOf(c) === filter);

  return (
    <section id="certifications" className="relative scroll-mt-24 overflow-hidden py-28">
      <div aria-hidden className="absolute -left-32 top-24 h-80 w-80 rounded-full bg-violet-300/20 blur-3xl dark:bg-violet-600/10" />
      <div aria-hidden className="absolute -right-32 bottom-24 h-80 w-80 rounded-full bg-fuchsia-300/20 blur-3xl dark:bg-fuchsia-600/10" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        {/* Board header */}
        <div className="reveal mb-10 flex items-start justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
              </svg>
              Credentials &amp; Learning
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[44px]">
              Credentials &amp; Learning
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-slate-500 dark:text-slate-400 sm:text-base">
              My professional certifications, credentials and continuous learning journey across AI, AWS and modern tech.
            </p>
            <div className="mt-4 h-[3px] w-14 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500" />
          </div>
          <AwardArt />
        </div>

        {featured && <FeaturedCert cert={featured} />}

        {/* Filter pills */}
        <div className="mb-8 flex flex-wrap gap-2.5">
          {FILTER_DEFS.map((f) => {
            const active = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setFilter(f.key)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  active
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-violet-300 hover:text-violet-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                }`}
              >
                {f.key !== "all" && <IssuerMark kind={f.key} className="h-3.5 w-3.5" />}
                {f.label} ({counts[f.key]})
              </button>
            );
          })}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {shown.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
          {filter === "all" && <KeepLearning />}
        </div>
      </div>
    </section>
  );
}

export default Certifications;
