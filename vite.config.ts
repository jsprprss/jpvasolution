import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "./src/server-render.ts" },
  },
  nitro: {
    preset: "node-server",
  },
});
