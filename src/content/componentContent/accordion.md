---
title: Accordion
path: components/accordion
date: 2019-10-13
---

## Description

The examples above use a variety of different names: many of these refer to the collapsible/expandable nature of the component, while others reference the HTML element used by their implementation: [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details). All of these examples have two primary elements in common: a heading and some content: interacting with the heading toggles the visibility of the content; this heading + content pattern can be repeated as many times as needed.

## Markup

### Approach 1: _Heading with Button_

Here is example markup for a single accordion item:

```html
<h2>
  <button
    type="button"
    aria-expanded="false"
    aria-controls="accordion-item-1-content"
  >
    Accordion item 1
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      aria-hidden="true"
      focusable="false"
    >
      <polygon points="0,64 128,192 256,64" />
    </svg>
  </button>
</h2>
<div id="accordion-item-1-content">
  <p>Accordion item 1 content</p>
</div>
```

- This example uses an `h2` for the heading but this should be whichever heading level is appropriate for where you’re using it.

- Each accordion item can be in one of two states: expanded or collapsed. This is communicated to assistive technology via the `aria-expanded` attribute on the button.

- The `aria-controls` attribute ties the button to the content it controls using the `id` of the content container (`accordion-item-1-content` in the example).

- The button contains a downwards-pointing arrow to hint that it can be expanded. When the accordion item is in its expanded state, this is rotated 180 degrees to point upwards. It is also common to see plus (+) and minus (-) symbols used instead of arrows.

- The icon in this example uses an inline SVG to render the arrow. It is given the `aria-hidden="true"` attribute to hide it from assistive technologies (as well as `focusable="false"` to address an inconsistency in Internet Explorer and older versions of Edge). You could alternatively use a CSS background image or pseudo-element.

### Approach 2: _Summary and Details_

The following example uses the [summary](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary) and [details](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details) elements to achieve a similar result to the previous example, without JavaScript:

```html
<details>
  <summary>
    <h2>Accordion item 1</h2>
  </summary>
  <p>Accordion item 1 content</p>
</details>
```

To set the initial state of the accordion item to be 'expanded', you can add the attribute `open="true"` to the `details` element (the default is `false`, so this can be omitted for collapsed items).

**Browser support warning:** The `details` and `summary` elements are not supported by Internet Explorer or Opera Mini at the time of writing.[^1]

## Interactivity

The [first example](#approach-1-heading-with-button), requires a small amount of JavaScript to toggle the `aria-expanded` attribute on the button and the visibility of the content.

In situations where JavaScript is not enabled or doesn’t work for some reason, it is desirable for the content to still be visible (because the button requires Javascript, the user has no way of making the content visible if JavaScript is disabled). Instead of making the content invisible by default or having buttons that do nothing, you can create your accordion component without the button element, and use JavaScript to [progressively enhance](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) the HTML with additional interactivity. There is an example on how to do this on [Inclusive Components](https://inclusive-components.design/collapsible-sections/).

The [second example](#approach-2-summary-and-details) works without JavaScript in browsers that support the `details` element. In browsers that don’t support the `details` element, all of the content will be rendered, but it won’t be collapsible.

## Styling

If you go for the first approach, using a `button` element which triggers some JavaScript, you can use the `aria-expanded` attribute as a hook for styling the button. The following example will rotate the arrow 180 degrees when the accordion is expanded:

```css
button[aria-expanded='true'] > svg {
  transform: rotate(180deg);
}
```

If you decide on the `details` and `summary` elements instead, there are a couple of default browser styles you may want to override:[^2]

1. The default cursor for the `summary` is the text selection type which doesn’t give great [affordance](https://uxplanet.org/ux-design-glossary-how-to-use-affordances-in-user-interfaces-393c8e9686e4) that the element is clickable. The following CSS, will change the cursor to the `pointer` style (like that shown when hovering over links):

   ```css
   details summary {
     cursor: pointer;
   }
   ```

2. If you nest a block-level element like a heading in a `summary` element (as in the example above), it appears below the arrow marker. To make it appear next the the arrow, set its `display` property to `inline`:

   ```css
   details summary > * {
     display: inline;
   }
   ```

## Usage guidelines

Accordions work well on smaller screens, as they reduce the amount of vertical scrolling required to get an overview of the content. They also require very little horizontal space, unlike components such as [tabs](/components/tabs).

Some implementations allow for only a single accordion item to be expanded at any one time — do this with caution, as some users may wish to view the content from two items at the same time.

Be mindful that when you are using an accordion you are hiding content from users — they therefore should not be used for essential information.

[^1]: [Details & Summary elements: Caniuse.com](https://caniuse.com/#feat=details)
[^2]: [Two Issues Styling the Details Element and How to Solve Them](https://css-tricks.com/two-issues-styling-the-details-element-and-how-to-solve-them/), Greg Gibson on CSS-Tricks
