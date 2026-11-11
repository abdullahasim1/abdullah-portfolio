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

  it("homepage section can display the full total — View All toggle, no silent hard slice", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const src = fs.readFileSync(path.join(root, "src/pages/Certifications.jsx"), "utf8");
    // Toggle exists with an accessible expanded state and both labels.
    expect(src).toContain("View All Certifications");
    expect(src).toContain("Show Less");
    expect(src).toContain("aria-expanded={expanded}");
    // The only preview truncation is the one gated behind the toggle:
    // collapsed "all" view slices, expanded view renders the full list.
    expect(src).toMatch(/!expanded \? shown\.slice\(0, PREVIEW_COUNT\) : shown/);
    expect(src).toMatch(/const PREVIEW_COUNT = \d+/);
    const preview = Number(src.match(/const PREVIEW_COUNT = (\d+)/)[1]);
    expect(preview).toBeLessThan(certifications.length);
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

  it("Events Agent repos never resolve a live URL (deployments are gone)", () => {
    expect(
      repoLiveUrl({ name: "events-agent-frontend", homepage: "https://events-agent-frontend.vercel.app" })
    ).toBeNull();
    expect(
      repoLiveUrl({ name: "events-agents-backend", homepage: "https://events-agents-backend.vercel.app" })
    ).toBeNull();
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

describe("section aliases agree across all three sources", () => {
  it("vercel.json redirects == App.jsx SECTION_ALIASES == router.jsx SECTION_ALIAS_IDS", () => {
    const root = path.resolve(PUBLIC_DIR, "..");
    const vercel = JSON.parse(fs.readFileSync(path.join(root, "vercel.json"), "utf8"));
    const fromVercel = vercel.redirects
      .filter((r) => r.destination.startsWith("/#"))
      .map((r) => r.source.slice(1))
      .sort();

    const routerSrc = fs.readFileSync(path.join(root, "src/lib/router.jsx"), "utf8");
    const routerBlock = routerSrc.match(/SECTION_ALIAS_IDS = \[([\s\S]*?)\]/)?.[1] ?? "";
    const fromRouter = [...routerBlock.matchAll(/"([a-z-]+)"/g)].map((m) => m[1]).sort();

    const appSrc = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
    const appBlock = appSrc.match(/SECTION_ALIASES = \{([\s\S]*?)\}/)?.[1] ?? "";
    const fromApp = [...appBlock.matchAll(/(\w+):/g)].map((m) => m[1]).sort();

    expect(fromRouter).toEqual(fromVercel);
    expect(fromApp).toEqual(fromVercel);
  });
});
