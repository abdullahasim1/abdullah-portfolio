import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getLenis, scrollToSection } from "./smoothScroll";

/* Lightweight history router — koi external dep nahi.
   Real <a href> render hote hain (crawlers / middle-click theek),
   plain left-click SPA navigation mein convert ho jata hai. */

const RouterContext = createContext({ path: "/", navigate: () => {} });

/* One-pager structure (Abdullah ka faisla, 2026-11-13 — multi-page
   experiment khatam): sirf teen asal pages bache hain — Projects,
   Certifications aur Blog (detail routes ke sath). Baaki tamam
   sections HOME par full sections hain aur anchor scroll se khulte
   hain — bilkul PR #26 se pehle wali tarteeb. PAGE_ROUTES asal
   pages hain; pageMeta.js PAGE_META aur App.jsx route table se
   agree karne chahiye (integrity test ye pakka karta hai). */
export const PAGE_ROUTES = ["/", "/projects", "/certifications", "/blog"];

/* Home par maujood section ids — navbar scrollspy aur anchor
   navigation inhi par chalta hai. */
const HOME_SECTIONS = [
  "home",
  "about",
  "skills",
  "services",
  "process",
  "experience",
  "testimonials",
  "faq",
  "contact",
];

/* Section id → us ka page. Sirf teen sections ke apne pages hain;
   baaki sab home sections hain (pageForSection "/" deta hai). */
const SECTION_PAGE = {
  projects: "/projects",
  certifications: "/certifications",
  blog: "/blog",
};

export function pageForSection(id) {
  return SECTION_PAGE[id] ?? "/";
}

/* Multi-page era (2026-11-12 → 2026-11-13) ke purane URLs:
   /about, /skills, /services, /experience, /contact aur
   /services/<slug> — ye ab routes nahi; home ke matching section
   par land karte hain. Client side ye mapping navigateTo /
   RouterProvider sambhalte hain, server side vercel.json redirects
   (/#about waghera) — dono ek hi jagah land karte hain. */
const LEGACY_PATH_SECTION = {
  about: "about",
  skills: "skills",
  services: "services",
  experience: "experience",
  contact: "contact",
};

function legacySectionForPath(path) {
  const seg = path.split("/").filter(Boolean);
  if (seg.length === 1 && LEGACY_PATH_SECTION[seg[0]])
    return LEGACY_PATH_SECTION[seg[0]];
  if (seg.length === 2 && seg[0] === "services") return "services";
  return null;
}

/* Home par land honay wali hash links (/#projects waghera): jo
   sections ab asal pages hain, un ki hash ko route par
   replace-redirect karo. Jo home sections hain, un ki hash
   consumePendingSection scroll ke liye utha leta hai.
   True = redirect hua (caller aage scroll na kare). */
const HASH_ROUTE = {
  projects: "/projects",
  certifications: "/certifications",
  blog: "/blog",
};

function hashRouteTarget() {
  const h = window.location.hash.replace(/^#\/?/, "");
  if (!h || h.startsWith("blog/")) return null;
  return HASH_ROUTE[h] ?? null;
}

export function redirectHashToRoute() {
  const target = hashRouteTarget();
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
  /* Purane multi-page URLs kabhi asal route nahi bante — home ke
     matching section par land karo. */
  const legacy = legacySectionForPath(path);
  if (legacy) {
    if (window.location.pathname !== "/") {
      try {
        sessionStorage.setItem("aa-pending-section", legacy);
      } catch {}
      window.history.pushState({}, "", "/");
      window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      scrollToSectionNow(legacy);
    }
    return;
  }
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

/* Section ki taraf jao — one-pager mein do hi soortain hain:
   (1) section ka apna page hai (projects / certifications / blog)
   → wahan navigate karo; (2) home section hai → pehle home par
   jao (pending mechanism), phir Lenis se us section tak scroll. */
export function goSection(id) {
  if (id === "home") {
    if (window.location.pathname !== "/") navigateTo("/");
    else scrollTopNow();
    return;
  }
  const target = pageForSection(id);
  if (target !== "/") {
    if (window.location.pathname !== target) navigateTo(target);
    else scrollTopNow();
    return;
  }
  if (window.location.pathname !== "/") {
    try {
      sessionStorage.setItem("aa-pending-section", id);
    } catch {}
    navigateTo("/");
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
    if (h && HOME_SECTIONS.includes(h)) id = h;
  }
  if (id) {
    scrollToSectionNow(id);
    return true;
  }
  return false;
}

export function RouterProvider({ children }) {
  /* Pehli load par hi purani shaklon ko seedha kar do — initial
     state mein, taake pehla render hi sahi page ka ho (popstate
     listener tab tak laga nahi hota):
     - purana page URL (/about waghera) → home + pending section
     - page-section ki hash (/#projects waghera) → asal route */
  const [path, setPath] = useState(() => {
    const p = window.location.pathname;
    const legacy = legacySectionForPath(p);
    if (legacy) {
      try {
        sessionStorage.setItem("aa-pending-section", legacy);
      } catch {}
      window.history.replaceState({}, "", "/");
      return "/";
    }
    if (p === "/") {
      const target = hashRouteTarget();
      if (target) {
        window.history.replaceState({}, "", target);
        return target;
      }
    }
    return p;
  });

  useEffect(() => {
    const onPop = () => {
      /* Back/forward se purana page URL aaye to wahi normalization */
      const legacy = legacySectionForPath(window.location.pathname);
      if (legacy) {
        try {
          sessionStorage.setItem("aa-pending-section", legacy);
        } catch {}
        window.history.replaceState({}, "", "/");
        setPath("/");
        return;
      }
      setPath(window.location.pathname);
    };
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
