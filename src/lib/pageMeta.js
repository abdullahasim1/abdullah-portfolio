// @ts-check
/* Har route ka SEO meta — client-side apply + build-time prerender
   shells (scripts/prerender-shells.mjs) dono yahi se lete hain. */

export const SITE_URL = "https://abdullah-asim-dev.vercel.app";
export const SITE_NAME = "Abdullah Asim — Portfolio";
export const DEFAULT_TITLE =
  "Abdullah Bin Asim — AI Cloud Engineer & Full Stack Developer";
export const DEFAULT_DESCRIPTION =
  "Portfolio of Abdullah Bin Asim — AI Cloud Engineer & Full-Stack Developer building generative AI products, n8n/Make automation and AWS serverless systems.";

/** @type {Record<string, { title: string, description: string }>} */
export const PAGE_META = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/about": {
    title: "About — Abdullah Bin Asim | AI Cloud Engineer",
    description:
      "About Abdullah Bin Asim — AI Cloud Engineer & Full-Stack Developer at Experts Cloud, Lahore, building generative AI products, automation and AWS serverless systems.",
  },
  "/skills": {
    title: "Skills & Technologies — Abdullah Bin Asim",
    description:
      "The tech stack Abdullah Bin Asim works with — React, Next.js, Node.js, TypeScript, AWS, Claude, OpenAI, n8n, Make.com and GoHighLevel.",
  },
  "/services": {
    title: "Services — AI, Automation & Web Development | Abdullah Bin Asim",
    description:
      "Services by Abdullah Bin Asim: full-stack web development, generative AI integration, AWS cloud & serverless, AI product development and workflow automation — plus a project estimator.",
  },
  "/projects": {
    title: "Projects — Abdullah Bin Asim",
    description:
      "Selected projects and open-source work by Abdullah Bin Asim — AI products, automation platforms and web apps, with full case studies and GitHub repositories.",
  },
  "/experience": {
    title: "Experience — Abdullah Bin Asim",
    description:
      "Professional journey of Abdullah Bin Asim — AI Cloud Engineer at Experts Cloud (since Oct 2025), previously Cloud Engineer Intern at Gen Clouds, Lahore.",
  },
  "/certifications": {
    title: "Certifications — Abdullah Bin Asim",
    description:
      "27 certifications and credentials held by Abdullah Bin Asim across AWS, Anthropic and OpenAI — including AWS Generative AI Developer Professional and Claude Certified Architect.",
  },
  "/blog": {
    title: "Blog — Abdullah Bin Asim",
    description:
      "Articles by Abdullah Bin Asim on AI engineering, automation, AWS and web performance.",
  },
  "/contact": {
    title: "Contact — Abdullah Bin Asim",
    description:
      "Get in touch with Abdullah Bin Asim for AI, automation and web development projects — he is available for new projects and usually replies within a few hours.",
  },
};

/**
 * @param {string} attr
 * @param {string} key
 * @param {string | undefined | null} content
 */
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

/** @param {string} href */
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
/**
 * @param {{ title?: string, description?: string, path: string, type?: string, image?: string }} meta
 */
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

/** @param {string} path */
export function metaForPath(path) {
  return PAGE_META[path] ?? null;
}
