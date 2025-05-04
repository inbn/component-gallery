---
title: Tree view
path: components/tree-view
date: 2024-06-24
---

## Description

A tree view is a component used to represent hierarchical data. Common use cases include filesystems, taxonomies, and organisational structures. To simplify navigation of complex trees, parent nodes can be expanded and collapsed to show their children.

## Markup, Accessibility, and Interactivity

In HTML, a tree view is typically implemented using nested `<ul>` (unordered list) elements:

```html
<ul>
  <li>Parent Node
    <ul>
      <li>Child Node 1</li>
      <li>Child Node 2</li>
    </ul>
  </li>
</ul>
```

### ARIA attributes

To make a Tree view accessible to users of screen readers and other assistive technology, it must first be enhanced with the addition of some ARIA roles:

- The outermost `<ul>` element should be given `role="tree"`
- Nested `<ul>` elements should be given `role="group"`
- All `<li>` elements should be given `role="treeitem"`

```html
<ul role="tree">
  <li role="treeitem">Parent Node
    <ul role="group">
      <li role="treeitem">Child Node 1</li>
      <li role="treeitem">Child Node 2</li>
    </ul>
  </li>
</ul>
```

In addition to roles, the following ARIA attributes are necessary:

- If the tree supports selection of more than one node at a time, add `aria-multiselectable="true"` to the outermost `<ul>`.
- Each `<li>` which acts as a parent node (i.e. contains a child `<ul>`) should have `aria-expanded` set to `false` when collapsed and `true` when expanded.
- If a node is selectable, the state should be indicated with either `aria-selected` (if only one node is selectable at a time) or `aria-checked` (for multi-select trees).

```html
<ul role="tree" aria-label="Example tree">
  <li role="treeitem" aria-expanded="false">Parent Node
    <ul role="group">
      <li role="treeitem">Child Node 1</li>
      <li role="treeitem">Child Node 2</li>
    </ul>
  </li>
</ul>
```

### Interactivity

Interactivity depends on whether nodes are selectable or not. For non-selectable nodes, the only interaction is expanding or collapsing the node’s children. For selectable nodes you’ll need to consider both selection and expanding/collapsing the children.

#### Touch / Mouse

If nodes are selectable, then parent items will need two clickable areas: one to expand/collapse the node and another to toggle the selected state. For nodes that are _not_ selectable, clicking anywhere on the node should trigger the expand/collapse action.

As with any interactive element, ensure the clickable area is large enough. To meet the WCAG 2.2 criterion, [2.5.8 Target Size](https://www.w3.org/TR/WCAG22/#target-size-minimum), the target size must be _at least_ 24 by 24 CSS pixels[^1].

#### Keyboard

- &#8203;<kbd>↑</kbd> and <kbd>↓</kbd> to move focus between nodes.
- &#8203;<kbd>←</kbd> and <kbd>→</kbd> to open / close a node; move focus down into child nodes; move focus up to parent node.
- &#8203;<kbd>Enter</kbd> and <kbd>Space</kbd> to select the currently focused node.

## Usage guidelines

- Don’t use a List view if there’s no nested hierarchy to your data; instead opt for a simpler element such as a [List](/components/list) or an [Accordion](/components/accordion).
- Always include a clear visual indication of whether a node is expanded or collapsed, such as a chevron or plus/minus icons.
- For list views containing a large number of items, a free text filter input can help users find relevant nodes quickly.
- If your list view contains different types of entity (e.g.: folders and files; files with different extensions), icons can aid with navigation. If there is only  a single type of entity in your tree, icons can be unnecessary clutter.

[^1]: “The reference pixel is the visual angle of one pixel on a device with a device pixel density of 96dpi and a distance from the reader of an arm’s length. For a nominal arm’s length of 28 inches, the visual angle is therefore about 0.0213 degrees.” [CSS Values and Units Module Level 3, W3C](https://drafts.csswg.org/css-values-3/#reference-pixel)
