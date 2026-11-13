import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

const stripTsPlugin = {
  name: "strip-ts-from-route-tree",
  enforce: "pre",
  transform(code, id) {
    if (id.includes("routeTree.gen.js")) {
      return {
        code: code
          .replace(/import type[\s\S]*?from[\s\S]*?\n/g, "")
          .replace(/declare module[\s\S]*$/g, ""),
        map: null,
      };
    }
  },
};

export default defineConfig({
  root: __dirname,
  plugins: [stripTsPlugin, react()],
  test: {
    root: __dirname,
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.js"],
    include: ["src/**/*.{test,spec}.{js,jsx}"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
