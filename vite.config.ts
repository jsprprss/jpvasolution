import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: {
      entry: "server",
    },
  },

  server: {
    allowedHosts: ["jpvasolution.onrender.com"],
  },

  preview: {
    allowedHosts: ["jpvasolution.onrender.com"],
  },
});
