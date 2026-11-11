// @ts-check
/* Theme management — light (default) / dark.
   - localStorage mein `aa-theme` save hota hai
   - Pehli visit par light default hai (Clean Light redesign); stored choice hamesha respect hoti hai
   - `light` class <html> par lagti hai; Tailwind `light:` variant isi se chalta hai */

/* ============================================================================
   DARK THEME DISABLED (2026-11-11, Abdullah's call): light theme only.
   To restore dark mode, uncomment this toggle, the ThemeContext dark logic,
   and the index.html theme script — all dark: styles in components are
   untouched and still in place.
   (Is repo mein koi ThemeContext nahi hai — yehi file (theme logic) woh
   "dark logic" hai jis ki taraf marker ishara karta hai. Dark mode ka har
   original code neeche comments mein mehfooz hai; kuch delete nahi hua.
   Jab tak disabled hai, theme hamesha "light" rehta hai: stored "dark"
   preference ignore hoti hai aur applyTheme hamesha <html> par `light`
   class lagata hai.)
   ============================================================================ */

const THEME_KEY = "aa-theme";

/* DARK THEME DISABLED: stored preference parhna band — original code:
// function getStoredTheme() {
//   if (typeof window === "undefined") return null;
//   try {
//     const stored = localStorage.getItem(THEME_KEY);
//     if (stored === "light" || stored === "dark") return stored;
//   } catch {
//     // localStorage unavailable (private mode etc.)
//   }
//   return null;
// }
*/

export function getTheme() {
  /* DARK THEME DISABLED: stored "dark" preference ignore — original code:
  // const stored = getStoredTheme();
  // if (stored) return stored;
  */
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
  /* DARK THEME DISABLED: jo bhi theme manga jaye, value light par force
     kar di jati hai taake purani stored "dark" preference bhi light par
     overwrite ho jaye. Restore ke liye sirf ye ek line hatani hai — neeche
     wali dono original lines bilkul waisi hi hain jaisi pehle theen. */
  theme = "light";
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
  /* DARK THEME DISABLED: toggle ab flip nahi karta, hamesha light rehta
     hai — original code:
  // const next = getTheme() === "light" ? "dark" : "light";
  // applyTheme(next);
  // return next;
  */
  applyTheme("light");
  return "light";
}

export default getTheme;
