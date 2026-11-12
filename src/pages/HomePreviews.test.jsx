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

/* Home preview hub (2026-11-12): home par har section THORA sa dikhta
   hai, "View All" asal page par le jata hai. Ye tests preview limits
   aur full-page behaviour dono lock karte hain — preview kabhi page
   ko change nahi kar sakta. */

const heroServices = services.filter((s) => s.icon !== "automation");

describe("home previews — limited content + View All navigation", () => {
  it("Services preview: pehle 3 cards, koi spotlight/estimator/custom band nahi, View All → /services", () => {
    render(<Services preview />);
    for (const s of heroServices.slice(0, 3)) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
    expect(screen.queryByText(heroServices[3].title)).not.toBeInTheDocument();
    expect(screen.queryByText(/I don't just build apps/)).not.toBeInTheDocument();
    expect(screen.queryByText("Estimated Timeline")).not.toBeInTheDocument();
    expect(screen.queryByText("Need Something Custom?")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View All Services/ }),
    ).toHaveAttribute("href", "/services");
  });

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
    // In-place expand toggle preview mein maujood nahi
    expect(
      screen.queryByRole("button", { name: /View All Certifications|Show Less/ }),
    ).not.toBeInTheDocument();
    // Filter pills bhi preview mein nahi
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

  it("Skills preview: pehle 2 groups, filter pills aur Tools bar nahi, View All → /skills", () => {
    render(<Skills preview />);
    expect(screen.getByText("Frontend & UI")).toBeInTheDocument();
    expect(screen.getByText("Backend & Data")).toBeInTheDocument();
    expect(screen.queryByText("AI, Cloud & Automation")).not.toBeInTheDocument();
    expect(screen.queryByText("Tools & Workflow")).not.toBeInTheDocument();
    expect(screen.queryByRole("tab")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View All Skills/ })).toHaveAttribute(
      "href",
      "/skills",
    );
  });

  it("Experience preview: pehli 2 entries, highlights aside nahi, View All → /experience", () => {
    render(<Experience preview />);
    expect(screen.getAllByText(timeline[0].title).length).toBeGreaterThan(0);
    expect(screen.getAllByText(timeline[1].title).length).toBeGreaterThan(0);
    expect(screen.queryByText(timeline[2].title)).not.toBeInTheDocument();
    expect(screen.queryByText("Journey Highlights")).not.toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /View All Experience/ }),
    ).toHaveAttribute("href", "/experience");
  });

  it("About preview: intro + photo, stack panel/detail cards nahi, More About Me → /about", () => {
    render(<About preview />);
    expect(
      screen.getByText("Building Web Experiences That Make an Impact"),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, el) =>
          el?.tagName === "P" &&
          el.textContent.includes("specializing in Generative AI"),
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText("My Tech Stack")).not.toBeInTheDocument();
    expect(
      screen.queryByText(/Government College University Faisalabad/),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /More About Me/ })).toHaveAttribute(
      "href",
      "/about",
    );
  });
});

describe("full pages — preview prop ke baghair behaviour pehle jaisa", () => {
  it("Services page: saare cards + spotlight + estimator + custom band", () => {
    render(<Services />);
    for (const s of heroServices) {
      expect(screen.getByText(s.title)).toBeInTheDocument();
    }
    expect(screen.getByText(/I don't just build apps/)).toBeInTheDocument();
    expect(screen.getByText("Estimated Timeline")).toBeInTheDocument();
    expect(screen.getByText("Need Something Custom?")).toBeInTheDocument();
  });

  it("Certifications page (showAll): poori list + filters", () => {
    render(<Certifications showAll />);
    for (const c of certifications) {
      // Featured banner grid ke ilawa bhi wohi badge dikhata hai — kam az kam ek
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

  it("Skills page: teeno groups + filter tabs + Tools bar", () => {
    render(<Skills />);
    expect(screen.getByText("AI, Cloud & Automation")).toBeInTheDocument();
    expect(screen.getByText("Tools & Workflow")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /All/ })).toBeInTheDocument();
  });

  it("Experience page: 4 entries + Journey Highlights", () => {
    render(<Experience />);
    expect(screen.getAllByText(timeline[3].title).length).toBeGreaterThan(0);
    expect(screen.queryByText(timeline[4].title)).not.toBeInTheDocument();
    expect(screen.getByText("Journey Highlights")).toBeInTheDocument();
  });

  it("About page: stack panel + detail cards", () => {
    render(<About />);
    expect(screen.getByText("My Tech Stack")).toBeInTheDocument();
    expect(
      screen.getByText(/Government College University Faisalabad/),
    ).toBeInTheDocument();
  });
});

describe("home composition (App.jsx source)", () => {
  it("HomePage har preview ko sahi order mein rakhta hai", async () => {
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
      "<About preview />",
      "<Skills preview />",
      "<Services preview />",
      "<Stats />",
      "<FeaturedWork preview />",
      "<Experience preview />",
      "<Certifications preview />",
      "<Blog preview />",
      "<Testimonials />",
      "<Faq />",
      "<CtaBand />",
    ];
    let last = -1;
    for (const marker of order) {
      const idx = home.indexOf(marker);
      expect(idx, `HomePage missing ${marker}`).toBeGreaterThan(last);
      last = idx;
    }
    // Page routes ab bhi full versions render karte hain
    expect(src).toContain("<Certifications showAll />");
    expect(src).toContain("case \"about\":");
    expect(src).toContain("case \"services\":");
  });
});
