import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getLenis, scrollToSection } from "./smoothScroll";

/* Lightweight history router — koi external dep nahi.
   Real <a href> render hote hain (crawlers / middle-click theek),
   plain left-click SPA navigation mein convert ho jata hai. */

const RouterContext = createContext({ path: "/", navigate: () => {} });

export function navigateTo(path) {
  if (window.location.pathname === path) {
    scrollTopNow();
    return;
  }
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function scrollTopNow() {
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
  /* Lazy sections mount hone par layout shift hota hai — pehli scroll
     ke baad do correction passes, lekin sirf tab jab user ne scroll
     takeover na kiya ho (landing position ke aas paas ho). */
  /* Sections par scroll-mt-24 (96px) hai aur Lenis use bhi count karta
     hai — offset -20 ke sath landing ~116px par hoti hai (navbar clear). */
  let landingY = null;
  const correct = () => {
    if (landingY === null) return;
    if (Math.abs(window.scrollY - landingY) > 250) return;
    const el = document.getElementById(id);
    if (!el) return;
    if (Math.abs(el.getBoundingClientRect().top - 116) > 160) {
      scrollToSection(id, -20);
    }
  };
  let tries = 0;
  const attempt = () => {
    if (document.getElementById(id)) {
      scrollToSection(id, -20);
      setTimeout(() => {
        landingY = window.scrollY;
      }, 1350);
      setTimeout(correct, 1600);
      setTimeout(correct, 2900);
      return;
    }
    if (tries++ < 30) setTimeout(attempt, 120);
  };
  attempt();
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
