// @ts-check
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

// Pages are prerendered by default. Routes that must handle arbitrary
// slugs (ad landing pages) or POST requests opt out with
// `export const prerender = false`.
export default defineConfig({
  output: "static",
  adapter: vercel(),
  // Doctor profiles moved from /doctors/Proctology/... to lowercase; keep old links working.
  redirects: {
    "/doctors/Proctology/[drname]": {
      status: 301,
      destination: "/doctors/proctology/[drname]",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
