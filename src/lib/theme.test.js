import { describe, it, expect, beforeEach } from "vitest";
import { getTheme, applyTheme, toggleTheme } from "./theme";

describe("theme", () => {
  beforeEach(() => {
    document.documentElement.className = "";
    localStorage.clear();
  });

  it("defaults to light when no stored preference", () => {
    expect(getTheme()).toBe("light");
  });

  it("applyTheme adds `light` class on <html> and persists", () => {
    applyTheme("light");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("aa-theme")).toBe("light");
  });

  /* DARK THEME DISABLED (2026-11-11): neeche wale teen tests pehle dark
     behaviour assert karte thay — ab light-only behaviour assert karte
     hain. Dark mode restore ho to inhein wapas original assertions par
     karna hoga (git history / theme.js ke comments dekho). */
  it("applyTheme('dark') is forced to light while dark theme is disabled", () => {
    applyTheme("light");
    applyTheme("dark");
    expect(document.documentElement.classList.contains("light")).toBe(true);
    expect(localStorage.getItem("aa-theme")).toBe("light");
  });

  it("toggleTheme always stays light while dark theme is disabled", () => {
    applyTheme("dark");
    expect(toggleTheme()).toBe("light");
    expect(toggleTheme()).toBe("light");
  });

  it("ignores a stored dark preference while dark theme is disabled", () => {
    localStorage.setItem("aa-theme", "dark");
    expect(getTheme()).toBe("light");
  });
});
