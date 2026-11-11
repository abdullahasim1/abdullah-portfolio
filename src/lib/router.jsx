import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getLenis, scrollToSection } from "./smoothScroll";

/* Lightweight history router — koi external dep nahi.
   Real <a href> render hote hain (crawlers / middle-click theek),
   plain left-click SPA navigation mein convert ho jata hai. */

const RouterContext = createContext({ path: "/", navigate: () => {} });

/* Multi-page structure (Abdullah ka faisla, 2026-11-12): har section
   ka apna asal page hai. PAGE_ROUTES hi woh asal pages hain —
   pageMeta.js PAGE_META aur App.jsx route table se agree karne
   chahiye (integrity test ye pakka karta hai). */
export const PAGE_ROUTES = [
  "/",
  "/about",
  "/skills",
  "/services",
  "/projects",
  "/experience",
  "/certifications",
  "/blog",
  "/contact",
];

/* Section id → us ka page. Kuch sections kisi page ke andar hain:
   process → /services page ke andar, faq + testimonials → home par. */
const SECTION_PAGE = {
  home: "/",
  about: "/about",
  skills: "/skills",
  services: "/services",
  projects: "/projects",
  experience: "/experience",
  certifications: "/certifications",
  blog: "/blog",
  contact: "/contact",
  process: "/services",
  faq: "/",
  testimonials: "/",
};

export function pageForSection(id) {
  return SECTION_PAGE[id] ?? "/";
}

/* Purani bookmark/shared hash links (/#services waghera): home par
   land hon to hash wale section ke PAGE par replace-redirect karo.
   True = redirect hua (caller aage scroll na kare). */
const HASH_PAGE = {
  about: "/about",
  skills: "/skills",
  services: "/services",
  projects: "/projects",
  experience: "/experience",
  certifications: "/certifications",
  blog: "/blog",
  contact: "/contact",
  process: "/services",
};

/* Hash ka target page (ya null). Page ke andar wala section ho
   (process) to pending bhi set kar deta hai. */
function hashPageTarget() {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h || h.startsWith("blog/")) return null;
  const target = HASH_PAGE[h];
  if (!target) return null;
  if (h !== target.slice(1)) {
    try {
      sessionStorage.setItem("aa-pending-section", h);
    } catch {}
  }
  return target;
}

export function redirectHashToPage() {
  const target = hashPageTarget();
  if (!target) return false;
  window.history.replaceState({}, "", target);
  window.dispatchEvent(new PopStateEvent("popstate"));
  return true;
}

/* Har nayi scroll command purani settle-loop ko cancel kar deti hai,
   warna do loops aapas mein lar sakti hain. */
let settleGen = 0;

export function navigateTo(path) {
  settleGen++;
  if (window.location.pathname === path) {
    scrollTopNow();
    return;
  }
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function scrollTopNow() {
  settleGen++;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  window.scrollTo(0, 0);
}

/* Page ke andar wale section par scroll karo (process /services par,
   faq + testimonials home par). Lazy chunks der se mount hote hain,
   is liye element milne tak thora poll karo. */
export function scrollToSectionNow(id) {
  if (id === "home") {
    scrollTopNow();
    return;
  }
  const gen = ++settleGen;
  let tries = 0;
  const attempt = () => {
    if (gen !== settleGen) return;
    if (document.getElementById(id)) {
      settleScroll(id, gen);
      return;
    }
    if (tries++ < 40) setTimeout(attempt, 120);
  };
  attempt();
}

/* Lazy sections mount hone par layout shift hota hai — pehli landing
   aksar ghalat section par rukti thi. Ye loop tab tak halki corrections
   karta hai jab tak section apni jagah (navbar ke neeche ~116px) par
   stable na ho jaye. User khud scroll kar le to loop ruk jata hai.
   Sections par scroll-mt-24 (96px) hai — offset -20 ke sath landing
   ~116px par hoti hai. */
function settleScroll(id, gen) {
  let lastCommandAt = 0;
  let expectedY = null;
  let stable = 0;
  let ticks = 0;
  const command = () => {
    scrollToSection(id, -20);
    lastCommandAt = Date.now();
    setTimeout(() => {
      if (gen === settleGen) expectedY = window.scrollY;
    }, 1300);
  };
  command();
  const timer = setInterval(() => {
    if (gen !== settleGen) {
      clearInterval(timer);
      return;
    }
    ticks++;
    const el = document.getElementById(id);
    if (!el || ticks > 36) {
      clearInterval(timer);
      return;
    }
    /* Lenis ki scroll animation (~1.2s) chal rahi ho to beech mein
       dobara command mat do — position abhi wahan ja rahi hai. */
    if (Date.now() - lastCommandAt < 1300) return;
    /* User ne landing spot se door scroll kar liya = takeover, ruk jao */
    if (expectedY !== null && Math.abs(window.scrollY - expectedY) > 320) {
      clearInterval(timer);
      return;
    }
    const top = el.getBoundingClientRect().top;
    if (Math.abs(top - 116) <= 20) {
      stable++;
      if (stable >= 2) clearInterval(timer);
    } else {
      stable = 0;
      command();
    }
  }, 500);
}

/* Section ki taraf jao — multi-page mein is ka matlab hai: us
   section ke PAGE par navigate karo. Jo section kisi page ke andar
   hai (process → /services, faq/testimonials → home), wahan page par
   land karke us section tak scroll hota hai (pending mechanism). */
export function goSection(id) {
  if (id === "home") {
    if (window.location.pathname !== "/") navigateTo("/");
    else scrollTopNow();
    return;
  }
  const target = pageForSection(id);
  if (window.location.pathname !== target) {
    if (id !== target.slice(1)) {
      try {
        sessionStorage.setItem("aa-pending-section", id);
      } catch {}
    }
    navigateTo(target);
    return;
  }
  scrollToSectionNow(id);
}

/* Kisi page par land hone ke baad pending section (doosre page se
   aaye ho) ya home par URL hash (#faq waghera) consume karo.
   True = scroll hua. */
export function consumePendingSection() {
  let id = null;
  try {
    id = sessionStorage.getItem("aa-pending-section");
    if (id) sessionStorage.removeItem("aa-pending-section");
  } catch {}
  if (!id && window.location.pathname === "/" && window.location.hash) {
    const h = window.location.hash.replace(/^#\/?/, "");
    if (h && !h.startsWith("blog")) id = h;
  }
  if (id) {
    scrollToSectionNow(id);
    return true;
  }
  return false;
}

export function RouterProvider({ children }) {
  /* Pehli load par hi hash (/#services waghera) ko asal page se
     badal do — initial state mein, taake pehla render hi sahi page
     ka ho (popstate listener tab tak laga nahi hota). */
  const [path, setPath] = useState(() => {
    const p = window.location.pathname;
    if (p === "/") {
      const target = hashPageTarget();
      if (target) {
        window.history.replaceState({}, "", target);
        return target;
      }
    }
    return p;
  });

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    navigateTo(to);
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRoute() {
  return useContext(RouterContext);
}

export function Link({ href, onClick, children, ...rest }) {
  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;
    // Sirf plain left-click intercept karo — modifier/new-tab/middle-click
    // browser ke default par chhoro.
    if (
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    // "/#about" jaisi hrefs = home section scroll (hybrid one-page nav)
    if (href.startsWith("/#")) {
      goSection(href.slice(2));
      return;
    }
    navigateTo(href);
  };
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
