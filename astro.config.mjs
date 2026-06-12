import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import remarkCaptions from "remark-captions";
import tailwind from "@astrojs/tailwind";
import { pagefind } from "vite-plugin-pagefind";
import generateRedirects from "./src/integrations/generateRedirects";
import { isCloudflareBuild, branch } from "./src/utils/buildEnv";
import sitemap from "@astrojs/sitemap";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: isCloudflareBuild
    ? branch === "main"
      ? "https://component.gallery"
      : // Pages previews expose their URL; Workers Builds has no equivalent,
        // so preview builds fall back to the production URL
        (process.env.CF_PAGES_URL ?? "https://component.gallery")
    : undefined,
  contentLayer: true,
  image: {
    domains: ["v5.airtableusercontent.com"],
  },
  integrations: [
    tailwind(),
    mdx(),
    preact(),
    icon(),
    generateRedirects(),
    sitemap({
      filter: (page) =>
        !page.includes("/open-graph/") &&
        !page.endsWith("/404/") &&
        // Design system detail pages are noindex redirect stubs (built for
        // Pagefind only), so they don't belong in the sitemap
        !/\/design-systems\/.+/.test(page),
    }),
  ],
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
    ssr: {
      external: ["canvaskit-wasm"],
    },
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
