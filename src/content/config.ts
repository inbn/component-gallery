// src/content/config.ts
import { defineCollection, z } from "astro:content";
import { airtableLoader } from "@ascorbic/airtable-loader";

const components = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE_ID,
    table: "Components",
  }),
});

const componentContent = defineCollection({
  schema: z.object({
    title: z.string(),
    path: z.string(),
    date: z.date(),
  })
});

const componentExamples = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE_ID,
    table: "Component examples",
    queryParams: {
      view: "Published only",
    },
  }),
});

const designSystems = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE_ID,
    table: "Design systems",
  }),
});

const miscContent = defineCollection({
  schema: z.object({
    title: z.string(),
    path: z.string(),
    date: z.string()
  }),
});

const resources = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE_ID,
    table: "Resources",
  }),
});

export const collections = {
  components,
  componentContent,
  componentExamples,
  designSystems,
  miscContent,
  resources,
};
