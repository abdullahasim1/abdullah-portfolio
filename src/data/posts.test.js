import { describe, it, expect } from "vitest";
import { posts, getPost } from "./posts.gen";

describe("generated posts", () => {
  it("has at least one post (prebuild ran)", () => {
    expect(posts.length).toBeGreaterThan(0);
  });

  it("every post has required fields and valid shapes", () => {
    for (const post of posts) {
      expect(post.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(post.title.length).toBeGreaterThan(10);
      expect(post.description.length).toBeGreaterThan(30);
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(post.date))).toBe(false);
      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags.length).toBeGreaterThan(0);
      expect(post.readingMinutes).toBeGreaterThanOrEqual(1);
      expect(post.html).toMatch(/<(p|h2|h3|ul|ol)\b/);
    }
  });

  it("posts are sorted newest-first", () => {
    const dates = posts.map((p) => p.date);
    const sorted = [...dates].sort((a, b) => b.localeCompare(a));
    expect(dates).toEqual(sorted);
  });

  it("slugs are unique and getPost resolves them", () => {
    const slugs = posts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(getPost(slug)?.slug).toBe(slug);
    }
    expect(getPost("does-not-exist")).toBeNull();
  });
});
