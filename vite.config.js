import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        /* Heavy vendors alag chunks — caching + parallel download behtar */
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three'],
          'r3f': ['@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap'],
        },
      },
    },
  },
})
