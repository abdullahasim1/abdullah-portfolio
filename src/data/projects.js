// @ts-check
/* NOTE: Har project mein `results` array — case-study page par
   "Results & Impact" section dikhata hai. Sirf REAL, verifiable
   product facts bharein — koi invented impact metrics nahi.
   `challenges` = key problems + unke solutions, `responsibilities`
   = Abdullah ka asal role detail mein. */

export const featuredProjects = [
  {
    repoName: "four-ai-ai-powered-voice-image-generation-platform",
    title: "Four-AI Platform",
    description:
      "AI-powered web app with Text-to-Speech, Text-to-Image, and voice effects built with React and Node.js.",
    tags: ["React", "GSAP", "Node.js", "MySQL"],
    liveLink: "https://four-ai-dev.vercel.app",
    status: "live",
    gradient: "from-violet-500 to-purple-600",
    emoji: "🤖",
    image: "/projects/four-ai.webp",
    gallery: [
      "/projects/four-ai.webp",
      "/projects/four-ai-2.webp",
      "/projects/four-ai-3.webp",
    ],
    role: "Full Stack Developer",
    year: "2024",
    type: "AI Web Platform",
    results: [
      { value: "3", label: "AI tools — TTS, image generation & voice effects" },
      { value: "25", label: "Free image generations per user, per day" },
      { value: "v3.0", label: "Current production release" },
    ],
    overview:
      "A browser-based AI studio that bundles text-to-speech, text-to-image and voice-effect tools behind one polished interface — no installs, no setup, straight from the tab.",
    features: [
      "Text-to-Speech & Text-to-Image pipelines powered by AI APIs",
      "Voice-effects engine with real-time preview",
      "Secure Node.js API layer with MySQL usage tracking",
      "GSAP-driven micro-interactions across the UI",
    ],
    challenges: [
      {
        title: "Three AI tools, one consistent studio",
        desc: "Text-to-speech, image generation and voice effects each have completely different inputs and outputs. I unified them behind one dashboard shell with shared history, so users learn the interface once and switch tools without friction.",
      },
      {
        title: "Protecting paid AI APIs",
        desc: "AI inference is expensive and easy to abuse. Every call goes through a secure server-side layer with rate limiting and per-user usage tracking — API keys never reach the browser.",
      },
      {
        title: "Keeping generation honest",
        desc: "Long AI calls can look like a hang, and unlimited free use burns budget. The UI shows progress clearly and enforces a fair daily quota, so users always know what's happening and how many generations they have left.",
      },
    ],
    responsibilities: [
      "Designed and built the full product — UI, API layer and database",
      "Integrated TTS, text-to-image and voice-effect AI pipelines",
      "Added authentication, per-user quotas and rate limiting for safe public use",
      "Hardened the platform's security and shipped the v3.0 release",
    ],
    architectureFlow: [
      {
        step: "Prompt / Audio Input",
        desc: "User inputs text or records voice stream",
      },
      {
        step: "Node.js REST API",
        desc: "Rate limiting, payload validation & auth tokens",
      },
      {
        step: "AI Inference Engine",
        desc: "TTS synthesis & Text-to-Image neural rendering",
      },
      {
        step: "Live Client Stream",
        desc: "Real-time audio player & generated image preview",
      },
    ],
  },
  {
    repoName: "GENAI",
    title: "HireGen AI",
    description:
      "Smart hiring & communication automation — AI resume matching, email automation, and skill-gap insights.",
    tags: ["Next.js", "Generative AI", "TypeScript", "Neon"],
    liveLink: "https://hiregen-ai.vercel.app",
    status: "live",
    gradient: "from-sky-500 to-blue-600",
    emoji: "✨",
    image: "/projects/genai.webp",
    gallery: [
      "/projects/genai.webp",
      "/projects/genai-2.webp",
      "/projects/genai-3.webp",
    ],
    role: "Full Stack Developer & AI Integrator",
    year: "2025",
    type: "AI SaaS — Recruitment",
    results: [
      { value: "3", label: "Pipeline stages — parse, match, outreach" },
      { value: "100%", label: "Matches include a scoring rationale" },
      { value: "Skill-gap", label: "Analytics built into every match report" },
    ],
    overview:
      "Hiring automation platform that matches resumes to roles with generative AI, auto-drafts candidate emails, and turns skill data into recruiter-friendly insights.",
    features: [
      "AI resume matching with scoring & reasoning",
      "Automated email sequences for shortlisted candidates",
      "Skill-gap analytics dashboard for recruiters",
      "Next.js App Router + Neon serverless Postgres",
    ],
    challenges: [
      {
        title: "Messy, unstructured resumes",
        desc: "Resumes arrive as PDFs in every format imaginable. The ingestion step parses them into structured candidate data — skills, experience, contact details — before any matching happens.",
      },
      {
        title: "Matching recruiters can trust",
        desc: "A bare similarity score isn't enough to act on. The LLM layer returns a suitability rationale and a skill-gap report with every score, so recruiters see why a candidate fits — or doesn't.",
      },
      {
        title: "Outreach without the busywork",
        desc: "Shortlisted candidates get personalized email sequences drafted automatically from their profile and the role, turning hours of manual writing into a review-and-send step.",
      },
    ],
    responsibilities: [
      "Built the Next.js app and the Neon Postgres data model",
      "Designed the resume-parsing and semantic matching pipeline",
      "Integrated LLM scoring with explainable skill-gap reporting",
      "Built the automated candidate email sequences",
    ],
    architectureFlow: [
      {
        step: "Resume Ingestion",
        desc: "PDF parsing & structured metadata extraction",
      },
      {
        step: "Vector & Semantic Match",
        desc: "Embedding cosine similarity against job descriptions",
      },
      {
        step: "LLM Reasoning & Scoring",
        desc: "Candidate suitability rationale & skill gap report",
      },
      {
        step: "Automated Outreach",
        desc: "Auto-drafted personalized candidate email sequences",
      },
    ],
  },
  {
    repoName: "Job-Recuitment",
    title: "Upmatch — Job Recruitment",
    description:
      "Modern job portal with employer listings, candidate profiles, and application management.",
    tags: ["TypeScript", "React", "Next.js", "Tailwind"],
    liveLink: "https://job-recuitment.vercel.app",
    status: "live",
    gradient: "from-indigo-500 to-blue-600",
    emoji: "💼",
    image: "/projects/job-recruitment.webp",
    gallery: ["/projects/job-recruitment.webp", "/projects/job-recruitment-2.webp"],
    role: "Frontend Developer",
    year: "2024",
    type: "Job Portal",
    results: [
      { value: "2-sided", label: "Employers and candidates in one product" },
      { value: "End-to-end", label: "Post → apply → track in a single flow" },
      { value: "Responsive", label: "Full experience on mobile and desktop" },
    ],
    overview:
      "A modern job portal connecting employers and candidates — searchable listings, rich profiles, and a clean application pipeline end to end.",
    features: [
      "Employer-side job posting & listing management",
      "Candidate profiles with applied-jobs tracking",
      "Application status pipeline for recruiters",
      "Fully responsive UI with Tailwind design system",
    ],
    challenges: [
      {
        title: "Two audiences, one clean flow",
        desc: "Employers and candidates need opposite things from the same product. I split the experience into role-based views — posting and pipeline tools for employers, profiles and application tracking for candidates.",
      },
      {
        title: "Application chaos",
        desc: "Without structure, applications scatter across inboxes and get lost. A single status pipeline keeps every application in one place, with a visible stage for both sides.",
      },
    ],
    responsibilities: [
      "Built the frontend with React, Next.js and TypeScript",
      "Implemented employer listings and candidate profiles",
      "Built the application status tracking pipeline",
      "Delivered a fully responsive Tailwind design system",
    ],
    architectureFlow: [
      {
        step: "Job Listings",
        desc: "Employers post roles with requirements & details",
      },
      {
        step: "Search & Filter",
        desc: "Candidates find openings that match their profile",
      },
      {
        step: "Applications",
        desc: "Profile-based submissions in a few clicks",
      },
      {
        step: "Status Pipeline",
        desc: "Recruiters move candidates through hiring stages",
      },
    ],
  },
  {
    repoName: "Business-Help",
    title: "Business Help — AI Chat & Voice SaaS",
    description:
      "White-label AI chat & voice-call widget for businesses — Retell AI voice agents, Calendly booking and a multi-tenant admin.",
    tags: ["Next.js", "TypeScript", "Retell AI", "Prisma"],
    liveLink: "",
    status: "live",
    gradient: "from-cyan-500 to-blue-600",
    emoji: "💬",
    image: "/projects/business-help.webp",
    gallery: ["/projects/business-help.webp", "/projects/business-help-2.webp"],
    role: "Full Stack Developer",
    year: "2025",
    type: "Multi-tenant SaaS — AI Chat & Voice",
    results: [
      { value: "2", label: "Channels — AI chat & voice in one widget" },
      { value: "Multi-tenant", label: "Per-business branding, SMTP & admin" },
      { value: "Auto-booked", label: "Appointments synced via Calendly" },
    ],
    overview:
      "A white-label, multi-tenant SaaS that gives any business an AI chat + voice-call widget — visitors chat or talk to an AI agent that answers questions and books appointments, while owners manage everything from one admin panel.",
    features: [
      "AI voice + chat widget powered by Retell AI",
      "Calendly sync for automatic appointment booking",
      "Multi-tenant admin with per-business SMTP and branding",
      "Next.js API with Prisma and secure session handling",
    ],
    challenges: [
      {
        title: "One codebase, many businesses",
        desc: "Every tenant needs its own branding, email setup and data — with zero leakage between businesses. The multi-tenant architecture isolates each tenant's data, SMTP credentials and widget configuration.",
      },
      {
        title: "Voice that actually books",
        desc: "A voice agent that only chats is a demo. The Retell AI agent is wired into Calendly, so a conversation can end with a real appointment on the business's calendar.",
      },
      {
        title: "A widget that drops into any website",
        desc: "The chat + voice widget has to embed into arbitrary client sites without breaking their layout, so it ships as a self-contained embed with its own scoped styling and configuration.",
      },
    ],
    responsibilities: [
      "Architected the multi-tenant SaaS and its admin panel",
      "Integrated Retell AI voice and chat agents",
      "Wired Calendly appointment booking into the agent flow",
      "Built the Next.js API with Prisma and secure session handling",
    ],
    architectureFlow: [
      {
        step: "Widget Chat / Voice",
        desc: "Visitor chats or calls from the business website",
      },
      {
        step: "Retell AI Agent",
        desc: "Voice + chat agent answers and qualifies the lead",
      },
      {
        step: "Booking Sync",
        desc: "Calendly appointment booked in real time",
      },
      {
        step: "Tenant Admin",
        desc: "Business owner reviews leads, calls and bookings",
      },
    ],
  },
  {
    repoName: "events-agent-frontend",
    title: "Events Agent — AI Event Discovery",
    description:
      "AI agent that discovers events across the web — multi-source search, Claude verification & dedupe, enrichment and live-streamed results.",
    tags: ["React", "Claude AI", "SerpAPI", "PostgreSQL"],
    liveLink: "",
    status: "client-delivery",
    gradient: "from-violet-500 to-fuchsia-600",
    emoji: "🎟️",
    image: "/projects/events-agent.webp",
    role: "AI Engineer & Full Stack Developer",
    year: "2026",
    type: "Client Project — AI Agent",
    results: [
      { value: "3", label: "Search sources — SerpAPI, Tavily & PredictHQ" },
      { value: "Live", label: "Results stream in as events are verified" },
      { value: "AI-verified", label: "Every event checked & deduped by Claude" },
    ],
    overview:
      "An events discovery agent built for a client: it searches multiple sources city by city, verifies and deduplicates events with Claude, enriches them, and streams new finds live into the dashboard as they are confirmed.",
    features: [
      "Multi-source search — SerpAPI/Google, Tavily and PredictHQ",
      "Claude Haiku verification, dedupe and structured extraction",
      "Live streaming UI with real-time counters and NEW badges",
      "PostgreSQL upserts with per-category targeted search",
    ],
    challenges: [
      {
        title: "The same event, listed five different ways",
        desc: "Sources disagree on names, dates and venues, and duplicates flood the results. Claude Haiku verifies each candidate event, merges duplicates and extracts one clean, structured record.",
      },
      {
        title: "Search costs that scale with cities",
        desc: "Blanket searching burns API quota fast. Queries are targeted per city and per category, and results are upserted into PostgreSQL — nothing is fetched or stored twice.",
      },
      {
        title: "Making a long search feel instant",
        desc: "A full city scan takes time, so verified events stream into the UI as they're confirmed — live counters and NEW badges show real progress instead of a spinner.",
      },
    ],
    responsibilities: [
      "Built the multi-source discovery pipeline — SerpAPI, Tavily, PredictHQ",
      "Designed the Claude verification, dedupe and extraction flow",
      "Built the live-streaming React dashboard",
      "Modeled PostgreSQL upserts for clean, duplicate-free event data",
    ],
    architectureFlow: [
      {
        step: "Targeted Search",
        desc: "Per-city, per-category queries across search sources",
      },
      {
        step: "Claude Verify",
        desc: "Haiku verifies, dedupes and extracts clean JSON",
      },
      {
        step: "Enrichment",
        desc: "Tavily enrichment for venue, dates and details",
      },
      {
        step: "Live Dashboard",
        desc: "Streamed results saved to PostgreSQL in real time",
      },
    ],
  },
  {
    repoName: "abdullah-portfolio",
    title: "Portfolio Website",
    description:
      "Animated developer portfolio built with React 19, Vite, Tailwind CSS v4, and GSAP.",
    tags: ["React", "Tailwind CSS", "GSAP"],
    liveLink: "https://abdullah-asim-dev.vercel.app",
    status: "live",
    gradient: "from-indigo-500 to-fuchsia-500",
    emoji: "✨",
    image: "/projects/portfolio.webp",
    gallery: [
      "/projects/portfolio.webp",
      "/projects/portfolio-2.webp",
      "/projects/portfolio-3.webp",
      "/projects/portfolio-4.webp",
    ],
    role: "Design & Development",
    year: "2026",
    type: "Personal Portfolio — React SPA",
    results: [
      { value: "60fps", label: "Animation target on capable devices" },
      { value: "0", label: "External 3D assets — every scene is procedural" },
      { value: "13", label: "Sections on the home page, plus detail routes" },
    ],
    overview:
      "The site you're looking at — React 19 + Tailwind v4 portfolio with procedural Three.js scenes, scroll-driven storytelling, and low-end device fallbacks. Zero external 3D assets.",
    features: [
      "Procedural R3F scenes (particle core, planet, paper plane)",
      "Scroll-linked GSAP animations via Lenis smooth scroll",
      "60fps on capable devices, graceful fallbacks on low-end",
      "SEO-ready: JSON-LD, OG tags, agent metadata (webmcp)",
    ],
    challenges: [
      {
        title: "Cinematic motion that low-end phones survive",
        desc: "Heavy 3D and scroll animation can exclude half the audience. The site detects device capability and swaps in graceful fallbacks, keeping the experience smooth on every device.",
      },
      {
        title: "SEO on a JavaScript single-page app",
        desc: "Client-rendered pages are invisible to some crawlers and AI search engines. Key routes ship prerendered shells with per-page metadata, JSON-LD schema and a complete sitemap.",
      },
    ],
    responsibilities: [
      "Designed and built the entire site — React 19, Tailwind v4, GSAP",
      "Built procedural Three.js scenes with zero external assets",
      "Implemented device-aware performance fallbacks",
      "Set up SEO end to end — metadata, JSON-LD, sitemaps, prerendering",
    ],
  },
];

/* Case-study page slugs — /projects/<slug> */
/** @type {Record<string, string>} */
export const PROJECT_SLUGS = {
  "four-ai-ai-powered-voice-image-generation-platform": "four-ai",
  GENAI: "hiregen-ai",
  "Job-Recuitment": "upmatch",
  "Business-Help": "business-help",
  "events-agent-frontend": "events-agent",
  "abdullah-portfolio": "portfolio-website",
};

/** @param {{ repoName: string }} project */
export function projectSlug(project) {
  return PROJECT_SLUGS[project.repoName] ?? project.repoName;
}

/** @param {string} slug */
export function getFeaturedBySlug(slug) {
  return (
    featuredProjects.find((p) => projectSlug(p) === slug) ?? null
  );
}

export const GITHUB_USERNAME = "abdullahasim1";

/* Total repos (public + private) — GitHub ki public API private repos
   nahi dikhati, is liye ye number authenticated GitHub search se
   verify karke yahan rakha hai (32 total: 21 public + 11 private,
   verified 2026-11-03; Events wali dono repos usi din public hui).
   Nayi repo bane to number update karna. */
export const TOTAL_REPO_COUNT = 32;

/* Live URL overrides — GitHub repo `homepage` hamesha sach nahi hota:
   kuch deployments move/delete ho chuke hain lekin homepage purana
   pada hai. Yahan diya gaya URL (ya null = koi live deployment nahi)
   GitHub homepage par hamesha jeet-ta hai. Har entry live-verify
   shuda hai (2026-11-06):
   - GENAI: GitHub homepage (genai-orcin-sigma.vercel.app) 404 hai;
     asal live deployment hiregen-ai.vercel.app hai (HTTP 200).
   - Business-Help: GitHub homepage (business-help-phi.vercel.app)
     404 hai; live-verified deployment clone-bussiness-help hai (200).
   - Events Agent dono repos: deployments exist hi nahi karte (404),
     is liye null — koi "Live" button/status kahin render nahi hoga
     jab tak redeploy karke yahan asal URL na dala jaye. */
/** @type {Record<string, string | null>} */
export const LIVE_URL_OVERRIDES = {
  GENAI: "https://hiregen-ai.vercel.app",
  "Business-Help": "https://clone-bussiness-help.vercel.app",
  "events-agent-frontend": null,
  "events-agents-backend": null,
};

/**
 * Featured project ka asal live URL — override > data liveLink >
 * GitHub homepage. Status field se independent rakha hai taake
 * "Live & Public" sirf manually-set `status: "live"` se aye.
 * @param {{ repoName: string, liveLink?: string }} project
 * @param {{ homepage?: string } | null | undefined} repo
 */
export function resolveLiveLink(project, repo) {
  if (Object.prototype.hasOwnProperty.call(LIVE_URL_OVERRIDES, project.repoName)) {
    return LIVE_URL_OVERRIDES[project.repoName];
  }
  return project.liveLink || repo?.homepage || null;
}

/**
 * Repos-grid card ka live URL — override > GitHub homepage.
 * @param {{ name: string, homepage?: string }} repo
 */
export function repoLiveUrl(repo) {
  if (Object.prototype.hasOwnProperty.call(LIVE_URL_OVERRIDES, repo.name)) {
    return LIVE_URL_OVERRIDES[repo.name];
  }
  return repo.homepage || null;
}

/* Repos grid me SIRF ye repos, isi order me show hoti hain
   (Abdullah ki hidayat, 2026-11-03 — baqi sab hide). */
export const CURATED_REPOS = [
  "four-ai-ai-powered-voice-image-generation-platform",
  "Job-Recuitment",
  "GENAI",
  "abdullah-portfolio",
  "events-agent-frontend",
  "events-agents-backend",
];

/* Events repos ke GitHub par descriptions nahi hain — ye static
   descriptions unke cards par overlay hoti hain, aur API se repo na
   mile to pura card bhi isi data se banta hai (repos 2026-11-03 ko
   public hui; descriptions yahin se atay hain). */
export const STATIC_REPOS = {
  "events-agent-frontend": {
    id: "static-events-agent-frontend",
    name: "events-agent-frontend",
    html_url: "https://github.com/abdullahasim1/events-agent-frontend",
    description:
      "AI agent that discovers events across the web — multi-source search, Claude verification & dedupe, enrichment and live-streamed results.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-10-09T00:00:00Z",
    homepage: "",
  },
  "events-agents-backend": {
    id: "static-events-agents-backend",
    name: "events-agents-backend",
    html_url: "https://github.com/abdullahasim1/events-agents-backend",
    description:
      "Backend API for the Events Discovery Agent — multi-source event search (SerpAPI, Tavily, PredictHQ), Claude verification & dedupe, streamed to the frontend.",
    language: "JavaScript",
    stargazers_count: 0,
    forks_count: 0,
    pushed_at: "2026-10-11T00:00:00Z",
    homepage: "",
  },
};

export const languageColors = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  default: "#8b949e",
};

/**
 * @param {string} repoName
 */
export function githubOgImage(repoName) {
  return `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repoName}`;
}

/**
 * @param {string} dateString
 */
export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  if (!dateString || Number.isNaN(date.getTime())) return "Updated recently";
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 30) return `Updated ${diffDays} days ago`;
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? "Updated 1 month ago" : `Updated ${months} months ago`;
  }
  const years = Math.floor(diffDays / 365);
  return years === 1 ? "Updated 1 year ago" : `Updated ${years} years ago`;
}

/**
 * @param {string} name
 */
export function formatRepoName(name) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (/** @type {string} */ c) => c.toUpperCase());
}
