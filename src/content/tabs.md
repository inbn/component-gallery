---
title: 'Tabs'
slug: 'tabs'
path: 'components/tabs'
date: '2019-04-01'
---

A tabbed interface consists of the **tab list** containing the **tab elements**, along the top or side of the **tab panels** which contain the content.

Each tab panel has an associated tab element, that when activated, displays the panel. Only one panel of content is displayed at any one time.

Tabs are an example of an [interface metaphor](https://en.wikipedia.org/wiki/Interface_metaphor), based on the tabs attached to the top of folders used inside filing cabinets. They almost act like a table of contents for the content within. Like their real-world namesake tabbed interfaces allow a user to see the outline of a larger set of data at a glance and quickly navigate to the desired section.

## Usage guidelines

### Layout

- Be conscious that when you’re using tabs, you’re hiding content. This not only makes it less discoverable for sighted users, but also for users of assistive technology like screen readers.

- If you're laying out your tabs horizontally, think about how they will appear at narrower screen widths — will they need to stack vertically or will you need to swap out the tabs for a different component?

### HTML

The W3C recommended accessible markup for your tabs uses a variety of [aria attributes](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel):

- Use `role="tab"` on each **tab** element and `role="tablist"` on the tab list.
- Give each **tab panel** `role="tabpanel"`.
- If the tabs are _vertically_ oriented (stacked one on top of the other), give the **tab list** the attribute `aria-orientation="vertical"` (If your tabs are oriented _horizontally_, you can leave this attribute out as horizontal is the default).
- If the **tab list** has a visible label, link it to the label with `aria-labelledby="{labelId}"`. Alternatively, the tab list should be labelled using the `aria-label` attribute.
- Each **tab** should have the attribute `aria-controls="{tabPanelId}"` linking it to the associated tab panel.
- The _active_ **tab** should have `aria-selected` set to true and all other tabs should have it set to false.
- Each **tab panel** should have `aria-labelledby="{tabId}"` to link it with its associated tab element.

### JavaScript

- In addition to aria attributes on your HTML elements, to make a tabbed interface keyboard-accessible, you’ll also need to add some custom keybindings. e.g. if your tabs are arranged in horizontal row, the left and right arrows should navigate between tab elements.[^1]

**Caveat:** although this is the W3C recommended method of making tabbed interfaces keyboard accessible, be aware that some users may not be familiar with this convention; a component that is simpler to interact with ([such as an accordion](/components/accordion)) may be more suited to your specific use case.

[^1]: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)
