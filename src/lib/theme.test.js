import { describe, it, expect, beforeEach } from "vitest";
import { getTheme, applyTheme, toggleTheme } from "./theme";

describe("theme", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    localStorage.clear();
  });

  it("defaults to light when no stored preference (Light Minimal redesign)", () => {
    expect(getTheme()).toBe("light");
  });

  it("applyTheme adds `light` class on <html> and persists", () => {
    applyTheme("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("aa-theme")).toBe("light");
  });

  it("applyTheme('dark') removes the `light` class", () => {
    applyTheme("light");
    applyTheme("dark");
    expect(document.documentElement.classList.contains("light")).toBe(false);
    expect(localStorage.getItem("aa-theme")).toBe("dark");
  });

  it("toggleTheme flips between light and dark", () => {
    applyTheme("dark");
    expect(toggleTheme()).toBe("light");
    expect(toggleTheme()).toBe("dark");
  });

  it("honours a stored theme over default", () => {
    localStorage.setItem("aa-theme", "dark");
    expect(getTheme()).toBe("dark");
  });
});
