#!/usr/bin/env node
/**
 * Static preview server — `dist/` ko Vercel jaisa serve karta hai
 * (directory index, clean URLs, legacy redirects, 404 status). Vite ka
 * `preview` SPA fallback karta hai, is liye static blog articles aur
 * 404 behaviour locally test nahi ho paate the.
 *
 * Usage: node scripts/preview-server.mjs [port]
 */
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DIST = path.join(ROOT, "dist");
const PORT = Number(process.argv[2] || process.env.PORT || 4173);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

/* vercel.json redirects (308) — preview mein bhi same behaviour. */
const REDIRECTS = [
  [/^\/privacy\/?$/, "/privacy.html"],
  [/^\/process\/?$/, "/#process"],
  [/^\/faq\/?$/, "/#faq"],
  [/^\/about\/?$/, "/#about"],
  [/^\/skills\/?$/, "/#skills"],
  [/^\/services(\/.*)?\/?$/, "/#services"],
  [/^\/experience\/?$/, "/#experience"],
  [/^\/contact\/?$/, "/#contact"],
];

function sendFile(res, file, status = 200) {
  const ext = path.extname(file).toLowerCase();
  res.writeHead(status, {
    "Content-Type": MIME[ext] || "application/octet-stream",
    "Cache-Control": "no-cache",
  });
  fs.createReadStream(file).pipe(res);
}

function notFound(res) {
  const file = path.join(DIST, "404.html");
  if (fs.existsSync(file)) return sendFile(res, file, 404);
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("404");
}

const server = http.createServer((req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    return notFound(res);
  }

  for (const [pattern, target] of REDIRECTS) {
    if (pattern.test(pathname)) {
      res.writeHead(308, { Location: target });
      return res.end();
    }
  }

  /* Path traversal guard */
  const safe = path.normalize(pathname).replace(/^(\.\.[/\\])+/, "");
  const candidates = [
    path.join(DIST, safe),
    path.join(DIST, safe, "index.html"),
    path.join(DIST, `${safe}.html`),
  ];

  for (const candidate of candidates) {
    if (!candidate.startsWith(DIST)) continue;
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return sendFile(res, candidate);
    }
  }

  return notFound(res);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`preview-server: http://127.0.0.1:${PORT}`);
});
