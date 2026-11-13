import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import About from "./About";
import Skills from "./Skills";
import Services from "./Services";
import Experience from "./Experience";
import Certifications from "./Certifications";
import Blog from "./Blog";
import { services } from "../data/services";
import { certifications } from "../data/certifications";
import { timeline } from "../data/experience";
import { posts } from "../data/posts.gen";

/* One-pager structure (2026-11-13, Abdullah ka faisla): home par
   About / Skills / Services / Experience / Contact FULL sections
   hain — preview hub khatam. Sirf Featured Projects, Certifications
   aur Blog home par preview rehte hain (View All asal page par).
   Ye tests full-section content aur bache hue previews dono lock
   karte hain. */

const heroServices = services.filter((s) => s.icon !== "automation");

describe("home full sections — poora content, koi kata hua preview nahi", () => {
  it("Services full: saare 4 cards + spotlight + estimator + custom band", () => {
    render(<Services />);
    for (const s of heroServices) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
    expect(screen.getByText(/I don't just build apps/)).toBeInTheDocument();
    expect(screen.getByText("Estimated Timeline")).toBeInTheDocument();
    expect(screen.getByText("Need Something Custom?")).toBeInTheDocument();
  });

  it("Skills full: saare groups + filter tabs + Tools bar", () => {
    render(<Skills />);
    expect(screen.getByText("Frontend & UI")).toBeInTheDocument();
    expect(screen.getByText("Backend & Data")).toBeInTheDocument();
    expect(screen.getByText("AI, Cloud & Automation")).toBeInTheDocument();
    expect(screen.getByText("Tools & Workflow")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /All/ })).toBeInTheDocument();
  });

  it("About full: intro + photo + stack panel + detail cards", () => {
    render(<About />);
    expect(
      screen.getByText("Building Web Experiences That Make an Impact"),
    ).toBeInTheDocument();
    expect(screen.getByText("My Tech Stack")).toBeInTheDocument();
    expect(
      screen.getByText(/Government College University Faisalabad/),
    ).toBeInTheDocument();
  });

  it("Experience full: 3 jobs + credential entry + Journey Highlights (4th milestone nahi)", () => {
    render(<Experience />);
    for (const item of timeline.slice(0, 4)) {
      expect(screen.getAllByText(item.title).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText(timeline[4].title)).not.toBeInTheDocument();
    expect(screen.getByText("Journey Highlights")).toBeInTheDocument();
  });

  it("Experience stepper sirf jobs gin-ta hai — credential step nahi (owner decision guard)", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const root = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../..",
    );
    const src = fs.readFileSync(path.join(root, "src/pages/Experience.jsx"), "utf8");
    // Stepper ke panels `shown` se bante hain aur full mode mein
    // shown = jobs (timeline ki pehli JOB_COUNT entries) hi hai.
    expect(src).toContain("const JOB_COUNT = 3");
    expect(src).toContain("const shown = preview ? timeline.slice(0, PREVIEW_COUNT) : jobs");
    // Credential panel stepper ke baad static block ke tor par hai
    expect(src).toContain("certEntry &&");
  });
});

describe("home previews jo baqi rahe — Projects / Certifications / Blog", () => {
  it("Certifications preview: sirf 12 cards, button /certifications par NAVIGATE karta hai (expand nahi)", () => {
    render(<Certifications preview />);
    for (const c of certifications.slice(0, 12)) {
      expect(screen.getByAltText(c.title)).toBeInTheDocument();
    }
    expect(screen.queryByAltText(certifications[12].title)).not.toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: `View All Certifications (${certifications.length})`,
    });
    expect(link).toHaveAttribute("href", "/certifications");
    expect(
      screen.queryByRole("button", { name: /View All Certifications|Show Less/ }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: new RegExp(`All \\(${certifications.length}\\)`) }),
    ).not.toBeInTheDocument();
  });

  it("Blog preview: latest 3 posts, search nahi, View All → /blog", () => {
    render(<Blog preview />);
    for (const p of posts.slice(0, 3)) {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
    }
    expect(screen.queryByText(posts[3].title)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Search articles...")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View All Posts/ })).toHaveAttribute(
      "href",
      "/blog",
    );
  });
});

describe("asal pages jo baqi rahe", () => {
  it("Certifications page (showAll): poori list + filters", () => {
    render(<Certifications showAll />);
    for (const c of certifications) {
      expect(screen.getAllByAltText(c.title).length).toBeGreaterThan(0);
    }
    expect(
      screen.getByRole("button", { name: new RegExp(`All \\(${certifications.length}\\)`) }),
    ).toBeInTheDocument();
  });

  it("Blog page: saari posts + search", () => {
    render(<Blog />);
    for (const p of posts) {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
    }
    expect(screen.getByPlaceholderText("Search articles...")).toBeInTheDocument();
  });
});

describe("home composition (App.jsx source)", () => {
  it("HomePage full one-pager ko sahi order mein rakhta hai", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const root = path.resolve(
      path.dirname(fileURLToPath(import.meta.url)),
      "../..",
    );
    const src = fs.readFileSync(path.join(root, "src/App.jsx"), "utf8");
    const home = src.slice(src.indexOf("function HomePage"), src.indexOf("function SectionPage"));
    const order = [
      "<Home ",
      "<About />",
      "<Skills />",
      "<Services />",
      "<Process />",
      "<Stats />",
      "<FeaturedWork preview />",
      "<Experience />",
      "<Certifications preview />",
      "<Blog preview />",
      "<Testimonials />",
      "<Faq />",
      "<Contact />",
      "<CtaBand />",
    ];
    let last = -1;
    for (const marker of order) {
      const idx = home.indexOf(marker);
      expect(idx, `HomePage missing ${marker}`).toBeGreaterThan(last);
      last = idx;
    }
    // Route table: sirf teen asal pages + certifications showAll
    expect(src).toContain("<Certifications showAll />");
    expect(src).toContain('case "projects":');
    expect(src).toContain('case "certifications":');
    expect(src).toContain('case "blog":');
    expect(src).not.toContain('case "about":');
    expect(src).not.toContain('case "services":');
    expect(src).not.toContain('case "contact":');
    expect(src).not.toContain("ServiceDetail");
  });
});
