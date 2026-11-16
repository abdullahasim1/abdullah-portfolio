// @ts-check
import { services } from "../data/services.js";
/* Har route ka SEO meta — client-side apply + build-time prerender
   shells (scripts/prerender-shells.mjs) dono yahi se lete hain. */

export const SITE_URL = "https://abdullah-asim-dev.vercel.app";
export const SITE_NAME = "Abdullah Asim — Portfolio";
export const DEFAULT_TITLE =
  "Abdullah Bin Asim — AI Cloud Engineer, Lahore, Pakistan";
export const DEFAULT_DESCRIPTION =
  "AI Cloud Engineer at Experts Cloud in Lahore, Pakistan — AWS Generative AI Professional & Claude Certified Architect. Bedrock, RAG, serverless and n8n automation.";

/** @type {Record<string, { title: string, description: string }>} */
/* One-pager (2026-11-13): sirf asal pages ki meta — About / Skills /
   Services / Experience / Contact ab home ke sections hain, un ki
   meta home wali hi hai. */
export const PAGE_META = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
  "/projects": {
    title: "Projects — AI & Automation Case Studies | Abdullah Bin Asim",
    description:
      "Case studies and open-source work by Abdullah Bin Asim — AI products, n8n automation and full-stack apps built in Lahore, Pakistan.",
  },
  "/certifications": {
    title: "Certifications — AWS, Anthropic & OpenAI | Abdullah Bin Asim",
    description:
      "27 AWS, Anthropic and OpenAI certifications held by Abdullah Bin Asim — AWS Generative AI Developer Professional and Claude Certified Architect.",
  },
  "/services": {
    title: "Services — AI Automation, AWS & Full-Stack | Abdullah Bin Asim",
    description:
      "Five focused services by Abdullah Bin Asim: AI automation, AWS GenAI, full-stack web apps, AI product development and workflow automation. Fixed quotes.",
  },
  "/blog": {
    title: "Blog — AI Engineering, AWS & Automation | Abdullah Bin Asim",
    description:
      "Articles on AI engineering, n8n automation, AWS and web performance by Abdullah Bin Asim, an AI Cloud Engineer in Lahore, Pakistan.",
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

/* Service landing pages — data/services.js se meta, taake title/
   description service copy ke sath drift na karein. */
for (const service of services) {
  PAGE_META[`/services/${service.slug}`] = {
    title: `${service.title} — Abdullah Bin Asim`,
    description: `${service.short} Freelance service by Abdullah Bin Asim, AI Cloud Engineer in Lahore, Pakistan.`,
  };
}
