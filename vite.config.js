import { defineConfig } from "vite";
import process from "node:process";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

/* Bundle report: `npm run analyze` → stats.html kholo (Vite 7 mein
   chunk analysis manual karna padta tha, isliye env-gated plugin). */
const analyze = process.env.ANALYZE === "1";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ...(analyze
      ? [visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true })]
      : []),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    /* modulePreload: sirf direct entry imports — warna Vite HAR lazy chunk ke
       deps (three/r3f) ko index.html mein modulepreload link daal deta hai,
       jisse mobile pe bhi 3D chunks initial load pe fetch ho jate hain (TBT hit). */
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        /* Sirf gsap alag chunk — baaki small vendors index ke saath rehne do
           (React/router/data ka gzip ~54KB hai, theek hai). Dead 3D stack
           (three/r3f) Nov 2026 audit mein remove ho gaya. */
        manualChunks(id) {
          if (id.includes("node_modules/gsap/")) return "gsap";
        },
      },
    },
  },
});
