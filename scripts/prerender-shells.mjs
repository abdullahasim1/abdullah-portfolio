#!/usr/bin/env node
/**
 * Prerender shells — `vite build` ke baad chalta hai.
 * Har route ke liye dist/<route>/index.html banata hai: wahi app,
 * lekin route ke apne <title>, description, canonical aur OG meta ke
 * sath — taake crawlers aur social shares ko JS chalaye baghair sahi
 * meta mile. Blog posts is mein NAHI hain (un ki full static pages
 * build-content.mjs pehle se banata hai).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PAGE_META, SITE_URL } from "../src/lib/pageMeta.js";
import { featuredProjects, PROJECT_SLUGS } from "../src/data/projects.js";
import { services } from "../src/data/services.js";

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
  let html = baseHtml;
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

const routes = [];

/* Static pages — pageMeta.js se */
for (const [routePath, meta] of Object.entries(PAGE_META)) {
  if (routePath === "/") continue;
  routes.push({ path: routePath, title: meta.title, description: meta.description });
}

/* Project case studies */
for (const p of featuredProjects) {
  const slug = PROJECT_SLUGS[p.repoName] ?? p.repoName;
  routes.push({
    path: `/projects/${slug}`,
    title: `${p.title} — Case Study | Abdullah Bin Asim`,
    description: p.overview || p.description,
    type: "article",
    image: p.image ? `${SITE_URL}${p.image}` : undefined,
  });
}

/* Service detail pages */
for (const s of services) {
  routes.push({
    path: `/services/${s.slug}`,
    title: `${s.title} — Services | Abdullah Bin Asim`,
    description: s.short,
  });
}

let written = 0;
for (const route of routes) {
  const dir = path.join(DIST, route.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), shellFor(route));
  written++;
}

console.log(`prerender-shells: ${written} route shell(s) written`);
