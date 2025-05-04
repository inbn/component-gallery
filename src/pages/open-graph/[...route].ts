import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

const components = await getCollection("components");

// Map the array of content collection entries to create an object.
// Converts [{ slug: 'component-1', data: { title: 'Component 1', description: 'Description' } }]
// to { 'component-1': { title: 'Component 1', description: 'Description' } }
const pages = Object.fromEntries(
  components.map(({ data }) => [
    [data.Slug],
    { title: data.Name, description: data.Description },
  ]),
);

export const { getStaticPaths, GET } = OGImageRoute({
  // Tell us the name of your dynamic route segment.
  // In this case it’s `route`, because the file is named `[...route].ts`.
  param: "route",

  pages: pages,

  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[247, 245, 242]],
    bgImage: { path: "./src/images/og-img-bg.png", fit: "contain" },
    fonts: [
      "./public/fonts/InstrumentSerif-Regular.ttf",
      "./public/fonts/InstrumentSansSemiCondensed-Regular.ttf",
    ],
    font: {
      title: {
        families: ["Instrument Serif"],
        size: 92,
        weight: "Normal",
        color: [53, 53, 53],
      },
      description: {
        families: ["Instrument Sans SemiCondensed"],
        size: 42,
        weight: "Normal",
        color: [53, 53, 53],
      },
    },
    padding: 48,
  }),
});
