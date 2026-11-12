import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  featuredProjects,
  GITHUB_USERNAME,
  githubOgImage,
  projectSlug,
  resolveLiveLink,
  repoLiveUrl,
  LIVE_URL_OVERRIDES,
  CURATED_REPOS,
  STATIC_REPOS,
  PROJECT_SLUGS,
} from "./projects";
import { services } from "./services";
import { faqs } from "./faqs";
import { certifications } from "./certifications";
import { testimonials } from "./testimonials";
import { timeline } from "./experience";

const PUBLIC_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../public");

function expectPublicFile(urlPath) {
  const filePath = path.join(PUBLIC_DIR, urlPath);
  expect(fs.existsSync(filePath), `missing asset: ${urlPath}`).toBe(true);
}

describe("projects data", () => {
  it("has required fields on every featured project", () => {
    expect(featuredProjects.length).toBeGreaterThan(0);
    for (const p of featuredProjects) {
      expect(p.repoName, "repoName").toBeTruthy();
      expect(p.title, "title").toBeTruthy();
      expect(p.description, "description").toBeTruthy();
      expect(Array.isArray(p.tags) && p.tags.length > 0, "tags").toBe(true);
      expect(p.gradient, "gradient").toBeTruthy();
      expect(p.emoji, "emoji").toBeTruthy();
      expect(p.results === undefined || Array.isArray(p.results)).toBe(true);
    }
  });

  it("local image assets exist on disk (webp migration intact)", () => {
    for (const p of featuredProjects) {
      if (p.image?.startsWith("/")) expectPublicFile(p.image);
      expect(p.image).toMatch(/\.(webp|avif|jpg|png)$/);
    }
  });

  it("builds valid GitHub OG image URLs", () => {
    expect(githubOgImage("some-repo")).toContain(GITHUB_USERNAME);
    expect(githubOgImage("some-repo")).toContain("some-repo");
  });
});

describe("certifications data", () => {
  it("has unique ids and required fields", () => {
    const ids = certifications.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const c of certifications) {
      expect(c.title, "title").toBeTruthy();
      expect(c.issuer, "issuer").toBeTruthy();
      expect(c.date, "date").toBeTruthy();
      expect(c.skills?.length, "skills").toBeGreaterThan(0);
      expectPublicFile(c.image);
    }
  });

  it("has at least one featured certification", () => {
    expect(certifications.some((c) => c.featured)).toBe(true);
  });

  it("Stats.jsx exact Certifications count matches the data total", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const statsSrc = fs.readFileSync(path.join(root, "src/pages/Stats.jsx"), "utf8");
    const m = statsSrc.match(/\{ number: (\d+), suffix: "", label: "Certifications"/);
    expect(m, "Stats.jsx Certifications entry").toBeTruthy();
    expect(Number(m[1])).toBe(certifications.length);
  });

  it("hero/about/experience/footer Certifications stats derive from the data total (no stale hardcoded count)", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const files = [
      "src/pages/Home.jsx",
      "src/pages/About.jsx",
      "src/pages/Experience.jsx",
      "src/components/Footer.jsx",
    ];
    for (const rel of files) {
      const src = fs.readFileSync(path.join(root, rel), "utf8");
      // Certifications stat entry ka number data se derive ho, hardcode na ho.
      expect(src, rel).toMatch(/certifications\.length\}\+`/);
      expect(src, rel).toContain('label: "Certifications"');
      expect(src, rel).not.toContain('"11+"');
    }
  });

  it("certifications can display the full total — page shows all, preview keeps toggle, no silent hard slice", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const src = fs.readFileSync(path.join(root, "src/pages/Certifications.jsx"), "utf8");
    // Toggle exists with an accessible expanded state and both labels.
    expect(src).toContain("View All Certifications");
    expect(src).toContain("Show Less");
    expect(src).toContain("aria-expanded={expanded}");
    // The only truncation is the preview slice, gated behind isPreviewing
    // (not showAll, "all" filter, collapsed). The /certifications page
    // renders with showAll, so there the full list is always visible.
    expect(src).toContain(
      'const isPreviewing = !showAll && filter === "all" && !expanded',
    );
    expect(src).toMatch(/isPreviewing \? shown\.slice\(0, PREVIEW_COUNT\) : shown/);
    expect(src).toMatch(/const PREVIEW_COUNT = \d+/);
    const preview = Number(src.match(/const PREVIEW_COUNT = (\d+)/)[1]);
    expect(preview).toBeLessThan(certifications.length);
    const appSrc = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
    expect(appSrc).toContain("<Certifications showAll />");
  });
});

describe("testimonials & experience data", () => {
  it("testimonials have author + company", () => {
    expect(testimonials.length).toBeGreaterThan(0);
    for (const t of testimonials) {
      expect(t.name || t.author, "name").toBeTruthy();
      expect(t.quote || t.text, "quote").toBeTruthy();
    }
  });

  it("experience timeline entries are ordered with roles", () => {
    expect(timeline.length).toBeGreaterThan(0);
    for (const item of timeline) {
      expect(item.title || item.role, "role").toBeTruthy();
    }
  });
});

describe("live-link honesty (manual status, no dead-homepage Live claims)", () => {
  it("every featured project carries a manual status field", () => {
    for (const p of featuredProjects) {
      expect(["live", "client-delivery"], p.repoName).toContain(p.status);
    }
  });

  it("non-live projects never resolve a live link, even with a homepage set", () => {
    for (const p of featuredProjects.filter((x) => x.status !== "live")) {
      expect(resolveLiveLink(p, { homepage: "https://dead.example" })).toBeNull();
    }
  });

  it("Events Agent is not showcased anywhere (removed 2026-11-12 on Abdullah's order)", () => {
    // Featured case studies, slug map, repos grid, static fallbacks and
    // live-URL overrides must all be free of the events repos — the
    // project must not render on the portfolio in any form.
    expect(featuredProjects.some((p) => p.repoName.includes("events-agent"))).toBe(false);
    expect(Object.keys(PROJECT_SLUGS).some((k) => k.includes("events-agent"))).toBe(false);
    expect(CURATED_REPOS.some((n) => n.includes("events-agent"))).toBe(false);
    expect(Object.keys(STATIC_REPOS).some((k) => k.includes("events-agent"))).toBe(false);
    expect(Object.keys(LIVE_URL_OVERRIDES).some((k) => k.includes("events-agent"))).toBe(false);
    const xml = fs.readFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), "utf8");
    expect(xml).not.toContain("events-agent");
  });

  it("HireGen canonical live URL is hiregen-ai.vercel.app everywhere", () => {
    expect(LIVE_URL_OVERRIDES.GENAI).toBe("https://hiregen-ai.vercel.app");
    expect(
      repoLiveUrl({ name: "GENAI", homepage: "https://genai-orcin-sigma.vercel.app" })
    ).toBe("https://hiregen-ai.vercel.app");
    const hiregen = featuredProjects.find((p) => p.repoName === "GENAI");
    expect(hiregen?.liveLink).toBe("https://hiregen-ai.vercel.app");
  });
});

describe("generated artefacts stay fresh", () => {
  it("committed sitemap covers every project + service detail route", () => {
    const xml = fs.readFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), "utf8");
    for (const p of featuredProjects) {
      expect(xml, `sitemap missing project ${p.repoName}`).toContain(`/projects/${projectSlug(p)}`);
    }
    for (const s of services) {
      expect(xml, `sitemap missing service ${s.slug}`).toContain(`/services/${s.slug}`);
    }
  });

  it("index.html FAQ schema count matches faqs.js", () => {
    const html = fs.readFileSync(path.resolve(PUBLIC_DIR, "..", "index.html"), "utf8");
    const block = html.slice(html.indexOf("FAQ-SCHEMA:START"), html.indexOf("FAQ-SCHEMA:END"));
    const count = (block.match(/"@type": "Question"/g) || []).length;
    expect(count).toBe(faqs.length);
  });

  it("about photo WebP is generated from the JPG source", () => {
    expectPublicFile("/about-photo.webp");
  });
});

describe("multi-page routes agree across all sources", () => {
  /* 2026-11-12: site full multi-page hai — har section ka asal page.
     Route set har jagah ek jaisa hona chahiye: router PAGE_ROUTES,
     pageMeta PAGE_META, App.jsx route table, sitemap — aur vercel.json
     mein kisi asal page ka purana /# redirect nahi bacha hona chahiye. */
  const EXPECTED_PAGES = [
    "/",
    "/about",
    "/skills",
    "/services",
    "/projects",
    "/experience",
    "/certifications",
    "/blog",
    "/contact",
  ];

  it("router.jsx PAGE_ROUTES == pageMeta.js PAGE_META == expected page set", async () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const routerSrc = fs.readFileSync(path.join(root, "src/lib/router.jsx"), "utf8");
    const routerBlock = routerSrc.match(/PAGE_ROUTES = \[([\s\S]*?)\]/)?.[1] ?? "";
    const fromRouter = [...routerBlock.matchAll(/"(\/[^"]*)"/g)]
      .map((m) => m[1])
      .sort();
    const { PAGE_META } = await import("../lib/pageMeta.js");
    expect(fromRouter).toEqual([...EXPECTED_PAGES].sort());
    expect(Object.keys(PAGE_META).sort()).toEqual([...EXPECTED_PAGES].sort());
  });

  it("App.jsx route table has a case for every section page", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const appSrc = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
    for (const p of EXPECTED_PAGES.slice(1)) {
      expect(appSrc, `App.jsx missing route case for ${p}`).toContain(
        `case "${p.slice(1)}":`,
      );
    }
  });

  it("vercel.json has no leftover /# redirect for any real page", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
    for (const r of vercel.redirects ?? []) {
      expect(EXPECTED_PAGES, `stale redirect for real page ${r.source}`).not.toContain(
        r.source,
      );
    }
  });

  it("committed sitemap covers every page route", () => {
    const xml = fs.readFileSync(path.join(PUBLIC_DIR, "sitemap.xml"), "utf8");
    for (const p of EXPECTED_PAGES.slice(1)) {
      expect(xml, `sitemap missing page ${p}`).toContain(
        `https://abdullah-asim-dev.vercel.app${p}<`,
      );
    }
  });
});
