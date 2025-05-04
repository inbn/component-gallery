import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import remarkCaptions from "remark-captions";
import tailwind from "@astrojs/tailwind";
import { pagefind } from "vite-plugin-pagefind";
import generateRedirects from "./src/integrations/generateRedirects";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: process.env.NETLIFY
    ? process.env.CONTEXT === "production"
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL
    : undefined,
  contentLayer: true,
  image: {
    domains: ["v5.airtableusercontent.com"],
  },
  integrations: [tailwind(), mdx(), preact(), icon(), generateRedirects()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "min-light",
        dark: "nord",
      },
    },
    remarkPlugins: [remarkCaptions],
  },
  prefetch: true,
  vite: {
    plugins: [
      pagefind({
        site: "dist",
        outputDirectory: "dist",
        assetsDirectory: "public",
        bundleDirectory: "pagefind",
        buildScript: "build",
        developStrategy: "lazy",
      }),
    ],
    build: {
      // Assets below this size will be loaded inline in the HTML
      assetsInlineLimit: 16384, // 16kb
    },
  },
  svg: true,
});
