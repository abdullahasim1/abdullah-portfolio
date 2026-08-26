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
    image: "/projects/four-ai.jpg",
    role: "Full Stack Developer",
    year: "2024",
    overview:
      "A browser-based AI studio that bundles text-to-speech, text-to-image and voice-effect tools behind one polished interface — no installs, no setup, straight from the tab.",
    features: [
      "Text-to-Speech & Text-to-Image pipelines powered by AI APIs",
      "Voice-effects engine with real-time preview",
      "Secure Node.js API layer with MySQL usage tracking",
      "GSAP-driven micro-interactions across the UI",
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
    image: "/projects/genai.jpg",
    role: "Full Stack Developer & AI Integrator",
    year: "2025",
    overview:
      "Hiring automation platform that matches resumes to roles with generative AI, auto-drafts candidate emails, and turns skill data into recruiter-friendly insights.",
    features: [
      "AI resume matching with scoring & reasoning",
      "Automated email sequences for shortlisted candidates",
      "Skill-gap analytics dashboard for recruiters",
      "Next.js App Router + Neon serverless Postgres",
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
    image: "/projects/job-recruitment.jpg",
    role: "Frontend Developer",
    year: "2024",
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
    repoName: "food-order-project",
    title: "Food Ordering System",
    description:
      "Full-stack food ordering app with cart management, meal listings, and a polished React UI.",
    tags: ["React", "Node.js", "MySQL", "Express"],
    liveLink: "https://food-order-project.vercel.app",
    gradient: "from-orange-500 to-red-500",
    emoji: "🍔",
    image: "/projects/food-order.jpg",
    role: "Full Stack Developer",
    year: "2023",
    overview:
      "Full-stack food ordering flow — browse the menu, build a cart, place the order, and track it — backed by an Express + MySQL REST API.",
    features: [
      "Cart management with quantity & pricing logic",
      "Category-based meal listings with search",
      "Order placement & history per user",
      "Express REST API with MySQL persistence",
    ],
  },
  {
    repoName: "HomeServices",
    title: "Home Services App",
    description:
      "Service booking platform for finding home repair and service providers near you.",
    tags: ["HTML", "CSS", "JavaScript"],
    liveLink: "https://home-services-tau.vercel.app",
    gradient: "from-emerald-500 to-teal-600",
    emoji: "🏠",
    image: "/projects/home-services.jpg",
    role: "Web Developer",
    year: "2023",
    overview:
      "Booking platform that connects homeowners with trusted repair and maintenance providers — find a service, compare providers, book in minutes.",
    features: [
      "Provider discovery by service category",
      "Simple multi-step booking flow",
      "Lightweight vanilla-JS build — instant loads",
      "Mobile-first responsive layout",
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
    image: "/projects/portfolio.jpg",
    role: "Design & Development",
    year: "2026",
    overview:
      "The site you're looking at — React 19 + Tailwind v4 portfolio with procedural Three.js scenes, scroll-driven storytelling, and low-end device fallbacks. Zero external 3D assets.",
    features: [
      "Procedural R3F scenes (laptop, planet, paper plane)",
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

export function githubOgImage(repoName) {
  return `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repoName}`;
}

export function formatRelativeDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return "Updated today";
  if (diffDays === 1) return "Updated yesterday";
  if (diffDays < 30) return `Updated ${diffDays} days ago`;
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)} months ago`;
  return `Updated ${Math.floor(diffDays / 365)} years ago`;
}

export function formatRepoName(name) {
  return name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getProjectImage(project) {
  return project.image || githubOgImage(project.repoName);
}
