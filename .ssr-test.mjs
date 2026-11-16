import { createServer } from "vite";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";

const vite = await createServer({ server: { middlewareMode: true }, appType: "custom", logLevel: "error" });
const { default: App } = await vite.ssrLoadModule("/src/App.jsx");

async function render(path) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const out = new Writable({
      write(chunk, enc, cb) { chunks.push(chunk); cb(); },
      final(cb) { resolve(Buffer.concat(chunks).toString("utf8")); cb(); },
    });
    const stream = renderToPipeableStream(React.createElement(App, { initialPath: path }), {
      onAllReady() { stream.pipe(out); },
      onError(error) { reject(error); },
      onShellError(error) { reject(error); },
    });
    setTimeout(() => reject(new Error("timeout")), 20000);
  });
}

for (const path of ["/", "/projects", "/certifications", "/blog", "/projects/four-ai"]) {
  try {
    const html = await render(path);
    console.log(path, "HTML length:", html.length, "| h1:", (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [,"none"])[1].replace(/<[^>]+>/g, "").trim().slice(0, 60));
  } catch (error) {
    console.error(path, "ERROR:", error.message);
  }
}
await vite.close();
