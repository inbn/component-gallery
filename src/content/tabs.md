---
title: 'Tabs'
slug: 'tabs'
path: 'components/tabs'
date: '2019-04-01'
---

## Description

A tabbed interface consists of the **tab list** containing the **tab elements**, along the top or side of the **tab panels** which contain the content.

Each tab panel has an associated tab element, that when activated, displays the panel. Only one panel of content is shown at any one time.

Tabs are an example of an [interface metaphor](https://en.wikipedia.org/wiki/Interface_metaphor), based on the tabs attached to the top of folders used inside filing cabinets. They act like a table of contents for the content within. Like their real-world namesake tabbed interfaces allow a user to see the outline of a larger set of data at a glance and quickly navigate to the desired section.

## Usage guidelines

### Layout

- Be conscious that when you’re using tabs, you’re hiding content. This not only makes it less discoverable for sighted users, but also for users of assistive technology like screen readers.

- If you're laying out your tabs horizontally, think about how they will appear at narrower screen widths — will they need to stack vertically or will you be better off swapping out the tabs for a different component (e.g. [an accordion](/components/accordion))?

### HTML

Here is example markup based on the [W3C recommended accessible markup](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel) for tabs. It describes a set of two tabs, with the first one selected:

```html
<!-- Tabs -->
<div role="tablist" aria-orientation="horizontal">
  <button
    role="tab"
    aria-selected="true"
    id="tab-1"
    aria-controls="tab-panel-1"
  >
    Tab 1
  </button>
  <button
    role="tab"
    aria-selected="false"
    id="tab-2"
    aria-controls="tab-panel-2"
  >
    Tab 2
  </button>
</div>
<!-- Tab panels -->
<div id="tab-panel-1" role="tabpanel" aria-labelledby="tab-1">
  <h2>Tab panel 1 content</h2>
</div>
<div
  id="tab-panel-2"
  role="tabpanel"
  aria-labelledby="tab-2"
  style="display: none;"
>
  <h2>Tab panel 2 content</h2>
</div>
```

To communicate the semantic meaning and current state of each element to assistive technology, it makes extensive use of aria attributes:

- Use `role="tab"` on each **tab** element and `role="tablist"` on the tab list.
- Give each **tab panel** `role="tabpanel"`.
- If the tabs are _vertically_ oriented (stacked one on top of the other), give the **tab list** the attribute `aria-orientation="vertical"` (If your tabs are oriented _horizontally_, you can leave this attribute out as horizontal is the default).
- If the **tab list** has a visible label, link it to the label with `aria-labelledby="{labelId}"`. Alternatively, the tab list should be labelled using the `aria-label` attribute.
- Each **tab** should have the attribute `aria-controls="{tabPanelId}"` linking it to the associated tab panel.
- The _active_ **tab** should have `aria-selected` set to true and all other tabs should have it set to false.
- Each **tab panel** should have `aria-labelledby="{tabId}"` to link it with its associated tab element.

### CSS

When styling your tabs, you can make use of the `aria-selected` attribute to style the active tab differently. e.g.

```css
.tab[aria-selected='true'] {
  background-color: var(--active-tab-bg-color);
  color: var(--active-tab-text-color);
  font-weight: bold;
}
```

Ensure each tab also has a visible `:focus` state.

To show/hide the tab panels you will need to toggle the CSS display property between `display: none;` and a visible value such as `display: block;`.

### JavaScript

In addition to aria attributes on your HTML elements, to make a tabbed interface keyboard-accessible, you’ll also need to add some custom keybindings. e.g. if your tabs are arranged in horizontal row, the left and right arrows should navigate between tab elements.[^1]

**Caveat:** although this is the W3C recommended method of making tabbed interfaces keyboard accessible, be aware that some users may not be familiar with this convention; a component that is simpler to interact with ([such as an accordion](/components/accordion)) may be more suited to your specific use case.

[^2]: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)
