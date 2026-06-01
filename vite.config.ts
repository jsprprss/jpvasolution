import { defineConfig } from "@tanstack/react-start/config";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    preset: "node-server",
    entry: "./src/server-render.ts",
  },
  vite: {
    plugins: [viteReact(), tailwindcss(), tsConfigPaths()],
  },
});
