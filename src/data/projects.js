// @ts-check
/* NOTE: Har project mein `results` array (optional) — case-study modal mein
   "Results & Impact" section dikhata hai. REAL numbers bharein, e.g.:
   results: [
     { value: "10k+", label: "Monthly active users" },
     { value: "-45%", label: "Load time vs previous build" },
   ] */

export const featuredProjects = [
  {
    repoName: "four-ai-ai-powered-voice-image-generation-platform",
    title: "Four-AI Platform",
    description:
      "AI-powered web app with Text-to-Speech, Text-to-Image, and voice effects built with React and Node.js.",
    tags: ["React", "GSAP", "Node.js", "MySQL"],
    liveLink: "https://four-ai-dev.vercel.app",
    gradient: "from-violet-500 to-purple-600",
    emoji: "🤖",
    image: "/projects/four-ai.webp",
    role: "Full Stack Developer",
    year: "2024",
    results: [],
    overview:
      "A browser-based AI studio that bundles text-to-speech, text-to-image and voice-effect tools behind one polished interface — no installs, no setup, straight from the tab.",
    features: [
      "Text-to-Speech & Text-to-Image pipelines powered by AI APIs",
      "Voice-effects engine with real-time preview",
      "Secure Node.js API layer with MySQL usage tracking",
      "GSAP-driven micro-interactions across the UI",
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
    gradient: "from-sky-500 to-blue-600",
    emoji: "✨",
    image: "/projects/genai.webp",
    role: "Full Stack Developer & AI Integrator",
    year: "2025",
    results: [],
    overview:
      "Hiring automation platform that matches resumes to roles with generative AI, auto-drafts candidate emails, and turns skill data into recruiter-friendly insights.",
    features: [
      "AI resume matching with scoring & reasoning",
      "Automated email sequences for shortlisted candidates",
      "Skill-gap analytics dashboard for recruiters",
      "Next.js App Router + Neon serverless Postgres",
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
    gradient: "from-indigo-500 to-blue-600",
    emoji: "💼",
    image: "/projects/job-recruitment.webp",
    role: "Frontend Developer",
    year: "2024",
    results: [],
    overview:
      "A modern job portal connecting employers and candidates — searchable listings, rich profiles, and a clean application pipeline end to end.",
    features: [
      "Employer-side job posting & listing management",
      "Candidate profiles with applied-jobs tracking",
      "Application status pipeline for recruiters",
      "Fully responsive UI with Tailwind design system",
    ],
  },
  {
    repoName: "Business-Help",
    title: "Business Help — AI Chat & Voice SaaS",
    description:
      "White-label AI chat & voice-call widget for businesses — Retell AI voice agents, Calendly booking and a multi-tenant admin.",
    tags: ["Next.js", "TypeScript", "Retell AI", "Prisma"],
    liveLink: "",
    gradient: "from-cyan-500 to-blue-600",
    emoji: "💬",
    image: "/projects/business-help.webp",
    role: "Full Stack Developer",
    year: "2025",
    results: [],
    overview:
      "A white-label, multi-tenant SaaS that gives any business an AI chat + voice-call widget — visitors chat or talk to an AI agent that answers questions and books appointments, while owners manage everything from one admin panel.",
    features: [
      "AI voice + chat widget powered by Retell AI",
      "Calendly sync for automatic appointment booking",
      "Multi-tenant admin with per-business SMTP and branding",
      "Next.js API with Prisma and secure session handling",
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
    gradient: "from-violet-500 to-fuchsia-600",
    emoji: "🎟️",
    image: "/projects/events-agent.webp",
    role: "AI Engineer & Full Stack Developer",
    year: "2026",
    results: [],
    overview:
      "An events discovery agent built for a client: it searches multiple sources city by city, verifies and deduplicates events with Claude, enriches them, and streams new finds live into the dashboard as they are confirmed.",
    features: [
      "Multi-source search — SerpAPI/Google, Tavily and PredictHQ",
      "Claude Haiku verification, dedupe and structured extraction",
      "Live streaming UI with real-time counters and NEW badges",
      "PostgreSQL upserts with per-category targeted search",
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
    gradient: "from-indigo-500 to-fuchsia-500",
    emoji: "✨",
    image: "/projects/portfolio.webp",
    role: "Design & Development",
    year: "2026",
    results: [],
    overview:
      "The site you're looking at — React 19 + Tailwind v4 portfolio with procedural Three.js scenes, scroll-driven storytelling, and low-end device fallbacks. Zero external 3D assets.",
    features: [
      "Procedural R3F scenes (particle core, planet, paper plane)",
      "Scroll-linked GSAP animations via Lenis smooth scroll",
      "60fps on capable devices, graceful fallbacks on low-end",
      "SEO-ready: JSON-LD, OG tags, agent metadata (webmcp)",
    ],
  },
];

export const GITHUB_USERNAME = "abdullahasim1";

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
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
  return `Updated ${Math.floor(diffDays / 365)} years ago`;
}

/**
 * @param {string} name
 */
export function formatRepoName(name) {
  return name.replace(/-/g, " ").replace(/\b\w/g, (/** @type {string} */ c) => c.toUpperCase());
}
