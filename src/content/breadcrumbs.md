---
title: 'Breadcrumbs'
slug: 'breadcrumbs'
path: 'components/breadcrumbs'
date: '2019-03-20'
---

Breadcrumbs are one of many forms of **navigation**. They are specifically designed to help users keep track of their location by showing the position of the current page in the structural hierarchy of the site.

A ‘breadcrumb trail’ consists of a list of links to the parent pages of the current page, arranged horizontally. These are usually positioned before the main content of a page.[^1]

Their name comes from the Brothers Grimm fairytale _Hansel and Gretel_, in which the character Hansel leaves a trail of the crumbs to help the titular siblings find their way home.

## Usage guidelines

- As breadcrumbs are a type of **navigation** you should put them in a `<nav>` element.
- Use an ordered list (`<ol>`) with an `<li>` for each breadcrumb item.
- Add a meaningful label such as `aria-label="Breadcrumbs"` to the `<nav>` element. This helps differentiate it from any other navigation landmarks in the current document, such as the primary navigation.[^2]
- Add the `aria-current="page"` attribute to the item which represents the current page.

[^1]: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb)
[^2]: [Accessible Breadcrumb Navigation Pattern — Scott O'Hara](https://scottaohara.github.io/a11y_breadcrumbs/)
