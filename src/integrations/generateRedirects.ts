import type { AstroIntegration } from "astro";
import fs from "fs";
import path from "path";
import { JSDOM, VirtualConsole } from "jsdom";

// Fix for 'Could not parse CSS stylesheet' error
const virtualConsole = new VirtualConsole();
virtualConsole.on("error", () => {
  // No-op to skip console errors.
});

export default function generateRedirects(): AstroIntegration {
  return {
    name: "generate-redirects",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        const componentsDir = path.join(dir.pathname, "components");
        const redirects: { [key: string]: string } = {};

        const getHtmlFiles = (directory: string): string[] => {
          const files: string[] = [];
          const items = fs.readdirSync(directory);

          for (const item of items) {
            const itemPath = path.join(directory, item);
            const stats = fs.statSync(itemPath);

            if (stats.isDirectory()) {
              files.push(...getHtmlFiles(itemPath));
            } else if (stats.isFile() && item.endsWith(".html")) {
              files.push(itemPath);
            }
          }

          return files;
        };

        const htmlFiles = getHtmlFiles(componentsDir);

        for (const htmlFile of htmlFiles) {
          const htmlContent = fs.readFileSync(htmlFile, "utf-8");
          const dom = new JSDOM(htmlContent, { virtualConsole });
          const window = dom.window;
          const document = window.document;

          const element = document.querySelector("[data-other-names]");
          const otherNames = element?.textContent || null;

          if (otherNames) {
            const slug = path.dirname(path.relative(componentsDir, htmlFile));
            const otherNamesArray = otherNames
              .split(",")
              .map((name: string) => name.trim());

            otherNamesArray.forEach((otherName: string) => {
              const slugifiedOtherName = otherName
                .toLowerCase()
                .replace(/\s+/g, "-");
              const redirectDestination = `/components/${slug}`;

              if (redirects[slugifiedOtherName]) {
                console.log(
                  `Duplicate redirect found: ${slugifiedOtherName} already redirects to ${redirects[slugifiedOtherName]}, skipping redirect to ${redirectDestination}`,
                );
              } else {
                redirects[slugifiedOtherName] = redirectDestination;
              }
            });
          }
        }

        // Write the redirects to the _redirects file
        const redirectsFilePath = path.join(dir.pathname, "_redirects");
        const redirectsArray = Object.entries(redirects).map(
          ([from, to]) => `/components/${from} ${to} 301`,
        );
        fs.writeFileSync(redirectsFilePath, redirectsArray.join("\n"), "utf-8");

        console.log(
          `Generated ${redirectsArray.length} unique redirects in _redirects file.`,
        );
      },
    },
  };
}
