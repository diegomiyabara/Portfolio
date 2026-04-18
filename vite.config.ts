import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    // Enable CSS code splitting — each async chunk gets its own CSS file
    cssCodeSplit: true,
    // Inline assets smaller than 4 KB as base64 to reduce requests
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Manual chunk splitting: vendor libs into separate cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react'
          }

          if (id.includes('node_modules/framer-motion/')) {
            return 'vendor-motion'
          }

          if (id.includes('node_modules/react-i18next/') || id.includes('node_modules/i18next/')) {
            return 'vendor-i18n'
          }

          return undefined
        },
        // Deterministic file names with content hash for long-term caching
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
