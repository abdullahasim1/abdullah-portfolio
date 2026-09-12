import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    /* modulePreload: sirf direct entry imports — warna Vite HAR lazy chunk ke
       deps (three/r3f) ko index.html mein modulepreload link daal deta hai,
       jisse mobile pe bhi 3D chunks initial load pe fetch ho jate hain (TBT hit). */
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        /* Sirf three + gsap alag chunks — react/react-dom/r3f ko ALAG chunk
           mat banao: react-reconciler (r3f ka dep) React internals use karta
           hai, manual split se circular chunk-deps banti hain aur r3f phir
           entry graph mein aa jata hai. Small vendors index ke saath rehne
           do (gzip ~54KB total, theek hai). */
        manualChunks(id) {
          if (id.includes("node_modules/three/")) return "three";
          if (id.includes("node_modules/gsap/")) return "gsap";
        },
      },
    },
  },
});
