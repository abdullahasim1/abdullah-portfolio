import { describe, it, expect } from "vitest";
import { answerQuestion, SUGGESTED_QUESTIONS } from "./assistant";
import { services } from "../data/services";
import { certifications } from "../data/certifications";
import { featuredProjects } from "../data/projects";

describe("portfolio assistant matcher", () => {
  it("answers the services question with every real service", () => {
    const a = answerQuestion("What services does Abdullah offer?");
    for (const s of services) expect(a.text).toContain(s.title);
    expect(a.links.some((l) => l.path === "/services/full-stack-web-development")).toBe(true);
  });

  it("answers the certifications count from the data, not a hardcoded number", () => {
    const a = answerQuestion("How many certifications does he have?");
    expect(a.text).toContain(String(certifications.length));
    expect(a.links.some((l) => l.path === "/certifications")).toBe(true);
  });

  it("answers a specific certification question (Kiro badge)", () => {
    const a = answerQuestion("Tell me about the Kiro badge");
    expect(a.text.toLowerCase()).toContain("kiro");
  });

  it("answers hiring with the real contact email and contact link", () => {
    const a = answerQuestion("How can I hire Abdullah?");
    expect(a.text).toContain("abdullah.gc.18@gmail.com");
    expect(a.links.some((l) => l.path === "/contact")).toBe(true);
  });

  it("answers pricing from the portfolio FAQ, without inventing numbers", () => {
    const a = answerQuestion("What does a freelance AI automation project cost?");
    expect(a.text.toLowerCase()).toContain("depends on scope");
  });

  it("answers full-time role openness from the FAQ", () => {
    const a = answerQuestion("Is he open to full-time roles?");
    expect(a.text.toLowerCase()).toContain("full-time remote roles");
  });

  it("answers the tech-stack question with real technologies", () => {
    const a = answerQuestion("What is his tech stack?");
    expect(a.text).toContain("React");
    expect(a.text).toContain("AWS");
  });

  it("answers a specific project question with that project's facts", () => {
    const a = answerQuestion("Tell me about the Four-AI platform");
    expect(a.text).toContain("Four-AI Platform");
    expect(a.links.some((l) => l.path && l.path.startsWith("/projects/"))).toBe(true);
  });

  it("lists featured projects for a generic projects question", () => {
    const a = answerQuestion("Show me his best projects");
    for (const p of featuredProjects.slice(0, 3)) expect(a.text).toContain(p.title);
  });

  it("falls back politely for questions outside the portfolio data", () => {
    const a = answerQuestion("What is the weather in Tokyo today?");
    expect(a.text).toContain("I don't have that in Abdullah's portfolio data");
    expect(a.links.some((l) => l.path === "/contact")).toBe(true);
  });

  it("greets back on a greeting", () => {
    const a = answerQuestion("Hi");
    expect(a.text).toContain("AI assistant");
  });

  it("every suggested question produces a non-fallback answer", () => {
    for (const q of SUGGESTED_QUESTIONS) {
      const a = answerQuestion(q);
      expect(a.text.length, q).toBeGreaterThan(40);
      expect(a.text, q).not.toContain("I don't have that in Abdullah's portfolio data");
    }
  });
});
