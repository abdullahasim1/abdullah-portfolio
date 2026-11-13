import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { certifications } from "../data/certifications";
import { featuredProjects, projectSlug } from "../data/projects";
import { PAGE_META } from "./pageMeta";
import {
  breadcrumbList,
  projectsItemList,
  certificationsItemList,
  blogItemList,
  projectWorkNode,
  PERSON_ID,
} from "./routeSchema";

/* SEO fix (2026-11-13) ke guards: entity schema hamesha sahi
   (dead Credly URL wapas na aaye), route schema builders data
   files se agree karein, aur llms files current facts bole. */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readRoot = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");

function ldBlocks(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(
    (m) => JSON.parse(m[1]),
  );
}

describe("index.html entity schema", () => {
  const blocks = ldBlocks(readRoot("index.html"));
  const person = blocks.find((b) => b["@type"] === "Person");

  it("every JSON-LD block parses and the Person exists", () => {
    expect(blocks.length).toBeGreaterThan(0);
    expect(person).toBeTruthy();
  });

  it("sameAs uses the live Credly profile, never the dead one", () => {
    expect(readRoot("index.html")).not.toContain("credly.com/users/abdullah-asim");
    expect(person.sameAs).toContain(
      "https://www.credly.com/users/abdullah-bin-asim.ed30d504",
    );
    expect(person.sameAs).toContain(
      "https://www.credential.net/profile/abdullahbinsim860299/wallet",
    );
  });

  it("ProfilePage wraps the Person as mainEntity", () => {
    const profile = blocks.find((b) => b["@type"] === "ProfilePage");
    expect(profile).toBeTruthy();
    expect(profile.mainEntity["@id"]).toBe(PERSON_ID);
  });

  it("Person is grounded in Lahore, Pakistan with his real roles", () => {
    expect(person.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    });
    expect(person.worksFor.name).toBe("Experts Cloud");
    expect(person.founderOf).toMatchObject({
      name: "DevRox",
      url: "https://thedevrox.com",
    });
  });

  it("hasCredential only uses credentialUrls from certifications.js", () => {
    const allowed = new Set(
      certifications.map((c) => c.credentialUrl).filter(Boolean),
    );
    expect(person.hasCredential.length).toBeGreaterThanOrEqual(5);
    for (const cred of person.hasCredential) {
      expect(cred["@type"]).toBe("EducationalOccupationalCredential");
      expect(allowed.has(cred.url), cred.name).toBe(true);
    }
    const names = person.hasCredential.map((c) => c.name);
    expect(names).toContain("AWS Certified Generative AI Developer — Professional");
    expect(names).toContain("Claude Certified Architect – Foundations");
  });

  it("home title + description carry the Lahore locality and match pageMeta", () => {
    expect(PAGE_META["/"].title).toContain("Lahore, Pakistan");
    expect(PAGE_META["/"].description).toContain("Lahore, Pakistan");
    expect(readRoot("index.html")).toContain(`<title>${PAGE_META["/"].title}</title>`);
  });
});

describe("routeSchema builders", () => {
  it("projects ItemList covers every featured project case study", () => {
    const list = projectsItemList();
    expect(list["@type"]).toBe("ItemList");
    expect(list.itemListElement).toHaveLength(featuredProjects.length);
    list.itemListElement.forEach((item, i) => {
      expect(item.position).toBe(i + 1);
      expect(item.url).toBe(
        `https://abdullah-asim-dev.vercel.app/projects/${projectSlug(featuredProjects[i])}`,
      );
    });
  });

  it("certifications ItemList covers all credentials, URLs matching the data file", () => {
    const list = certificationsItemList();
    expect(list.itemListElement).toHaveLength(certifications.length);
    list.itemListElement.forEach((item, i) => {
      const cert = certifications[i];
      expect(item.item.name).toBe(cert.title);
      expect(item.item.recognizedBy.name).toBe(cert.issuer);
      if (cert.credentialUrl) expect(item.item.url).toBe(cert.credentialUrl);
      else expect(item.item.url).toBeUndefined();
    });
  });

  it("breadcrumbList builds absolute, ordered items", () => {
    const bc = breadcrumbList([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
    ]);
    expect(bc["@type"]).toBe("BreadcrumbList");
    expect(bc.itemListElement).toEqual([
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://abdullah-asim-dev.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://abdullah-asim-dev.vercel.app/blog",
      },
    ]);
  });

  it("blogItemList mirrors the posts it is given", () => {
    const list = blogItemList([
      { slug: "a-post", title: "A Post" },
      { slug: "b-post", title: "B Post" },
    ]);
    expect(list.itemListElement).toHaveLength(2);
    expect(list.itemListElement[1].url).toBe(
      "https://abdullah-asim-dev.vercel.app/blog/b-post",
    );
  });

  it("projectWorkNode gives a schema-less project a CreativeWork authored by the Person", () => {
    const businessHelp = featuredProjects.find((p) => p.repoName === "Business-Help");
    const node = projectWorkNode(businessHelp);
    expect(node["@type"]).toBe("CreativeWork");
    expect(node.author["@id"]).toBe(PERSON_ID);
    expect(node.mainEntityOfPage).toBe(
      "https://abdullah-asim-dev.vercel.app/projects/business-help",
    );
  });
});

describe("llms files carry current entity facts", () => {
  for (const rel of ["public/llms.txt", "public/llms-full.txt", "public/index.md"]) {
    it(`${rel}: no dead Credly URL; states 27 certifications and Lahore`, () => {
      const text = readRoot(rel);
      expect(text).not.toContain("credly.com/users/abdullah-asim");
      expect(text).toContain("27");
      expect(text).toContain("Lahore");
    });
  }
});
