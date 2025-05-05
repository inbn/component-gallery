import { type CollectionEntry } from "astro:content";
import Fetch from "@11ty/eleventy-fetch";

/**
 * Fetch SVG markup for a single component.
 */
export async function fetchSvgMarkupForComponent(
  component: CollectionEntry<"components">,
) {
  try {
    const imageUrl = component.data?.Image?.[0]?.url;
    if (!imageUrl) {
      // If the URL doesn't exist, return the component as is
      return {
        ...component,
        data: {
          ...component.data,
          svgMarkup: null,
        },
      };
    }

    // Use Eleventy Fetch to fetch and cache the SVG
    const svgMarkup = await Fetch(imageUrl, {
      duration: "1d",
      type: "text",
    });

    return {
      ...component,
      data: {
        ...component.data,
        svgMarkup,
      },
    };
  } catch (error: any) {
    console.error(
      `Error fetching SVG for component "${component.data?.Name || "Unknown"}":`,
      error.message || error,
    );
    return {
      ...component,
      data: {
        ...component.data,
        svgMarkup: null,
      },
    };
  }
}

/**
 * Fetch SVG markup for multiple components.
 */
export async function fetchSvgMarkupForComponents(
  components: CollectionEntry<"components">[],
) {
  return Promise.all(components.map(fetchSvgMarkupForComponent));
}
