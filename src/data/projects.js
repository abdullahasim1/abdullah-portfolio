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
