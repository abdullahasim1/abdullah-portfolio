/* Har route ka SEO meta — client-side apply + build-time prerender
   shells (scripts/prerender-shells.mjs) dono yahi se lete hain. */

export const SITE_URL = "https://abdullah-asim-dev.vercel.app";
export const SITE_NAME = "Abdullah Asim — Portfolio";
export const DEFAULT_TITLE =
  "Abdullah Bin Asim — AI Cloud Engineer & Full Stack Developer";
export const DEFAULT_DESCRIPTION =
  "Portfolio of Abdullah Bin Asim — AI Cloud Engineer & Full-Stack Developer building generative AI products, n8n/Make automation and AWS serverless systems.";

export const PAGE_META = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/about": {
    title: "About — Abdullah Bin Asim | AI Cloud Engineer",
    description:
      "About Abdullah Bin Asim — AI Cloud Engineer & Full-Stack Developer at Experts Cloud, Lahore. Generative AI on AWS Bedrock, automation and full-stack product development.",
  },
  "/skills": {
    title: "Tech Stack & Skills — Abdullah Bin Asim",
    description:
      "The tools and technologies Abdullah Bin Asim works with — React, Next.js, Node.js, TypeScript, AWS, Claude, OpenAI, n8n, Make.com and GoHighLevel.",
  },
  "/services": {
    title: "Services — n8n Developer & AI Automation Expert | Abdullah Bin Asim",
    description:
      "Hire a freelance n8n developer & AI automation expert — AI agents, n8n/Make.com workflow automation, GoHighLevel CRM and full-stack web apps, from wireframe to production.",
  },
  "/projects": {
    title: "Projects — My Recent Work | Abdullah Bin Asim",
    description:
      "Selected work designed, built and shipped by Abdullah Bin Asim — real products solving real problems: Four AI, HireGen AI, Upmatch, Business Help and the Events Agent.",
  },
  "/experience": {
    title: "Experience — My Journey | Abdullah Bin Asim",
    description:
      "From cloud engineering to AI-powered products — the experiences and credentials that shaped Abdullah Bin Asim's journey as an AI Cloud Engineer.",
  },
  "/certifications": {
    title: "Certifications — Credentials & Learning | Abdullah Bin Asim",
    description:
      "Professional certifications of Abdullah Bin Asim across AI, AWS and modern tech — including AWS Certified Generative AI Developer – Professional and Claude Certified Architect.",
  },
  "/process": {
    title: "How I Work — Process | Abdullah Bin Asim",
    description:
      "How Abdullah Bin Asim works — a clear, transparent process from discovery and wireframes to build, launch and support for AI and automation projects.",
  },
  "/blog": {
    title: "Blog & Articles | Abdullah Bin Asim",
    description:
      "Articles by Abdullah Bin Asim on AI agents, n8n automation, AWS generative AI and full-stack development — lessons from real shipped projects.",
  },
  "/faq": {
    title: "FAQ — Frequently Asked Questions | Abdullah Bin Asim",
    description:
      "Frequently asked questions about working with Abdullah Bin Asim — services, process, timelines and how projects get started.",
  },
  "/contact": {
    title: "Contact — Let's Work Together | Abdullah Bin Asim",
    description:
      "Get in touch with Abdullah Bin Asim for AI automation, n8n workflows, GoHighLevel systems and full-stack web development projects.",
  },
};

function setMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Client-side meta apply — route change par App se call hota hai.
    Detail pages (project/service/post) apne data se khud call karti hain. */
export function applyPageMeta({ title, description, path, type = "website", image }) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  if (title) document.title = title;
  setMeta("name", "description", description);
  setCanonical(url);
  setMeta("property", "og:type", type);
  setMeta("property", "og:url", url);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  if (image) setMeta("property", "og:image", image);
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  if (image) setMeta("name", "twitter:image", image);
}

export function metaForPath(path) {
  return PAGE_META[path] ?? null;
}
