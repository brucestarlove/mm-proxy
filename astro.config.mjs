import { defineConfig } from "astro/config";

import cloudflare from "@astrojs/cloudflare";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  base: "/api",
  build: {
    assetsPrefix: "/api", // ensure this matches your environment's mount path
  },
  output: "server",
  adapter: cloudflare({
    platformProxy: {
      enabled: true
    }
  }),

  integrations: [react()],
  vite: {
    resolve: {
      // Use react-dom/server.edge instead of react-dom/server.browser for React 19.
      // Without this, MessageChannel from node:worker_threads needs to be polyfilled.
      alias: import.meta.env.PROD ? {
        "react-dom/server": "react-dom/server.edge",
      } : undefined,
    },
}
});