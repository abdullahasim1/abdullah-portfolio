import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /* Heavy vendors alag chunks — caching + parallel download behtar */
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three"],
          r3f: ["@react-three/fiber", "@react-three/drei"],
          gsap: ["gsap"],
        },
      },
    },
  },
});
