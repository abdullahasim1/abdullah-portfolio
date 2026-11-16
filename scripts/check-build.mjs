#!/usr/bin/env node
/**
 * Build-output guard — `npm run build` ke baad chalta hai (CI + local).
 * Prerender shells, schema graph, sitemap aur llms files ko verify karta
 * hai taake SEO/AEO regressions deploy se pehle pakri jayen.
 *
 * Usage: node scripts/check-build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { PAGE_META } from "../src/lib/pageMeta.js";
import { featuredProjects, projectSlug } from "../src/data/projects.js";
import { posts } from "../src/data/posts.gen.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const SITE_URL = "https://abdullah-asim-dev.vercel.app";

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`✗ ${msg}`);
};
const ok = (msg) => console.log(`✓ ${msg}`);

function read(rel) {
  const file = path.join(DIST, rel);
  if (!fs.existsSync(file)) {
    fail(`missing build file: dist/${rel}`);
    return null;
  }
  return fs.readFileSync(file, "utf8");
}

function ldNodes(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((m) => {
      try {
        return JSON.parse(m[1]);
      } catch {
        fail("invalid JSON-LD block");
        return null;
      }
    })
    .filter(Boolean);
}

/* 1. Har route ka shell + meta */
if (!fs.existsSync(path.join(DIST, "index.html"))) {
  fail("dist/index.html missing — build ke baad chalao");
  process.exit(1);
}

const checks = [
  { rel: "index.html", url: `${SITE_URL}/`, meta: PAGE_META["/"] },
  ...Object.entries(PAGE_META)
    .filter(([route]) => route !== "/")
    .map(([route, meta]) => ({
      rel: `${route.slice(1)}/index.html`,
      url: `${SITE_URL}${route}`,
      meta,
    })),
  ...featuredProjects.map((p) => ({
    rel: `projects/${projectSlug(p)}/index.html`,
    url: `${SITE_URL}/projects/${projectSlug(p)}`,
  })),
  ...posts.map((p) => ({
    rel: `blog/${p.slug}/index.html`,
    url: `${SITE_URL}/blog/${p.slug}`,
  })),
];

for (const check of checks) {
  const html = read(check.rel);
  if (!html) continue;
  if (!html.includes(`<link rel="canonical" href="${check.url}"`)) {
    fail(`${check.rel}: canonical ${check.url} missing`);
  }
  if (!html.includes("<h1")) fail(`${check.rel}: no h1 (expected noscript fallback/static h1)`);
  const nodes = ldNodes(html);
  if (nodes.length === 0) fail(`${check.rel}: no JSON-LD`);
  const ids = new Set();
  const refs = [];
  const walk = (value) => {
    if (Array.isArray(value)) return value.forEach(walk);
    if (!value || typeof value !== "object") return;
    if (value["@id"] && value["@type"]) ids.add(value["@id"]);
    else if (value["@id"]) refs.push(value["@id"]);
    Object.values(value).forEach(walk);
  };
  nodes.forEach(walk);
  const unresolved = [...new Set(refs)].filter((id) => !ids.has(id));
  if (unresolved.length) {
    fail(`${check.rel}: unresolved @id refs → ${unresolved.join(", ")}`);
  }
}
ok(`${checks.length} route shells checked (canonical, h1, JSON-LD graph)`);

/* 2. Home ka no-JS fallback */
const home = fs.readFileSync(path.join(DIST, "index.html"), "utf8");
if (!/<noscript>[\s\S]*Bedrock[\s\S]*<\/noscript>/.test(home)) {
  fail("home: noscript fallback content missing");
} else {
  ok("home: no-JS fallback present");
}

/* 3. Sitemap URLs sab build output mein maujood hon */
const sitemap = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const loc of locs) {
  const relPath = loc.replace(`${SITE_URL}/`, "").replace(/\/$/, "");
  const candidates = relPath
    ? [path.join(DIST, relPath, "index.html"), path.join(DIST, relPath)]
    : [path.join(DIST, "index.html")];
  if (!candidates.some((candidate) => fs.existsSync(candidate))) {
    fail(`sitemap URL has no build file: ${loc}`);
  }
}
ok(`sitemap: ${locs.length} URLs resolve to build files`);

/* 4. Agent files saare posts + projects cover karein */
for (const rel of ["llms.txt", "llms-full.txt", "index.md"]) {
  const text = fs.readFileSync(path.join(DIST, rel), "utf8");
  for (const post of posts) {
    if (!text.includes(`/blog/${post.slug}`)) {
      fail(`${rel}: missing post /blog/${post.slug}`);
    }
  }
}
ok("llms.txt / llms-full.txt / index.md list every post");

/* 5. Deleted routes ka shell na bache */
for (const stale of ["about", "skills", "services", "experience", "contact"]) {
  if (fs.existsSync(path.join(DIST, stale, "index.html"))) {
    fail(`stale shell still built: /${stale}`);
  }
}

if (failures > 0) {
  console.error(`\ncheck-build: ${failures} failure(s)`);
  process.exit(1);
}
console.log("\ncheck-build: all checks passed");
