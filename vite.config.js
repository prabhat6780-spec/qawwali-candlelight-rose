
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
  tanstackStart: {
    router: {
      generatedRouteTree: "routeTree.gen.js",
      disableTypes: true,
      routeTreeFileFooter: [],
    },
    server: { entry: "server" },
  },

  nitro: {
    preset: process.env.VERCEL ? "vercel" : undefined,
  },

  vite: {
    plugins: [stripTsPlugin],
  },
});
