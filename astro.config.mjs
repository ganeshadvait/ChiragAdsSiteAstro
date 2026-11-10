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
  vite: {
    plugins: [tailwindcss()],
  },
});
