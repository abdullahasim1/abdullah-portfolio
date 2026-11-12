import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";
import Footer from "./Footer";
import { certifications } from "../data/certifications";

/* Dua-style hero + footer (2026-11-12): dark hero band ki devasa
   headline, footer ke pill quick links + wordmark — aur saari copy /
   links Abdullah ke apne. Ye tests nayi structure aur preserved
   substance (CTAs, stats, email, legal line) dono lock karte hain. */

describe("hero — Dua-style dark band", () => {
  it("ek hi h1: devasa role headline, naam asal text mein maujood", () => {
    const { container } = render(<Home />);
    const h1s = container.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveAttribute("aria-label", "Generative AI Engineer");
    expect(h1s[0].textContent).toContain("Generative");
    expect(h1s[0].textContent).toContain("Engineer");
    expect(screen.getByText(/Hello, I'm Abdullah Asim/)).toBeInTheDocument();
  });

  it("band explicit dark hex par hai — dark: variant bilkul nahi", async () => {
    const fs = await import("node:fs");
    const path = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
    for (const rel of ["src/pages/Home.jsx", "src/components/Footer.jsx"]) {
      // Comments strip karke scan — attribution comments mein reference
      // ka naam aa sakta hai; asal rendered code mein dark-variant aur
      // us ki copy bilkul nahi honi chahiye.
      const src = fs
        .readFileSync(path.join(root, rel), "utf8")
        .replace(/\/\*[\s\S]*?\*\//g, "");
      expect(src, rel).not.toMatch(/dark:/);
      expect(src, rel).not.toMatch(/DUA FATIMA|Scaling Start-ups/i);
    }
    const { container } = render(<Home />);
    expect(container.querySelector("section#home").className).toContain("bg-[#060607]");
  });

  it("CTAs, socials aur photo preserved hain", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /View Projects/ })).toHaveAttribute(
      "href",
      "/projects",
    );
    expect(screen.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
      "href",
      "/resume.pdf",
    );
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/abdullahasim1",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/abdullahasim1/",
    );
    expect(
      screen.getByAltText(/Abdullah Bin Asim — AI Cloud Engineer/),
    ).toHaveAttribute("src", "/about-photo.webp");
  });

  it("stats bar: wohi 4 stats, Certifications count data se dynamic", () => {
    render(<Home />);
    expect(screen.getByText("25+")).toBeInTheDocument();
    expect(screen.getByText("Projects Completed")).toBeInTheDocument();
    expect(screen.getByText("10+")).toBeInTheDocument();
    expect(screen.getByText("Happy Clients")).toBeInTheDocument();
    expect(screen.getByText("3+")).toBeInTheDocument();
    expect(screen.getByText("Years Experience")).toBeInTheDocument();
    expect(screen.getByText(`${certifications.length}+`)).toBeInTheDocument();
    expect(screen.getByText("Certifications")).toBeInTheDocument();
  });
});

describe("footer — Dua-style black band", () => {
  it("Quick Links pills saare asal routes par jate hain", () => {
    render(<Footer />);
    const expected = {
      Home: "/",
      About: "/about",
      Skills: "/skills",
      Services: "/services",
      Projects: "/projects",
      Experience: "/experience",
      Certifications: "/certifications",
      Blog: "/blog",
      Contact: "/contact",
    };
    for (const [name, href] of Object.entries(expected)) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("Contact email + Connect socials + legal line maujood hain", () => {
    const { container } = render(<Footer />);
    const email = screen.getByRole("link", { name: "abdullah.gc.18@gmail.com" });
    expect(email).toHaveAttribute("href", "mailto:abdullah.gc.18@gmail.com");
    expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/abdullahasim1",
    );
    expect(screen.getByRole("link", { name: /LinkedIn/ })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/abdullahasim1/",
    );
    expect(
      screen.getByText(new RegExp(`© ${new Date().getFullYear()} Abdullah Asim`)),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute(
      "href",
      "/privacy.html",
    );
    // Devasa cropped wordmark — us ka apna naam, her naam bilkul nahi
    expect(container.textContent).toContain("Abdullah Asim");
    expect(container.textContent).not.toMatch(/DUA FATIMA/i);
    expect(container.querySelector("footer").className).toContain("bg-[#050505]");
  });
});
