import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getLenis, scrollToSection } from "./smoothScroll";

/* Lightweight history router — koi external dep nahi.
   Real <a href> render hote hain (crawlers / middle-click theek),
   plain left-click SPA navigation mein convert ho jata hai. */

const RouterContext = createContext({ path: "/", navigate: () => {} });

/* Section alias paths (/about, /contact waghera) — ye home one-pager
   ke hi sections hain, alag pages nahi. */
export const SECTION_ALIAS_IDS = [
  "about",
  "skills",
  "services",
  "projects",
  "experience",
  "certifications",
  "process",
  "blog",
  "faq",
  "contact",
];

export function isSectionAliasPath(path) {
  const seg = path.split("/").filter(Boolean);
  return seg.length === 1 && SECTION_ALIAS_IDS.includes(seg[0]);
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

/* Hybrid nav: home one-page hai — section par scroll karo. Lazy sections
   der se mount hote hain, is liye element milne tak thora poll karo. */
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

export function goSection(id) {
  if (id === "home") {
    if (window.location.pathname !== "/") navigateTo("/");
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

/* Home par land hone ke baad pending section (doosre page se aaye ho)
   ya URL hash (#about waghera) consume karo. True = scroll hua. */
export function consumePendingSection() {
  let id = null;
  try {
    id = sessionStorage.getItem("aa-pending-section");
    if (id) sessionStorage.removeItem("aa-pending-section");
  } catch {}
  if (!id && window.location.hash) {
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
  const [path, setPath] = useState(() => window.location.pathname);

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
