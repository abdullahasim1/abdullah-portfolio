#!/usr/bin/env node
/**
 * Prerender shells — `vite build` ke baad chalta hai.
 * Har route ke liye dist/<route>/index.html banata hai: wahi app,
 * lekin route ke apne <title>, description, canonical aur OG meta ke
 * sath — taake crawlers aur social shares ko JS chalaye baghair sahi
 * meta mile. Blog posts is mein NAHI hain (un ki full static pages
 * build-content.mjs pehle se banata hai).
 *
 * Route-specific JSON-LD (SEO fix, 2026-11-13): pehle har shell mein
 * index.html ka POORA schema bundle (Person + ProfilePage + WebSite
 * + FAQ + Blog + saare SoftwareSourceCode) dump hota tha. Ab har
 * route sirf apne nodes rakhta hai:
 *   /                  → Person + ProfilePage + WebSite + FAQPage
 *   /projects          → ItemList (featured projects) + BreadcrumbList
 *   /projects/<slug>   → us project ka SoftwareSourceCode (ya
 *                        CreativeWork fallback) + BreadcrumbList
 *   /certifications    → ItemList (saari credentials) + BreadcrumbList
 *   /blog              → Blog + ItemList (posts) + BreadcrumbList
 * Builders src/lib/routeSchema.js mein hain (unit-tested); base
 * blocks (Person/FAQ/Blog/code) content se classify hote hain.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PAGE_META, SITE_URL } from "../src/lib/pageMeta.js";
import { featuredProjects, projectSlug } from "../src/data/projects.js";
import {
  breadcrumbList,
  projectsItemList,
  certificationsItemList,
  blogItemList,
  projectWorkNode,
} from "../src/lib/routeSchema.js";
import { posts } from "../src/data/posts.gen.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const distIndex = path.join(DIST, "index.html");

if (!fs.existsSync(distIndex)) {
  console.error("prerender-shells: dist/index.html missing — run after vite build");
  process.exit(1);
}

const baseHtml = fs.readFileSync(distIndex, "utf8");

function esc(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function setTitle(html, title) {
  return html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
}

function setMetaContent(html, selector, value) {
  const re = new RegExp(`<meta[^>]*${selector}[^>]*>`, "s");
  return html.replace(re, (tag) =>
    tag.replace(/content="[^"]*"/, `content="${esc(value)}"`),
  );
}

function setCanonical(html, url) {
  return html.replace(
    /(<link[^>]*rel="canonical"[^>]*href=")[^"]*(")/s,
    `$1${url}$2`,
  );
}

function shellFor({ title, description, path: routePath, type, image }) {
  const url = `${SITE_URL}${routePath}`;
  let html = baseNoLd;
  html = setTitle(html, title);
  html = setMetaContent(html, 'name="description"', description);
  html = setCanonical(html, url);
  html = setMetaContent(html, 'property="og:url"', url);
  html = setMetaContent(html, 'property="og:title"', title);
  html = setMetaContent(html, 'property="og:description"', description);
  if (type) html = setMetaContent(html, 'property="og:type"', type);
  if (image) html = setMetaContent(html, 'property="og:image"', image);
  html = setMetaContent(html, 'name="twitter:title"', title);
  html = setMetaContent(html, 'name="twitter:description"', description);
  if (image) html = setMetaContent(html, 'name="twitter:image"', image);
  return html;
}

/* ---------- Route-specific JSON-LD composition ---------- */

const LD_RE = /<script type="application\/ld\+json">[\s\S]*?<\/script>/g;

/** Base JSON-LD block ko us ke content se classify karo. */
function classifyLd(json) {
  const type = json?.["@type"];
  if (type === "Person") return "person";
  if (type === "ProfilePage") return "profile";
  if (type === "WebSite") return "website";
  if (type === "FAQPage") return "faq";
  if (type === "Blog") return "blog";
  if (type === "SoftwareSourceCode") {
    const repo = String(json.codeRepository || "").split("/").pop();
    const project = featuredProjects.find((p) => p.repoName === repo);
    return project ? `code:${projectSlug(project)}` : "other";
  }
  return "other";
}

/* baseHtml se saare ld+json blocks nikaal kar classify karo —
   stripped html har shell ki bunyaad hai, blocks per-route wapas
   rakhe jate hain. Parse na honay wala block "other" hai (kabhi
   drop nahi hota: har route ki keep-list mein shamil hai). */
function extractLd(html) {
  const blocks = [];
  const stripped = html.replace(LD_RE, (raw) => {
    let key = "other";
    try {
      key = classifyLd(
        JSON.parse(raw.replace(/<script[^>]*>/, "").replace(/<\/script>/, "")),
      );
    } catch {
      key = "other";
    }
    blocks.push({ key, raw });
    return "";
  });
  return { stripped, blocks };
}

const { stripped: baseNoLd, blocks: baseBlocks } = extractLd(baseHtml);

function ldScript(node) {
  return `    <script type="application/ld+json">\n      ${JSON.stringify(node, null, 2).replace(/\n/g, "\n      ")}\n    </script>`;
}

/* Rakhay gaye base blocks (asal order mein) + naye nodes </head>
   se pehle insert karo. */
function insertLd(html, keep, extra) {
  const kept = baseBlocks
    .filter((b) => keep.includes(b.key))
    .map((b) => b.raw.trim());
  const parts = [...kept, ...extra.map(ldScript)];
  if (!parts.length) return html;
  return html.replace("</head>", `${parts.join("\n")}\n  </head>`);
}

const routes = [];

/* Static pages — pageMeta.js se */
for (const [routePath, meta] of Object.entries(PAGE_META)) {
  if (routePath === "/") continue;
  const route = { path: routePath, title: meta.title, description: meta.description, keep: ["other"], extra: [] };
  if (routePath === "/projects") {
    route.extra = [
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
      projectsItemList(),
    ];
  } else if (routePath === "/certifications") {
    route.extra = [
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Certifications", path: "/certifications" },
      ]),
      certificationsItemList(),
    ];
  } else if (routePath === "/blog") {
    route.keep = ["blog", "other"];
    route.extra = [
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
      blogItemList(posts),
    ];
  }
  routes.push(route);
}

/* Project case studies */
for (const p of featuredProjects) {
  const slug = projectSlug(p);
  const hasCode = baseBlocks.some((b) => b.key === `code:${slug}`);
  routes.push({
    path: `/projects/${slug}`,
    title: `${p.title} — Case Study | Abdullah Bin Asim`,
    description: p.overview || p.description,
    type: "article",
    image: p.image ? `${SITE_URL}${p.image}` : undefined,
    keep: [`code:${slug}`, "other"],
    extra: [
      ...(hasCode ? [] : [projectWorkNode(p)]),
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: p.title, path: `/projects/${slug}` },
      ]),
    ],
  });
}

/* Service detail pages khatam (2026-11-13, one-pager) — un ke
   shells ab generate nahi hote. */

/* Home shell (dist/index.html khud): sirf home ke nodes —
   Person + ProfilePage + WebSite + FAQPage. */
fs.writeFileSync(
  distIndex,
  insertLd(baseNoLd, ["person", "profile", "website", "faq", "other"], []),
);

let written = 0;
for (const route of routes) {
  const dir = path.join(DIST, route.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    insertLd(shellFor(route), route.keep, route.extra),
  );
  written++;
}

console.log(`prerender-shells: ${written} route shell(s) written`);
