import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { featuredProjects, GITHUB_USERNAME, githubOgImage } from "./projects";
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
