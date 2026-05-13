import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return undefined;
          if (
            id.includes("/node_modules/react/") ||
            id.includes("/node_modules/react-dom/") ||
            id.includes("/node_modules/scheduler/")
          ) return "react-vendor";
          if (id.includes("react-router")) return "router-vendor";
          if (id.includes("swiper")) return "swiper-vendor";
          if (id.includes("bootstrap")) return "bootstrap-vendor";
          if (id.includes("i18next") || id.includes("react-i18next")) return "i18n-vendor";
          if (id.includes("react-helmet-async")) return "seo-vendor";
          if (id.includes("@vercel/analytics")) return "analytics-vendor";
          return "vendor";
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
})
