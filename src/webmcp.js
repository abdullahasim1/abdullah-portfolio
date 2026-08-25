import { featuredProjects } from "./data/projects";

// WebMCP (navigator.modelContext) — AI agents ko browser ke zariye
// portfolio ke key actions expose karta hai.
const SITE = "https://abdullah-asim-dev.vercel.app";

const profile = {
  name: "Abdullah Bin Asim",
  title: "Full Stack Developer & AI Builder",
  bio: "Results-driven developer & designer building full-stack web apps and AI-powered automation. AWS Generative AI certified.",
  stack: [
    "React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "GSAP",
    "Three.js", "Claude & AI Agents", "GoHighLevel", "Make.com", "n8n", "AWS",
  ],
  highlights: {
    yearsExperience: "3+",
    projectsDone: "25+",
    technologies: "15+",
  },
  email: "abdullah.gc.18@gmail.com",
  github: "https://github.com/abdullahasim1",
  website: SITE,
};

const projects = featuredProjects.map((p) => ({
  title: p.title,
  description: p.description,
  tags: p.tags,
  liveUrl: p.liveLink,
  repoUrl: `https://github.com/abdullahasim1/${p.repoName}`,
}));

const tools = [
  {
    name: "get_portfolio_profile",
    description:
      "Get Abdullah Bin Asim's profile: role, bio, tech stack, highlights and contact info.",
    inputSchema: { type: "object", properties: {}, required: [] },
    execute: async () => profile,
  },
  {
    name: "list_projects",
    description: "List Abdullah's featured projects with descriptions, tags, live demo and repo URLs.",
    inputSchema: {
      type: "object",
      properties: {
        limit: {
          type: "integer",
          description: "Max number of projects to return (default: all).",
        },
      },
      required: [],
    },
    execute: async ({ limit } = {}) =>
      typeof limit === "number" ? projects.slice(0, limit) : projects,
  },
  {
    name: "get_contact_info",
    description: "Get contact details: email, GitHub and portfolio URL.",
    inputSchema: { type: "object", properties: {}, required: [] },
    execute: async () => ({
      email: profile.email,
      github: profile.github,
      website: profile.website,
    }),
  },
];

export function initWebMCP() {
  if (typeof window === "undefined") return;
  const mc = window.navigator?.modelContext;
  if (!mc || typeof mc.provideContext !== "function") return;
  try {
    mc.provideContext(tools);
  } catch {
    // WebMCP unsupported / permission denied — silently ignore
  }
}
