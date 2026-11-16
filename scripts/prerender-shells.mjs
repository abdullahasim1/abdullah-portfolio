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
import { Writable } from "node:stream";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { createServer } from "vite";

import { PAGE_META, SITE_URL } from "../src/lib/pageMeta.js";
import { featuredProjects, projectSlug } from "../src/data/projects.js";
import { services } from "../src/data/services.js";
import {
  breadcrumbList,
  projectsItemList,
  certificationsItemList,
  blogItemList,
  projectWorkNode,
  personNode,
  publisherNode,
  serviceNode,
  serviceFaqNode,
  servicesItemList,
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

/* SERP description limit — word boundary par trim, warna Google khud
   beech se kaat deta hai. */
function truncate(value, max = 158) {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const trimmed = (lastSpace > 80 ? cut.slice(0, lastSpace) : cut).trim();
  return `${trimmed}…`;
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

function shellFor({
  title,
  description,
  path: routePath,
  type,
  image,
  imageWidth,
  imageHeight,
  imageAlt,
}) {
  const url = `${SITE_URL}${routePath}`;
  let html = baseNoLd;
  html = setTitle(html, title);
  html = setMetaContent(html, 'name="description"', truncate(description));
  html = setCanonical(html, url);
  html = setMetaContent(html, 'property="og:url"', url);
  html = setMetaContent(html, 'property="og:title"', title);
  html = setMetaContent(html, 'property="og:description"', truncate(description));
  if (type) html = setMetaContent(html, 'property="og:type"', type);
  if (image) {
    html = setMetaContent(html, 'property="og:image"', image);
    html = setMetaContent(html, 'name="twitter:image"', image);
    if (imageWidth) {
      html = setMetaContent(html, 'property="og:image:width"', String(imageWidth));
    }
    if (imageHeight) {
      html = setMetaContent(html, 'property="og:image:height"', String(imageHeight));
    }
    const alt = imageAlt || title;
    html = setMetaContent(html, 'property="og:image:alt"', alt);
    html = setMetaContent(html, 'name="twitter:image:alt"', alt);
  }
  html = setMetaContent(html, 'name="twitter:title"', title);
  html = setMetaContent(html, 'name="twitter:description"', truncate(description));
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

/* ---- Full body prerender (SSG) ------------------------------------
   Sirf <head> ka meta nahi — poora React tree server par render hota
   hai aur #root ke andar likha jata hai. Is se GPTBot/ClaudeBot jaise
   non-JS crawlers ko real content milta hai aur first paint JS ka
   intezar nahi karta. Client createRoot se ise replace karta hai. */
function renderOne(App, routePath) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const timer = setTimeout(() => {
      reject(new Error(`prerender body timeout: ${routePath}`));
    }, 30000);
    const stream = renderToPipeableStream(
      React.createElement(App, { initialPath: routePath }),
      {
        onAllReady() {
          const out = new Writable({
            write(chunk, _enc, done) {
              chunks.push(chunk);
              done();
            },
            final(done) {
              clearTimeout(timer);
              resolve(Buffer.concat(chunks).toString("utf8"));
              done();
            },
          });
          stream.pipe(out);
        },
        onShellError(error) {
          clearTimeout(timer);
          reject(error);
        },
        onError(error) {
          /* Recoverable Suspense errors — onAllReady decide karega. */
          console.warn(`prerender warning (${routePath}):`, error.message);
        },
      },
    );
  });
}

async function renderBodies(paths) {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: "error",
  });
  try {
    const { default: App } = await vite.ssrLoadModule("/src/App.jsx");
    const bodies = {};
    for (const routePath of paths) {
      bodies[routePath] = await renderOne(App, routePath);
    }
    return bodies;
  } finally {
    await vite.close();
  }
}

function injectBody(html, body) {
  if (!body) throw new Error("prerender body is empty");
  const marker = '<div id="root"></div>';
  if (!html.includes(marker)) {
    throw new Error("prerender: #root marker missing");
  }
  return html.replace(marker, `<div id="root">${body}</div>`);
}

const routes = [];

/* Static pages — pageMeta.js se */
for (const [routePath, meta] of Object.entries(PAGE_META)) {
  if (routePath === "/") continue;
  const route = { path: routePath, title: meta.title, description: meta.description, keep: ["other"], extra: [personNode()] };
  if (routePath === "/projects") {
    route.extra = [
      personNode(),
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
      ]),
      projectsItemList(),
    ];
  } else if (routePath === "/certifications") {
    route.extra = [
      personNode(),
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Certifications", path: "/certifications" },
      ]),
      certificationsItemList(),
    ];
  } else if (routePath === "/blog") {
    route.keep = ["blog", "other"];
    route.extra = [
      personNode(),
      publisherNode(),
      breadcrumbList([
        { name: "Home", path: "/" },
        { name: "Blog", path: "/blog" },
      ]),
      blogItemList(posts),
    ];
  } else {
    const service = services.find(
      (item) => `/services/${item.slug}` === routePath,
    );
    if (routePath === "/services") {
      route.extra = [
        personNode(),
        breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]),
        servicesItemList(services),
      ];
    } else if (service) {
      route.extra = [
        personNode(),
        serviceNode(service),
        serviceFaqNode(service),
        breadcrumbList([
          { name: "Home", path: "/" },
          { name: "Services", path: "/#services" },
          { name: service.title, path: routePath },
        ]),
      ];
    }
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
    imageWidth: 1200,
    imageHeight: 750,
    imageAlt: `${p.title} — ${p.description}`,
    keep: [`code:${slug}`, "other"],
    extra: [
      personNode(),
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

/* Bodies: home + har route ka poora React markup. */
const bodyPaths = ["/", ...routes.map((route) => route.path)];
const bodies = await renderBodies(bodyPaths);

/* Home shell (dist/index.html khud): sirf home ke nodes —
   Person + ProfilePage + WebSite + FAQPage. */
fs.writeFileSync(
  distIndex,
  injectBody(
    insertLd(baseNoLd, ["person", "profile", "website", "faq", "other"], []),
    bodies["/"],
  ),
);

let written = 0;
for (const route of routes) {
  const dir = path.join(DIST, route.path.replace(/^\//, ""));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(
    path.join(dir, "index.html"),
    injectBody(
      insertLd(shellFor(route), route.keep, route.extra),
      bodies[route.path],
    ),
  );
  written++;
}

console.log(`prerender-shells: ${written} route shell(s) written`);
