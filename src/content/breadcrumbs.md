---
title: 'Breadcrumbs'
slug: 'breadcrumbs'
path: 'components/breadcrumbs'
date: '2019-03-20'
---

## Description

Breadcrumbs (or a ‘breadcrumb trail’) are a form of **navigation**. They are specifically designed to help users keep track of their location by showing the position of the current page in one of the following contexts:

- the structural hierarchy of the site;
- the categories of the current page (usually increasing in specificity);
- within the history of all the pages the user has visited in their current session.

Visually, a ‘breadcrumb trail’ consists of a list of links arranged horizontally. These are most commonly positioned before the main content of a page.[^1] In left-to-right written languages such as English, the current page is positioned at the right.

The name ‘breadcrumbs’ comes from the Brothers Grimm fairytale _Hansel and Gretel_, in which the character Hansel leaves a trail of the crumbs to help the titular siblings find their way home.

## Usage guidelines

### HTML

- As breadcrumbs are a type of **navigation** you should put them in a `<nav>` element.
- Use an ordered list (`<ol>`) with an `<li>` for each breadcrumb item.
- Add a meaningful label such as `aria-label="Breadcrumbs"` to the `<nav>` element. This helps differentiate it from any other navigation landmarks in the current document, such as the primary navigation.[^2]
- Add the `aria-current="page"` attribute to the item which represents the current page.

[^1]: [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/#breadcrumb)
[^2]: [Accessible Breadcrumb Navigation Pattern — Scott O'Hara](https://scottaohara.github.io/a11y_breadcrumbs/)
