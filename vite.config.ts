import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    // Prerender every route to static HTML so the build output can be served
    // by a static host (Render Static Site, Netlify, etc.) without a Node server.
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/contact" },
      { path: "/resume" },
      { path: "/services" },
    ],
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: false,
    },
    // SPA shell as a client-side fallback for any unknown URL.
    spa: { enabled: true },
  },
});
