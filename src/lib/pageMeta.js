/* Har route ka SEO meta — client-side apply + build-time prerender
   shells (scripts/prerender-shells.mjs) dono yahi se lete hain. */

export const SITE_URL = "https://abdullah-asim-dev.vercel.app";
export const SITE_NAME = "Abdullah Asim — Portfolio";
export const DEFAULT_TITLE =
  "Abdullah Bin Asim — AI Cloud Engineer & Full Stack Developer";
export const DEFAULT_DESCRIPTION =
  "Portfolio of Abdullah Bin Asim — AI Cloud Engineer & Full-Stack Developer building generative AI products, n8n/Make automation and AWS serverless systems.";

export const PAGE_META = {
  "/": { title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
};

function setMeta(attr, key, content) {
  if (content == null) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Client-side meta apply — route change par App se call hota hai.
    Detail pages (project/service/post) apne data se khud call karti hain. */
export function applyPageMeta({ title, description, path, type = "website", image }) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  if (title) document.title = title;
  setMeta("name", "description", description);
  setCanonical(url);
  setMeta("property", "og:type", type);
  setMeta("property", "og:url", url);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  if (image) setMeta("property", "og:image", image);
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  if (image) setMeta("name", "twitter:image", image);
}

export function metaForPath(path) {
  return PAGE_META[path] ?? null;
}
