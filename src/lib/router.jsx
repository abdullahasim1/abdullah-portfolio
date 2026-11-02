import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getLenis } from "./smoothScroll";

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
    navigateTo(href);
  };
  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
