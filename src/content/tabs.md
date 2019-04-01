---
title: 'Tabs'
slug: 'tabs'
path: 'components/tabs'
date: '2019-04-01'
---

A tabbed interface consists of the **tab list** containing the **tab elements**, along the top or side of the **tab panels** which contain the content.

Each tab panel has an associated tab element, that when activated, displays the panel. Only one panel of content is displayed at any one time.

Tabs are an example of an [interface metaphor](https://en.wikipedia.org/wiki/Interface_metaphor), based on the tabs attached to the top of folders used inside filing cabinets, labelling the content contained within. Like their real-world namesake tabbed interfaces allow a user to see the outline of a larger set of data at a glance and quickly navigate to the correct section.

## Usage guidelines

- Be conscious that when you’re using tabs, you’re hiding content.
- Mark-up your tabs with [the correct aria attributes](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel):
  - Use `role="tab"` on each tab element and `role="tablist"` on the tab list.
  - Give each tab panel `role="tabpanel"`.
  - If the tabs are _vertically_ oriented (one on top of the other), give the tab list the attribute `aria-orientation="vertical"` (If your tabs are oriented _horizontally_, you can leave this attribute out as it is the default).
  - If the tab list has a visible label, link it to the label with `aria-labelledby="{labelId}"`. Otherwise, the tab list should be labelled using the `aria-label` attribute.
  - Each tab should have the attribute `aria-controls="{tabPanelId}" linking it to the associated tabpanel element.
  - The _active_ tab should have `aria-selected` set to true and all other tabs should have it set to false.
  - Each tab panel should have `aria-labelledby={tabId}` to link it with its associated tab element.
- In addition to these aria attributes, to make a tabbed interface keyboard-accessible, you’ll also need to add some custom keybindings. e.g. the left and right arrows should navigate between tab elements if they are arranged horizontally.[^1]

[^1]: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#tabpanel)
