// @ts-check
/* Theme management — dark (default) / light.
   - localStorage mein `aa-theme` save hota hai
   - Pehli visit par dark default hai (neon mockup); stored choice hamesha respect hoti hai
   - `light` class <html> par lagti hai; Tailwind `light:` variant isi se chalta hai */

const THEME_KEY = "aa-theme";

function getStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    /* localStorage unavailable (private mode etc.) */
  }
  return null;
}

export function getTheme() {
  const stored = getStoredTheme();
  if (stored) return stored;
  /* Clean Light redesign: pehli visit par light default hai.
     Toggle/stored choice hamesha respect hoti hai. */
  return "light";
}

/**
 * @param {string} theme
 */
export function applyTheme(theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.toggle("light", theme === "light");
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    /* ignore */
  }
  // Smooth color transition (short window, phir hat jaati hai)
  root.classList.add("theme-transition");
  window.setTimeout(() => root.classList.remove("theme-transition"), 400);
}

export function initTheme() {
  applyTheme(getTheme());
  return getTheme();
}

export function toggleTheme() {
  const next = getTheme() === "light" ? "dark" : "light";
  applyTheme(next);
  return next;
}

export default getTheme;