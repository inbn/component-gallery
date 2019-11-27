---
title: 'Breadcrumbs'
slug: 'breadcrumbs'
path: 'components/breadcrumbs'
date: '2019-03-20'
---

## Description

Breadcrumbs (or a ‘breadcrumb trail’) are a form of **navigation**, consisting of a list of links arranged in a hierarchical or chronological order. Their purpose is to help users keep track of their location by showing the position of the current page in one of the following contexts:

- the **structural** hierarchy of the site’s pages;
- the **categories** of the current page;

You may also find examples of websites that use breadcrumbs to show the **history** of all the pages the user has visited in their current session, but this seems to be far less common. For the sake of this article, I will focus on the first two contexts: representing page structure; and representing nested categories.

<!-- The name ‘breadcrumbs’ comes from the Brothers Grimm fairytale _Hansel and Gretel_, in which the character Hansel leaves a trail of the crumbs to help the titular siblings find their way home. -->

## Layout

The most common place for a breadcrumbs component to appear is before the main content of a page[^1]. It's usual to see a progression from least specific (the highest-level page or least specific category) to most specific category. The highest level page may be the homepage or the root of the current section.

![Breadcrumbs from the documentation site for Gatsby JS.](./images/gatsby_breadcrumbs.png 'The breadcrumbs on the documentation site for Gatsby JS represent the structural hierarchy with the homepage on the left and the current page on the right. Items are separated using an SVG arrow icon.')

![Breadcrumbs from the website Serious Eats.](./images/serious-eats_breadcrumbs.png 'The breadcrumbs on the recipe site Serious Eats represent a taxonomy based on ingredients. Items are separated using a forward slash.')

Separation of breadcrumb items is usually indicated with either: a greater-than symbol (`>`), a forward slash (`/`), or a similar-looking icon.

## Markup

For a page at the URL, `example.com/parent-page/current-page` the markup could look like this:

```html
<nav aria-label="Breadcrumbs">
  <ol>
    <li>
      <a href="/">Homepage</a>
    </li>
    <li>
      <a href="/parent-page">Parent page</a>
    </li>
    <li aria-current="page">Current page</li>
  </ol>
</nav>
```

Notes:

- As breadcrumbs are a type of **navigation** you should put them in a `<nav>` element.
- The order of the items in a breadcrumb list is important: use an **ordered** list (`<ol>`) with an `<li>` for each breadcrumb item.
- Add a meaningful label such as `aria-label="Breadcrumbs"` to the `<nav>` element. This helps differentiate it from any other navigation landmarks in the current document, such as the primary navigation.[^2]
- Add the `aria-current="page"` attribute to the item which represents the current page.

## Usage guidelines

Breadcrumbs work best for websites based around a hierarchical structure, such as documentation or e-commerce websites. If everything is on a single level (e.g. posts on a blog), there’s no point.

[^1]: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb)
[^2]: [Accessible Breadcrumb Navigation Pattern — Scott O'Hara](https://scottaohara.github.io/a11y_breadcrumbs/)
